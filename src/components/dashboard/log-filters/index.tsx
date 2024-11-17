"use client";

import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import type { FilterState } from '@/types/logs';

interface LogFiltersProps {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
}

export function LogFilters({ filters, onFilterChange }: LogFiltersProps) {
  return (
    <div className="bg-gradient-to-r from-gray-50 to-white border rounded-xl p-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="relative group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 group-hover:text-indigo-500 transition-colors" />
          <Input
            placeholder="Filter by username"
            value={filters.username}
            onChange={(e) => onFilterChange({ ...filters, username: e.target.value })}
            className="pl-10 border-gray-200 bg-white hover:border-gray-300 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 transition-all"
          />
        </div>
        <div className="relative group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 group-hover:text-indigo-500 transition-colors" />
          <Input
            placeholder="Filter by event name"
            value={filters.eventName}
            onChange={(e) => onFilterChange({ ...filters, eventName: e.target.value })}
            className="pl-10 border-gray-200 bg-white hover:border-gray-300 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 transition-all"
          />
        </div>
        <div className="relative group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 group-hover:text-indigo-500 transition-colors" />
          <Input
            placeholder="Filter by source IP"
            value={filters.sourceIp}
            onChange={(e) => onFilterChange({ ...filters, sourceIp: e.target.value })}
            className="pl-10 border-gray-200 bg-white hover:border-gray-300 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 transition-all"
          />
        </div>
      </div>
    </div>
  );
}