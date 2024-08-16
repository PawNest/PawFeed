import styled from "styled-components";

interface WidgetContainerProps {
  position: {
    right: number;
    bottom: number;
  };
  height?: number;
  width?: number;
  fontSize?: number;
}

export const WidgetHeader = styled.div<{ isDraggable?: boolean }>`
  cursor: ${(props) => (props.isDraggable ? "move" : "default")};
`;

export const WidgetTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: bold;
  margin: 0.5em 0;
  color: ${(props) => props.theme.textColor};
  text-align: "center";
`;

export const WidgetDescription = styled.p`
  margin: 1em 0;
  color: ${(props) => props.theme.textColor};
  text-align: "center";
`;

export const WidgetContainer = styled.div.attrs<WidgetContainerProps>(
  (props) => ({
    style: {
      bottom: `${props.position.bottom}px`,
      right: `${props.position.right}px`,
      height: props.height ? `${props.height}px` : "auto",
      width: props.width ? `${props.width}px` : "auto",
    },
  })
)`
  position: absolute;
  background-color: ${(props) => props.theme.backgroundColor};
  font-size: ${(props) => (props.fontSize ? props.fontSize + "px" : "14px")};
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
  overflow-y: auto;
  display: flex;
  flex-direction: column;

  pointer-events: auto;
`;

export const ThankYouContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: "auto";
`;

export const ThankYouTitle = styled.p`
  font-size: 1rem;
  margin: 1em 0;
  color: ${(props) => props.theme.textColor};
  text-align: "center";
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
