import { ALARM_CAPTURE } from "./messages";
import { capture } from "./capture";

function scheduleCaptures() {
  chrome.alarms.create(ALARM_CAPTURE, {
    when: Date.now() + 5000,
    periodInMinutes: 1
  });
}

function listenForCaptures() {
  chrome.alarms.onAlarm.addListener(alarm => {
    if (alarm.name === ALARM_CAPTURE) {
      capture();
    }
  });
}

chrome.runtime.onInstalled.addListener(() => {
  scheduleCaptures();
  listenForCaptures();
});
