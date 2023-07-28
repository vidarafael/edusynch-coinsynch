/* eslint-disable @typescript-eslint/no-explicit-any */
import { forwardRef, ForwardedRef } from 'react';
import './styles.css'

interface InputProps {
  type?: string;
  placeholder?: string;
  className?: string;
  [x:string]: any;
}

export const Input = forwardRef(({ type = 'text', className = 'default__input', placeholder = 'Digite aqui', ...rest }: InputProps, ref: ForwardedRef<HTMLInputElement>) => {
  return (
    <input className={className} type={type} placeholder={placeholder} ref={ref} {...rest} />
  )
})