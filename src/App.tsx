import React from 'react'
import RoutesApp from './routes'
import { ErrorBoundary } from './components/ErrorBoundary'

export default function App() {
  return (
    <ErrorBoundary>
      <RoutesApp />
    </ErrorBoundary>
  )
}
