import React, { useState } from "react";
import Legend from "./Legend";

const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export default function ScheduleHeader() {
  const [selectedDay, setSelectedDay] = useState(0); // Default to Sunday

  return (
    <div className="w-full mb-6">
      {/* Day Tabs */}
      <div className="flex items-center gap-2 mb-4 flex-wrap justify-evenly">
        <button className="w-8 h-8 flex items-center justify-center rounded-full bg-white border text-gray-600 hover:bg-gray-100">
          &lt;
        </button>

        <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
          {weekdays.map((day, idx) => (
            <button
              key={day}
              onClick={() => setSelectedDay(idx)}
              className={`min-w-[48px] px-2 py-2 text-sm rounded-lg flex flex-col items-center ${
                selectedDay === idx
                  ? "bg-green-600 text-white"
                  : "bg-white border border-gray-300 text-gray-700"
              }`}
            >
              <span className="text-xs">{day}</span>
              <span className="text-sm font-semibold">{21 + idx}</span>
            </button>
          ))}
        </div>

        <button className="w-8 h-8 flex items-center justify-center rounded-full bg-white border text-gray-600 hover:bg-gray-100">
          &gt;
        </button>
      </div>

      {/* Legend Bar Below Tabs (Stacked) */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        {/* Title and Subtext */}
        <div>
          <h2 className="text-md font-semibold text-gray-800">
            Showing full schedules for Thu, 21 Sep 2024
          </h2>
          <p className="text-sm text-gray-500">
            Showing slots in the 8 am to 12 am window.
          </p>
        </div>

        {/* Legend Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-6 gap-y-2 text-sm text-gray-700 justify-items-start mt-4">
          <Legend label="Online" color="bg-green-400" />
          <Legend label="Offline" color="bg-orange-400" />
          <Legend label="Online+Offline" color="bg-blue-400" />
          <Legend label="Online Booked" color="bg-blue-900 text-white" />
          <Legend label="Offline Booked" color="bg-amber-700 text-white" />
          <Legend label="Blocked" color="bg-red-600 text-white" />
        </div>
      </div>
    </div>
  );
}
