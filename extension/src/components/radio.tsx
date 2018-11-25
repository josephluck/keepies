import * as React from "react";
import { theme } from "./theme";
import styled from "styled-components";

const RadioWrapper = styled.label`
  display: flex;
  align-items: center;
`;

const FakeRadioWrapper = styled.div`
  position: relative;
`;

const FakeRadio = styled.input`
  position: absolute;
  top: 0;
  left: 0;
  opacity: 0;
`;

const RadioCircle = styled.div<{ isChecked: boolean; disabled: boolean }>`
  position: relative;
  width: ${theme.size.radio};
  height: ${theme.size.radio};
  border-radius: ${theme.borderRadius.circle};
  transition: all 150ms ease;
  background: ${props =>
    props.isChecked && !props.disabled
      ? theme.colors.radioCheckedBorder
      : "transparent"};
  border: ${props =>
    props.isChecked && !props.disabled
      ? `solid 2px ${theme.colors.radioCheckedBorder}`
      : `solid 2px ${theme.colors.radioUncheckedBorder}`};
  opacity: ${props => (props.disabled ? 0.5 : 1)};
  &:after {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    margin-top: -2px;
    margin-left: -2px;
    transition: all 150ms ease;
    opacity: ${props => (props.isChecked && !props.disabled ? 1 : 0)};
    transform: ${props =>
      props.isChecked && !props.disabled ? "scale(1, 1)" : "scale(0, 0)"};
    background: ${theme.colors.white};
    width: 4px;
    height: 4px;
    border-radius: ${theme.borderRadius.circle};
  }
`;
const RadioLabel = styled.div`
  margin-left: ${theme.spacing._8};
  font-size: ${theme.font._14.size};
  line-height: ${theme.font._14.lineHeight};
  flex: 1;
`;

export function Radio({
  isChecked,
  onChange,
  className = "",
  label,
  isTouched,
  error,
  disabled = false
}: {
  isChecked: boolean;
  onChange: () => any;
  className?: string;
  label?: React.ReactNode;
  isTouched?: boolean;
  error?: string;
  disabled?: boolean;
}) {
  return (
    <>
      <RadioWrapper className={className}>
        <FakeRadioWrapper>
          <FakeRadio
            type="radio"
            onChange={onChange}
            checked={isChecked}
            disabled={disabled}
          />
          <RadioCircle isChecked={isChecked} disabled={disabled} />
        </FakeRadioWrapper>
        {label ? <RadioLabel>{label}</RadioLabel> : null}
      </RadioWrapper>
      {isTouched && error ? <div>{error}</div> : null}
    </>
  );
}
