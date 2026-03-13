'use client'

import { useState, useEffect } from 'react'
import { Moon, Sun, Monitor, LogOut, User } from 'lucide-react'

interface HeaderProps {
  user?: { name: string; email: string } | null
}

export default function Header({ user }: HeaderProps) {
  const [theme, setTheme] = useState<'light' | 'dark' | 'system'>('system')

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | 'system' | null
    if (savedTheme) setTheme(savedTheme)
  }, [])

  const cycleTheme = () => {
    const themes: ('light' | 'dark' | 'system')[] = ['light', 'dark', 'system']
    const currentIndex = themes.indexOf(theme)
    const nextTheme = themes[(currentIndex + 1) % themes.length]
    setTheme(nextTheme)
    localStorage.setItem('theme', nextTheme)
    
    if (nextTheme === 'dark') {
      document.documentElement.classList.add('dark')
    } else if (nextTheme === 'light') {
      document.documentElement.classList.remove('dark')
    } else {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      document.documentElement.classList.toggle('dark', prefersDark)
    }
  }

  return (
    <header className="border-b bg-white dark:bg-gray-900 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl gradient-bg flex items-center justify-center">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.822 10.29 9 11.622 5.178-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          <div>
            <h1 className="text-xl font-bold">PermitFlow</h1>
            <p className="text-xs text-gray-700 dark:text-gray-300">AI Permission Governance</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={cycleTheme}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            title="Toggle theme"
          >
            {theme === 'light' && <Sun className="w-5 h-5" />}
            {theme === 'dark' && <Moon className="w-5 h-5" />}
            {theme === 'system' && <Monitor className="w-5 h-5" />}
          </button>

          {user ? (
            <div className="flex items-center gap-2">
              <div className="text-right">
                <p className="text-sm font-medium">{user.name}</p>
                <p className="text-xs text-gray-700 dark:text-gray-300">{user.email}</p>
              </div>
              <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          ) : (
            <button className="btn-primary">
              <User className="w-4 h-4 mr-2" />
              Sign In
            </button>
          )}
        </div>
      </div>
    </header>
  )
}