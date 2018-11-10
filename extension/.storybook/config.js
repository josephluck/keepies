import * as React from "react";
import { storiesOf } from "@storybook/react";
const configure = require("@storybook/react").configure;
import { GlobalStyles } from "../src/components/theme";

function sOf(a, b) {
  return storiesOf(a, b).addDecorator(story => (
    <div>
      <GlobalStyles />
      {story()}
    </div>
  ));
}

function requireAll(requireContext) {
  return requireContext
    .keys()
    .map(requireContext)
    .map(module => module.default(sOf));
}

function loadStories() {
  requireAll(require.context("..", true, /story.tsx?$/));
}

configure(loadStories, module);
