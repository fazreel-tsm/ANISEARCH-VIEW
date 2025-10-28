import React from 'react'
import { Routes, Route } from 'react-router-dom'
import SearchPage from './pages/SearchPage'
import DetailPage from './pages/DetailPage'
import NotFoundPage from './pages/NotFoundPage'

export default function RoutesApp() {
  return (
    <Routes>
      <Route path="/" element={<SearchPage />} />
      <Route path="/anime/:id" element={<DetailPage />} />

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}
