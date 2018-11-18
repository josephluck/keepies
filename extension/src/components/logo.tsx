import * as React from "react";
import { theme } from "./theme";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera } from "@fortawesome/free-solid-svg-icons";

export const LogoWrap = styled.div`
  text-align: center;
`;

export const Logo = styled.div`
  display: inline-block;
  font-weight: ${theme.fontWeight.bold};
  font-size: ${theme.font._16.size};
  line-height: ${theme.font._16.lineHeight};
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

type IconSize = "large" | "medium" | "_22" | "small";

const IconWrap = styled.div<{ size: IconSize }>`
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${theme.colors.avatarGradient};
  color: ${theme.colors.white};
  width: ${props =>
    props.size === "small"
      ? theme.iconLogo._16.outer
      : props.size === "_22"
      ? theme.iconLogo._22.outer
      : props.size === "medium"
      ? theme.iconLogo._48.outer
      : theme.iconLogo._128.outer};
  height: ${props =>
    props.size === "small"
      ? theme.iconLogo._16.outer
      : props.size === "_22"
      ? theme.iconLogo._22.outer
      : props.size === "medium"
      ? theme.iconLogo._48.outer
      : theme.iconLogo._128.outer};
  font-size: ${props =>
    props.size === "small"
      ? theme.iconLogo._16.inner
      : props.size === "_22"
      ? theme.iconLogo._22.inner
      : props.size === "medium"
      ? theme.iconLogo._48.inner
      : theme.iconLogo._128.inner};
  line-height: ${props =>
    props.size === "small"
      ? theme.iconLogo._16.inner
      : props.size === "_22"
      ? theme.iconLogo._22.inner
      : props.size === "medium"
      ? theme.iconLogo._48.inner
      : theme.iconLogo._128.inner};
  border-radius: ${props =>
    props.size === "small"
      ? theme.iconLogo._16.borderRadius
      : props.size === "_22"
      ? theme.iconLogo._22.borderRadius
      : props.size === "medium"
      ? theme.iconLogo._48.borderRadius
      : theme.iconLogo._128.borderRadius};
`;

export function Icon({
  size = "large",
  className = ""
}: {
  size?: IconSize;
  className?: string;
}) {
  return (
    <IconWrap size={size} className={className}>
      <FontAwesomeIcon icon={faCamera} />
    </IconWrap>
  );
}
