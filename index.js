// The main script for the extension
// The following are examples of some basic extension functionality

//You'll likely need to import extension_settings, getContext, and loadExtensionSettings from extensions.js
import { extension_settings, getContext, loadExtensionSettings } from "../../../extensions.js";

//You'll likely need to import some other functions from the main script
import { saveSettingsDebounced } from "../../../../script.js";

// Keep track of where your extension is located, name should match repo name
const extensionName = "st-extension-example";
const extensionFolderPath = `scripts/extensions/third-party/${extensionName}`;
const extensionSettings = extension_settings[extensionName];
const defaultSettings = {};

function mark_out_of_context(data) {
  const siblings = [];
  let prev = document.getElementsByClassName('lastInContext');
  if (prev.length > 0) {
    prev = prev[0].previousElementSibling;
  }
  while (prev) {
    siblings.unshift(prev);
    prev = prev.previousElementSibling;
  }

  document.querySelectorAll('.out-of-context').forEach(element => {
    element.classList.remove('out-of-context');
  });
  for (const ooc of siblings) {
    ooc.classList.add("out-of-context");
  }
}
 
// Loads the extension settings if they exist, otherwise initializes them to the defaults.
async function loadSettings() {
  //Create the settings if they don't exist
  extension_settings[extensionName] = extension_settings[extensionName] || {};
  if (Object.keys(extension_settings[extensionName]).length === 0) {
    Object.assign(extension_settings[extensionName], defaultSettings);
  }
}

// This function is called when the extension is loaded
jQuery(async () => {
  // Load settings when starting things up (if you have any)
  loadSettings();
  
  const { eventSource, event_types } = SillyTavern.getContext();
  eventSource.on(event_types.CHARACTER_MESSAGE_RENDERED, mark_out_of_context);
  eventSource.on(event_types.MORE_MESSAGES_LOADED, mark_out_of_context);
  more_messages_loaded
});
