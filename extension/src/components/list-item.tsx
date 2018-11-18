import styled from "styled-components";
import { theme } from "./theme";

export const ListItem = styled.div`
  border-bottom: solid 1px ${theme.colors.border};
  padding: ${theme.spacing._16} ${theme.spacing._20};
  display: flex;
  align-items: center;
`;
