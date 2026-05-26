import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Pagination, PaginationContent, PaginationItem, PaginationLink } from '@/components/ui/pagination';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import React, { useState } from 'react';

interface Column<T> {
  key: keyof T | string;
  header?: string;
  title?: string;
  cell?: (props: { value: any; row: T; rowIndex: number }) => React.ReactNode;
  sortable?: boolean;
  className?: string;
  render?: (value: any, row: T) => React.ReactNode;
}

interface DataTableProps<T extends Record<string, any>> {
  data: T[];
  columns: Column<T>[];
  caption?: string;
  className?: string;
  onRowSelect?: (row: T, selected: boolean) => void;
  allowSelection?: boolean;
  initialPage?: number;
  pageSize?: number;
  searchable?: boolean;
  searchPlaceholder?: string;
  filters?: Array<{
    id: string;
    label: string;
    options: Array<{ value: string; label: string }>;
    defaultValue?: string;
  }>;
  onFilterChange?: (filters: Record<string, string>) => void;
  actions?: (row: T) => React.ReactNode;
  pagination?: boolean;
}

const DataTable = <T extends Record<string, any>>({
  data,
  columns,
  caption,
  className = '',
  onRowSelect,
  allowSelection = false,
  initialPage = 1,
  pageSize = 10,
  searchable = false,
  searchPlaceholder = 'Search...',
  filters = [],
  onFilterChange,
}: DataTableProps<T>) => {
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterValues, setFilterValues] = useState<Record<string, string>>({});
  const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set());

  // Handle filter change
  const handleFilterChange = (filterId: string, value: string) => {
    const newFilters = { ...filterValues, [filterId]: value };
    setFilterValues(newFilters);
    setCurrentPage(1);
    if (onFilterChange) onFilterChange(newFilters);
  };

  // Filter and sort data
  const filteredData = data.filter((item) => {
    // Search filter
    if (searchQuery) {
      const searchLower = searchQuery.toLowerCase();
      const matchesSearch = Object.values(item).some(
        (value) =>
          value &&
          String(value).toLowerCase().includes(searchLower)
      );
      if (!matchesSearch) return false;
    }

    // Apply other filters
    for (const [filterId, filterValue] of Object.entries(filterValues)) {
      if (!filterValue) continue;
      if (String(item[filterId]) !== filterValue) return false;
    }

    return true;
  });

  // Pagination
  const totalPages = Math.ceil(filteredData.length / pageSize);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  // Handle row selection
  const handleRowSelection = (row: T, checked: boolean) => {
    const newSelectedRows = new Set(selectedRows);
    const rowId = row.id || row._id || JSON.stringify(row);

    if (checked) {
      newSelectedRows.add(rowId);
    } else {
      newSelectedRows.delete(rowId);
    }

    setSelectedRows(newSelectedRows);
    if (onRowSelect) onRowSelect(row, checked);
  };

  // Handle select all
  const handleSelectAll = (checked: boolean) => {
    const newSelectedRows = new Set<string>();
    if (checked) {
      paginatedData.forEach((row) => {
        const rowId = row.id || row._id || JSON.stringify(row);
        newSelectedRows.add(rowId);
        if (onRowSelect) onRowSelect(row, true);
      });
    } else {
      paginatedData.forEach((row) => {
        if (onRowSelect) onRowSelect(row, false);
      });
    }
    setSelectedRows(newSelectedRows);
  };

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Table header with search and filters */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="space-y-2 w-full sm:w-auto">
          {searchable && (
            <div className="relative w-full sm:w-64">
              <Input
                type="search"
                placeholder={searchPlaceholder}
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                className="pl-9"
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </div>
          )}
        </div>

        <div className="flex flex-wrap gap-2 w-full sm:w-auto">
          {filters.map((filter) => (
            <div key={filter.id} className="w-full sm:w-auto">
              <Select
                value={filterValues[filter.id] || ''}
                onValueChange={(value) => handleFilterChange(filter.id, value)}
              >
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder={filter.label} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All {filter.label}</SelectItem>
                  {filter.options.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          {caption && <TableCaption>{caption}</TableCaption>}
          <TableHeader>
            <TableRow>
              {allowSelection && (
                <TableHead className="w-[40px]">
                  <Checkbox
                    checked={paginatedData.length > 0 &&
                      paginatedData.every((row) => {
                        const rowId = row.id || row._id || JSON.stringify(row);
                        return selectedRows.has(rowId);
                      })}
                    onCheckedChange={handleSelectAll}
                    aria-label="Select all"
                  />
                </TableHead>
              )}
              {columns.map((column) => (
                <TableHead key={String(column.key)} className={column.className}>
                  {column.header || column.title}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedData.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length + (allowSelection ? 1 : 0)}
                  className="h-24 text-center"
                >
                  No data available
                </TableCell>
              </TableRow>
            ) : (
              paginatedData.map((row, rowIndex) => (
                <TableRow key={row.id || rowIndex}>
                  {allowSelection && (
                    <TableCell>
                      <Checkbox
                        checked={selectedRows.has(
                          row.id || row._id || JSON.stringify(row)
                        )}
                        onCheckedChange={(checked) =>
                          handleRowSelection(row, checked as boolean)
                        }
                        aria-label={`Select ${row.id || rowIndex}`}
                      />
                    </TableCell>
                  )}
                  {columns.map((column) => {
                    const value = column.key in row ? row[column.key] : undefined;
                    return (
                      <TableCell key={String(column.key)} className={column.className}>
                        {column.cell
                          ? column.cell({ value, row, rowIndex })
                          : column.render
                            ? column.render(value, row)
                            : value
                        }
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-between items-center">
          <div className="text-sm text-muted-foreground">
            Showing {paginatedData.length > 0 ? (currentPage - 1) * pageSize + 1 : 0} to
            {Math.min(currentPage * pageSize, filteredData.length)} of {filteredData.length} results
          </div>
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <button
                  type="button"
                  onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="inline-flex items-center gap-1 px-2.5 py-1 text-sm rounded-md border border-input bg-background hover:bg-accent hover:text-accent-foreground disabled:opacity-50 disabled:pointer-events-none"
                >
                  Previous
                </button>
              </PaginationItem>
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                let pageNum: number;
                if (totalPages <= 5) {
                  pageNum = i + 1;
                } else if (currentPage <= 3) {
                  pageNum = i + 1;
                } else if (currentPage >= totalPages - 2) {
                  pageNum = totalPages - 4 + i;
                } else {
                  pageNum = currentPage - 2 + i;
                }
                return (
                  <PaginationItem key={pageNum}>
                    <PaginationLink
                      onClick={() => setCurrentPage(pageNum)}
                      className={currentPage === pageNum ? 'font-medium' : ''}
                      isActive={currentPage === pageNum}
                    >
                      {pageNum}
                    </PaginationLink>
                  </PaginationItem>
                );
              })}
              <PaginationItem>
                <button
                  type="button"
                  onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="inline-flex items-center gap-1 px-2.5 py-1 text-sm rounded-md border border-input bg-background hover:bg-accent hover:text-accent-foreground disabled:opacity-50 disabled:pointer-events-none"
                >
                  Next
                </button>
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </div>
  );
};

export { DataTable };
export default DataTable;
