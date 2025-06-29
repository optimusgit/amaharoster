import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { Provider } from "@/types";
import Link from "next/link";

const timeSlots = [
  "08:00",
  "08:15",
  "08:30",
  "09:00",
  "09:15",
  "09:30",
  "10:00",
  "10:15",
  "10:30",
  "11:00",
  "11:15",
  "11:30",
  "12:00",
  "12:15",
  "12:30",
  "13:00",
  "13:15",
  "13:30",
  "14:00",
  "14:15",
  "14:30",
  "15:00",
  "15:15",
  "15:30",
  "16:00",
  "16:15",
  "16:30",
  "17:00",
];

const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export default function SchedulePage() {
  const providers = useSelector((state: RootState) => state.provider.filtered);

  const [selectedDay, setSelectedDay] = useState("Mon");

  return (
    <div className="px-4 sm:px-6 md:px-8 max-w-4xl mx-auto">
      <div className="max-w-screen-xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-semibold">Provider Calendar</h1>

          <Link href="/">
            <button className="px-4 py-2 rounded bg-gray-100 text-gray-700 hover:bg-gray-200 text-sm">
              ← Back to Home
            </button>
          </Link>
        </div>

        <div className="flex gap-3 mb-6 overflow-x-auto">
          {days.map((day) => (
            <button
              key={day}
              onClick={() => setSelectedDay(day)}
              className={`px-4 py-2 rounded-full text-sm font-medium ${
                selectedDay === day
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-600"
              }`}
            >
              {day}
            </button>
          ))}
        </div>
        <div className="mt-8 flex flex-wrap gap-4 text-sm text-gray-700">
          <div className="flex items-center gap-2">
            <span className="w-4 h-4 rounded bg-green-100 border border-green-300"></span>
            Online
          </div>
          <div className="flex items-center gap-2">
            <span className="w-4 h-4 rounded bg-yellow-100 border border-yellow-300"></span>
            Offline
          </div>
          <div className="flex items-center gap-2">
            <span className="w-4 h-4 rounded bg-purple-100 border border-purple-300"></span>
            Both
          </div>
          <div className="flex items-center gap-2">
            <span className="w-4 h-4 rounded bg-red-100 border border-red-300"></span>
            Blocked
          </div>
        </div>

        {/* Weekly Calendar Grid */}
        <div className="relative mt-8">
          <div className="grid grid-cols-[80px_repeat(7,1fr)] border-t border-l text-sm">
            {/* Day Headers Row */}
            <div className="h-12 border-b border-r bg-white" />{" "}
            {/* Empty cell top-left */}
            {days.map((day) => (
              <div
                key={day}
                className="h-12 border-b border-r bg-white flex items-center justify-center font-medium"
              >
                {day}
              </div>
            ))}
            {timeSlots.map((time) => (
              <React.Fragment key={time}>
                <div className="h-20 border-b border-r bg-gray-50 text-gray-400 text-xs px-2 pt-1 flex items-start justify-end">
                  {time}
                </div>

                {days.map((day, dayIndex) => {
                  // Get all providers that have a slot in this cell
                  const matchingProviders = providers.filter((provider) => {
                    const avail = provider.availabilities?.[0] || {};
                    return (
                      avail.online_slots?.includes(time) ||
                      avail.offline_slots?.includes(time) ||
                      avail.both_slots?.includes(time) ||
                      avail.blocked_slots?.some((b) => b.slot === time)
                    );
                  });

                  return (
                    <div
                      key={`${time}-${day}`}
                      className="h-20 border-b border-r bg-white relative px-1 py-1"
                    >
                      <div className="flex flex-col gap-1">
                        {matchingProviders.map((provider) => {
                          const avail = provider.availabilities?.[0] || {};

                          let bg = "bg-gray-200 text-gray-600";
                          let label = time;

                          if (
                            avail.blocked_slots?.some((b) => b.slot === time)
                          ) {
                            bg = "bg-red-500 text-white";
                            label = "X";
                          } else if (avail.both_slots?.includes(time)) {
                            bg = "bg-purple-300 text-purple-900";
                          } else if (avail.online_slots?.includes(time)) {
                            bg = "bg-green-300 text-green-900";
                          } else if (avail.offline_slots?.includes(time)) {
                            bg = "bg-orange-300 text-orange-900";
                          }

                          return (
                            <div
                              key={`${provider.id}-${time}-${day}`}
                              className={`text-xs px-2 py-1 rounded ${bg}`}
                              title={`${provider.name} – ${time}`}
                            >
                              {provider.name}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
