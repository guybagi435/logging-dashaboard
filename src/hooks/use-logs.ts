"use client";

import { useState, useEffect } from 'react';
import type { Log } from '@/types/logs';

interface UseLogsReturn {
  logs: Log[];
  loading: boolean;
  error: string | null;
}

export function useLogs(alertId: string): UseLogsReturn {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [logs, setLogs] = useState<Log[]>([]);

  useEffect(() => {
    let mounted = true;

    const fetchLogs = async () => {
      if (!alertId) {
        setLogs([]);
        setError(null);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const response = await fetch('/api/logs', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ alert_id: alertId }),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        
        if (mounted) {
          if (data.error) {
            throw new Error(data.error);
          }

          setLogs(data.cloudtrail_logs || []);
        }
      } catch (err) {
        if (mounted) {
          console.error('Error fetching logs:', err);
          setError(err instanceof Error ? err.message : 'Failed to fetch logs');
          setLogs([]);
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    fetchLogs();

    return () => {
      mounted = false;
    };
  }, [alertId]);

  return { logs: logs || [], loading, error };
}