import React, { useState, useEffect, useMemo } from 'react';
import {
  Rocket,
  CheckCircle,
  Clock,
  BookOpen,
  ChevronRight,
  Menu,
  X,
  Github,
  Mail,
  Zap,
  Calendar,
  AlertCircle,
  Users,
  Instagram,
  Twitter,
  Linkedin,
  MessageSquare,
  ShieldCheck,
  Smartphone,
  Globe,
  Plus,
  Trash2,
  ExternalLink,
  ChevronDown,
  Facebook,
  Lock,
  Eye,
  EyeOff,
  Award,
  Target,
  Heart,
  ArrowRight,
  Code,
  Layers,
  Map,
  Briefcase,
  HelpCircle,
  FileText,
  Database,
  Terminal,
  Cpu,
  Search,
  Check,
  Filter,
  PieChart,
  Bell,
  Settings,
  LogOut,
  MoreVertical,
  Cloud,
  Sparkles,
  ZapOff,
  HardDrive,
  Share2,
  Headphones,
  BarChart3,
  Radio,
  Star,
  Quote,
} from 'lucide-react';

// --- DATA MOCKUP UNTUK DASHBOARD ---
const INITIAL_TASKS = [
  { id: 1, title: 'Laporan Praktikum Fisika', subject: 'Fisika Dasar', deadline: '2026-05-20', priority: 'High', completed: false },
  { id: 2, title: 'Analisis Algoritma Kelompok 4', subject: 'Struktur Data', deadline: '2026-05-22', priority: 'Medium', completed: true },
  { id: 3, title: 'Persiapan Kuis Kalkulus', subject: 'Matematika II', deadline: '2026-05-19', priority: 'High', completed: false },
  { id: 4, title: 'Esai Bahasa Inggris', subject: 'English', deadline: '2026-05-25', priority: 'Low', completed: false },
  { id: 5, title: 'Proposal Skripsi Bab 1', subject: 'Metodologi', deadline: '2026-06-01', priority: 'High', completed: false },
];

// --- KOMPONEN AUTENTIKASI ---
const AuthModal = ({ type, onClose, setType, onLoginSuccess }) => {
  const [showPass, setShowPass] = useState(false);
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={onClose}></div>
      <div className="bg-white w-full max-w-md rounded-[32px] shadow-2xl relative z-10 overflow-hidden animate-in zoom-in duration-300">
        <div className="p-8 md:p-12">
          <button onClick={onClose} className="absolute top-6 right-6 text-slate-400 hover:text-slate-900 transition-colors">
            <X size={24} />
          </button>
          <div className="text-center mb-8">
            <h2 className="text-3xl font-black text-slate-900 mb-2">{type === 'login' ? 'Masuk' : 'Daftar'}</h2>
            <p className="text-slate-500 font-medium">Akses ekosistem KampusFlow Anda.</p>
          </div>
          <form
            className="space-y-4"
            onSubmit={(e) => {
              e.preventDefault();
              onLoginSuccess();
            }}
          >
            {type === 'register' && <input type="text" placeholder="Nama Lengkap" className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-100 outline-none font-medium focus:border-blue-500 transition-all" required />}
            <input type="email" placeholder="Email Kampus (@univ.ac.id)" className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-100 outline-none font-medium focus:border-blue-500 transition-all" required />
            <div className="relative">
              <input type={showPass ? 'text' : 'password'} placeholder="Kata Sandi" className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-100 outline-none font-medium focus:border-blue-500 transition-all" required />
              <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-5 bottom-4 text-slate-400">
                {showPass ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            <button type="submit" className="w-full bg-blue-600 text-white py-5 rounded-2xl font-black text-lg shadow-xl shadow-blue-200 hover:bg-blue-700 transition-all mt-4 active:scale-[0.98]">
              {type === 'login' ? 'Masuk Sekarang' : 'Buat Akun'}
            </button>
          </form>
          <p className="mt-8 text-center text-slate-500 font-medium">
            {type === 'login' ? 'Belum punya akun?' : 'Sudah punya akun?'}
            <button onClick={() => setType(type === 'login' ? 'register' : 'login')} className="ml-2 text-blue-600 font-black hover:underline transition-all">
              Klik di sini
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

// --- DASHBOARD KOMPONEN ---
const Dashboard = ({ user }) => {
  const [tasks, setTasks] = useState(INITIAL_TASKS);
  const [filter, setFilter] = useState('all');

  const filteredTasks = tasks.filter((task) => {
    if (filter === 'completed') return task.completed;
    if (filter === 'pending') return !task.completed;
    return true;
  });

  const stats = useMemo(
    () => ({
      total: tasks.length,
      completed: tasks.filter((t) => t.completed).length,
      pending: tasks.filter((t) => !t.completed).length,
    }),
    [tasks]
  );

  const toggleTask = (id) => {
    setTasks(tasks.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((t) => t.id !== id));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 animate-in fade-in slide-in-from-bottom-4">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
        <div>
          <h1 className="text-4xl font-black text-slate-900 mb-2">Halo, {user?.name || 'David Stanley'}! 👋</h1>
          <p className="text-slate-500 font-medium text-lg">Anda memiliki {stats.pending} tugas yang perlu diselesaikan hari ini.</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3.5 rounded-2xl font-black text-sm shadow-lg shadow-blue-100 hover:bg-blue-700 transition-all">
            <Plus size={18} /> Tambah Tugas
          </button>
          <button className="p-3.5 bg-white border border-slate-200 rounded-2xl text-slate-400 hover:text-blue-600 hover:border-blue-100 transition-all relative">
            <Bell size={20} />
            <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        <div className="bg-gradient-to-br from-blue-600 to-blue-700 p-8 rounded-[32px] text-white shadow-xl group hover:scale-[1.02] transition-transform">
          <div className="flex justify-between items-start mb-6">
            <div className="p-3 bg-white/20 rounded-2xl">
              <PieChart size={24} />
            </div>
            <span className="text-sm font-black bg-white/10 px-3 py-1 rounded-full uppercase tracking-widest">Akademik</span>
          </div>
          <p className="text-blue-100 font-bold mb-1">Progres Semester</p>
          <h3 className="text-4xl font-black mb-4">78%</h3>
          <div className="w-full bg-white/20 h-2.5 rounded-full overflow-hidden">
            <div className="bg-white h-full w-[78%]"></div>
          </div>
        </div>
        <div className="bg-white border-2 border-slate-50 p-8 rounded-[32px] shadow-sm hover:border-blue-100 transition-colors">
          <div className="flex justify-between items-start mb-6">
            <div className="p-3 bg-green-100 text-green-600 rounded-2xl">
              <CheckCircle size={24} />
            </div>
          </div>
          <p className="text-slate-400 font-bold mb-1">Tugas Selesai</p>
          <h3 className="text-4xl font-black text-slate-900">
            {stats.completed} <span className="text-lg text-slate-300">/ {stats.total}</span>
          </h3>
        </div>
        <div className="bg-white border-2 border-slate-50 p-8 rounded-[32px] shadow-sm hover:border-amber-100 transition-colors">
          <div className="flex justify-between items-start mb-6">
            <div className="p-3 bg-amber-100 text-amber-600 rounded-2xl">
              <Clock size={24} />
            </div>
          </div>
          <p className="text-slate-400 font-bold mb-1">Deadline Dekat</p>
          <h3 className="text-4xl font-black text-slate-900">
            3 <span className="text-lg text-slate-300">Minggu Ini</span>
          </h3>
        </div>
      </div>

      <div className="bg-white border border-slate-100 rounded-[40px] shadow-sm overflow-hidden">
        <div className="p-8 border-b border-slate-50 flex justify-between items-center bg-slate-50/50">
          <h3 className="text-xl font-black text-slate-900">Daftar Tugas Saya</h3>
          <div className="flex bg-white p-1 rounded-xl border border-slate-200">
            {['all', 'pending', 'completed'].map((f) => (
              <button key={f} onClick={() => setFilter(f)} className={`px-4 py-1.5 rounded-lg text-xs font-black uppercase transition-all ${filter === f ? 'bg-slate-900 text-white shadow-md' : 'text-slate-400 hover:text-slate-600'}`}>
                {f}
              </button>
            ))}
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-xs font-black text-slate-400 uppercase tracking-widest bg-slate-50/50">
                <th className="px-8 py-5">Tugas</th>
                <th className="px-8 py-5">Mata Kuliah</th>
                <th className="px-8 py-5">Deadline</th>
                <th className="px-8 py-5">Prioritas</th>
                <th className="px-8 py-5 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filteredTasks.length > 0 ? (
                filteredTasks.map((task) => (
                  <tr key={task.id} className={`hover:bg-slate-50/50 transition-colors ${task.completed ? 'opacity-50' : ''}`}>
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-4">
                        <button
                          onClick={() => toggleTask(task.id)}
                          className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all ${task.completed ? 'bg-green-500 border-green-500 text-white' : 'border-slate-200 hover:border-blue-500'}`}
                        >
                          {task.completed && <Check size={14} />}
                        </button>
                        <span className={`font-bold text-slate-700 ${task.completed ? 'line-through' : ''}`}>{task.title}</span>
                      </div>
                    </td>
                    <td className="px-8 py-6 text-sm font-bold text-slate-500">{task.subject}</td>
                    <td className="px-8 py-6 text-sm font-bold text-slate-500">
                      <div className="flex items-center gap-2">
                        <Calendar size={14} /> {task.deadline}
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <span
                        className={`text-[10px] font-black uppercase px-2 py-1 rounded-md ${task.priority === 'High' ? 'bg-red-50 text-red-600' : task.priority === 'Medium' ? 'bg-amber-50 text-amber-600' : 'bg-green-50 text-green-600'}`}
                      >
                        {task.priority}
                      </span>
                    </td>
                    <td className="px-8 py-6 text-right">
                      <button onClick={() => deleteTask(task.id)} className="text-slate-300 hover:text-red-500 transition-colors">
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="px-8 py-16 text-center">
                    <div className="max-w-xs mx-auto text-slate-400">
                      <AlertCircle className="mx-auto mb-4" size={48} />
                      <p className="font-bold">Tidak ada tugas ditemukan untuk kategori ini.</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// --- HALAMAN UTAMA (LANDING PAGE - DIPERBARUI) ---
const LandingPage = ({ onStart }) => (
  <div className="animate-in fade-in duration-1000">
    <section className="pt-24 pb-32 px-4 relative overflow-hidden text-center">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10">
        <div className="absolute top-20 left-10 w-96 h-96 bg-blue-400 rounded-full blur-[140px] opacity-20 animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-400 rounded-full blur-[140px] opacity-20 animate-pulse delay-1000"></div>
      </div>
      <div className="max-w-7xl mx-auto">
        <div className="inline-flex items-center gap-3 bg-blue-50 border border-blue-100 text-blue-700 px-6 py-3 rounded-full text-sm font-black mb-10 uppercase tracking-widest shadow-sm">
          <Zap size={16} fill="currentColor" /> <span>Versi 3.0: AI Assistant Ready</span>
        </div>
        <h1 className="text-5xl md:text-[100px] font-black text-slate-900 mb-10 leading-[0.9] tracking-tighter">
          Kuliah Lebih{' '}
          <span className="text-blue-600 relative">
            Teratur<div className="absolute bottom-4 left-0 w-full h-4 bg-blue-100 -z-10"></div>
          </span>
          , <br />
          Hidup Lebih Tenang.
        </h1>
        <p className="text-xl md:text-2xl text-slate-600 max-w-3xl mx-auto mb-16 leading-relaxed font-medium">
          Sistem manajemen cerdas untuk deadline tugas, kuis, dan materi kuliah. Bergabunglah dengan ribuan mahasiswa Indonesia yang sudah bertransformasi.
        </p>
        <div className="flex flex-col sm:flex-row justify-center items-center gap-8">
          <button
            onClick={onStart}
            className="bg-blue-600 text-white px-12 py-6 rounded-3xl font-black text-2xl hover:bg-blue-700 shadow-2xl shadow-blue-200 flex items-center justify-center gap-4 transition-all hover:-translate-y-2 active:scale-95"
          >
            Mulai Sekarang <ChevronRight size={28} />
          </button>
          <div className="flex flex-col items-start gap-1">
            <div className="flex -space-x-3">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="w-10 h-10 rounded-full bg-slate-200 border-2 border-white flex items-center justify-center font-black text-xs text-slate-400">
                  {i}
                </div>
              ))}
              <div className="w-10 h-10 rounded-full bg-blue-600 border-2 border-white flex items-center justify-center font-black text-xs text-white">+12k</div>
            </div>
            <p className="text-sm font-bold text-slate-500 mt-2">Mahasiswa dari 48+ Kampus</p>
          </div>
        </div>
      </div>
    </section>

    {/* Section Fitur Cepat */}
    <section className="py-24 bg-white px-4">
      <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-12">
        {[
          { icon: <Zap className="text-amber-500" />, title: 'Smart Scheduling', desc: 'Algoritma kami mengatur jadwal belajar paling efisien berdasarkan beban tugas.' },
          { icon: <Users className="text-blue-500" />, title: 'Collaborative Study', desc: 'Kerjakan tugas kelompok lebih sinkron dengan Shared Workspace.' },
          { icon: <ShieldCheck className="text-green-500" />, title: 'Verified Identity', desc: 'Login aman khusus email kampus untuk data akademik yang valid.' },
        ].map((f, i) => (
          <div key={i} className="p-10 bg-slate-50 rounded-[48px] border border-slate-100 hover:border-blue-500 transition-all">
            <div className="mb-6">{f.icon}</div>
            <h4 className="text-2xl font-black mb-4 text-slate-900">{f.title}</h4>
            <p className="text-slate-500 font-medium leading-relaxed">{f.desc}</p>
          </div>
        ))}
      </div>
    </section>

    {/* Section Testimoni (BARU) */}
    <section className="py-24 bg-slate-900 text-white overflow-hidden relative">
      <div className="absolute -left-20 top-1/2 w-96 h-96 bg-blue-600/30 blur-[150px] rounded-full"></div>
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black mb-6">Kata Mereka Tentang Kami</h2>
          <p className="text-slate-400 text-xl max-w-2xl mx-auto">Lihat bagaimana KampusFlow membantu mahasiswa mencapai potensi maksimal mereka.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { name: 'Sarah Amalia', univ: 'Univ. Indonesia', quote: 'Sejak pakai KampusFlow, IPK saya naik dari 3.2 jadi 3.8. Fitur pengingatnya benar-benar life saver!', role: 'Mahasiswa Tingkat Akhir' },
            { name: 'Budi Santoso', univ: 'ITB', quote: "Manajemen tugas kelompok jadi jauh lebih mudah. Tidak ada lagi drama 'siapa ngerjain apa'.", role: 'Ketua Himpunan' },
            { name: 'Jessica Tan', univ: 'Binus University', quote: 'Interface-nya sangat clean dan modern. Rasanya seperti menggunakan aplikasi produktivitas kelas dunia.', role: 'Desain Komunikasi Visual' },
          ].map((t, i) => (
            <div key={i} className="bg-white/10 backdrop-blur-md border border-white/10 p-8 rounded-[40px] relative">
              <Quote className="absolute top-8 right-8 text-white/20" size={40} />
              <div className="flex gap-1 mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} size={16} className="text-amber-400 fill-amber-400" />
                ))}
              </div>
              <p className="text-lg font-medium leading-relaxed mb-6">"{t.quote}"</p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center font-black text-lg">{t.name.charAt(0)}</div>
                <div>
                  <h5 className="font-bold">{t.name}</h5>
                  <p className="text-xs text-slate-400 uppercase tracking-wider">{t.univ}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  </div>
);

// --- HALAMAN FEATURES ---
const FeaturesPage = () => {
  return (
    <div className="animate-in fade-in duration-700">
      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4 bg-slate-50">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex p-3 bg-blue-100 text-blue-600 rounded-2xl mb-6">
            <Sparkles size={28} />
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-slate-900 mb-8 leading-tight">
            Satu Platform, <br />
            <span className="text-blue-600 italic">Unlimited</span> Potensi.
          </h1>
          <p className="text-xl text-slate-500 max-w-2xl mx-auto font-medium">Dirancang khusus untuk ekosistem akademik Indonesia yang dinamis dan menantang.</p>
        </div>
      </section>

      {/* Core Modules Grid */}
      <section className="py-24 px-4 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              icon: <Clock className="text-amber-500" />,
              title: 'Smart Scheduler',
              desc: 'AI yang menyesuaikan jadwal belajar Anda secara otomatis ketika ada deadline mendadak.',
              color: 'bg-amber-50',
            },
            {
              icon: <BarChart3 className="text-blue-500" />,
              title: 'Predictive Analytics',
              desc: 'Lacak tren nilai Anda dan dapatkan prediksi IPK berdasarkan progres tugas saat ini.',
              color: 'bg-blue-50',
            },
            {
              icon: <Share2 className="text-purple-500" />,
              title: 'Group Sync',
              desc: 'Delegasikan tugas kelompok dan pantau siapa yang sudah mengerjakan apa secara real-time.',
              color: 'bg-purple-50',
            },
            {
              icon: <HardDrive className="text-emerald-500" />,
              title: 'Academic Vault',
              desc: 'Penyimpanan awan terenkripsi untuk menyimpan semua draf laporan dan jurnal referensi.',
              color: 'bg-emerald-50',
            },
            {
              icon: <Radio className="text-red-500" />,
              title: 'Focus Mode',
              desc: 'Pemblokir distraksi cerdas yang terintegrasi dengan playlist Lo-Fi favorit Anda.',
              color: 'bg-red-50',
            },
            {
              icon: <Smartphone className="text-indigo-500" />,
              title: 'Multi-Platform',
              desc: 'Aplikasi native untuk iOS, Android, dan Web dengan sinkronisasi instan.',
              color: 'bg-indigo-50',
            },
          ].map((item, i) => (
            <div key={i} className={`p-10 rounded-[48px] border border-transparent hover:border-slate-200 hover:shadow-xl transition-all group ${item.color}`}>
              <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center mb-8 shadow-sm group-hover:scale-110 transition-transform">{item.icon}</div>
              <h3 className="text-2xl font-black mb-4 text-slate-900">{item.title}</h3>
              <p className="text-slate-600 font-medium leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Feature Comparison */}
      <section className="py-24 px-4 bg-slate-900 text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/20 blur-[120px] rounded-full"></div>
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row gap-16 items-center">
            <div className="md:w-1/2">
              <h2 className="text-4xl md:text-5xl font-black mb-8 leading-tight">Mengapa Mahasiswa Memilih Kami?</h2>
              <p className="text-slate-400 text-lg mb-10 font-medium">Banyak aplikasi to-do list di luar sana, tapi tidak ada yang mengerti "derita" mahasiswa Indonesia seperti kami.</p>
              <div className="space-y-6">
                {['Integrasi Email Kampus (@univ.ac.id)', 'Format Laporan Sesuai Standar Akademik', 'Komunitas Belajar Antar Universitas', 'Dukungan Bahasa Indonesia & Istilah Lokal'].map((check, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <div className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center flex-shrink-0">
                      <Check size={14} />
                    </div>
                    <span className="font-bold text-slate-200">{check}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="md:w-1/2 bg-white/5 backdrop-blur-md p-10 rounded-[64px] border border-white/10 shadow-2xl">
              <div className="flex justify-between items-center mb-8">
                <div className="text-xl font-black">Performance Tracker</div>
                <div className="px-4 py-1 bg-green-500/20 text-green-400 rounded-full text-xs font-black uppercase tracking-widest">Optimized</div>
              </div>
              <div className="space-y-8">
                <div>
                  <div className="flex justify-between mb-2 text-sm font-bold">
                    <span>Efficiency</span>
                    <span>92%</span>
                  </div>
                  <div className="w-full bg-white/10 h-3 rounded-full overflow-hidden">
                    <div className="bg-blue-500 h-full w-[92%]"></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-2 text-sm font-bold">
                    <span>Deadline Accuracy</span>
                    <span>88%</span>
                  </div>
                  <div className="w-full bg-white/10 h-3 rounded-full overflow-hidden">
                    <div className="bg-purple-500 h-full w-[88%]"></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-2 text-sm font-bold">
                    <span>Social Impact</span>
                    <span>100%</span>
                  </div>
                  <div className="w-full bg-white/10 h-3 rounded-full overflow-hidden">
                    <div className="bg-amber-500 h-full w-full"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

// --- HALAMAN PRICING ---
const PricingPage = () => {
  const [isYearly, setIsYearly] = useState(true);

  return (
    <div className="py-24 px-4 bg-white animate-in fade-in">
      <div className="max-w-7xl mx-auto text-center mb-20">
        <h1 className="text-5xl md:text-7xl font-black text-slate-900 mb-6">
          Investasi untuk <br />
          <span className="text-blue-600">IPK & Ketenangan</span> Anda.
        </h1>
        <p className="text-xl text-slate-500 font-medium mb-12">Pilih paket yang sesuai dengan kebutuhan perjalanan akademik Anda.</p>

        {/* Billing Toggle */}
        <div className="flex justify-center items-center gap-6">
          <span className={`text-sm font-black uppercase tracking-widest ${!isYearly ? 'text-slate-900' : 'text-slate-400'}`}>Bulanan</span>
          <button onClick={() => setIsYearly(!isYearly)} className="w-16 h-8 bg-slate-100 rounded-full p-1 relative flex items-center transition-all border border-slate-200">
            <div className={`w-6 h-6 bg-blue-600 rounded-full shadow-lg transition-all transform ${isYearly ? 'translate-x-8' : 'translate-x-0'}`}></div>
          </button>
          <div className="flex items-center gap-3">
            <span className={`text-sm font-black uppercase tracking-widest ${isYearly ? 'text-slate-900' : 'text-slate-400'}`}>Tahunan</span>
            <span className="bg-amber-100 text-amber-700 text-[10px] font-black px-2 py-1 rounded-md uppercase tracking-widest">Hemat 20%</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8">
        {/* Basic Plan */}
        <div className="p-10 rounded-[48px] border-2 border-slate-50 hover:border-slate-200 transition-all bg-slate-50 flex flex-col">
          <div className="mb-8">
            <h3 className="text-2xl font-black mb-2">Student Basic</h3>
            <p className="text-slate-500 font-medium">Cocok untuk mahasiswa baru.</p>
          </div>
          <div className="mb-8">
            <div className="flex items-baseline gap-1">
              <span className="text-4xl font-black">Gratis</span>
            </div>
            <p className="text-slate-400 text-sm font-bold mt-2">Selamanya tanpa kartu kredit.</p>
          </div>
          <div className="space-y-4 mb-10 flex-grow">
            {[
              { text: 'Maksimal 10 Tugas Aktif', active: true },
              { text: 'Kalender Dasar', active: true },
              { text: 'Shared Workspace (1 Kelompok)', active: true },
              { text: 'Cloud Sync (Mobile Only)', active: true },
              { text: 'AI Predictions', active: false },
              { text: 'Advanced Analytics', active: false },
            ].map((item, i) => (
              <div key={i} className={`flex items-center gap-3 text-sm font-bold ${item.active ? 'text-slate-700' : 'text-slate-300'}`}>
                {item.active ? <CheckCircle size={18} className="text-green-500" /> : <ZapOff size={18} />}
                <span>{item.text}</span>
              </div>
            ))}
          </div>
          <button className="w-full py-5 rounded-2xl bg-white border-2 border-slate-200 text-slate-900 font-black text-lg hover:border-blue-600 transition-all">Pilih Paket</button>
        </div>

        {/* Pro Plan */}
        <div className="p-10 rounded-[48px] border-4 border-blue-600 bg-white shadow-2xl shadow-blue-100 flex flex-col relative transform hover:scale-[1.02] transition-all">
          <div className="absolute top-0 right-10 -translate-y-1/2 bg-blue-600 text-white px-6 py-2 rounded-full text-xs font-black uppercase tracking-[0.2em]">Paling Populer</div>
          <div className="mb-8">
            <h3 className="text-2xl font-black mb-2 text-blue-600">Student Pro</h3>
            <p className="text-slate-500 font-medium">Untuk pejuang skripsi & IPK 4.0.</p>
          </div>
          <div className="mb-8">
            <div className="flex items-baseline gap-1">
              <span className="text-slate-400 text-lg font-black italic line-through">Rp 25rb</span>
              <span className="text-5xl font-black">Rp {isYearly ? '19rb' : '25rb'}</span>
              <span className="text-slate-400 font-bold">/ bln</span>
            </div>
            <p className="text-blue-600 text-sm font-black mt-2">Dapatkan akses ke semua fitur cerdas.</p>
          </div>
          <div className="space-y-4 mb-10 flex-grow">
            {[
              { text: 'Tugas Aktif Tanpa Batas', active: true },
              { text: 'AI Smart Scheduler', active: true },
              { text: 'Shared Workspace (Unlimited)', active: true },
              { text: 'Cloud Sync Semua Device', active: true },
              { text: 'Predictive Analytics', active: true },
              { text: 'Prioritas Layanan Bantuan', active: true },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3 text-sm font-black text-slate-900">
                <CheckCircle size={18} className="text-blue-600" />
                <span>{item.text}</span>
              </div>
            ))}
          </div>
          <button className="w-full py-5 rounded-2xl bg-blue-600 text-white font-black text-lg hover:bg-blue-700 shadow-xl shadow-blue-200 transition-all">Aktivasi Pro</button>
        </div>

        {/* Institution Plan */}
        <div className="p-10 rounded-[48px] border-2 border-slate-50 hover:border-slate-200 transition-all bg-slate-900 text-white flex flex-col">
          <div className="mb-8">
            <h3 className="text-2xl font-black mb-2">Universitas</h3>
            <p className="text-slate-400 font-medium">Khusus untuk pengurus kampus.</p>
          </div>
          <div className="mb-8">
            <div className="flex items-baseline gap-1">
              <span className="text-4xl font-black">Custom</span>
            </div>
            <p className="text-slate-500 text-sm font-bold mt-2">Integrasi sistem akademik kampus.</p>
          </div>
          <div className="space-y-4 mb-10 flex-grow">
            {[
              { text: 'Dashboard Monitoring Dosen', active: true },
              { text: 'Statistik Progres Mahasiswa', active: true },
              { text: 'Integrasi SIAKAD/LMS', active: true },
              { text: 'On-Premise Deployment', active: true },
              { text: 'SLA Keamanan 99.99%', active: true },
              { text: 'Dedicated Support Team', active: true },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3 text-sm font-bold text-slate-300">
                <CheckCircle size={18} className="text-blue-500" />
                <span>{item.text}</span>
              </div>
            ))}
          </div>
          <button className="w-full py-5 rounded-2xl bg-white text-slate-900 font-black text-lg hover:bg-blue-50 transition-all">Hubungi Sales</button>
        </div>
      </div>

      {/* Pricing FAQ */}
      <div className="max-w-4xl mx-auto mt-32">
        <h3 className="text-3xl font-black text-center mb-12">Pertanyaan Seputar Harga</h3>
        <div className="space-y-6">
          {[
            { q: 'Apakah saya bisa membatalkan langganan kapan saja?', a: 'Ya, Anda bisa membatalkan langganan Pro kapan saja tanpa biaya tambahan. Akses Pro Anda akan tetap aktif sampai akhir periode penagihan.' },
            { q: 'Apa bedanya tagihan bulanan dan tahunan?', a: 'Tagihan tahunan memberikan diskon sebesar 20% dibandingkan tagihan bulanan jika diakumulasikan selama 12 bulan.' },
            { q: 'Apakah ada diskon khusus organisasi mahasiswa?', a: 'Tentu! Kami mendukung kegiatan kemahasiswaan. Silakan hubungi tim support kami dengan menyertakan surat keterangan organisasi untuk mendapatkan harga khusus.' },
          ].map((faq, i) => (
            <div key={i} className="p-8 bg-slate-50 rounded-3xl border border-slate-100">
              <h4 className="text-lg font-black text-slate-900 mb-2">{faq.q}</h4>
              <p className="text-slate-500 font-medium leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// --- KOMPONEN HALAMAN INFORMASI LAINNYA ---

const AboutPage = () => {
  const team = [
    { name: 'Adit Pratama', role: 'Founder & CEO', univ: 'Univ. Indonesia' },
    { name: 'Salsa Bila', role: 'Head of Product', univ: 'ITB' },
    { name: 'Bimo Sakti', role: 'Lead Engineer', univ: 'UGM' },
    { name: 'Nanda Putri', role: 'UX Research', univ: 'BINUS' },
  ];

  return (
    <div className="animate-in fade-in duration-700">
      <section className="py-24 px-4 bg-slate-50 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-100 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 opacity-50"></div>
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <h1 className="text-6xl md:text-7xl font-black mb-8 text-slate-900 tracking-tight leading-tight">
            Misi Kami: Bebaskan Mahasiswa dari <span className="text-blue-600">Overwhelm.</span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-600 leading-relaxed font-medium mb-12 max-w-3xl mx-auto">
            KampusFlow lahir dari sebuah kos-kosan sempit pada tahun 2023. Kami adalah sekelompok mahasiswa yang muak dengan sistem akademik yang berantakan.
          </p>
          <div className="flex justify-center gap-12">
            <div className="text-center">
              <p className="text-5xl font-black text-blue-600">12k+</p>
              <p className="text-xs font-black uppercase tracking-widest text-slate-400 mt-2">Active Users</p>
            </div>
            <div className="text-center">
              <p className="text-5xl font-black text-blue-600">48</p>
              <p className="text-xs font-black uppercase tracking-widest text-slate-400 mt-2">Univ. Connected</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 px-4 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-20 items-center mb-32">
          <div>
            <h2 className="text-4xl font-black mb-8 leading-tight text-slate-900">
              Bukan Sekadar <br /> Aplikasi To-Do List.
            </h2>
            <div className="space-y-6">
              <p className="text-slate-600 font-medium leading-relaxed">
                Kami melihat manajemen waktu bukan sebagai masalah kedisiplinan, tapi masalah infrastruktur. Mahasiswa tidak malas, mereka hanya tidak punya alat yang tepat untuk melihat gambaran besar beban kerja mereka.
              </p>
              <ul className="space-y-4">
                {['Membangun habit produktif', 'Mengurangi kecemasan deadline', 'Memperbaiki kualitas hidup mahasiswa'].map((p) => (
                  <li key={p} className="flex items-center gap-3 font-bold text-slate-800">
                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div> {p}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-6">
            <div className="bg-slate-900 h-64 rounded-[40px] flex flex-col justify-end p-8 text-white">
              <Target className="text-blue-500 mb-4" size={32} />
              <p className="font-black text-xl leading-tight">
                Visioner & <br /> Fokus Hasil.
              </p>
            </div>
            <div className="bg-blue-600 h-64 rounded-[40px] flex flex-col justify-end p-8 text-white translate-y-8">
              <Heart className="text-pink-300 mb-4" size={32} />
              <p className="font-black text-xl leading-tight">
                Dibuat Dengan <br /> Empati.
              </p>
            </div>
          </div>
        </div>

        <h2 className="text-4xl md:text-5xl font-black text-center mb-20 italic underline decoration-blue-600/20 underline-offset-8">Wajah di Balik Layar</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {team.map((member, i) => (
            <div key={i} className="text-center group">
              <div className="w-full aspect-square bg-slate-100 rounded-[48px] mb-6 overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/80 to-indigo-600/80 flex items-center justify-center text-white text-6xl font-black opacity-0 group-hover:opacity-100 transition-all cursor-default select-none">
                  {member.name.charAt(0)}
                </div>
                <div className="w-full h-full flex items-center justify-center text-slate-300 text-6xl font-black select-none">{member.name.charAt(0)}</div>
              </div>
              <h4 className="text-xl font-black text-slate-900">{member.name}</h4>
              <p className="text-blue-600 font-bold text-sm uppercase tracking-widest mt-1">{member.role}</p>
              <p className="text-slate-400 text-xs font-bold mt-2">{member.univ}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

const RoadmapPage = () => (
  <div className="py-20 px-4 max-w-5xl mx-auto animate-in fade-in">
    <div className="text-center mb-16">
      <div className="inline-flex p-4 bg-amber-100 text-amber-600 rounded-3xl mb-6">
        <Map size={32} />
      </div>
      <h1 className="text-5xl font-black text-slate-900 mb-4">Peta Jalan Produk</h1>
      <p className="text-slate-500 text-xl font-medium">Transparansi adalah kunci. Inilah apa yang sedang kami bangun untuk Anda.</p>
    </div>
    <div className="space-y-12 relative">
      <div className="absolute left-8 top-0 bottom-0 w-1 bg-slate-100 hidden md:block"></div>
      {[
        { q: 'Q1 2026', title: 'Ekosistem Kolaborasi', status: 'Done', items: ['Fitur Group Tasks', 'Shared Workspace', 'Integrasi Slack'] },
        { q: 'Q2 2026', title: 'Mobile Experience & Offline', status: 'In Progress', items: ['Aplikasi iOS & Android Native', 'Sinkronisasi Offline', 'Widget Home Screen'] },
        { q: 'Q3 2026', title: 'AI Academic Assistant', status: 'Planning', items: ['Prediksi Nilai Akhir', 'Rekomendasi Waktu Belajar', 'Smart Summarizer Materi'] },
        { q: 'Q4 2026', title: 'Global Expansion', status: 'Planning', items: ['Dukungan 10+ Bahasa', 'Integrasi Sistem Universitas Global', 'Marketplace Template'] },
      ].map((period, i) => (
        <div key={i} className="relative md:pl-24">
          <div className="absolute left-[29px] top-1 w-5 h-5 bg-blue-600 rounded-full border-4 border-white shadow-lg hidden md:block"></div>
          <div className="bg-white border-2 border-slate-100 p-8 rounded-[40px] hover:border-blue-200 transition-all shadow-sm">
            <div className="flex justify-between items-start mb-4">
              <span className="text-blue-600 font-black uppercase tracking-widest text-sm">{period.q}</span>
              <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase ${period.status === 'Done' ? 'bg-green-100 text-green-600' : 'bg-blue-100 text-blue-600'}`}>{period.status}</span>
            </div>
            <h3 className="text-2xl font-black text-slate-900 mb-4">{period.title}</h3>
            <ul className="grid md:grid-cols-2 gap-3">
              {period.items.map((item, idx) => (
                <li key={idx} className="flex items-center gap-2 text-slate-600 font-bold text-sm">
                  <CheckCircle size={16} className="text-blue-500" /> {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const APIDocsPage = () => (
  <div className="py-20 px-4 max-w-7xl mx-auto flex flex-col lg:flex-row gap-12 animate-in fade-in">
    <div className="lg:w-1/4 space-y-2">
      <h3 className="font-black text-xs uppercase tracking-widest text-slate-400 mb-6 pl-4">Dokumentasi API v1.0</h3>
      {['Pengenalan', 'Autentikasi', 'Endpoints Tugas', 'Endpoints Jadwal', 'Webhooks', 'Error Codes'].map((nav) => (
        <button key={nav} className="w-full text-left px-6 py-4 rounded-2xl font-bold text-slate-600 hover:bg-slate-50 hover:text-blue-600 transition-all active:translate-x-1">
          {nav}
        </button>
      ))}
    </div>
    <div className="lg:w-3/4">
      <div className="bg-slate-900 rounded-[48px] p-10 md:p-14 text-white overflow-hidden relative mb-12 shadow-2xl">
        <Terminal className="absolute top-10 right-10 text-white/10" size={180} />
        <div className="relative z-10">
          <h1 className="text-4xl md:text-5xl font-black mb-6 leading-tight">
            Integrasikan KampusFlow <br /> ke Aplikasi Anda.
          </h1>
          <p className="text-slate-400 text-lg mb-10 max-w-xl font-medium">Gunakan API REST kami untuk mengambil data tugas, jadwal, dan progres akademik secara programatik.</p>
          <div className="bg-black/50 backdrop-blur-md rounded-3xl p-8 font-mono text-sm border border-white/10 shadow-inner">
            <div className="flex gap-2 mb-6">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <div className="w-3 h-3 bg-amber-500 rounded-full"></div>
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            </div>
            <div className="space-y-1">
              <p>
                <span className="text-blue-400">GET</span> <span className="text-white">https://api.kampusflow.com/v1/tasks</span>
              </p>
              <p className="text-slate-500 mt-4 italic">// Response 200 OK</p>
              <p className="text-green-400">{`{`}</p>
              <p className="pl-6 text-green-400">{`"status": "success",`}</p>
              <p className="pl-6 text-green-400">{`"data": [`}</p>
              <p className="pl-12 text-green-400">{`{ "id": "task_99", "title": "UAS Fisika" }`}</p>
              <p className="pl-6 text-green-400">{`]`}</p>
              <p className="text-green-400">{`}`}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const HelpCenterPage = () => (
  <div className="py-20 px-4 max-w-7xl mx-auto animate-in fade-in">
    <div className="text-center mb-16">
      <h1 className="text-5xl font-black mb-6 text-slate-900 leading-tight">
        Bagaimana kami bisa <br /> membantu Anda?
      </h1>
      <div className="max-w-2xl mx-auto relative group">
        <input
          type="text"
          placeholder="Cari jawaban: Sinkronisasi Google Calendar..."
          className="w-full px-8 py-7 rounded-[40px] bg-slate-50 border-2 border-slate-100 outline-none focus:border-blue-500 font-bold pr-20 transition-all shadow-sm focus:shadow-xl"
        />
        <button className="absolute right-5 top-5 bottom-5 bg-blue-600 text-white px-7 rounded-3xl hover:bg-blue-700 transition-colors">
          <Search size={22} />
        </button>
      </div>
    </div>

    <div className="grid md:grid-cols-3 gap-8 mb-24">
      {[
        { icon: <Rocket />, title: 'Memulai', count: '12 Artikel', desc: 'Langkah pertama setting dashboard KampusFlow Anda.' },
        { icon: <ShieldCheck />, title: 'Keamanan Akun', count: '8 Artikel', desc: 'Cara melindungi data akademik dan reset kata sandi.' },
        { icon: <Calendar />, title: 'Manajemen Tugas', count: '15 Artikel', desc: 'Tutorial penggunaan fitur tugas dan deadline.' },
      ].map((cat, i) => (
        <div key={i} className="p-10 bg-white border-2 border-slate-100 rounded-[48px] hover:shadow-2xl hover:-translate-y-2 transition-all cursor-pointer group">
          <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-3xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">{cat.icon}</div>
          <h3 className="text-2xl font-black mb-2 text-slate-900">{cat.title}</h3>
          <p className="text-slate-400 text-sm font-black mb-4 uppercase tracking-widest">{cat.count}</p>
          <p className="text-slate-500 text-base font-medium leading-relaxed">{cat.desc}</p>
        </div>
      ))}
    </div>

    <div className="bg-slate-900 rounded-[64px] p-12 md:p-20 text-center text-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/20 blur-[100px] rounded-full"></div>
      <h2 className="text-3xl md:text-4xl font-black mb-6 text-amber-400">Masih bingung?</h2>
      <p className="text-slate-400 text-lg mb-10 max-w-xl mx-auto font-medium">Tim support kami tersedia 24/7 khusus untuk mahasiswa. Kami biasanya membalas dalam kurang dari 30 menit melalui WhatsApp atau Email.</p>
      <button className="bg-white text-slate-900 px-12 py-6 rounded-[32px] font-black text-xl hover:bg-blue-50 transition-all flex items-center justify-center gap-4 mx-auto shadow-2xl">
        <MessageSquare size={24} /> Mulai Chat Langsung
      </button>
    </div>
  </div>
);

const SecurityPage = () => (
  <div className="py-24 px-4 max-w-4xl mx-auto animate-in fade-in">
    <div className="inline-flex p-6 bg-green-100 text-green-600 rounded-[32px] mb-10">
      <ShieldCheck size={56} />
    </div>
    <h1 className="text-5xl md:text-6xl font-black mb-10 text-slate-900 leading-tight">
      Standar Keamanan <br /> Kelas Dunia.
    </h1>
    <p className="text-xl md:text-2xl text-slate-600 mb-20 leading-relaxed font-medium italic border-l-8 border-green-500 pl-8">
      "Data Anda adalah milik Anda. Kami hanyalah penjaga yang memastikan data tersebut tetap aman, privat, dan tersedia kapan saja Anda membutuhkannya."
    </p>

    <div className="space-y-20">
      <section>
        <h3 className="text-2xl font-black mb-6 flex items-center gap-4 text-slate-900">
          <Lock className="text-blue-600" size={32} /> Enkripsi Data
        </h3>
        <p className="text-slate-500 text-lg font-medium leading-relaxed mb-8">
          Semua data yang dikirimkan ke server kami menggunakan enkripsi SSL/TLS 256-bit. Data yang disimpan di database (At Rest) juga dienkripsi menggunakan standar militer AES-256.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {['SSL Certified', 'AES-256', 'SOC2 Compliant', 'GDPR Ready'].map((badge) => (
            <div key={badge} className="px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-[11px] font-black uppercase text-slate-400 text-center tracking-widest">
              {badge}
            </div>
          ))}
        </div>
      </section>

      <section className="bg-slate-900 p-12 md:p-16 rounded-[64px] text-white">
        <div className="flex flex-col md:flex-row gap-12 items-center">
          <div className="flex-grow">
            <h3 className="text-3xl font-black mb-6 flex items-center gap-4">
              <Database className="text-blue-500" size={36} /> Redundansi Data
            </h3>
            <p className="text-slate-400 text-lg font-medium leading-relaxed">
              Kami menjalankan database yang direplikasi di 3 region berbeda (Singapore, Jakarta, US) untuk memastikan redundansi data. Jika satu server gagal, sistem otomatis beralih dalam 2 detik.
            </p>
          </div>
          <div className="w-32 h-32 bg-blue-600/20 rounded-full flex items-center justify-center border-4 border-blue-600/30">
            <Check size={64} className="text-blue-500" />
          </div>
        </div>
      </section>
    </div>
  </div>
);

const CareersPage = () => (
  <div className="py-24 px-4 max-w-7xl mx-auto animate-in fade-in">
    <div className="text-center mb-24">
      <h1 className="text-6xl md:text-7xl font-black text-slate-900 mb-8 leading-tight">
        Mari Membangun Masa <br /> Depan Pendidikan.
      </h1>
      <p className="text-slate-500 text-xl md:text-2xl max-w-3xl mx-auto font-medium leading-relaxed">
        Kami adalah tim kecil dengan misi besar. Kami bekerja secara remote, fleksibel, dan sangat peduli pada hasil serta kesejahteraan setiap anggota tim.
      </p>
    </div>

    <div className="grid md:grid-cols-3 gap-8 mb-32">
      {[
        { icon: <Heart className="text-red-500" />, title: 'Kesehatan Mental', desc: 'Asuransi kesehatan menyeluruh dan budget konsultasi psikologi tak terbatas.' },
        { icon: <Globe className="text-blue-500" />, title: 'Remote First', desc: 'Kerja dari mana saja. Kami sediakan budget untuk set-up home office impian Anda.' },
        { icon: <Award className="text-amber-500" />, title: 'Laba Saham', desc: 'Setiap karyawan memiliki hak opsi kepemilikan saham perusahaan (ESOP).' },
      ].map((v, i) => (
        <div key={i} className="p-10 rounded-[48px] bg-slate-50 border border-slate-100 text-center hover:bg-white hover:shadow-xl transition-all group">
          <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-sm group-hover:scale-110 transition-transform">{v.icon}</div>
          <h4 className="font-black text-2xl mb-4 text-slate-900">{v.title}</h4>
          <p className="text-slate-500 text-base font-bold leading-relaxed">{v.desc}</p>
        </div>
      ))}
    </div>

    <div className="flex justify-between items-end mb-12">
      <div>
        <h2 className="text-4xl font-black text-slate-900">Lowongan Terbuka</h2>
        <p className="text-slate-400 font-bold mt-2">Bantu kami membantu ribuan mahasiswa.</p>
      </div>
    </div>

    <div className="space-y-6">
      {[
        { role: 'Senior Frontend Engineer', dept: 'Engineering', type: 'Full-time', loc: 'Remote' },
        { role: 'Product Designer (UI/UX)', dept: 'Product', type: 'Full-time', loc: 'Remote' },
        { role: 'Academic Community Manager', dept: 'Marketing', type: 'Part-time', loc: 'Jakarta/Remote' },
      ].map((job, i) => (
        <div key={i} className="flex flex-col md:flex-row justify-between items-center p-10 bg-white border-2 border-slate-100 rounded-[40px] hover:border-blue-500 hover:shadow-2xl transition-all cursor-pointer group">
          <div className="mb-4 md:mb-0">
            <h3 className="text-2xl font-black text-slate-900 group-hover:text-blue-600 transition-colors">{job.role}</h3>
            <div className="flex gap-4 mt-2">
              <span className="text-slate-400 font-black text-xs uppercase tracking-widest">{job.dept}</span>
              <span className="text-blue-600 font-black text-xs uppercase tracking-widest">{job.type}</span>
            </div>
          </div>
          <div className="flex items-center gap-8">
            <span className="text-slate-400 font-black flex items-center gap-3 text-sm italic">
              <Globe size={18} /> {job.loc}
            </span>
            <button className="bg-slate-900 text-white px-8 py-4 rounded-2xl font-black text-sm group-hover:bg-blue-600 shadow-lg active:scale-95 transition-all">Lamar Sekarang</button>
          </div>
        </div>
      ))}
    </div>
  </div>
);

// --- APLIKASI UTAMA ---

export default function App() {
  const [activePage, setActivePage] = useState('home');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [authModal, setAuthModal] = useState({ show: false, type: 'login' });
  const [user, setUser] = useState(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activePage]);

  const handleLoginSuccess = () => {
    setUser({ name: 'David Stanley', email: 'david@univ.ac.id' });
    setIsLoggedIn(true);
    setAuthModal({ show: false, type: 'login' });
    setActivePage('dashboard');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUser(null);
    setActivePage('home');
  };

  const renderPage = () => {
    if (isLoggedIn && activePage === 'dashboard') return <Dashboard user={user} />;

    switch (activePage) {
      case 'home':
        return <LandingPage onStart={() => setAuthModal({ show: true, type: 'register' })} />;
      case 'features':
        return <FeaturesPage />;
      case 'pricing':
        return <PricingPage />;
      case 'about':
        return <AboutPage />;
      case 'roadmap':
        return <RoadmapPage />;
      case 'api-docs':
        return <APIDocsPage />;
      case 'careers':
        return <CareersPage />;
      case 'help-center':
        return <HelpCenterPage />;
      case 'security':
        return <SecurityPage />;
      case 'media-kit':
        return <div className="py-32 text-center text-4xl font-black">Media Kit Content</div>;
      default:
        return <LandingPage onStart={() => setAuthModal({ show: true, type: 'register' })} />;
    }
  };

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 flex flex-col selection:bg-blue-100 selection:text-blue-900">
      <nav className="bg-white/80 backdrop-blur-xl sticky top-0 z-50 border-b border-slate-100 h-20 flex items-center transition-all">
        <div className="max-w-7xl mx-auto px-4 w-full flex justify-between items-center">
          <div className="flex items-center gap-3 cursor-pointer group" onClick={() => setActivePage('home')}>
            <div className="bg-blue-600 p-2 rounded-2xl text-white group-hover:rotate-12 transition-transform shadow-lg shadow-blue-200">
              <BookOpen size={24} />
            </div>
            <span className="text-2xl font-black text-slate-900 tracking-tighter">
              Kampus<span className="text-blue-600">Flow</span>
            </span>
          </div>

          <div className="hidden md:flex items-center space-x-10">
            {isLoggedIn ? (
              <>
                <button onClick={() => setActivePage('dashboard')} className={`text-sm font-black uppercase tracking-widest ${activePage === 'dashboard' ? 'text-blue-600' : 'text-slate-400 hover:text-slate-600'}`}>
                  Dashboard
                </button>
                <button onClick={() => setActivePage('roadmap')} className={`text-sm font-black uppercase tracking-widest ${activePage === 'roadmap' ? 'text-blue-600' : 'text-slate-400 hover:text-slate-600'}`}>
                  Roadmap
                </button>
                <div className="h-6 w-px bg-slate-200"></div>
                <div className="flex items-center gap-3 bg-slate-50 px-4 py-2 rounded-2xl border border-slate-100">
                  <div className="w-8 h-8 bg-blue-600 rounded-lg text-white flex items-center justify-center font-black text-xs uppercase">DS</div>
                  <button onClick={handleLogout} className="text-slate-500 hover:text-red-500 transition-colors">
                    <LogOut size={18} />
                  </button>
                </div>
              </>
            ) : (
              <>
                {['features', 'roadmap', 'about', 'pricing'].map((p) => (
                  <button key={p} onClick={() => setActivePage(p)} className={`text-xs font-black uppercase tracking-widest ${activePage === p ? 'text-blue-600' : 'text-slate-400 hover:text-slate-900'}`}>
                    {p}
                  </button>
                ))}
                <button
                  onClick={() => setAuthModal({ show: true, type: 'login' })}
                  className="bg-slate-900 text-white px-8 py-3 rounded-2xl text-sm font-black shadow-xl shadow-slate-200 hover:bg-blue-600 hover:shadow-blue-200 transition-all active:scale-95"
                >
                  Masuk
                </button>
              </>
            )}
          </div>
        </div>
      </nav>

      <main className="flex-grow">{renderPage()}</main>

      <footer className="bg-slate-900 text-white pt-32 pb-12 px-6 overflow-hidden relative">
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 via-purple-600 to-amber-600"></div>
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-16 mb-24 border-b border-white/5 pb-24">
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center gap-3 mb-8">
                <div className="bg-blue-600 p-2 rounded-xl text-white shadow-lg">
                  <BookOpen size={24} />
                </div>
                <span className="text-2xl font-black">KampusFlow</span>
              </div>
              <p className="text-slate-400 text-lg font-medium leading-relaxed mb-10">Platform produktivitas akademik #1 untuk mahasiswa modern Indonesia.</p>
              <div className="flex gap-5">
                {[
                  { icon: <Instagram size={22} />, link: 'https://instagram.com' },
                  { icon: <Twitter size={22} />, link: 'https://twitter.com' },
                  { icon: <Facebook size={22} />, link: 'https://facebook.com' },
                  { icon: <Linkedin size={22} />, link: 'https://linkedin.com' },
                ].map((social, i) => (
                  <a
                    key={i}
                    href={social.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center hover:bg-blue-600 hover:shadow-lg hover:shadow-blue-500/20 transition-all hover:-translate-y-1 text-white"
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>

            <div>
              <h5 className="font-black text-[11px] uppercase tracking-[0.3em] text-blue-500 mb-10">Ekosistem</h5>
              <ul className="space-y-5 text-base text-slate-400 font-bold">
                <li className="hover:text-blue-400 cursor-pointer transition-colors" onClick={() => setActivePage('features')}>
                  Fitur Unggulan
                </li>
                <li className="hover:text-blue-400 cursor-pointer transition-colors" onClick={() => setActivePage('roadmap')}>
                  Roadmap
                </li>
                <li className="hover:text-blue-400 cursor-pointer transition-colors" onClick={() => setActivePage('api-docs')}>
                  API & Dev Hub
                </li>
                <li className="hover:text-blue-400 cursor-pointer transition-colors" onClick={() => setActivePage('pricing')}>
                  Pricing Tier
                </li>
              </ul>
            </div>

            <div>
              <h5 className="font-black text-[11px] uppercase tracking-[0.3em] text-blue-500 mb-10">Perusahaan</h5>
              <ul className="space-y-5 text-base text-slate-400 font-bold">
                <li className="hover:text-blue-400 cursor-pointer transition-colors" onClick={() => setActivePage('about')}>
                  Misi Kami
                </li>
                <li className="hover:text-blue-400 cursor-pointer transition-colors" onClick={() => setActivePage('careers')}>
                  Karir & Budaya
                </li>
                <li className="hover:text-blue-400 cursor-pointer transition-colors" onClick={() => setActivePage('media-kit')}>
                  Brand Assets
                </li>
              </ul>
            </div>

            <div>
              <h5 className="font-black text-[11px] uppercase tracking-[0.3em] text-blue-500 mb-10">Support</h5>
              <ul className="space-y-5 text-base text-slate-400 font-bold">
                <li className="hover:text-blue-400 cursor-pointer transition-colors" onClick={() => setActivePage('help-center')}>
                  Pusat Bantuan
                </li>
                <li className="hover:text-blue-400 cursor-pointer transition-colors" onClick={() => setActivePage('security')}>
                  Keamanan & Privasi
                </li>
                <li className="hover:text-blue-400 cursor-pointer transition-colors">Status Sistem</li>
              </ul>
            </div>
          </div>
          <div className="flex flex-col md:flex-row justify-between items-center text-slate-500 text-xs font-black gap-8">
            <p>&copy; 2026 KampusFlow Enterprise. by David Stanley</p>
            <div className="flex gap-8 uppercase tracking-widest">
              <span className="hover:text-white cursor-pointer transition-colors">Syarat & Ketentuan</span>
              <span className="hover:text-white cursor-pointer transition-colors">Kebijakan Cookie</span>
            </div>
          </div>
        </div>
      </footer>

      {authModal.show && <AuthModal type={authModal.type} setType={(t) => setAuthModal({ ...authModal, type: t })} onClose={() => setAuthModal({ show: false, type: 'login' })} onLoginSuccess={handleLoginSuccess} />}
    </div>
  );
}
