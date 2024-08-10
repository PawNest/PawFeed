// Define the interface for theme properties
interface Theme {
  backgroundColor: string;
  textColor: string;
  inputBackgroundColor: string;
  inputBorderColor: string;
  buttonBackgroundColor: string;
  buttonTextColor: string;
  cancelBackgroundColor: string;
  cancelTextColor: string;
  starFilledColor: string;
  starEmptyColor: string;
  tooltipBackgroundColor: string;
  tooltipTextColor: string;
}

// Light theme definition
export const lightTheme: Theme = {
  backgroundColor: "#FFFFFF", // White
  textColor: "#000000", // Black
  inputBackgroundColor: "#F7F7F7", // Very light gray
  inputBorderColor: "#D1D5DB", // Light gray
  buttonBackgroundColor: "#000000", // Black
  buttonTextColor: "#FFFFFF", // White
  cancelBackgroundColor: "#f0f0f0", // Light grey
  cancelTextColor: "#000000", // Black
  starFilledColor: "#000000", // Black (filled stars)
  starEmptyColor: "#E5E7EB", // Light gray (empty stars)
  tooltipBackgroundColor: "#FFFFFF", //White
  tooltipTextColor: "#000000", // Black
};

// Dark theme definition
const darkTheme: Theme = {
  backgroundColor: "#1F1F1F", // Dark gray
  textColor: "#FFFFFF", // White
  inputBackgroundColor: "#333333", // Darker gray
  inputBorderColor: "#444444", // Medium gray
  buttonBackgroundColor: "#FFFFFF", // White
  buttonTextColor: "#000000", // Black
  cancelBackgroundColor: "#000000", // Black
  cancelTextColor: "#f0f0f0", // Light grey
  starFilledColor: "#FFFFFF", // White (filled stars)
  starEmptyColor: "#666666", // Medium gray (empty stars)
  tooltipBackgroundColor: "#000000", //Black
  tooltipTextColor: "#FFFFFF", // White
};

// Function to get the theme based on user preference or system setting
export function getTheme(isDarkMode: boolean): Theme {
  return isDarkMode ? darkTheme : lightTheme;
}
