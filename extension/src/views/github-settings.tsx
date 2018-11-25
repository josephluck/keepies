import * as React from "react";
import { State, Actions } from "../ui";
import { GitHubSettingsForm } from "../components/github-settings-form";

export function GitHubSettings({
  actions,
  state
}: {
  actions: Actions;
  state: State;
}) {
  return (
    <>
      <GitHubSettingsForm
        repositories={state.gitHubRepositories}
        isLoading={state.loading.gitHubRepositories}
        initialValues={{
          repositoryId: state.settings.chosenGitHubSyncRepo
            ? state.settings.chosenGitHubSyncRepo.id
            : 0
        }}
        onSubmit={values =>
          actions.storeChosenGitHubRepository(values.repositoryId)
        }
        removeGitHubIntegration={actions.removeGitHubIntegration}
      />
    </>
  );
}
