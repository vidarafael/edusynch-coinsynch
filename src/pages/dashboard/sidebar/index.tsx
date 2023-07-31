import { Dispatch, SetStateAction } from 'react'

import { BiArrowBack } from 'react-icons/bi'
import wallet from 'src/assets/wallet.svg'
import circle from 'src/assets/circle.svg'
import bitcoin from 'src/assets/bitcoin.svg'
import graphic from 'src/assets/graphic.svg'

import './styles.css'

interface SidebarProps {
  sidebarVisible: boolean;
  setSidebarVisible: Dispatch<SetStateAction<boolean>>
}

export function Sidebar({ sidebarVisible, setSidebarVisible }: SidebarProps) {
  return (
    <>
      <aside className={`sidebar ${sidebarVisible ? 'sidebar_active' : ''}`}>
        <nav>
          <ul>
            <li>
              <img src={wallet} alt="wallet icon" />
              <p>Lorem Ipsum</p>
            </li>
            <li>
              <img src={circle} alt="circle icon" />
              <p>Lorem Ipsum</p>
            </li>
            <li>
              <img src={bitcoin} alt="bitcoin icon" />
              <p>Lorem Ipsum</p>
            </li>
            <li>
              <img src={graphic} alt="graphic icon" />
              <p>Lorem Ipsum</p>
            </li>
          </ul>
        </nav>
        
        <button className='sidebar_tablet_btn_close'>
          <BiArrowBack onClick={() => setSidebarVisible(false)} />
        </button>
      </aside>

      {sidebarVisible && (
        <div className={"sidebar_overlay"} onClick={() => setSidebarVisible(false)} />
      )}
    </>


  )
}