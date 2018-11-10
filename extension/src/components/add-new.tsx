import * as React from "react";
import * as ReactDOM from "react-dom";
import styled from "styled-components";
import { theme } from "./theme";
import { Formik, Field, FieldProps } from "formik";
import { ActionLink } from "./action-link";

const Wrapper = styled.div`
  background: ${theme.colors.form};
  position: relative;
  overflow: hidden;
`;

const Form = styled.form<{ showing: boolean }>`
  display: flex;
  align-items: center;
  transition: all 333ms ease;
  transform: translateY(${props => (props.showing ? "0" : "-100%")});
  opacity: ${props => (props.showing ? 1 : 0)};
`;

const Input = styled.input`
  padding: ${theme.spacing._16} ${theme.spacing._20};
  border: 0;
  flex: 1;
  background: transparent;
  outline: none;
`;

const SubmitButton = styled(ActionLink)`
  padding: ${theme.spacing._16} ${theme.spacing._20};
  cursor: pointer;
`;

const Overlay = styled.div<{ showing: boolean }>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: ${props => (props.onClick ? "pointer" : "unset")};
  transition: all 333ms ease;
  transform: translateY(${props => (props.showing ? "0" : "100%")});
  opacity: ${props => (props.showing ? 1 : 0)};
  pointer-events: ${props => (props.showing ? "unset" : "none")};
`;

const SuccessOverlay = styled(Overlay)`
  background: green;
`;

const AddAppText = styled.span`
  font-size: ${theme.font._16.size};
  line-height: ${theme.font._16.lineHeight};
  font-weight: ${theme.fontWeight._600};
  color: ${theme.colors.link};
`;

const SuccessText = styled(AddAppText)`
  color: ${theme.colors.white};
`;

const AlreadyAddedText = styled(AddAppText)`
  color: ${theme.colors.disabledLinkText};
  font-size: ${theme.font._14.size};
  line-height: ${theme.font._14.lineHeight};
  font-weight: ${theme.fontWeight._400};
`;

interface Props {
  onSubmit: (name) => any;
  alreadyAdded: boolean;
}

interface State {
  formFocussed: boolean;
  showSuccessOverlay: boolean;
}

interface Fields {
  name: string;
}

const initialValues: Fields = {
  name: ""
};

export class AddNew extends React.Component<Props, State> {
  inputElm: null | HTMLInputElement = null;

  constructor(props: Props) {
    super(props);
    this.state = {
      formFocussed: false,
      showSuccessOverlay: false
    };
  }

  handleFocus = () => {
    this.setState({ formFocussed: true });
  };

  handleBlur = () => {
    this.setState({ formFocussed: false });
  };

  showForm = () => {
    if (!this.props.alreadyAdded) {
      this.setState({ formFocussed: true });
      if (this.inputElm) {
        this.inputElm.focus();
      }
    }
  };

  onSubmit = (values: Fields) => {
    this.props.onSubmit(values);

    if (this.inputElm) {
      this.inputElm.blur();
    }

    this.setState({
      showSuccessOverlay: true,
      formFocussed: false
    });

    window.setTimeout(() => {
      this.setState({
        showSuccessOverlay: false
      });
    }, 4000);
  };

  render() {
    return (
      <Formik
        initialValues={initialValues}
        onSubmit={(values, state) => {
          this.onSubmit(values);
          state.resetForm();
        }}
        validate={values => {
          let errors: Partial<Record<keyof Fields, string>> = {};
          if (!values.name) {
            errors.name = "Please enter an app name";
          }
          return errors;
        }}
      >
        {state => {
          const formShowing =
            !this.state.showSuccessOverlay &&
            (this.state.formFocussed || state.values.name.length > 0);
          return (
            <Wrapper>
              <Form onSubmit={state.handleSubmit} showing={formShowing}>
                <Field
                  name="name"
                  render={({ field, form }: FieldProps<Fields>) => (
                    <Input
                      required
                      {...field}
                      onFocus={this.handleFocus}
                      onBlur={this.handleBlur}
                      ref={elm =>
                        (this.inputElm = ReactDOM.findDOMNode(
                          elm
                        ) as HTMLInputElement)
                      }
                    />
                  )}
                />
                <SubmitButton onClick={state.submitForm}>Add App</SubmitButton>
              </Form>
              <SuccessOverlay showing={this.state.showSuccessOverlay}>
                <SuccessText>App added</SuccessText>
              </SuccessOverlay>
              <Overlay
                showing={
                  !this.state.showSuccessOverlay &&
                  (this.props.alreadyAdded || !formShowing)
                }
                onClick={!this.props.alreadyAdded ? this.showForm : null}
              >
                {this.props.alreadyAdded ? (
                  <AlreadyAddedText>
                    You have already added this app
                  </AlreadyAddedText>
                ) : (
                  <AddAppText>Add this app</AddAppText>
                )}
              </Overlay>
            </Wrapper>
          );
        }}
      </Formik>
    );
  }
}
