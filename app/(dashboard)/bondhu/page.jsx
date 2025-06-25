'use client'

import { useUser } from '@clerk/nextjs'
import { Bot } from 'lucide-react'
import BondhuChat from '../../../components/BondhuChat.jsx'

export default function AssistantPage() {
  const { isLoaded, isSignedIn } = useUser();

  if (!isLoaded) return <p>Loading...</p>;
  if (!isSignedIn) return <p>Unauthorized</p>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center space-x-3 mb-8">
        <Bot className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Bondhu</h1>
      </div>
      
      <div className="mb-6">
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Hi 👋, I'm Bondhu! Ask me anything about your budget!
        </p>
      </div>

      <div className="max-w-4xl mx-auto">
        <BondhuChat />
      </div>
    </div>
  )
} 