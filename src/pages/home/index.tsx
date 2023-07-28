import { useState } from 'react'
import { Footer } from "./footer";
import { Header } from "./header";
import { RankingCryptos } from "./ranking-cryptos";
import { InfosCrypto } from "./infos-crypto";
import { Introduction } from "./introduction";
import { ModalSignUp } from 'src/components/modal-signup';
import { ModalSignIn } from 'src/components/modal-signin';

export function Home() {
  const [openModalSignIn, setOpenModalSignIn] = useState(false)
  const [openModalSignUp, setOpenModalSignUp] = useState(false)

  return (
    <>
      <Header setOpenModalSignIn={setOpenModalSignIn} setOpenModalSignUp={setOpenModalSignUp} />
      <Introduction setOpenModalSignUp={setOpenModalSignUp} />

      <InfosCrypto setOpenModalSignUp={setOpenModalSignUp} />
      <RankingCryptos />
      <Footer />

      <ModalSignIn isOpen={openModalSignIn} setIsOpen={setOpenModalSignIn} setOpenModalSignUp={setOpenModalSignUp} />
      <ModalSignUp isOpen={openModalSignUp} setIsOpen={setOpenModalSignUp} setOpenModalSignIn={setOpenModalSignIn} />
    </>
  )
}