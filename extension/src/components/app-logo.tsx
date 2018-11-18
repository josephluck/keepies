import * as React from "react";
import { Models } from "../api/models";
import { theme } from "./theme";
import styled from "styled-components";

const svgSize = theme.size.appIcon;
const progressBarThickness = 3;
const circleRadius = theme.size.appIcon / 2 - progressBarThickness / 2;
const circleCircumference = circleRadius * 2 * Math.PI;
const logoPadding = progressBarThickness * 3;

const AppIconOuter = styled.div`
  width: ${theme.size.appIcon}px;
  height: ${theme.size.appIcon}px;
  padding: ${logoPadding}px;
  position: relative;
  margin-right: ${theme.spacing._16};
  background: ${theme.colors.progressBackground};
  border-radius: ${theme.borderRadius.circle};
  overflow: hidden;
`;

const AppIcon = styled.div`
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

const AppInitials = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
  font-weight: ${theme.fontWeight.bold};
  font-size: ${theme.font._12.size};
  line-height: ${theme.font._12.lineHeight};
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
    const { app } = this.props;

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
      <AppIconOuter>
        <AppProgress
          percentage={
            percentageToNextKeepie > 100 ? 100 : percentageToNextKeepie
          }
        />
        <AppIcon style={iconStyle}>
          {!app.icon ? <AppInitials>{initials}</AppInitials> : null}
        </AppIcon>
      </AppIconOuter>
    );
  }
}
