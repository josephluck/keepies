import * as React from "react";
import { Formik, Field, FieldProps } from "formik";
import { Models } from "../api/models";
import { RadioList } from "./radio-list";
import styled from "styled-components";
import { theme } from "./theme";
import { Heading1, TertiaryText } from "./typography";
import { SettingsHeadingWrap } from "../views/settings";
import { AddAppText, SubmitFooter } from "./inline-form";
import { ActionLink } from "./action-link";
import { InputField } from "./input";

const FormWrapper = styled.div`
  background: ${theme.colors.white};
`;

const FormSection = styled.div`
  padding: ${theme.spacing._16} ${theme.spacing._20};
  border-bottom: solid 1px ${theme.colors.border};
`;

const TertiaryTextWithSpace = styled(TertiaryText)`
  display: block;
  margin-bottom: ${theme.spacing._8};
`;

const RemoveIntegrationConfirmationWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

interface Props {
  onSubmit: (fields: Fields) => any;
  repositories: Models.Repository[];
  initialValues: Fields;
  isLoading: boolean;
  removeGitHubIntegration: () => void;
}

interface State {
  removeIntegrationConfirmationShowing: boolean;
}

interface Fields {
  repositoryId: number;
  directoryName: string;
}

export class GitHubSettingsForm extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      removeIntegrationConfirmationShowing: false
    };
  }

  onSubmit = (values: Fields) => {
    this.props.onSubmit(values);
  };

  showRemoveIntegrationConfirmation = () => {
    this.setState({
      removeIntegrationConfirmationShowing: true
    });
  };

  hideRemoveIntegrationConfirmation = () => {
    this.setState({
      removeIntegrationConfirmationShowing: false
    });
  };

  render() {
    return (
      <Formik
        initialValues={this.props.initialValues}
        onSubmit={(values, state) => {
          this.onSubmit(values);
          state.resetForm();
        }}
        validate={(values: Fields) => {
          let errors: Partial<Record<keyof Fields, string>> = {};
          if (!values.repositoryId) {
            errors.repositoryId = "Please select a repository";
          }
          if (!values.directoryName) {
            errors.directoryName = "Please enter a directory name";
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
                <FormSection>
                  <SettingsHeadingWrap>
                    <Heading1>Repository</Heading1>
                  </SettingsHeadingWrap>
                  <TertiaryTextWithSpace>
                    Choose which GitHub repository you would like to sync
                    Keepies to.
                  </TertiaryTextWithSpace>
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
                          isLoading={this.props.isLoading}
                          loadingText="Loading repositories"
                        />
                      );
                    }}
                  />
                </FormSection>

                <FormSection>
                  <SettingsHeadingWrap>
                    <Heading1>Directory</Heading1>
                  </SettingsHeadingWrap>
                  <TertiaryTextWithSpace>
                    Choose a directory name you would like Keepies to store
                    images to.
                  </TertiaryTextWithSpace>
                  <Field
                    name="directoryName"
                    render={({ field }: FieldProps<Fields>) => {
                      return <InputField {...field} />;
                    }}
                  />
                </FormSection>

                <FormSection>
                  <TertiaryTextWithSpace>
                    Had enough of the GitHub integration? You can remove it
                    below.
                  </TertiaryTextWithSpace>
                  <RemoveIntegrationConfirmationWrap>
                    {this.state.removeIntegrationConfirmationShowing ? (
                      <>
                        <ActionLink
                          onClick={this.props.removeGitHubIntegration}
                        >
                          Yes, remove
                        </ActionLink>
                        <ActionLink
                          onClick={this.hideRemoveIntegrationConfirmation}
                        >
                          No, go back
                        </ActionLink>
                      </>
                    ) : (
                      <ActionLink
                        onClick={this.showRemoveIntegrationConfirmation}
                      >
                        Remove GitHub integration
                      </ActionLink>
                    )}
                  </RemoveIntegrationConfirmationWrap>
                </FormSection>
                <SubmitFooter onClick={state.submitForm}>
                  <AddAppText>Save settings</AddAppText>
                </SubmitFooter>
              </form>
            </FormWrapper>
          );
        }}
      </Formik>
    );
  }
}
