import React, { useState } from 'react';
import { CheckCircle2, Zap, ShieldCheck, Globe, Loader2, AlertCircle } from 'lucide-react';
import { loadRazorpay } from '../services/razorpay';

type Interval = 'monthly' | 'halfyearly' | 'yearly';

export default function Subscription() {
  const [interval, setInterval] = useState<Interval>('monthly');
  const [loading, setLoading] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const plans = [
    {
      id: 'professional',
      name: 'Professional',
      description: 'Perfect for individual analysts and small teams.',
      prices: {
        monthly: 9900,
        halfyearly: 55000,
        yearly: 99000,
      },
      features: [
        'Up to 10M Data Rows',
        'ML Trend Analysis',
        'Custom Report Templates',
        'API Access (10k calls)',
        'Email Support',
      ],
      color: 'bg-white',
      textColor: 'text-indigo-900',
      buttonColor: 'bg-indigo-900 text-white hover:bg-indigo-800 shadow-lg shadow-indigo-900/10',
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      description: 'Advanced features for large-scale operations.',
      prices: {
        monthly: 24900,
        halfyearly: 125000,
        yearly: 225000,
      },
      features: [
        'Unlimited Data Ingestion',
        'Real-time Forecasting',
        'Priority Dedicated Analyst',
        'White-label Dashboards',
        'SSO & Advanced Security',
        '24/7 Phone Support',
      ],
      color: 'bg-indigo-900',
      textColor: 'text-white',
      buttonColor: 'bg-emerald-500 text-white hover:bg-emerald-600 shadow-lg shadow-emerald-500/20',
      recommended: true,
    },
  ];

  const handleRazorpaySubscribe = async (planId: string) => {
    setLoading(planId);
    setError(null);

    try {
      const res = await loadRazorpay();
      if (!res) {
        throw new Error('Razorpay SDK failed to load. Are you online?');
      }

      const response = await fetch('/api/razorpay/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ planId, interval }),
      });

      const order = await response.json();

      if (order.error) {
        throw new Error(order.error);
      }

      const options = {
        key: order.key,
        amount: order.amount,
        currency: order.currency,
        name: "TrackWise",
        description: `${planId.toUpperCase()} - ${interval} Subscription`,
        image: "https://www.gstatic.com/images/branding/product/2x/googleg_48dp.png",
        order_id: order.id,
        handler: function (response: any) {
          console.log("Payment Success:", response);
          window.location.href = '/subscription?success=true&payment_id=' + response.razorpay_payment_id;
        },
        prefill: {
          name: "User Name",
          email: "user@example.com",
          contact: "9999999999"
        },
        theme: {
          color: "#161c54"
        }
      };

      const rzp = new (window as any).Razorpay(options);
      rzp.open();
    } catch (err: any) {
      console.error('Razorpay error:', err);
      setError(err.message || 'Something went wrong with Razorpay.');
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="space-y-12 max-w-6xl mx-auto">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-extrabold text-indigo-900 tracking-tight">Subscription Plans</h1>
        <p className="text-slate-500 max-w-2xl mx-auto font-medium">
          Scale your predictive intelligence with our flexible enterprise tiers. Choose the plan that matches your firm's ambition.
        </p>

        {/* Interval Toggle */}
        <div className="flex items-center justify-center mt-8 p-1 bg-slate-100 rounded-2xl w-fit mx-auto">
          {(['monthly', 'halfyearly', 'yearly'] as Interval[]).map((item) => (
            <button
              key={item}
              onClick={() => setInterval(item)}
              className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${
                interval === item 
                  ? 'bg-white text-indigo-900 shadow-sm' 
                  : 'text-slate-500 hover:text-indigo-700'
              }`}
            >
              {item.charAt(0).toUpperCase() + item.slice(1)}
              {item !== 'monthly' && (
                <span className="ml-2 text-[10px] bg-emerald-100 text-emerald-700 px-1.5 py-0.5 rounded-md">
                  SAVE {item === 'halfyearly' ? '15%' : '25%'}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {error && (
        <div className="bg-rose-50 border border-rose-100 p-4 rounded-2xl flex items-center gap-3 text-rose-600 text-sm font-medium animate-in fade-in slide-in-from-top-2">
          <AlertCircle size={18} />
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {plans.map((plan) => (
          <div 
            key={plan.id} 
            className={`${plan.color} ${plan.textColor} p-10 rounded-[2.5rem] border border-slate-100 shadow-sm relative overflow-hidden flex flex-col group hover:shadow-2xl transition-all duration-500`}
          >
            {plan.recommended && (
              <div className="absolute top-0 right-0 bg-emerald-500 text-white px-6 py-1.5 text-[10px] font-black uppercase tracking-widest rounded-bl-2xl">
                Recommended
              </div>
            )}

            <div className="mb-8">
              <h3 className="text-sm font-bold uppercase tracking-widest opacity-60 mb-2">{plan.name}</h3>
              <div className="flex items-baseline gap-1">
                <span className="text-5xl font-black">₹{plan.prices[interval].toLocaleString()}</span>
                <span className="opacity-60 text-sm font-medium">/{interval === 'monthly' ? 'mo' : interval === 'halfyearly' ? '6mo' : 'yr'}</span>
              </div>
              <p className="mt-4 text-sm opacity-80 leading-relaxed font-medium">{plan.description}</p>
            </div>

            <div className="space-y-4 mb-10 flex-grow">
              {plan.features.map((feature, i) => (
                <div key={i} className="flex items-center gap-3 text-sm font-medium">
                  <CheckCircle2 size={18} className={plan.recommended ? 'text-emerald-400' : 'text-emerald-500'} />
                  <span className="opacity-90">{feature}</span>
                </div>
              ))}
            </div>

            <button 
              onClick={() => handleRazorpaySubscribe(plan.id)}
              disabled={loading !== null}
              className={`w-full py-4 rounded-2xl font-bold flex items-center justify-center gap-3 transition-all active:scale-[0.98] ${plan.buttonColor}`}
            >
              {loading === plan.id ? (
                <Loader2 className="animate-spin" size={20} />
              ) : (
                <>
                  <Zap size={20} />
                  Subscribe with Razorpay
                </>
              )}
            </button>
          </div>
        ))}
      </div>

      {/* Trust Badges */}
      <div className="pt-12 border-t border-slate-100 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600">
            <ShieldCheck size={24} />
          </div>
          <div>
            <p className="text-sm font-bold text-indigo-900">Secure Payments</p>
            <p className="text-xs text-slate-500 font-medium">Bank-level SSL encryption</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-600">
            <Zap size={24} />
          </div>
          <div>
            <p className="text-sm font-bold text-indigo-900">Instant Activation</p>
            <p className="text-xs text-slate-500 font-medium">Access features immediately</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600">
            <Globe size={24} />
          </div>
          <div>
            <p className="text-sm font-bold text-indigo-900">Global Coverage</p>
            <p className="text-xs text-slate-500 font-medium">Supported in 135+ countries</p>
          </div>
        </div>
      </div>
    </div>
  );
}
