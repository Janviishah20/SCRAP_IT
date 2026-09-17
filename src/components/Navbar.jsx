import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Recycle, 
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
  Sparkles
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

  return (
    <>
      {/* Toast Notification Header */}
      {notification && (
        <div className={`fixed top-4 right-4 z-50 flex items-center gap-2.5 px-4 py-3 rounded-xl border text-xs font-semibold shadow-md ${
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

      {/* Multi-tone Accent Line */}
      <div className="h-1 w-full bg-gradient-to-r from-emerald-600 via-teal-500 to-emerald-700"></div>

      {/* Solid Clean Header */}
      <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-emerald-100/80 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            
            {/* Logo */}
            <div 
              onClick={() => setCurrentView('landing')}
              className="flex items-center gap-3 cursor-pointer select-none"
            >
              <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-600 to-teal-700 text-white shadow-sm shadow-emerald-700/25">
                <Recycle className="w-5 h-5" />
              </div>
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
            <nav className="hidden md:flex items-center gap-2 text-xs font-semibold text-slate-600">
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
                  <span>My Portal Dashboard</span>
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
            {/* Right Header Actions */}
            <div className="flex items-center gap-2 sm:gap-2.5">
              
              {/* Scrap Rates button - tablet & desktop only to preserve mobile breathing room */}
              <button
                onClick={() => setIsRateModalOpen(true)}
                className="hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-xl border border-emerald-200/80 bg-emerald-50/60 hover:bg-emerald-100/70 text-emerald-900 text-xs font-semibold transition shadow-2xs"
              >
                <Scale className="w-4 h-4 text-emerald-700" />
                <span>Check Rates</span>
              </button>

              {/* Reset state simulation tool */}
              <button
                onClick={resetDemoData}
                title="Reset simulation data to default"
                className="p-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-500 hover:text-slate-800 text-xs transition hidden lg:block"
                aria-label="Reset simulation data"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>

              {isAuthenticated ? (
                /* Authenticated User Menu Dropdown */
                <div className="relative">
                  <button
                    onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                    className="flex items-center gap-2 p-1.5 sm:px-3 sm:py-2 rounded-xl bg-slate-100 hover:bg-slate-200/80 border border-slate-200 transition text-xs"
                  >
                    <div className="w-7 h-7 rounded-lg bg-emerald-700 text-white font-bold flex items-center justify-center text-xs">
                      {currentUser?.name ? currentUser.name[0] : 'U'}
                    </div>
                    <div className="text-left hidden md:block">
                      <span className="font-bold text-slate-900 block leading-tight">
                        {currentUser?.name || 'Account'}
                      </span>
                      <span className="text-[10px] text-emerald-800 uppercase font-semibold">
                        {currentRole} Portal
                      </span>
                    </div>
                    <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
                  </button>

                  {profileDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-60 bg-white rounded-xl border border-slate-200 shadow-lg py-2 z-50 text-xs">
                      <div className="px-4 py-2 border-b border-slate-100">
                        <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">
                          Active Workspace
                        </span>
                        <span className="font-bold text-slate-900 block truncate">
                          {currentUser?.name || currentUser?.businessName}
                        </span>
                        <span className="text-[11px] text-emerald-800 capitalize font-medium">
                          {currentRole} Portal Active
                        </span>
                      </div>

                      <div className="py-1">
                        <button
                          onClick={() => {
                            setProfileDropdownOpen(false);
                            openAuth(currentRole);
                          }}
                          className="w-full text-left px-4 py-2 text-slate-700 hover:bg-slate-50 flex items-center gap-2 font-medium"
                        >
                          <LogIn className="w-3.5 h-3.5 text-emerald-700" />
                          <span>Switch Portal / Choose View</span>
                        </button>
                      </div>

                      <div className="pt-1 border-t border-slate-100">
                        <button
                          onClick={() => {
                            setProfileDropdownOpen(false);
                            logout();
                          }}
                          className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 flex items-center gap-2 font-semibold"
                        >
                          <LogOut className="w-3.5 h-3.5" />
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

                <button
                  onClick={() => { openAuth(currentRole || 'citizen'); setMobileMenuOpen(false); }}
                  className="w-full text-left py-2.5 px-3 rounded-lg text-slate-700 hover:bg-slate-50 flex items-center justify-between font-bold transition"
                >
                  <span>Switch Portal / Choose View</span>
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
