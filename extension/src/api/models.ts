export namespace Models {
  export interface App {
    icon?: string;
    name: string;
    origin: string;
    numberOfKeepiesMade: number;
    lastKeepieOn: number;
    nextKeepieDue: number;
  }

  export type SyncSettingsKeys =
    | "apps"
    | "gitHubAuthenticationToken"
    | "chosenGitHubSyncRepo"
    | "gitHubDirectoryName";

  export type LocalSettingsKeys = "lastCaptureDataUrl";

  export type SettingsKeys = SyncSettingsKeys | LocalSettingsKeys;

  export interface Settings extends Record<SettingsKeys, any> {
    apps: Models.App[];
    gitHubAuthenticationToken: null | string;
    chosenGitHubSyncRepo: null | Models.Repository;
    gitHubDirectoryName: null | string;
    lastCaptureDataUrl: string;
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
