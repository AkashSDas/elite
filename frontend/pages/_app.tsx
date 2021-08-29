import { ThemeProvider } from "@material-ui/core";
import Navbar from "../components/navbar";
import materialUITheme from "../lib/theme";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider theme={materialUITheme}>
      <Navbar/>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp;
