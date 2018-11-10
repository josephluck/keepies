import * as React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { Models } from "../api/models";
import urlParse = require("url-parse");

const Wrapper = styled.div`
  border-bottom: solid 1px black;
  padding: 16px 20px;
  display: flex;
  align-items: center;
`;

const AppIcon = styled.div`
  width: 40px;
  height: 40px;
  margin-right: 20px;
  background-size: contain;
  background-position: center center;
  background-repeat: no-repeat;
  background: black;
  border-radius: 9999px;
  overflow: hidden;
  flex: 0 0 auto;
  position: relative;
`;

const AppName = styled.span`
  margin-right: 20px;
  font-size: 16px;
  line-height: 20px;
  font-weight: 500;
  flex: 1;
`;

const ExpansionIcon = styled.div<{ isExpanded: boolean }>`
  position: relative;
  width: 16px;
  height: 16px;
  font-size: 16px;
  line-height: 16px;
  color: black;
  transition: all 333ms ease;
  transform: rotate(${props => (props.isExpanded ? "180deg" : "0deg")});
`;

const AppInitials = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
  font-weight: bold;
  font-size: 12px;
  line-height: 12px;
  color: white;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

export function App({ app }: { app: Models.App }) {
  const initials = `${app.name.charAt(0)}${app.name.charAt(1)}`;
  const iconStyle = app.icon ? { backgroundImage: `url(${app.icon})` } : {};
  return (
    <Wrapper>
      <AppIcon style={iconStyle}>
        {!app.icon ? <AppInitials>{initials}</AppInitials> : null}
      </AppIcon>
      <AppName>{app.origin}</AppName>
      <ExpansionIcon isExpanded={false}>
        <FontAwesomeIcon icon={faChevronDown} />
      </ExpansionIcon>
    </Wrapper>
  );
}
