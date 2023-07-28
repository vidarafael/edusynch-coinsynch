import { Header } from "./header";
import { Sidebar } from "./sidebar";
import { Wallet } from "./wallet";


import './styles.css'
import { Footer } from "./footer";

export function Dashboard() {
  return (
    <>
      <Header />

      <div className="dashboard__container">
        <Sidebar />
        <Wallet />
      </div>

      <Footer />
    </>
  )
}