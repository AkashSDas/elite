import { ThemeProvider } from "@material-ui/core";
import materialUITheme from "../lib/theme";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider theme={materialUITheme}>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp;
