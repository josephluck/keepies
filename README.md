## :camera: Keepies - a memento of your app throughout time.

Keepies is a browser extension that periodically captures screenshots of your application during development so that you can maintain a history of your applications design and development over time.

The name keepie refers to "keep" and "keepie uppie" and functions as the terminology for a single screenshot taken by the extension.

[Developer documentation](./DEVELOPMENT.md)

# Functionality

At the time of writing, it's unclear whether the functionality detailed below is even possible.

https://developer.chrome.com/extensions/devguide

### Core functionality

- Capture - Captures screenshots of a URL periodically
- Apps - Ability to set up "apps" which instruct the extension to name files appropriately
- Store - Automatically downloads images without user interaction

### Additional functionality

- Idle - Removes duplicate images in case of idle screen
- Device - Capture shots at different resolutions
- Integrations - 3rd party integrations
- Search - Search for images direct from the extension
- Diffs - Visual diffing between images
- Regions - Ability to specify regions of a page to screenshot
- Ignore - An option for a particular page to be ignored by the capture
- Daemon - Extra control over file download location and integrations

# Functionality explained

## Capture

Periodically takes keepies of the current page at a set interval. Only takes screenshots of origins that the user explicitly authenticates.

Each keepie is given a unique filename based off the current URL and time, possibly page title too.

> Sensible default time interval between keepies but can be user overridden.

> The file name would likely contain all the information necessary to search for an image.

https://developer.chrome.com/extensions/desktopCapture

## Apps

An app signifies a URL origin unique to a single website. Apps allow multiple websites to be captured independently. Apps can be configured through the extensions interface and consist of a name and a URL origin.

> URL origin may not be enough to distinguish between two apps. For example, I might have two apps running on `localhost:3000`. May need to distinguish using an optional HTML meta tag i.e. `<meta name="keepie-app" content="Keepie" />`

## Store

After a keepie is taken, it is automatically downloaded to a specified directory on the users machine.

https://developer.chrome.com/extensions/downloads

## Idle

If an image is identical to a previous keepie of the same URL, do not save it to disk. This is useful for preventing duplicate keepies when the machine is left idle.

https://github.com/HuddleEng/Resemble.js

## Device

Captures multiple keepies at different device sizes. Defaults to mobile, tablet and desktop but can be configured per app.

## Integrations

Integrations allow for automatic backup of keepies to a 3rd party i.e. github or dropbox.

> Integrations would likely require a daemon on the user's machine to work. See below for more information.

## Search

Ability to search for keepies through the extension interface.

> This may prove difficult if a custom directory location is used.

## Diffs

Ability to perform regression testing on screenshots made by the same URL. In truth, this is likely a bit out of scope for this utility, but it's a potential nice to have.

https://github.com/HuddleEng/Resemble.js

## Regions

Ability to specify regions on a page to screenshot. Most likely this would be a CSS selector pointing to a unique DOM node on the page. Regions would be captured in addition to the standard full page screenshots.

## Daemon

A daemon on the client-side to periodically watch the browser's downloads directory for keepies would allow moving keepies to a user-specified directory. Otherwise, the standard browser directory must be used. A daemon also allow directories to be created per app.
