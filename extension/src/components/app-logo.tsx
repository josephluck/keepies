import * as React from "react";
import { Models } from "../api/models";
import { theme } from "./theme";
import styled from "styled-components";
import { Icon } from "./logo";

const KeepiesLogo = styled(Icon)`
  position: absolute;
  top: 50%;
  left: 50%;
  margin-left: -${theme.iconLogo._22.halfSize};
  margin-top: -${theme.iconLogo._22.halfSize};
`;

const svgSize = theme.size.appIcon;
const progressBarThickness = 3;
const circleRadius = theme.size.appIcon / 2 - progressBarThickness / 2;
const circleCircumference = circleRadius * 2 * Math.PI;
const logoPadding = progressBarThickness * 2;

export const AppIcon = styled.div`
  width: ${theme.size.appIcon - logoPadding * 2}px;
  height: ${theme.size.appIcon - logoPadding * 2}px;
  background-size: contain;
  background-position: center center;
  background-repeat: no-repeat;
  overflow: hidden;
  flex: 0 0 auto;
  position: relative;
  border-radius: ${theme.borderRadius.circle};
`;

const AppIconOuter = styled.div<{ disabled?: boolean }>`
  width: ${theme.size.appIcon}px;
  height: ${theme.size.appIcon}px;
  padding: ${logoPadding}px;
  position: relative;
  margin-right: ${theme.spacing._16};
  background: ${theme.colors.progressBackground};
  border-radius: ${theme.borderRadius.circle};
  overflow: hidden;
  cursor: ${props => (props.disabled ? "not-allowed" : "pointer")};
  ${AppIcon} {
    transition: all 333ms ease;
    transform: translateY(0%);
    opacity: 1;
  }
  ${KeepiesLogo} {
    transition: all 300ms ease;
    transform: translateY(50%);
    opacity: 0;
  }
  &:hover {
    ${AppIcon} {
      transform: ${props =>
        props.disabled ? "translateY(0%)" : "translateY(-50%)"};
      opacity: ${props => (props.disabled ? 1 : 0)};
    }
    ${KeepiesLogo} {
      transform: ${props =>
        props.disabled ? "translateY(50%)" : "translateY(0%)"};
      opacity: ${props => (props.disabled ? 0 : 1)};
    }
  }
`;

const AppInitials = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
  font-weight: ${theme.fontWeight.bold};
  font-size: ${theme.font._10.size};
  line-height: ${theme.font._10.lineHeight};
  color: ${theme.colors.white};
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const AppProgressSvg = styled.svg`
  position: absolute;
  top: 0;
  left: 0;
  width: ${svgSize}px;
  height: ${svgSize}px;
`;

const ProgressCircle = styled.circle<{ ready: boolean }>`
  transition: 1s all linear;
  transform: rotate(-90deg);
  transform-origin: 50% 50%;
  stroke: ${props =>
    props.ready
      ? theme.colors.progressCircleReady
      : theme.colors.progressCircle};
  fill: transparent;
  stroke-width: ${progressBarThickness};
  stroke-dasharray: ${circleCircumference} ${circleCircumference};
`;

function AppProgress({ percentage }: { percentage: number }) {
  return (
    <AppProgressSvg>
      <ProgressCircle
        ready={percentage >= 99}
        style={{
          strokeDashoffset:
            circleCircumference - (percentage / 100) * circleCircumference
        }}
        r={circleRadius}
        cx={svgSize / 2}
        cy={svgSize / 2}
      />
    </AppProgressSvg>
  );
}

interface Props {
  app: Models.App;
  onClick: () => any;
  disableOnClick: boolean;
}

export class AppLogo extends React.Component<Props, {}> {
  interval: number = -1;

  constructor(props: Props) {
    super(props);
  }

  componentDidMount() {
    this.interval = window.setInterval(() => this.forceUpdate(), 1000);
  }

  componentWillUnmount() {
    window.clearInterval(this.interval);
  }

  render() {
    const { app, onClick, disableOnClick } = this.props;

    const fullDurationToNextKeepie = app.nextKeepieDue - app.lastKeepieOn;
    const currentDurationToNextKeepie = Date.now() - app.lastKeepieOn;
    const percentageToNextKeepie =
      (currentDurationToNextKeepie / fullDurationToNextKeepie) * 100;

    const initials = `${app.name.charAt(0)}${app.name.charAt(1)}`;
    const iconStyle: React.CSSProperties = app.icon
      ? { backgroundImage: `url(${app.icon})` }
      : {
          background: theme.colors.avatarGradient,
          borderRadius: theme.borderRadius.circle
        };

    return (
      <AppIconOuter
        onClick={disableOnClick ? null : onClick}
        disabled={disableOnClick}
      >
        <AppProgress
          percentage={
            percentageToNextKeepie > 100 ? 100 : percentageToNextKeepie
          }
        />
        <AppIcon style={iconStyle}>
          {!app.icon ? <AppInitials>{initials}</AppInitials> : null}
        </AppIcon>
        <KeepiesLogo size="_22" />
      </AppIconOuter>
    );
  }
}
