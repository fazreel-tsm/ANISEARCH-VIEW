import reducer, { setQuery, setPage } from '../store/animeSlice'

test('setQuery sets query', () => {
  const prev = { query: '', page: 1, results: [], loading: false }
  const next = reducer(prev as any, setQuery('naruto'))
  expect(next.query).toBe('naruto')
})
