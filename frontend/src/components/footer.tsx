import Link from "next/link";
import { GraduationCap, Mail, Phone, MapPin } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-white dark:bg-[#0a0a0a] border-t border-slate-200 dark:border-white/10 mt-20 transition-colors">
      <div className="max-w-7xl mx-auto px-6 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8">
          
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
                <GraduationCap className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">CampusScout</span>
            </div>
            <p className="text-slate-500 dark:text-slate-400 max-w-sm mb-6">
              Empowering students to make data-driven decisions about their future. Discover, compare, and apply to the best colleges in India effortlessly.
            </p>
          </div>
          
          <div>
            <h4 className="font-bold text-slate-900 dark:text-white mb-6">Quick Links</h4>
            <ul className="space-y-4">
              <li><Link href="/" className="text-slate-500 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400 transition-colors">Discover Colleges</Link></li>
              <li><Link href="/compare" className="text-slate-500 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400 transition-colors">Compare Hub</Link></li>
              <li><Link href="/contact" className="text-slate-500 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400 transition-colors">Contact Us</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold text-slate-900 dark:text-white mb-6">Reach Out</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-slate-500 dark:text-slate-400">
                <Mail className="w-5 h-5 text-indigo-500 shrink-0" />
                <span>support@campusscout.in</span>
              </li>
              <li className="flex items-start gap-3 text-slate-500 dark:text-slate-400">
                <Phone className="w-5 h-5 text-indigo-500 shrink-0" />
                <span>1800-123-4567</span>
              </li>
              <li className="flex items-start gap-3 text-slate-500 dark:text-slate-400">
                <MapPin className="w-5 h-5 text-indigo-500 shrink-0" />
                <span>123 Innovation Drive, Tech Park, Bangalore 560001</span>
              </li>
            </ul>
          </div>
          
        </div>
        
        <div className="border-t border-slate-200 dark:border-white/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-slate-500 dark:text-slate-500">
            © {new Date().getFullYear()} CampusScout. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-slate-500 dark:text-slate-500">
            <Link href="#" className="hover:text-indigo-600 dark:hover:text-indigo-400">Privacy Policy</Link>
            <Link href="#" className="hover:text-indigo-600 dark:hover:text-indigo-400">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
