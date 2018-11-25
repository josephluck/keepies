import * as React from "react";
import { State, Actions } from "../ui";
import { ChooseRepo } from "../components/choose-repo";

export function GitHubSettings({
  actions,
  state
}: {
  actions: Actions;
  state: State;
}) {
  return (
    <>
      <ChooseRepo
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
      />
    </>
  );
}
