import React from 'react';
import { Menu, X, FileText, Brain, Scale, MessageSquare, Users, Shield, BookOpen, ChevronRight, ArrowRight, Linkedin, Mail, Globe, Bot, Gavel, FileCheck, ScrollText, Network, Briefcase, Check, Phone, MapPin, Clock, Star, Award, BarChart } from 'lucide-react';
import { useState } from 'react';
import ContactPage from './ContactPage';

import { Link } from 'react-router-dom';
function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState('home');
  const [billingPeriod, setBillingPeriod] = useState('monthly');

  // ... [Previous constants remain unchanged]

  const stats = [
    { number: "98%", label: "Client Satisfaction", icon: <Star className="w-6 h-6" /> },
    { number: "50K+", label: "Documents Processed", icon: <FileText className="w-6 h-6" /> },
    { number: "200+", label: "Law Firms", icon: <Briefcase className="w-6 h-6" /> },
    { number: "24/7", label: "Support Available", icon: <Clock className="w-6 h-6" /> }
  ];

  const testimonials = [
    {
      quote: "Lexify has revolutionized how we handle legal documents. The AI-powered analysis saves us countless hours.",
      author: "Sarah Chen",
      role: "Senior Partner, Chen & Associates",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
    },
    {
      quote: "The accuracy and speed of document processing have significantly improved our firm's efficiency.",
      author: "Michael Rodriguez",
      role: "Legal Director, Global Law Partners",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
    },
    {
      quote: "Exceptional AI capabilities combined with intuitive interface. A game-changer for legal tech.",
      author: "Emily Thompson",
      role: "Tech Lead, Legal Innovation Hub",
      image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
    }
  ];

  const HomePage = () => (
    <>
      {/* Hero Section */}
      <div className="relative bg-[#050505] overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="relative z-10 pb-8 sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
            <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
              <div className="sm:text-center lg:text-left">
                <h1 className="text-4xl tracking-tight font-extrabold text-white sm:text-5xl md:text-6xl">
                  <span className="block">Transform Your Legal</span>
                  <span className="block text-[#74cbce]">Work with AI</span>
                </h1>
                <p className="mt-3 text-base text-gray-300 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                  Revolutionize your legal practice with AI-powered document analysis, case law insights, and expert connections.
                </p>
                <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                  <div className="rounded-md shadow">
                    <a href="#" className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-[#0e7b7f] hover:bg-[#309599] md:py-4 md:text-lg md:px-10">
                      Get Started
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </a>
                  </div>
                  <div className="mt-3 sm:mt-0 sm:ml-3">
                    <a href="#" onClick={(e) => {
                      e.preventDefault();
                      setCurrentPage('contact');
                    }} className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-[#74cbce] bg-gray-800 hover:bg-gray-700 md:py-4 md:text-lg md:px-10">
                      Contact Sales
                    </a>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
        <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
          <img
            className="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full"
            src="https://images.unsplash.com/photo-1589829545856-d10d557cf95f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
            alt="Legal AI"
          />
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-[#0e7b7f] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="flex justify-center mb-4">
                  <div className="p-3 bg-white/10 rounded-lg">
                    {stat.icon}
                  </div>
                </div>
                <div className="text-3xl font-extrabold text-white">{stat.number}</div>
                <div className="mt-2 text-sm text-[#74cbce]">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base text-[#0e7b7f] font-semibold tracking-wide uppercase">Features</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              AI-Powered Legal Solutions
            </p>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
              Streamline your legal work with our comprehensive suite of AI tools and services.
            </p>
          </div>

          <div className="mt-10">
            <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
              {features.map((feature, index) => (
                <div key={index} className="relative group">
                  <div className="flex items-center space-x-4 p-6 bg-white rounded-lg border border-gray-200 hover:border-[#74cbce] transition-all duration-300 hover:shadow-lg">
                    <div className="flex-shrink-0">
                      <div className="flex items-center justify-center h-12 w-12 rounded-md bg-[#050505] text-[#74cbce]">
                        {feature.icon}
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">{feature.title}</h3>
                      <p className="mt-2 text-base text-gray-500">{feature.description}</p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-[#0e7b7f] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900">
              Trusted by Leading Legal Professionals
            </h2>
            <p className="mt-4 text-xl text-gray-500">
              See what our clients have to say about Lexify
            </p>
          </div>
          <div className="mt-12 grid gap-8 lg:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="p-8">
                  <div className="flex items-center mb-6">
                    <img
                      className="h-12 w-12 rounded-full"
                      src={testimonial.image}
                      alt={testimonial.author}
                    />
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">{testimonial.author}</div>
                      <div className="text-sm text-gray-500">{testimonial.role}</div>
                    </div>
                  </div>
                  <blockquote>
                    <p className="text-gray-600 italic">"{testimonial.quote}"</p>
                  </blockquote>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-[#050505] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#0e7b7f] rounded-2xl shadow-xl overflow-hidden">
            <div className="pt-10 pb-12 px-6 sm:pt-16 sm:px-16 lg:py-16 lg:pr-0 xl:py-20 xl:px-20">
              <div className="lg:self-center">
                <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
                  <span className="block">Ready to transform your</span>
                  <span className="block">legal practice?</span>
                </h2>
                <p className="mt-4 text-lg leading-6 text-[#74cbce]">
                  Start your free trial today and experience the power of AI in legal work.
                </p>
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    setCurrentPage('pricing');
                  }}
                  className="mt-8 bg-white border border-transparent rounded-md shadow px-6 py-3 inline-flex items-center text-base font-medium text-[#0e7b7f] hover:bg-gray-50"
                >
                  View Pricing
                  <ArrowRight className="ml-2 w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Links Section */}
      <div className="bg-[#050505] text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {/* ... [Previous Quick Links content remains unchanged] ... */}
          </div>

          <div className="mt-12 pt-8 border-t border-gray-800 text-center">
            <div className="flex justify-center space-x-6 mb-4">
              <a href="#" className="text-gray-400 hover:text-[#74cbce]">
                <Linkedin className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-[#74cbce]">
                <Mail className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-[#74cbce]">
                <Globe className="h-6 w-6" />
              </a>
            </div>
            <p className="text-gray-400">© 2025 Lexify. All rights reserved.</p>
          </div>
        </div>
      </div>
    </>
  );

  // ... [Rest of the components remain unchanged]

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="bg-[#050505] text-white">
        {/* ... [Navigation content remains unchanged] ... */}
      </nav>

      {/* Content */}
      {currentPage === 'home' && <HomePage />}
      {currentPage === 'about' && <AboutPage />}
      {currentPage === 'services' && <ServicesPage />}
      {currentPage === 'pricing' && <PricingPage />}
      {currentPage === 'contact' && <ContactPage />}
    </div>
  );
}

export default App;