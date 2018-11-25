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
    | "chosenGitHubSyncRepo";

  export interface Settings extends Record<SettingsKeys, any> {
    apps: Models.App[];
    gitHubAuthenticationToken: null | string;
    chosenGitHubSyncRepo: null | Models.Repository;
  }

  export interface Repository {
    id: number;
    name: string;
    full_name: string;
    private: boolean;
    description: string;
    language: string;
    git_url: string;
    archived: boolean;
    created_at: string;
    updated_at: string;
    pushed_at: string;
    permissions: {
      admin: boolean;
      push: boolean;
      pull: boolean;
    };
    default_branch: string;
  }
}
