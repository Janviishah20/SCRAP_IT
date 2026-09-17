import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import VehicleRecommendationBadge from '../../components/VehicleRecommendationBadge';
import EmptyState from '../../components/EmptyState';
import { 
  Truck, 
  MapPin, 
  Phone, 
  Scale, 
  Package, 
  CheckCircle2, 
  Plus, 
  Eye, 
  FileText,
  Wifi,
  Star,
  X
} from 'lucide-react';

export default function KabadiwalaDashboard() {
  const { 
    currentUser, 
    pickupRequests, 
    acceptPickupRequest, 
    openWeighingScale, 
    kabadiwalaInventory, 
    recyclerLots,
    acceptRecyclerBid,
    rejectRecyclerBid,
    setIsCreateLotModalOpen,
    setActiveEPRModalData,
    allUsers
  } = useApp();

  const [distanceFilter, setDistanceFilter] = useState('all');
  const [selectedPhotoModal, setSelectedPhotoModal] = useState(null);

  const pendingRequests = pickupRequests.filter(r => r.status === 'pending');
  const filteredPending = pendingRequests.filter(r => {
    if (distanceFilter === 'nearby') return r.distanceKm <= 2.0;
    return true;
  });

  const activePickups = pickupRequests.filter(r => r.status === 'accepted');
  const myLots = recyclerLots.filter(l => 
    l.kabadiwalaId === currentUser?.id || 
    (currentUser?.name && l.kabadiwalaName?.toLowerCase().includes(currentUser.name.toLowerCase())) ||
    (currentUser?.businessName && l.kabadiwalaName?.toLowerCase().includes(currentUser.businessName.toLowerCase())) ||
    l.kabadiwalaName?.includes('Ramesh')
  );

  return (
    <div className="space-y-8 animate-fadeIn">
      
      {/* Collector Profile & Hub Banner */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-800 border border-emerald-200 flex items-center gap-1.5">
                <Truck className="w-3.5 h-3.5" />
                Aggregator Hub • {currentUser?.area || 'Okhla Industrial Area'}
              </span>
              <span className="flex items-center gap-1 text-xs text-emerald-800 font-mono font-bold">
                <Wifi className="w-3 h-3 text-emerald-700" />
                IoT Scale #DS-44 Active
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              {currentUser?.businessName || currentUser?.name || 'Collector Aggregator Hub'}
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 max-w-xl leading-relaxed">
              Accept verified doorstep pickup requests, review scrap photos for vehicle sizing, weigh items with certified IoT scales, and package e-waste lots for industrial smelters.
            </p>
          </div>

          {/* Quick Hub Stats */}
          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-center min-w-[95px]">
              <span className="text-[10px] uppercase font-bold text-slate-500 block">Rating</span>
              <div className="flex items-center justify-center gap-1 mt-0.5">
                <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                <span className="text-base font-bold text-slate-900">4.9</span>
              </div>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-center min-w-[95px]">
              <span className="text-[10px] uppercase font-bold text-slate-500 block">Pickups</span>
              <span className="text-base font-bold text-emerald-800 block mt-0.5">{currentUser?.completedPickupsCount || 312}</span>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-center min-w-[95px]">
              <span className="text-[10px] uppercase font-bold text-slate-500 block">Vehicle</span>
              <span className="text-xs font-bold text-slate-900 block mt-1">E-Loader</span>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 1: Active In-Progress Pickups (Needs Doorstep Weighing) */}
      {activePickups.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <h2 className="text-base font-bold text-slate-900">Active In-Progress Pickups</h2>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
              {activePickups.length} In Progress
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {activePickups.map((req) => (
              <div 
                key={req.id}
                className="bg-white border-2 border-emerald-700 rounded-xl p-5 sm:p-6 space-y-4 shadow-xs"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <span className="text-xs font-mono font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      {req.id}
                    </span>
                    <h3 className="text-base font-bold text-slate-900 mt-1">{req.citizenName}</h3>
                    <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-0.5">
                      <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span>{req.address}</span>
                    </div>
                  </div>

                  <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-slate-100 text-slate-800 border border-slate-200">
                    Slot: {req.preferredSlot}
                  </span>
                </div>

                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between text-xs">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-500 block">Est. Weight</span>
                    <span className="font-bold text-slate-900 text-sm">~{req.estimatedTotalWeightKg} kg</span>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-500 block">Est. Payout</span>
                    <span className="font-bold text-emerald-800 text-sm">Rs. {req.estimatedPayout.toLocaleString('en-IN')}</span>
                  </div>
                  <a 
                    href={`tel:${req.citizenPhone}`}
                    className="p-2 bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 rounded-lg flex items-center gap-1 font-semibold"
                  >
                    <Phone className="w-3.5 h-3.5 text-emerald-700" />
                    <span>Call Citizen</span>
                  </a>
                </div>

                <button
                  onClick={() => openWeighingScale(req)}
                  className="w-full py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-xs flex items-center justify-center gap-2 transition"
                >
                  <Scale className="w-4 h-4" />
                  <span>Open Doorstep Digital Scale</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SECTION 2: Nearby Incoming Requests Radar */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <h2 className="text-base font-bold text-slate-900">Nearby Pickup Radar</h2>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-slate-100 text-slate-800 border border-slate-200">
              {filteredPending.length} Available
            </span>
          </div>

          <div className="flex items-center gap-2 text-xs">
            <span className="text-slate-500 font-medium">Filter radius:</span>
            <button
              onClick={() => setDistanceFilter('all')}
              className={`px-3 py-1 rounded-lg font-bold transition ${
                distanceFilter === 'all' ? 'bg-emerald-700 text-white shadow-2xs' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              All Zones
            </button>
            <button
              onClick={() => setDistanceFilter('nearby')}
              className={`px-3 py-1 rounded-lg font-bold transition ${
                distanceFilter === 'nearby' ? 'bg-emerald-700 text-white shadow-2xs' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              Within 2.0 km
            </button>
          </div>
        </div>

        {filteredPending.length === 0 ? (
          <EmptyState
            title="No Pending Pickups in this Radius"
            description="All nearby requests have been accepted or no new bookings exist in this radius. You can expand the filter or create lots from existing stock."
            actionLabel="View All Zones"
            onAction={() => setDistanceFilter('all')}
          />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {filteredPending.map((req) => (
              <div 
                key={req.id}
                className="bg-white border border-slate-200 rounded-xl p-5 sm:p-6 space-y-4 shadow-xs"
              >
                {/* Header */}
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-mono text-xs font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                        {req.id}
                      </span>
                      <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                        {req.distanceKm} km away
                      </span>
                      <span className="text-xs text-slate-500">{req.createdAt}</span>
                    </div>
                    <h3 className="text-sm font-bold text-slate-900">{req.citizenName}</h3>
                    <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                      <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span className="truncate">{req.address}</span>
                    </p>
                  </div>

                  <div className="text-right">
                    <span className="text-[10px] uppercase font-bold text-slate-500 block">Est. Value</span>
                    <span className="text-base font-bold text-emerald-800">Rs. {req.estimatedPayout.toLocaleString('en-IN')}</span>
                  </div>
                </div>

                {/* Photo & Vehicle Recommendation */}
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex gap-3 items-center">
                  <div 
                    onClick={() => setSelectedPhotoModal(req.photoUrl)}
                    className="relative w-20 h-20 rounded-lg overflow-hidden shrink-0 border border-slate-200 cursor-pointer"
                  >
                    <img src={req.photoUrl} alt="Uploaded scrap" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center text-white opacity-0 hover:opacity-100 transition">
                      <Eye className="w-4 h-4" />
                    </div>
                  </div>

                  <div className="flex-1 min-w-0 space-y-1">
                    <span className="text-[10px] uppercase font-bold text-slate-500 block">
                      Vehicle Allocation Advice:
                    </span>
                    <VehicleRecommendationBadge weightKg={req.estimatedTotalWeightKg} customVehicleText={req.vehicleRecommended} />
                    <p className="text-[11px] text-slate-600 truncate">
                      Items: {req.itemsSummary.map(i => `${i.name} (${i.qty})`).join(', ')}
                    </p>
                  </div>
                </div>

                {/* Action button */}
                <div className="flex items-center justify-between pt-1">
                  <span className="text-[11px] text-slate-500">
                    Slot: <strong className="text-slate-800">{req.preferredSlot}</strong>
                  </span>

                  <button
                    onClick={() => acceptPickupRequest(req.id)}
                    className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs rounded-xl shadow-xs transition flex items-center gap-1.5"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Accept Job & Take Vehicle</span>
                  </button>
                </div>

              </div>
            ))}
          </div>
        )}
      </div>

      {/* SECTION 3: Segregation & Lot Creation Studio */}
      <div className="space-y-4 pt-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-slate-50 p-6 rounded-2xl border border-slate-200">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Package className="w-5 h-5 text-emerald-800" />
              <h2 className="text-base font-bold text-slate-900">B2B E-Waste Segregation & Lot Creation</h2>
            </div>
            <p className="text-xs text-slate-600 max-w-xl leading-relaxed">
              Segregate high-grade motherboards, telecom cards, copper coils, and battery cells into wholesale lots for authorized smelters.
            </p>
          </div>

          <button
            onClick={() => setIsCreateLotModalOpen(true)}
            className="px-5 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs rounded-xl shadow-xs transition flex items-center gap-2 shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>Bundle & Create E-Waste Lot</span>
          </button>
        </div>

        {/* Current Hub Inventory */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {kabadiwalaInventory.map((inv) => (
            <div key={inv.id} className="p-4 bg-white rounded-xl border border-slate-200 space-y-2 shadow-xs">
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 block">
                {inv.category}
              </span>
              <h4 className="text-xs font-bold text-slate-900 truncate">{inv.title}</h4>
              <div className="flex items-center justify-between text-xs pt-2 border-t border-slate-100">
                <span className="text-slate-500">Stock: <strong className="text-slate-900">{inv.weightKg} kg</strong></span>
                <span className="text-emerald-800 font-bold">~Rs. {inv.estValue.toLocaleString('en-IN')}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* SECTION 4: My Published Recycler Lots & Incoming B2B Offers */}
      <div className="space-y-4 pt-2">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <h3 className="text-base font-bold text-slate-900">My Published B2B Lots</h3>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-slate-100 text-slate-800 border border-slate-200">
              {myLots.length} Total Batches
            </span>
          </div>

          {myLots.some(lot => lot.bids?.some(b => b.status === 'pending')) && (
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-900 border border-amber-300 animate-pulse flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-amber-600"></span>
              B2B Offers Received — Awaiting Your Review & Agreement
            </span>
          )}
        </div>

        {myLots.length === 0 ? (
          <EmptyState
            title="No Published B2B Lots"
            description="Bundle your unsegregated hub scrap into standardized lots to list them on the industrial recycler exchange."
            actionLabel="Create E-Waste Lot"
            onAction={() => setIsCreateLotModalOpen(true)}
          />
        ) : (
          <div className="space-y-4">
            {myLots.map((lot) => {
              const pendingBids = (lot.bids || []).filter(b => b.status === 'pending');
              const isSold = lot.status === 'sold';

              return (
                <div 
                  key={lot.id} 
                  className={`p-5 rounded-2xl border transition shadow-xs ${
                    pendingBids.length > 0
                      ? 'bg-emerald-50/30 border-emerald-300 ring-1 ring-emerald-200'
                      : isSold
                      ? 'bg-slate-50 border-slate-200'
                      : 'bg-white border-slate-200'
                  }`}
                >
                  {/* Main Lot Summary Row */}
                  <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                    <div className="flex items-start sm:items-center gap-3.5">
                      <img 
                        src={lot.photoUrl} 
                        alt="Lot preview" 
                        className="w-14 h-14 rounded-xl object-cover border border-slate-200 shrink-0" 
                      />
                      <div>
                        <div className="flex flex-wrap items-center gap-2 mb-1">
                          <span className="font-mono text-xs font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                            {lot.id}
                          </span>
                          <span className="text-xs font-bold text-slate-900">{lot.lotTitle}</span>
                          
                          {isSold ? (
                            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-900 text-white flex items-center gap-1">
                              <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                              Sold & Settled
                            </span>
                          ) : pendingBids.length > 0 ? (
                            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-700 text-white animate-pulse">
                              {pendingBids.length} Offer Awaiting Approval
                            </span>
                          ) : (
                            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-700">
                              Active on Market
                            </span>
                          )}
                        </div>

                        <span className="text-xs text-slate-500 block">
                          Net Weight: <strong className="text-slate-800">{lot.totalWeightKg} kg</strong> • Asking: <strong className="text-slate-800">Rs. {lot.askingRatePerKg}/kg</strong> • {lot.purityGrade}
                        </span>
                      </div>
                    </div>

                    {/* Price and Status Actions */}
                    <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end pt-2 md:pt-0 border-t md:border-t-0 border-slate-200">
                      <div className="text-left md:text-right">
                        <span className="text-[10px] uppercase font-bold text-slate-500 block">
                          {isSold ? 'Final Sale Price' : 'Asking Reserve'}
                        </span>
                        <span className="text-base font-bold text-slate-900 font-mono">
                          Rs. {(isSold ? lot.soldPrice : lot.totalLotPrice)?.toLocaleString('en-IN')}
                        </span>
                      </div>

                      {isSold && (
                        <button
                          onClick={() => {
                            setActiveEPRModalData({
                              certificateNumber: lot.certificateId || 'EPR-IN-2026-8812',
                              recycler: allUsers.recycler,
                              lot,
                              cpcbReg: allUsers.recycler.cpcbRegistrationNo,
                              issueDate: lot.soldDate || '16 September 2026',
                              co2Offset: (lot.totalWeightKg * 4.8).toFixed(1),
                              heavyMetalsDiverted: (lot.totalWeightKg * 0.42).toFixed(1)
                            });
                          }}
                          className="px-3.5 py-2 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold rounded-xl transition flex items-center gap-1.5 shadow-2xs"
                        >
                          <FileText className="w-3.5 h-3.5" />
                          <span>View EPR Certificate</span>
                        </button>
                      )}
                    </div>
                  </div>

                  {/* INCOMING RECYCLER OFFERS PANEL */}
                  {pendingBids.length > 0 && (
                    <div className="mt-4 pt-4 border-t border-emerald-200/80 space-y-3">
                      <span className="text-xs font-bold uppercase tracking-wider text-emerald-900 flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
                        Authorized Recycler Bids (Action Required to Proceed to Payment)
                      </span>

                      {pendingBids.map((bid) => (
                        <div 
                          key={bid.id} 
                          className="p-4 bg-white border border-emerald-300 rounded-xl space-y-3 shadow-2xs"
                        >
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                            <div className="space-y-1">
                              <div className="flex flex-wrap items-center gap-2">
                                <span className="text-sm font-bold text-slate-900">{bid.recyclerName}</span>
                                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                                  CPCB Registered Smelter
                                </span>
                              </div>
                              <p className="text-xs text-slate-500">
                                Registration: <strong className="font-mono text-slate-800">{bid.cpcbRegistrationNo}</strong> • Submitted: {bid.date}
                              </p>
                            </div>

                            <div className="text-left sm:text-right bg-emerald-50 sm:bg-transparent p-3 sm:p-0 rounded-xl">
                              <span className="text-[10px] uppercase font-bold text-slate-500 block">Offered Payout</span>
                              <span className="text-xl font-extrabold text-emerald-800 font-mono">
                                Rs. {bid.bidAmount.toLocaleString('en-IN')}
                              </span>
                              <span className="text-[11px] text-slate-600 block">
                                (~Rs. {bid.ratePerKg || Math.round(bid.bidAmount / (lot.totalWeightKg || 1))}/kg)
                              </span>
                            </div>
                          </div>

                          {bid.notes && (
                            <div className="text-xs text-slate-700 bg-slate-50 p-3 rounded-lg border border-slate-200">
                              <span className="font-bold text-slate-800 block text-[11px] mb-0.5">Procurement / Logistics Note:</span>
                              {bid.notes}
                            </div>
                          )}

                          {/* ACTION BUTTONS: Agree vs Decline */}
                          <div className="flex items-center justify-end gap-3 pt-1 border-t border-slate-100">
                            <button
                              onClick={() => rejectRecyclerBid(lot.id, bid.id)}
                              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition"
                            >
                              Decline Offer
                            </button>
                            <button
                              onClick={() => acceptRecyclerBid(lot.id, bid.id)}
                              className="px-5 py-2 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold rounded-xl transition flex items-center gap-1.5 shadow-xs"
                            >
                              <CheckCircle2 className="w-4 h-4" />
                              <span>Agree & Settle via Escrow</span>
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Expanded Photo Inspection Modal */}
      {selectedPhotoModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 overflow-y-auto">
          <div className="relative max-w-xl w-full bg-white rounded-2xl border border-slate-200 p-4 shadow-xl space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-900">Scrap Pile Inspection Photo</span>
              <button onClick={() => setSelectedPhotoModal(null)} className="p-1 rounded-lg hover:bg-slate-100 text-slate-500">
                <X className="w-4 h-4" />
              </button>
            </div>
            <img src={selectedPhotoModal} alt="Scrap Pile" className="w-full h-80 object-cover rounded-xl border border-slate-200" />
          </div>
        </div>
      )}

    </div>
  );
}
