import React, { useState, useRef } from "react";
import {
  FeedbackButtonContainer,
  FeedbackButton as StyledFeedbackButton,
} from "../styles/button";
import { TooltipComponent } from "./ToolTipComponent";
import { FeedbackButtonProps } from "../types/FeedbackButtonProps";

const FeedbackButton: React.FC<FeedbackButtonProps> = ({
  position,
  buttonOptions,
  tooltipOptions,
  setIsOpen,
  draggable,
  onPositionChange,
}) => {
  const buttonRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  let dragStartX: number;
  let dragStartY: number;
  let initialRight: number;
  let initialBottom: number;
  let dragStartTime: number;

  const DRAG_THRESHOLD = 5; // pixels
  const CLICK_THRESHOLD = 200; // milliseconds

  const onMouseDown = (e: React.MouseEvent) => {
    if (draggable) {
      e.preventDefault();
      dragStartX = e.clientX;
      dragStartY = e.clientY;
      initialRight = position.right;
      initialBottom = position.bottom;
      dragStartTime = Date.now();
      setIsDragging(false);

      document.addEventListener("mousemove", onMouseMove);
      document.addEventListener("mouseup", onMouseUp);
    }
  };

  const onMouseMove = (e: MouseEvent) => {
    const deltaX = e.clientX - dragStartX;
    const deltaY = e.clientY - dragStartY;

    if (
      Math.abs(deltaX) > DRAG_THRESHOLD ||
      Math.abs(deltaY) > DRAG_THRESHOLD
    ) {
      setIsDragging(true);
    }

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

    const dragEndTime = Date.now();
    const dragDuration = dragEndTime - dragStartTime;

    if (!isDragging && dragDuration < CLICK_THRESHOLD) {
      setIsOpen(true);
    }

    setIsDragging(false);
  };

  const handleClick = (e: React.MouseEvent) => {
    if (!draggable) {
      setIsOpen(true);
    }
  };

  const button = (
    <FeedbackButtonContainer
      ref={buttonRef}
      position={position}
      isDraggable={draggable}
    >
      {tooltipOptions?.showTooltip ? (
        <TooltipComponent
          text={tooltipOptions.tooltipMessage}
          position={tooltipOptions.position}
          fontSize={tooltipOptions.tooltipFontSize}
        >
          <StyledFeedbackButton
            onClick={handleClick}
            onMouseDown={onMouseDown}
            size={buttonOptions?.size}
          >
            Feedback
          </StyledFeedbackButton>
        </TooltipComponent>
      ) : (
        <StyledFeedbackButton onClick={handleClick} size={buttonOptions?.size}>
          Feedback
        </StyledFeedbackButton>
      )}
    </FeedbackButtonContainer>
  );

  return button;
};

export default FeedbackButton;
