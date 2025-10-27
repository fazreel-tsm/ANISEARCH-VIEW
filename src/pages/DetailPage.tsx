import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import Header from '../components/Header'
import { getAnimeById } from '../api/jikan'
import { formatDateToKL } from '../utils/formatDateKL'

export default function DetailPage() {
  const { id } = useParams()
  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!id) return
    setLoading(true)
    const realId = id.split('-')[0]
    getAnimeById(Number(realId))
      .then((r) => setData(r.data))
      .catch((e) => {
        console.error(e)
        setError(e?.message || 'Failed to load')
      })
      .finally(() => setLoading(false))
  }, [id])

  return (
    <div>
      <Header />
      <main className="p-4 max-w-4xl mx-auto">
        <Link to="/" className="text-sm">← Back</Link>
        {loading && <div>Loading…</div>}
        {error && <div className="text-red-600">{error}</div>}
        {data && (
          <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
            <img src={data.images.jpg.image_url} alt={data.title} className="w-full object-cover" />
            <div className="md:col-span-2">
              <h1 className="text-2xl font-bold">{data.title}</h1>
              <div className="text-sm text-gray-500">{data.type} • {data.episodes} ep</div>
              <div className="mt-2">{data.synopsis}</div>
              <div className="mt-4 text-sm text-gray-600">Aired: {formatDateToKL(data.aired?.from)} — {formatDateToKL(data.aired?.to)}</div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
