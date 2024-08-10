import styled from "styled-components";

interface WidgetContainerProps {
  position?: {
    top?: string;
    right?: string;
    bottom?: string;
    left?: string;
  };
  height?: number;
  width?: number;
  fontSize?: number;
}

export const WidgetContainer = styled.div<WidgetContainerProps>`
  position: fixed;
  ${(props) =>
    props.position &&
    `top: ${props.position.top};
     right: ${props.position.right};
     bottom: ${props.position.bottom};
     left: ${props.position.left};`}
  background-color: ${(props) => props.theme.backgroundColor};
  height: ${(props) => (props.height ? props.height + "px" : "auto")};
  width: ${(props) => (props.width ? props.width + "px" : "auto")};
  font-size: ${(props) => props.fontSize + "px"};
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  overflow-y: auto;
`;

interface FeedbackButtonContainerProps {
  position?: {
    top?: string;
    right?: string;
    bottom?: string;
    left?: string;
  };
}

export const FeedbackButtonContainer = styled.div<FeedbackButtonContainerProps>`
  position: fixed;
  ${(props) =>
    props.position &&
    `top: ${props.position.top};
     right: ${props.position.right};
     bottom: ${props.position.bottom};
     left: ${props.position.left};`}
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

interface FeedbackButtonProps {
  size: string | number;
}

export const FeedbackButton = styled.button<FeedbackButtonProps>`
  background-color: ${(props) => props.theme.buttonBackgroundColor};
  color: ${(props) => props.theme.buttonTextColor};
  padding: ${(props) =>
    typeof props.size === "number"
      ? props.size + "px"
      : props.size === "small"
      ? "8px 16px"
      : props.size === "medium"
      ? "12px 24px"
      : "16px 32px"};
  border: none;
  border-radius: 4px;
  font-size: inherit;
  cursor: pointer;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const Input = styled.input`
  margin-bottom: 10px;
  padding: 8px;
  border-radius: 4px;
  border: 1px solid ${(props) => props.theme.inputBorderColor};
  background-color: ${(props) => props.theme.inputBackgroundColor};
  color: ${(props) => props.theme.textColor};

  &:focus {
    border-color: ${(props) => props.theme.inputBorderColor};
    outline: none;
  }

  &.error {
    border-color: red;
  }
`;

export const TextArea = styled.textarea`
  margin-bottom: 10px;
  padding: 8px;
  border-radius: 4px;
  min-height: 100px;
  border: 1px solid ${(props) => props.theme.inputBorderColor};
  background-color: ${(props) => props.theme.inputBackgroundColor};
  color: ${(props) => props.theme.textColor};

  &:focus {
    border-color: ${(props) => props.theme.inputBorderColor};
    outline: none;
  }

  &.error {
    border-color: red;
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
  gap: 10px;
`;

export const CancelButton = styled.button`
  background-color: ${(props) => props.theme.cancelBackgroundColor};
  color: ${(props) => props.theme.cancelTextColor};
  padding: 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  flex: 1;
`;

export const SubmitButton = styled.button`
  background-color: ${(props) => props.theme.buttonBackgroundColor};
  color: ${(props) => props.theme.buttonTextColor};
  padding: 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  flex: 1;
`;

export const ThankYouContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
`;
