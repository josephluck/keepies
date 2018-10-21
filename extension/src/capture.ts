import { messageKeepieMade } from "./messages";
import { getSettings, Settings } from "./settings";

function determineFileName(tab: chrome.tabs.Tab): string {
  return ["keepies", tab ? tab.title : "", Date.now()]
    .filter(val => !!val)
    .map(val => val.toString())
    .map(val => val.split(" ").join("-"))
    .join("-");
}

function isUrlInApps(settings: Settings, url: string): boolean {
  return !!settings.apps.find(app => url.includes(app.url) || url === app.url);
}

export async function capture() {
  const settings = await getSettings();
  chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
    const tab = tabs[0];
    if (tab && tab.url && isUrlInApps(settings, tab.url)) {
      chrome.tabs.captureVisibleTab(url => {
        chrome.downloads.download(
          {
            url,
            filename: `${determineFileName(tab)}.jpeg`
          },
          () => {
            chrome.runtime.sendMessage(messageKeepieMade());
          }
        );
      });
    }
  });
}
