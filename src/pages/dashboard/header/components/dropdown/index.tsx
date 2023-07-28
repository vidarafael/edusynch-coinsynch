
import { useState } from "react";

import { BiChevronUp, BiChevronDown } from "react-icons/bi";
import { TbLogout } from "react-icons/tb";

import './styles.css'
import { useNavigate } from "react-router-dom";

interface DropdownProps {
  userImg: string;
  userName: string;
}

export function Dropdown({ userImg, userName }: DropdownProps) {
  const [ isOpen, setIsOpen ] = useState(false)
  const navigate = useNavigate()

  function handleLogout() {
    localStorage.clear()
    navigate('/')
  }

  return (
    <button className='dashboard__header_dropdown' onClick={() => setIsOpen((prevState) => !prevState)}>
      <img className="avatar" src={userImg} alt="avatar profile" />
      <span>{userName}</span>
      {isOpen ? <BiChevronUp/> : <BiChevronDown/>}

      {isOpen && (
        <div className="dashboard__header_dropdown_open">
          <a onClick={handleLogout}>
            <TbLogout size={16} />
            <span>Logout</span>
          </a>
        </div>
      )}
    </button>
  )
}