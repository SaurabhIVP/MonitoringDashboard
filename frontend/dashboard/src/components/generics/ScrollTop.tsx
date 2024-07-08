import React, { useState, useEffect } from "react";
import NavigationIcon from "@mui/icons-material/Navigation";
import { IconButton } from "@mui/material";
import { FilterColor, SecondaryColor } from "../../utils/Colors";
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
        <IconButton
          onClick={scrollToTop}
          aria-label="filter"
          sx={{
            position: "fixed",
            bottom: "30px",
            right: "30px",
            cursor: "pointer",
            backgroundColor: FilterColor,
            color: "white",
            borderRadius: "40px",
            padding: "10px",
            zIndex: 1000,
            "&:hover": {
              backgroundColor: FilterColor, // Same color as background color
            },
          }}
        >
          <NavigationIcon></NavigationIcon>
        </IconButton>
      )}
    </>
  );
};

export default ScrollTop;
