import React, { useState } from 'react';
import './MembershipPage.css'; // Import CSS for styling

const MembershipPage = () => {
  const [selectedMembership, setSelectedMembership] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  const handleBuyClick = (membershipType) => {
    setSelectedMembership(membershipType);
    setShowPopup(true);
  };

  const confirmPurchase = () => {
    // Perform purchase or send selected membership type to backend here
    console.log(`Confirmed Purchase of ${selectedMembership} Membership`);
    setShowPopup(false);
  };

  const cancelPurchase = () => {
    setSelectedMembership(null);
    setShowPopup(false);
  };

  return (
    <div className="membership-page">
      <h2>Choose Your Membership</h2>
      <div className="membership-options">
        <div className="membership-option">
          <h3>Standard Membership</h3>
          <button onClick={() => handleBuyClick('Standard')}>Buy</button>
        </div>
        <div className="membership-option">
          <h3>Premium Membership</h3>
          <button onClick={() => handleBuyClick('Premium')}>Buy</button>
        </div>
        <div className="membership-option">
          <h3>Elite Membership</h3>
          <button onClick={() => handleBuyClick('Elite')}>Buy</button>
        </div>
      </div>
      {showPopup && (
        <div className="popup">
          <div className="popup-content">
            <p>Are you sure you want to purchase {selectedMembership} membership?</p>
            <div className="popup-buttons">
              <button onClick={confirmPurchase}>Yes</button>
              <button onClick={cancelPurchase}>No</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MembershipPage;
