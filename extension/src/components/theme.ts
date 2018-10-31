import { createGlobalStyle } from "styled-components";

export const theme = {
  borderRadius: {
    _3: rem(3)
  },
  colors: {
    border: "#E5E6E7",
    buttonBackground: "#4236DD",
    white: "#FFFFFF"
  },
  spacing: {
    _10: rem(10),
    _16: rem(16)
  },
  font: {
    _16: {
      size: rem(16),
      lineHeight: rem(19)
    }
  },
  fontWeight: {
    _500: "500",
    _600: "600"
  }
};

function rem(px: number): string {
  return `${px / 16}rem`;
}

export const GlobalStyles = createGlobalStyle`
  @font-face {
    font-family: "Inter";
    src: url("/fonts/Inter-UI-Regular.ttf") format("truetype");
    font-weight: normal;
    font-style: normal;
  }
  @font-face {
    font-family: "Inter";
    src: url("/fonts/Inter-UI-Medium.ttf") format("truetype");
    font-weight: 500;
    font-style: normal;
  }
  @font-face {
    font-family: "Inter";
    src: url("/fonts/Inter-UI-SemiBold.ttf") format("truetype");
    font-weight: 600;
    font-style: normal;
  }
  @font-face {
    font-family: "Inter";
    src: url("/fonts/Inter-UI-Bold.ttf") format("truetype");
    font-weight: 700;
    font-style: normal;
  }
  @font-face {
    font-family: "Inter";
    src: url("/fonts/Inter-UI-ExtraBold.ttf") format("truetype");
    font-weight: bold;
    font-style: normal;
  }

  @font-face {
    font-family: "Inter";
    src: url("/fonts/Inter-UI-Italic.ttf") format("truetype");
    font-weight: normal;
    font-style: italic;
  }
  @font-face {
    font-family: "Inter";
    src: url("/fonts/Inter-UI-MediumItalic.ttf") format("truetype");
    font-weight: 500;
    font-style: italic;
  }
  @font-face {
    font-family: "Inter";
    src: url("/fonts/Inter-UI-SemiBoldItalic.ttf") format("truetype");
    font-weight: 600;
    font-style: italic;
  }
  @font-face {
    font-family: "Inter";
    src: url("/fonts/Inter-UI-BoldItalic.ttf") format("truetype");
    font-weight: 700;
    font-style: italic;
  }
  @font-face {
    font-family: "Inter";
    src: url("/fonts/Inter-UI-ExtraBoldItalic.ttf") format("truetype");
    font-weight: bold;
    font-style: italic;
  }

  * {
    box-sizing: border-box;
    font-family: inherit;
  }

  html,
  body {
    margin: 0;
    padding: 0;
    font-family: 'Inter', sans-serif;
    font-size: ${theme.font._16.size};
  }
`;
