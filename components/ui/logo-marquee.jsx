'use client'

import { useEffect, useRef } from 'react'
import { partnerLogosData } from '@/data/landing'

export function LogoMarquee() {
  const marqueeRef = useRef(null)

  useEffect(() => {
    const marquee = marqueeRef.current
    if (!marquee) return

    const handleMouseEnter = () => {
      marquee.style.animationPlayState = 'paused'
    }

    const handleMouseLeave = () => {
      marquee.style.animationPlayState = 'running'
    }

    marquee.addEventListener('mouseenter', handleMouseEnter)
    marquee.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      marquee.removeEventListener('mouseenter', handleMouseEnter)
      marquee.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [])

  return (
    <div className="w-full overflow-hidden bg-white dark:bg-gray-900 py-12">
      <div className="relative flex justify-center">
        <div
          ref={marqueeRef}
          className="flex animate-marquee whitespace-nowrap"
          style={{
            animation: 'marquee 30s linear infinite',
          }}
        >
          {partnerLogosData.map((logo, index) => (
            <a
              key={`${logo.name}-${index}`}
              href={logo.link}
              target="_blank"
              rel="noopener noreferrer"
              className="mx-12 flex items-center justify-center hover:scale-110 transition-transform duration-300"
            >
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 flex items-center justify-center">
                  {logo.icon}
                </div>
                <span className="mt-3 text-sm font-medium text-gray-600 dark:text-gray-400">
                  {logo.name}
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </div>
  )
} 