import React from 'react';
import { Bike, Truck } from 'lucide-react';

export default function VehicleRecommendationBadge({ weightKg, customVehicleText }) {
  let vehicleType = 'cycle';
  let label = 'Bicycle / 2-Wheeler';
  let badgeClass = 'bg-blue-50 text-blue-800 border-blue-200';
  let payloadText = 'Payload: Up to 15 kg';

  if (weightKg > 80 || (customVehicleText && customVehicleText.includes('Mini Truck'))) {
    vehicleType = 'truck';
    label = 'Mini Truck / Tempo';
    badgeClass = 'bg-purple-50 text-purple-800 border-purple-200';
    payloadText = 'Payload: 150 - 500 kg';
  } else if (weightKg > 15 || (customVehicleText && customVehicleText.includes('3-Wheeler'))) {
    vehicleType = 'eloader';
    label = '3-Wheeler E-Loader';
    badgeClass = 'bg-emerald-50 text-emerald-800 border-emerald-200';
    payloadText = 'Payload: 30 - 100 kg';
  }

  return (
    <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs font-semibold ${badgeClass}`}>
      {vehicleType === 'truck' ? (
        <Truck className="w-4 h-4 text-purple-700 shrink-0" />
      ) : vehicleType === 'eloader' ? (
        <Truck className="w-4 h-4 text-emerald-700 shrink-0" />
      ) : (
        <Bike className="w-4 h-4 text-blue-700 shrink-0" />
      )}
      <div>
        <span className="block leading-tight font-bold">{customVehicleText || label}</span>
        <span className="text-[10px] font-normal opacity-80">{payloadText}</span>
      </div>
    </div>
  );
}
