"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import axios from "axios";
import { Search, MapPin, DollarSign, Star, ArrowRight, Activity, Plus, Check, X, TrendingUp, History, Tag, GraduationCap } from "lucide-react";
import { useRouter } from "next/navigation";
import { ThemeToggle } from "@/components/theme-toggle";
import { Footer } from "@/components/footer";
import API_BASE from "@/lib/api";

interface College {
  id: string;
  name: string;
  location: string;
  fees: number;
  rating: number;
  placement_percent: number;
  description: string;
  image_url: string;
}

const LOCATIONS = ["All India", "Maharashtra", "Delhi", "Telangana", "Tamil Nadu", "Karnataka", "Uttar Pradesh"];
const FEES_RANGES = [
  { label: "Any Budget", value: "" },
  { label: "Under ₹1,00,000", value: "100000" },
  { label: "Under ₹5,00,000", value: "500000" },
  { label: "Under ₹10,00,000", value: "1000000" },
];

export default function Home() {
  const [colleges, setColleges] = useState<College[]>([]);
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("");
  const [maxFees, setMaxFees] = useState("");
  const [collection, setCollection] = useState("");
  const [loading, setLoading] = useState(true);
  
  const [compareList, setCompareList] = useState<{id: string, name: string}[]>([]);
  const router = useRouter();

  const fetchColleges = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (search) params.append("search", search);
      if (location && location !== "All India") params.append("location", location);
      if (maxFees) params.append("maxFees", maxFees);
      if (collection) params.append("collection", collection);

      const res = await axios.get(`${API_BASE}/api/colleges?${params.toString()}`);
      setColleges(res.data);
    } catch (error) {
      console.error("Error fetching colleges", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchColleges();
    }, 300);
    return () => clearTimeout(delayDebounceFn);
  }, [search, location, maxFees, collection]);

  const toggleCompare = (college: College) => {
    setCompareList(prev => {
      const exists = prev.find(c => c.id === college.id);
      if (exists) return prev.filter(c => c.id !== college.id);
      if (prev.length >= 3) {
        alert("You can only compare up to 3 colleges at a time.");
        return prev;
      }
      return [...prev, { id: college.id, name: college.name }];
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0a0a0a] text-slate-900 dark:text-white transition-colors font-sans flex flex-col">
      <header className="bg-white dark:bg-[#0a0a0a] border-b border-slate-200 dark:border-white/10 sticky top-0 z-40 transition-colors">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-600/30">
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight text-indigo-950 dark:text-white">CampusScout</span>
          </div>
          <div className="flex items-center gap-6">
            <Link href="/compare" className="hidden sm:flex items-center gap-2 text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
              <Activity className="w-4 h-4" /> Compare Hub
            </Link>
            <ThemeToggle />
          </div>
        </div>
      </header>

      <div className="flex-1 relative pt-16 pb-12 px-6 sm:px-12 lg:px-24">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 text-slate-900 dark:text-white leading-tight">
            Find the right college. <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-blue-500 dark:from-indigo-400 dark:to-blue-400">Shape your future.</span>
          </h1>
          <p className="text-lg text-slate-500 dark:text-slate-400 mb-10 max-w-2xl mx-auto">
            Discover thousands of verified institutions, compare placement rates, and find the perfect match for your career goals.
          </p>
          
          <div className="bg-white dark:bg-[#111111] p-4 md:p-6 rounded-3xl shadow-xl shadow-slate-200/50 dark:shadow-none flex flex-col md:flex-row gap-4 max-w-4xl mx-auto border border-slate-100 dark:border-white/10 transition-colors">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search colleges, courses..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-slate-50 dark:bg-black border border-slate-200 dark:border-white/10 rounded-2xl py-3.5 pl-12 pr-4 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all font-medium"
              />
            </div>
            <div className="w-full md:w-48 relative">
              <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5 z-10" />
              <select
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full bg-slate-50 dark:bg-black border border-slate-200 dark:border-white/10 rounded-2xl py-3.5 pl-12 pr-10 text-slate-700 dark:text-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all appearance-none font-medium cursor-pointer"
              >
                {LOCATIONS.map(loc => <option key={loc} value={loc}>{loc}</option>)}
              </select>
            </div>
            <div className="w-full md:w-56 relative">
              <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5 z-10" />
              <select
                value={maxFees}
                onChange={(e) => setMaxFees(e.target.value)}
                className="w-full bg-slate-50 dark:bg-black border border-slate-200 dark:border-white/10 rounded-2xl py-3.5 pl-12 pr-10 text-slate-700 dark:text-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all appearance-none font-medium cursor-pointer"
              >
                {FEES_RANGES.map(range => <option key={range.value} value={range.value}>{range.label}</option>)}
              </select>
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-3 mt-8">
            <button 
              onClick={() => setCollection("")}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-all shadow-sm ${collection === "" ? "bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-md" : "bg-white dark:bg-[#111111] text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-white/10"}`}
            >
              All Colleges
            </button>
            <button 
              onClick={() => setCollection("top_placements")}
              className={`flex items-center gap-2 px-5 py-2 rounded-full text-sm font-semibold transition-all shadow-sm ${collection === "top_placements" ? "bg-blue-600 text-white shadow-md shadow-blue-600/30" : "bg-white dark:bg-[#111111] text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 border border-slate-200 dark:border-white/10"}`}
            >
              <TrendingUp className="w-4 h-4" /> Top Placements
            </button>
            <button 
              onClick={() => setCollection("affordable")}
              className={`flex items-center gap-2 px-5 py-2 rounded-full text-sm font-semibold transition-all shadow-sm ${collection === "affordable" ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/30" : "bg-white dark:bg-[#111111] text-slate-600 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 border border-slate-200 dark:border-white/10"}`}
            >
              <Tag className="w-4 h-4" /> Most Affordable
            </button>
            <button 
              onClick={() => setCollection("historical")}
              className={`flex items-center gap-2 px-5 py-2 rounded-full text-sm font-semibold transition-all shadow-sm ${collection === "historical" ? "bg-amber-600 text-white shadow-md shadow-amber-600/30" : "bg-white dark:bg-[#111111] text-slate-600 dark:text-slate-300 hover:text-amber-600 dark:hover:text-amber-400 border border-slate-200 dark:border-white/10"}`}
            >
              <History className="w-4 h-4" /> Legacy Institutes
            </button>
          </div>
        </div>

        <div className="max-w-7xl mx-auto py-12">
          {loading ? (
            <div className="flex justify-center py-20">
              <div className="w-10 h-10 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {colleges.length > 0 ? (
                colleges.map((college) => {
                  const isComparing = compareList.some(c => c.id === college.id);
                  return (
                    <div key={college.id} className="group bg-white dark:bg-[#111111] rounded-3xl overflow-hidden border border-slate-200 dark:border-white/10 hover:border-indigo-300 dark:hover:border-indigo-500/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-indigo-900/5 flex flex-col relative">
                      <div className="h-52 overflow-hidden relative">
                        <img src={college.image_url} alt={college.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                        <div className="absolute top-4 right-4 bg-white/90 dark:bg-black/80 backdrop-blur-md px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-sm">
                          <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                          <span className="text-sm font-bold text-slate-800 dark:text-white">{college.rating}</span>
                        </div>
                        <button 
                          onClick={() => toggleCompare(college)}
                          className={`absolute top-4 left-4 p-2.5 rounded-full backdrop-blur-md transition-all shadow-sm ${
                            isComparing ? "bg-indigo-600 text-white" : "bg-white/90 dark:bg-black/80 text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400"
                          }`}
                        >
                          {isComparing ? <Check className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                        </button>
                      </div>
                      <div className="p-6 flex-1 flex flex-col">
                        <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400 text-sm mb-3 font-medium">
                          <MapPin className="w-4 h-4 text-indigo-500" />
                          {college.location}
                        </div>
                        <h3 className="text-xl font-bold mb-2 line-clamp-2 text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                          {college.name}
                        </h3>
                        <p className="text-slate-500 dark:text-slate-400 text-sm mb-6 line-clamp-2 leading-relaxed">
                          {college.description}
                        </p>
                        <div className="mt-auto flex items-center justify-between border-t border-slate-100 dark:border-white/5 pt-5">
                          <div>
                            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Total Fees</p>
                            <p className="font-extrabold text-lg text-slate-900 dark:text-white">₹{college.fees.toLocaleString()}</p>
                          </div>
                          <Link href={`/colleges/${college.id}`} className="px-5 py-2.5 rounded-xl bg-indigo-50 dark:bg-indigo-500/10 text-indigo-700 dark:text-indigo-400 font-semibold text-sm hover:bg-indigo-600 hover:text-white dark:hover:bg-indigo-500 dark:hover:text-white transition-colors">
                            View Details
                          </Link>
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="col-span-full text-center py-20 bg-white dark:bg-[#111111] rounded-3xl border border-slate-200 dark:border-white/10 shadow-sm">
                  <Search className="w-12 h-12 text-slate-300 dark:text-slate-700 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-slate-700 dark:text-slate-300 mb-2">No colleges found</h3>
                  <p className="text-slate-500 dark:text-slate-500">Try adjusting your filters or search term.</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      <Footer />

      {/* Floating Compare Tray */}
      {compareList.length > 0 && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 animate-in slide-in-from-bottom-10 fade-in duration-300">
          <div className="bg-white dark:bg-black border border-slate-200 dark:border-white/10 shadow-2xl rounded-full px-6 py-4 flex items-center gap-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-500/20 flex items-center justify-center">
                <Activity className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
              </div>
              <span className="font-medium text-sm text-slate-700 dark:text-slate-300">
                Comparing <span className="font-bold text-indigo-600 dark:text-indigo-400">{compareList.length}</span>/3
              </span>
            </div>
            <button 
              onClick={handleCompareSubmit}
              disabled={compareList.length < 2}
              className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all ${
                compareList.length >= 2 
                ? "bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-600/30 hover:-translate-y-0.5" 
                : "bg-slate-100 dark:bg-white/5 text-slate-400 dark:text-slate-500 cursor-not-allowed"
              }`}
            >
              Compare Now
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
