import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import VehicleRecommendationBadge from '../../components/VehicleRecommendationBadge';
import { 
  X, 
  Upload, 
  MapPin, 
  Phone, 
  ShieldCheck, 
  AlertCircle
} from 'lucide-react';

export default function CreatePickupModal() {
  const { 
    isCreatePickupModalOpen, 
    setIsCreatePickupModalOpen, 
    createPickupRequest, 
    categories,
    currentUser,
    calculateVehicle
  } = useApp();

  // Selected items list
  const [selectedItems, setSelectedItems] = useState([]);

  // Form states
  const [address, setAddress] = useState(currentUser?.address || '');
  const [landmark, setLandmark] = useState('');
  const [pincode, setPincode] = useState('');
  const [phone, setPhone] = useState(currentUser?.phone || '');
  const [preferredSlot, setPreferredSlot] = useState('Today (Within 2 hours)');
  const [notes, setNotes] = useState('');
  const [hasConsent, setHasConsent] = useState(true);
  const [formError, setFormError] = useState('');

  // Photo upload state
  const [photoPreview, setPhotoPreview] = useState(null);

  // Sample quick images
  const demoImages = [
    { label: 'E-Waste (CPUs & Laptops)', url: 'https://images.unsplash.com/photo-1550009158-9ebf69173e03?auto=format&fit=crop&w=600&q=80' },
    { label: 'Air Conditioner / Fridge', url: 'https://images.unsplash.com/photo-1588854337236-6889d631faa8?auto=format&fit=crop&w=600&q=80' },
    { label: 'Circuit Boards / Cables', url: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&q=80' }
  ];

  if (!isCreatePickupModalOpen) return null;

  const allAvailableItems = categories.flatMap(cat => cat.items);

  const totalEstWeight = selectedItems.reduce((sum, i) => sum + (i.estWeight || 1) * (i.qty || 1), 0);
  const totalEstPayout = selectedItems.reduce((sum, i) => sum + (i.rate || 0) * (i.qty || 1), 0);
  const recommendedVehicle = calculateVehicle(totalEstWeight);

  const handleAddItem = (itemId) => {
    setFormError('');
    const item = allAvailableItems.find(i => i.id === itemId);
    if (!item) return;
    const existingIndex = selectedItems.findIndex(i => i.itemId === itemId);
    if (existingIndex > -1) {
      const updated = [...selectedItems];
      updated[existingIndex].qty += 1;
      setSelectedItems(updated);
    } else {
      setSelectedItems([
        ...selectedItems,
        { itemId: item.id, name: item.name, qty: 1, unit: item.unit, rate: item.rate, estWeight: item.unit === 'kg' ? 1 : 3 }
      ]);
    }
  };

  const handleRemoveItem = (index) => {
    setSelectedItems(selectedItems.filter((_, idx) => idx !== index));
  };

  const handleUpdateQty = (index, delta) => {
    const updated = [...selectedItems];
    const newQty = Math.max(1, updated[index].qty + delta);
    updated[index].qty = newQty;
    setSelectedItems(updated);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormError('');

    if (selectedItems.length === 0) {
      setFormError('Please select at least one scrap item before scheduling a pickup.');
      return;
    }

    if (!hasConsent) {
      setFormError('You must accept the statutory compliance and digital scale weighing declaration.');
      return;
    }

    createPickupRequest({
      citizenName: currentUser?.name || 'Citizen',
      citizenPhone: phone,
      address,
      landmark,
      pincode,
      preferredSlot,
      wasteType: selectedItems.some(i => i.itemId.startsWith('ew_')) ? 'E-Waste & High Value Tech' : 'Recyclables & Metals',
      itemsSummary: selectedItems,
      estimatedTotalWeightKg: Math.round(totalEstWeight),
      estimatedPayout: Math.round(totalEstPayout),
      photoUrl: photoPreview,
      notes
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-white border border-slate-200 rounded-2xl shadow-xl overflow-hidden my-8 text-slate-900">
        
        {/* Header (Solid, crisp) */}
        <div className="bg-slate-50 p-5 sm:p-6 border-b border-slate-200 flex items-center justify-between">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">Citizen Doorstep Service</span>
            <h2 className="text-lg sm:text-xl font-bold text-slate-900">Schedule Scrap Pickup</h2>
            <p className="text-xs text-slate-500 mt-0.5">Upload photos for accurate vehicle sizing and verify weights on our calibrated digital scale.</p>
          </div>
          <button 
            onClick={() => setIsCreatePickupModalOpen(false)}
            className="p-1.5 text-slate-400 hover:text-slate-700 bg-white hover:bg-slate-100 border border-slate-200 rounded-lg transition"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Validation Error Banner (Item #44: Add error messages) */}
        {formError && (
          <div className="mx-6 mt-4 p-3 rounded-xl bg-red-50 border border-red-200 flex items-center gap-2.5 text-xs text-red-800">
            <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
            <span className="font-semibold">{formError}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="p-6 max-h-[75vh] overflow-y-auto space-y-6">
          
          {/* Step 1: Items Selection */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
                1. Select Items for Pickup
              </label>
              <span className="text-xs text-emerald-800 font-bold">
                Estimated Payout: Rs. {totalEstPayout.toLocaleString('en-IN')}
              </span>
            </div>

            {/* Quick Add Dropdown */}
            <div className="flex gap-2">
              <select 
                onChange={(e) => {
                  if (e.target.value) {
                    handleAddItem(e.target.value);
                    e.target.value = '';
                  }
                }}
                className="flex-1 bg-slate-50 border border-slate-300 text-xs text-slate-800 rounded-xl px-3 py-2.5 focus:outline-none focus:bg-white focus:ring-1 focus:ring-emerald-700"
                defaultValue=""
              >
                <option value="" disabled>+ Click to Add Scrap Item (PCBs, AC, Laptops, Copper, Iron...)</option>
                {allAvailableItems.map(item => (
                  <option key={item.id} value={item.id}>
                    {item.name} - Rs. {item.rate}/{item.unit}
                  </option>
                ))}
              </select>
            </div>

            {/* Items List */}
            <div className="space-y-2 bg-slate-50 p-3 rounded-xl border border-slate-200">
              {selectedItems.length === 0 ? (
                <p className="text-xs text-slate-500 text-center py-4">No items selected yet. Choose items from the dropdown above.</p>
              ) : (
                selectedItems.map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between bg-white p-2.5 rounded-lg border border-slate-200 shadow-2xs">
                    <div>
                      <span className="text-xs font-bold text-slate-900 block">{item.name}</span>
                      <span className="text-[11px] text-emerald-800 font-medium">Rs. {item.rate}/{item.unit}</span>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1 bg-slate-100 rounded-md p-0.5 border border-slate-200">
                        <button 
                          type="button" 
                          onClick={() => handleUpdateQty(idx, -1)}
                          className="w-6 h-6 flex items-center justify-center text-slate-600 hover:text-slate-900 rounded hover:bg-slate-200"
                          aria-label="Decrease quantity"
                        >
                          -
                        </button>
                        <span className="w-10 text-center text-xs font-bold text-slate-900">{item.qty} {item.unit}</span>
                        <button 
                          type="button" 
                          onClick={() => handleUpdateQty(idx, 1)}
                          className="w-6 h-6 flex items-center justify-center text-slate-600 hover:text-slate-900 rounded hover:bg-slate-200"
                          aria-label="Increase quantity"
                        >
                          +
                        </button>
                      </div>

                      <button 
                        type="button"
                        onClick={() => handleRemoveItem(idx)}
                        className="text-slate-400 hover:text-red-600 text-xs px-2"
                        aria-label="Remove item"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Step 2: Photo Upload & AI Vehicle Sizing */}
          <div className="space-y-3">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-700 block">
              2. Scrap Pile Photo & Vehicle Allocation
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="relative border-2 border-dashed border-slate-300 rounded-xl p-4 text-center hover:border-emerald-700 transition bg-slate-50">
                  <input 
                    type="file" 
                    accept="image/*" 
                    onChange={handleFileUpload}
                    className="absolute inset-0 opacity-0 cursor-pointer w-full h-full" 
                  />
                  <div className="space-y-1.5 flex flex-col items-center">
                    <Upload className="w-6 h-6 text-slate-400" />
                    <span className="text-xs font-semibold text-slate-700 block">Upload photo of scrap pile</span>
                    <span className="text-[10px] text-slate-500">Helps collector dispatch the right vehicle</span>
                  </div>
                </div>

                <div className="flex gap-1.5">
                  {demoImages.map((demo, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setPhotoPreview(demo.url)}
                      className="text-[10px] px-2 py-1 bg-slate-100 hover:bg-slate-200 rounded border border-slate-200 text-slate-600 truncate flex-1"
                    >
                      {demo.label.split(' ')[0]}
                    </button>
                  ))}
                </div>
              </div>

              {/* Photo Preview & Vehicle Advice */}
              <div className="space-y-2">
                <div className="h-28 rounded-xl overflow-hidden border border-slate-200 bg-slate-100 relative flex items-center justify-center text-center p-2">
                  {photoPreview ? (
                    <>
                      <img src={photoPreview} alt="Scrap preview" className="w-full h-full object-cover" />
                      <span className="absolute bottom-1 right-1 bg-black/70 text-white text-[9px] px-1.5 py-0.5 rounded">
                        Scrap Photo
                      </span>
                    </>
                  ) : (
                    <span className="text-xs text-slate-400 font-medium">No photo uploaded yet</span>
                  )}
                </div>

                <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                  <span className="text-[10px] uppercase font-bold text-slate-500 block">Recommended Transport:</span>
                  <VehicleRecommendationBadge weightKg={totalEstWeight} customVehicleText={recommendedVehicle.label} />
                  <p className="text-[10px] text-slate-500">{recommendedVehicle.tip}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Step 3: Address & Contact */}
          <div className="space-y-3">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-700 block">
              3. Pickup Location & Slot
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="sm:col-span-2">
                <label className="text-[11px] text-slate-600 block mb-1">Pickup Address</label>
                <div className="relative">
                  <MapPin className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                  <input 
                    type="text" 
                    required
                    value={address}
                    onChange={e => setAddress(e.target.value)}
                    placeholder="House/Flat No, Apartment, Street name..."
                    className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 focus:outline-none focus:bg-white focus:ring-1 focus:ring-emerald-700"
                  />
                </div>
              </div>

              <div>
                <label className="text-[11px] text-slate-600 block mb-1">Landmark</label>
                <input 
                  type="text" 
                  value={landmark}
                  onChange={e => setLandmark(e.target.value)}
                  placeholder="Near Metro, Temple, Market..."
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 focus:outline-none focus:bg-white focus:ring-1 focus:ring-emerald-700"
                />
              </div>

              <div>
                <label className="text-[11px] text-slate-600 block mb-1">Pincode</label>
                <input 
                  type="text" 
                  value={pincode}
                  onChange={e => setPincode(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 focus:outline-none focus:bg-white focus:ring-1 focus:ring-emerald-700"
                />
              </div>

              <div>
                <label className="text-[11px] text-slate-600 block mb-1">Contact Phone</label>
                <div className="relative">
                  <Phone className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
                  <input 
                    type="text" 
                    required
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 focus:outline-none focus:bg-white focus:ring-1 focus:ring-emerald-700"
                  />
                </div>
              </div>

              <div>
                <label className="text-[11px] text-slate-600 block mb-1">Preferred Time Slot</label>
                <select 
                  value={preferredSlot}
                  onChange={e => setPreferredSlot(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 focus:outline-none focus:bg-white focus:ring-1 focus:ring-emerald-700"
                >
                  <option value="Today (Within 2 hours)">Today (Urgent / Express)</option>
                  <option value="Today, 3:00 PM - 5:00 PM">Today, 3:00 PM - 5:00 PM</option>
                  <option value="Tomorrow, 10:00 AM - 12:00 PM">Tomorrow, 10:00 AM - 12:00 PM</option>
                  <option value="Sunday Weekend Slot">Sunday Weekend Slot</option>
                </select>
              </div>

              <div className="sm:col-span-2">
                <label className="text-[11px] text-slate-600 block mb-1">Instructions for Collector</label>
                <input 
                  type="text" 
                  value={notes}
                  onChange={e => setNotes(e.target.value)}
                  placeholder="e.g. Lift is working, fragile monitor screen, dismounted AC..."
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 focus:outline-none focus:bg-white focus:ring-1 focus:ring-emerald-700"
                />
              </div>
            </div>
          </div>

          {/* Form Consent Checkbox (Item #50: Form consent) */}
          <div className="pt-2 border-t border-slate-200">
            <label className="flex items-start gap-2.5 text-xs text-slate-600 cursor-pointer">
              <input 
                type="checkbox" 
                checked={hasConsent} 
                onChange={e => setHasConsent(e.target.checked)} 
                className="mt-0.5 rounded border-slate-300 text-emerald-700 focus:ring-emerald-600"
              />
              <span>
                I certify that the scrap declared is non-hazardous consumer equipment and I agree to calibrated digital scale doorstep weighing and CPCB audit logging under the E-Waste (Management) Rules 2022.
              </span>
            </label>
          </div>

          {/* Anti-Cheating Guarantee Banner */}
          <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl flex items-center gap-3 text-xs text-slate-700">
            <ShieldCheck className="w-5 h-5 text-emerald-800 shrink-0" />
            <div>
              <span className="font-bold text-slate-900">Anti-Rigging Pledge:</span> Your assigned collector carries a calibrated digital scale and will disburse payment directly via UPI before loading items.
            </div>
          </div>

          {/* Submit Action */}
          <div className="pt-3 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 border-t border-slate-200">
            <div>
              <span className="text-[10px] text-slate-500 block uppercase font-bold tracking-wider">Est. Payout Due:</span>
              <span className="text-xl font-bold text-emerald-800">Rs. {Math.round(totalEstPayout).toLocaleString('en-IN')}</span>
            </div>

            <div className="flex items-center justify-end gap-2">
              <button 
                type="button"
                onClick={() => setIsCreatePickupModalOpen(false)}
                className="flex-1 sm:flex-initial px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold transition text-center"
              >
                Cancel
              </button>

              <button 
                type="submit"
                className="flex-1 sm:flex-initial px-6 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs rounded-xl shadow-xs transition text-center"
              >
                Confirm Pickup Booking
              </button>
            </div>
          </div>

        </form>
      </div>
    </div>
  );
}
