import React from 'react';
import {
  ArrowRight,
  ShieldCheck,
  Scale,
  Truck,
  Factory,
  Users,
  Leaf,
  Coins,
  Recycle,
  QrCode,
  MapPin,
  Sparkles,
} from 'lucide-react';
import { useApp } from '../context/AppContext';

const journey = [
  { number: '01', title: 'Household', text: 'Upload scrap photo and schedule doorstep pickup.', icon: Users },
  { number: '02', title: 'Kabadiwala', text: 'Weigh items on calibrated IoT digital scale and settle via UPI.', icon: Truck },
  { number: '03', title: 'Digital Lot', text: 'Bundle e-waste with verified QR batch identifier.', icon: QrCode },
  { number: '04', title: 'Recycler', text: 'Procure verified lots with estimated metal yield data.', icon: Factory },
  { number: '05', title: 'Smelting', text: 'Refine precious metals under CPCB non-toxic protocols.', icon: ShieldCheck },
  { number: '06', title: 'EPR Credit', text: 'Issue official government Extended Producer Responsibility certificate.', icon: Leaf },
];

const features = [
  {
    icon: Scale,
    title: 'Calibrated Digital Scales',
    text: 'Zero scale rigging pledge. Verified itemized weights recorded directly to your digital receipt.',
  },
  {
    icon: Coins,
    title: 'Benchmark Scrap Rates',
    text: 'Daily transparent rate board indexed to Mayapuri and Mandi Gobindgarh wholesale markets.',
  },
  {
    icon: QrCode,
    title: 'QR Lot Traceability',
    text: 'Traceable custody from household doorstep collection to industrial smelter furnaces.',
  },
  {
    icon: Recycle,
    title: 'Circular Economy Loop',
    text: 'Prevent hazardous open-air burning of circuit boards through authorized smelting channels.',
  },
];

export default function LandingHero() {
  const { openAuth, setIsRateModalOpen, isAuthenticated, currentRole, setIsCreatePickupModalOpen, setCurrentView } = useApp();

  const enter = (role) => {
    openAuth(role);
  };

  const handleSchedulePickup = () => {
    if (isAuthenticated && currentRole === 'citizen') {
      setIsCreatePickupModalOpen(true);
    } else {
      openAuth('citizen');
    }
  };

  return (
    <div className="bg-slate-50 space-y-16">
      
      {/* HERO SECTION (No radial blur blobs, solid crisp layout) */}
      <section className="border-b border-slate-200 bg-white rounded-2xl p-6 sm:p-10 lg:p-12 shadow-xs">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-xs font-bold text-emerald-800">
              <ShieldCheck className="h-4 w-4" />
              <span>CPCB Compliant E-Waste Logistics Platform</span>
            </div>

            <h1 className="mt-5 text-4xl font-extrabold leading-tight tracking-tight text-slate-950 sm:text-5xl lg:text-5xl">
              Transparent Doorstep Scrap.
              <span className="block text-emerald-700">Traceable E-Waste Recycling.</span>
            </h1>

            <p className="mt-4 text-sm leading-relaxed text-slate-600 sm:text-base max-w-xl">
              Kabadiwala Connect connects households, informal collectors, and authorized industrial smelters into a unified digital chain of custody with calibrated digital scales and official EPR certificates.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <button
                onClick={handleSchedulePickup}
                className="inline-flex items-center gap-2 rounded-xl bg-emerald-700 px-5 py-3 text-xs sm:text-sm font-bold text-white shadow-xs transition hover:bg-emerald-800"
              >
                <span>Schedule Scrap Pickup</span>
                <ArrowRight className="h-4 w-4" />
              </button>

              <button
                onClick={() => setCurrentView('estimator')}
                className="inline-flex items-center gap-2 rounded-xl border border-emerald-300 bg-emerald-50 px-5 py-3 text-xs sm:text-sm font-bold text-emerald-900 transition hover:bg-emerald-100 shadow-2xs"
              >
                <Sparkles className="h-4 w-4 text-emerald-700" />
                <span>AI E-Waste Estimator</span>
              </button>

              <button
                onClick={() => setIsRateModalOpen(true)}
                className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-5 py-3 text-xs sm:text-sm font-bold text-slate-700 transition hover:bg-slate-50 hover:border-slate-400"
              >
                <Scale className="h-4 w-4 text-emerald-700" />
                <span>View Daily Rate Index</span>
              </button>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs font-semibold text-slate-500">
              <span className="flex items-center gap-1.5 text-slate-700">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-700"></span>
                Calibrated Bluetooth Scale
              </span>
              <span className="flex items-center gap-1.5 text-slate-700">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-700"></span>
                Instant UPI Payout
              </span>
              <span className="flex items-center gap-1.5 text-slate-700">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-700"></span>
                Automated EPR Certification
              </span>
            </div>
          </div>

          {/* Operational Workflow Card Preview (No exaggerated soft radii, crisp border) */}
          <div className="w-full">
            <div className="rounded-2xl border border-slate-200 bg-slate-900 p-3 shadow-sm">
              <div className="rounded-xl bg-white p-5">
                <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Live Chain-of-Custody</span>
                    <h2 className="text-lg font-extrabold text-slate-950">E-Waste Flow Summary</h2>
                  </div>
                  <span className="rounded-md bg-emerald-50 px-2.5 py-1 text-[11px] font-bold text-emerald-800 border border-emerald-200">
                    VERIFIED BATCH
                  </span>
                </div>

                <div className="mt-4 space-y-2.5">
                  {journey.slice(0, 4).map(({ number, title, text, icon: Icon }) => (
                    <div key={title} className="flex items-center gap-3.5 rounded-xl border border-slate-100 bg-slate-50 p-3">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white text-emerald-800 border border-slate-200 shadow-2xs">
                        <Icon className="h-4 w-4" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-[10px] font-bold text-slate-400">{number}</span>
                          <h3 className="text-xs font-bold text-slate-900">{title}</h3>
                        </div>
                        <p className="text-[11px] text-slate-500 truncate">{text}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-4 grid grid-cols-2 gap-2.5 pt-3 border-t border-slate-100 text-xs">
                  <div className="rounded-lg bg-slate-50 p-2.5 border border-slate-200/80">
                    <span className="text-[10px] uppercase font-bold text-slate-500 block">Batch Identity</span>
                    <span className="font-mono font-bold text-slate-900">LOT-EW-204</span>
                  </div>
                  <div className="rounded-lg bg-slate-50 p-2.5 border border-slate-200/80">
                    <span className="text-[10px] uppercase font-bold text-slate-500 block">Downstream Status</span>
                    <span className="font-bold text-emerald-800">Ready for Smelter</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Trust & Metric Strip */}
        <div className="mt-10 pt-6 border-t border-slate-100 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/70">
            <span className="font-mono text-xl font-bold text-slate-900 block">100%</span>
            <span className="text-[11px] text-slate-500 font-medium">Digital Scale Accuracy</span>
          </div>
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/70">
            <span className="font-mono text-xl font-bold text-slate-900 block">50,000+ kg</span>
            <span className="text-[11px] text-slate-500 font-medium">E-Waste Diverted</span>
          </div>
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/70">
            <span className="font-mono text-xl font-bold text-slate-900 block">Rs. 0</span>
            <span className="text-[11px] text-slate-500 font-medium">Hidden Deduction</span>
          </div>
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/70">
            <span className="font-mono text-xl font-bold text-slate-900 block">1,840+</span>
            <span className="text-[11px] text-slate-500 font-medium">CPCB EPR Credits</span>
          </div>
        </div>
      </section>

      {/* STAKEHOLDER WORKSPACES (Restrained cards, no rainbow, no bouncy hover) */}
      <section className="space-y-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 block">Stakeholder Workspaces</span>
          <h2 className="mt-1 text-2xl font-extrabold text-slate-950 sm:text-3xl">Designed for the entire scrap lifecycle.</h2>
          <p className="mt-2 text-sm text-slate-600 max-w-2xl">
            Each actor has dedicated operational tools, while the underlying materials maintain a single verifiable custody record.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <RoleCard
            icon={Users}
            number="01"
            title="Households & Citizens"
            description="Book doorstep pickups, review instant vehicle allocation advice, and receive transparent UPI payment with digital weight slips."
            bullets={['Photo-based scrap request', 'Calibrated digital weighing', 'Instant UPI disbursement']}
            button="Enter Household Portal"
            onClick={() => enter('citizen')}
          />
          <RoleCard
            icon={Truck}
            number="02"
            title="Kabadiwala Partners"
            description="Accept nearby pickup requests, plan vehicle capacity, weigh scrap at doorstep, and bundle sorted materials into commercial B2B lots."
            bullets={['Nearby job dispatch board', 'Doorstep digital scale sync', 'Standardized lot creation']}
            button="Enter Collector Hub"
            onClick={() => enter('kabadiwala')}
          />
          <RoleCard
            icon={Factory}
            number="03"
            title="Authorized Recyclers"
            description="Procure high-yield e-waste batches directly from aggregators, verify laboratory assay yields, and generate statutory CPCB EPR certificates."
            bullets={['B2B wholesale lot exchange', 'Metal yield estimation', 'Statutory CPCB certificates']}
            button="Enter Recycler Exchange"
            onClick={() => enter('recycler')}
          />
        </div>
      </section>

      {/* CORE CAPABILITIES */}
      <section className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-10 shadow-xs space-y-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 block">Standards</span>
          <h2 className="mt-1 text-2xl font-extrabold text-slate-950 sm:text-3xl">Ending informal scrap exploitation.</h2>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {features.map(({ icon: Icon, title, text }) => (
            <div key={title} className="rounded-xl border border-slate-200 bg-slate-50/50 p-5 space-y-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-100 text-emerald-800">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="text-sm font-bold text-slate-950">{title}</h3>
              <p className="text-xs leading-relaxed text-slate-600">{text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 6-STEP TRACEABILITY JOURNEY */}
      <section className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-10 shadow-xs space-y-8">
        <div className="text-center max-w-xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 block">The Operational Flow</span>
          <h2 className="mt-1 text-2xl font-extrabold text-slate-950 sm:text-3xl">From Doorstep to Smelter Refinery</h2>
          <p className="mt-2 text-xs text-slate-500">Every handover is digitally signed and logged to maintain chain-of-custody.</p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-6">
          {journey.map(({ number, title, text, icon: Icon }) => (
            <div key={title} className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-center space-y-2">
              <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-lg bg-white text-emerald-800 border border-slate-200 shadow-2xs">
                <Icon className="h-5 w-5" />
              </div>
              <span className="font-mono text-[10px] font-bold text-emerald-700 block">{number}</span>
              <h3 className="text-xs font-bold text-slate-950">{title}</h3>
              <p className="text-[11px] leading-relaxed text-slate-500">{text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CALL TO ACTION */}
      <section className="rounded-2xl border border-slate-200 bg-slate-900 p-8 sm:p-10 text-white shadow-xs">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div className="max-w-xl space-y-2">
            <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold">
              <MapPin className="h-4 w-4" />
              <span>Full Interactive Simulation Available</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">Experience the Closed-Loop Workflow</h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Create a sample pickup as a household, accept it as an aggregator, weigh on the calibrated digital scale, and see the lot appear in the recycler exchange.
            </p>
          </div>
          <button
            onClick={() => enter('citizen')}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 px-6 py-3.5 text-xs sm:text-sm font-bold text-white transition shrink-0"
          >
            <span>Start Interactive Demo</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </section>

    </div>
  );
}

function RoleCard({ icon: Icon, number, title, description, bullets, button, onClick }) {
  return (
    <div className="flex flex-col rounded-xl border border-slate-200 bg-white p-6 shadow-xs space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200">
          <Icon className="h-5 w-5" />
        </div>
        <span className="font-mono text-xs font-bold text-slate-400">{number}</span>
      </div>

      <div>
        <h3 className="text-base font-bold text-slate-950">{title}</h3>
        <p className="mt-2 text-xs leading-relaxed text-slate-600">{description}</p>
      </div>

      <div className="pt-3 border-t border-slate-100 space-y-1.5 text-xs text-slate-600">
        {bullets.map((bullet) => (
          <div key={bullet} className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-700 shrink-0"></span>
            <span>{bullet}</span>
          </div>
        ))}
      </div>

      <button 
        onClick={onClick} 
        className="mt-auto flex items-center justify-between rounded-lg border border-slate-200 bg-slate-50 px-4 py-2.5 text-xs font-bold text-slate-800 hover:bg-slate-100 transition pt-3"
      >
        <span>{button}</span>
        <ArrowRight className="h-3.5 w-3.5 text-slate-400" />
      </button>
    </div>
  );
}
