"use client";

import { Footer } from "@/components/footer";
import { Mail, Phone, MapPin, Send, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0a0a0a] text-slate-900 dark:text-white transition-colors">
      
      {/* Header */}
      <header className="bg-white dark:bg-[#0a0a0a] border-b border-slate-200 dark:border-white/10 sticky top-0 z-40 transition-colors">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="p-2 bg-slate-100 hover:bg-slate-200 dark:bg-white/5 dark:hover:bg-white/10 rounded-full transition-colors text-slate-600 dark:text-slate-300">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <h1 className="text-xl font-bold text-slate-900 dark:text-white">Contact Us</h1>
          </div>
          <ThemeToggle />
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-16 lg:py-24 grid lg:grid-cols-2 gap-16 items-start">
        
        {/* Contact Info */}
        <div>
          <h2 className="text-4xl md:text-5xl font-extrabold mb-6 tracking-tight text-slate-900 dark:text-white">
            Let's start a <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400">conversation.</span>
          </h2>
          <p className="text-lg text-slate-500 dark:text-slate-400 mb-12 max-w-md">
            Whether you are a student looking for guidance, or an institution seeking partnership, our team is here to help you every step of the way.
          </p>
          
          <div className="space-y-8">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-indigo-50 dark:bg-indigo-500/10 rounded-2xl flex items-center justify-center shrink-0 border border-indigo-100 dark:border-indigo-500/20">
                <Mail className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 dark:text-white mb-1">Email Us</h4>
                <p className="text-slate-500 dark:text-slate-400 text-sm mb-1">We'll respond within 24 hours.</p>
                <a href="mailto:support@campusscout.in" className="text-indigo-600 dark:text-indigo-400 font-medium hover:underline">support@campusscout.in</a>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-indigo-50 dark:bg-indigo-500/10 rounded-2xl flex items-center justify-center shrink-0 border border-indigo-100 dark:border-indigo-500/20">
                <Phone className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 dark:text-white mb-1">Call Us</h4>
                <p className="text-slate-500 dark:text-slate-400 text-sm mb-1">Mon-Fri from 9am to 6pm.</p>
                <a href="tel:18001234567" className="text-indigo-600 dark:text-indigo-400 font-medium hover:underline">1800-123-4567</a>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-indigo-50 dark:bg-indigo-500/10 rounded-2xl flex items-center justify-center shrink-0 border border-indigo-100 dark:border-indigo-500/20">
                <MapPin className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 dark:text-white mb-1">Visit Our Office</h4>
                <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed max-w-[200px]">
                  123 Innovation Drive, Tech Park, Bangalore 560001, India
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-white dark:bg-[#111111] border border-slate-200 dark:border-white/10 p-8 md:p-10 rounded-3xl shadow-xl shadow-slate-200/50 dark:shadow-none relative overflow-hidden">
          {/* Decorative element */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 dark:bg-indigo-500/5 rounded-bl-full pointer-events-none"></div>
          
          <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Send a Message</h3>
          
          <form className="space-y-6 relative z-10" onSubmit={(e) => e.preventDefault()}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">First Name</label>
                <input type="text" placeholder="John" className="w-full bg-slate-50 dark:bg-black border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all placeholder-slate-400 dark:placeholder-slate-600" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Last Name</label>
                <input type="text" placeholder="Doe" className="w-full bg-slate-50 dark:bg-black border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all placeholder-slate-400 dark:placeholder-slate-600" />
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Email Address</label>
              <input type="email" placeholder="john@example.com" className="w-full bg-slate-50 dark:bg-black border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all placeholder-slate-400 dark:placeholder-slate-600" />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Message</label>
              <textarea rows={4} placeholder="How can we help you?" className="w-full bg-slate-50 dark:bg-black border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all placeholder-slate-400 dark:placeholder-slate-600 resize-none"></textarea>
            </div>
            
            <button type="button" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl px-4 py-4 transition-all flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/30">
              <Send className="w-5 h-5" /> Send Message
            </button>
          </form>
        </div>
        
      </div>
      
      <Footer />
    </div>
  );
}
