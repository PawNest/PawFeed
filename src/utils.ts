export const customErrorMessages: Record<string, string> = {
  "String must contain at least 1 character(s)": "Field cannot be empty.",
  "Invalid email": "Please enter a valid email address.",
  "String must contain at most 500 character(s)":
    "Please Keep it brief! Max 500 characters allowed.",
};

export const DefaultFeedbackWidgetProps = {
  position: { bottom: "20px", right: "20px" },
  requiredFields: ["name", "email", "feedback"],
  optionalFields: ["rating"],
  theme: "light",
  title: "Give us your feedback",
  description:
    "Your feedback helps us improve our product. Please take a moment to share your thoughts.",
  buttonOptions: {
    size: "small",
  },
  tooltipOptions: {
    showTooltip: true,
    position: "top",
    tooltipMessage: "Let us know what you think 👋!",
    tooltipFontSize: 12,
  },
  widgetOptions: {
    showTitle: true,
    showDescription: true,
    width: 300,
    fontSize: 14,
  },
};
