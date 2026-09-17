// Mock Database & Seed Data for SCRAPIT

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

export const INITIAL_PICKUP_REQUESTS = [];

export const INITIAL_RECYCLER_LOTS = [];

export const MOCK_USERS = {
  citizen: {
    id: 'CIT-01',
    name: '',
    role: 'citizen',
    email: '',
    phone: '',
    address: '',
    area: '',
    greenCoins: 0,
    co2SavedKg: 0,
    treesEquivalent: 0,
    landfillDivertedKg: 0
  },
  kabadiwala: {
    id: 'KAB-01',
    name: '',
    businessName: '',
    role: 'kabadiwala',
    email: '',
    phone: '',
    hubAddress: '',
    area: '',
    rating: 5.0,
    completedPickupsCount: 0,
    verifiedDigitalScale: 'DS-44 (Govt Calibrated)',
    activeVehicle: 'E-Loader 3-Wheeler'
  },
  recycler: {
    id: 'REC-01',
    name: '',
    companyName: '',
    role: 'recycler',
    email: '',
    phone: '',
    cpcbRegistrationNo: 'CPCB/E-WASTE/REG/2024/9021',
    licenseStatus: 'Authorized Grade-1 Smelter',
    factoryLocation: '',
    monthlyCapacityTons: 500,
    totalLotsPurchased: 0,
    totalEPRCreditsGenerated: 0
  }
};
