"use client";

import React, { useEffect, useRef } from "react";
import HeroSection from "@/components/hero";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { featuresData, howItWorksData, statsData, testimonialsData } from "@/data/landing";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const sectionRefs = useRef([]);
  const cardRefs = useRef([]);

  useEffect(() => {
    // Animate sections
    sectionRefs.current.forEach((section, index) => {
      gsap.fromTo(
        section,
        {
          opacity: 0,
          y: 50,
        },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            end: "top 20%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });

    // Animate cards with stagger
    cardRefs.current.forEach((cards, sectionIndex) => {
      gsap.fromTo(
        cards,
        {
          opacity: 0,
          y: 30,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          scrollTrigger: {
            trigger: cards[0],
            start: "top 80%",
            end: "top 20%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });

    return () => {
      // Cleanup ScrollTrigger instances
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div className="mt-40">
      <HeroSection />

      {/* Stats Section */}
      <section ref={el => sectionRefs.current[0] = el} className="py-20 bg-gray-900 text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {statsData.map((stat, index) => (
              <div key={index} ref={el => {
                if (!cardRefs.current[0]) cardRefs.current[0] = [];
                cardRefs.current[0][index] = el;
              }}>
                <div className="text-3xl font-bold">{stat.value}</div>
                <div className="text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section ref={el => sectionRefs.current[1] = el} id="features" className="py-20 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-4">
            Everything you need to manage your finances
          </h2>
          <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
            Powerful features designed to give you complete control over your financial journey
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuresData.map((feature, index) => (
              <Card key={index} ref={el => {
                if (!cardRefs.current[1]) cardRefs.current[1] = [];
                cardRefs.current[1][index] = el;
              }} className="group relative overflow-hidden p-6 hover:shadow-2xl transition-all duration-300 border-2 border-transparent hover:border-blue-500">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <CardContent className="relative space-y-4 pt-4">
                  <div className="text-4xl text-blue-600 transform group-hover:scale-110 transition-transform duration-300">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold group-hover:text-blue-600 transition-colors duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 group-hover:text-gray-800 transition-colors duration-300">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section ref={el => sectionRefs.current[2] = el} className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-16">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {howItWorksData.map((step, index) => (
              <Card key={index} ref={el => {
                if (!cardRefs.current[2]) cardRefs.current[2] = [];
                cardRefs.current[2][index] = el;
              }} className="p-6 shadow hover:shadow-lg transition-shadow">
                <CardContent className="text-center space-y-4">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                    {step.icon}
                  </div>
                  <h3 className="text-xl font-semibold">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section ref={el => sectionRefs.current[3] = el} id="testimonials" className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-4">
            What Our Users Say
          </h2>
          <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
            Join thousands of satisfied users who have transformed their financial management
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonialsData.map((testimonial, index) => (
              <Card key={index} ref={el => {
                if (!cardRefs.current[3]) cardRefs.current[3] = [];
                cardRefs.current[3][index] = el;
              }} className="group relative overflow-hidden p-6 hover:shadow-2xl transition-all duration-300 border-2 border-transparent hover:border-blue-500">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <CardContent className="relative pt-4">
                  <div className="flex items-center mb-6">
                    <div className="relative">
                      <Image
                        src={testimonial.image}
                        alt={testimonial.name}
                        width={48}
                        height={48}
                        className="rounded-full ring-2 ring-blue-500 group-hover:ring-4 transition-all duration-300"
                      />
                      <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white" />
                    </div>
                    <div className="ml-4">
                      <div className="font-semibold group-hover:text-blue-600 transition-colors duration-300">
                        {testimonial.name}
                      </div>
                      <div className="text-sm text-gray-600 group-hover:text-gray-800 transition-colors duration-300">
                        {testimonial.role}
                      </div>
                    </div>
                  </div>
                  <div className="relative">
                    <div className="absolute -top-4 -left-4 text-4xl text-blue-200 opacity-50">"</div>
                    <p className="text-gray-700 italic relative z-10 group-hover:text-gray-900 transition-colors duration-300">
                      {testimonial.quote}
                    </p>
                    <div className="absolute -bottom-4 -right-4 text-4xl text-blue-200 opacity-50 rotate-180">"</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section ref={el => sectionRefs.current[4] = el} className="py-20 bg-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Take Control of Your Finances?
          </h2>
          <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands managing their money smarter with Autofin.
          </p>
          <Link href="/dashboard">
            <Button
              size="lg"
              className="bg-white text-blue-600 hover:bg-blue-50 animate-bounce"
            >
              Start Free Trial
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
