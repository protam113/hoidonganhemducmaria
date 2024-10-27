// src/_app.tsx
import { AppProps } from "next/app";
import "../styles/globals.css";
import DefaultLayout from "@/components/layouts/DefaultLayout";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <DefaultLayout>
      <Component {...pageProps} />
    </DefaultLayout>
  );
}

export default MyApp;
