import React from 'react';

const loaderStyles = {
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "30px",
    textTransform: "uppercase",
  };

export const Loader = () => {
    return (
        <div style={loaderStyles}>
            <p>Loading...</p>
        </div>
    )
}

