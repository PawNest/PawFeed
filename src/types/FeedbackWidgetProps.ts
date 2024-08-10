import { ConnectorConfig } from "./ConnectorConfig";
import { FeedbackData } from "./Feedback";

export interface FeedbackWidgetProps {
  connector?: {
    name: string;
    config: ConnectorConfig;
  };
  onSubmit?: (data: FeedbackData) => Promise<void>;
  position?: {
    top?: string;
    right?: string;
    bottom?: string;
    left?: string;
  };
  title?: string;
  description?: string;
  name?: string;
  email?: string;
  requiredFields?: Array<"name" | "email" | "feedback" | "rating">;
  optionalFields?: Array<"name" | "email" | "feedback" | "rating">;
  theme?: "light" | "dark" | "system";
  buttonOptions?: {
    size?: "small" | "medium" | "large" | number;
  };
  tooltipOptions?: {
    showTooltip?: boolean;
    position?: "top" | "bottom" | "left" | "right";
    tooltipMessage?: string;
    tooltipFontSize?: number;
  };
  widgetOptions?: {
    showTitle?: boolean;
    showDescription?: boolean;
    height?: number;
    width?: number;
    fontSize?: number;
  };
}
