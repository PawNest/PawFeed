import { ConnectorConfig } from "./ConnectorConfig";
import { FeedbackData } from "./Feedback";

export interface FeedbackFormProps {
  connector?: {
    name: string;
    config: ConnectorConfig;
  };
  onSubmit?: (data: FeedbackData) => Promise<void>;
  name?: string;
  email?: string;
  requiredFields?: Array<"name" | "email" | "feedback" | "rating">;
  optionalFields?: Array<"name" | "email" | "feedback" | "rating">;
}

export interface FeedbackWidgetProps extends FeedbackFormProps {
  position?: {
    right?: number;
    bottom?: number;
  };
  title?: string;
  description?: string;
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
  draggable?: boolean;
}
