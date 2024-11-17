"use client";

import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  return (
    <div className="flex items-center justify-between px-2">
      <Button
        variant="outline"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage <= 1}
        className="border-indigo-200 hover:bg-indigo-50 hover:text-indigo-600"
      >
        <ChevronLeft className="h-4 w-4 mr-2" />
        Previous
      </Button>
      <span className="text-sm font-medium text-indigo-600 bg-indigo-50 px-4 py-2 rounded-lg">
        Page {currentPage} of {totalPages}
      </span>
      <Button
        variant="outline"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage >= totalPages}
        className="border-indigo-200 hover:bg-indigo-50 hover:text-indigo-600"
      >
        Next
        <ChevronRight className="h-4 w-4 ml-2" />
      </Button>
    </div>
  );
}