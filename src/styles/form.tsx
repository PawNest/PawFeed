import styled from "styled-components";

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
