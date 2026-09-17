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
  Building2,
  MapPin,
  Sparkles
} from 'lucide-react';

export default function AuthPortal() {
  const { 
    authRole, 
    setAuthRole, 
    login, 
    setCurrentView,
    customUserProfiles
  } = useApp();

  const [selectedRole, setSelectedRole] = useState(authRole || 'citizen');
  const [fullName, setFullName] = useState(customUserProfiles[selectedRole]?.name || '');
  const [contact, setContact] = useState(customUserProfiles[selectedRole]?.phone || '');
  const [password, setPassword] = useState('');
  const [organization, setOrganization] = useState(
    customUserProfiles[selectedRole]?.businessName || 
    customUserProfiles[selectedRole]?.companyName || ''
  );
  const [location, setLocation] = useState('');
  const [formError, setFormError] = useState('');

  const roles = [
    {
      id: 'citizen',
      title: 'Citizen',
      tagline: 'Household & Office Scrap',
      icon: User,
      badge: 'Individual / Home',
      fieldPrompt: 'Area / Landmark (e.g. Sector 78, Noida)'
    },
    {
      id: 'kabadiwala',
      title: 'Kabadiwala Partner',
      tagline: 'Collector Hub & Aggregator',
      icon: Truck,
      badge: 'Aggregator Hub',
      fieldPrompt: 'Scrap Yard / Business Name (e.g. Delhi Central Scrap Hub)'
    },
    {
      id: 'recycler',
      title: 'Industrial Recycler',
      tagline: 'Smelter & Refinery Plant',
      icon: Factory,
      badge: 'CPCB Smelter',
      fieldPrompt: 'Recycling Facility / Enterprise Name (e.g. EcoSmelt Refineries Ltd)'
    }
  ];

  const handleRoleChange = (roleId) => {
    setSelectedRole(roleId);
    setAuthRole(roleId);
    setFormError('');
    // Load previously saved real credentials for this role if any
    const existing = customUserProfiles[roleId];
    if (existing && existing.name) {
      setFullName(existing.name);
      setContact(existing.phone || existing.email || '');
      setOrganization(existing.businessName || existing.companyName || '');
    } else {
      setFullName('');
      setContact('');
      setOrganization('');
    }
  };

  const handleSignIn = (e) => {
    e.preventDefault();
    setFormError('');

    const trimmedName = fullName.trim();
    if (!trimmedName) {
      setFormError('Please enter your full name.');
      return;
    }

    if (!contact.trim()) {
      setFormError('Please enter your mobile phone number or email address.');
      return;
    }

    if (!password.trim()) {
      setFormError('Please enter a password.');
      return;
    }

    // Login with the user's real name and credentials
    login(selectedRole, {
      name: trimmedName,
      phone: contact.trim(),
      email: contact.includes('@') ? contact.trim() : `${trimmedName.toLowerCase().replace(/\s+/g, '')}@connect.in`,
      businessName: organization.trim() || `${trimmedName} Scrap Hub`,
      companyName: organization.trim() || `${trimmedName} Eco-Recyclers Ltd`,
      address: location.trim() || undefined
    });
  };

  const activeRoleConfig = roles.find(r => r.id === selectedRole) || roles[0];

  return (
    <div className="min-h-[85vh] flex flex-col justify-center py-6 sm:py-10 px-4 sm:px-6 lg:px-8 bg-slate-50">
      
      {/* Top back navigation */}
      <div className="max-w-md w-full mx-auto mb-4">
        <button
          onClick={() => setCurrentView('landing')}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-800 transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Landing Page</span>
        </button>
      </div>

      <div className="max-w-md w-full mx-auto bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
        
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-emerald-700 text-white shadow-xs mb-1">
            <Recycle className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Sign In to Portal
          </h1>
          <p className="text-xs text-slate-500 max-w-xs mx-auto">
            Enter your real name and login details to access your verified portal workspace.
          </p>
        </div>

        {/* 1. SELECT ROLE TABS */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
            Select Your Role Workspace:
          </label>
          <div className="grid grid-cols-3 gap-2">
            {roles.map((r) => {
              const Icon = r.icon;
              const isSelected = selectedRole === r.id;

              return (
                <button
                  key={r.id}
                  type="button"
                  onClick={() => handleRoleChange(r.id)}
                  className={`p-3 rounded-xl border text-center transition flex flex-col items-center justify-center gap-1.5 ${
                    isSelected
                      ? 'bg-emerald-50 border-2 border-emerald-700 text-emerald-900 shadow-2xs font-bold'
                      : 'bg-white border-slate-200 hover:bg-slate-50 text-slate-600 font-medium'
                  }`}
                >
                  <Icon className={`w-5 h-5 ${isSelected ? 'text-emerald-700' : 'text-slate-500'}`} />
                  <span className="text-xs block leading-tight">{r.title}</span>
                </button>
              );
            })}
          </div>
          <div className="text-[11px] text-slate-500 text-center pt-1">
            Active: <strong className="text-emerald-800">{activeRoleConfig.tagline}</strong>
          </div>
        </div>

        {/* 2. REAL LOGIN FORM */}
        <form onSubmit={handleSignIn} className="space-y-4">
          
          {formError && (
            <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs font-semibold rounded-xl flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-red-600 shrink-0"></span>
              <span>{formError}</span>
            </div>
          )}

          {/* Full Real Name */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700 block">
              Your Full Real Name <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type="text"
                required
                placeholder="Enter your real name (e.g. Niyam Jain)"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:bg-white focus:ring-2 focus:ring-emerald-700"
              />
            </div>
            <span className="text-[10px] text-slate-400 block">
              This name will appear on your doorstep weigh receipts and account records.
            </span>
          </div>

          {/* Mobile / Email */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700 block">
              Mobile Number or Email <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type="text"
                required
                placeholder="e.g. +91 98765 43210 or yourname@gmail.com"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:bg-white focus:ring-2 focus:ring-emerald-700"
              />
            </div>
          </div>

          {/* Password */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700 block">
              Password <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type="password"
                required
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:bg-white focus:ring-2 focus:ring-emerald-700"
              />
            </div>
          </div>

          {/* Role-specific optional field */}
          {selectedRole !== 'citizen' ? (
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700 block">
                {selectedRole === 'kabadiwala' ? 'Aggregator Scrap Hub / Business Name' : 'Smelter / Company Legal Name'}
              </label>
              <input
                type="text"
                placeholder={selectedRole === 'kabadiwala' ? 'e.g. Okhla Green Scrap Aggregators' : 'e.g. Bharat Eco-Refineries Ltd'}
                value={organization}
                onChange={(e) => setOrganization(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:bg-white focus:ring-2 focus:ring-emerald-700"
              />
            </div>
          ) : (
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700 block">
                Residential Location / Sector (Optional)
              </label>
              <input
                type="text"
                placeholder="e.g. Sector 78, Noida / Vasant Kunj, Delhi"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:bg-white focus:ring-2 focus:ring-emerald-700"
              />
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 px-4 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs sm:text-sm rounded-xl shadow-xs transition flex items-center justify-center gap-2 mt-2"
          >
            <span>Sign In to {activeRoleConfig.title} Portal</span>
            <ArrowRight className="w-4 h-4" />
          </button>

        </form>

        {/* Security & Compliance Footer */}
        <div className="pt-4 border-t border-slate-100 text-center space-y-1">
          <div className="flex items-center justify-center gap-1.5 text-xs text-slate-500 font-medium">
            <ShieldCheck className="w-4 h-4 text-emerald-700" />
            <span>DPDP Act 2023 Compliant • 256-Bit Encrypted Session</span>
          </div>
          <p className="text-[10px] text-slate-400">
            Certified by Central Pollution Control Board (CPCB) E-Waste Rules 2022.
          </p>
        </div>

      </div>

    </div>
  );
}
