import { useState, MouseEvent, Dispatch, SetStateAction, useRef, useEffect } from 'react'
import ReactDOM from "react-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

import { Button } from '../button';
import { Input } from '../input';

import { IoMdClose } from 'react-icons/io';
import { AiOutlineLock, AiOutlineUser } from "react-icons/ai";
import { HiOutlineMail } from "react-icons/hi";
import { BsEye } from "react-icons/bs";

import { api } from 'src/services/axios';

import './styles.css'
import { toast } from 'react-toastify';

interface ModalSignUp {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  setOpenModalSignIn: Dispatch<SetStateAction<boolean>>;
}

const schema = yup.object({
  name: yup.string().required(),
  email: yup.string().email().required(),
  password: yup.string().required(),
  confirm_password: yup.string().required().oneOf([yup.ref('password')], 'Your passwords do not match.'),
  terms: yup.boolean().oneOf([true],'Please read and accept the terms and conditions to proceed with your order'),
}).required();

export function ModalSignUp({ isOpen, setIsOpen, setOpenModalSignIn }: ModalSignUp) {
  const divOutsideRef = useRef<HTMLDivElement | null>(null)

  const { register, handleSubmit, formState:{ errors }, reset } = useForm({
    resolver: yupResolver(schema)
  });

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen])

  const [visiblePassword, setVisiblePassword] = useState({ password: false, confirm_password: false})

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

  function handleVisiblePassword(name: 'password' | 'confirm_password') {
    setVisiblePassword((prevState) => { 
      return { ...prevState, [name]: !prevState[name] }
    })
  }

  function handleSignIn() {
    reset()
    setIsOpen(false)
    setOpenModalSignIn(true)
  }

  async function handleSignUp({ email, name, password }: { email: string; name: string; password: string }) {
    await api.post('/users/create', { email, name, password })

    toast.success("User registred")
    handleSignIn()
  }

  return ReactDOM.createPortal(
    <div id="modal__signin" ref={divOutsideRef} className={`modal__overlay ${isOpen ? '' : 'modal__hidden'}`} onClick={handleClickOutsideModal}>
      <div className="modal__content">
        <button id="modal__btn_close" onClick={() => setIsOpen(false)}>
          <IoMdClose />
        </button>
        
        <form onSubmit={handleSubmit(handleSignUp)}>
          <h4>Sign up to <span className='color_primary'>Coin</span>Synch</h4>

          {Object.values(errors).map((error, key) => <p className='modal__errors' key={key}>- {error.message}</p>)}

          <div>
            <label className="placeholder" htmlFor="name"><AiOutlineUser /></label>
            <Input id="name" type="text" placeholder="Name" {...register('name')} />
          </div>

          <div>
            <label className="placeholder" htmlFor="form-email-signin"><HiOutlineMail /></label>
            <Input id="form-email-signin" type="text" placeholder="Email" {...register('email')}/>
          </div>

          <div>
            <label className="placeholder" htmlFor="form-password"><AiOutlineLock /></label>
            <Input id="form-password" type={visiblePassword.password ? "text" : "password"} placeholder="Password" {...register('password')}/>
            <button type='button' onClick={() => handleVisiblePassword('password')}><BsEye /></button>
          </div>

          <div>
            <label className="placeholder" htmlFor="confirm_password"><AiOutlineLock /></label>
            <Input id="confirm_password" type={visiblePassword.confirm_password ? "text" : "password"} placeholder="Confirm password" {...register('confirm_password')}/>
            <button type='button' onClick={() => handleVisiblePassword('confirm_password')}><BsEye /></button>
          </div>

          <div id='form_terms'>
            <Input id="terms" type="checkbox" {...register('terms')}/>
            <label htmlFor="terms">I have read and accept the <b>Privacy Policy</b> and <b>Terms of User Sign up.</b></label>
          </div>

          <footer>
            <Button text="Sign up" type='submit'/>
            <p>Already have and account? <a href="#" onClick={handleSignIn}>Sign in to <span className='color_primary'>Coin</span>Synch</a></p>
          </footer>
        </form>
      </div>
    </div>,
    document.body
  )
}