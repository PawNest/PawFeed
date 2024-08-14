export interface FeedbackButtonProps {
  position: { bottom: number; right: number };
  buttonOptions?: {
    size?: "small" | "medium" | "large" | number;
  };
  tooltipOptions?: {
    showTooltip?: boolean;
    position?: "top" | "bottom" | "left" | "right";
    tooltipMessage?: string;
    tooltipFontSize?: number;
  };
  setIsOpen: (isOpen: boolean) => void;
  draggable?: boolean;
  onPositionChange: (bottom: number, right: number) => void;
}
