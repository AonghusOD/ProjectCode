import "../global.css";
import Layout from "../components/layout";
import { createTheme,NextUIProvider } from "@nextui-org/react";
import { DataContextProvider } from "../store/data-store";

const darkTheme = createTheme({
  type: 'dark',
});

function MyApp({ Component, pageProps }) {
  return (
    <NextUIProvider>
      <DataContextProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </DataContextProvider>
    </NextUIProvider>
  );
}

export default MyApp
