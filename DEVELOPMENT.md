# Development

## Set up

- `git clone` this repo
- Install `node`, `yarn` and Google Chrome
- Install dependencies via `yarn install` from the root of the repo
- Run `yarn build` from the `extension` directory
- Visit `chrome://extensions/` and enable developer mode
- Click `Load unpacked` and select the `extension/build` directory from this repo

> Load unpacked will automatically replace the extension's files when running `yarn build` from the extension directory

> If something is awry, try removing the extension from `chrome://extensions/` and adding it again via `Load unpacked`

## External resources

### Published extension

https://chrome.google.com/webstore/detail/keepies/iaoliifgcjehbolmlinbgdokjidpljji

### Chrome webstore dashboard

The extension is published as a chrome webstore product. It can be updated here:

https://chrome.google.com/webstore/developer/dashboard

> Note that the extensions public key can be found here. When developing locally a base64 encoded versin of the public key can be used as the `key` property in `manifest.json`. This trick allows redirect URLs from `chrome.launchWebAuthFlow` [More reading](https://developer.chrome.com/apps/identity#method-launchWebAuthFlow) to direct to the "Unpacked" extension in development mode. **Note** it's super important that this key is removed before updating the public extension on the chrome store.

### GitHub OAuth application

The GitHub OAuth extension is used to authorise GitHub repository access to the Keepie extension. The keys are available here:

https://github.com/settings/applications/938404

### Chrome authentication keys

https://console.developers.google.com/apis/credentials?folder=&organizationId=&project=keepies-223221
