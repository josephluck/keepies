import * as React from "react";
import * as ReactDOM from "react-dom";
import { Formik, Field, FieldProps } from "formik";
import {
  FormWrapper,
  Form,
  Input,
  SubmitButton,
  SuccessOverlay,
  SuccessText,
  Overlay,
  AlreadyAddedText,
  AddAppText
} from "./inline-form";

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
            <FormWrapper>
              <Form onSubmit={state.handleSubmit} showing={formShowing}>
                <Field
                  name="name"
                  render={({ field, form }: FieldProps<Fields>) => (
                    <Input
                      {...field}
                      required
                      placeholder="App name"
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
            </FormWrapper>
          );
        }}
      </Formik>
    );
  }
}
