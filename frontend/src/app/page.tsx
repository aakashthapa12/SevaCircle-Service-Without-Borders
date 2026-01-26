"use client";

import Link from "next/link";
import { ArrowRight, Star, Shield, Clock, Users, Search, Calendar, MapPin } from "lucide-react";

export default function HomePage() {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="section-py-lg bg-gradient-to-br from-gray-50 to-blue-50 relative overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2 items-center" style={{ gap: 'var(--spacing-12)' }}>
          {/* Hero Content */}
          <div className="spacing-stack-lg">
            <div className="inline-flex items-center btn btn-sm bg-teal-100 text-teal-800 hover:bg-teal-200">
              <Star size={16} className="text-teal-600" />
              <span>Trusted by 10,000+ Customers</span>
            </div>
            
            <h1 className="text-display-lg text-gray-900 leading-tight">
              Professional Home Services 
              <span className="text-gradient-primary"> Made Simple</span>
            </h1>
            
            <p className="text-body-xl text-gray-600 max-w-lg">
              Connect with verified professionals for all your home service needs. 
              Fast, reliable, and affordable solutions delivered with care.
            </p>
            
            <div className="flex flex-col sm:flex-row" style={{ gap: 'var(--spacing-4)' }}>
              <Link href="/search" className="btn btn-lg btn-primary group focus-ring">
                <span>Find Services</span>
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link href="/signup" className="btn btn-lg bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 focus-ring">
                Become a Professional
              </Link>
            </div>
          </div>
          
          {/* Hero Image Placeholder */}
          <div className="relative">
            <div 
              className="bg-gradient-primary rounded-3xl shadow-2xl flex items-center justify-center"
              style={{ height: '24rem' }}
            >
              <div className="text-center text-white">
                <Users size={80} className="mx-auto mb-4" />
                <p className="text-heading-md">Professional Services</p>
                <p className="text-body-base opacity-90">Coming to your home</p>
              </div>
            </div>
            {/* Decorative Elements */}
            <div 
              className="absolute -top-4 -right-4 bg-amber-400 rounded-full p-4"
              style={{ width: 'var(--spacing-16)', height: 'var(--spacing-16)' }}
            >
              <Star size={32} className="text-white" />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section-py-md">
        <div className="text-center spacing-stack-lg">
          <h2 className="text-heading-xl text-gray-900">Why Choose LOCAL SERVICING?</h2>
          <p className="text-body-lg text-gray-600 max-w-2xl mx-auto">
            We make home services simple, reliable, and stress-free with our professional approach.
          </p>
        </div>
        
        <div 
          className="grid grid-responsive grid-responsive-3"
          style={{ marginTop: 'var(--spacing-12)' }}
        >
          {/* Feature 1 */}
          <div className="card card-hover card-padding-lg text-center spacing-stack-sm">
            <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto">
              <Shield size={32} className="text-white" />
            </div>
            <h3 className="text-heading-md text-gray-900">Verified Professionals</h3>
            <p className="text-body-base text-gray-600">
              All our service providers are thoroughly vetted, licensed, and insured for your peace of mind.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="card card-hover card-padding-lg text-center spacing-stack-sm">
            <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto">
              <Clock size={32} className="text-white" />
            </div>
            <h3 className="text-heading-md text-gray-900">Quick & Reliable</h3>
            <p className="text-body-base text-gray-600">
              Fast response times and reliable service delivery when you need it most.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="card card-hover card-padding-lg text-center spacing-stack-sm">
            <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto">
              <Star size={32} className="text-white" />
            </div>
            <h3 className="text-heading-md text-gray-900">Quality Guaranteed</h3>
            <p className="text-body-base text-gray-600">
              100% satisfaction guarantee with our quality assurance program and customer support.
            </p>
          </div>
        </div>
      </section>

      {/* Services Preview Section */}
      <section className="section-py-md bg-gray-50">
        <div className="text-center spacing-stack-lg">
          <h2 className="text-heading-xl text-gray-900">Popular Services</h2>
          <p className="text-body-lg text-gray-600 max-w-2xl mx-auto">
            From routine maintenance to emergency repairs, we've got you covered.
          </p>
        </div>
        
        <div 
          className="grid grid-responsive grid-responsive-2 lg:grid-responsive-4"
          style={{ marginTop: 'var(--spacing-12)' }}
        >
          {[
            { name: "Plumbing", icon: "🔧", description: "Repairs & installations" },
            { name: "Electrical", icon: "⚡", description: "Wiring & fixtures" },
            { name: "Cleaning", icon: "🧹", description: "Home & office cleaning" },
            { name: "Landscaping", icon: "🌿", description: "Garden & lawn care" },
          ].map((service, index) => (
            <div key={index} className="card card-hover card-padding text-center spacing-stack-sm">
              <div className="text-5xl" style={{ marginBottom: 'var(--spacing-4)' }}>
                {service.icon}
              </div>
              <h3 className="text-heading-sm text-gray-900">{service.name}</h3>
              <p className="text-body-sm text-gray-600">{service.description}</p>
              <Link 
                href="/search" 
                className="btn btn-sm btn-primary focus-ring inline-flex items-center"
                style={{ gap: 'var(--spacing-2)' }}
              >
                <span>Book Now</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works Section */}
      <section className="section-py-md">
        <div className="text-center spacing-stack-lg">
          <h2 className="text-heading-xl text-gray-900">How It Works</h2>
          <p className="text-body-lg text-gray-600 max-w-2xl mx-auto">
            Getting professional services for your home is simple and straightforward.
          </p>
        </div>
        
        <div 
          className="grid grid-responsive grid-responsive-3"
          style={{ marginTop: 'var(--spacing-12)' }}
        >
          {[
            {
              step: "1",
              title: "Search & Browse",
              description: "Find the perfect professional for your specific needs",
              icon: <Search size={24} />
            },
            {
              step: "2", 
              title: "Book & Schedule",
              description: "Choose your preferred time and date for the service",
              icon: <Calendar size={24} />
            },
            {
              step: "3",
              title: "Get Service",
              description: "Professional arrives on time and completes the work",
              icon: <MapPin size={24} />
            }
          ].map((item, index) => (
            <div key={index} className="text-center spacing-stack-md">
              <div 
                className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto relative"
              >
                {item.icon}
                <div 
                  className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center"
                >
                  <span className="text-white text-body-sm font-bold">{item.step}</span>
                </div>
              </div>
              <h3 className="text-heading-md text-gray-900">{item.title}</h3>
              <p className="text-body-base text-gray-600 max-w-xs mx-auto">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-py-lg bg-gradient-primary text-white relative overflow-hidden">
        <div className="text-center spacing-stack-lg relative z-10">
          <h2 className="text-display-md text-white">
            Ready to Get Started?
          </h2>
          <p className="text-body-xl opacity-90 max-w-2xl mx-auto">
            Join thousands of satisfied customers who trust LOCAL SERVICING for all their home service needs.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center" style={{ gap: 'var(--spacing-4)' }}>
            <Link 
              href="/search" 
              className="btn btn-lg bg-white text-gray-900 hover:bg-gray-100 focus-ring group"
            >
              <span>Find Services</span>
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link 
              href="/signup" 
              className="btn btn-lg bg-transparent border-2 border-white text-white hover:bg-white hover:text-gray-900 focus-ring"
            >
              Become a Professional
            </Link>
          </div>
          
          {/* Stats */}
          <div 
            className="grid grid-cols-1 sm:grid-cols-3 text-center"
            style={{ 
              marginTop: 'var(--spacing-12)',
              gap: 'var(--spacing-8)'
            }}
          >
            {[
              { number: "10K+", label: "Happy Customers" },
              { number: "99.9%", label: "Success Rate" },
              { number: "24/7", label: "Support Available" }
            ].map((stat, index) => (
              <div key={index} className="spacing-stack-xs">
                <div className="text-display-md font-bold">{stat.number}</div>
                <div className="text-body-base opacity-90">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Background decoration */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-white opacity-5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-white opacity-5 rounded-full translate-y-1/2 -translate-x-1/2"></div>
      </section>
    </div>
  );
}