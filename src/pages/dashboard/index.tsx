import { useState } from "react";

import { Header } from "./header";
import { Sidebar } from "./sidebar";
import { Wallet } from "./wallet";
import { Footer } from "./footer";

import './styles.css'

export function Dashboard() {
  const [sidebarVisible, setSidebarVisible] = useState(false)

  return (
    <>
      <Header setSidebarVisible={setSidebarVisible} />

      <div className="dashboard__container">
        <Sidebar sidebarVisible={sidebarVisible} setSidebarVisible={setSidebarVisible} />
        <Wallet />
      </div>

      <Footer />
    </>
  )
}