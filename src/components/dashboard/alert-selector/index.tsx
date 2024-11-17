"use client";

import React, { useState, useEffect } from 'react';
import { ChevronDown, X, Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';

const ALERT_IDS = ['ALERT1', 'ALERT2', 'ALERT3', 'ALERT4'];

interface AlertSelectorProps {
  selectedAlert: string;
  onSelectAlert: (alert: string) => void;
}

export function AlertSelector({ selectedAlert, onSelectAlert }: AlertSelectorProps) {
  const [mounted, setMounted] = useState(false);
  const [query, setQuery] = useState("");
  const [filteredAlerts, setFilteredAlerts] = useState(ALERT_IDS);
  const [isDropdownVisible, setDropdownVisible] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (query) {
      setFilteredAlerts(
        ALERT_IDS.filter((alertId) =>
          alertId.toLowerCase().includes(query.toLowerCase())
        )
      );
    } else {
      setFilteredAlerts(ALERT_IDS);
    }
  }, [query]);

  if (!mounted) return null;

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-6">
      <div className="text-center sm:text-left">
        <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600">
          Alert Log Dashboard
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          Monitor and analyze system alerts in real-time
        </p>
      </div>

      <div className="flex items-center gap-2 w-full sm:w-[200px] relative">
        <div className="relative w-full">
          <input
            type="text"
            placeholder="Type or select alert..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setDropdownVisible(true)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
          <ChevronDown
            onClick={() => setDropdownVisible(!isDropdownVisible)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer"
          />
        </div>

        {isDropdownVisible && (
          <ul className="absolute top-12 left-0 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto z-10">
            {filteredAlerts.length > 0 ? (
              filteredAlerts.map((alertId) => (
                <li
                  key={alertId}
                  className="px-3 py-2 hover:bg-indigo-50 cursor-pointer"
                  onClick={() => {
                    onSelectAlert(alertId);
                    setQuery(alertId);
                    setDropdownVisible(false);
                  }}
                >
                  <div className="flex items-center gap-2">
                    <Bell className="h-4 w-4 text-indigo-500" />
                    <span>{alertId}</span>
                  </div>
                </li>
              ))
            ) : (
              <li className="px-3 py-2 text-gray-500">No results found</li>
            )}
          </ul>
        )}

        {selectedAlert && (
          <Button
            variant="ghost"
            size="icon"
            onClick={() => {
              onSelectAlert('');
              setQuery('');
              setDropdownVisible(false);
            }}
            className="flex-shrink-0 hover:bg-red-50 hover:text-red-500 transition-colors"
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );
}
