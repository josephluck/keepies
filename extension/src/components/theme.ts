import { createGlobalStyle } from "styled-components";

export const theme = {
  borderRadius: {
    _3: rem(3),
    circle: "9999px"
  },
  colors: {
    buttonBackground: "#4236DD",
    white: "#FFFFFF",
    font: "#1C0529",
    border: "#ededef",
    form: "#ededef",
    link: "#309edc",
    avatarGradient: "linear-gradient(45deg, #1C0529 0%, #6C6794 100%)",
    disabledLinkText: "#6C6794",
    logoLeft: "#6C6794",
    logoRight: "#1C0529",
    _1: "#6C6794",
    _2: "#B8B8BD",
    _3: "#F2290D",
    _4: "#59CBDD",
    _5: "#6C6794",
    _6: "#1C0529",
    _7: "#309edc"
  },
  spacing: {
    _10: rem(10),
    _16: rem(16),
    _20: rem(20),
    _36: rem(36)
  },
  size: {
    appIcon: rem(40),
    extension: "400px"
  },
  font: {
    base: "16px",
    _12: {
      size: rem(12),
      lineHeight: rem(14)
    },
    _14: {
      size: rem(14),
      lineHeight: rem(17)
    },
    _16: {
      size: rem(16),
      lineHeight: rem(19)
    },
    _18: {
      size: rem(18),
      lineHeight: rem(21)
    },
    _24: {
      size: rem(24),
      lineHeight: rem(28)
    }
  },
  fontWeight: {
    _300: "300",
    _400: "400",
    _500: "500",
    _600: "600",
    bold: "bold"
  }
};

function rem(px: number): string {
  return `${px / 16}rem`;
}

export const GlobalStyles = createGlobalStyle`
  * {
    box-sizing: border-box;
    font-family: inherit;
  }

  html,
  body {
    margin: 0;
    padding: 0;
    font-family: 'Inter UI', sans-serif;
    color: ${theme.colors.font};
    font-size: ${theme.font.base};
  }
`;
