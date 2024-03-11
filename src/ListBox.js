import React, { useState } from "react";

export const Box = ({children, }) => {
  const [isOpen, setIsOpen] = useState(true);
    return (
    <div className="box">
        <button
          className="btn-toggle"
          onClick={() => setIsOpen((open) => !open)}
        >
          {isOpen ? "–" : "+"}
        </button>

        {/* Add prop to children */}
        {React.Children.map(children, (child) => {
          return React.cloneElement(child, { isOpen });
        })}
      </div>
    )
}