"use client";

import React from "react";
import { Button } from "../../../components/ui/button1.jsx";
import { Card, CardContent } from "../../../components/ui/card.jsx";
import { featuresData, howItWorksData } from "@/data/landing";
import Image from "next/image";
import Link from "next/link";
import { InteractiveHoverButton } from "../../../components/magicui/interactive-hover-button.jsx";
import { motion } from "framer-motion";

// Animation variant
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.15,
      duration: 0.6,
      ease: "easeOut",
    },
  }),
};

export default function KnowMorePage() {
  return (
    <div className="min-h-screen pt-20 pb-20 px-4 bg-gradient-to-b from-white to-slate-100">
      <div className="container mx-auto">
        {/* Hero Section */}
        <section className="text-center mb-20">
          <motion.h1
            className="text-4xl md:text-6xl font-bold mb-6 gradient-title"
            initial="hidden"
            animate="show"
            variants={fadeUp}
          >
            Discover Autofin
          </motion.h1>
          <motion.p
            className="text-xl text-gray-600 max-w-2xl mx-auto mb-8"
            initial="hidden"
            animate="show"
            variants={fadeUp}
            transition={{ delay: 0.3 }}
          >
            Your AI-powered financial companion that revolutionizes how you manage money
          </motion.p>
          <motion.div
            initial="hidden"
            animate="show"
            variants={fadeUp}
            transition={{ delay: 0.45 }}
          >
            <Link href="/dashboard">
              <Button size="lg" className="px-8">
                Get Started
              </Button>
            </Link>
          </motion.div>
        </section>

        {/* Features Section */}
        <section className="mb-24">
          <h2 className="text-3xl font-bold text-center mb-12">
            Powerful Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {featuresData.map((feature, index) => (
              <motion.div
                key={index}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                custom={index}
              >
                <Card className="p-6 hover:shadow-xl transition-all bg-white border border-gray-100 rounded-2xl">
                  <CardContent className="space-y-4">
                    <div className="text-primary">{feature.icon}</div>
                    <h3 className="text-xl font-semibold">{feature.title}</h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        {/* How It Works Section */}
        <section className="mb-24">
          <h2 className="text-3xl font-bold text-center mb-12">
            How It Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {howItWorksData.map((step, index) => (
              <motion.div
                key={index}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                custom={index}
              >
                <Card className="p-6 hover:shadow-xl transition-all bg-white border border-gray-100 rounded-2xl">
                  <CardContent className="space-y-4">
                    <div className="text-primary">{step.icon}</div>
                    <h3 className="text-xl font-semibold">{step.title}</h3>
                    <p className="text-gray-600">{step.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <motion.section
          className="text-center"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={fadeUp}
        >
          <h2 className="text-3xl font-bold mb-6">
            Ready to Transform Your Financial Management?
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Join thousands of users who have already revolutionized their financial journey with Autofin
          </p>
          <Link href="/dashboard">
            <InteractiveHoverButton size="lg" className="px-8">
              Start Your Journey
            </InteractiveHoverButton>
          </Link>
        </motion.section>
      </div>
    </div>
  );
}
