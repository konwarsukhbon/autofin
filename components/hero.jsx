"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Button } from "../components/ui/button1.jsx";
import Link from "next/link";
import { InteractiveHoverButton } from "./magicui/interactive-hover-button";
import { Bot, Shield, TrendingUp, Users, Sparkles, UserCheck, ChevronRight, Star, Zap } from 'lucide-react';

export function AutoFinHero() {
  const [currentExpense, setCurrentExpense] = useState(0);
  const [showChart, setShowChart] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const expenses = [
    { amount: '₹ 1,200', category: 'Office Supplies', color: 'bg-blue-100 text-blue-800' },
    { amount: '₹ 3,500', category: 'Marketing', color: 'bg-green-100 text-green-800' },
    { amount: '₹ 2,800', category: 'Travel', color: 'bg-purple-100 text-purple-800' },
    { amount: '₹ 1,950', category: 'Software', color: 'bg-orange-100 text-orange-800' }
  ];
  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setCurrentExpense(prev => {
        const next = (prev + 1) % expenses.length;
        if (next === 0) {
          setShowChart(true);
          setTimeout(() => setShowChart(false), 3000);
        }
        return next;
      });
    }, 2500);
    return () => clearInterval(interval);
  }, [expenses.length]);
  return (
    <section className="w-full bg-gradient-to-br from-slate-50 via-white to-blue-50/40 rounded-3xl shadow-2xl px-6 sm:px-12 py-16 lg:py-24 mb-20 relative overflow-hidden">
      {/* Enhanced Decorative Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-indigo-200/30 to-purple-200/30 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-gradient-to-tr from-yellow-200/30 to-orange-200/30 rounded-full blur-3xl animate-pulse delay-1000"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-pink-200/20 to-blue-200/20 rounded-full blur-2xl"></div>
      {/* Enhanced Hero Grid */}
      <div className={`flex flex-col lg:flex-row items-center gap-16 lg:gap-24 max-w-7xl mx-auto relative z-10 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        
        {/* Left: Enhanced Content */}
        <div className="flex-1 max-w-2xl">
          {/* Premium Trust Badges */}
          <div className="flex flex-wrap gap-3 mb-8">
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-emerald-100 to-green-100 text-emerald-800 font-bold rounded-full text-sm shadow-md border border-emerald-200">
              <Shield className="w-4 h-4" /> Bank-Free Security
            </span>
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-800 font-bold rounded-full text-sm shadow-md border border-blue-200">
              <Zap className="w-4 h-4" /> 30-Day Beta Access
            </span>
            <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-yellow-100 to-amber-100 text-amber-800 font-semibold rounded-full text-xs border border-amber-200">
              <Star className="w-3 h-3" /> 50+ Early Users
            </span>
          </div>
          {/* Powerful Headlines */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif font-extrabold leading-tight text-gray-900 mb-6">
  Finance{' '}
  <span className="relative">
    <span className="bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 bg-clip-text text-transparent">
      Without
    </span>
    <div className=" h-2 bg-gradient-to-r from-yellow-300/40 to-red-300/40 rounded-full  "></div>
  </span>{' '}
  the{' '}
  <span className="relative">
    <span className="bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 bg-clip-text text-transparent">
      Strings
    </span>
    <div className="h-2 bg-gradient-to-r from-yellow-300/40 to-red-300/40 rounded-full "></div>
  </span>
</h1>

<h2 className="text-2xl sm:text-3xl lg:text-4xl font-sans font-semibold text-indigo-800 mb-8 leading-snug">
  AutoFin – AI-powered finance that{' '}
  <span className="relative inline-block">
    <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
      puts clarity and control first
    </span>
    <div className="absolute -bottom-1 left-0 right-0 h-1 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full"></div>
  </span>
</h2>

<p className="text-lg sm:text-xl text-gray-700 mb-8 leading-relaxed font-normal">
  We believe smart finance doesn't need complexity. AutoFin helps you track and manage spending on your terms — without linking banks or compromising data.
  <span className="block mt-2 text-indigo-700 font-semibold">
    Designed for modern teams who value transparency, speed, and simplicity.
  </span>
</p>

          {/* Enhanced Features Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
            {[
              { text: 'Manual Entry, Maximum Flexibility', icon: '🎯' },
              { text: 'No Bank Linking Required', icon: '🔒' },
              { text: 'AI-Driven Budgets & Insights', icon: '🤖' },
              { text: 'Built for Teams & Founders', icon: '👥' }
            ].map((feature, idx) => (
              <div key={idx} className="flex items-center gap-3 p-3 bg-white/60 backdrop-blur-sm rounded-xl border border-gray-100 hover:shadow-md transition-all duration-300 hover:scale-105">
                <span className="text-2xl">{feature.icon}</span>
                <span className="text-gray-800 font-medium text-sm">{feature.text}</span>
              </div>
            ))}
          </div>
          {/* Enhanced Value Proposition */}
          <div className="bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50 border-2 border-indigo-100 rounded-3xl p-6 mb-8 shadow-lg">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center flex-shrink-0">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-lg font-bold text-gray-900 mb-2">
                  🚀 Your data, your control. Smarter finance starts here.
                </p>
                <p className="text-gray-700 font-medium">
                  Join 50+ innovative businesses who've ditched legacy banking tools for complete financial autonomy and AI-powered insights.
                </p>
              </div>
            </div>
          </div>
          {/* Premium CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <Link href="/dashboard">
              <span className="group px-8 py-4 bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 text-white font-bold rounded-2xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 text-center relative overflow-hidden">
              <span className="relative z-10 flex items-center justify-center gap-2">
                Start Free Trial 
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </span>
            </Link>
            <a href="#features" className="px-8 py-4 border-2 border-indigo-600 text-indigo-700 font-bold rounded-2xl hover:bg-indigo-50 hover:scale-105 transition-all duration-300 text-center group">
              <span className="flex items-center justify-center gap-2">
                See How It Works 
                <TrendingUp className="w-5 h-5 group-hover:rotate-12 transition-transform" />
              </span>
            </a>
          </div>
          {/* Enhanced Social Proof */}
          <div className="flex items-center gap-4 p-5 bg-white/90 backdrop-blur-md border border-gray-200 rounded-3xl shadow-lg max-w-md hover:shadow-xl transition-all duration-300">
            <div className="flex -space-x-3">
              {[
                { char: 'A', bg: 'from-blue-500 to-blue-600' },
                { char: 'I', bg: 'from-purple-500 to-purple-600' },
                { char: '★', bg: 'from-yellow-500 to-yellow-600' }
              ].map((avatar, i) => (
                <div key={i} className={`w-10 h-10 bg-gradient-to-br ${avatar.bg} rounded-full border-3 border-white text-white font-bold flex items-center justify-center shadow-lg`}>
                  {avatar.char}
                </div>
              ))}
            </div>
            <div>
              <p className="text-gray-900 font-semibold mb-1">
                "Finally, a finance tool we can trust and control."
              </p>
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                ))}
                <span className="text-sm text-gray-500 ml-2">— Startup Founder</span>
              </div>
            </div>
          </div>
        </div>
        {/* Right: Enhanced Interactive Demo */}
        <div className="flex-1 max-w-lg w-full">
          <div className="relative">
            {/* Main Demo Container with Glass Effect */}
            <div className="bg-white/95 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/50 relative overflow-hidden">
              {/* Animated Background */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-indigo-50/50 rounded-3xl"></div>
              
              <div className="relative z-10">
                <div className="text-center mb-8">
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-100 to-purple-100 rounded-full mb-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-sm font-semibold text-indigo-800">Live Demo</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-1">See AutoFin in Action</h3>
                  <p className="text-sm text-gray-600">Real-time expense tracking → AI insights</p>
                </div>
                {/* Enhanced Expense Animation */}
                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-2 text-sm text-gray-600 font-medium">
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse shadow-lg"></div>
                    Manual Entry
                  </div>
                  
                  <div className="space-y-2">
                    {expenses.map((expense, i) => (
                      <div
                        key={i}
                        className={`flex justify-between items-center px-5 py-3 rounded-2xl border-2 transition-all duration-700 ${
                          i === currentExpense
                            ? 'border-indigo-300 bg-gradient-to-r from-indigo-50 to-purple-50 shadow-lg scale-105 transform'
                            : 'border-gray-200 bg-gray-50/80 opacity-60 scale-95'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <span className="font-bold text-gray-900 text-lg">{expense.amount}</span>
                          <span className={`px-2 py-1 rounded-full text-xs font-semibold ${expense.color}`}>
                            {expense.category}
                          </span>
                        </div>
                        {i === currentExpense && (
                          <div className="w-2 h-2 bg-indigo-500 rounded-full animate-ping"></div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
                {/* Enhanced AI Processing */}
                <div className="border-t-2 border-gray-100 pt-6">
                  <div className="flex items-center justify-center gap-3 mb-6">
                    <div className="relative">
                      <Bot className="text-indigo-500 w-8 h-8 animate-spin" />
                      <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                    </div>
                    <span className="text-indigo-700 font-bold text-lg">AI Processing...</span>
                  </div>
                  {/* Enhanced Chart Visualization */}
                  <div className={`transition-all duration-1000 ${showChart ? 'opacity-100 scale-100 translate-y-0' : 'opacity-50 scale-95 translate-y-2'}`}>
                    <div className="bg-gradient-to-r from-yellow-100 via-orange-100 to-indigo-100 rounded-2xl p-5 mb-4 border border-yellow-200">
                      <div className="flex justify-between items-center mb-3">
                        <span className="font-bold text-gray-800">Budget Analysis</span>
                        <div className="flex items-center gap-1">
                          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                          <span className="text-sm text-gray-600 font-medium">Real-time</span>
                        </div>
                      </div>
                      <div className="h-20 bg-gradient-to-r from-yellow-300 via-orange-300 to-indigo-400 rounded-xl flex items-center justify-center shadow-inner relative overflow-hidden">
                        <TrendingUp className="text-gray-700 w-8 h-8 z-10" />
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse"></div>
                      </div>
                    </div>
                  </div>
                  {/* Enhanced Bot Insight */}
                  <div className="bg-gradient-to-r from-indigo-50 to-purple-50 border-2 border-indigo-200 rounded-2xl p-5 shadow-md">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center flex-shrink-0">
                        <Bot className="text-white w-5 h-5" />
                      </div>
                      <div>
                        <p className="font-bold text-gray-900 mb-2">BondhuBot Insights:</p>
                        <div className="bg-white/80 rounded-lg p-3 border border-indigo-100">
                          <p className="text-sm text-gray-700 font-medium">
                            💡 "Marketing spend increased 40% this month. Consider budget reallocation to optimize ROI."
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Enhanced Floating Icons */}
            <div className="absolute -right-6 -top-6 bg-gradient-to-br from-yellow-100 to-amber-100 rounded-2xl p-4 shadow-xl border border-yellow-200 animate-bounce">
              <Users className="text-amber-600 w-6 h-6" />
            </div>
            
            <div className="absolute -left-6 -bottom-6 bg-gradient-to-br from-purple-100 to-pink-100 rounded-2xl p-4 shadow-xl border border-purple-200 animate-bounce delay-500">
              <UserCheck className="text-purple-600 w-6 h-6" />
            </div>
            {/* Additional Floating Elements */}
            <div className="absolute top-1/2 -right-8 bg-gradient-to-br from-green-100 to-emerald-100 rounded-full p-3 shadow-lg animate-pulse">
              <Shield className="text-green-600 w-5 h-5" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const HeroSection = () => {
  const imageRef = useRef(null);

  useEffect(() => {
    const imageElement = imageRef.current;

    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const scrollThreshold = 100;

      if (scrollPosition > scrollThreshold) {
        imageElement.classList.add("scrolled");
      } else {
        imageElement.classList.remove("scrolled");
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="pt-40 pb-20 px-4">
      <div className="container mx-auto text-center tracking-tight">
        <h1 className="text-5xl md:text-8xl lg:text-[105px] pb-6 gradient-title">
          Manage Your Finances <br /> with Intelligence
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          An AI-powered financial management platform that helps you track,
          analyze, and optimize your spending with real-time insights.
        </p>
        <div className="flex justify-center space-x-4">
          <Link href="/dashboard">
            <InteractiveHoverButton size="lg" className="px-8">
              Get Started
            </InteractiveHoverButton>
          </Link>
          <Link href="/knowmorepage">
            <Button size="lg" variant="outline" className="px-8">
              Know More
            </Button>
          </Link>
        </div>
        <div className="hero-image-wrapper mt-5 md:mt-0">
          <div ref={imageRef} className="hero-image">
            <Image
              src="/banner.jpeg"
              width={1280}
              height={720}
              alt="Dashboard Preview"
              className="rounded-lg shadow-2xl border mx-auto"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
