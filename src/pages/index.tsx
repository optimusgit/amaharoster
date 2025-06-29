import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  setProviders,
  searchByName,
  setTypeFilter,
  setServiceFilter,
  setCenterFilter,
} from "../store/providerSlice";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import ProviderCard from "@/components/ProviderCard";
import { Provider as ProviderType } from "@/types";
import ScheduleHeader from "@/components/ScheduleHeader";

function deriveServiceType(provider: any): string {
  const availability = provider.availabilities?.[0];
  if (!availability) return "Unknown";

  const hasOnline = availability.online_slots?.length > 0;
  const hasOffline = availability.offline_slots?.length > 0;
  const hasBoth = availability.both_slots?.length > 0;

  if (hasBoth || (hasOnline && hasOffline)) return "Both";
  if (hasOnline) return "Online";
  if (hasOffline) return "Offline";

  return "Unknown";
}

export default function Home() {
  const dispatch = useDispatch();

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchText = event.target.value;
    dispatch(searchByName(searchText));
    console.log("Searching for:", searchText);
  };
  const providersRaw = useSelector(
    (state: RootState) => state.provider.filtered
  );
  const providers = providersRaw.map((provider: any) => ({
    ...provider,
    service_type: provider.service_type ?? deriveServiceType(provider),
  }));

  useEffect(() => {
    fetch("data/providers.json")
      .then((response) => response.json())
      .then((data) => {
        const providersWithServiceType = data.map((provider: any) => ({
          ...provider,
          service_type: deriveServiceType(provider),
        }));
        dispatch(setProviders(providersWithServiceType));
      });
  }, [dispatch]);

  const [selectedProvider, setSelectedProvider] = useState<ProviderType | null>(
    null
  );

  const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  // const today = dayjs(); // You can adjust this to start from a fixed date if needed
  // const thisWeek = Array.from({ length: 7 }, (_, i) => today.startOf("week").add(i + 1, "day"));

  // const [selectedDateIndex, setSelectedDateIndex] = useState(0);
  // const selectedDate = thisWeek[selectedDateIndex];

  return (
    <div className="flex flex-col md:flex-row gap-6 px-4 max-w-6xl mx-auto py-8">
      {/* Left Column: Filters */}
      <div className="w-full md:w-1/3 bg-gray-100 p-4 rounded-md">
        <div className="flex flex-col gap-3 mb-6">
          <select
            onChange={(e) => dispatch(setTypeFilter(e.target.value))}
            className="px-3 py-2 border rounded-md w-full text-sm"
          >
            <option value="">All Types</option>
            <option value="therapist">Therapist</option>
            <option value="psychiatrist">Psychiatrist</option>
          </select>

          <select
            onChange={(e) => dispatch(setServiceFilter(e.target.value))}
            className="px-3 py-2 border rounded-md w-full text-sm"
          >
            <option value="">All Services</option>
            <option value="Online">Online</option>
            <option value="Offline">Offline</option>
            <option value="Both">Both</option>
          </select>

          <select
            onChange={(e) => dispatch(setCenterFilter(e.target.value))}
            className="px-3 py-2 border rounded-md w-full text-sm"
          >
            <option value="">All Centers</option>
            <option value="Bandra Clinic">Bandra Clinic</option>
            <option value="Andheri Clinic">Andheri Clinic</option>
            <option value="Juhu Clinic">Juhu Clinic</option>
          </select>

          <input
            type="text"
            onChange={handleSearch}
            className="px-3 py-2 border rounded-md w-full text-sm"
            placeholder="Search by name..."
          />
        </div>
      </div>

      {/* Right Column: Cards */}
      <div className="w-full md:w-2/3">
        <ScheduleHeader />
        {providers.length > 0 ? (
          <div className="grid grid-cols-1 gap-6">
            {providers.map((p) => (
              <ProviderCard
                key={p.id}
                provider={p}
                onClick={() => setSelectedProvider(p)}
              />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500 mt-10">
            No providers match your search or filters.
          </p>
        )}
      </div>
    </div>
  );
}
