"use client";
import Layout, { Content, Footer, Header } from "antd/es/layout/layout";
import "../globals.css";
import { Menu } from "antd";
import Link from "next/link";
import { usePathname } from "next/navigation";

let items=[{key:"323"}];

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isRootPath = pathname === "/" || pathname == "/register";
  console.log(pathname);
  console.log(isRootPath);

  return (
    <html lang="en">
      <body>
        <Layout style={{minHeight: "100vh"}}>

          <Content className="login_content">
            {children}
          </Content>

        </Layout>
      </body>
    </html>
  );
}
