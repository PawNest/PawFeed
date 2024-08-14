import styled from "styled-components";

interface FeedbackButtonContainerProps {
  position: {
    right: number;
    bottom: number;
  };
  isDraggable?: boolean;
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

export const FeedbackButton = styled.button<{
  size?: "small" | "medium" | "large" | number;
}>`
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
