import styled from "styled-components";
import { theme } from "./theme";

const BaseButton = styled.button`
  background: transparent;
  width: 100%;
  outline: none;
  padding: ${theme.spacing._10} ${theme.spacing._16};
  border-radius: ${theme.borderRadius._3};
  border: none;
  font-weight: ${theme.fontWeight._600};
  text-transform: uppercase;
  white-space: nowrap;
`;

export const PrimaryButton = styled(BaseButton)`
  background: ${theme.colors.buttonBackground};
  color: ${theme.colors.white};
`;

export const SecondaryButton = styled(BaseButton)`
  border: solid 2px ${theme.colors.buttonBackground};
`;

export const UnstyledButton = styled.button`
  background: transparent;
  padding: 0;
  border: 0;
  margin: 0;
  outline: none;
`;
