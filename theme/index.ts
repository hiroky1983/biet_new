import { extendTheme } from "@chakra-ui/react";
export const theme = extendTheme({
  styles: {
    global: {
      body: {
        bg: "#F5F5F5",
        color: "#2E2E2E",
      },
    },
  },
  components: {
    Input: {
      baseStyle: {
        textColor: "#FFFFFF",
      },
    },
    Button: {
      baseStyle: {
        bg: "#2E2E2E",
      },
    },
  },
});
