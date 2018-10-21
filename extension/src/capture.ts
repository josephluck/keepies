import { messageKeepieMade } from "./messages";

export function capture() {
  chrome.tabs.captureVisibleTab(url => {
    chrome.downloads.download(
      {
        url,
        filename: `${Date.now()}.jpeg`
      },
      () => {
        chrome.runtime.sendMessage(messageKeepieMade());
      }
    );
  });
}
