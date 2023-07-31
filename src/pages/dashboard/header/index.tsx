import { Dispatch, SetStateAction } from 'react'

import { useAuthUser } from 'src/contexts/AuthUser'
import { Dropdown } from './components/dropdown'
import { ButtonHamburguer } from 'src/components/button-hamburguer'
import logo from 'src/assets/logo.svg'

import './styles.css'

interface HeaderProps {
  setSidebarVisible: Dispatch<SetStateAction<boolean>>
}

export function Header({ setSidebarVisible }: HeaderProps) {
  const { user } = useAuthUser()

  return (
    <header className='dashboard__header'>
      {/* Show only tablet device */}
      <div className='dashboard__header_tablet_btn_hamburguer'>
        <ButtonHamburguer onClick={() => setSidebarVisible((prevState) => !prevState)} />
      </div>
      <img src={logo} alt="image logo" />

      <div>
        <Dropdown userImg={user.avatar} userName={user.name} />
      </div>
    </header>
  )
}