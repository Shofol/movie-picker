import React, { useEffect, useState } from "react";
import Image from "next/image";

const Loader = ({ showLoader }) => {
  useEffect(() => {
    if (showLoader) {
      document.body.style.maxHeight = "100vh";
      document.body.style.overflowY = "hidden";
    } else {
      document.body.style.maxHeight = "auto";
      document.body.style.overflowY = "scroll";
    }
  }, [showLoader]);

  return (
    <>
      {showLoader && (
        <div
          style={{
            zIndex: 10,
            width: "100vw",
            height: "100vh",
            top: 0,
            left: 0,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              position: "absolute",
              left: 0,
              top: 0,
              width: "100%",
              height: "100%",
              opacity: ".6",
              background: "white",
            }}
          ></div>
          <Image src="/spinner.gif" width={100} height={100} alt="spinner" />
        </div>
      )}
    </>
  );
};

export default Loader;
