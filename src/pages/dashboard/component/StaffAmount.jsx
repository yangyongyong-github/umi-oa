import React from 'react';

const StaffAmount = ({ title, amount, styleData }) => {
  return (
    <div className="staff-amount-container" style={{ ...styleData }}>
      <div className="staff-amount_title">{title}</div>
      <div className="staff-amount_content">
        <div className="staff-amount_number">{amount}</div>
        <div className="staff-amount_txt">人</div>
      </div>
    </div>
  );
};

export default StaffAmount;
