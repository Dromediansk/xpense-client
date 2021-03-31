export interface CustomTheme {
  colors: {
    text: {
      primary: string;
      error: string;
    };
  };
  spacing: {};
  fonts: {
    body: string;
    heading: string;
  };
  fontSizes: {
    body: string;
    caption: string;
  };
  fontWeights: {
    regular: number;
    bold: number;
    medium: number;
  };
  sizes: {};
}
