'use client'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Home, Plus, ChevronLeft, ChevronRight,
  Sun, Moon, Search
} from 'lucide-react'

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [darkMode, setDarkMode] = useState(false)
  const [activeItem, setActiveItem] = useState('Dashboard')

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    if (isMobile && !isCollapsed) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
  }, [isMobile, isCollapsed])

  // Load theme from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme')
    if (savedTheme === 'dark') {
      document.documentElement.classList.add('dark')
      setDarkMode(true)
    }
  }, [])

  const toggleSidebar = () => setIsCollapsed(!isCollapsed)

  // 🌙 Apply dark mode globally by toggling it on <html>
  const toggleDarkMode = () => {
    const html = document.documentElement
    const isDark = html.classList.contains('dark')
    if (isDark) {
      html.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    } else {
      html.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    }
    setDarkMode(!isDark)
  }

  const navItems = [
    { name: 'Dashboard', icon: Home, href: '/' },
    { name: 'Add Transaction', icon: Plus, href: '/transaction/create' }
  ]

  return (
    <>
      {isMobile && !isCollapsed && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          onClick={toggleSidebar}
        />
      )}

      <motion.div
        initial={{ width: isMobile ? 0 : 256 }}
        animate={{
          width: isCollapsed
            ? (isMobile ? 0 : 80)
            : (isMobile ? '75%' : 256),
          opacity: 1
        }}
        exit={{ width: 0, opacity: 0 }}
        transition={{ type: 'spring', damping: 20 }}
        className={`fixed md:relative top-0 left-0 h-screen flex flex-col z-50 
          bg-white dark:bg-gray-800 shadow-lg border-r 
          border-gray-200 dark:border-gray-700 
          ${isMobile ? 'max-w-[75%]' : ''}`}
      >
        {/* Header */}
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <AnimatePresence>
            {!isCollapsed && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-2">
                    <span className="text-indigo-600 dark:text-indigo-400 text-3xl font-extrabold tracking-tight">
                      💰
                    </span>
                    <h1 className="text-2xl font-extrabold tracking-tight text-gray-900 dark:text-white">
                      Auto<span className="text-indigo-600 dark:text-indigo-400">Fin</span>
                    </h1>
                  </div>
                  <button
                    onClick={toggleSidebar}
                    className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    <ChevronLeft className="text-gray-500 dark:text-gray-400" />
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {isCollapsed && (
            <div className="flex justify-center">
              <button
                onClick={toggleSidebar}
                className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <ChevronRight className="text-gray-500 dark:text-gray-400" />
              </button>
            </div>
          )}
        </div>

        {/* Search Bar */}
        <AnimatePresence>
          {!isCollapsed && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="px-4 py-3"
            >
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-full pl-10 pr-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 
                    text-gray-800 dark:text-white focus:outline-none focus:ring-2 
                    focus:ring-blue-500 dark:focus:ring-blue-400"
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-2">
          <ul>
            {navItems.map((item) => (
              <li key={item.name}>
                <Link
                  href={item.href}
                  onClick={() => {
                    setActiveItem(item.name)
                    if (isMobile) setIsCollapsed(true)
                  }}
                  className={`flex items-center w-full px-4 py-3 text-left no-underline
                    ${activeItem === item.name
                      ? 'bg-blue-50 dark:bg-gray-700 text-blue-600 dark:text-blue-400'
                      : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`}
                >
                  <item.icon className="w-5 h-5" />
                  {!isCollapsed && (
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="ml-3"
                    >
                      {item.name}
                    </motion.span>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-center">
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              {darkMode ? (
                <Sun className="text-yellow-400" />
              ) : (
                <Moon className="text-gray-600" />
              )}
            </button>
          </div>
        </div>
      </motion.div>
    </>
  )
}

export default Sidebar
