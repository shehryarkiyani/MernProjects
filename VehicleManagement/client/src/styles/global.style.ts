import styled from "styled-components";
import { twMerge } from "tailwind-merge";
interface InputTextProps {
  width?: string;
  height?: string;
  className?: string;
}
interface ButtonProps {
  Outerclasses?: string;
}
export const CustomInputText = styled.span<InputTextProps>`
  border: 1px solid #dcdbdd !important;
  border-radius: 12px !important;
  padding-right: 10px;
  .p-float-label {
    width: ${({ width }) => (width ? width : "100%")} !important;
    height: ${({ height }) => (height ? height : "100%")} !important;
    ${({ className }) => className && twMerge(className)};
    .p-inputtext {
      width: 100%;
      border: none;
      font-family: "Inter" !important;
      border-radius: 12px !important;
    }
    .p-inputtext:enabled:focus {
      box-shadow: none !important;
    }
    .p-inputtext:enabled:hover {
      border-color: #dcdbdd !important;
    }

    .p-float-label:has(input:focus) label,
    .p-float-label:has(input.p-filled) label {
      top: 0.1rem !important;
      font-size: 12px;
      z-index: 5 !important;
      background-color: white !important;
    }
  }
`;
export const CustomButton = styled.div<ButtonProps>`
  ${({ Outerclasses }) => Outerclasses && twMerge(Outerclasses)};
  .p-button {
    outline: none !important;
    box-shadow: none !important;
    border: none !important;
    border-radius: 12px !important;
    font-family: "Inter" !important;
  }
`;
