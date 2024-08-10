import styled from "styled-components";

export const Tooltip = styled.div<{
  position?: string;
  fontSize?: number;
}>`
  position: absolute;
  ${(props) =>
    props.position === "top"
      ? `
        bottom: calc(100% + 8px);
        left: 50%;
        transform: translateX(-50%);
      `
      : props.position === "bottom"
      ? `
        top: calc(100% + 8px);
        left: 50%;
        transform: translateX(-50%);
      `
      : props.position === "left"
      ? `
        right: calc(100% + 8px);
        top: 50%;
        transform: translateY(-50%);
      `
      : `
        left: calc(100% + 8px);
        top: 50%;
        transform: translateY(-50%);
      `}
  background-color: ${(props) => props.theme.tooltipBackgroundColor};
  color: ${(props) => props.theme.tooltipTextColor};
  padding: 8px 12px;
  border-radius: 4px;
  font-size: ${(props) => props.fontSize + "px"};
  white-space: normal;
  max-width: 200px;
  min-width: 100%;
  word-wrap: break-word;
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.2s ease-in-out;
`;
