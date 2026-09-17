// Mock Database & Seed Data for Kabadiwala Connect

export const SCRAP_CATEGORIES = [
  {
    id: 'ewaste',
    name: 'High-Value E-Waste',
    badge: 'Eco Priority',
    color: 'emerald',
    description: 'PCBs, Motherboards, Mobile phones, Laptops, CPUs, Batteries',
    items: [
      { id: 'ew_laptop', name: 'Old Laptops / Notebooks', unit: 'unit', rate: 480, note: 'Complete unit with motherboard & battery' },
      { id: 'ew_cpu', name: 'Desktop CPU Tower / Server', unit: 'unit', rate: 380, note: 'Contains gold-plated pins, PCB, SMPS' },
      { id: 'ew_pcb_grade_a', name: 'Motherboards & Green PCBs (Grade A)', unit: 'kg', rate: 390, note: 'High gold/copper recovery yield' },
      { id: 'ew_ram_cards', name: 'RAM Sticks & Expansion Cards', unit: 'kg', rate: 750, note: 'Gold-fingered premium extraction lot' },
      { id: 'ew_smartphone', name: 'Smartphones / Mobile Phones', unit: 'unit', rate: 120, note: 'Circuitry & cobalt/lithium cell' },
      { id: 'ew_li_ion', name: 'Lithium-Ion / Inverter Batteries', unit: 'kg', rate: 82, note: 'Zero landfill hazardous collection' },
      { id: 'ew_wires', name: 'Copper Cables & Insulated Wires', unit: 'kg', rate: 290, note: 'Stripped 99.9% electrolytic copper value' },
    ]
  },
  {
    id: 'appliances',
    name: 'Heavy Appliances',
    badge: 'Bulky Pickup',
    color: 'blue',
    description: 'ACs, Refrigerators, Washing machines, Microwaves, Coolers',
    items: [
      { id: 'app_split_ac', name: 'Split / Window AC (1.5 Ton)', unit: 'unit', rate: 4600, note: 'Compressor, aluminium fins & copper coils' },
      { id: 'app_fridge_double', name: 'Double Door Refrigerator', unit: 'unit', rate: 1350, note: 'Compressor, metal chassis & copper pipe' },
      { id: 'app_washing_auto', name: 'Washing Machine (Automatic)', unit: 'unit', rate: 1150, note: 'Motor, iron frame & pump' },
      { id: 'app_geyser', name: 'Water Heater / Geyser', unit: 'kg', rate: 24, note: 'Copper/steel inner tank' },
      { id: 'app_iron_cooler', name: 'Iron Desert Cooler with Motor', unit: 'unit', rate: 650, note: 'Heavy gauge steel & motor' },
    ]
  },
  {
    id: 'dry_scrap',
    name: 'Recyclable Metals & Dry Scrap',
    badge: 'Standard',
    color: 'amber',
    description: 'Iron, Brass, Copper, Aluminium, Paper, Cardboard',
    items: [
      { id: 'met_pure_copper', name: 'Pure Red Copper Scrap', unit: 'kg', rate: 510, note: 'Transparent digital scale weight guarantee' },
      { id: 'met_brass', name: 'Brass (Peetal) Utensils / Hardware', unit: 'kg', rate: 320, note: 'Alloy metal value' },
      { id: 'met_aluminium', name: 'Aluminium Sheets / Utensils', unit: 'kg', rate: 115, note: 'Clean scrap recovery' },
      { id: 'met_iron', name: 'Iron / Steel Scrap (Loha)', unit: 'kg', rate: 26, note: 'No spring scale tampering' },
      { id: 'dry_cardboard', name: 'Cardboard / Corrugated Boxes', unit: 'kg', rate: 8.5, note: 'Clean and dry packaging paper' },
      { id: 'dry_newspaper', name: 'Old Newspapers (Raddi)', unit: 'kg', rate: 13, note: 'Tied bundles' },
    ]
  }
];

export const INITIAL_PICKUP_REQUESTS = [
  {
    id: 'REQ-901',
    citizenName: 'Rahul Sharma',
    citizenPhone: '+91 98101 23456',
    address: 'Flat 402, Lotus Greens, Sector 78, Noida, UP',
    landmark: 'Near Mahagun Mart',
    pincode: '201305',
    coordinates: { lat: 28.5672, lng: 77.3892 },
    distanceKm: 1.4,
    preferredSlot: 'Today, 3:00 PM - 5:00 PM',
    createdAt: '10 mins ago',
    status: 'pending', // 'pending' | 'accepted' | 'in_progress' | 'completed' | 'cancelled'
    wasteType: 'E-Waste & Appliances',
    itemsSummary: [
      { itemId: 'ew_laptop', name: 'Old Laptops', qty: 2, unit: 'unit', estRate: 480 },
      { itemId: 'ew_cpu', name: 'Old Desktop CPU', qty: 1, unit: 'unit', estRate: 380 },
      { itemId: 'ew_wires', name: 'Old Cable Wires', qty: 4, unit: 'kg', estRate: 290 },
    ],
    estimatedTotalWeightKg: 18,
    estimatedPayout: 2500,
    photoUrl: 'https://images.unsplash.com/photo-1550009158-9ebf69173e03?auto=format&fit=crop&w=600&q=80',
    assignedKabadiwalaId: null,
    actualWeightKg: null,
    finalAmountPaid: null,
    vehicleRecommended: '3-Wheeler E-Loader (Payload: Up to 100kg)',
    notes: 'Please bring digital weighing scale for the copper cables.'
  },
  {
    id: 'REQ-902',
    citizenName: 'Priya Mehra',
    citizenPhone: '+91 98712 34567',
    address: 'H-14, Green Park Extension, New Delhi',
    landmark: 'Near Metro Gate No. 2',
    pincode: '110016',
    coordinates: { lat: 28.5589, lng: 77.2028 },
    distanceKm: 2.8,
    preferredSlot: 'Tomorrow, 10:00 AM - 12:00 PM',
    status: 'pending',
    wasteType: 'Heavy E-Waste & Refrigerator',
    itemsSummary: [
      { itemId: 'app_split_ac', name: 'Split AC (1.5 Ton)', qty: 1, unit: 'unit', estRate: 4600 },
      { itemId: 'ew_li_ion', name: 'Inverter Batteries', qty: 35, unit: 'kg', estRate: 82 },
    ],
    estimatedTotalWeightKg: 75,
    estimatedPayout: 7470,
    photoUrl: 'https://images.unsplash.com/photo-1588854337236-6889d631faa8?auto=format&fit=crop&w=600&q=80',
    assignedKabadiwalaId: null,
    actualWeightKg: null,
    finalAmountPaid: null,
    vehicleRecommended: 'Mini Truck / Commercial Tempo (Payload: 200kg+)',
    notes: 'Lift is available. AC is already dismounted.'
  },
  {
    id: 'REQ-900',
    citizenName: 'Anil Verma',
    citizenPhone: '+91 99112 88776',
    address: 'B-32, Lajpat Nagar III, New Delhi',
    landmark: 'Behind Central Market',
    pincode: '110024',
    coordinates: { lat: 28.5701, lng: 77.2405 },
    distanceKm: 0.8,
    preferredSlot: 'Completed Today',
    status: 'completed',
    wasteType: 'Computer Hardware Scrap',
    itemsSummary: [
      { itemId: 'ew_pcb_grade_a', name: 'Motherboards & PCBs', qty: 12, unit: 'kg', estRate: 390 },
      { itemId: 'ew_smartphone', name: 'Old Feature Phones', qty: 4, unit: 'unit', estRate: 120 }
    ],
    estimatedTotalWeightKg: 14,
    estimatedPayout: 5160,
    photoUrl: 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?auto=format&fit=crop&w=600&q=80',
    assignedKabadiwalaId: 'KAB-01',
    actualWeightKg: 13.8,
    finalAmountPaid: 5080,
    vehicleRecommended: 'Bicycle / Motorized Two-Wheeler',
    notes: 'Weighed in front of customer using Digital Bluetooth Scale #DS-44.'
  }
];

export const INITIAL_RECYCLER_LOTS = [
  {
    id: 'LOT-EW-401',
    lotTitle: 'Grade-A Mixed PCB Motherboards & Server Circuitry',
    kabadiwalaId: 'KAB-01',
    kabadiwalaName: 'Ramesh Scrap Aggregators',
    kabadiwalaPhone: '+91 98210 99881',
    location: 'Okhla Industrial Area Ph-2, New Delhi',
    distanceKm: 4.2,
    category: 'Printed Circuit Boards (PCBs)',
    totalWeightKg: 85,
    askingRatePerKg: 420,
    totalLotPrice: 35700,
    purityGrade: 'Grade A (High Gold/Copper Pins)',
    estimatedYield: {
      copper: '14.2 kg (16.7%)',
      preciousMetals: '185 ppm (Gold/Silver/Palladium)',
      aluminum: '9.5 kg (11.1%)',
      hazardousFreeCert: 'Verified Non-Toxic Dismantled'
    },
    photoUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80',
    status: 'available', // 'available' | 'bid_placed' | 'sold'
    bids: [
      { id: 'b1', recyclerName: 'EcoGreen Smelters Ltd', bidAmount: 34500, date: '1 hr ago' }
    ],
    createdAt: 'Today, 11:30 AM',
    eprEligible: true,
    description: 'Sorted, stripped server & desktop motherboards with zero plastic casings. Heavy gold-plated connectors intact.'
  },
  {
    id: 'LOT-EW-402',
    lotTitle: 'Telecom Grade Li-Ion & Inverter Lead Acid Batteries Lot',
    kabadiwalaId: 'KAB-02',
    kabadiwalaName: 'Delhi Green Waste Hub',
    kabadiwalaPhone: '+91 97115 44332',
    location: 'Mayapuri Scrap Yard, New Delhi',
    distanceKm: 9.6,
    category: 'Batteries & Hazardous Energy Cells',
    totalWeightKg: 240,
    askingRatePerKg: 95,
    totalLotPrice: 22800,
    purityGrade: 'Intact Industrial Cells (Zero Leakage)',
    estimatedYield: {
      leadCobalt: '168 kg (70% recoverable)',
      acidElectrolyte: 'Neutralized Safe Drain',
      plasticsChassis: '32 kg (13.3%)',
      hazardousFreeCert: 'CPCB Transport Norms Compliant'
    },
    photoUrl: 'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&w=800&q=80',
    status: 'available',
    bids: [],
    createdAt: 'Yesterday, 4:15 PM',
    eprEligible: true,
    description: 'Bulk lot collected from residential inverter replacements and commercial power backups. Tested no swelling.'
  },
  {
    id: 'LOT-EW-403',
    lotTitle: 'High-Purity Heavy Copper Windings & Electric Motors',
    kabadiwalaId: 'KAB-01',
    kabadiwalaName: 'Ramesh Scrap Aggregators',
    kabadiwalaPhone: '+91 98210 99881',
    location: 'Okhla Industrial Area Ph-2, New Delhi',
    distanceKm: 4.2,
    category: 'Copper Windings & Electric Coils',
    totalWeightKg: 65,
    askingRatePerKg: 530,
    totalLotPrice: 34450,
    purityGrade: '99.2% Electrolytic Red Copper',
    estimatedYield: {
      copper: '61.5 kg (94.6%)',
      ironStator: '3.5 kg',
      hazardousFreeCert: 'Pure Metal - Non Hazardous'
    },
    photoUrl: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80',
    status: 'sold',
    soldTo: 'Bharat Recycling Technologies Ltd',
    soldPrice: 34000,
    certificateId: 'EPR-IN-2026-9932',
    createdAt: '2 days ago',
    eprEligible: true,
    description: 'Extracted clean copper coils from AC compressors, induction motors and ceiling fans.'
  }
];

export const MOCK_USERS = {
  citizen: {
    id: 'CIT-01',
    name: 'Rahul Sharma',
    role: 'citizen',
    email: 'rahul.s@connect.in',
    phone: '+91 98101 23456',
    address: 'Flat 402, Lotus Greens, Sector 78, Noida',
    greenCoins: 420,
    co2SavedKg: 58.4,
    treesEquivalent: 2.9,
    landfillDivertedKg: 124.0
  },
  kabadiwala: {
    id: 'KAB-01',
    name: 'Ramesh Kumar',
    businessName: 'Ramesh Scrap Aggregators',
    role: 'kabadiwala',
    email: 'ramesh.scrap@connect.in',
    phone: '+91 98210 99881',
    hubAddress: 'Shed 12, Okhla Phase 2, New Delhi',
    rating: 4.9,
    completedPickupsCount: 312,
    verifiedDigitalScale: 'DS-44 (Govt Calibrated)',
    activeVehicle: 'E-Loader 3-Wheeler (DL 1ER 4921)'
  },
  recycler: {
    id: 'REC-01',
    name: 'Vikramaditya Singhania',
    companyName: 'Bharat Eco-Recyclers & Smelters Ltd',
    role: 'recycler',
    email: 'vikram@bharatecorecyclers.com',
    cpcbRegistrationNo: 'CPCB/E-WASTE/REG/2024/9021',
    licenseStatus: 'Authorized Grade-1 Smelter',
    factoryLocation: 'RIICO Industrial Area, Bhiwadi & Okhla Delhi',
    monthlyCapacityTons: 450,
    totalLotsPurchased: 48,
    totalEPRCreditsGenerated: 1840
  }
};
