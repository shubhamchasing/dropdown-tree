import React, { Component } from "react";
import { useState } from "react";



const Checkbox = ({ name }) => {
  const [isChecked, setIsChecked] = useState(false);

  return (
    <>
      <div className="container">
        <i className="arrow-right"/>
        <input
          type="checkbox"
          checked={isChecked}
          onChange={() => {
            setIsChecked(!isChecked);
          }}
        />
        {name}
      </div>
    </>
  );
};

export default Checkbox;
