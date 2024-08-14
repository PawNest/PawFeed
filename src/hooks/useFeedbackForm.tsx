// hooks/useFeedbackForm.ts
import { useState } from "react";
import { FeedbackData } from "../types/Feedback";
import { FeedbackFormProps } from "../types/FeedbackWidgetProps";
import { customErrorMessages } from "../utils";
import * as z from "zod";
import { submitFeedback } from "../components/Connectors";

export const useFeedbackForm = (
  props: FeedbackFormProps,
  setShowThankYou: (show: boolean) => void
) => {
  const [formData, setFormData] = useState<FeedbackData>({
    name: props.name || "",
    email: props.email || "",
    feedback: "",
    rating: 0,
  });
  const [errors, setErrors] = useState<
    Partial<Record<keyof FeedbackData, string>>
  >({});

  const feedbackSchema = z.object({
    name: props.requiredFields?.includes("name")
      ? z.string().min(1)
      : z.string().optional(),
    email: props.requiredFields?.includes("email")
      ? z.string().email()
      : z.string().optional(),
    feedback: props.requiredFields?.includes("feedback")
      ? z.string().min(1).max(500)
      : z.string().optional(),
    rating: props.requiredFields?.includes("rating")
      ? z.number().min(1).max(5)
      : z.number().optional(),
  });

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
          console.debug("No submit function or connector provided");
        }
        setShowThankYou(true);
        setFormData({
          name: props.name || "",
          email: props.email || "",
          feedback: "",
          rating: 0,
        });
      } catch (error) {
        console.debug("Error submitting feedback:", error);
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

  return {
    formData,
    errors,
    handleInputChange,
    handleRatingChange,
    handleSubmit,
  };
};
