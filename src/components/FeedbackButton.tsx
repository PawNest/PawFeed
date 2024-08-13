import React, { useRef } from "react";
import {
  FeedbackButtonContainer,
  FeedbackButton as StyledFeedbackButton,
} from "../styles/styles";
import { TooltipComponent } from "./ToolTipComponent";

interface FeedbackButtonProps {
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

const FeedbackButton: React.FC<FeedbackButtonProps> = ({
  position,
  buttonOptions,
  tooltipOptions,
  setIsOpen,
  draggable,
  onPositionChange,
}) => {
  const buttonRef = useRef<HTMLDivElement>(null);

  let dragStartX: number;
  let dragStartY: number;
  let initialRight: number;
  let initialBottom: number;

  const onMouseDown = (e: React.MouseEvent) => {
    if (draggable) {
      e.preventDefault();
      dragStartX = e.clientX;
      dragStartY = e.clientY;
      initialRight = position.right;
      initialBottom = position.bottom;

      document.addEventListener("mousemove", onMouseMove);
      document.addEventListener("mouseup", onMouseUp);
    }
  };

  const onMouseMove = (e: MouseEvent) => {
    const deltaX = e.clientX - dragStartX;
    const deltaY = e.clientY - dragStartY;
    const newRight = initialRight - deltaX;
    const newBottom = initialBottom - deltaY;

    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;
    const buttonWidth = buttonRef.current?.offsetWidth || 0;
    const buttonHeight = buttonRef.current?.offsetHeight || 0;

    const maxRight = screenWidth - buttonWidth;
    const maxBottom = screenHeight - buttonHeight;

    const newPosition = {
      right: Math.min(Math.max(newRight, 0), maxRight),
      bottom: Math.min(Math.max(newBottom, 0), maxBottom),
    };

    onPositionChange(newPosition.bottom, newPosition.right);
  };

  const onMouseUp = () => {
    document.removeEventListener("mousemove", onMouseMove);
    document.removeEventListener("mouseup", onMouseUp);
  };

  const button = (
    <FeedbackButtonContainer
      ref={buttonRef}
      position={position}
      isDraggable={draggable}
      onMouseDown={onMouseDown}
    >
      {tooltipOptions.showTooltip ? (
        <TooltipComponent
          text={tooltipOptions.tooltipMessage}
          position={tooltipOptions.position}
          fontSize={tooltipOptions.tooltipFontSize}
        >
          <StyledFeedbackButton
            onClick={() => setIsOpen(true)}
            size={buttonOptions.size}
          >
            Feedback
          </StyledFeedbackButton>
        </TooltipComponent>
      ) : (
        <StyledFeedbackButton
          onClick={() => setIsOpen(true)}
          size={buttonOptions.size}
        >
          Feedback
        </StyledFeedbackButton>
      )}
    </FeedbackButtonContainer>
  );

  return button;
};

export default FeedbackButton;
