import React, { useEffect, useState } from 'react'
import { Sun, Moon } from 'lucide-react'

export default function ThemeToggle() {
  const [dark, setDark] = useState(() => {
    const v = localStorage.getItem('theme')
    if (v) return v === 'dark'
    return window.matchMedia?.('(prefers-color-scheme: dark)').matches
  })

  useEffect(() => {
    const root = document.documentElement
    if (dark) {
      root.setAttribute('data-theme', 'dark')
      root.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      root.removeAttribute('data-theme')
      root.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
  }, [dark])

  return (
    <label className="relative inline-flex items-center cursor-pointer">
      {/* Hidden checkbox */}
      <input
        type="checkbox"
        checked={dark}
        onChange={() => setDark((s) => !s)}
        className="sr-only peer"
        aria-label="Toggle dark mode"
      />

      {/* Switch track */}
      <div
        className="
          w-12 h-7
          bg-gray-300 dark:bg-gray-700
          rounded-full
          transition-colors duration-300
          peer-checked:bg-[#A333FF]
        "
      ></div>

      {/* Moving knob with icon */}
      <div
        className="
          absolute top-[2px] left-[2px]
          flex items-center justify-center
          w-6 h-6
          rounded-full
          bg-white dark:bg-gray-900
          shadow-md
          transition-all duration-300
          peer-checked:translate-x-5
        "
      >
        {dark ? (
          <Moon className="w-4 h-4 text-[#A333FF] transition-all" />
        ) : (
          <Sun className="w-4 h-4 text-yellow-400 transition-all" />
        )}
      </div>
    </label>
  )
}
