import { useState, useEffect } from "react";
// import { Position } from "../types/Position";

export const useWidgetPosition = (
  setIsOpen: (value: boolean) => void,
  position: {
    right: number;
    bottom: number;
  },
  widgetOptions?: {
    height?: number;
    width?: number;
  }
) => {
  const [widgetPosition, setWidgetPosition] = useState(position);
  const [buttonPosition, setButtonPosition] = useState(position);

  const calculateWidgetPosition = () => {
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;
    const buttonWidth = 100;
    const buttonHeight = 100;
    const widgetWidth = widgetOptions?.width || 300; // Default width
    const widgetHeight = widgetOptions?.height || 450; // Default height

    let newRight: number;
    let newBottom: number;

    // Horizontal positioning
    if (widgetPosition.right + buttonWidth + widgetWidth <= screenWidth) {
      // Enough space to open on left
      newRight = widgetPosition.right + 10; // + buttonWidth + 10; // 10px gap
    } else if (widgetPosition.right >= widgetWidth) {
      // + 10) {
      // Enough space to open on right
      newRight = widgetPosition.right + 10 - widgetWidth; // - 10; // 10px gap
    } else {
      // Not enough space on either side, center it horizontally
      newRight = Math.max(
        10,
        Math.min(
          screenWidth - widgetWidth - 10,
          (screenWidth - widgetWidth) / 2
        )
      );
    }

    // Vertical positioning
    if (widgetPosition.bottom + buttonHeight + widgetHeight <= screenHeight) {
      // Enough space below
      newBottom = widgetPosition.bottom + 10; // + buttonHeight + 10; // 10px gap
    } else if (widgetPosition.bottom >= widgetHeight) {
      // + 10) {
      // Enough space above
      newBottom = widgetPosition.bottom + 10 - widgetHeight; // - 10; // 10px gap
    } else {
      // Not enough space above or below, center it vertically
      newBottom = Math.max(
        10,
        Math.min(
          screenHeight - widgetHeight - 10,
          (screenHeight - widgetHeight) / 2
        )
      );
    }

    return { right: newRight, bottom: newBottom };
  };

  // Use this function when opening the widget
  const handleOpenWidget = () => {
    setButtonPosition(widgetPosition); // Store the current button position
    const updatedWidgetPosition = calculateWidgetPosition();
    setWidgetPosition(updatedWidgetPosition);
    setIsOpen(true);
  };

  const handleCloseWidget = () => {
    setIsOpen(false);
    setWidgetPosition(buttonPosition); // Restore the button position
  };

  const handlePositionChange = (bottom: number, right: number) => {
    const newPosition = { bottom, right };
    setWidgetPosition(newPosition);
  };

  return {
    widgetPosition,
    setWidgetPosition,
    handleOpenWidget,
    handleCloseWidget,
    handlePositionChange,
  };
};
