import { ButtonHTMLAttributes, ReactNode } from 'react';
import './styles.css'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  type?: "submit" | "reset" | "button" | undefined;
  className?: string;
  text: string | ReactNode
}

export function Button({ type = 'button', className = 'default__btn', text = 'Digite aqui', ...rest }: ButtonProps){
  return (
    <button className={className} type={type} {...rest}>{text}</button>
  )
}