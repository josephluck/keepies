import styled from "styled-components";
import { theme } from "./theme";

export const Heading1 = styled.span`
  font-size: ${theme.font._16.size};
  line-height: ${theme.font._16.lineHeight};
  font-weight: ${theme.fontWeight._500};
  color: ${theme.colors.font};
`;

export const CopyText = styled.span`
  font-weight: ${theme.fontWeight._400};
  font-size: ${theme.font._12.size};
  line-height: ${theme.font._12.lineHeight};
  color: ${theme.colors.font};
`;

export const TertiaryText = styled(CopyText)`
  color: ${theme.colors.disabledLinkText};
`;

export const BoldTertiaryText = styled(TertiaryText)`
  font-weight: ${theme.fontWeight._500};
`;

export const StrongCopyText = styled(CopyText)`
  font-weight: ${theme.fontWeight.bold};
`;
