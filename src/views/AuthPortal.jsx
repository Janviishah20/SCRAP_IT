import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Recycle, 
  User, 
  Truck, 
  Factory, 
  Lock, 
  Mail, 
  Phone, 
  ArrowRight, 
  ShieldCheck, 
  ArrowLeft,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Sparkles,
  KeyRound
} from 'lucide-react';

export default function AuthPortal() {
  const { 
    authRole, 
    setAuthRole, 
    login, 
    setCurrentView, 
    allUsers 
  } = useApp();

  const [customCredsOpen, setCustomCredsOpen] = useState(false);
  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const roles = [
    {
      id: 'citizen',
      title: 'Citizen View',
      category: 'Households & Communities',
      icon: User,
      description: 'Schedule doorstep scrap collections with calibrated digital scales, transparent rates, and instant UPI payment.',
      profileName: 'Rahul Sharma',
      location: 'Noida Sector 78',
      features: [
        'Doorstep scrap pickup scheduling',
        'IoT digital scale weight guarantee',
        'Direct UPI & Green Coin rewards'
      ]
    },
    {
      id: 'kabadiwala',
      title: 'Collector Hub',
      category: 'Kabadiwala Partner',
      icon: Truck,
      description: 'Receive nearby pickup requests, record weights via calibrated scale, and aggregate materials into commercial B2B lots.',
      profileName: 'Ramesh Kumar',
      location: 'Okhla Phase 2 Aggregator Hub',
      features: [
        'Local pickup dispatch board',
        'Bluetooth scale synchronization',
        'Wholesale lot bundling for recyclers'
      ]
    },
    {
      id: 'recycler',
      title: 'Recycler Smelter',
      category: 'Authorized Smelting Plant',
      icon: Factory,
      description: 'Procure verified wholesale e-waste lots, inspect metal assay yields, and issue statutory CPCB EPR certificates.',
      profileName: 'Vikramaditya Singhania',
      location: 'Bharat Eco-Recyclers & Smelters',
      features: [
        'B2B scrap lot marketplace',
        'Precious metal recovery tracking',
        'Statutory CPCB EPR credit certificates'
      ]
    }
  ];

  const handleRoleSelect = (roleId) => {
    setAuthRole(roleId);
    if (roleId === 'citizen') {
      setEmailOrPhone(allUsers.citizen.phone);
      setPassword('citizen123');
    } else if (roleId === 'kabadiwala') {
      setEmailOrPhone(allUsers.kabadiwala.phone);
      setPassword('partner123');
    } else if (roleId === 'recycler') {
      setEmailOrPhone(allUsers.recycler.email);
      setPassword('smelter123');
    }
  };

  React.useEffect(() => {
    handleRoleSelect(authRole);
  }, [authRole]);

  const handleDirectEnter = (roleId) => {
    login(roleId);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    login(authRole, name || null);
  };

  const activeRoleData = roles.find(r => r.id === authRole) || roles[0];

  return (
    <div className="min-h-[85vh] flex flex-col justify-center py-6 sm:py-10 px-4 sm:px-6 lg:px-8 bg-slate-50">
      
      {/* Top back navigation */}
      <div className="max-w-4xl w-full mx-auto mb-4">
        <button
          onClick={() => setCurrentView('landing')}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-800 transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Landing Page</span>
        </button>
      </div>

      <div className="max-w-4xl w-full mx-auto space-y-6">
        
        {/* Page Header */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 text-center shadow-xs">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-emerald-700 text-white shadow-xs mb-3">
            <Recycle className="w-6 h-6" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
            Select Portal to Access
          </h1>
          <p className="mt-2 text-xs sm:text-sm text-slate-600 max-w-xl mx-auto leading-relaxed">
            Choose your stakeholder role to open your dedicated workspace. Each portal contains specialized tools for verified doorstep collection and circular e-waste management.
          </p>
        </div>

        {/* 3 Interactive Role Selection Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          {roles.map((role) => {
            const Icon = role.icon;
            const isSelected = authRole === role.id;

            return (
              <div
                key={role.id}
                onClick={() => handleRoleSelect(role.id)}
                className={`cursor-pointer rounded-2xl p-5 sm:p-6 border transition flex flex-col justify-between ${
                  isSelected
                    ? 'bg-white border-2 border-emerald-700 shadow-sm ring-2 ring-emerald-700/10'
                    : 'bg-white border-slate-200 hover:border-slate-300 shadow-xs'
                }`}
              >
                <div className="space-y-4">
                  {/* Top card header */}
                  <div className="flex items-start justify-between gap-3">
                    <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${
                      isSelected ? 'bg-emerald-700 text-white' : 'bg-slate-100 text-slate-700'
                    }`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    {isSelected ? (
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200 px-2.5 py-1 rounded-full">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        Selected
                      </span>
                    ) : (
                      <span className="text-[11px] text-slate-400 font-medium">Click to select</span>
                    )}
                  </div>

                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">
                      {role.category}
                    </span>
                    <h2 className="text-lg font-extrabold text-slate-900">
                      {role.title}
                    </h2>
                    <p className="mt-1.5 text-xs text-slate-600 leading-relaxed">
                      {role.description}
                    </p>
                  </div>

                  {/* Bullet Highlights */}
                  <div className="space-y-1.5 pt-3 border-t border-slate-100">
                    {role.features.map((feat, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-[11px] text-slate-700">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-700 shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>

                  {/* Demo Profile Details */}
                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-[11px]">
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">
                      Verified Account
                    </span>
                    <span className="font-bold text-slate-800 block truncate">
                      {role.profileName}
                    </span>
                    <span className="text-slate-500 text-[10px] block truncate">
                      {role.location}
                    </span>
                  </div>
                </div>

                {/* Direct Action Button */}
                <div className="pt-5 mt-auto">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDirectEnter(role.id);
                    }}
                    className={`w-full py-2.5 px-3 rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 ${
                      isSelected
                        ? 'bg-emerald-700 hover:bg-emerald-800 text-white shadow-xs'
                        : 'bg-slate-100 hover:bg-slate-200 text-slate-800'
                    }`}
                  >
                    <span>Enter {role.title}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected Role Action Panel */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-800">
                Ready to Access
              </span>
              <h3 className="text-lg font-bold text-slate-900">
                {activeRoleData.title} Workspace
              </h3>
              <p className="text-xs text-slate-500">
                Logged in as <span className="font-semibold text-slate-800">{activeRoleData.profileName}</span> ({activeRoleData.location})
              </p>
            </div>

            <button
              onClick={() => handleDirectEnter(authRole)}
              className="w-full sm:w-auto px-6 py-3 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs sm:text-sm rounded-xl shadow-xs transition flex items-center justify-center gap-2"
            >
              <span>Continue to {activeRoleData.title}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Optional: Custom Credentials Drawer */}
          <div>
            <button
              type="button"
              onClick={() => setCustomCredsOpen(!customCredsOpen)}
              className="flex items-center gap-1.5 text-xs font-medium text-slate-500 hover:text-slate-800 transition"
            >
              <KeyRound className="w-3.5 h-3.5 text-emerald-700" />
              <span>Or sign in with custom credentials</span>
              {customCredsOpen ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </button>

            {customCredsOpen && (
              <form onSubmit={handleFormSubmit} className="mt-4 pt-4 border-t border-slate-100 space-y-3 max-w-md">
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">
                    Custom Account Name
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder={`e.g. ${activeRoleData.profileName}`}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 focus:outline-none focus:bg-white focus:ring-1 focus:ring-emerald-700"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">
                    Phone / Email
                  </label>
                  <input
                    type="text"
                    value={emailOrPhone}
                    onChange={e => setEmailOrPhone(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 focus:outline-none focus:bg-white focus:ring-1 focus:ring-emerald-700"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">
                    Password / PIN
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 focus:outline-none focus:bg-white focus:ring-1 focus:ring-emerald-700"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl shadow-xs transition"
                  >
                    Sign In with Custom Details
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Regulatory notice */}
          <div className="flex items-center gap-2 text-[11px] text-slate-500 pt-3 border-t border-slate-100">
            <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0" />
            <span>DPDP Act 2023 compliant. Digital scales verified under Legal Metrology & CPCB E-Waste Rules 2022.</span>
          </div>
        </div>

      </div>
    </div>
  );
}
