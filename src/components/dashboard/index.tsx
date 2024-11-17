"use client";

import { useState, useEffect } from 'react';
import { Loader2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { AlertSelector } from './alert-selector';
import { LogFilters } from './log-filters';
import { LogTable } from './log-table';
import { Pagination } from './pagination';
import { useLogs } from '@/hooks/use-logs';
import type { FilterState, Log } from '@/types/logs';

const ITEMS_PER_PAGE = 10;

export function Dashboard() {
  const [mounted, setMounted] = useState(false);
  const [selectedAlert, setSelectedAlert] = useState('');
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState<FilterState>({
    username: '',
    eventName: '',
    sourceIp: '',
  });

  const { logs, loading, error } = useLogs(selectedAlert);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const filteredLogs = (logs || []).filter((log: Log) => {
    if (!log) return false;
    
    return (
      log.user_identity?.userName?.toLowerCase().includes(filters.username.toLowerCase()) &&
      log.event_name?.toLowerCase().includes(filters.eventName.toLowerCase()) &&
      log.source_ip?.toLowerCase().includes(filters.sourceIp.toLowerCase())
    );
  });

  const totalPages = Math.max(1, Math.ceil(filteredLogs.length / ITEMS_PER_PAGE));
  const paginatedLogs = filteredLogs.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 p-8">
      <Card className="max-w-[1200px] mx-auto bg-white/80 backdrop-blur-sm shadow-xl border-0">
        <CardContent className="space-y-8 pt-6">
          <AlertSelector 
            selectedAlert={selectedAlert}
            onSelectAlert={(alert) => {
              setSelectedAlert(alert);
              setPage(1);
            }}
          />

          {selectedAlert && (
            <>
              <LogFilters 
                filters={filters}
                onFilterChange={setFilters}
              />

              {loading ? (
                <div className="flex justify-center items-center py-12">
                  <Loader2 className="h-8 w-8 animate-spin text-indigo-600" />
                </div>
              ) : error ? (
                <div className="text-center py-12 text-red-500 bg-red-50 rounded-lg">
                  {error}
                </div>
              ) : (
                <>
                  <LogTable logs={paginatedLogs} />
                  {filteredLogs.length > 0 && (
                    <Pagination
                      currentPage={page}
                      totalPages={totalPages}
                      onPageChange={setPage}
                    />
                  )}
                </>
              )}
            </>
          )}

          {!selectedAlert && (
            <div className="flex flex-col items-center justify-center py-32 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-indigo-50 flex items-center justify-center">
                <svg 
                  className="w-8 h-8 text-indigo-600" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
                  />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  No Alert Selected
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  Select an alert from the dropdown above to view its logs
                </p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}