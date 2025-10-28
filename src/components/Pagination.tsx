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

  const defaultClass = "text-sm transition rounded-md px-3 py-1.5 text-text active:scale-95 backdrop-blur-xl"
  const defaultClassActive = "bg-pagination-active font-semibold "
  const defaultClassInactive = "bg-transparent hover:bg-pagination-hover "

  return (
    <div className="flex items-center justify-center gap-2 mt-6 select-none">
      {/* Prev button */}
      <button
        onClick={() => onPage(current - 1)}
        disabled={current <= 1}
        className={`${defaultClass}
          ${current <= 1
            ? 'opacity-40 cursor-not-allowed'
            : defaultClassInactive}
        `}
      >
        Prev
      </button>

      {/* First + Ellipsis */}
      {start > 1 && (
        <>
          <button
            onClick={() => onPage(1)}
            className={defaultClass + defaultClassInactive}
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
          className={`${defaultClass}
            ${
              p === current
                ? defaultClassActive
                : defaultClassInactive
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
            className={defaultClass + defaultClassInactive}
          >
            {last}
          </button>
        </>
      )}

      {/* Next button */}
      <button
        onClick={() => onPage(current + 1)}
        disabled={current >= last}
        className={`${defaultClass}
          ${current >= last
            ? 'opacity-40 cursor-not-allowed'
            : defaultClassInactive}
        `}
      >
        Next
      </button>
    </div>
  )
}
