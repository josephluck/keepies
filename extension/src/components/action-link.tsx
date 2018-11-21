import styled from "styled-components";

import { theme } from "./theme";

export const ActionLink = styled.span`
  font-size: ${theme.font._12.size};
  line-height: ${theme.font._12.lineHeight};
  font-weight: ${theme.fontWeight._600};
  color: ${theme.colors.link};
  cursor: ${props => (props.onClick ? "pointer" : "unset")};
  white-space: nowrap;
`;

export const ActionAnchor = styled(ActionLink.withComponent("a"))`
  text-decoration: none;
  cursor: pointer;
`;
