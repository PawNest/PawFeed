import styled from "styled-components";

interface WidgetContainerProps {
  position: {
    //top?: string;
    right: number;
    bottom: number;
    //left?: string;
  };
  height?: number;
  width?: number;
  fontSize: number;
  isDraggable: boolean;
}

export const WidgetContainer = styled.div.attrs<WidgetContainerProps>(
  (props) => ({
    style: {
      bottom: `${props.position.bottom}px`,
      right: `${props.position.right}px`,
      height: props.height ? `${props.height}px` : "auto",
      width: props.width ? `${props.width}px` : "auto",
      cursor: props.isDraggable ? "move" : "default",
    },
  })
)`
  position: absolute;
  background-color: ${(props) => props.theme.backgroundColor};
  font-size: ${(props) => props.fontSize + "px"};
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  overflow-y: auto;
  display: flex;
  flex-direction: column;

  pointer-events: auto;
`;

interface FeedbackButtonContainerProps {
  position: {
    //top?: string;
    right: number;
    bottom: number;
    //left?: string;
  };
  isDraggable: boolean;
}

export const FeedbackButtonContainer = styled.div.attrs<FeedbackButtonContainerProps>(
  (props) => ({
    style: {
      bottom: `${props.position.bottom}px`,
      right: `${props.position.right}px`,
      cursor: props.isDraggable ? "move" : "pointer",
    },
  })
)`
  position: absolute;
  pointer-events: auto;
  display: flex;
  align-items: center;
  justify-content: center;
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

  @media (max-width: 150px) {
    flex-direction: column;
  }
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

export const Footer = styled.a`
  text-align: center;
  padding-top: 10px;
  margin-top: auto;
  font-size: 0.8em;
  color: ${({ theme }) => theme.textColor};
  opacity: 0.7;
  text-decoration: none;

  &:hover {
    opacity: 1;
    text-decoration: underline;
  }
`;

export const FullScreenContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  pointer-events: none;
  z-index: 9999;
`;

export const DraggableWrapper = styled.div`
  position: absolute;
  pointer-events: auto;
`;
