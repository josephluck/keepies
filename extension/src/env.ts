interface Env {
  EXTENSION_ID?: string;
  GITHUB_OAUTH_APP_ID: string;
  GITHUB_OAUTH_APP_SECRET: string;
}

export const env: Env = {
  EXTENSION_ID: process.env.EXTENSION_ID,
  GITHUB_OAUTH_APP_ID: process.env.GITHUB_OAUTH_APP_ID,
  GITHUB_OAUTH_APP_SECRET: process.env.GITHUB_OAUTH_APP_SECRET
};
