import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

import { Button } from "src/components/button";
import { Input } from "src/components/input";
import logo from 'src/assets/logo.svg'

import './styles.css'
import { api } from "src/services/axios";
import { useState } from "react";

const schema = yup.object({
  email: yup.string().required(),
}).required();

export function Footer() {
  const { register, handleSubmit, formState:{ errors }, reset } = useForm({
    resolver: yupResolver(schema)
  });

  const [isLoading, setIsLoading] = useState(false)

  async function handleRegisterSubscriber(data: { email: string }) {
    const { email } = data

    setIsLoading(true)
    await api.post('/subscribers', { email })
    setIsLoading(false)

    reset()
  }

  return (
    <footer>
      <section className="home__footer_subsciption_section">
        <div>
          <h4>Lorem ipsum</h4>
          <h2>Lorem ipsum</h2>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing <br/> elit ut aliquam, purus sit amet luctus venenatis, lectus <br/> magna fringilla urna, porttitor</p>
        </div>

        <form className="home__foter_container_email_subscription" onSubmit={handleSubmit(handleRegisterSubscriber)}>
          <label htmlFor="email">Email</label>
          <Input placeholder="Email" id="email" {...register('email')} disabled={isLoading} />
          {errors.email && <span className="modal__errors">{errors.email.message}</span>}
          <Button text="Subscribe" type="submit" disabled={isLoading} style={{ cursor: isLoading ? 'not-allowed' : 'pointer', filter: isLoading ? 'opacity(0.8)' : 'opacity(1)' }}/>
        </form>
      </section>

      <section className="home__footer_copyright_section">
        <span>Copyright © 2022 -  All rights reserved</span>
        <img src={logo} alt="logo icon" />
      </section>
    </footer>

  )
}