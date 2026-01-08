'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  basePath: string;
}

export function Pagination({ currentPage, totalPages, basePath }: PaginationProps) {
  if (totalPages <= 1) return null;

  const pages: (number | string)[] = [];

  // First page
  pages.push(1);

  // Previous pages
  if (currentPage > 3) pages.push('...');
  if (currentPage > 2) pages.push(currentPage - 1);

  // Current page
  if (currentPage !== 1 && currentPage !== totalPages) {
    pages.push(currentPage);
  }

  // Next pages
  if (currentPage < totalPages - 1) pages.push(currentPage + 1);
  if (currentPage < totalPages - 2) pages.push('...');

  // Last page
  if (totalPages > 1) pages.push(totalPages);

  return (
    <nav className="flex items-center justify-center gap-2" aria-label="Pagination">
      {/* Previous button */}
      {currentPage > 1 ? (
        <Link
          href={`${basePath}?page=${currentPage - 1}`}
          className="rounded-lg bg-viola-light px-3 py-2 text-sm font-medium text-viola-dark transition-colors hover:bg-viola-purple hover:text-white"
        >
          ← Previous
        </Link>
      ) : (
        <button
          disabled
          className="cursor-not-allowed rounded-lg bg-gray-200 px-3 py-2 text-sm font-medium text-gray-400"
        >
          ← Previous
        </button>
      )}

      {/* Page numbers */}
      {pages.map((page, i) =>
        page === '...' ? (
          <span key={`ellipsis-${i}`} className="px-2">
            …
          </span>
        ) : (
          <Link
            key={page}
            href={`${basePath}?page=${page}`}
            className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
              page === currentPage
                ? 'bg-viola-purple text-white'
                : 'bg-viola-light text-viola-dark hover:bg-viola-purple hover:text-white'
            }`}
          >
            {page}
          </Link>
        )
      )}

      {/* Next button */}
      {currentPage < totalPages ? (
        <Link
          href={`${basePath}?page=${currentPage + 1}`}
          className="rounded-lg bg-viola-light px-3 py-2 text-sm font-medium text-viola-dark transition-colors hover:bg-viola-purple hover:text-white"
        >
          Next →
        </Link>
      ) : (
        <button
          disabled
          className="cursor-not-allowed rounded-lg bg-gray-200 px-3 py-2 text-sm font-medium text-gray-400"
        >
          Next →
        </button>
      )}
    </nav>
  );
}
