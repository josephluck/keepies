import * as React from "react";
import styled from "styled-components";
import { theme } from "../components/theme";
import { Box } from "@rebass/grid";
import { LogoWrap, Logo } from "../components/logo";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCog, faTimes } from "@fortawesome/free-solid-svg-icons";
import { State, Actions } from "../ui";

const HeadingWrap = styled.div`
  display: flex;
  align-items: center;
  padding: ${theme.spacing._10} ${theme.spacing._20};
  border-bottom: solid 1px ${theme.colors.border};
`;

const HeadingIconsWrap = styled.div`
  position: relative;
  display: flex;
  flex: 1;
  justify-content: flex-end;
  cursor: pointer;
`;

const IconWrap = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const HeadingIcon = styled.div<{ inView: boolean }>`
  font-size: ${theme.font._16.size};
  line-height: ${theme.font._16.size};
  color: ${theme.colors.link};
  position: relative;
  transition: all 333ms ease;
  transform: translateY(${props => (props.inView ? "0%" : "-50%")});
  opacity: ${props => (props.inView ? 1 : 0)};
`;

const CloseIcon = styled(HeadingIcon)`
  position: absolute;
  top: 0;
  color: ${theme.colors.disabledLinkText};
  transform: translateY(${props => (props.inView ? "0%" : "50%")});
`;

export function Heading({
  actions,
  state
}: {
  actions: Actions;
  state: State;
}) {
  return (
    <HeadingWrap>
      <Box flex={1} />
      <LogoWrap>
        <Logo>Keepies</Logo>
      </LogoWrap>
      <HeadingIconsWrap
        onClick={() =>
          actions.setView(state.view === "apps" ? "settings" : "apps")
        }
      >
        <IconWrap>
          <HeadingIcon inView={state.view === "apps"}>
            <FontAwesomeIcon icon={faCog} />
          </HeadingIcon>
          <CloseIcon inView={state.view === "settings"}>
            <FontAwesomeIcon icon={faTimes} />
          </CloseIcon>
        </IconWrap>
      </HeadingIconsWrap>
    </HeadingWrap>
  );
}
