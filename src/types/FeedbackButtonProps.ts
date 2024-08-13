export interface FeedbackButtonProps {
  position: { bottom: number; right: number };
  buttonOptions: {
    size: string | number;
  };
  tooltipOptions: {
    showTooltip: boolean;
    position: string;
    tooltipMessage: string;
    tooltipFontSize: number;
  };
  setIsOpen: (isOpen: boolean) => void;
  draggable: boolean;
  onPositionChange: (bottom: number, right: number) => void;
}
