import './styles.css'

interface CardCryptoProps {
  icon: string;
  title: string;
  content: string;
}

export function CardCrypto({ icon, title, content }: CardCryptoProps) {
  return (
    <div className='home__infocrypto_card'>
      <header>
        <img src={icon} alt="crpyto coin icon" />
        <p>For your company</p>
        <h2>{title}</h2>
      </header>

      <main>
        <p>
          {content} 
        </p>
      </main>
    </div>
  )
  
}