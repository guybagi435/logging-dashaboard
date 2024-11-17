"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import type { Log } from '@/types/logs';

interface LogTableProps {
  logs: Log[];
}

export function LogTable({ logs = [] }: LogTableProps) {
  const getEventColor = (eventName: string = '') => {
    switch (eventName.toLowerCase()) {
      case 'terminateinstances':
        return 'bg-red-100 text-red-700 border-red-200';
      case 'stopinstances':
        return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'deletesecuritygroup':
        return 'bg-purple-100 text-purple-700 border-purple-200';
      default:
        return 'bg-blue-100 text-blue-700 border-blue-200';
    }
  };

  const renderResponseElements = (responseElements) => {
    const formatValue = (value) => {
      if (typeof value === 'object' && value !== null) {
        // Recursively render nested objects or arrays
        return (
          <ul className="pl-4 border-l-2 border-gray-200">
            {Object.entries(value).map(([nestedKey, nestedValue]) => (
              <li key={nestedKey} className="py-1">
                <span className="font-medium text-indigo-700">{nestedKey}: </span>
                {formatValue(nestedValue)}
              </li>
            ))}
          </ul>
        );
      }
      return <span>{String(value)}</span>;
    };

    if (!responseElements || typeof responseElements !== 'object') {
      return <span className="text-gray-400">No details available</span>;
    }

    return (
      <div className="bg-gray-50 p-3 rounded-lg shadow-inner">
        <ul className="space-y-2 text-sm text-gray-600">
          {Object.entries(responseElements).map(([key, value]) => (
            <li key={key} className="flex flex-col">
              <span className="font-medium text-indigo-700">{key}</span>
              {formatValue(value)}
            </li>
          ))}
        </ul>
      </div>
    );
  };


  if (!Array.isArray(logs) || logs.length === 0) {
    return (
      <div className="text-center py-12 bg-gray-50 rounded-xl">
        <p className="text-gray-500">No logs available</p>
      </div>
    );
  }

  return (
    <div className="rounded-xl border-2 border-indigo-100 overflow-hidden bg-white">
      <Table>
        <TableHeader>
          <TableRow className="bg-gradient-to-r from-indigo-50 to-purple-50">
            <TableHead className="font-semibold text-indigo-900">Timestamp</TableHead>
            <TableHead className="font-semibold text-indigo-900">Event Name</TableHead>
            <TableHead className="font-semibold text-indigo-900">User</TableHead>
            <TableHead className="font-semibold text-indigo-900">Source IP</TableHead>
            <TableHead className="font-semibold text-indigo-900">Details</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {logs.map((log, index) => (
            <TableRow key={index} className="hover:bg-indigo-50/50">
              <TableCell className="font-medium">
                {new Date(log.timestamp || '').toLocaleString()}
              </TableCell>
              <TableCell>
                <Badge variant="outline" className={getEventColor(log.event_name)}>
                  {log.event_name || 'Unknown Event'}
                </Badge>
              </TableCell>
              <TableCell>
                {log.user_identity?.userName || 'Unknown User'}
              </TableCell>
              <TableCell>
                <code className="px-2 py-1 bg-gray-100 rounded-md text-gray-700 font-mono text-sm">
                  {log.source_ip || 'N/A'}
                </code>
              </TableCell>
              <TableCell>{renderResponseElements(log.response_elements)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
