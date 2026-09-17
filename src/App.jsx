import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import PrivacyNotice from './components/PrivacyNotice';

// Views
import LandingHero from './views/LandingHero';
import AuthPortal from './views/AuthPortal';
import CitizenDashboard from './views/CitizenPortal/CitizenDashboard';
import KabadiwalaDashboard from './views/KabadiwalaPortal/KabadiwalaDashboard';
import RecyclerDashboard from './views/RecyclerPortal/RecyclerDashboard';
import NotFoundView from './views/NotFoundView';
import EstimatorView from './views/EstimatorView';

// Modals
import RateCardModal from './components/RateCardModal';
import CreatePickupModal from './views/CitizenPortal/CreatePickupModal';
import CreateLotModal from './views/KabadiwalaPortal/CreateLotModal';
import DoorstepWeighingModal from './views/KabadiwalaPortal/DoorstepWeighingModal';
import EPRCertificateModal from './components/EPRCertificateModal';
import PrivacyAndTermsModal from './components/PrivacyAndTermsModal';

function MainLayout() {
  const { 
    currentView, 
    currentRole, 
    isLegalModalOpen, 
    legalModalTab, 
    closeLegalModal, 
    openLegalModal 
  } = useApp();

  return (
    <div className="min-h-screen flex flex-col bg-slate-50/90 text-slate-900 selection:bg-emerald-700 selection:text-white overflow-x-hidden relative">
      {/* Subtle Ambient Color Glows behind content */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden z-0 opacity-70">
        <div className="absolute -top-32 right-[-10%] w-[600px] h-[600px] rounded-full bg-gradient-to-br from-emerald-200/30 to-teal-200/20 blur-3xl"></div>
        <div className="absolute top-[35%] left-[-15%] w-[650px] h-[650px] rounded-full bg-gradient-to-tr from-teal-100/30 via-emerald-100/20 to-sky-100/20 blur-3xl"></div>
        <div className="absolute -bottom-40 right-[15%] w-[500px] h-[500px] rounded-full bg-gradient-to-tl from-emerald-200/25 to-amber-100/20 blur-3xl"></div>
      </div>

      {/* Universal Clean Navbar */}
      <div className="relative z-10">
        <Navbar />
      </div>

      {/* Main View Router */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 relative z-10">
        {currentView === 'auth' ? (
          <AuthPortal />
        ) : currentView === 'landing' ? (
          <LandingHero />
        ) : currentView === 'estimator' ? (
          <EstimatorView />
        ) : currentView === 'not_found' ? (
          <NotFoundView />
        ) : (
          /* Portal Dashboard View */
          <div className="space-y-6">
            {currentRole === 'citizen' && <CitizenDashboard />}
            {currentRole === 'kabadiwala' && <KabadiwalaDashboard />}
            {currentRole === 'recycler' && <RecyclerDashboard />}
          </div>
        )}
      </main>

      {/* Shared Modals */}
      <RateCardModal />
      <CreatePickupModal />
      <CreateLotModal />
      <DoorstepWeighingModal />
      <EPRCertificateModal />
      <PrivacyAndTermsModal 
        isOpen={isLegalModalOpen} 
        onClose={closeLegalModal} 
        initialTab={legalModalTab} 
      />

      {/* Privacy Notice */}
      <PrivacyNotice onOpenLegal={openLegalModal} />

      {/* Clean Footer */}
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <MainLayout />
    </AppProvider>
  );
}
