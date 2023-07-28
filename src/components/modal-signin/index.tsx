import { useState, MouseEvent, Dispatch, SetStateAction, useRef, useEffect } from 'react'
import ReactDOM from "react-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

import { api } from 'src/services/axios';
import { useAuthUser } from 'src/contexts/AuthUser';
import { useNavigate } from 'react-router-dom';

import { IoMdClose } from 'react-icons/io';
import { AiOutlineLock } from "react-icons/ai";
import { HiOutlineMail } from "react-icons/hi";
import { BsEye } from "react-icons/bs";
import { Button } from '../button';
import { Input } from '../input';

import './styles.css'

interface ModalSignIn {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  setOpenModalSignUp: Dispatch<SetStateAction<boolean>>;
}

const schema = yup.object({
  email: yup.string().email().required(),
  password: yup.string(),
}).required();

export function ModalSignIn({ isOpen, setIsOpen, setOpenModalSignUp }: ModalSignIn) {
  const { setUser } = useAuthUser()
  const navigate = useNavigate()

  const { register, handleSubmit, formState:{ errors }, reset } = useForm({
    resolver: yupResolver(schema)
  });

  const [visiblePassword, setVisiblePassword] = useState(false)

  const divOutsideRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen])

  function handleClickOutsideModal(e: MouseEvent<HTMLDivElement>) {
    const modalOutsideId = (e.target as HTMLDivElement).getAttribute('id')

    if (!modalOutsideId) {
      return
    }

    if (modalOutsideId === divOutsideRef.current?.id) {
      reset()
      setIsOpen(false)
    }
  }

  function handleVisiblePassword() {
    setVisiblePassword((prevState) => !prevState)
  }

  function handleSignUp() {
    reset()
    setIsOpen(false)
    setOpenModalSignUp(true)
  }

  async function handleLogin({ email, password }: { email: string | undefined; password: string | undefined }) {

    const { data } = await api.post('/users/authenticate', { email, password })

    localStorage.setItem('fakeToken', data.fakeToken)
    setUser(data.user)

    navigate('/dashboard')
  }

  return ReactDOM.createPortal(
    <div id="modal__signin" ref={divOutsideRef} className={`modal__overlay ${isOpen ? '' : 'modal__hidden'}`} onClick={handleClickOutsideModal}>
      <div className="modal__content">
        <button id="modal__btn_close" onClick={() => setIsOpen(false)}>
          <IoMdClose />
        </button>
        
        <form onSubmit={handleSubmit(handleLogin)}>
          <h4>Sign in to <span className='color_primary'>Coin</span>Synch</h4>
          {errors.email && <p className='modal__errors'>- {errors.email.message}</p>}

          <div>
            <label className="placeholder" htmlFor="form-email"><HiOutlineMail /></label>
            <Input id="form-email" type="text" placeholder="Email" {...register("email")}/>
          </div>

          <div>
            <label className="placeholder" htmlFor="password"><AiOutlineLock /></label>
            <Input id="password" type={visiblePassword ? "text" : "password"} placeholder="Password" {...register("password")}/>
            <button type='button' onClick={handleVisiblePassword}><BsEye /></button>
          </div>
          <a href='#' id='forgot_password'>Forgot password?</a>

          <footer>
            <Button text="Sign in" type='submit'/>
            <p>Don't have an account? <a href="#" onClick={handleSignUp}>Sign up to <span className='color_primary'>Coin</span>Synch</a></p>
          </footer>
        </form>
      </div>
    </div>,
    document.body
  )
}