import { auth } from "@/auth";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import LeftSidebar from "@/components/layout/LeftSidebar";
import Sider from "@/components/layout/Sider";
import { SessionProvider } from "next-auth/react";
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { extractRouterConfig } from "uploadthing/server";
import { ourFileRouter } from "../api/uploadthing/core";



export default async function Layout({
  children
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  return (

      <SessionProvider session={session}>
      <div className="h-screen  flex">
        <NextSSRPlugin
          /**
           * The `extractRouterConfig` will extract **only** the route configs
           * from the router to prevent additional information from being
           * leaked to the client. The data passed to the client is the same
           * as if you were to fetch `/api/uploadthing` directly.
           */
          routerConfig={extractRouterConfig(ourFileRouter)}
        />
        {session && <LeftSidebar userId={session?.user?.id}/>}
        <div className="lex w-full flex-col justify-between">
          <Header />
          <Sider>
            <div className="min-h-screen mt-20">{children}</div>
            <Footer />
          </Sider>
        </div>
      </div>
    </SessionProvider>
    
  );
}
