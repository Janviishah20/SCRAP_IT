import React from 'react';
import { useApp } from '../../context/AppContext';
import VehicleRecommendationBadge from '../../components/VehicleRecommendationBadge';
import EmptyState from '../../components/EmptyState';
import { 
  Plus, 
  MapPin, 
  CheckCircle2, 
  Scale, 
  Leaf, 
  Coins, 
  ShieldCheck, 
  Clock,
  PhoneCall
} from 'lucide-react';

export default function CitizenDashboard() {
  const { 
    currentUser, 
    citizenStats, 
    pickupRequests, 
    setIsCreatePickupModalOpen, 
    setIsRateModalOpen 
  } = useApp();

  const activeRequests = pickupRequests.filter(r => r.status !== 'completed');
  const completedRequests = pickupRequests.filter(r => r.status === 'completed');

  return (
    <div className="space-y-8 animate-fadeIn">
      
      {/* Top Welcome & Impact Banner */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                Citizen Portal • Noida Sector 78
              </span>
              <span className="text-xs text-slate-500 font-medium">Customer ID: #CIT-01</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Welcome, {currentUser?.name || 'Rahul'}
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 max-w-xl leading-relaxed">
              Schedule doorstep scrap pickups with transparent market rates. Every item is weighed on a certified digital scale right before your eyes.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <button
              onClick={() => setIsCreatePickupModalOpen(true)}
              className="px-5 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs sm:text-sm rounded-xl shadow-xs transition flex items-center justify-center gap-2"
            >
              <Plus className="w-4 h-4" />
              <span>Schedule Scrap Pickup</span>
            </button>

            <button
              onClick={() => setIsRateModalOpen(true)}
              className="px-4 py-2.5 bg-slate-50 hover:bg-slate-100 text-slate-800 border border-slate-200 rounded-xl text-xs font-semibold transition flex items-center justify-center gap-2"
            >
              <Scale className="w-4 h-4 text-emerald-700" />
              <span>Explore Rates</span>
            </button>
          </div>
        </div>

        {/* Eco Scorecard Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 pt-6 border-t border-slate-100">
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/80">
            <div className="flex items-center gap-2 text-emerald-800 mb-1">
              <Coins className="w-4 h-4" />
              <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Total Scrap Earnings</span>
            </div>
            <span className="text-xl sm:text-2xl font-bold text-slate-900 font-mono">
              Rs. {citizenStats.totalEarnedRs.toLocaleString('en-IN')}
            </span>
          </div>

          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/80">
            <div className="flex items-center gap-2 text-emerald-800 mb-1">
              <Leaf className="w-4 h-4" />
              <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">CO2 Offset</span>
            </div>
            <span className="text-xl sm:text-2xl font-bold text-emerald-800 font-mono">
              {citizenStats.co2SavedKg} <span className="text-xs">kg</span>
            </span>
          </div>

          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/80">
            <div className="flex items-center gap-2 text-slate-700 mb-1">
              <Scale className="w-4 h-4" />
              <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Landfill Diverted</span>
            </div>
            <span className="text-xl sm:text-2xl font-bold text-slate-900 font-mono">
              {citizenStats.landfillDivertedKg} <span className="text-xs">kg</span>
            </span>
          </div>

          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/80">
            <div className="flex items-center gap-2 text-slate-700 mb-1">
              <ShieldCheck className="w-4 h-4" />
              <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Green Coins Earned</span>
            </div>
            <span className="text-xl sm:text-2xl font-bold text-slate-900 font-mono">
              {citizenStats.greenCoins} <span className="text-xs">pts</span>
            </span>
          </div>
        </div>
      </div>

      {/* Active Pickups Tracking Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h2 className="text-base font-bold text-slate-900">Active Pickup Bookings</h2>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
              {activeRequests.length} Scheduled
            </span>
          </div>
          <span className="text-xs text-slate-500">Live order status and digital scale tracking</span>
        </div>

        {activeRequests.length === 0 ? (
          <EmptyState
            title="No Active Pickups Scheduled"
            description="You currently have no scheduled pickups. Book a doorstep collection for e-waste, old appliances, or metal scrap."
            actionLabel="Schedule Scrap Pickup"
            onAction={() => setIsCreatePickupModalOpen(true)}
          />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {activeRequests.map((req) => (
              <div 
                key={req.id}
                className="bg-white border border-slate-200 rounded-xl p-5 sm:p-6 space-y-4 shadow-xs"
              >
                {/* Status Header */}
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-mono text-xs font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                        {req.id}
                      </span>
                      <span className="text-xs text-slate-500">{req.createdAt}</span>
                    </div>
                    <h3 className="text-base font-bold text-slate-900">{req.wasteType}</h3>
                    <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-0.5">
                      <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span className="truncate">{req.address}</span>
                    </div>
                  </div>

                  <span className={`px-2.5 py-1 rounded-full text-xs font-bold shrink-0 border ${
                    req.status === 'accepted' 
                      ? 'bg-slate-100 text-slate-800 border-slate-200' 
                      : 'bg-emerald-50 text-emerald-800 border-emerald-200'
                  }`}>
                    {req.status === 'accepted' ? 'Collector Assigned' : 'Finding Nearby Collector'}
                  </span>
                </div>

                {/* Photo & Vehicle Details */}
                <div className="grid grid-cols-3 gap-3 p-3 bg-slate-50 rounded-xl border border-slate-200 items-center">
                  <div className="relative h-20 rounded-lg overflow-hidden border border-slate-200">
                    <img src={req.photoUrl} alt="Waste items" className="w-full h-full object-cover" />
                    <span className="absolute bottom-1 left-1 bg-black/70 text-[9px] text-white px-1.5 rounded">
                      Scrap Photo
                    </span>
                  </div>

                  <div className="col-span-2 space-y-1.5 pl-1">
                    <span className="text-[10px] uppercase font-bold text-slate-500 block tracking-wider">
                      Allocated Vehicle Sizing:
                    </span>
                    <VehicleRecommendationBadge weightKg={req.estimatedTotalWeightKg} customVehicleText={req.vehicleRecommended} />
                    <div className="text-[11px] text-slate-600">
                      Est. Payout: <strong className="text-emerald-800 font-bold">Rs. {req.estimatedPayout.toLocaleString('en-IN')}</strong> (~{req.estimatedTotalWeightKg} kg)
                    </div>
                  </div>
                </div>

                {/* Live Stepper Progress */}
                <div className="space-y-2 pt-2 border-t border-slate-100">
                  <span className="text-[10px] uppercase font-bold text-slate-500 block tracking-wider">Pickup Journey:</span>
                  <div className="grid grid-cols-3 gap-2 text-center text-[10px]">
                    <div className="p-2 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 font-bold">
                      1. Request Placed
                    </div>
                    <div className={`p-2 rounded-lg border font-bold ${
                      req.status === 'accepted' 
                        ? 'bg-slate-100 text-slate-900 border-slate-300' 
                        : 'bg-slate-50 text-slate-400 border-slate-200'
                    }`}>
                      {req.status === 'accepted' ? '2. Collector Assigned' : '2. Collector Alert'}
                    </div>
                    <div className="p-2 rounded-lg bg-slate-50 border border-slate-200 text-slate-400">
                      3. Digital Scale Weighing
                    </div>
                  </div>
                </div>

                {/* Assigned Collector Details if accepted */}
                {req.assignedKabadiwalaName ? (
                  <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between text-xs">
                    <div>
                      <span className="text-[10px] text-slate-500 block">Assigned Collector:</span>
                      <span className="font-bold text-slate-900">{req.assignedKabadiwalaName}</span>
                      <span className="text-slate-500 text-[11px] block">{req.assignedKabadiwalaPhone}</span>
                    </div>
                    <a 
                      href={`tel:${req.assignedKabadiwalaPhone}`}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-700 text-white font-bold rounded-lg text-xs hover:bg-emerald-800 transition"
                    >
                      <PhoneCall className="w-3.5 h-3.5" />
                      <span>Call Partner</span>
                    </a>
                  </div>
                ) : (
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between text-xs text-slate-500">
                    <span>Notifying verified collectors in Sector 78...</span>
                    <span className="text-[11px] text-emerald-800 font-semibold">Slot: {req.preferredSlot}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Completed Pickups & Digital Receipts History */}
      <div className="space-y-4 pt-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h2 className="text-base font-bold text-slate-900">Verified Digital Weight Receipts</h2>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-slate-100 text-slate-700 border border-slate-200">
              {completedRequests.length} Settled
            </span>
          </div>
          <span className="text-xs text-slate-500">Tamper-proof calibrated digital scale slips</span>
        </div>

        {completedRequests.length === 0 ? (
          <EmptyState
            title="No Completed Receipts Yet"
            description="Verified digital receipts and instant UPI payment logs will appear here after your first completed scrap collection."
          />
        ) : (
          <div className="space-y-3">
            {completedRequests.map((req) => (
              <div 
                key={req.id}
                className="p-5 bg-white border border-slate-200 rounded-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-xs"
              >
                <div className="space-y-1.5 flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      {req.id}
                    </span>
                    <span className="text-xs font-bold text-slate-900">{req.wasteType}</span>
                    <span className="text-xs text-emerald-800 flex items-center gap-1 font-semibold">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
                      <span>Paid and Verified</span>
                    </span>
                  </div>

                  <div className="text-xs text-slate-500 flex flex-wrap gap-x-4 gap-y-1">
                    <span>Collector: <strong className="text-slate-800">Ramesh Scrap Aggregators</strong></span>
                    <span>Scale Serial: <strong className="text-slate-800 font-mono">DS-44 (Govt Calibrated)</strong></span>
                    <span>Completed: <strong className="text-slate-800">{req.preferredSlot}</strong></span>
                  </div>

                  {/* Items chips */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {req.itemsSummary.map((i, idx) => (
                      <span key={idx} className="px-2.5 py-1 bg-slate-100 rounded-md text-[11px] text-slate-700 border border-slate-200">
                        {i.name} ({i.qty} {i.unit})
                      </span>
                    ))}
                  </div>
                </div>

                {/* Digital Scale Output Box */}
                <div className="flex items-center justify-between md:justify-end gap-6 w-full md:w-auto pt-3 md:pt-0 border-t md:border-t-0 border-slate-100">
                  <div className="text-left md:text-right">
                    <span className="text-[10px] uppercase font-bold text-slate-500 block tracking-wider">
                      Verified Weight
                    </span>
                    <span className="text-base font-bold text-slate-900 font-mono">
                      {req.actualWeightKg} kg
                    </span>
                  </div>

                  <div className="text-right">
                    <span className="text-[10px] uppercase font-bold text-emerald-800 block tracking-wider">
                      Amount Disbursed
                    </span>
                    <span className="text-xl font-bold text-emerald-800 font-mono">
                      Rs. {req.finalAmountPaid?.toLocaleString('en-IN')}
                    </span>
                    <span className="text-[10px] text-slate-500 block">Instant UPI Settled</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}
