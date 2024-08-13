import React, { useState, useEffect, useRef } from "react";
import {
  WidgetContainer,
  ThankYouContainer,
  Footer,
  FullScreenContainer,
  WidgetHeader,
} from "../styles/widget";

import {
  Form,
  Input,
  TextArea,
  SubmitButton,
  CancelButton,
  ButtonContainer,
} from "../styles/form";
import StarRating from "./StarRating";
import { ThemeProvider } from "styled-components";
import { getTheme } from "../styles/theme";
import { createFeedbackWidgetProps } from "../utils";
import { FeedbackWidgetProps } from "../types/FeedbackWidgetProps";
import FeedbackButton from "./FeedbackButton";
import { useFeedbackForm } from "../hooks/useFeedbackForm";
import { useWidgetPosition } from "../hooks/useWidgetPosition";

const FeedbackWidget: React.FC<FeedbackWidgetProps> = (
  feedbackWidgetProps: FeedbackWidgetProps
) => {
  const props = createFeedbackWidgetProps(feedbackWidgetProps);
  const [isOpen, setIsOpen] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);
  const widgetRef = useRef<HTMLDivElement>(null);

  let dragStartX: number;
  let dragStartY: number;
  let initialRight: number;
  let initialBottom: number;

  const onMouseDown = (e: React.MouseEvent) => {
    if (props.draggable) {
      e.preventDefault();
      dragStartX = e.clientX;
      dragStartY = e.clientY;
      initialRight = widgetPosition.right || 0;
      initialBottom = widgetPosition.bottom || 0;

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
    const widgetWidth = widgetRef.current?.offsetWidth || 0;
    const widgetHeight = widgetRef.current?.offsetHeight || 0;

    const maxRight = screenWidth - widgetWidth;
    const maxBottom = screenHeight - widgetHeight;

    const newPosition = {
      right: Math.min(Math.max(newRight, 0), maxRight),
      bottom: Math.min(Math.max(newBottom, 0), maxBottom),
    };

    setWidgetPosition(newPosition);
  };

  const onMouseUp = () => {
    document.removeEventListener("mousemove", onMouseMove);
    document.removeEventListener("mouseup", onMouseUp);
  };

  const closeForm = () => {
    handleCloseWidget();
    setShowThankYou(false);
  };

  const currentTheme =
    props.theme === "light"
      ? getTheme(false)
      : props.theme === "dark"
      ? getTheme(true)
      : window.matchMedia("(prefers-color-scheme: dark)").matches
      ? getTheme(true)
      : getTheme(false);

  const {
    widgetPosition,
    setWidgetPosition,
    handleOpenWidget,
    handleCloseWidget,
    handlePositionChange,
  } = useWidgetPosition(
    setIsOpen,
    {
      bottom: props?.position?.bottom || 20,
      right: props?.position?.right || 20,
    },
    {
      width: props?.widgetOptions?.width,
      height: props?.widgetOptions?.height,
    }
  );

  const {
    formData,
    errors,
    handleInputChange,
    handleRatingChange,
    handleSubmit,
  } = useFeedbackForm(
    {
      connector: props.connector,
      onSubmit: props.onSubmit,
      name: props.name,
      email: props.email,
      requiredFields: props.requiredFields,
      optionalFields: props.optionalFields,
    },
    setShowThankYou
  );

  return (
    <ThemeProvider theme={currentTheme}>
      <FullScreenContainer>
        {isOpen ? (
          <WidgetContainer
            position={widgetPosition}
            height={props.widgetOptions?.height}
            width={props.widgetOptions?.width}
            fontSize={props.widgetOptions?.fontSize}
          >
            {showThankYou ? (
              <ThankYouContainer>
                <h2 style={{ color: currentTheme.textColor }}>
                  Thank you for your feedback!
                </h2>
                <SubmitButton onClick={closeForm}>Close</SubmitButton>
              </ThankYouContainer>
            ) : (
              <Form onSubmit={handleSubmit}>
                <WidgetHeader
                  ref={widgetRef}
                  onMouseDown={onMouseDown}
                  isDraggable={props.draggable}
                >
                  {props.widgetOptions?.showTitle ? (
                    <h2 style={{ color: currentTheme.textColor }}>
                      {props.title}
                    </h2>
                  ) : null}
                  {props.widgetOptions?.showDescription ? (
                    <p style={{ color: currentTheme.textColor }}>
                      {props.description}
                    </p>
                  ) : null}
                </WidgetHeader>
                {props.requiredFields?.includes("name") ||
                props.optionalFields?.includes("name") ? (
                  <>
                    <Input
                      type="text"
                      name="name"
                      placeholder="Enter your name"
                      value={formData.name || ""}
                      onChange={handleInputChange}
                    />
                    {errors.name && (
                      <div style={{ color: "red", marginBottom: "10px" }}>
                        {errors.name}
                      </div>
                    )}
                  </>
                ) : null}
                {props.requiredFields?.includes("email") ||
                props.optionalFields?.includes("email") ? (
                  <>
                    <Input
                      type="email"
                      name="email"
                      placeholder="Enter your email"
                      value={formData.email || ""}
                      onChange={handleInputChange}
                    />
                    {errors.email && (
                      <div style={{ color: "red", marginBottom: "10px" }}>
                        {errors.email}
                      </div>
                    )}
                  </>
                ) : null}
                {props.requiredFields?.includes("feedback") ||
                props.optionalFields?.includes("feedback") ? (
                  <>
                    <TextArea
                      name="feedback"
                      placeholder="Share your thoughts and suggestions"
                      value={formData.feedback}
                      onChange={handleInputChange}
                    />
                    {errors.feedback && (
                      <div style={{ color: "red", marginBottom: "10px" }}>
                        {errors.feedback}
                      </div>
                    )}
                  </>
                ) : null}
                {props.requiredFields?.includes("rating") ||
                props.optionalFields?.includes("rating") ? (
                  <StarRating
                    rating={formData.rating ? formData.rating : 0}
                    onRatingChange={handleRatingChange}
                  />
                ) : null}
                <ButtonContainer>
                  <CancelButton type="button" onClick={closeForm}>
                    Cancel
                  </CancelButton>
                  <SubmitButton type="submit">Submit Feedback</SubmitButton>
                </ButtonContainer>
              </Form>
            )}
            <Footer
              href="https://github.com/PawNest/PawFeed"
              target="_blank"
              rel="noopener noreferrer"
            >
              Powered by PawFeed
            </Footer>
          </WidgetContainer>
        ) : (
          <FeedbackButton
            position={widgetPosition}
            buttonOptions={props.buttonOptions}
            tooltipOptions={props.tooltipOptions}
            setIsOpen={handleOpenWidget}
            draggable={props.draggable}
            onPositionChange={handlePositionChange}
          />
        )}
      </FullScreenContainer>
    </ThemeProvider>
  );
};

export default FeedbackWidget;
