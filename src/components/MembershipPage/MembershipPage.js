import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './MembershipPage.css'; // Import CSS for styling

const MembershipPage = ({ customerId }) => {
  const [selectedMembership, setSelectedMembership] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');
  const [Cost, setCost] = useState(0);
  const [Discount, setDiscount] = useState(0);
  const [isDisabled, setIsDisabled] = useState(false);
  const [membershipType, setMembershipType] = useState('');


  useEffect(() => {
    const fetchMembership = async () => {
      try {
        const response = await axios.get(`http://localhost:5095/api/ZooDb/GetMemberships?customerId=${customerId}`);
        //console.log("Membership type:", response.data.MembershipType);
        console.log("Membership type:", response.data.MembershipType);
        setMembershipType(response.data.MembershipType);



      } catch (error) {
        console.error('Failed to fetch new memberships:', error);
      }
    };

    fetchMembership();
  }, [customerId]); 

  

  useEffect(() => {
    // Check if the membershipType is one of the three tiers
    if (['Tier 1', 'Tier 2', 'Tier 3'].includes(membershipType)) {
      setIsDisabled(true);
      alert('You already have a membership.');
    } else {
      setIsDisabled(false);
      setShowPopup(false);
    }
  }, [membershipType]);

  const handleBuyClick = (membershipType) => {
    if (!isDisabled) {
      setSelectedMembership(membershipType);
      setPopupMessage(`Are you sure you want to purchase ${membershipType} membership?`);
      setShowPopup(true);
    }
  };

  const confirmPurchase = async () => {
    console.log(`Confirmed Purchase of ${selectedMembership} Membership`);
    let discountValue = 0;
    let costValue = 0;

    if (selectedMembership === "Tier 1") {
      discountValue = 10;
      costValue = 100;
    } else if (selectedMembership === "Tier 2") {
      discountValue = 20;
      costValue = 200;
    } else if (selectedMembership === "Tier 3") {
      discountValue = 30;
      costValue = 300;
    }

    setDiscount(discountValue);
    setCost(costValue);

    const orderDate = new Date();
    const orderDateString = orderDate.toISOString().substr(0, 10);

    const data = {
      customerId: customerId,
      selectedMembership: selectedMembership,
      Cost: costValue,
      Discount: discountValue,
      orderDateString: orderDateString
    };

    console.log("Data to be sent:", data);
    
    try {
      const response = await axios.post('http://localhost:5095/api/ZooDb/NewMembership', data);
      console.log(response);
      setShowPopup(false);
    } catch (error) {
      console.error('Error during membership purchase:', error);
    }
  };

  const cancelPurchase = () => {
    setSelectedMembership(null);
    setShowPopup(false);
  };

  return (
    <div className="membership-page">
      <h2>Choose Your Membership</h2>
      <div className="membership-options">
        {['Tier 1 /100$', 'Tier 2 /200$', 'Tier 3 /300$'].map((tier, index) => (
          <div key={index} className="membership-option">
            <h3>{tier}</h3>
            <button onClick={() => handleBuyClick(tier)} disabled={isDisabled}>Buy</button>
          </div>
        ))}
      </div>
      {showPopup && (
        <div className="popup">
          <div className="popup-content">
            <p>{popupMessage}</p>
            {!isDisabled && (
              <div className="popup-buttons">
                <button onClick={confirmPurchase}>Yes</button>
                <button onClick={cancelPurchase}>No</button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default MembershipPage;
