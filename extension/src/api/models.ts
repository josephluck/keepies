export namespace Models {
  export interface App {
    icon?: string;
    name: string;
    origin: string;
    lastKeepieOn: number;
    nextKeepieDue: number;
  }

  export type SettingsKeys =
    | "apps"
    | "gitHubAuthenticationToken"
    | "chosenGitHubSyncRepo"
    | "gitHubDirectoryName";

  export interface Settings extends Record<SettingsKeys, any> {
    apps: Models.App[];
    gitHubAuthenticationToken: null | string;
    chosenGitHubSyncRepo: null | Models.Repository;
    gitHubDirectoryName: null | string;
  }

  export interface Repository {
    id: number;
    name: string;
    full_name: string;
    private: boolean;
    description: string;
    language: string;
    git_url: string;
    html_url: string;
    archived: boolean;
    created_at: string;
    updated_at: string;
    pushed_at: string;
    owner: {
      login: string;
    };
    permissions: {
      admin: boolean;
      push: boolean;
      pull: boolean;
    };
    default_branch: string;
  }
}
