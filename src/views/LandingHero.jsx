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
    bg: 'bg-gradient-to-br from-white to-blue-50/70 border-blue-200/80',
    iconBg: 'bg-blue-100 text-blue-800 border border-blue-200',
  },
  {
    icon: Coins,
    title: 'Benchmark Scrap Rates',
    text: 'Daily transparent rate board indexed to Mayapuri and Mandi Gobindgarh wholesale markets.',
    bg: 'bg-gradient-to-br from-white to-amber-50/70 border-amber-200/80',
    iconBg: 'bg-amber-100 text-amber-800 border border-amber-200',
  },
  {
    icon: QrCode,
    title: 'QR Lot Verification',
    text: 'Digitally verified custody from household doorstep collection to industrial smelter furnaces.',
    bg: 'bg-gradient-to-br from-white to-emerald-50/70 border-emerald-200/80',
    iconBg: 'bg-emerald-100 text-emerald-800 border border-emerald-200',
  },
  {
    icon: Recycle,
    title: 'Circular Economy Loop',
    text: 'Prevent hazardous open-air burning of circuit boards through authorized smelting channels.',
    bg: 'bg-gradient-to-br from-white to-teal-50/70 border-teal-200/80',
    iconBg: 'bg-teal-100 text-teal-800 border border-teal-200',
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
    <div className="space-y-16">
      
      {/* HERO SECTION */}
      <section className="relative overflow-hidden rounded-3xl border border-emerald-200/80 bg-gradient-to-br from-white via-emerald-50/40 to-teal-50/30 p-6 sm:p-10 lg:p-12 shadow-sm">
        {/* Subtle decorative glow */}
        <div className="pointer-events-none absolute -top-24 -right-24 h-96 w-96 rounded-full bg-emerald-400/10 blur-3xl"></div>
        <div className="pointer-events-none absolute -bottom-24 -left-24 h-96 w-96 rounded-full bg-teal-400/10 blur-3xl"></div>

        <div className="relative z-10 grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-300 bg-emerald-100/90 px-3.5 py-1.5 text-xs font-bold text-emerald-900 shadow-2xs">
              <ShieldCheck className="h-4 w-4 text-emerald-700" />
              <span>CPCB Compliant E-Waste Logistics Platform</span>
            </div>

            <h1 className="mt-5 text-4xl font-extrabold leading-tight tracking-tight text-slate-950 sm:text-5xl lg:text-5xl">
              Transparent Doorstep Scrap.
              <span className="block bg-gradient-to-r from-emerald-700 via-emerald-600 to-teal-700 bg-clip-text text-transparent">E-Waste Recycling.</span>
            </h1>

            <p className="mt-4 text-sm leading-relaxed text-slate-600 sm:text-base max-w-xl">
              SCRAPIT connects households, informal collectors, and authorized industrial smelters into a unified digital chain of custody with calibrated digital scales and official EPR certificates.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <button
                onClick={handleSchedulePickup}
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-emerald-600 via-emerald-700 to-emerald-800 px-5 py-3 text-xs sm:text-sm font-bold text-white shadow-md shadow-emerald-700/25 transition hover:brightness-110 active:scale-[0.98]"
              >
                <span>Schedule Scrap Pickup</span>
                <ArrowRight className="h-4 w-4" />
              </button>

              <button
                onClick={() => setCurrentView('estimator')}
                className="inline-flex items-center gap-2 rounded-xl border border-emerald-300 bg-gradient-to-r from-emerald-50 to-teal-50 px-5 py-3 text-xs sm:text-sm font-bold text-emerald-950 transition hover:bg-emerald-100 shadow-2xs active:scale-[0.98]"
              >
                <Sparkles className="h-4 w-4 text-emerald-700" />
                <span>AI E-Waste Estimator</span>
              </button>

              <button
                onClick={() => setIsRateModalOpen(true)}
                className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white/90 px-5 py-3 text-xs sm:text-sm font-bold text-slate-700 transition hover:bg-slate-50 hover:border-slate-400 shadow-2xs"
              >
                <Scale className="h-4 w-4 text-emerald-700" />
                <span>View Daily Rate Index</span>
              </button>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-2.5 sm:gap-3 text-xs font-semibold text-slate-700">
              <span className="inline-flex items-center gap-1.5 rounded-lg border border-emerald-200/80 bg-white/90 px-3 py-1.5 shadow-2xs">
                <span className="h-2 w-2 rounded-full bg-emerald-600"></span>
                Calibrated Bluetooth Scale
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-lg border border-teal-200/80 bg-white/90 px-3 py-1.5 shadow-2xs">
                <span className="h-2 w-2 rounded-full bg-teal-600"></span>
                Instant UPI Payout
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-lg border border-sky-200/80 bg-white/90 px-3 py-1.5 shadow-2xs">
                <span className="h-2 w-2 rounded-full bg-sky-600"></span>
                Automated EPR Certification
              </span>
            </div>
          </div>

          {/* Operational Workflow Card Preview */}
          <div className="w-full">
            <div className="rounded-2xl border border-slate-800 bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 p-3 shadow-xl">
              <div className="rounded-xl bg-white p-5 border border-slate-100 shadow-2xs">
                <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Live Chain-of-Custody</span>
                    <h2 className="text-lg font-extrabold text-slate-950">E-Waste Flow Summary</h2>
                  </div>
                  <span className="rounded-md bg-emerald-50 px-2.5 py-1 text-[11px] font-bold text-emerald-800 border border-emerald-200 shadow-2xs">
                    VERIFIED BATCH
                  </span>
                </div>

                <div className="mt-4 space-y-2.5">
                  {journey.slice(0, 4).map(({ number, title, text, icon: Icon }, idx) => {
                    const stepIconStyles = [
                      'bg-emerald-50 text-emerald-700 border-emerald-200',
                      'bg-amber-50 text-amber-700 border-amber-200',
                      'bg-teal-50 text-teal-700 border-teal-200',
                      'bg-indigo-50 text-indigo-700 border-indigo-200',
                    ];
                    return (
                      <div key={title} className="flex items-center gap-3.5 rounded-xl border border-slate-100 bg-slate-50/70 p-3 hover:bg-slate-50 transition">
                        <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border ${stepIconStyles[idx]} shadow-2xs`}>
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
                    );
                  })}
                </div>

                <div className="mt-4 grid grid-cols-2 gap-2.5 pt-3 border-t border-slate-100 text-xs">
                  <div className="rounded-lg bg-emerald-50/60 p-2.5 border border-emerald-200/80">
                    <span className="text-[10px] uppercase font-bold text-emerald-800 block">Chain of Custody</span>
                    <span className="font-bold text-emerald-950">Digital QR Verification</span>
                  </div>
                  <div className="rounded-lg bg-teal-50/60 p-2.5 border border-teal-200/80">
                    <span className="text-[10px] uppercase font-bold text-teal-800 block">Regulatory Standard</span>
                    <span className="font-bold text-teal-950">CPCB Certified Flow</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Platform Standards & Capabilities (4 Distinct Colored Stat Cards) */}
        <div className="relative z-10 mt-10 pt-6 border-t border-emerald-100/90 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
          <div className="p-4 bg-gradient-to-br from-white to-sky-50/80 rounded-xl border border-sky-200/80 shadow-2xs">
            <span className="text-sm font-extrabold text-sky-950 block">±0.05 kg Precision</span>
            <span className="text-[11px] text-sky-700 font-medium">Calibrated Digital Scale</span>
          </div>
          <div className="p-4 bg-gradient-to-br from-white to-emerald-50/90 rounded-xl border border-emerald-200/80 shadow-2xs">
            <span className="text-sm font-extrabold text-emerald-950 block">Direct UPI</span>
            <span className="text-[11px] text-emerald-700 font-medium">Instant Spot Disbursement</span>
          </div>
          <div className="p-4 bg-gradient-to-br from-white to-amber-50/80 rounded-xl border border-amber-200/80 shadow-2xs">
            <span className="text-sm font-extrabold text-amber-950 block">Transparent Rates</span>
            <span className="text-[11px] text-amber-700 font-medium">Zero Hidden Deductions</span>
          </div>
          <div className="p-4 bg-gradient-to-br from-white to-teal-50/80 rounded-xl border border-teal-200/80 shadow-2xs">
            <span className="text-sm font-extrabold text-teal-950 block">CPCB Authorized</span>
            <span className="text-[11px] text-teal-700 font-medium">E-Waste Rules 2022</span>
          </div>
        </div>
      </section>

      {/* STAKEHOLDER WORKSPACES */}
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
            color="emerald"
          />
          <RoleCard
            icon={Truck}
            number="02"
            title="Kabadiwala Partners"
            description="Accept nearby pickup requests, plan vehicle capacity, weigh scrap at doorstep, and bundle sorted materials into commercial B2B lots."
            bullets={['Nearby job dispatch board', 'Doorstep digital scale sync', 'Standardized lot creation']}
            button="Enter Collector Hub"
            onClick={() => enter('kabadiwala')}
            color="amber"
          />
          <RoleCard
            icon={Factory}
            number="03"
            title="Authorized Recyclers"
            description="Procure high-yield e-waste batches directly from aggregators, verify laboratory assay yields, and generate statutory CPCB EPR certificates."
            bullets={['B2B wholesale lot exchange', 'Metal yield estimation', 'Statutory CPCB certificates']}
            button="Enter Recycler Exchange"
            onClick={() => enter('recycler')}
            color="teal"
          />
        </div>
      </section>

      {/* CORE CAPABILITIES */}
      <section className="rounded-3xl border border-emerald-100/90 bg-gradient-to-br from-white via-slate-50/80 to-emerald-50/30 p-6 sm:p-10 shadow-xs space-y-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 block">Standards & Precision</span>
          <h2 className="mt-1 text-2xl font-extrabold text-slate-950 sm:text-3xl">Ending informal scrap exploitation.</h2>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {features.map(({ icon: Icon, title, text, bg, iconBg }) => (
            <div key={title} className={`rounded-2xl border ${bg} p-5 space-y-3 shadow-2xs hover:shadow-sm transition`}>
              <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${iconBg} shadow-2xs`}>
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="text-sm font-extrabold text-slate-950">{title}</h3>
              <p className="text-xs leading-relaxed text-slate-600">{text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 6-STEP OPERATIONAL FLOW */}
      <section className="rounded-3xl border border-emerald-200/70 bg-gradient-to-br from-white via-white to-emerald-50/35 p-6 sm:p-10 shadow-xs space-y-8">
        <div className="text-center max-w-xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 block">The Operational Flow</span>
          <h2 className="mt-1 text-2xl font-extrabold text-slate-950 sm:text-3xl">From Doorstep to Smelter Refinery</h2>
          <p className="mt-2 text-xs text-slate-500">Every handover is digitally signed and logged to maintain verifiable chain-of-custody.</p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-6">
          {journey.map(({ number, title, text, icon: Icon }, idx) => {
            const stepColors = [
              'text-emerald-700 bg-emerald-50 border-emerald-200',
              'text-amber-700 bg-amber-50 border-amber-200',
              'text-teal-700 bg-teal-50 border-teal-200',
              'text-indigo-700 bg-indigo-50 border-indigo-200',
              'text-blue-700 bg-blue-50 border-blue-200',
              'text-emerald-800 bg-emerald-100 border-emerald-300',
            ];
            const badgeColor = stepColors[idx % stepColors.length];

            return (
              <div key={title} className="rounded-2xl border border-slate-200/90 bg-white/90 p-4 text-center space-y-2.5 shadow-2xs hover:border-emerald-300 hover:bg-emerald-50/20 transition-all group">
                <div className={`mx-auto flex h-11 w-11 items-center justify-center rounded-xl border ${badgeColor} shadow-2xs group-hover:scale-105 transition-transform`}>
                  <Icon className="h-5 w-5" />
                </div>
                <span className={`font-mono text-[10px] font-bold px-2 py-0.5 rounded-full inline-block border ${badgeColor}`}>{number}</span>
                <h3 className="text-xs font-bold text-slate-950">{title}</h3>
                <p className="text-[11px] leading-relaxed text-slate-500">{text}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* CALL TO ACTION */}
      <section className="relative overflow-hidden rounded-3xl border border-emerald-800/60 bg-gradient-to-r from-emerald-950 via-slate-900 to-teal-950 p-8 sm:p-10 text-white shadow-xl">
        <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-emerald-500/10 blur-3xl"></div>
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
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
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 px-6 py-3.5 text-xs sm:text-sm font-extrabold text-slate-950 shadow-lg shadow-emerald-500/25 transition shrink-0 active:scale-[0.98]"
          >
            <span>Start Interactive Demo</span>
            <ArrowRight className="h-4 w-4 text-slate-950" />
          </button>
        </div>
      </section>

    </div>
  );
}

function RoleCard({ icon: Icon, number, title, description, bullets, button, onClick, color = 'emerald' }) {
  const themeStyles = {
    emerald: {
      card: 'bg-gradient-to-b from-white via-white to-emerald-50/50 border-emerald-200/80 hover:border-emerald-400 hover:shadow-emerald-900/10',
      iconBox: 'bg-gradient-to-br from-emerald-600 to-teal-700 text-white shadow-sm shadow-emerald-700/25',
      tag: 'text-emerald-800 bg-emerald-50 border-emerald-200',
      bulletDot: 'bg-emerald-600',
      button: 'bg-emerald-50/80 hover:bg-emerald-700 hover:text-white text-emerald-900 border-emerald-300/80',
    },
    amber: {
      card: 'bg-gradient-to-b from-white via-white to-amber-50/50 border-amber-200/80 hover:border-amber-400 hover:shadow-amber-900/10',
      iconBox: 'bg-gradient-to-br from-amber-500 to-orange-600 text-white shadow-sm shadow-amber-600/25',
      tag: 'text-amber-800 bg-amber-50 border-amber-200',
      bulletDot: 'bg-amber-600',
      button: 'bg-amber-50/80 hover:bg-amber-600 hover:text-white text-amber-950 border-amber-300/80',
    },
    teal: {
      card: 'bg-gradient-to-b from-white via-white to-teal-50/50 border-teal-200/80 hover:border-teal-400 hover:shadow-teal-900/10',
      iconBox: 'bg-gradient-to-br from-teal-600 to-cyan-700 text-white shadow-sm shadow-teal-700/25',
      tag: 'text-teal-800 bg-teal-50 border-teal-200',
      bulletDot: 'bg-teal-600',
      button: 'bg-teal-50/80 hover:bg-teal-700 hover:text-white text-teal-950 border-teal-300/80',
    },
  };

  const style = themeStyles[color] || themeStyles.emerald;

  return (
    <div className={`flex flex-col rounded-2xl border ${style.card} p-6 shadow-xs hover:shadow-md transition-all duration-200 space-y-4`}>
      <div className="flex items-center justify-between">
        <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${style.iconBox}`}>
          <Icon className="h-5 w-5" />
        </div>
        <span className={`font-mono text-xs font-bold px-2 py-0.5 rounded-md border ${style.tag}`}>{number}</span>
      </div>

      <div>
        <h3 className="text-base font-extrabold text-slate-950">{title}</h3>
        <p className="mt-2 text-xs leading-relaxed text-slate-600">{description}</p>
      </div>

      <div className="pt-3 border-t border-slate-100 space-y-2 text-xs text-slate-600">
        {bullets.map((bullet) => (
          <div key={bullet} className="flex items-center gap-2">
            <span className={`h-1.5 w-1.5 rounded-full ${style.bulletDot} shrink-0`}></span>
            <span>{bullet}</span>
          </div>
        ))}
      </div>

      <button 
        onClick={onClick} 
        className={`mt-auto flex items-center justify-between rounded-xl border ${style.button} px-4 py-2.5 text-xs font-bold transition shadow-2xs group active:scale-[0.98]`}
      >
        <span>{button}</span>
        <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
      </button>
    </div>
  );
}
