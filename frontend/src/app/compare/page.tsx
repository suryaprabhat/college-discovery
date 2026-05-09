"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import axios from "axios";
import Link from "next/link";
import { ArrowLeft, Star, MapPin, CheckCircle, Award, Briefcase, BookOpen, Activity, DollarSign } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { Footer } from "@/components/footer";
import API_BASE from "@/lib/api";

interface Course {
  id: string;
  name: string;
  duration: number;
  fees: number;
}

interface PlacementStat {
  year: number;
  placement_percent: number;
  students_placed: number;
  average_package: number;
}

interface College {
  id: string;
  name: string;
  location: string;
  fees: number;
  rating: number;
  established_year: number;
  placement_percent: number;
  top_companies: string;
  image_url: string;
  courses: Course[];
  placement_stats: PlacementStat[];
}

function CompareContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const ids = searchParams.get("ids");
  
  const [colleges, setColleges] = useState<College[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!ids) {
      setLoading(false);
      return;
    }

    const fetchCompareData = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${API_BASE}/api/colleges/compare?ids=${ids}`);
        setColleges(res.data);
      } catch (error) {
        console.error("Error fetching comparison data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCompareData();
  }, [ids]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-[#0a0a0a] flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!ids || colleges.length === 0) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-[#0a0a0a] flex flex-col items-center justify-center text-slate-900 dark:text-white transition-colors">
        <div className="w-20 h-20 bg-slate-200 dark:bg-white/5 rounded-full flex items-center justify-center mb-6">
          <Activity className="w-10 h-10 text-slate-400 dark:text-slate-500" />
        </div>
        <h2 className="text-3xl font-bold mb-3 text-slate-800 dark:text-white">No Colleges Selected</h2>
        <p className="text-slate-500 dark:text-slate-400 mb-8 max-w-md text-center">You haven't selected any colleges to compare. Head back to the discovery page to find your favorites.</p>
        <Link href="/" className="px-8 py-3.5 bg-indigo-600 text-white rounded-full font-bold hover:bg-indigo-700 hover:shadow-lg hover:shadow-indigo-600/30 transition-all">
          Back to Discovery
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0a0a0a] text-slate-900 dark:text-white font-sans flex flex-col transition-colors">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-white/90 dark:bg-[#0a0a0a]/90 backdrop-blur-xl border-b border-slate-200 dark:border-white/10 px-6 py-4 shadow-sm transition-colors">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button onClick={() => router.back()} className="p-2.5 bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 rounded-full transition-colors text-slate-600 dark:text-slate-300">
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h1 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white">
              Compare Institutions
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm bg-indigo-50 dark:bg-indigo-500/10 text-indigo-700 dark:text-indigo-400 px-3 py-1 rounded-full font-bold">
              Comparing {colleges.length}
            </span>
            <ThemeToggle />
          </div>
        </div>
      </div>

      <div className="flex-1 max-w-7xl mx-auto px-6 py-12 overflow-x-auto w-full">
        <div className="min-w-[800px]">
          {/* Top Row: College Headers */}
          <div className="flex mb-8">
            <div className="w-64 shrink-0 pr-6 border-r border-slate-200 dark:border-white/10 flex flex-col justify-end pb-4">
              <h3 className="text-2xl font-extrabold text-slate-800 dark:text-white">Overview</h3>
            </div>
            
            {colleges.map((college) => (
              <div key={college.id} className="flex-1 px-4 text-center">
                <div className="w-24 h-24 md:w-32 md:h-32 mx-auto rounded-2xl overflow-hidden mb-4 shadow-md border border-slate-200 dark:border-white/10">
                  <img src={college.image_url} alt={college.name} className="w-full h-full object-cover" />
                </div>
                <h2 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white mb-2 line-clamp-2">{college.name}</h2>
                <div className="flex items-center justify-center gap-1 text-sm text-slate-500 dark:text-slate-400 font-medium">
                  <MapPin className="w-4 h-4 text-indigo-500" />
                  {college.location}
                </div>
                <Link href={`/colleges/${college.id}`} className="inline-block mt-5 text-sm text-indigo-600 dark:text-indigo-400 hover:text-white dark:hover:text-white font-bold bg-indigo-50 dark:bg-indigo-500/10 border border-indigo-200 dark:border-indigo-500/20 px-6 py-2 rounded-full hover:bg-indigo-600 dark:hover:bg-indigo-500 transition-all shadow-sm">
                  View Profile
                </Link>
              </div>
            ))}
          </div>

          {/* Feature Matrix */}
          <div className="space-y-6">
            {/* Rating Section */}
            <div className="flex bg-white dark:bg-[#111111] rounded-2xl border border-slate-200 dark:border-white/10 p-6 items-center shadow-sm hover:shadow-md transition-all">
              <div className="w-64 shrink-0 pr-6 border-r border-slate-100 dark:border-white/5 flex items-center gap-3">
                <div className="p-2 bg-amber-50 dark:bg-amber-500/10 rounded-lg">
                  <Award className="w-5 h-5 text-amber-500" />
                </div>
                <span className="font-bold text-slate-700 dark:text-slate-300">Rating & Year</span>
              </div>
              {colleges.map((college) => (
                <div key={college.id} className="flex-1 px-4 text-center">
                  <div className="inline-flex items-center gap-1.5 bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400 px-3 py-1 rounded-full text-lg font-bold mb-2 border border-amber-100 dark:border-amber-500/20">
                    <Star className="w-4 h-4 fill-amber-500 text-amber-500" /> {college.rating}/5.0
                  </div>
                  <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Est. {college.established_year}</p>
                </div>
              ))}
            </div>

            {/* Fees Section */}
            <div className="flex bg-white dark:bg-[#111111] rounded-2xl border border-slate-200 dark:border-white/10 p-6 items-center shadow-sm hover:shadow-md transition-all">
              <div className="w-64 shrink-0 pr-6 border-r border-slate-100 dark:border-white/5 flex items-center gap-3">
                <div className="p-2 bg-emerald-50 dark:bg-emerald-500/10 rounded-lg">
                  <DollarSign className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                </div>
                <span className="font-bold text-slate-700 dark:text-slate-300">Total Fees (Approx)</span>
              </div>
              {colleges.map((college) => (
                <div key={college.id} className="flex-1 px-4 text-center">
                  <p className="text-3xl font-extrabold text-slate-900 dark:text-white">₹{college.fees.toLocaleString()}</p>
                </div>
              ))}
            </div>

            {/* Placement Section */}
            <div className="flex bg-white dark:bg-[#111111] rounded-2xl border border-slate-200 dark:border-white/10 p-6 items-center shadow-sm hover:shadow-md transition-all">
              <div className="w-64 shrink-0 pr-6 border-r border-slate-100 dark:border-white/5 flex items-center gap-3">
                <div className="p-2 bg-blue-50 dark:bg-blue-500/10 rounded-lg">
                  <Briefcase className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                </div>
                <span className="font-bold text-slate-700 dark:text-slate-300">Placements</span>
              </div>
              {colleges.map((college) => {
                const latestStat = college.placement_stats?.[college.placement_stats.length - 1];
                return (
                  <div key={college.id} className="flex-1 px-4 text-center">
                    <div className="text-4xl font-black text-blue-600 dark:text-blue-400 mb-1">{college.placement_percent}%</div>
                    <p className="text-sm font-semibold text-slate-500 dark:text-slate-400 mb-3 uppercase tracking-wide">Placement Rate</p>
                    {latestStat && (
                      <div className="bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/10 rounded-xl p-3 inline-block">
                        <p className="text-xs text-slate-400 dark:text-slate-500 font-medium mb-1 uppercase">Latest Avg Package</p>
                        <p className="font-bold text-slate-800 dark:text-white text-lg">{latestStat.average_package} LPA</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Courses Section */}
            <div className="flex bg-white dark:bg-[#111111] rounded-2xl border border-slate-200 dark:border-white/10 p-6 items-start shadow-sm hover:shadow-md transition-all">
              <div className="w-64 shrink-0 pr-6 border-r border-slate-100 dark:border-white/5 flex items-center gap-3 pt-2">
                <div className="p-2 bg-purple-50 dark:bg-purple-500/10 rounded-lg">
                  <BookOpen className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                </div>
                <span className="font-bold text-slate-700 dark:text-slate-300">Popular Programs</span>
              </div>
              {colleges.map((college) => (
                <div key={college.id} className="flex-1 px-4">
                  <div className="space-y-3">
                    {college.courses?.map((course) => (
                      <div key={course.id} className="bg-slate-50 dark:bg-white/5 rounded-xl p-4 text-left border border-slate-100 dark:border-white/10">
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <h4 className="font-bold text-slate-800 dark:text-white line-clamp-1">{course.name}</h4>
                          <span className="text-xs font-bold text-purple-700 dark:text-purple-300 bg-purple-100 dark:bg-purple-500/20 px-2 py-1 rounded shadow-sm whitespace-nowrap">
                            {course.duration} Years
                          </span>
                        </div>
                        <p className="text-sm font-medium text-slate-500 dark:text-slate-400">₹{course.fees.toLocaleString()}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default function ComparePage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    }>
      <CompareContent />
    </Suspense>
  );
}
