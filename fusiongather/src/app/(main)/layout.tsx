import { auth } from "@/auth";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import LeftSidebar from "@/components/layout/LeftSidebar";
import Sider from "@/components/layout/Sider";
import { SessionProvider } from "next-auth/react";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  return (
    <SessionProvider session={session}>
      <div className="h-screen  flex">
        {session && <LeftSidebar />}
        <div className="lex w-full flex-col justify-between">
          <Header />
          <Sider>
            <div className="min-h-screen mt-20">
              {children}
            </div>
            <Footer />
          </Sider>
        </div>
      </div>
    </SessionProvider>
  );
}
