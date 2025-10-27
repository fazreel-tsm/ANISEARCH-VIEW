import React from 'react'

interface Props {
  current: number
  last: number
  onPage: (p: number) => void
}

export default function Pagination({ current, last, onPage }: Props) {
  const pages = [] as number[]
  const start = Math.max(1, current - 2)
  const end = Math.min(last, current + 2)
  for (let i = start; i <= end; i++) pages.push(i)

  return (
    <div className="flex items-center gap-2 mt-4">
      <button disabled={current <= 1} onClick={() => onPage(current - 1)} className="px-3 py-1 border rounded">
        Prev
      </button>
      {start > 1 && (
        <>
          <button onClick={() => onPage(1)} className="px-2">
            1
          </button>
          {start > 2 && <span>…</span>}
        </>
      )}
      {pages.map((p) => (
        <button key={p} onClick={() => onPage(p)} className={`px-3 py-1 border rounded ${p === current ? 'font-bold' : ''}`}>
          {p}
        </button>
      ))}
      {end < last && (
        <>
          {end < last - 1 && <span>…</span>}
          <button onClick={() => onPage(last)} className="px-2">
            {last}
          </button>
        </>
      )}
      <button disabled={current >= last} onClick={() => onPage(current + 1)} className="px-3 py-1 border rounded">
        Next
      </button>
    </div>
  )
}
