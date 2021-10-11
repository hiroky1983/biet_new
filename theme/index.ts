import { extendTheme } from "@chakra-ui/react";
export const theme = extendTheme({
  styles: {
    global: {
      body: {
        bg: "#F2F2F2",
        color: "#2E2E2E",
      },
    },
  },
  colors: {
    green: "#639A67",
    "green.500": "#639A67", // alertの色用(名前を変えないでください)
    hoverPrimary: "#538A57", // ボタンホバー時用
    hoverSecondary: "#f7fcf7",
    hoverSidebar: "#89b38c",
    yellow: "#ECC94B",
  },
  red: "#FB3F03",
  blue: {
    main: "#1D4ED8",
    light: "#0085FF",
  },
  components: {
    Input: {
      baseStyle: {
        textColor: "#FFFFFF",
      },
    },
    Button: {
      baseStyle: {
        _focus: {
          boxShadow: "0px 0px 0px 2px #89B38C",
        },
      },
    },
  },
});
