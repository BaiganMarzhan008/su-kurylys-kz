import React, { createContext, useState, useEffect } from 'react';

export const AccessibilityContext = createContext();

export const AccessibilityProvider = ({ children }) => {
  const [isHighContrast, setIsHighContrast] = useState(() => JSON.parse(localStorage.getItem('isHighContrast')) || false);
  const [isLargeFont, setIsLargeFont] = useState(() => JSON.parse(localStorage.getItem('isLargeFont')) || false);
  const [hideImages, setHideImages] = useState(() => JSON.parse(localStorage.getItem('hideImages')) || false);

  useEffect(() => {
    localStorage.setItem('isHighContrast', JSON.stringify(isHighContrast));
    if (isHighContrast) document.body.classList.add('high-contrast');
    else document.body.classList.remove('high-contrast');
  }, [isHighContrast]);

  useEffect(() => {
    localStorage.setItem('isLargeFont', JSON.stringify(isLargeFont));
    if (isLargeFont) document.body.classList.add('large-font');
    else document.body.classList.remove('large-font');
  }, [isLargeFont]);

  useEffect(() => {
    localStorage.setItem('hideImages', JSON.stringify(hideImages));
    if (hideImages) document.body.classList.add('hide-images');
    else document.body.classList.remove('hide-images');
  }, [hideImages]);

  return (
    <AccessibilityContext.Provider
      value={{
        isHighContrast, setIsHighContrast,
        isLargeFont, setIsLargeFont,
        hideImages, setHideImages
      }}
    >
      {children}
    </AccessibilityContext.Provider>
  );
};
