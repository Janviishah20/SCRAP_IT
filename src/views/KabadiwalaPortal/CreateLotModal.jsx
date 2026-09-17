import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  X, 
  Package, 
  Upload, 
  Factory,
  AlertCircle,
  ShieldCheck
} from 'lucide-react';

export default function CreateLotModal() {
  const { 
    isCreateLotModalOpen, 
    setIsCreateLotModalOpen, 
    createRecyclerLot, 
    currentUser 
  } = useApp();

  const [lotTitle, setLotTitle] = useState('Segregated Server Motherboards & High-Grade PCBs');
  const [category, setCategory] = useState('Printed Circuit Boards (PCBs)');
  const [totalWeightKg, setTotalWeightKg] = useState(50);
  const [askingRatePerKg, setAskingRatePerKg] = useState(410);
  const [purityGrade, setPurityGrade] = useState('Grade A (Heavy Gold Pins / Server Scrap)');
  const [location, setLocation] = useState(currentUser?.hubAddress || 'Okhla Phase 2 Scrap Yard, New Delhi');
  const [photoUrl, setPhotoUrl] = useState('https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80');
  const [description, setDescription] = useState('Pure sorted circuit boards with zero plastic frame. Ready for direct copper & gold smelter extraction.');
  const [hasConsent, setHasConsent] = useState(true);
  const [formError, setFormError] = useState('');

  if (!isCreateLotModalOpen) return null;

  const lotPresets = [
    {
      title: 'Grade A Server PCBs & Motherboards',
      category: 'Printed Circuit Boards (PCBs)',
      weight: 60,
      rate: 420,
      purity: 'Grade A (Gold-Plated Pins)',
      photo: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80'
    },
    {
      title: 'Inverter & Telecom Li-Ion Cells Lot',
      category: 'Batteries & Energy Cells',
      weight: 150,
      rate: 90,
      purity: 'CPCB Certified Non-Leaking Cells',
      photo: 'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&w=800&q=80'
    },
    {
      title: 'Stripped 99.2% Pure Copper Windings',
      category: 'Pure Copper Coils',
      weight: 40,
      rate: 535,
      purity: 'Electrolytic Copper Grade 1',
      photo: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80'
    }
  ];

  const handleApplyPreset = (preset) => {
    setLotTitle(preset.title);
    setCategory(preset.category);
    setTotalWeightKg(preset.weight);
    setAskingRatePerKg(preset.rate);
    setPurityGrade(preset.purity);
    setPhotoUrl(preset.photo);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPhotoUrl(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormError('');

    if (!totalWeightKg || totalWeightKg <= 0) {
      setFormError('Please enter a valid batch weight greater than 0 kg.');
      return;
    }

    if (!askingRatePerKg || askingRatePerKg <= 0) {
      setFormError('Please specify an asking rate per kg.');
      return;
    }

    if (!hasConsent) {
      setFormError('You must verify statutory CPCB non-toxic dismantling compliance before listing.');
      return;
    }

    createRecyclerLot({
      lotTitle,
      category,
      totalWeightKg: Number(totalWeightKg),
      askingRatePerKg: Number(askingRatePerKg),
      purityGrade,
      location,
      photoUrl,
      description
    });
  };

  const totalLotPrice = (Number(totalWeightKg) || 0) * (Number(askingRatePerKg) || 0);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white border border-slate-200 rounded-2xl shadow-xl overflow-hidden my-8 text-slate-900">
        
        {/* Header */}
        <div className="bg-slate-50 p-5 sm:p-6 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-emerald-100 text-emerald-800 rounded-xl">
              <Package className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">B2B E-Waste Marketplace</span>
              <h2 className="text-base sm:text-lg font-bold text-slate-900">Assemble & Publish E-Waste Lot</h2>
              <p className="text-xs text-slate-500">Sell segregated wholesale batches directly to authorized industrial recyclers & smelters.</p>
            </div>
          </div>
          <button 
            onClick={() => setIsCreateLotModalOpen(false)}
            className="p-1.5 text-slate-400 hover:text-slate-700 bg-white hover:bg-slate-100 border border-slate-200 rounded-lg transition"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Validation Error Banner (Item #44) */}
        {formError && (
          <div className="mx-6 mt-4 p-3 rounded-xl bg-red-50 border border-red-200 flex items-center gap-2.5 text-xs text-red-800">
            <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
            <span className="font-semibold">{formError}</span>
          </div>
        )}

        {/* Quick Presets */}
        <div className="bg-slate-100/70 px-6 py-2.5 border-b border-slate-200 flex items-center gap-2 overflow-x-auto text-xs">
          <span className="text-slate-600 font-semibold shrink-0">Batch Presets:</span>
          {lotPresets.map((p, i) => (
            <button
              key={i}
              type="button"
              onClick={() => handleApplyPreset(p)}
              className="px-2.5 py-1 bg-white hover:bg-slate-50 border border-slate-300 rounded-md text-[11px] text-slate-700 font-medium shrink-0 transition"
            >
              {p.title.split(' ')[0]} {p.category.split(' ')[0]}
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="p-6 max-h-[70vh] overflow-y-auto space-y-5">
          
          <div className="space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="sm:col-span-2">
                <label className="text-[11px] text-slate-700 font-bold block mb-1">Lot / Batch Title</label>
                <input 
                  type="text" 
                  required
                  value={lotTitle}
                  onChange={e => setLotTitle(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 focus:outline-none focus:bg-white focus:ring-1 focus:ring-emerald-700"
                />
              </div>

              <div>
                <label className="text-[11px] text-slate-700 font-bold block mb-1">E-Waste Category</label>
                <select 
                  value={category}
                  onChange={e => setCategory(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 focus:outline-none focus:bg-white focus:ring-1 focus:ring-emerald-700"
                >
                  <option value="Printed Circuit Boards (PCBs)">Printed Circuit Boards (PCBs)</option>
                  <option value="Batteries & Energy Cells">Batteries & Energy Cells</option>
                  <option value="Pure Copper Coils">Pure Copper Coils</option>
                  <option value="Telecom & Network Infrastructure">Telecom & Network Infrastructure</option>
                  <option value="Mixed Electronic Scrap">Mixed Electronic Scrap</option>
                </select>
              </div>

              <div>
                <label className="text-[11px] text-slate-700 font-bold block mb-1">Purity / Technical Grade</label>
                <input 
                  type="text" 
                  value={purityGrade}
                  onChange={e => setPurityGrade(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 focus:outline-none focus:bg-white focus:ring-1 focus:ring-emerald-700"
                />
              </div>

              <div>
                <label className="text-[11px] text-slate-700 font-bold block mb-1">Total Batch Weight (kg)</label>
                <input 
                  type="number" 
                  required
                  min="1"
                  value={totalWeightKg}
                  onChange={e => setTotalWeightKg(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 focus:outline-none focus:bg-white focus:ring-1 focus:ring-emerald-700"
                />
              </div>

              <div>
                <label className="text-[11px] text-slate-700 font-bold block mb-1">Asking Rate (Rs. / kg)</label>
                <input 
                  type="number" 
                  required
                  min="1"
                  value={askingRatePerKg}
                  onChange={e => setAskingRatePerKg(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 focus:outline-none focus:bg-white focus:ring-1 focus:ring-emerald-700"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="text-[11px] text-slate-700 font-bold block mb-1">Hub Dispatch Location</label>
                <input 
                  type="text" 
                  value={location}
                  onChange={e => setLocation(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 focus:outline-none focus:bg-white focus:ring-1 focus:ring-emerald-700"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="text-[11px] text-slate-700 font-bold block mb-1">Lot Photo</label>
                <div className="flex gap-3 items-center">
                  {photoUrl && (
                    <img src={photoUrl} alt="Lot preview" className="w-16 h-16 rounded-xl object-cover border border-slate-200" />
                  )}
                  <div className="flex-1">
                    <label className="cursor-pointer inline-flex items-center gap-2 px-3.5 py-2 bg-white hover:bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-700 font-semibold">
                      <Upload className="w-3.5 h-3.5" />
                      <span>Upload Batch Image</span>
                      <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
                    </label>
                  </div>
                </div>
              </div>

              <div className="sm:col-span-2">
                <label className="text-[11px] text-slate-700 font-bold block mb-1">Extraction Notes</label>
                <textarea 
                  rows="2"
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 focus:outline-none focus:bg-white focus:ring-1 focus:ring-emerald-700"
                />
              </div>
            </div>
          </div>

          {/* Form Consent Checkbox (Item #50) */}
          <div className="pt-2 border-t border-slate-200">
            <label className="flex items-start gap-2.5 text-xs text-slate-600 cursor-pointer">
              <input 
                type="checkbox" 
                checked={hasConsent} 
                onChange={e => setHasConsent(e.target.checked)} 
                className="mt-0.5 rounded border-slate-300 text-emerald-700 focus:ring-emerald-600"
              />
              <span>
                I certify that this segregated batch contains non-hazardous, dismantled e-waste ready for authorized refinery inspection under Central Pollution Control Board (CPCB) guidelines.
              </span>
            </label>
          </div>

          {/* Value Summary Box */}
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-500 block">Total Lot Asking Price</span>
              <span className="text-xl font-bold text-slate-900 font-mono">Rs. {totalLotPrice.toLocaleString('en-IN')}</span>
              <span className="text-[11px] text-slate-500 block mt-0.5">({totalWeightKg} kg @ Rs. {askingRatePerKg}/kg)</span>
            </div>

            <div className="text-right">
              <span className="text-xs font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-md">
                CPCB EPR Eligible
              </span>
            </div>
          </div>

          {/* Actions */}
          <div className="pt-2 flex items-center justify-end gap-3 border-t border-slate-200">
            <button 
              type="button"
              onClick={() => setIsCreateLotModalOpen(false)}
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold transition"
            >
              Cancel
            </button>

            <button 
              type="submit"
              className="px-6 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs rounded-xl shadow-xs transition flex items-center gap-2"
            >
              <Factory className="w-4 h-4" />
              <span>Publish to Recycler Marketplace</span>
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
