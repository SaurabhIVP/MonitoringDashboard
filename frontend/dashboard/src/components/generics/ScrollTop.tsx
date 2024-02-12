import React, { useState, useEffect } from "react";

interface ScrollTopProps {
  targetClass: string; // Class of the target element
}

const ScrollTop: React.FC<ScrollTopProps> = ({ targetClass }) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  // Show button when page is scrolled down
  const toggleVisibility = () => {
    const targetElement = document.querySelector(`.${targetClass}`);
    if (!targetElement) return;

    if (targetElement.scrollTop > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  // Set the top of the target element when the button is clicked
  const scrollToTop = () => {
    const targetElement = document.querySelector(`.${targetClass}`);
    if (targetElement) {
      targetElement.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    const targetElement = document.querySelector(`.${targetClass}`);
    if (!targetElement) return;

    targetElement.addEventListener("scroll", toggleVisibility);

    return () => {
      targetElement.removeEventListener("scroll", toggleVisibility);
    };
  }, [targetClass]);

  return (
    <>
      {isVisible && (
        <div
          onClick={scrollToTop}
          style={{
            position: "fixed",
            bottom: "20px",
            right: "20px",
            cursor: "pointer",
            backgroundColor: "#778899",
            color: "white",
            borderRadius: "10px",
            padding: "10px",
            zIndex: 1000,
          }}
        >
          Scroll Top
        </div>
      )}
    </>
  );
};

export default ScrollTop;
