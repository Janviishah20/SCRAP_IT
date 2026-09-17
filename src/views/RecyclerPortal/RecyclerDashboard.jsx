import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import EmptyState from '../../components/EmptyState';
import { 
  Factory, 
  MapPin, 
  CheckCircle2, 
  FileText, 
  Truck, 
  Cpu,
  Clock,
  Send
} from 'lucide-react';

export default function RecyclerDashboard() {
  const { 
    currentUser, 
    recyclerLots, 
    placeRecyclerBid, 
    setActiveEPRModalData 
  } = useApp();

  const [categoryFilter, setCategoryFilter] = useState('all');
  const [biddingLotId, setBiddingLotId] = useState(null);
  const [customBidPrice, setCustomBidPrice] = useState('');
  const [bidNote, setBidNote] = useState('');

  const availableLots = recyclerLots.filter(l => l.status !== 'sold');
  const purchasedLots = recyclerLots.filter(l => l.status === 'sold');

  const filteredLots = availableLots.filter(l => {
    if (categoryFilter === 'all') return true;
    return l.category.toLowerCase().includes(categoryFilter.toLowerCase());
  });

  const handlePlaceBid = (lotId) => {
    if (!customBidPrice || Number(customBidPrice) <= 0) return;
    placeRecyclerBid(lotId, Number(customBidPrice), bidNote);
    setBiddingLotId(null);
    setCustomBidPrice('');
    setBidNote('');
  };

  const handleProcureAtAsking = (lot) => {
    placeRecyclerBid(lot.id, lot.totalLotPrice, 'Direct procurement offer at full reserve price. Ready for Escrow settlement.');
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      
      {/* Recycler Profile & CPCB Accreditation Header */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-800 border border-emerald-200 flex items-center gap-1.5">
                <Factory className="w-3.5 h-3.5" />
                CPCB Registered Smelter & Refiner
              </span>
              <span className="text-xs font-mono text-slate-500 font-medium">
                Reg: {currentUser?.cpcbRegistrationNo || 'CPCB/E-WASTE/REG/2024/9021'}
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              {currentUser?.companyName || currentUser?.name || 'Authorized Smelter & Recycling Facility'}
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 max-w-xl leading-relaxed">
              Procure verified wholesale e-waste lots directly from certified kabadiwala aggregators. Automate statutory Central Pollution Control Board (CPCB) Extended Producer Responsibility credits.
            </p>
          </div>

          {/* Smelter Capacity Stats */}
          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-center min-w-[100px]">
              <span className="text-[10px] uppercase font-bold text-slate-500 block">Monthly Cap</span>
              <span className="text-lg font-bold text-slate-900">{currentUser?.monthlyCapacityTons || 500} T</span>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-center min-w-[100px]">
              <span className="text-[10px] uppercase font-bold text-slate-500 block">Lots Procured</span>
              <span className="text-lg font-bold text-emerald-800">{purchasedLots.length}</span>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-center min-w-[100px]">
              <span className="text-[10px] uppercase font-bold text-slate-500 block">EPR Credits</span>
              <span className="text-lg font-bold text-emerald-800">+{purchasedLots.reduce((acc, l) => acc + Math.round((l.totalWeightKg || 50) * 20), 0)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 1: Live B2B E-Waste Marketplace */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <h2 className="text-base font-bold text-slate-900">Available Wholesale E-Waste Lots</h2>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-slate-100 text-slate-800 border border-slate-200">
              {filteredLots.length} Active Batches
            </span>
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto text-xs pb-1 sm:pb-0">
            <button
              onClick={() => setCategoryFilter('all')}
              className={`px-3 py-1.5 rounded-lg font-bold whitespace-nowrap transition ${
                categoryFilter === 'all' ? 'bg-emerald-700 text-white shadow-2xs' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              All Batches
            </button>
            <button
              onClick={() => setCategoryFilter('pcb')}
              className={`px-3 py-1.5 rounded-lg font-bold whitespace-nowrap transition ${
                categoryFilter === 'pcb' ? 'bg-emerald-700 text-white shadow-2xs' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              PCBs & Motherboards
            </button>
            <button
              onClick={() => setCategoryFilter('batter')}
              className={`px-3 py-1.5 rounded-lg font-bold whitespace-nowrap transition ${
                categoryFilter === 'batter' ? 'bg-emerald-700 text-white shadow-2xs' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              Batteries & Cells
            </button>
            <button
              onClick={() => setCategoryFilter('copper')}
              className={`px-3 py-1.5 rounded-lg font-bold whitespace-nowrap transition ${
                categoryFilter === 'copper' ? 'bg-emerald-700 text-white shadow-2xs' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              Copper Windings
            </button>
          </div>
        </div>

        {/* Marketplace Grid */}
        {filteredLots.length === 0 ? (
          <EmptyState
            title="No E-Waste Lots Available"
            description="There are no active batches listed in this category right now. Filter by all batches or check back shortly."
            actionLabel="Reset Filter"
            onAction={() => setCategoryFilter('all')}
          />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredLots.map((lot) => (
              <div 
                key={lot.id}
                className="bg-white border border-slate-200 rounded-xl p-5 sm:p-6 space-y-4 shadow-xs"
              >
                {/* Card Header */}
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-mono text-xs font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                        {lot.id}
                      </span>
                      <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                        {lot.category}
                      </span>
                    </div>
                    <h3 className="text-base font-bold text-slate-900 leading-snug">{lot.lotTitle}</h3>
                    <p className="text-xs text-slate-500 flex items-center gap-1.5 mt-1">
                      <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span>Aggregator: <strong className="text-slate-800">{lot.kabadiwalaName}</strong> ({lot.location})</span>
                    </p>
                  </div>

                  <div className="text-right shrink-0">
                    <span className="text-[10px] uppercase font-bold text-slate-500 block">Asking Price</span>
                    <span className="text-xl font-bold text-slate-900 font-mono">
                      Rs. {lot.totalLotPrice.toLocaleString('en-IN')}
                    </span>
                    <span className="text-[11px] text-slate-500 block">
                      (Rs. {lot.askingRatePerKg}/kg • {lot.totalWeightKg} kg)
                    </span>
                  </div>
                </div>

                {/* Lot Photo & Description */}
                <div className="grid grid-cols-3 gap-3 p-3 bg-slate-50 rounded-xl border border-slate-200 items-center">
                  <div className="relative h-24 rounded-lg overflow-hidden border border-slate-200">
                    <img src={lot.photoUrl} alt="E-waste lot" className="w-full h-full object-cover" />
                    <span className="absolute bottom-1 left-1 bg-black/70 text-[9px] text-white px-1.5 rounded font-medium">
                      {lot.purityGrade}
                    </span>
                  </div>

                  <div className="col-span-2 pl-1 space-y-1 text-xs">
                    <span className="text-[10px] uppercase font-bold text-slate-500 block">Batch Quality & Grade:</span>
                    <p className="text-slate-600 text-[11px] leading-relaxed line-clamp-3">
                      {lot.description}
                    </p>
                  </div>
                </div>

                {/* Material Recovery & Yield Estimator Panel */}
                <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                  <div className="flex items-center justify-between text-xs font-bold text-slate-900">
                    <span className="flex items-center gap-1.5">
                      <Cpu className="w-3.5 h-3.5 text-emerald-800" />
                      Estimated Smelting Recovery Yield
                    </span>
                    <span className="text-[10px] text-emerald-800 font-bold">CPCB Protocol Verified</span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px] pt-1">
                    <div className="p-2 bg-white rounded-lg border border-slate-200">
                      <span className="text-slate-500 block text-[10px]">Copper Est.</span>
                      <strong className="text-slate-900">{lot.estimatedYield?.copperPercent || 18}%</strong>
                    </div>
                    <div className="p-2 bg-white rounded-lg border border-slate-200">
                      <span className="text-slate-500 block text-[10px]">Precious Metal</span>
                      <strong className="text-amber-700">{lot.estimatedYield?.goldGramsPerTon || 140} g/T</strong>
                    </div>
                    <div className="p-2 bg-white rounded-lg border border-slate-200">
                      <span className="text-slate-500 block text-[10px]">Plastics Core</span>
                      <strong className="text-slate-900">{lot.estimatedYield?.plasticsPercent || 32}%</strong>
                    </div>
                    <div className="p-2 bg-white rounded-lg border border-slate-200">
                      <span className="text-slate-500 block text-[10px]">EPR Eligibility</span>
                      <strong className="text-emerald-800">100% Eligible</strong>
                    </div>
                  </div>
                </div>

                {/* Purchase & Bidding Action Bar */}
                <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-slate-100">
                  {(() => {
                    const activeBid = (lot.bids || []).find(b => b.status === 'pending');

                    if (activeBid) {
                      return (
                        <div className="w-full p-3.5 bg-amber-50/90 border border-amber-300 rounded-xl space-y-1.5 text-xs">
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5">
                            <div className="flex items-center gap-2">
                              <span className="w-2 h-2 rounded-full bg-amber-600 animate-pulse"></span>
                              <span className="font-bold text-amber-950">
                                Offer Placed: <strong className="font-mono text-emerald-800">Rs. {activeBid.bidAmount.toLocaleString('en-IN')}</strong>
                              </span>
                              <span className="text-[11px] text-amber-800 font-medium">
                                (~Rs. {activeBid.ratePerKg || Math.round(activeBid.bidAmount / (lot.totalWeightKg || 1))}/kg)
                              </span>
                            </div>
                            <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-amber-200/80 text-amber-900 inline-block">
                              Awaiting Kabadiwala Approval
                            </span>
                          </div>
                          <p className="text-[11px] text-slate-600">
                            Offer sent to <strong>{lot.kabadiwalaName}</strong>. Once they agree in their dashboard, Escrow payment settles and your CPCB EPR Certificate is issued.
                          </p>
                        </div>
                      );
                    }

                    if (biddingLotId === lot.id) {
                      return (
                        <div className="space-y-2.5 w-full bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                            <div className="flex-1 relative">
                              <span className="absolute left-3 top-2.5 text-xs font-bold text-slate-500">Rs.</span>
                              <input 
                                type="number" 
                                placeholder="Enter offer amount..."
                                value={customBidPrice}
                                onChange={e => setCustomBidPrice(e.target.value)}
                                className="w-full pl-8 pr-3 py-2 bg-white border border-slate-300 rounded-xl text-xs font-bold text-slate-900 focus:outline-none focus:ring-1 focus:ring-emerald-700"
                              />
                            </div>
                            <button
                              onClick={() => handlePlaceBid(lot.id)}
                              className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs rounded-xl transition flex items-center justify-center gap-1.5 shadow-2xs"
                            >
                              <Send className="w-3.5 h-3.5" />
                              <span>Submit Offer to Aggregator</span>
                            </button>
                            <button
                              onClick={() => {
                                setBiddingLotId(null);
                                setCustomBidPrice('');
                              }}
                              className="px-3 py-2 bg-white text-slate-600 rounded-xl text-xs font-semibold hover:bg-slate-100 border border-slate-200 transition"
                            >
                              Cancel
                            </button>
                          </div>
                          <span className="text-[10px] text-slate-500 block">
                            Aggregator will review your price and CPCB registration before agreeing to the deal.
                          </span>
                        </div>
                      );
                    }

                    return (
                      <>
                        <button
                          onClick={() => {
                            setBiddingLotId(lot.id);
                            setCustomBidPrice(lot.totalLotPrice.toString());
                          }}
                          className="w-full sm:w-auto px-4 py-2.5 bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-bold rounded-xl border border-slate-200 transition"
                        >
                          Make Counter Offer
                        </button>

                        <button
                          onClick={() => handleProcureAtAsking(lot)}
                          className="w-full sm:w-auto px-5 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs rounded-xl shadow-xs transition flex items-center justify-center gap-2"
                        >
                          <Truck className="w-4 h-4" />
                          <span>Offer Asking Price (Rs. {lot.totalLotPrice.toLocaleString('en-IN')})</span>
                        </button>
                      </>
                    );
                  })()}
                </div>

              </div>
            ))}
          </div>
        )}
      </div>

      {/* SECTION 2: Acquired Lots & Official EPR Certificate Archive */}
      <div className="space-y-4 pt-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h2 className="text-base font-bold text-slate-900">Procured Batches & Official CPCB Certificates</h2>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
              {purchasedLots.length} Verified Records
            </span>
          </div>
          <span className="text-xs text-slate-500">Official Government Audit Ready</span>
        </div>

        {purchasedLots.length === 0 ? (
          <EmptyState
            title="No Procured Batches Yet"
            description="When your refinery purchases verified e-waste lots, they will be archived here alongside downloadable CPCB Extended Producer Responsibility certificates."
          />
        ) : (
          <div className="space-y-3">
            {purchasedLots.map((lot) => (
              <div 
                key={lot.id}
                className="p-5 bg-white border border-slate-200 rounded-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-xs"
              >
                <div className="space-y-1.5 flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      {lot.id}
                    </span>
                    <span className="text-xs font-bold text-slate-900">{lot.lotTitle}</span>
                    <span className="text-xs text-emerald-800 flex items-center gap-1 font-semibold">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
                      <span>Smelted and Certified</span>
                    </span>
                  </div>

                  <div className="text-xs text-slate-500 flex flex-wrap gap-x-4 gap-y-1">
                    <span>Aggregator: <strong className="text-slate-800">{lot.kabadiwalaName}</strong></span>
                    <span>Net Weight: <strong className="text-slate-800">{lot.totalWeightKg} kg</strong></span>
                    <span>Certificate Serial: <strong className="text-emerald-800 font-mono">{lot.certificateId}</strong></span>
                  </div>
                </div>

                <div className="flex items-center justify-between md:justify-end gap-4 w-full md:w-auto pt-3 md:pt-0 border-t md:border-t-0 border-slate-100">
                  <div className="text-left md:text-right">
                    <span className="text-[10px] uppercase font-bold text-slate-500 block">Procured Cost</span>
                    <span className="text-lg font-bold text-slate-900 font-mono">
                      Rs. {lot.soldPrice?.toLocaleString('en-IN') || lot.totalLotPrice?.toLocaleString('en-IN')}
                    </span>
                  </div>

                  <button
                    onClick={() => {
                      setActiveEPRModalData({
                        certificateNumber: lot.certificateId,
                        recycler: currentUser,
                        lot,
                        cpcbReg: currentUser.cpcbRegistrationNo,
                        issueDate: lot.soldDate || '16 September 2026',
                        co2Offset: (lot.totalWeightKg * 4.8).toFixed(1),
                        heavyMetalsDiverted: (lot.totalWeightKg * 0.42).toFixed(1)
                      });
                    }}
                    className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs rounded-xl shadow-xs transition flex items-center gap-1.5"
                  >
                    <FileText className="w-4 h-4" />
                    <span>Download EPR Certificate</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}
