import React from "react";
import { Provider } from "../types";
import Link from "next/link";
import { morningSlots, afternoonSlots } from "@/utils/slotConfig";
import { Availability } from "@/types";

interface ProviderCardProps {
  provider: Provider;
  onClick?: () => void;
}

export default function ProviderCard({ provider, onClick }: ProviderCardProps) {
  const { id, name, image, is_inhouse, clinic_details, provider_usertype } =
    provider;

 
  const renderSlotGrid = () => {
    const avail: Availability = provider.availabilities?.[0] || {
    online_slots: [],
    offline_slots: [],
    both_slots: [],
    blocked_slots: [],
    online_booked_slots: [],
    offline_booked_slots: [],
  };
    const allSlots = [...morningSlots, ...afternoonSlots];

    return (
      <div className="overflow-x-auto">
        <div className="grid grid-cols-7 sm:grid-cols-13 grid-rows-4 gap-2 overflow-x-auto">
          {allSlots.map((time, index) => {
            const isOnline = avail.online_slots?.includes(time);
            const isOffline = avail.offline_slots?.includes(time);
            const isBoth = avail.both_slots?.includes(time);
            const isBlocked = avail.blocked_slots?.some((b) => b.slot === time);

            let bg = "bg-gray-100 text-gray-500";
            let label = time;

            if (isBlocked) {
              bg = "bg-red-500 text-white";
              label = "X";
            } else if (isBoth) {
              bg = "bg-purple-300 text-purple-900";
            } else if (isOnline) {
              bg = "bg-green-300 text-green-900";
            } else if (isOffline) {
              bg = "bg-orange-300 text-orange-900";
            } else if (avail.online_booked_slots?.includes(time)) {
              bg = "bg-blue-300 text-blue-900";
            } else if (avail.offline_booked_slots?.includes(time)) {
              bg = "bg-yellow-300 text-yellow-900";
            }

            return (
              <div
                key={index}
                className={`text-xs px-2 py-1 text-center rounded-md ${bg}`}
              >
                {label}
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col md:flex-row md:items-start md:gap-6 bg-white rounded-lg shadow-sm p-4 mb-6">
      {/* Provider Info */}
      <div className="flex items-center md:items-start gap-4 mb-4 md:mb-0 md:w-[220px] shrink-0">
        <img
          src={provider.image}
          alt={provider.name}
          className="w-12 h-12 rounded-full object-cover"
        />
        <div>
          <p className="font-semibold">{provider.name}</p>
          <p className="text-sm text-gray-500">
            {provider.clinic_details.name}
          </p>
          <p className="text-xs text-gray-400">
            {provider.is_inhouse ? "In-house" : "Visiting"}
          </p>
          <Link
            href="/schedule"
            className="text-sm text-blue-600 underline mt-1 block"
          >
            View Calendar
          </Link>
        </div>
      </div>

      {/* Slot Pills */}
      <div className="w-full overflow-x-auto">{renderSlotGrid()}</div>
    </div>
  );
}
