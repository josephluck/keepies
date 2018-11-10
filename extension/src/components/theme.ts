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
  * {
    box-sizing: border-box;
    font-family: inherit;
  }

  html,
  body {
    margin: 0;
    padding: 0;
    font-family: 'Inter UI', sans-serif;
    font-size: ${theme.font._16.size};
  }
`;
