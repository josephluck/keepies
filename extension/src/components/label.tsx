import styled from "styled-components";
import { theme } from "./theme";

export const Label = styled.div`
  display: inline-block;
  white-space: nowrap;
  border: solid 1px ${theme.colors.label};
  padding: ${theme.spacing._2} ${theme.spacing._4};
  font-size: ${theme.font._10.size};
  line-height: ${theme.font._10.lineHeight};
  font-weight: ${theme.fontWeight._500};
  color: ${theme.colors.label};
  margin-left: ${theme.spacing._2};
  border-radius: ${theme.borderRadius._3};
`;

export const RepoLabel = styled(Label)`
  margin: 0 ${theme.spacing._2};
`;
