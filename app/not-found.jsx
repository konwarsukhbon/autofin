'use client';

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import styles from "./not-found.module.css";
import { useEffect, useState } from "react";

export default function NotFound() {
  const [particles, setParticles] = useState([]);
  
  useEffect(() => {
    // Generate random particles
    const newParticles = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      speed: Math.random() * 2 + 0.5,
      symbol: Math.random() > 0.5 ? (Math.random() > 0.5 ? '0' : '1') : (Math.random() > 0.5 ? '$' : '€'),
      opacity: Math.random() * 0.7 + 0.3
    }));
    
    setParticles(newParticles);
    
    // Animate particles
    const interval = setInterval(() => {
      setParticles(prev => 
        prev.map(p => ({
          ...p,
          y: p.y > 100 ? 0 : p.y + p.speed,
          opacity: p.y > 90 ? p.opacity * 0.95 : p.opacity
        }))
      );
    }, 50);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`min-h-screen w-full relative flex items-center justify-center overflow-hidden ${styles.matrixBg}`}>
      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src="/image/ff.jpg"
          alt="Matrix background"
          fill
          priority
          quality={100}
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 100vw"
          style={{
            objectFit: 'cover',
            objectPosition: 'center'
          }}
        />
        {/* Overlay for better text visibility */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70" />
        
        {/* Volumetric god rays */}
        <div className={`absolute inset-0 ${styles.godRays}`}></div>
      </div>
      
      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {particles.map(particle => (
          <div 
            key={particle.id}
            className="absolute text-blue-400/70 font-mono"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              fontSize: `${particle.size}rem`,
              opacity: particle.opacity,
              transition: 'opacity 0.5s'
            }}
          >
            {particle.symbol}
          </div>
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-4xl mx-auto px-4 py-8 text-center">
        {/* Holographic 404 */}
        <div className="relative mb-8">
          <div className={`absolute inset-0 blur-xl bg-blue-500/30 rounded-full ${styles.pulse}`}></div>
          <h1 className={`text-7xl md:text-9xl font-bold tracking-wider ${styles.holographic} ${styles.animateBounce}`}>
            404
          </h1>
        </div>
        
        {/* Broken blockchain visualization */}
        <div className="relative mb-8">
          <div className={`w-24 h-24 mx-auto mb-4 ${styles.brokenChain}`}></div>
          <h2 className={`text-2xl md:text-4xl font-bold mb-8 text-blue-400 tracking-wide ${styles.glowText}`}>
            PAGE NOT FOUND IN THE MATRIX
          </h2>
        </div>

        <div className="max-w-2xl mx-auto mb-12">
          <p className="text-lg md:text-xl text-blue-300 mb-4">
            "This is your last chance. After this, there is no turning back. You take the blue pill—the story ends, you wake up in your bed and believe whatever you want to believe. You take the red pill—you stay in Wonderland and I show you how deep the rabbit-hole goes."
          </p>
          <p className="text-base md:text-lg text-blue-200">
            The page you're looking for has been disconnected from the Matrix.
          </p>
        </div>

        {/* AI-guided path */}
        <div className="relative mb-8">
          <div className={`w-full h-1 ${styles.aiPath}`}></div>
        </div>

        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center max-w-lg mx-auto">
          <Link href="/" className="w-full sm:w-auto">
            <Button 
              className={`w-full sm:w-auto bg-blue-600/80 backdrop-blur-sm hover:bg-blue-700 text-white px-8 py-3 text-lg 
                       transition-all duration-300 hover:scale-105 hover:shadow-[0_0_15px_rgba(0,0,255,0.5)] ${styles.glassMorphism}`}
            >
              Blue Pill: Return Home
            </Button>
          </Link>
          <Link href="/dashboard" className="w-full sm:w-auto">
            <Button 
              className={`w-full sm:w-auto bg-red-600/80 backdrop-blur-sm hover:bg-red-700 text-white px-8 py-3 text-lg 
                       transition-all duration-300 hover:scale-105 hover:shadow-[0_0_15px_rgba(255,0,0,0.5)] ${styles.glassMorphism}`}
            >
              Red Pill: Go Deeper
            </Button>
          </Link>
        </div>
        
        {/* AI Assistant */}
        <div className={`fixed top-4 right-4 w-32 h-32 ${styles.aiAssistant}`}></div>
      </div>
    </div>
  );
}
