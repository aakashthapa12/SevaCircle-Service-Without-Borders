"use client";

import Link from "next/link";
import { ArrowRight, Shield, Users, Award, Target, Heart, CheckCircle } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-teal-500 to-blue-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
              <Shield size={16} />
              <span className="text-sm font-semibold">Trusted by 10,000+ Customers</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Professional Home Services
              <br />
              <span className="text-teal-200">Made Simple</span>
            </h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Connect with verified professionals for all your home service needs. 
              Fast, reliable, and affordable solutions delivered with care.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Our Mission
              </h2>
              <p className="text-lg text-gray-700 mb-4">
                We're on a mission to transform how people access home services by connecting 
                homeowners with trusted, skilled professionals in their area.
              </p>
              <p className="text-lg text-gray-700">
                Our platform ensures quality, reliability, and transparency in every service 
                interaction, making home maintenance hassle-free and accessible to everyone.
              </p>
            </div>
            <div className="bg-gradient-to-br from-teal-500 to-blue-600 rounded-3xl p-8 text-white">
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Target size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-xl mb-2">Our Vision</h3>
                    <p className="text-white/90">To be the most trusted home services platform, empowering communities nationwide.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Heart size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-xl mb-2">Our Values</h3>
                    <p className="text-white/90">Trust, quality, transparency, and customer satisfaction drive everything we do.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose Us
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We're committed to providing exceptional service through our verified professionals
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-gradient-to-br from-teal-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Shield size={32} className="text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">100% Verified</h3>
              <p className="text-gray-600">
                Every professional is thoroughly background-checked and certified
              </p>
            </div>
            
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-gradient-to-br from-teal-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Users size={32} className="text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Expert Professionals</h3>
              <p className="text-gray-600">
                Skilled workers with years of experience in their respective fields
              </p>
            </div>
            
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-gradient-to-br from-teal-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Award size={32} className="text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Quality Guaranteed</h3>
              <p className="text-gray-600">
                100% satisfaction guarantee on all services or your money back
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-r from-teal-500 to-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2">10,000+</div>
              <div className="text-white/80">Happy Customers</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2">500+</div>
              <div className="text-white/80">Verified Professionals</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2">50+</div>
              <div className="text-white/80">Service Categories</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2">4.9/5</div>
              <div className="text-white/80">Average Rating</div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-lg text-gray-600">
              Get started in three simple steps
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="relative">
              <div className="bg-white rounded-2xl shadow-lg p-8 border-2 border-gray-100">
                <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-blue-600 rounded-xl flex items-center justify-center text-white font-bold text-xl mb-4">
                  1
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Choose Your Service</h3>
                <p className="text-gray-600">
                  Browse our wide range of home services and select what you need
                </p>
              </div>
            </div>
            
            <div className="relative">
              <div className="bg-white rounded-2xl shadow-lg p-8 border-2 border-gray-100">
                <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-blue-600 rounded-xl flex items-center justify-center text-white font-bold text-xl mb-4">
                  2
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Book a Professional</h3>
                <p className="text-gray-600">
                  Select a verified professional and schedule at your convenience
                </p>
              </div>
            </div>
            
            <div className="relative">
              <div className="bg-white rounded-2xl shadow-lg p-8 border-2 border-gray-100">
                <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-blue-600 rounded-xl flex items-center justify-center text-white font-bold text-xl mb-4">
                  3
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Enjoy Quality Service</h3>
                <p className="text-gray-600">
                  Relax while our professionals deliver exceptional results
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Join thousands of satisfied customers who trust us with their home service needs
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/search"
              className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-teal-500 to-blue-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:scale-105 transition-transform"
            >
              Find Services
              <ArrowRight size={20} />
            </Link>
            <Link
              href="/signup"
              className="inline-flex items-center justify-center gap-2 bg-white text-gray-900 px-8 py-4 rounded-xl font-semibold text-lg hover:scale-105 transition-transform"
            >
              Become a Professional
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
