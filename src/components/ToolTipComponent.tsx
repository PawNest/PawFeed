import React from "react";
import styled from "styled-components";
import { Tooltip } from "../styles/tooltip";

const TooltipWrapper = styled.div`
  position: relative;
  display: inline-block;

  &:hover ${Tooltip} {
    opacity: 1;
    visibility: visible;
  }
`;

interface TooltipComponentProps {
  text?: string;
  position?: string;
  fontSize?: number;
  children: React.ReactNode;
}

export const TooltipComponent: React.FC<TooltipComponentProps> = ({
  text,
  position,
  fontSize,
  children,
}) => {
  return (
    <TooltipWrapper>
      {children}
      <Tooltip position={position} fontSize={fontSize}>
        {text}
      </Tooltip>
    </TooltipWrapper>
  );
};
