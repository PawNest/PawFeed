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
import * as z from "zod";
import { ThemeProvider } from "styled-components";
import { getTheme } from "../styles/theme";
import { TooltipComponent } from "./ToolTipComponent";
import { customErrorMessages, DefaultFeedbackWidgetProps } from "../utils";
import { FeedbackWidgetProps } from "../types/FeedbackWidgetProps";
import { FeedbackData } from "../types/Feedback";
import { submitFeedback } from "./Connectors";
import FeedbackButton from "./FeedbackButton";

const FeedbackWidget: React.FC<FeedbackWidgetProps> = (
  props: FeedbackWidgetProps
) => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState<FeedbackData>({
    name: props.name || "",
    email: props.email || "",
    feedback: "",
    rating: 0,
  });
  const [showThankYou, setShowThankYou] = useState(false);
  const [errors, setErrors] = useState<
    Partial<Record<keyof FeedbackData, string>>
  >({});

  const initialPosition = props.position
    ? props.position
    : DefaultFeedbackWidgetProps.position;

  const draggable = props.draggable
    ? props.draggable
    : DefaultFeedbackWidgetProps.draggable;

  const [widgetPosition, setWidgetPosition] = useState(initialPosition);
  const [buttonPosition, setButtonPosition] = useState(initialPosition);
  const widgetRef = useRef<HTMLDivElement>(null);

  let dragStartX: number;
  let dragStartY: number;
  let initialRight: number;
  let initialBottom: number;

  const onMouseDown = (e: React.MouseEvent) => {
    if (draggable) {
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

  const calculateWidgetPosition = () => {
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;
    const buttonWidth = 100;
    const buttonHeight = 100;
    const widgetWidth = widgetOptions?.width || 300; // Default width
    const widgetHeight = widgetOptions?.height || 450; // Default height

    let newRight: number;
    let newBottom: number;

    // Horizontal positioning
    if (widgetPosition.right + buttonWidth + widgetWidth <= screenWidth) {
      // Enough space to open on left
      newRight = widgetPosition.right + 10; // + buttonWidth + 10; // 10px gap
    } else if (widgetPosition.right >= widgetWidth) {
      // + 10) {
      // Enough space to open on right
      newRight = widgetPosition.right + 10 - widgetWidth; // - 10; // 10px gap
    } else {
      // Not enough space on either side, center it horizontally
      newRight = Math.max(
        10,
        Math.min(
          screenWidth - widgetWidth - 10,
          (screenWidth - widgetWidth) / 2
        )
      );
    }

    // Vertical positioning
    if (widgetPosition.bottom + buttonHeight + widgetHeight <= screenHeight) {
      // Enough space below
      newBottom = widgetPosition.bottom + 10; // + buttonHeight + 10; // 10px gap
    } else if (widgetPosition.bottom >= widgetHeight) {
      // + 10) {
      // Enough space above
      newBottom = widgetPosition.bottom + 10 - widgetHeight; // - 10; // 10px gap
    } else {
      // Not enough space above or below, center it vertically
      newBottom = Math.max(
        10,
        Math.min(
          screenHeight - widgetHeight - 10,
          (screenHeight - widgetHeight) / 2
        )
      );
    }

    return { right: newRight, bottom: newBottom };
  };

  // Use this function when opening the widget
  const handleOpenWidget = () => {
    setButtonPosition(widgetPosition); // Store the current button position
    const updatedWidgetPosition = calculateWidgetPosition();
    setWidgetPosition(updatedWidgetPosition);
    setIsOpen(true);
  };

  const handleCloseWidget = () => {
    setIsOpen(false);
    setWidgetPosition(buttonPosition); // Restore the button position
  };

  const handlePositionChange = (bottom: number, right: number) => {
    const newPosition = { bottom, right };
    setWidgetPosition(newPosition);
  };

  useEffect(() => {
    setWidgetPosition(initialPosition);
    setButtonPosition(initialPosition);
  }, [initialPosition]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Clear previous errors
    setErrors({});

    const validationResult = feedbackSchema.safeParse(formData);

    if (validationResult.success) {
      try {
        if (props.onSubmit) {
          await props.onSubmit(validationResult.data);
        } else if (props.connector) {
          await submitFeedback(
            props.connector.name,
            validationResult.data,
            props.connector.config
          );
        } else {
          // do nothing
          console.error("No submit function or connector provided");
        }
        setShowThankYou(true);
        setFormData({
          name: props.name || "",
          email: props.email || "",
          feedback: "",
          rating: 0,
        });
      } catch (error) {
        console.error("Error submitting feedback:", error);
        // Handle submission error (e.g., show an error message to the user)
      }
    } else {
      const newErrors: Partial<Record<keyof FeedbackData, string>> = {};

      validationResult.error.errors.forEach((error) => {
        if (error.path.length > 0) {
          const fieldName = error.path[0] as keyof FeedbackData;
          newErrors[fieldName] = customErrorMessages[error.message]
            ? customErrorMessages[error.message]
            : error.message;
        }
      });

      setErrors(newErrors);

      //console.error("Form validation error:", validationResult.error);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleRatingChange = (rating: number) => {
    setFormData((prevData) => ({ ...prevData, rating }));
  };

  const closeForm = () => {
    handleCloseWidget();
    setShowThankYou(false);
    setFormData({
      name: props.name || "",
      email: props.email || "",
      feedback: "",
      rating: 0,
    });
  };

  const requiredFields = props.requiredFields
    ? props.requiredFields
    : DefaultFeedbackWidgetProps.requiredFields;

  const optionalFields = props.optionalFields
    ? props.optionalFields
    : DefaultFeedbackWidgetProps.optionalFields;

  const feedbackSchema = z.object({
    name: requiredFields.includes("name")
      ? z.string().min(1)
      : z.string().optional(),
    email: requiredFields.includes("email")
      ? z.string().email()
      : z.string().email().optional(),
    feedback: requiredFields.includes("feedback")
      ? z.string().min(1).max(500)
      : z.string().optional(),
    rating: requiredFields.includes("rating")
      ? z.number().min(1).max(5)
      : z.number().optional(),
  });

  const theme = props.theme ? props.theme : DefaultFeedbackWidgetProps.theme;

  const currentTheme =
    theme === "light"
      ? getTheme(false)
      : theme === "dark"
      ? getTheme(true)
      : window.matchMedia("(prefers-color-scheme: dark)").matches
      ? getTheme(true)
      : getTheme(false);

  const widgetOptions = {
    ...DefaultFeedbackWidgetProps.widgetOptions,
    ...props.widgetOptions,
  };

  const tooltipOptions = {
    ...DefaultFeedbackWidgetProps.tooltipOptions,
    ...props.tooltipOptions,
  };

  const buttonOptions = {
    ...DefaultFeedbackWidgetProps.buttonOptions,
    ...props.buttonOptions,
  };

  return (
    <ThemeProvider theme={currentTheme}>
      <FullScreenContainer>
        {isOpen ? (
          <WidgetContainer
            position={widgetPosition}
            height={widgetOptions.height}
            width={widgetOptions.width}
            fontSize={widgetOptions.fontSize}
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
                  isDraggable={draggable}
                >
                  {widgetOptions.showTitle ? (
                    <h2 style={{ color: currentTheme.textColor }}>
                      {props.title
                        ? props.title
                        : DefaultFeedbackWidgetProps.title}
                    </h2>
                  ) : null}
                  {widgetOptions.showDescription ? (
                    <p style={{ color: currentTheme.textColor }}>
                      {props.description
                        ? props.description
                        : DefaultFeedbackWidgetProps.description}
                    </p>
                  ) : null}
                </WidgetHeader>
                {requiredFields.includes("name") ||
                optionalFields.includes("name") ? (
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
                {requiredFields.includes("email") ||
                optionalFields.includes("email") ? (
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
                {requiredFields.includes("feedback") ||
                optionalFields.includes("feedback") ? (
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
                {requiredFields.includes("rating") ||
                optionalFields.includes("rating") ? (
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
            buttonOptions={buttonOptions}
            tooltipOptions={tooltipOptions}
            setIsOpen={handleOpenWidget}
            draggable={draggable}
            onPositionChange={handlePositionChange}
          />
        )}
      </FullScreenContainer>
    </ThemeProvider>
  );
};

export default FeedbackWidget;
