import React from "react";

const Dice = ({ number, isHeld, holdDice }) => {
  const styles = {
    backgroundColor: isHeld ? "#59E391" : "",
  };
  return (
    <div className="dice" style={styles} onClick={holdDice}>
      <p>{number}</p>
    </div>
  );
};
export default Dice;
