import { theme } from "./theme";
import styled from "styled-components";

export const LogoWrap = styled.div`
  padding: ${theme.spacing._10} ${theme.spacing._20};
  border-bottom: solid 1px ${theme.colors.border};
  text-align: center;
`;

export const Logo = styled.div`
  display: inline-block;
  font-weight: ${theme.fontWeight.bold};
  font-size: ${theme.font._14.size};
  line-height: ${theme.font._14.lineHeight};
  color: ${theme.colors.logoRight};
  letter-spacing: 2px;
  background: linear-gradient(
    to right,
    ${theme.colors.logoLeft} 0%,
    ${theme.colors.logoRight} 100%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-transform: uppercase;
`;
