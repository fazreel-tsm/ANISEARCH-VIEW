import { render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import { store } from '../store'
import SearchPage from '../pages/SearchPage'

test('renders search input', () => {
  render(
    <Provider store={store}>
      <SearchPage />
    </Provider>
  )
  expect(screen.getByPlaceholderText(/Search anime/i)).toBeInTheDocument()
})
