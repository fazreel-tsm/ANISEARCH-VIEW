import React from 'react'

interface Props {
  current: number
  last: number
  onPage: (p: number) => void
}

export default function Pagination({ current, last, onPage }: Props) {
  const pages: number[] = []
  const start = Math.max(1, current - 2)
  const end = Math.min(last, current + 2)
  for (let i = start; i <= end; i++) pages.push(i)

  return (
    <div className="flex items-center justify-center gap-2 mt-6 select-none">
      {/* Prev button */}
      <button
        onClick={() => onPage(current - 1)}
        disabled={current <= 1}
        className={`px-3 py-1.5 rounded-md text-sm transition
          ${current <= 1
            ? 'opacity-40 cursor-not-allowed'
            : 'hover:bg-gray-200 dark:hover:bg-gray-700 active:scale-95'}
        `}
      >
        Prev
      </button>

      {/* First + Ellipsis */}
      {start > 1 && (
        <>
          <button
            onClick={() => onPage(1)}
            className="px-3 py-1.5 rounded-md text-sm hover:bg-gray-200 dark:hover:bg-gray-700 transition"
          >
            1
          </button>
          {start > 2 && <span className="text-gray-400">…</span>}
        </>
      )}

      {/* Middle pages */}
      {pages.map((p) => (
        <button
          key={p}
          onClick={() => onPage(p)}
          className={`px-3 py-1.5 rounded-md text-sm transition
            ${
              p === current
                ? 'bg-gray-800 text-white dark:bg-gray-200 dark:text-black font-semibold'
                : 'hover:bg-gray-200 dark:hover:bg-gray-700'
            }`}
        >
          {p}
        </button>
      ))}

      {/* Last + Ellipsis */}
      {end < last && (
        <>
          {end < last - 1 && <span className="text-gray-400">…</span>}
          <button
            onClick={() => onPage(last)}
            className="px-3 py-1.5 rounded-md text-sm hover:bg-gray-200 dark:hover:bg-gray-700 transition"
          >
            {last}
          </button>
        </>
      )}

      {/* Next button */}
      <button
        onClick={() => onPage(current + 1)}
        disabled={current >= last}
        className={`px-3 py-1.5 rounded-md text-sm transition
          ${current >= last
            ? 'opacity-40 cursor-not-allowed'
            : 'hover:bg-gray-200 dark:hover:bg-gray-700 active:scale-95'}
        `}
      >
        Next
      </button>
    </div>
  )
}
