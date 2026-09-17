import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  SCRAP_CATEGORIES, 
  INITIAL_PICKUP_REQUESTS, 
  INITIAL_RECYCLER_LOTS, 
  MOCK_USERS 
} from '../types/data';
import { safeStorage } from '../utils/storage';

const AppContext = createContext();

export function AppProvider({ children }) {
  // Navigation view: 'portal' | 'auth' | 'landing' | 'not_found'
  const [currentView, setCurrentView] = useState(() => {
    const validViews = ['portal', 'auth', 'landing', 'not_found'];
    const saved = safeStorage.getItem('kc_view');
    // Default to 'landing' so the landing page is the first page seen
    return validViews.includes(saved) ? saved : 'landing';
  });

  // Auth State
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return safeStorage.getJSON('kc_auth', true); // Default true so user can test immediately
  });

  // Current active portal / role: 'citizen' | 'kabadiwala' | 'recycler'
  const [currentRole, setCurrentRole] = useState(() => {
    const validRoles = ['citizen', 'kabadiwala', 'recycler'];
    const saved = safeStorage.getItem('kc_role');
    return validRoles.includes(saved) ? saved : 'citizen';
  });

  // Active role selected in the Auth Portal
  const [authRole, setAuthRole] = useState('citizen');

  // Requests state
  const [pickupRequests, setPickupRequests] = useState(() => {
    const saved = safeStorage.getJSON('kc_pickups', INITIAL_PICKUP_REQUESTS);
    return Array.isArray(saved) && saved.length > 0 ? saved : INITIAL_PICKUP_REQUESTS;
  });

  // Lots state
  const [recyclerLots, setRecyclerLots] = useState(() => {
    const saved = safeStorage.getJSON('kc_lots', INITIAL_RECYCLER_LOTS);
    return Array.isArray(saved) && saved.length > 0 ? saved : INITIAL_RECYCLER_LOTS;
  });

  // Citizen metrics state
  const [citizenStats, setCitizenStats] = useState(() => {
    const defaultStats = {
      greenCoins: 420,
      co2SavedKg: 58.4,
      treesEquivalent: 2.9,
      landfillDivertedKg: 124.0,
      totalEarnedRs: 12850
    };
    const saved = safeStorage.getJSON('kc_citizen_stats', defaultStats);
    return (saved && typeof saved === 'object' && saved.greenCoins !== undefined) ? saved : defaultStats;
  });

  // Kabadiwala local unbundled inventory (from completed pickups)
  const [kabadiwalaInventory, setKabadiwalaInventory] = useState(() => {
    const defaultInv = [
      { id: 'inv-1', title: 'Collected Server PCBs & Telecom Boards', weightKg: 45, estValue: 17500, category: 'PCBs' },
      { id: 'inv-2', title: 'Mixed Heavy Copper Motors & AC Coils', weightKg: 30, estValue: 15300, category: 'Copper' },
      { id: 'inv-3', title: 'Lithium & Lead-Acid Cells (Intact)', weightKg: 80, estValue: 6560, category: 'Batteries' },
    ];
    const saved = safeStorage.getJSON('kc_kabadiwala_inv', defaultInv);
    return Array.isArray(saved) ? saved : defaultInv;
  });

  // Modals state
  const [isRateModalOpen, setIsRateModalOpen] = useState(false);
  const [isCreatePickupModalOpen, setIsCreatePickupModalOpen] = useState(false);
  const [isCreateLotModalOpen, setIsCreateLotModalOpen] = useState(false);
  const [isWeighingModalOpen, setIsWeighingModalOpen] = useState(false);
  const [activeRequestForWeighing, setActiveRequestForWeighing] = useState(null);
  const [activeEPRModalData, setActiveEPRModalData] = useState(null);
  const [notification, setNotification] = useState(null);

  // Legal Modal State (T&C and Privacy Policy - Items #26, #27, #48)
  const [isLegalModalOpen, setIsLegalModalOpen] = useState(false);
  const [legalModalTab, setLegalModalTab] = useState('privacy');

  const openLegalModal = (tab = 'privacy') => {
    setLegalModalTab(tab);
    setIsLegalModalOpen(true);
  };

  const closeLegalModal = () => {
    setIsLegalModalOpen(false);
  };

  // Sync to safeStorage
  useEffect(() => {
    safeStorage.setItem('kc_role', currentRole);
  }, [currentRole]);

  useEffect(() => {
    safeStorage.setJSON('kc_auth', isAuthenticated);
  }, [isAuthenticated]);

  useEffect(() => {
    safeStorage.setItem('kc_view', currentView);
  }, [currentView]);

  useEffect(() => {
    safeStorage.setJSON('kc_pickups', pickupRequests);
  }, [pickupRequests]);

  useEffect(() => {
    safeStorage.setJSON('kc_lots', recyclerLots);
  }, [recyclerLots]);

  useEffect(() => {
    safeStorage.setJSON('kc_citizen_stats', citizenStats);
  }, [citizenStats]);

  useEffect(() => {
    safeStorage.setJSON('kc_kabadiwala_inv', kabadiwalaInventory);
  }, [kabadiwalaInventory]);

  // Dynamic Document Title based on active context (Item #34: Fix page titles)
  useEffect(() => {
    if (currentView === 'landing') {
      document.title = 'Kabadiwala Connect | Verified Doorstep Scrap & Circular E-Waste Platform';
    } else if (currentView === 'auth') {
      document.title = 'Sign In | Kabadiwala Connect';
    } else if (currentView === 'not_found') {
      document.title = '404 - Page Not Found | Kabadiwala Connect';
    } else {
      const titles = {
        citizen: 'Citizen Portal | Kabadiwala Connect',
        kabadiwala: 'Collector Partner Hub | Kabadiwala Connect',
        recycler: 'Authorized Recycler B2B Exchange | Kabadiwala Connect'
      };
      document.title = titles[currentRole] || 'Kabadiwala Connect';
    }
  }, [currentView, currentRole]);

  // Toast Helper
  const showToast = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification(null);
    }, 4000);
  };

  // Switch Active Stakeholder Role
  const switchRole = (newRole) => {
    setCurrentRole(newRole);
    setCurrentView('portal');
    showToast(`Switched view to ${MOCK_USERS[newRole].roleTitle}`);
  };

  // Open Auth Page directly with a specific role
  const openAuth = (role = 'citizen') => {
    setAuthRole(role);
    setCurrentView('auth');
  };

  // Login simulation
  const login = (role) => {
    setIsAuthenticated(true);
    setCurrentRole(role);
    setCurrentView('portal');
    showToast(`Welcome back, ${MOCK_USERS[role].name}!`, 'success');
  };

  // Logout simulation
  const logout = () => {
    setIsAuthenticated(false);
    setCurrentView('landing');
    showToast('Signed out of session.', 'info');
  };

  // Helper to compute vehicle recommendation from estimated weight
  const calculateVehicle = (estTotalWeightKg) => {
    if (estTotalWeightKg < 15) {
      return {
        type: 'bicycle',
        label: 'Bicycle / Backpack Collector',
        capacityKg: 'Up to 15 kg',
        tip: 'Ideal for small electronics, mobile phones, or lightweight wiring.'
      };
    } else if (estTotalWeightKg <= 60) {
      return {
        type: 'erickshaw',
        label: '3-Wheeler E-Rickshaw / Cart',
        capacityKg: '15 - 60 kg',
        tip: 'Recommended for laptops, CRT/LED monitors, and medium scrap bundles.'
      };
    } else {
      return {
        type: 'truck',
        label: 'Mini Commercial Truck (Tata Ace / E-Loader)',
        capacityKg: '60 - 500+ kg',
        tip: 'Required for commercial servers, air conditioners, and bulky appliances.'
      };
    }
  };

  // Citizen Action: Create new pickup
  const createPickupRequest = (pickupData) => {
    const newId = `REQ-${Math.floor(100 + Math.random() * 900)}`;
    const weightEst = pickupData.itemsSummary.reduce((sum, i) => sum + (i.qty * (i.estWeight || 2)), 0);
    const payoutEst = pickupData.itemsSummary.reduce((sum, i) => sum + (i.qty * (i.rate || 0)), 0);
    const vehicleInfo = calculateVehicle(weightEst);

    const newRequest = {
      id: newId,
      citizenId: 'CIT-01',
      citizenName: MOCK_USERS.citizen.name,
      citizenPhone: pickupData.phone || MOCK_USERS.citizen.phone,
      address: pickupData.address,
      landmark: pickupData.landmark,
      pincode: pickupData.pincode,
      locationCoords: { lat: 28.5355, lng: 77.3910 },
      distanceKm: parseFloat((0.8 + Math.random() * 2.5).toFixed(1)),
      preferredSlot: pickupData.preferredSlot || 'Tomorrow, 10:00 AM - 1:00 PM',
      createdAt: 'Just now',
      status: 'pending',
      wasteType: pickupData.wasteType || 'E-Waste & Electronics',
      itemsSummary: pickupData.itemsSummary,
      estimatedTotalWeightKg: weightEst,
      estimatedPayout: payoutEst,
      vehicleRecommended: vehicleInfo.label,
      photoUrl: pickupData.photoUrl || 'https://images.unsplash.com/photo-1550009158-9ebf69173e03?auto=format&fit=crop&w=600&q=80',
      notes: pickupData.notes || 'Please call 15 minutes before arrival.'
    };

    setPickupRequests([newRequest, ...pickupRequests]);
    showToast(`Pickup request ${newId} scheduled successfully!`, 'success');
    setIsCreatePickupModalOpen(false);
  };

  // Kabadiwala Action: Accept request
  const acceptPickupRequest = (requestId) => {
    setPickupRequests(prev => prev.map(req => {
      if (req.id === requestId) {
        return {
          ...req,
          status: 'accepted',
          assignedKabadiwalaId: MOCK_USERS.kabadiwala.id,
          assignedKabadiwalaName: MOCK_USERS.kabadiwala.businessName,
          assignedKabadiwalaPhone: MOCK_USERS.kabadiwala.phone
        };
      }
      return req;
    }));
    showToast(`Accepted pickup ${requestId}! Customer notified.`, 'success');
  };

  // Kabadiwala Action: Open Doorstep Digital Weighing Scale
  const openWeighingScale = (request) => {
    setActiveRequestForWeighing(request);
    setIsWeighingModalOpen(true);
  };

  // Kabadiwala Action: Complete Pickup with verified weight & UPI payout
  const completePickup = (requestId, actualWeightKg, finalAmountPaid, paymentRef, selectedItemsBreakdown) => {
    setPickupRequests(prev => prev.map(req => {
      if (req.id === requestId) {
        return {
          ...req,
          status: 'completed',
          actualWeightKg,
          finalAmountPaid,
          paymentRef,
          completedAt: 'Just now',
          verifiedBreakdown: selectedItemsBreakdown
        };
      }
      return req;
    }));

    // Add to Kabadiwala's inventory for Lot creation
    const newInvItem = {
      id: `inv-${Date.now()}`,
      title: `Doorstep Collection #${requestId}`,
      weightKg: actualWeightKg,
      estValue: Math.round(finalAmountPaid * 1.25),
      category: 'E-Waste Mixed'
    };
    setKabadiwalaInventory(prev => [newInvItem, ...prev]);

    // Update citizen eco-scorecard
    setCitizenStats(prev => ({
      ...prev,
      greenCoins: prev.greenCoins + Math.round(actualWeightKg * 10),
      co2SavedKg: parseFloat((prev.co2SavedKg + actualWeightKg * 1.8).toFixed(1)),
      landfillDivertedKg: parseFloat((prev.landfillDivertedKg + actualWeightKg).toFixed(1)),
      totalEarnedRs: prev.totalEarnedRs + finalAmountPaid
    }));

    setIsWeighingModalOpen(false);
    setActiveRequestForWeighing(null);
    showToast(`Pickup #${requestId} Completed! Rs. ${finalAmountPaid} transferred via UPI.`, 'success');
  };

  // Kabadiwala Action: Create a Recycler Lot for B2B Marketplace
  const createRecyclerLot = (lotData) => {
    const lotId = `LOT-EW-${Math.floor(500 + Math.random() * 500)}`;
    const weight = Number(lotData.totalWeightKg) || 50;
    const rate = Number(lotData.askingRatePerKg) || 350;

    const newLot = {
      id: lotId,
      lotTitle: lotData.lotTitle || `Batch #${lotId}: High-Yield Electronics`,
      kabadiwalaId: MOCK_USERS.kabadiwala.id,
      kabadiwalaName: MOCK_USERS.kabadiwala.businessName,
      kabadiwalaPhone: MOCK_USERS.kabadiwala.phone,
      location: lotData.location || MOCK_USERS.kabadiwala.hubAddress,
      distanceKm: parseFloat((2.5 + Math.random() * 6).toFixed(1)),
      category: lotData.category || 'High-Grade PCBs',
      totalWeightKg: weight,
      askingRatePerKg: rate,
      totalLotPrice: weight * rate,
      purityGrade: lotData.purityGrade || 'Grade A (Telecom/Server Motherboards)',
      estimatedYield: {
        copperPercent: 18,
        goldGramsPerTon: 140,
        plasticsPercent: 32,
        hazardousFreeCert: 'Verified Non-Toxic Dismantled'
      },
      photoUrl: lotData.photoUrl || 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80',
      status: 'available',
      bids: [],
      createdAt: 'Just now',
      eprEligible: true,
      description: lotData.description || 'Segregated, verified e-waste ready for smelter / industrial refinery.'
    };

    setRecyclerLots([newLot, ...recyclerLots]);
    setIsCreateLotModalOpen(false);
    showToast(`Lot ${lotId} published to Authorized Recycler Marketplace!`, 'success');
  };

  // Recycler Action: Buy Lot & Generate EPR Certificate
  const buyRecyclerLot = (lotId, bidPrice = null) => {
    const certNum = `EPR-IN-${new Date().getFullYear()}-${Math.floor(10000 + Math.random() * 90000)}`;
    
    let boughtLot = null;
    setRecyclerLots(prev => prev.map(lot => {
      if (lot.id === lotId) {
        boughtLot = {
          ...lot,
          status: 'sold',
          soldTo: MOCK_USERS.recycler.companyName,
          soldPrice: bidPrice || lot.totalLotPrice,
          certificateId: certNum,
          soldDate: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
        };
        return boughtLot;
      }
      return lot;
    }));

    if (boughtLot) {
      setActiveEPRModalData({
        certificateNumber: certNum,
        recycler: MOCK_USERS.recycler,
        lot: boughtLot,
        cpcbReg: MOCK_USERS.recycler.cpcbRegistrationNo,
        issueDate: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' }),
        co2Offset: (boughtLot.totalWeightKg * 4.8).toFixed(1),
        heavyMetalsDiverted: (boughtLot.totalWeightKg * 0.42).toFixed(1)
      });
      showToast(`Lot ${lotId} procured! CPCB EPR Certificate generated.`, 'success');
    }
  };

  // Reset demo
  const resetDemoData = () => {
    setPickupRequests(INITIAL_PICKUP_REQUESTS);
    setRecyclerLots(INITIAL_RECYCLER_LOTS);
    setCitizenStats({
      greenCoins: 420,
      co2SavedKg: 58.4,
      treesEquivalent: 2.9,
      landfillDivertedKg: 124.0,
      totalEarnedRs: 12850
    });
    setKabadiwalaInventory([
      { id: 'inv-1', title: 'Collected Server PCBs & Telecom Boards', weightKg: 45, estValue: 17500, category: 'PCBs' },
      { id: 'inv-2', title: 'Mixed Heavy Copper Motors & AC Coils', weightKg: 30, estValue: 15300, category: 'Copper' },
      { id: 'inv-3', title: 'Lithium & Lead-Acid Cells (Intact)', weightKg: 80, estValue: 6560, category: 'Batteries' },
    ]);
    setCurrentView('landing');
    safeStorage.clearAppKeys();
    showToast('Platform data reset to landing page and default scenario!', 'info');
  };

  return (
    <AppContext.Provider value={{
      currentView,
      setCurrentView,
      isAuthenticated,
      setIsAuthenticated,
      currentRole,
      switchRole,
      authRole,
      setAuthRole,
      openAuth,
      login,
      logout,
      currentUser: MOCK_USERS[currentRole] || MOCK_USERS.citizen,
      allUsers: MOCK_USERS,
      categories: SCRAP_CATEGORIES,
      pickupRequests,
      recyclerLots,
      citizenStats,
      kabadiwalaInventory,
      createPickupRequest,
      acceptPickupRequest,
      openWeighingScale,
      completePickup,
      createRecyclerLot,
      buyRecyclerLot,
      resetDemoData,
      isRateModalOpen,
      setIsRateModalOpen,
      isCreatePickupModalOpen,
      setIsCreatePickupModalOpen,
      isCreateLotModalOpen,
      setIsCreateLotModalOpen,
      isWeighingModalOpen,
      setIsWeighingModalOpen,
      activeRequestForWeighing,
      activeEPRModalData,
      setActiveEPRModalData,
      notification,
      showToast,
      calculateVehicle,
      isLegalModalOpen,
      legalModalTab,
      openLegalModal,
      closeLegalModal
    }}>
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => useContext(AppContext);
