import React, { useState } from "react";
import {
  WidgetContainer,
  Form,
  Input,
  TextArea,
  SubmitButton,
  CancelButton,
  ButtonContainer,
  ThankYouContainer,
  FeedbackButtonContainer,
  FeedbackButton,
} from "../styles/styles";
import StarRating from "./StarRating";
import * as z from "zod";
import { ThemeProvider } from "styled-components";
import { getTheme } from "../styles/theme";
import { TooltipComponent } from "./ToolTipComponent";
import { customErrorMessages, DefaultFeedbackWidgetProps } from "../utils";
import { FeedbackWidgetProps } from "../types/FeedbackWidgetProps";
import { FeedbackData } from "../types/Feedback";
import { submitFeedback } from "./Connectors";

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
    setIsOpen(false);
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

  const position = props.position
    ? props.position
    : DefaultFeedbackWidgetProps.position;

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
      {isOpen ? (
        <WidgetContainer
          position={position}
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
              {widgetOptions.showTitle ? (
                <h2 style={{ color: currentTheme.textColor }}>
                  {props.title ? props.title : DefaultFeedbackWidgetProps.title}
                </h2>
              ) : null}
              {widgetOptions.showDescription ? (
                <p style={{ color: currentTheme.textColor }}>
                  {props.description
                    ? props.description
                    : DefaultFeedbackWidgetProps.description}
                </p>
              ) : null}
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
        </WidgetContainer>
      ) : (
        <FeedbackButtonContainer position={position}>
          {tooltipOptions.showTooltip ? (
            <TooltipComponent
              text={tooltipOptions.tooltipMessage}
              position={tooltipOptions.position}
              fontSize={tooltipOptions.tooltipFontSize}
            >
              <FeedbackButton
                onClick={() => setIsOpen(true)}
                size={buttonOptions.size}
              >
                Feedback
              </FeedbackButton>
            </TooltipComponent>
          ) : (
            <FeedbackButton
              onClick={() => setIsOpen(true)}
              size={buttonOptions.size}
            >
              Feedback
            </FeedbackButton>
          )}
        </FeedbackButtonContainer>
      )}
    </ThemeProvider>
  );
};

export default FeedbackWidget;
