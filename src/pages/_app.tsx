import { type AppType } from "next/app";
import { api } from "~/utils/api";
import "~/styles/globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import Script from 'next/script'

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <>
      <Script src="https://cdn.jsdelivr.net/npm/react/umd/react.production.min.js" />
            <Script src="https://cdn.jsdelivr.net/npm/react-dom/umd/react-dom.production.min.js" />
            <Script src="https://cdn.jsdelivr.net/npm/react-bootstrap@next/dist/react-bootstrap.min.js"/>
    <ClerkProvider {...pageProps}>
      <Component {...pageProps} />
    </ClerkProvider>
    </>
  );
};

export default api.withTRPC(MyApp);
