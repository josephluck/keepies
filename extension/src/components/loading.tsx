import * as React from "react";

import { theme } from "./theme";
import styled from "styled-components";

const LoadingWrap = styled.div`
  padding: ${theme.spacing._36};
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: ${theme.font._18.size};
  line-height: ${theme.font._18.lineHeight};
  font-weight: ${theme.fontWeight._500};
  color: ${theme.colors.disabledLinkText};
`;

export function Loading({ children }: { children: React.ReactNode }) {
  return <LoadingWrap>{children}</LoadingWrap>;
}
