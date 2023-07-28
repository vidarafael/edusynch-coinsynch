import { useAuthUser } from 'src/contexts/AuthUser'
import { Dropdown } from './components/dropdown'
import logo from 'src/assets/logo.svg'

import './styles.css'

export function Header() {
  const { user } = useAuthUser()

  return (
    <header className='dashboard__header'>
      <img src={logo} alt="image logo" />

      <div>
        <Dropdown userImg={user.avatar} userName={user.name} />
      </div>
    </header>
  )
}