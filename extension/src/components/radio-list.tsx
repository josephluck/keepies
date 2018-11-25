import * as React from "react";
import { Radio } from "./radio";
import styled from "styled-components";
import { theme } from "./theme";
import { Label } from "./label";
import { Loading } from "./loading";

const RadioListWrapper = styled.div`
  border: solid 1px ${theme.colors.border};
  max-height: 150px;
  overflow: auto;
  border-radius: ${theme.borderRadius._3};
`;

const OptionWrapper = styled(Radio)`
  padding: ${theme.spacing._8} ${theme.spacing._10};
  border-top: solid 1px ${theme.colors.border};
  box-shadow: 0 1px 0 0 ${theme.colors.border};
  margin-top: -1px;
  position: ${props => (props.isChecked ? "sticky" : "relative")};
  z-index: ${props => (props.isChecked ? 1 : 0)};
  top: 0;
  bottom: 0;
  background: ${theme.colors.white};
`;

const OptionLabelWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

interface Option {
  value: string | number;
  label: React.ReactNode;
}

export function RadioList({
  value,
  options,
  onChange,
  isLoading,
  loadingText
}: {
  value: string | number;
  options: Option[];
  onChange: (value: string | number) => void;
  isLoading: boolean;
  loadingText: React.ReactNode;
}) {
  return (
    <RadioListWrapper>
      {isLoading ? (
        <Loading>{loadingText}</Loading>
      ) : (
        <>
          {options.map(option => (
            <OptionWrapper
              key={option.value}
              label={
                <OptionLabelWrapper>
                  {option.label}
                  {option.value === value ? <Label>Chosen</Label> : null}
                </OptionLabelWrapper>
              }
              isChecked={option.value === value}
              onChange={() => onChange(option.value)}
            />
          ))}
        </>
      )}
    </RadioListWrapper>
  );
}
