import * as React from "react";
import { Formik, Field, FieldProps } from "formik";
import { Models } from "../api/models";
import { RadioList } from "./radio-list";
import styled from "styled-components";
import { theme } from "./theme";
import { PrimaryButton } from "./button";
import { Heading1, TertiaryText } from "./typography";
import { SettingsHeadingWrap } from "../views/settings";

const FormWrapper = styled.div`
  padding: ${theme.spacing._16} ${theme.spacing._20};
  background: ${theme.colors.white};
`;

const FormFieldSpacer = styled.div`
  margin-bottom: ${theme.spacing._16};
`;

const TertiaryTextWithSpace = styled(TertiaryText)`
  display: block;
  margin-bottom: ${theme.spacing._8};
`;

interface Props {
  onSubmit: (fields: Fields) => any;
  repositories: Models.Repository[];
  initialValues: Fields;
}

interface State {}

interface Fields {
  repositoryId: number;
}

export class ChooseRepo extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {};
  }

  onSubmit = (values: Fields) => {
    this.props.onSubmit(values);
  };

  render() {
    return (
      <Formik
        initialValues={this.props.initialValues}
        onSubmit={(values, state) => {
          this.onSubmit(values);
          state.resetForm();
        }}
        validate={values => {
          let errors: Partial<Record<keyof Fields, string>> = {};
          if (!values.repositoryId) {
            errors.repositoryId = "Please select a repository";
          }
          return errors;
        }}
      >
        {state => {
          return (
            <FormWrapper>
              <form
                onSubmit={e => {
                  e.preventDefault();
                  state.handleSubmit(e);
                }}
              >
                <SettingsHeadingWrap>
                  <Heading1>GitHub repository</Heading1>
                </SettingsHeadingWrap>
                <TertiaryTextWithSpace>
                  Choose which GitHub repository you would like to sync Keepies
                  to.
                </TertiaryTextWithSpace>
                <FormFieldSpacer>
                  <Field
                    name="repositoryId"
                    render={({ field, form }: FieldProps<Fields>) => {
                      return (
                        <RadioList
                          options={this.props.repositories.map(repo => ({
                            value: repo.id,
                            label: repo.name
                          }))}
                          value={field.value}
                          onChange={repositoryId => {
                            form.setFieldValue("repositoryId", repositoryId);
                          }}
                        />
                      );
                    }}
                  />
                </FormFieldSpacer>
                <PrimaryButton onClick={state.submitForm} type="button">
                  Save
                </PrimaryButton>
              </form>
            </FormWrapper>
          );
        }}
      </Formik>
    );
  }
}
