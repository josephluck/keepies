import * as React from "react";
import { Radio } from "./radio";
import styled from "styled-components";
import { theme } from "./theme";
import { Label } from "./label";
import { Loading } from "./loading";
import * as FuzzySearch from "fuzzy-search";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Collapse } from "react-collapse";

const RadioListWrapper = styled.div`
  position: relative;
  border: solid 1px ${theme.colors.border};
  border-radius: ${theme.borderRadius._3};
  display: flex;
  flex-direction: column;
  max-height: 160px;
  overflow: hidden;
`;

const ScrollWrapper = styled.div`
  flex: 1;
  overflow: auto;
`;

const InputWrapper = styled.div`
  flex: 0 0 auto;
  position: relative;
  border-bottom: solid 1px ${theme.colors.border};
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

const SearchInput = styled.input`
  background: ${theme.colors.white};
  font-size: ${theme.font._14.size};
  line-height: ${theme.font._14.lineHeight};
  font-weight: ${theme.fontWeight._500};
  outline: none;
  padding: ${theme.spacing._10};
  padding-left: ${theme.spacing._34};
  border: 0;
  width: 100%;
`;

const SearchIcon = styled.div`
  font-size: ${theme.font._16.size};
  line-height: ${theme.font._16.size};
  pointer-events: none;
  position: absolute;
  left: ${theme.spacing._10};
  top: 50%;
  transform: translateY(-50%);
  color: ${theme.colors.searchInputIcon};
`;

interface Option {
  value: string | number;
  label: React.ReactNode;
}

interface Props {
  value: string | number;
  options: Option[];
  onChange: (value: string | number) => void;
  isLoading: boolean;
  loadingText: React.ReactNode;
}

interface State {
  search: string;
  options: Option[];
}

export class RadioList extends React.Component<Props, State> {
  searcher: FuzzySearch = null;

  constructor(props: Props) {
    super(props);
    this.state = {
      search: "",
      options: props.options
    };
    this.searcher = new FuzzySearch(props.options, ["label"], {
      caseSensitive: false
    });
  }

  componentDidUpdate(prevProps: Props) {
    if (prevProps.options.length !== this.props.options.length) {
      this.searcher = new FuzzySearch(this.props.options, ["label"], {
        caseSensitive: false
      });
      this.setState({
        options: this.state.search
          ? this.searcher.search(this.state.search)
          : this.props.options
      });
    }
  }

  onTextSearch = (search: string) => {
    console.log(this.searcher.search(search));
    this.setState({
      search,
      options: this.state.search
        ? this.searcher.search(search)
        : this.props.options
    });
  };

  render() {
    const { value, onChange, isLoading, loadingText } = this.props;
    const { search, options } = this.state;

    return (
      <Collapse isOpened={true}>
        <RadioListWrapper>
          {isLoading ? (
            <Loading>{loadingText}</Loading>
          ) : (
            <>
              <InputWrapper>
                <SearchIcon>
                  <FontAwesomeIcon icon={faSearch} />
                </SearchIcon>
                <SearchInput
                  value={search}
                  onInput={(e: any) => this.onTextSearch(e.target.value)}
                />
              </InputWrapper>
              <ScrollWrapper>
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
              </ScrollWrapper>
            </>
          )}
        </RadioListWrapper>
      </Collapse>
    );
  }
}
