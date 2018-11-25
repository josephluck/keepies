import { theme } from "./theme";
import { ActionLink } from "./action-link";
import styled from "styled-components";

export const FormWrapper = styled.div`
  background: ${theme.colors.form};
  position: relative;
  overflow: hidden;
`;

export const Form = styled.form<{ showing?: boolean }>`
  display: flex;
  align-items: center;
  transition: all 333ms ease;
  transform: translateY(${props => (props.showing === false ? "-100%" : "0%")});
  opacity: ${props => (props.showing === false ? 0 : 1)};
`;

export const Input = styled.input`
  padding: ${theme.spacing._16} ${theme.spacing._20};
  border: 0;
  flex: 1;
  background: transparent;
  outline: none;
`;

export const SubmitButton = styled(ActionLink)`
  padding: ${theme.spacing._16} ${theme.spacing._20};
  cursor: pointer;
`;

export const Overlay = styled.div<{ showing: boolean }>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: ${props => (props.onClick ? "pointer" : "unset")};
  transition: all 333ms ease;
  transform: translateY(${props => (props.showing ? "0" : "100%")});
  opacity: ${props => (props.showing ? 1 : 0)};
  pointer-events: ${props => (props.showing ? "unset" : "none")};
`;

export const SuccessOverlay = styled(Overlay)`
  background: ${theme.colors.successOverlay};
`;

export const AddAppText = styled.span`
  font-size: ${theme.font._16.size};
  line-height: ${theme.font._16.lineHeight};
  font-weight: ${theme.fontWeight._600};
  color: ${theme.colors.link};
`;

export const SuccessText = styled(AddAppText)`
  color: ${theme.colors.white};
`;

export const AlreadyAddedText = styled(AddAppText)`
  color: ${theme.colors.disabledLinkText};
  font-size: ${theme.font._14.size};
  line-height: ${theme.font._14.lineHeight};
  font-weight: ${theme.fontWeight._400};
`;
