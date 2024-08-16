import { FeedbackWidgetProps } from "./types/FeedbackWidgetProps";

export const customErrorMessages: Record<string, string> = {
  "String must contain at least 1 character(s)": "Field cannot be empty.",
  "Invalid email": "Please enter a valid email address.",
  "String must contain at most 500 character(s)":
    "Please Keep it brief! Max 500 characters allowed.",
  "Number must be greater than or equal to 1": "Please provide a rating.",
};

export const defaultFeedbackWidgetProps: FeedbackWidgetProps = {
  position: { bottom: 20, right: 20 },
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
    height: 500,
    width: 350,
    fontSize: 14,
  },
  draggable: false,
};

export function createFeedbackWidgetProps(
  customProps: Partial<FeedbackWidgetProps>
): FeedbackWidgetProps {
  return {
    ...defaultFeedbackWidgetProps,
    ...customProps,
    // Merging nested objects
    position: {
      ...defaultFeedbackWidgetProps.position,
      ...customProps.position,
    },
    buttonOptions: {
      ...defaultFeedbackWidgetProps.buttonOptions,
      ...customProps.buttonOptions,
    },
    tooltipOptions: {
      ...defaultFeedbackWidgetProps.tooltipOptions,
      ...customProps.tooltipOptions,
    },
    widgetOptions: {
      ...defaultFeedbackWidgetProps.widgetOptions,
      ...customProps.widgetOptions,
    },
  };
}

export const wait = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export async function retryRequest<T>(
  fn: () => Promise<T>,
  retries: number = 3,
  delay: number = 200,
  timeout: number = 1000
): Promise<T> {
  try {
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), timeout);
    const result = await fn();
    clearTimeout(id);
    return result;
  } catch (err) {
    if (retries <= 0) throw err;
    await wait(delay);
    return retryRequest(fn, retries - 1, delay * 2);
  }
}
