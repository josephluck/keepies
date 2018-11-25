import styled from "styled-components";
import { theme } from "./theme";

export const InputField = styled.input`
  width: 100%;
  padding: ${theme.spacing._10};
  border: solid 1px transparent;
  border-radius: ${theme.borderRadius._3};
  font-size: ${theme.font._14.size};
  line-height: ${theme.font._14.lineHeight};
  font-weight: ${theme.fontWeight._500};
  outline: none;
  background: ${theme.colors.form};
  transition: all 150ms ease;
  &:focus {
    border: solid 1px ${theme.colors.link};
    background: ${theme.colors.white};
  }
`;
