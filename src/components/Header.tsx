'use client'

import { useState, useEffect } from 'react'
import { Moon, Sun, Monitor, LogOut, User, Shield } from 'lucide-react'

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
    <header className="border-b border-neutral-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50 dark:bg-dark-bg dark:border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-success-600 flex items-center justify-center">
            <Shield className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-warm-black dark:text-white">PermGuard</h1>
            <p className="text-xs text-neutral-600 dark:text-neutral-400">AI Permission Governance</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={cycleTheme}
            className="p-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors text-neutral-600 dark:text-neutral-400"
            title="Toggle theme"
          >
            {theme === 'light' && <Sun className="w-5 h-5" />}
            {theme === 'dark' && <Moon className="w-5 h-5" />}
            {theme === 'system' && <Monitor className="w-5 h-5" />}
          </button>

          {user ? (
            <div className="flex items-center gap-2">
              <div className="text-right">
                <p className="text-sm font-medium text-warm-black dark:text-white">{user.name}</p>
                <p className="text-xs text-neutral-600 dark:text-neutral-400">{user.email}</p>
              </div>
              <button className="p-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors text-neutral-600">
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