import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import BrandLogo from './BrandLogo';
import { 
  Scale, 
  User, 
  Truck, 
  Factory, 
  LogOut, 
  ChevronDown, 
  Menu, 
  X, 
  RotateCcw,
  CheckCircle2,
  Info,
  ShieldCheck,
  FileText,
  LogIn,
  Sparkles,
  LayoutDashboard,
  Check
} from 'lucide-react';

export default function Navbar() {
  const { 
    currentRole, 
    switchRole, 
    setIsRateModalOpen, 
    isAuthenticated,
    openAuth,
    logout,
    currentUser,
    currentView,
    setCurrentView,
    resetDemoData,
    notification,
    openLegalModal
  } = useApp();

  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close profile dropdown when clicking outside or pressing Escape
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setProfileDropdownOpen(false);
      }
    }
    function handleKeyDown(event) {
      if (event.key === 'Escape') {
        setProfileDropdownOpen(false);
      }
    }
    if (profileDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
        document.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [profileDropdownOpen]);

  return (
    <>
      {/* Toast Notification Header */}
      {notification && (
        <div className={`fixed top-4 right-4 z-[300] flex items-center gap-2.5 px-4 py-3 rounded-xl border text-xs font-semibold shadow-md ${
          notification.type === 'info' 
            ? 'bg-slate-900 border-slate-800 text-white' 
            : 'bg-emerald-800 border-emerald-700 text-white'
        }`}>
          {notification.type === 'info' ? (
            <Info className="w-4 h-4 text-slate-300 shrink-0" />
          ) : (
            <CheckCircle2 className="w-4 h-4 text-emerald-300 shrink-0" />
          )}
          <span>{notification.message}</span>
        </div>
      )}

      {/* Solid Clean Header with Top Stacking Context */}
      <header className="relative z-[100] w-full bg-white/95 backdrop-blur-md border-b border-emerald-100/80 shadow-xs">
        {/* Multi-tone Accent Line */}
        <div className="h-1 w-full bg-gradient-to-r from-emerald-600 via-teal-500 to-emerald-700"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            
            {/* Logo */}
            <div 
              onClick={() => setCurrentView('landing')}
              className="flex items-center gap-3 cursor-pointer select-none shrink-0"
            >
              <BrandLogo size="md" />
              <div>
                <span className="text-base sm:text-lg font-extrabold tracking-tight text-slate-950">
                  SCRAP<span className="text-emerald-700">IT</span>
                </span>
                <p className="text-[11px] text-slate-500 hidden sm:block">
                  Verified Doorstep Scrap and Circular E-Waste Platform
                </p>
              </div>
            </div>

            {/* Middle Nav: Clean Universal Navigation Links */}
            <nav className="hidden lg:flex items-center gap-2 text-xs font-semibold text-slate-600">
              <button 
                onClick={() => setCurrentView('landing')} 
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  currentView === 'landing' 
                    ? 'text-emerald-900 bg-emerald-50 border border-emerald-200/80 font-bold shadow-2xs' 
                    : 'hover:text-emerald-800 hover:bg-slate-100/70'
                }`}
              >
                Overview
              </button>
              <button 
                onClick={() => setIsRateModalOpen(true)} 
                className="px-3 py-1.5 rounded-lg hover:text-emerald-800 hover:bg-slate-100/70 transition-all"
              >
                Live Scrap Rates
              </button>
              <button 
                onClick={() => setCurrentView('estimator')} 
                className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
                  currentView === 'estimator' 
                    ? 'text-emerald-900 bg-emerald-50 border border-emerald-200/80 font-bold shadow-2xs' 
                    : 'hover:text-emerald-800 hover:bg-slate-100/70'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5 text-emerald-700" />
                <span>AI Estimator</span>
              </button>
              {isAuthenticated && (
                <button 
                  onClick={() => setCurrentView('portal')} 
                  className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
                    currentView === 'portal' 
                      ? 'text-emerald-900 bg-emerald-50 border border-emerald-200/80 font-bold shadow-2xs' 
                      : 'hover:text-emerald-800 hover:bg-slate-100/70'
                  }`}
                >
                  <span>My Dashboard</span>
                </button>
              )}
              <button 
                onClick={() => openLegalModal('terms')} 
                className="px-3 py-1.5 rounded-lg hover:text-emerald-800 hover:bg-slate-100/70 transition-all"
              >
                CPCB Norms
              </button>
            </nav>

            {/* Right Header Actions */}
            <div className="flex items-center gap-2 sm:gap-2.5">
              
              {/* Quick Portal Switcher Bar - 1-click view switching right in header (Visible on MD and up) */}
              {isAuthenticated && (
                <div className="hidden md:flex items-center bg-slate-100/90 p-1 rounded-xl border border-slate-200/90 text-xs font-semibold shadow-2xs">
                  <span className="text-[10px] uppercase font-bold text-slate-400 px-2 select-none tracking-wider hidden xl:inline">
                    Portal:
                  </span>
                  <button
                    type="button"
                    onClick={() => switchRole('citizen')}
                    title="Switch to Citizen Portal (Household scrap & pickups)"
                    className={`px-2.5 py-1.5 rounded-lg flex items-center gap-1.5 transition-all ${
                      currentRole === 'citizen' && currentView === 'portal'
                        ? 'bg-emerald-600 text-white font-bold shadow-xs'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
                    }`}
                  >
                    <User className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Citizen</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => switchRole('kabadiwala')}
                    title="Switch to Kabadiwala Aggregator Hub"
                    className={`px-2.5 py-1.5 rounded-lg flex items-center gap-1.5 transition-all ${
                      currentRole === 'kabadiwala' && currentView === 'portal'
                        ? 'bg-amber-600 text-white font-bold shadow-xs'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
                    }`}
                  >
                    <Truck className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Kabadiwala</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => switchRole('recycler')}
                    title="Switch to Industrial Recycler Portal"
                    className={`px-2.5 py-1.5 rounded-lg flex items-center gap-1.5 transition-all ${
                      currentRole === 'recycler' && currentView === 'portal'
                        ? 'bg-indigo-600 text-white font-bold shadow-xs'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
                    }`}
                  >
                    <Factory className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Recycler</span>
                  </button>
                </div>
              )}

              {/* Scrap Rates button - tablet & desktop only to preserve mobile breathing room */}
              <button
                type="button"
                onClick={() => setIsRateModalOpen(true)}
                className="hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-xl border border-emerald-200/80 bg-emerald-50/60 hover:bg-emerald-100/70 text-emerald-900 text-xs font-semibold transition shadow-2xs"
              >
                <Scale className="w-4 h-4 text-emerald-700" />
                <span>Check Rates</span>
              </button>

              {/* Reset state simulation tool */}
              <button
                type="button"
                onClick={resetDemoData}
                title="Reset simulation data to default"
                className="p-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-500 hover:text-slate-800 text-xs transition hidden lg:block"
                aria-label="Reset simulation data"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>

              {isAuthenticated ? (
                /* Authenticated User Menu Dropdown */
                <div className="relative" ref={dropdownRef}>
                  <button
                    type="button"
                    onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                    className="flex items-center gap-2 p-1.5 sm:px-3 sm:py-2 rounded-xl bg-slate-100 hover:bg-slate-200/80 border border-slate-200 transition text-xs select-none shadow-2xs"
                    aria-expanded={profileDropdownOpen}
                    aria-haspopup="true"
                  >
                    <div className={`w-7 h-7 rounded-lg text-white font-bold flex items-center justify-center text-xs shadow-2xs ${
                      currentRole === 'citizen' ? 'bg-emerald-700' :
                      currentRole === 'kabadiwala' ? 'bg-amber-600' :
                      'bg-indigo-700'
                    }`}>
                      {currentUser?.name ? currentUser.name[0].toUpperCase() : 'U'}
                    </div>
                    <div className="text-left hidden md:block">
                      <span className="font-bold text-slate-900 block leading-tight truncate max-w-[120px]">
                        {currentUser?.name || 'Account'}
                      </span>
                      <span className={`text-[10px] uppercase font-bold ${
                        currentRole === 'citizen' ? 'text-emerald-800' :
                        currentRole === 'kabadiwala' ? 'text-amber-800' :
                        'text-indigo-800'
                      }`}>
                        {currentRole === 'citizen' ? 'Citizen' : currentRole === 'kabadiwala' ? 'Kabadiwala' : 'Recycler'} Portal
                      </span>
                    </div>
                    <ChevronDown className={`w-3.5 h-3.5 text-slate-500 transition-transform duration-200 ${profileDropdownOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {profileDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl border border-slate-200 shadow-2xl py-3 z-[150] text-xs divide-y divide-slate-100 animate-fadeIn pointer-events-auto">
                      {/* Active Workspace Header */}
                      <div className="px-4 pb-2.5">
                        <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">
                          Active Workspace
                        </span>
                        <div className="flex items-center justify-between mt-0.5">
                          <span className="font-extrabold text-slate-900 truncate text-sm">
                            {currentUser?.name || currentUser?.businessName}
                          </span>
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full capitalize border ${
                            currentRole === 'citizen' ? 'bg-emerald-100 text-emerald-800 border-emerald-200' :
                            currentRole === 'kabadiwala' ? 'bg-amber-100 text-amber-800 border-amber-200' :
                            'bg-indigo-100 text-indigo-800 border-indigo-200'
                          }`}>
                            {currentRole === 'citizen' ? 'Citizen' : currentRole === 'kabadiwala' ? 'Kabadiwala Hub' : 'Industrial Recycler'}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-500 truncate mt-0.5">
                          {currentUser?.email || currentUser?.phone || `${currentRole} workspace`}
                        </p>
                      </div>

                      {/* Quick Portal Workspace Switcher Section */}
                      <div className="p-2 space-y-1">
                        <span className="text-[10px] uppercase font-bold text-slate-400 px-2 py-1 block tracking-wider">
                          Switch Portal View:
                        </span>

                        {/* Citizen Option */}
                        <button
                          onClick={() => {
                            switchRole('citizen');
                            setProfileDropdownOpen(false);
                          }}
                          className={`w-full text-left px-3 py-2 rounded-xl flex items-center justify-between transition-all ${
                            currentRole === 'citizen' && currentView === 'portal'
                              ? 'bg-emerald-50 text-emerald-950 font-bold border border-emerald-200 shadow-2xs'
                              : 'text-slate-700 hover:bg-slate-50 hover:text-slate-900'
                          }`}
                        >
                          <div className="flex items-center gap-2.5">
                            <div className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
                              <User className="w-3.5 h-3.5" />
                            </div>
                            <div>
                              <span className="block leading-tight font-bold">Citizen Portal</span>
                              <span className="text-[10px] text-slate-500 font-normal">Household scrap & pickups</span>
                            </div>
                          </div>
                          {currentRole === 'citizen' && currentView === 'portal' && (
                            <span className="text-[10px] bg-emerald-600 text-white px-2 py-0.5 rounded-full font-bold">
                              Active
                            </span>
                          )}
                        </button>

                        {/* Kabadiwala Option */}
                        <button
                          onClick={() => {
                            switchRole('kabadiwala');
                            setProfileDropdownOpen(false);
                          }}
                          className={`w-full text-left px-3 py-2 rounded-xl flex items-center justify-between transition-all ${
                            currentRole === 'kabadiwala' && currentView === 'portal'
                              ? 'bg-amber-50 text-amber-950 font-bold border border-amber-200 shadow-2xs'
                              : 'text-slate-700 hover:bg-slate-50 hover:text-slate-900'
                          }`}
                        >
                          <div className="flex items-center gap-2.5">
                            <div className="w-7 h-7 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
                              <Truck className="w-3.5 h-3.5" />
                            </div>
                            <div>
                              <span className="block leading-tight font-bold">Kabadiwala Hub</span>
                              <span className="text-[10px] text-slate-500 font-normal">Aggregator hub & weighing</span>
                            </div>
                          </div>
                          {currentRole === 'kabadiwala' && currentView === 'portal' && (
                            <span className="text-[10px] bg-amber-600 text-white px-2 py-0.5 rounded-full font-bold">
                              Active
                            </span>
                          )}
                        </button>

                        {/* Recycler Option */}
                        <button
                          onClick={() => {
                            switchRole('recycler');
                            setProfileDropdownOpen(false);
                          }}
                          className={`w-full text-left px-3 py-2 rounded-xl flex items-center justify-between transition-all ${
                            currentRole === 'recycler' && currentView === 'portal'
                              ? 'bg-indigo-50 text-indigo-950 font-bold border border-indigo-200 shadow-2xs'
                              : 'text-slate-700 hover:bg-slate-50 hover:text-slate-900'
                          }`}
                        >
                          <div className="flex items-center gap-2.5">
                            <div className="w-7 h-7 rounded-lg bg-indigo-100 text-indigo-800 flex items-center justify-center shrink-0">
                              <Factory className="w-3.5 h-3.5" />
                            </div>
                            <div>
                              <span className="block leading-tight font-bold">Industrial Recycler</span>
                              <span className="text-[10px] text-slate-500 font-normal">CPCB smelter & batch lots</span>
                            </div>
                          </div>
                          {currentRole === 'recycler' && currentView === 'portal' && (
                            <span className="text-[10px] bg-indigo-600 text-white px-2 py-0.5 rounded-full font-bold">
                              Active
                            </span>
                          )}
                        </button>
                      </div>

                      {/* Quick Navigation Links */}
                      <div className="py-1 px-2 space-y-0.5">
                        <button
                          onClick={() => {
                            setCurrentView('portal');
                            setProfileDropdownOpen(false);
                          }}
                          className="w-full text-left px-2.5 py-1.5 text-slate-700 hover:bg-emerald-50 hover:text-emerald-900 rounded-lg flex items-center gap-2 font-medium transition-colors"
                        >
                          <LayoutDashboard className="w-3.5 h-3.5 text-emerald-700" />
                          <span>My Portal Dashboard</span>
                        </button>
                        <button
                          onClick={() => {
                            setCurrentView('estimator');
                            setProfileDropdownOpen(false);
                          }}
                          className="w-full text-left px-2.5 py-1.5 text-slate-700 hover:bg-emerald-50 hover:text-emerald-900 rounded-lg flex items-center gap-2 font-medium transition-colors"
                        >
                          <Sparkles className="w-3.5 h-3.5 text-emerald-700" />
                          <span>AI E-Waste Estimator</span>
                        </button>
                        <button
                          onClick={() => {
                            openAuth(currentRole);
                            setProfileDropdownOpen(false);
                          }}
                          className="w-full text-left px-2.5 py-1.5 text-slate-700 hover:bg-emerald-50 hover:text-emerald-900 rounded-lg flex items-center gap-2 font-medium transition-colors"
                        >
                          <LogIn className="w-3.5 h-3.5 text-emerald-700" />
                          <span>Switch Account / Full Login</span>
                        </button>
                      </div>

                      {/* Sign Out */}
                      <div className="pt-1.5 px-2">
                        <button
                          onClick={() => {
                            logout();
                            setProfileDropdownOpen(false);
                          }}
                          className="w-full text-left px-2.5 py-2 text-red-600 hover:bg-red-50 rounded-lg flex items-center gap-2 font-semibold transition-colors"
                        >
                          <LogOut className="w-3.5 h-3.5 text-red-500" />
                          <span>Sign Out</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                /* Unauthenticated Sign In Button */
                <button
                  onClick={() => openAuth('citizen')}
                  className="flex items-center gap-1.5 px-3 py-2 sm:px-4 sm:py-2 text-xs font-bold bg-gradient-to-r from-emerald-600 via-emerald-700 to-teal-700 hover:from-emerald-700 hover:to-teal-800 text-white rounded-xl shadow-sm shadow-emerald-700/25 transition active:scale-[0.98] whitespace-nowrap shrink-0"
                >
                  <LogIn className="w-3.5 h-3.5 shrink-0" />
                  <span className="hidden sm:inline">Login / Choose View</span>
                  <span className="sm:hidden">Login</span>
                </button>
              )}

              {/* Mobile menu trigger - synchronized with md:hidden */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 md:hidden rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200 transition shrink-0"
                aria-label="Toggle mobile menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>

            </div>

          </div>

          {/* Enhanced Mobile Navigation Drawer */}
          {mobileMenuOpen && (
            <div className="md:hidden py-4 border-t border-slate-200 space-y-3">
              <div className="space-y-1.5 text-xs">
                {/* Prominent AI Estimator in Mobile Drawer */}
                <button
                  onClick={() => { setCurrentView('estimator'); setMobileMenuOpen(false); }}
                  className="w-full text-left py-2.5 px-3 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-950 border border-emerald-200/80 font-bold flex items-center justify-between transition"
                >
                  <span className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-emerald-700" />
                    <span>AI E-Waste Estimator</span>
                  </span>
                  <span className="text-[10px] bg-emerald-200/80 text-emerald-900 px-2 py-0.5 rounded-full font-extrabold">
                    Live Scan
                  </span>
                </button>

                <button
                  onClick={() => { setCurrentView('landing'); setMobileMenuOpen(false); }}
                  className="w-full text-left py-2.5 px-3 rounded-lg text-slate-700 hover:bg-slate-50 transition"
                >
                  Platform Overview
                </button>
                <button
                  onClick={() => { setIsRateModalOpen(true); setMobileMenuOpen(false); }}
                  className="w-full text-left py-2.5 px-3 rounded-lg text-slate-700 hover:bg-slate-50 flex items-center justify-between transition"
                >
                  <span>Daily Rate Index</span>
                  <Scale className="w-3.5 h-3.5 text-emerald-700" />
                </button>

                {isAuthenticated && (
                  <button
                    onClick={() => { setCurrentView('portal'); setMobileMenuOpen(false); }}
                    className="w-full text-left py-2.5 px-3 rounded-lg text-emerald-900 bg-emerald-50/50 hover:bg-emerald-100/70 flex items-center justify-between font-semibold transition"
                  >
                    <span>My {currentRole.charAt(0).toUpperCase() + currentRole.slice(1)} Dashboard</span>
                    <ArrowRight className="w-3.5 h-3.5 text-emerald-700" />
                  </button>
                )}

                {isAuthenticated && (
                  <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200/90 space-y-1.5 my-1">
                    <span className="text-[10px] uppercase font-bold text-slate-500 block tracking-wider">
                      Quick Switch Active Portal:
                    </span>
                    <div className="grid grid-cols-3 gap-1.5">
                      <button
                        onClick={() => { switchRole('citizen'); setMobileMenuOpen(false); }}
                        className={`py-2 px-1 rounded-lg text-center font-bold text-xs flex flex-col items-center gap-1 transition ${
                          currentRole === 'citizen' && currentView === 'portal'
                            ? 'bg-emerald-700 text-white shadow-2xs'
                            : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        <User className="w-3.5 h-3.5" />
                        <span>Citizen</span>
                      </button>
                      <button
                        onClick={() => { switchRole('kabadiwala'); setMobileMenuOpen(false); }}
                        className={`py-2 px-1 rounded-lg text-center font-bold text-xs flex flex-col items-center gap-1 transition ${
                          currentRole === 'kabadiwala' && currentView === 'portal'
                            ? 'bg-amber-700 text-white shadow-2xs'
                            : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        <Truck className="w-3.5 h-3.5" />
                        <span>Kabadiwala</span>
                      </button>
                      <button
                        onClick={() => { switchRole('recycler'); setMobileMenuOpen(false); }}
                        className={`py-2 px-1 rounded-lg text-center font-bold text-xs flex flex-col items-center gap-1 transition ${
                          currentRole === 'recycler' && currentView === 'portal'
                            ? 'bg-indigo-700 text-white shadow-2xs'
                            : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        <Factory className="w-3.5 h-3.5" />
                        <span>Recycler</span>
                      </button>
                    </div>
                  </div>
                )}

                <button
                  onClick={() => { openAuth(currentRole || 'citizen'); setMobileMenuOpen(false); }}
                  className="w-full text-left py-2.5 px-3 rounded-lg text-slate-700 hover:bg-slate-50 flex items-center justify-between font-medium transition"
                >
                  <span>Switch Account / Full Login</span>
                  <LogIn className="w-3.5 h-3.5 text-emerald-700" />
                </button>
                <button
                  onClick={() => { openLegalModal('terms'); setMobileMenuOpen(false); }}
                  className="w-full text-left py-2.5 px-3 rounded-lg text-slate-700 hover:bg-slate-50 flex items-center justify-between transition"
                >
                  <span>Terms of Service</span>
                  <FileText className="w-3.5 h-3.5 text-slate-400" />
                </button>
                <button
                  onClick={() => { openLegalModal('privacy'); setMobileMenuOpen(false); }}
                  className="w-full text-left py-2.5 px-3 rounded-lg text-slate-700 hover:bg-slate-50 flex items-center justify-between transition"
                >
                  <span>Privacy Policy (DPDP Act)</span>
                  <ShieldCheck className="w-3.5 h-3.5 text-slate-400" />
                </button>
              </div>

              <div className="pt-2 border-t border-slate-200">
                {isAuthenticated ? (
                  <div className="flex items-center justify-between pt-1">
                    <span className="text-xs text-slate-600 font-medium">
                      Signed in as <strong className="text-slate-900 capitalize">{currentRole}</strong>
                    </span>
                    <button
                      onClick={() => { logout(); setMobileMenuOpen(false); }}
                      className="text-xs text-red-600 font-bold hover:underline"
                    >
                      Sign Out
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => { openAuth('citizen'); setMobileMenuOpen(false); }}
                    className="w-full py-2.5 text-center text-xs font-bold bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl transition"
                  >
                    Login / Choose View
                  </button>
                )}
              </div>
            </div>
          )}

        </div>
      </header>
    </>
  );
}
