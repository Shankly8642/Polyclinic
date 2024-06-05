"use client";
import Layout, { Content, Footer, Header } from "antd/es/layout/layout";
import "../globals.css";
import { Flex, Menu,} from "antd";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {App} from "../components/CardUser"
import { useState } from "react";




export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  let items = [
    {key: "departments", label: <Link href={"/departments"}>Отделения</Link>,},
    {key: "regions", label: <Link href={"/regions"}>Участки</Link>},
    {key: "patients", label: <Link href={"/patients"}>Пациенты</Link>},
    {key: "doctors", label: <Link href={"/doctors"}>Врачи</Link>},
    {key: "appointments", label: <Link href={"/appointments"}>Приемы</Link>},
    {key: "users", label: <Link href={"/users"}>Пользователи</Link>},
    { key: "chart", label: <Link href={"/chart"}>Статистика</Link> },
    {
      key: "logout",
      label: (
          <img style={{marginTop:"10px",width:"43px", height:"43px", borderRadius:"100%",backgroundColor:"white"}} src="https://www.svgrepo.com/show/448670/user.svg" onClick={() => setModalActive(true)} ></img>
      ),
      style:{marginLeft:"auto"}
      
    },
  ];

  let router = useRouter();
  if (localStorage.length==0)
    router.push("/autorization");
  else if (localStorage.getItem("username")!="admin")
    {
    children="";
    items = [];
    router.back()
    }
  
  const [modalActive, setModalActive] = useState(false);
  return (
    <html lang="en">
      <body>
        <Layout style={{minHeight: "100vh"}}>
        <Header style={{backgroundColor:"black"}}>
            <Menu 
              theme="dark"
              mode="horizontal" 
              style={{ flex: 1, minWidth: 0, height:"100%",margin: 0, backgroundColor:"black", fontSize:"18px", fontWeight:"bold"}}
              items={items}
              selectedKeys={["users"]}
              />
          </Header>

          <Content className="custom-content" style={{ padding: "0 48px"}}>
          <App active={modalActive} setActive ={setModalActive}/>
            {children}
            
          </Content>

          <Footer style={{backgroundColor:"black"}} >
            
          </Footer>
        </Layout>
      </body>
    </html>
  );
}