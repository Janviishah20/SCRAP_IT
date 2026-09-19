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
  // Navigation view: always starts on landing page
  const [currentView, setCurrentView] = useState('landing');

  // Auth State: ALWAYS starts signed out every time the website is opened
  const [isAuthenticated, setIsAuthenticated] = useState(false);

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
    const saved = safeStorage.getJSON('kc_pickups', []);
    if (Array.isArray(saved) && saved.some(r => r.id === 'REQ-901' || r.id === 'REQ-902' || r.id === 'REQ-900')) {
      safeStorage.setJSON('kc_pickups', []);
      return [];
    }
    return Array.isArray(saved) ? saved : [];
  });

  // Lots state
  const [recyclerLots, setRecyclerLots] = useState(() => {
    const saved = safeStorage.getJSON('kc_lots', []);
    if (Array.isArray(saved) && saved.some(l => l.id === 'LOT-EW-401' || l.id === 'LOT-EW-402' || l.id === 'LOT-EW-403')) {
      safeStorage.setJSON('kc_lots', []);
      return [];
    }
    return Array.isArray(saved) ? saved : [];
  });

  // Citizen metrics state (starts at 0, computed dynamically from actual pickups)
  const [citizenStats, setCitizenStats] = useState(() => {
    const defaultStats = {
      greenCoins: 0,
      co2SavedKg: 0,
      treesEquivalent: 0,
      landfillDivertedKg: 0,
      totalEarnedRs: 0
    };
    const saved = safeStorage.getJSON('kc_citizen_stats', defaultStats);
    if (saved && (saved.totalEarnedRs === 12850 || saved.greenCoins === 420)) {
      safeStorage.setJSON('kc_citizen_stats', defaultStats);
      return defaultStats;
    }
    return (saved && typeof saved === 'object' && saved.greenCoins !== undefined) ? saved : defaultStats;
  });

  // Kabadiwala local unbundled inventory (from completed pickups)
  const [kabadiwalaInventory, setKabadiwalaInventory] = useState(() => {
    const saved = safeStorage.getJSON('kc_kabadiwala_inv', []);
    if (Array.isArray(saved) && saved.some(i => i.id === 'inv-1' || i.id === 'inv-2' || i.id === 'inv-3')) {
      safeStorage.setJSON('kc_kabadiwala_inv', []);
      return [];
    }
    return Array.isArray(saved) ? saved : [];
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

  // Ensure every fresh website visit starts completely signed out and on the landing page
  useEffect(() => {
    safeStorage.removeItem('kc_auth');
    safeStorage.removeItem('kc_view');
  }, []);

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

  // Dynamic Document Title set to SCRAPIT so tab always displays SCRAPIT
  useEffect(() => {
    document.title = 'SCRAPIT';
  }, [currentView, currentRole]);

  // Toast Helper
  const showToast = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification(null);
    }, 4000);
  };

  // Real user custom profiles entered during login (replaces fake pre-filled AI names)
  const [customUserProfiles, setCustomUserProfiles] = useState(() => {
    return safeStorage.getJSON('kc_user_profiles', {});
  });

  useEffect(() => {
    safeStorage.setJSON('kc_user_profiles', customUserProfiles);
  }, [customUserProfiles]);

  // Find any logged-in user name across profiles as fallback
  const fallbackCustomName = customUserProfiles.citizen?.name || customUserProfiles.kabadiwala?.name || customUserProfiles.recycler?.name || '';

  // Compute active user from base role + custom real credentials
  const baseUser = MOCK_USERS[currentRole] || MOCK_USERS.citizen;
  const roleCustom = customUserProfiles[currentRole] || {};
  const resolvedDisplayName = roleCustom.name || fallbackCustomName || baseUser.name || (
    currentRole === 'citizen' ? 'Citizen' : currentRole === 'kabadiwala' ? 'Aggregator Hub' : 'Industrial Recycler'
  );

  const activeUser = {
    ...baseUser,
    ...roleCustom,
    name: resolvedDisplayName,
    businessName: roleCustom.businessName || (fallbackCustomName ? `${fallbackCustomName} Scrap Hub` : baseUser.businessName) || `${resolvedDisplayName} Scrap Hub`,
    companyName: roleCustom.companyName || (fallbackCustomName ? `${fallbackCustomName} Eco-Smelters Ltd` : baseUser.companyName) || `${resolvedDisplayName} Eco Recyclers Ltd`,
    phone: roleCustom.phone || baseUser.phone,
    email: roleCustom.email || baseUser.email
  };

  // Switch Active Stakeholder Role
  const switchRole = (newRole) => {
    setIsAuthenticated(true);
    setCurrentRole(newRole);
    setCurrentView('portal');
    safeStorage.setItem('kc_role', newRole);
    safeStorage.setItem('kc_auth', 'true');
    
    const roleLabels = {
      citizen: 'Citizen Portal',
      kabadiwala: 'Kabadiwala Hub',
      recycler: 'Industrial Recycler'
    };
    
    const targetName = customUserProfiles[newRole]?.name || fallbackCustomName || (
      newRole === 'citizen' ? 'Citizen' : newRole === 'kabadiwala' ? 'Aggregator Hub' : 'Industrial Recycler'
    );
    showToast(`Switched workspace to ${roleLabels[newRole] || newRole} (${targetName})`, 'success');
  };

  // Open Auth Page directly with a specific role
  const openAuth = (role = 'citizen') => {
    setAuthRole(role);
    setCurrentView('auth');
  };

  // Real Login with custom real credentials
  const login = (role, credentials = null) => {
    setIsAuthenticated(true);
    setCurrentRole(role);

    let resolvedName = customUserProfiles[role]?.name || MOCK_USERS[role]?.name || 'User';

    if (credentials && credentials.name && credentials.name.trim()) {
      resolvedName = credentials.name.trim();
      const updatedProfiles = {
        ...customUserProfiles,
        [role]: {
          ...(customUserProfiles[role] || {}),
          name: resolvedName,
          phone: credentials.phone || credentials.emailOrPhone || '',
          email: credentials.email || credentials.emailOrPhone || '',
          businessName: credentials.businessName || `${resolvedName} Scrap Solutions`,
          companyName: credentials.companyName || `${resolvedName} Smelters Ltd`
        }
      };
      setCustomUserProfiles(updatedProfiles);
      safeStorage.setJSON('kc_user_profiles', updatedProfiles);
    }

    setCurrentView('portal');
    showToast(`Welcome back, ${resolvedName}!`, 'success');
  };

  // Logout action
  const logout = () => {
    setIsAuthenticated(false);
    setCurrentView('landing');
    safeStorage.removeItem('kc_auth');
    safeStorage.removeItem('kc_view');
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
      citizenId: activeUser?.id || 'CIT-01',
      citizenName: activeUser?.name || pickupData.citizenName || 'Citizen',
      citizenPhone: pickupData.phone || activeUser?.phone || '',
      address: pickupData.address || activeUser?.address || '',
      landmark: pickupData.landmark || '',
      pincode: pickupData.pincode || '',
      locationCoords: { lat: 28.5355, lng: 77.3910 },
      distanceKm: parseFloat((0.8 + Math.random() * 2.5).toFixed(1)),
      preferredSlot: pickupData.preferredSlot || 'Today (Within 2 hours)',
      createdAt: 'Just now',
      status: 'pending',
      wasteType: pickupData.wasteType || 'E-Waste & Electronics',
      itemsSummary: pickupData.itemsSummary,
      estimatedTotalWeightKg: weightEst,
      estimatedPayout: payoutEst,
      vehicleRecommended: vehicleInfo.label,
      photoUrl: pickupData.photoUrl || null,
      notes: pickupData.notes || ''
    };

    setPickupRequests(prev => [newRequest, ...prev]);
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
          assignedKabadiwalaId: activeUser?.id || 'KAB-01',
          assignedKabadiwalaName: activeUser?.businessName || activeUser?.name || 'Collector Partner',
          assignedKabadiwalaPhone: activeUser?.phone || '+91 98210 99881'
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
      lotTitle: lotData.lotTitle || `Batch #${lotId}: Sorted E-Waste Lot`,
      kabadiwalaId: activeUser?.id || 'KAB-01',
      kabadiwalaName: activeUser?.businessName || activeUser?.name || 'Collector Aggregator Hub',
      kabadiwalaPhone: activeUser?.phone || '+91 98210 99881',
      location: lotData.location || activeUser?.hubAddress || activeUser?.area || 'Local Aggregator Yard',
      distanceKm: parseFloat((2.5 + Math.random() * 6).toFixed(1)),
      category: lotData.category || 'High-Grade PCBs',
      totalWeightKg: weight,
      askingRatePerKg: rate,
      totalLotPrice: weight * rate,
      purityGrade: lotData.purityGrade || 'Grade A',
      estimatedYield: {
        copperPercent: 18,
        goldGramsPerTon: 140,
        plasticsPercent: 32,
        hazardousFreeCert: 'Verified Non-Toxic Dismantled'
      },
      photoUrl: lotData.photoUrl || null,
      status: 'available',
      bids: [],
      createdAt: 'Just now',
      eprEligible: true,
      description: lotData.description || 'Segregated, verified scrap lot ready for authorized recycling.'
    };

    setRecyclerLots(prev => [newLot, ...prev]);
    setIsCreateLotModalOpen(false);
    showToast(`Lot ${lotId} published to Authorized Recycler Marketplace!`, 'success');
  };

  // Recycler Action: Place an Offer / Bid on a Lot (Awaiting Kabadiwala Acceptance)
  const placeRecyclerBid = (lotId, bidAmount, recyclerNotes = '') => {
    const amount = Number(bidAmount);
    if (!amount || amount <= 0) {
      showToast('Please enter a valid bid amount greater than 0.', 'error');
      return;
    }

    const targetLot = recyclerLots.find(l => l.id === lotId);
    const kabadiwalaName = targetLot?.kabadiwalaName || 'Aggregator';

    const newBid = {
      id: `bid-${Date.now()}`,
      recyclerId: activeUser?.id || 'REC-01',
      recyclerName: activeUser?.companyName || activeUser?.name || 'CPCB Registered Recycler',
      cpcbRegistrationNo: activeUser?.cpcbRegistrationNo || 'CPCB/E-WASTE/REG/2024/9021',
      bidAmount: amount,
      ratePerKg: targetLot?.totalWeightKg ? Math.round(amount / targetLot.totalWeightKg) : 410,
      notes: recyclerNotes || 'Pickup arranged with CPCB certified transport. Immediate Escrow settlement upon acceptance.',
      status: 'pending',
      date: 'Just now'
    };

    setRecyclerLots(prev => prev.map(lot => {
      if (lot.id === lotId) {
        const existingBids = Array.isArray(lot.bids) ? lot.bids : [];
        return {
          ...lot,
          status: 'pending_approval',
          bids: [newBid, ...existingBids]
        };
      }
      return lot;
    }));

    showToast(`Offer of Rs. ${amount.toLocaleString('en-IN')} submitted to ${kabadiwalaName}! Awaiting aggregator review & agreement.`, 'success');
  };

  // Kabadiwala Action: Accept an Offer from a Recycler (Triggers Escrow Settlement & EPR Minting)
  const acceptRecyclerBid = (lotId, bidId) => {
    const certNum = `EPR-IN-${new Date().getFullYear()}-${Math.floor(10000 + Math.random() * 90000)}`;
    let acceptedLot = null;
    let winningBid = null;

    setRecyclerLots(prev => prev.map(lot => {
      if (lot.id === lotId) {
        winningBid = (lot.bids || []).find(b => b.id === bidId) || {
          recyclerName: MOCK_USERS.recycler.companyName,
          cpcbRegistrationNo: MOCK_USERS.recycler.cpcbRegistrationNo,
          bidAmount: lot.totalLotPrice
        };

        const updatedBids = (lot.bids || []).map(b => 
          b.id === bidId ? { ...b, status: 'accepted' } : { ...b, status: 'rejected' }
        );

        acceptedLot = {
          ...lot,
          status: 'sold',
          soldTo: winningBid.recyclerName,
          soldPrice: winningBid.bidAmount,
          certificateId: certNum,
          soldDate: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
          bids: updatedBids,
          acceptedBidId: bidId
        };
        return acceptedLot;
      }
      return lot;
    }));

    if (acceptedLot && winningBid) {
      setActiveEPRModalData({
        certificateNumber: certNum,
        recycler: {
          ...MOCK_USERS.recycler,
          companyName: winningBid.recyclerName,
          cpcbRegistrationNo: winningBid.cpcbRegistrationNo || MOCK_USERS.recycler.cpcbRegistrationNo
        },
        lot: acceptedLot,
        cpcbReg: winningBid.cpcbRegistrationNo || MOCK_USERS.recycler.cpcbRegistrationNo,
        issueDate: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' }),
        co2Offset: (acceptedLot.totalWeightKg * 4.8).toFixed(1),
        heavyMetalsDiverted: (acceptedLot.totalWeightKg * 0.42).toFixed(1)
      });

      showToast(`Deal agreed! Rs. ${winningBid.bidAmount.toLocaleString('en-IN')} settled via Escrow to your account. CPCB EPR Certificate generated.`, 'success');
    }
  };

  // Kabadiwala Action: Decline an Offer from a Recycler
  const rejectRecyclerBid = (lotId, bidId) => {
    setRecyclerLots(prev => prev.map(lot => {
      if (lot.id === lotId) {
        const updatedBids = (lot.bids || []).map(b => 
          b.id === bidId ? { ...b, status: 'rejected' } : b
        );
        const hasPendingBids = updatedBids.some(b => b.status === 'pending');
        return {
          ...lot,
          status: hasPendingBids ? 'pending_approval' : 'available',
          bids: updatedBids
        };
      }
      return lot;
    }));

    showToast('Recycler offer declined. Lot remains active on the marketplace.', 'info');
  };

  // Recycler Action: Procure Lot (Submits offer to Kabadiwala for approval)
  const buyRecyclerLot = (lotId, bidPrice = null) => {
    const lot = recyclerLots.find(l => l.id === lotId);
    const amount = bidPrice || lot?.totalLotPrice || 35000;
    placeRecyclerBid(lotId, amount, 'Direct procurement request at agreed terms. Ready for Escrow dispatch.');
  };

  // Reset demo / clean state
  const resetDemoData = () => {
    setPickupRequests([]);
    setRecyclerLots([]);
    setCitizenStats({
      greenCoins: 0,
      co2SavedKg: 0,
      treesEquivalent: 0,
      landfillDivertedKg: 0,
      totalEarnedRs: 0
    });
    setKabadiwalaInventory([]);
    setCurrentView('landing');
    safeStorage.clearAppKeys();
    showToast('Platform reset: all test lots and requests cleared for clean demo!', 'info');
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
      currentUser: activeUser,
      customUserProfiles,
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
      placeRecyclerBid,
      acceptRecyclerBid,
      rejectRecyclerBid,
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
