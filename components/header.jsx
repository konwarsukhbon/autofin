import React from "react";
import { Button } from "./ui/button1";
import { PenBox, LayoutDashboard, TrendingUp, Sparkles } from "lucide-react";
import Link from "next/link";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import { checkUser } from "../lib/checkUser";
import { InteractiveHoverButton } from "./magicui/interactive-hover-button";

const Header = async () => {
  await checkUser();
  

  return (
    <header className="relative top-0 w-full bg-white/80 backdrop-blur-md z-50 border-b">
      <nav className="container mx-auto px-5 py-4 flex items-center justify-between">
        <Link href="/">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 via-indigo-600 to-purple-600 rounded-xl flex items-center justify-center shadow-xl">
                <TrendingUp className="text-white w-6 h-6" />
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                <Sparkles className="w-3 h-3 text-white" />
              </div>
            </div>
            <div>
              <span className="text-2xl font-black tracking-tight text-gray-900">
                Auto<span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Fin</span>
              </span>
              <div className="text-xs text-gray-500 font-medium">AI-Powered Finance</div>
            </div>
          </div>
        </Link>

        {/* Navigation Links - Different for signed in/out users */}
        <div className="hidden md:flex items-center space-x-2">
          <SignedOut>
            <a
              href="#features"
              className="text-gray-700 font-semibold text-base px-3 py-1 rounded-full hover:bg-indigo-50/70 hover:text-indigo-700 transition-colors duration-200"
            >
              Features
            </a>
            <a
              href="#testimonials"
              className="text-gray-700 font-semibold text-base px-3 py-1 rounded-full hover:bg-indigo-50/70 hover:text-indigo-700 transition-colors duration-200"
            >
              Testimonials
            </a>
          </SignedOut>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center space-x-4">
          <SignedIn>
            <Link
              href="/dashboard"
              className="text-gray-600 hover:text-blue-600 flex items-center gap-2"
            >
              <Button variant="outline">
                <LayoutDashboard size={18} />
                <span className="hidden md:inline">Dashboard</span>
              </Button>
            </Link>
            <a href="/transaction/create">
              <Button className="flex items-center gap-2">
                <PenBox size={18} />
                <span className="hidden md:inline">Add Transaction</span>
              </Button>
            </a>
          </SignedIn>
          <SignedOut>
            <SignInButton forceRedirectUrl="/dashboard">
              <InteractiveHoverButton variant="outline">Login</InteractiveHoverButton>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <UserButton
              appearance={{
                elements: {
                  avatarBox: "w-10 h-10",
                },
              }}
            />
          </SignedIn>
        </div>
      </nav>
    </header>
  );
};

export default Header;
