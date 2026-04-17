import React from 'react';
import { TrendingUp, TrendingDown, Users, DollarSign, Activity, ArrowUpRight, Filter, Download, Calendar } from 'lucide-react';
import { IMAGES } from '../constants';

export default function Dashboard() {
  const stats = [
    { label: 'Total Revenue', value: '$4,281,940', change: '+12.5%', trend: 'up', icon: DollarSign, color: 'bg-emerald-50 text-emerald-600' },
    { label: 'Active Users', value: '84,231', change: '+8.2%', trend: 'up', icon: Users, color: 'bg-blue-50 text-blue-600' },
    { label: 'Conversion Rate', value: '3.42%', change: '-0.4%', trend: 'down', icon: Activity, color: 'bg-amber-50 text-amber-600' },
    { label: 'Avg. Session', value: '4m 32s', change: '+1.2%', trend: 'up', icon: TrendingUp, color: 'bg-indigo-50 text-indigo-600' },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-indigo-900 tracking-tight">Executive Overview</h1>
          <p className="text-slate-500 font-medium">Real-time performance metrics and predictive forecasting.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-50 transition-colors">
            <Calendar size={16} />
            Last 30 Days
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-50 transition-colors">
            <Filter size={16} />
            Filters
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-indigo-900 text-white rounded-xl text-sm font-bold hover:bg-indigo-800 transition-colors shadow-lg shadow-indigo-900/10">
            <Download size={16} />
            Export
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <div className={`p-3 rounded-xl ${stat.color}`}>
                <stat.icon size={24} />
              </div>
              <div className={`flex items-center gap-1 text-xs font-bold ${stat.trend === 'up' ? 'text-emerald-600' : 'text-rose-600'}`}>
                {stat.change}
                {stat.trend === 'up' ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
              </div>
            </div>
            <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-1">{stat.label}</p>
            <p className="text-2xl font-black text-indigo-900">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Main Visual Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Large Chart Area */}
        <div className="lg:col-span-2 bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden flex flex-col">
          <div className="p-6 border-b border-slate-50 flex justify-between items-center">
            <h3 className="font-bold text-indigo-900">Revenue Growth Forecast</h3>
            <div className="flex gap-2">
              <button className="px-3 py-1 text-xs font-bold bg-indigo-50 text-indigo-700 rounded-lg">Monthly</button>
              <button className="px-3 py-1 text-xs font-bold text-slate-400 hover:bg-slate-50 rounded-lg">Weekly</button>
            </div>
          </div>
          <div className="flex-1 p-6 flex items-center justify-center bg-slate-50/50">
            <img 
              src={IMAGES.HERO_DASHBOARD} 
              alt="Revenue Chart" 
              className="w-full h-auto rounded-xl shadow-sm border border-slate-200/50"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>

        {/* Side Panel */}
        <div className="space-y-6">
          {/* Top Products */}
          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
            <h3 className="font-bold text-indigo-900 mb-6">Top Performing Segments</h3>
            <div className="space-y-6">
              {[
                { name: 'Enterprise SaaS', value: '$1.2M', progress: 85, color: 'bg-indigo-600' },
                { name: 'Consumer Mobile', value: '$840k', progress: 62, color: 'bg-emerald-500' },
                { name: 'API Services', value: '$420k', progress: 45, color: 'bg-amber-500' },
              ].map((item, i) => (
                <div key={i} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="font-bold text-indigo-900">{item.name}</span>
                    <span className="font-medium text-slate-500">{item.value}</span>
                  </div>
                  <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                    <div className={`h-full ${item.color} rounded-full`} style={{ width: `${item.progress}%` }} />
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full mt-8 py-3 text-sm font-bold text-indigo-700 bg-indigo-50 rounded-xl hover:bg-indigo-100 transition-colors flex items-center justify-center gap-2">
              View All Segments <ArrowUpRight size={16} />
            </button>
          </div>

          {/* Recent Activity */}
          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
            <h3 className="font-bold text-indigo-900 mb-6">Predictive Alerts</h3>
            <div className="space-y-4">
              {[
                { title: 'Anomaly Detected', desc: 'Unusual traffic spike in EMEA region.', time: '2h ago', type: 'warning' },
                { title: 'Forecast Update', desc: 'Q4 projections increased by 4.2%.', time: '5h ago', type: 'info' },
              ].map((alert, i) => (
                <div key={i} className="flex gap-4 p-3 rounded-2xl hover:bg-slate-50 transition-colors cursor-pointer group">
                  <div className={`w-2 h-2 mt-2 rounded-full shrink-0 ${alert.type === 'warning' ? 'bg-amber-500' : 'bg-indigo-500'}`} />
                  <div>
                    <p className="text-sm font-bold text-indigo-900 group-hover:text-indigo-700">{alert.title}</p>
                    <p className="text-xs text-slate-500 font-medium">{alert.desc}</p>
                    <p className="text-[10px] text-slate-400 mt-1 font-bold uppercase tracking-wider">{alert.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
