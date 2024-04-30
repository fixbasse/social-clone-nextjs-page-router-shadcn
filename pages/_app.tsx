import Layout from "@/components/layout";
import { EditModal } from "@/components/modals/edit-modal";
import { LoginModal } from "@/components/modals/login-modal";
import { RegisterModal } from "@/components/modals/register-modal";
import { Toaster } from "@/components/ui/toaster";
import "@/styles/globals.css";
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <Layout>

        <Toaster />
        <EditModal />
        <LoginModal />
        <RegisterModal />
        <Component {...pageProps} />

      </Layout>
    </SessionProvider>
  )
}
