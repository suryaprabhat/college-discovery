"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import { MapPin, DollarSign, Star, ArrowLeft, GraduationCap, TrendingUp, Calendar, ArrowDown, MessageSquare, Send } from "lucide-react";
import Link from "next/link";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, BarChart, Bar } from "recharts";

interface Course {
  id: string;
  name: string;
  duration: number;
  fees: number;
}

interface PlacementStat {
  id: string;
  year: number;
  placement_percent: number;
  students_placed: number;
  average_package: number;
}

interface Comment {
  id: string;
  author: string;
  text: string;
  createdAt: string;
}

interface College {
  id: string;
  name: string;
  location: string;
  fees: number;
  rating: number;
  placement_percent: number;
  description: string;
  image_url: string;
  students_placed: number;
  top_companies: string;
  established_year: number | null;
  recent_updates: string | null;
  standout_features: string | null;
  history: string | null;
  faculty_info: string | null;
  history_bg_image: string | null;
  faculty_bg_image: string | null;
  courses_bg_image: string | null;
  courses: Course[];
  placement_stats: PlacementStat[];
  comments: Comment[];
}

export default function CollegeDetails() {
  const { id } = useParams();
  const router = useRouter();
  const [college, setCollege] = useState<College | null>(null);
  const [loading, setLoading] = useState(true);
  const [newComment, setNewComment] = useState("");
  const [submittingComment, setSubmittingComment] = useState(false);

  useEffect(() => {
    if (!id) return;
    const fetchCollege = async () => {
      try {
        const res = await axios.get(`http://localhost:3001/api/colleges/${id}`);
        setCollege(res.data);
      } catch (error) {
        console.error("Error fetching college details", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCollege();
  }, [id]);

  const handlePostComment = async () => {
    if (!newComment.trim()) return;
    setSubmittingComment(true);
    try {
      const res = await axios.post(`http://localhost:3001/api/colleges/${id}/comments`, {
        author: "Guest Student",
        text: newComment.trim()
      });
      setCollege(prev => prev ? {
        ...prev,
        comments: [res.data, ...(prev.comments || [])]
      } : prev);
      setNewComment("");
    } catch (e) {
      console.error(e);
    } finally {
      setSubmittingComment(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!college) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center text-slate-900">
        <h1 className="text-3xl font-bold mb-4">College not found</h1>
        <button onClick={() => router.push('/')} className="text-indigo-600 hover:text-indigo-500 flex items-center gap-2 font-medium">
          <ArrowLeft className="w-4 h-4" /> Back to Listings
        </button>
      </div>
    );
  }

  const topCompaniesList = college.top_companies ? college.top_companies.split(',').map(s => s.trim()) : [];

  return (
    <div className="h-screen w-full overflow-y-scroll snap-y snap-mandatory bg-black text-white hide-scrollbar scroll-smooth">
      
      {/* 1. Hero Slide */}
      <section className="relative h-screen w-full snap-start snap-always flex flex-col justify-end pb-24 px-6 md:px-24">
        <div className="absolute inset-0 z-0">
          <img src={college.image_url} alt={college.name} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/20"></div>
        </div>
        
        <div className="relative z-10 max-w-6xl w-full mx-auto">
          <button onClick={() => router.back()} className="absolute -top-40 left-0 p-3 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full transition-colors flex items-center justify-center">
            <ArrowLeft className="w-6 h-6 text-white" />
          </button>
          
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="px-4 py-1.5 bg-indigo-600 rounded-full text-sm font-bold shadow-lg shadow-indigo-600/30 flex items-center gap-2">
              <Star className="w-4 h-4 fill-current" /> {college.rating}/5.0
            </span>
            <span className="px-4 py-1.5 bg-white/20 backdrop-blur-md rounded-full text-sm font-bold flex items-center gap-2 border border-white/10">
              <MapPin className="w-4 h-4" /> {college.location}
            </span>
            {college.established_year && (
              <span className="px-4 py-1.5 bg-white/20 backdrop-blur-md rounded-full text-sm font-bold flex items-center gap-2 border border-white/10">
                <Calendar className="w-4 h-4" /> Est. {college.established_year}
              </span>
            )}
          </div>
          
          <h1 className="text-5xl md:text-7xl font-black mb-6 leading-tight text-white drop-shadow-2xl">
            {college.name}
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 max-w-3xl mb-8 leading-relaxed font-medium drop-shadow-lg">
            {college.description}
          </p>

          <div className="flex gap-4 mb-12">
            {college.recent_updates && (
              <div className="bg-amber-500/20 border border-amber-500/30 text-amber-100 px-4 py-3 rounded-2xl flex-1 backdrop-blur-sm">
                <span className="font-bold text-amber-400 block text-xs uppercase mb-1">Recent Update</span>
                <span className="text-sm font-medium">{college.recent_updates}</span>
              </div>
            )}
            {college.standout_features && (
              <div className="bg-emerald-500/20 border border-emerald-500/30 text-emerald-100 px-4 py-3 rounded-2xl flex-1 backdrop-blur-sm hidden md:block">
                <span className="font-bold text-emerald-400 block text-xs uppercase mb-1">Standout Feature</span>
                <span className="text-sm font-medium">{college.standout_features}</span>
              </div>
            )}
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center animate-bounce z-20">
          <span className="text-xs uppercase tracking-widest text-white/50 mb-2 font-bold">Swipe Up</span>
          <ArrowDown className="w-5 h-5 text-white/50" />
        </div>
      </section>

      {/* 2. History & Legacy Slide */}
      {college.history && (
        <section className="relative h-screen w-full snap-start snap-always flex items-center px-6 md:px-24">
          <div className="absolute inset-0 z-0">
            <img src={college.history_bg_image || college.image_url} alt="History" className="w-full h-full object-cover scale-105" />
            <div className="absolute inset-0 bg-black/80 backdrop-blur-sm"></div>
          </div>
          <div className="relative z-10 max-w-4xl mx-auto text-center">
            <h2 className="text-5xl font-bold mb-8 text-white"><span className="text-amber-400">History</span> & Legacy.</h2>
            <p className="text-2xl text-gray-300 leading-relaxed font-light">{college.history}</p>
          </div>
        </section>
      )}

      {/* 3. Faculty Slide */}
      {college.faculty_info && (
        <section className="relative h-screen w-full snap-start snap-always flex items-center px-6 md:px-24">
          <div className="absolute inset-0 z-0">
            <img src={college.faculty_bg_image || college.image_url} alt="Faculty" className="w-full h-full object-cover scale-105" />
            <div className="absolute inset-0 bg-indigo-950/80 backdrop-blur-sm"></div>
          </div>
          <div className="relative z-10 max-w-4xl mx-auto text-center">
            <GraduationCap className="w-16 h-16 text-indigo-400 mx-auto mb-6" />
            <h2 className="text-5xl font-bold mb-8 text-white">World-Class <span className="text-indigo-400">Faculty.</span></h2>
            <p className="text-2xl text-indigo-100 leading-relaxed font-light">{college.faculty_info}</p>
          </div>
        </section>
      )}

      {/* 4. Programs & Fees Slide */}
      {college.courses && college.courses.length > 0 && (
        <section className="relative h-screen w-full snap-start snap-always flex items-center px-6 md:px-24">
          <div className="absolute inset-0 z-0">
            <img src={college.courses_bg_image || college.image_url} alt="Campus" className="w-full h-full object-cover scale-105" />
            <div className="absolute inset-0 bg-slate-900/90 backdrop-blur-md"></div>
          </div>
          <div className="relative z-10 max-w-6xl mx-auto w-full">
            <h2 className="text-5xl font-bold mb-12 text-center text-white">Programs & <span className="text-blue-400">Tuition.</span></h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {college.courses.map((course) => (
                <div key={course.id} className="glass-panel rounded-3xl p-6 hover:-translate-y-2 transition-transform duration-300 border border-white/10 group hover:bg-white/10">
                  <h3 className="text-xl font-bold text-white mb-4 group-hover:text-blue-400 transition-colors">{course.name}</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center text-gray-300">
                      <span className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-blue-400"></div>Duration</span>
                      <span className="font-bold text-white">{course.duration} Years</span>
                    </div>
                    <div className="w-full h-px bg-white/10"></div>
                    <div className="flex justify-between items-center text-gray-300">
                      <span className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-green-400"></div>Total Fees</span>
                      <span className="font-bold text-white">₹{course.fees.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 5. Placements Slide */}
      <section className="relative h-screen w-full snap-start snap-always flex items-center px-6 md:px-24">
        <div className="absolute inset-0 bg-[#0a0a0a] z-0"></div>
        <div className="relative z-10 max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          <div className="flex flex-col justify-center">
            <h2 className="text-5xl font-bold mb-6 text-white leading-tight">Career &<br/><span className="text-green-400">Placements.</span></h2>
            <div className="glass-panel p-8 rounded-3xl border border-white/10 mb-6">
              <h3 className="text-gray-400 text-sm mb-1 uppercase tracking-wider">Students Placed</h3>
              <p className="text-5xl font-bold text-white">{college.students_placed.toLocaleString()}+</p>
              <p className="text-green-400 text-sm mt-2 flex items-center gap-1 font-semibold">
                <TrendingUp className="w-4 h-4" /> Phenomenal growth trajectory
              </p>
            </div>
            
            <div className="glass-panel p-8 rounded-3xl border border-white/10">
              <h3 className="text-gray-400 text-sm mb-4 uppercase tracking-wider">Top Recruiters</h3>
              <div className="flex flex-wrap gap-2">
                {topCompaniesList.map((company, i) => (
                  <span key={i} className="px-4 py-2 bg-white/5 rounded-full text-sm font-bold border border-white/10">
                    {company}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-center space-y-6">
            {college.placement_stats && college.placement_stats.length > 0 && (
              <div className="glass-panel p-8 rounded-3xl border border-white/10">
                <h3 className="font-bold text-xl mb-6 text-white">Placement Percentage Trend</h3>
                <div className="h-48 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={college.placement_stats}>
                      <defs>
                        <linearGradient id="colorPercent" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#4ade80" stopOpacity={0.5}/>
                          <stop offset="95%" stopColor="#4ade80" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                      <XAxis dataKey="year" stroke="rgba(255,255,255,0.3)" />
                      <YAxis stroke="rgba(255,255,255,0.3)" domain={['dataMin - 10', 100]} />
                      <RechartsTooltip 
                        contentStyle={{ backgroundColor: '#111', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }}
                        itemStyle={{ color: '#fff', fontWeight: 'bold' }}
                      />
                      <Area type="monotone" dataKey="placement_percent" stroke="#4ade80" strokeWidth={4} fillOpacity={1} fill="url(#colorPercent)" name="Placement %" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
            )}
            
            {college.placement_stats && college.placement_stats.length > 0 && (
              <div className="glass-panel p-8 rounded-3xl border border-white/10">
                <h3 className="font-bold text-xl mb-6 text-white">Students Placed Annually</h3>
                <div className="h-48 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={college.placement_stats}>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                      <XAxis dataKey="year" stroke="rgba(255,255,255,0.3)" />
                      <YAxis stroke="rgba(255,255,255,0.3)" />
                      <RechartsTooltip 
                        contentStyle={{ backgroundColor: '#111', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }}
                        itemStyle={{ color: '#fff', fontWeight: 'bold' }}
                        cursor={{fill: 'rgba(255,255,255,0.05)'}}
                      />
                      <Bar dataKey="students_placed" fill="#818cf8" radius={[8, 8, 0, 0]} name="Students Placed" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 6. Comments Slide */}
      <section className="relative h-screen w-full snap-start snap-always flex flex-col items-center justify-center px-6 md:px-24 bg-[#050505]">
        <div className="max-w-4xl w-full mx-auto flex flex-col h-[80vh]">
          
          <div className="text-center mb-8">
            <MessageSquare className="w-12 h-12 text-indigo-500 mx-auto mb-4" />
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-2">Student <span className="text-indigo-400">Discussions.</span></h2>
            <p className="text-gray-400">Read reviews, ask questions, and connect with peers.</p>
          </div>

          <div className="flex-1 overflow-y-auto hide-scrollbar space-y-4 mb-6 pr-2">
            {college.comments && college.comments.length > 0 ? (
              college.comments.map(comment => (
                <div key={comment.id} className="bg-white/5 border border-white/10 p-5 rounded-2xl">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold text-indigo-300">{comment.author}</span>
                    <span className="text-xs text-gray-500">{new Date(comment.createdAt).toLocaleDateString()}</span>
                  </div>
                  <p className="text-gray-200">{comment.text}</p>
                </div>
              ))
            ) : (
              <div className="text-center py-12 text-gray-500 border border-dashed border-white/10 rounded-3xl bg-white/5 h-full flex flex-col items-center justify-center">
                <MessageSquare className="w-10 h-10 mb-3 opacity-20" />
                <p>No comments yet. Be the first to start the discussion!</p>
              </div>
            )}
          </div>

          <div className="bg-white/5 border border-white/10 p-4 rounded-3xl flex gap-3 mt-auto">
            <input 
              type="text" 
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handlePostComment()}
              placeholder="Add your thoughts or ask a question..."
              className="flex-1 bg-transparent border-none text-white outline-none px-4 placeholder-gray-500"
            />
            <button 
              onClick={handlePostComment}
              disabled={!newComment.trim() || submittingComment}
              className="bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white p-3 rounded-2xl transition-colors flex items-center justify-center shadow-lg shadow-indigo-600/20"
            >
              {submittingComment ? <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" /> : <Send className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </section>

      {/* Global Style for hiding scrollbar */}
      <style dangerouslySetInnerHTML={{__html: `
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}} />
    </div>
  );
}
