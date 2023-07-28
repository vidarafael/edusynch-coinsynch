import axios from 'axios'
import jsonServer from 'json-server'
const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()

server.use(middlewares)
server.use(jsonServer.bodyParser)

function delay(_, __, next) {
  setTimeout(next, 1500);
}

const url = 'http://localhost:3000'

const coinMarketAPI = axios.create({
  baseURL: 'https://pro-api.coinmarketcap.com'
})

coinMarketAPI.defaults.headers['X-CMC_PRO_API_KEY'] = 'f192c463-00df-4c65-857d-b78ef130b40a'

const fakeDataIfCoinMarketApiExpiredLimitOfRequests = [
	{
		"id": 1,
		"name": "Bitcoin",
		"symbol": "BTC",
		"slug": "bitcoin",
		"cmc_rank": 1,
		"quote": {
			"USD": {
				"price": 29193.779377959585,
				"percent_change_24h": -0.64827866
			}
		},
		"logo": "https://s2.coinmarketcap.com/static/img/coins/64x64/1.png"
	},
	{
		"id": 1027,
		"name": "Ethereum",
		"symbol": "ETH",
		"slug": "ethereum",
		"cmc_rank": 2,
		"quote": {
			"USD": {
				"price": 1858.3449522259564,
				"percent_change_24h": -0.71474916
			}
		},
		"logo": "https://s2.coinmarketcap.com/static/img/coins/64x64/1027.png"
	},
	{
		"id": 825,
		"name": "Tether USDt",
		"symbol": "USDT",
		"slug": "tether",
		"cmc_rank": 3,
		"quote": {
			"USD": {
				"price": 0.9997054451529143,
				"percent_change_24h": -0.04458145,
			}
		},
		"logo": "https://s2.coinmarketcap.com/static/img/coins/64x64/825.png"
	},
	{
		"id": 52,
		"name": "XRP",
		"symbol": "XRP",
		"slug": "xrp",
		"cmc_rank": 4,
		"quote": {
			"USD": {
				"price": 0.7134743854127235,
				"percent_change_24h": -0.46826907,
			}
		},
		"logo": "https://s2.coinmarketcap.com/static/img/coins/64x64/52.png"
	},
	{
		"id": 1839,
		"name": "BNB",
		"symbol": "BNB",
		"slug": "bnb",
		"cmc_rank": 5,
		"quote": {
			"USD": {
				"price": 240.28751547159297,
				"percent_change_24h": 0.57305154,
			}
		},
		"logo": "https://s2.coinmarketcap.com/static/img/coins/64x64/1839.png"
	},
	{
		"id": 3408,
		"name": "USD Coin",
		"symbol": "USDC",
		"slug": "usd-coin",
		"cmc_rank": 6,
		"quote": {
			"USD": {
				"price": 0.9999519647132425,
				"percent_change_24h": -0.02353127,
			}
		},
		"logo": "https://s2.coinmarketcap.com/static/img/coins/64x64/3408.png"
	},
	{
		"id": 74,
		"name": "Dogecoin",
		"symbol": "DOGE",
		"slug": "dogecoin",
		"cmc_rank": 7,
		"quote": {
			"USD": {
				"price": 0.07752139842939264,
				"percent_change_24h": -0.84626018,
			}
		},
		"logo": "https://s2.coinmarketcap.com/static/img/coins/64x64/74.png"
	},
]

server.get('/cryptos-api', async (req, res) => {
  try {
    const idsCryptos = []
    const { data: responseCryptos } = await coinMarketAPI.get("/v1/cryptocurrency/listings/latest?limit=20")

    responseCryptos.data.forEach((crypto) => {
      idsCryptos.push(crypto.id)
    })

    const { data: responseCryptosInfos } = await coinMarketAPI.get(`/v2/cryptocurrency/info?id=${idsCryptos.join(',')}`)

    const formatResponseCryptos = responseCryptos.data.map((crypto) => {
      const logoForCrypto = responseCryptosInfos.data?.[crypto.id]?.logo || ''

      return {
        ...crypto,
        logo: logoForCrypto
      }
    })

    const response = [].length ? formatResponseCryptos : fakeDataIfCoinMarketApiExpiredLimitOfRequests
    
    res.json(response)
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
})

server.post('/users/create', async (req, res) => {
  try {
    const { name, email, password } = req.body

    const { data } = await axios.get(`${url}/users-js?email=${email}`)

    if (data[0]) {
      return res.status(409).json({ message: 'email already exists' })
    }
  
    const generateUniqueId = () => Date.now().toString(36) + Math.random().toString(36);
    
    const avatarUrl = new URL('https://ui-avatars.com/api/')
    avatarUrl.searchParams.set('name', name)
    avatarUrl.searchParams.set('background', 'FBAB34')
    avatarUrl.searchParams.set('color', 'FFF')
    avatarUrl.searchParams.set('format', 'svg')
  
    await axios.post(`${url}/users-js`, { id: generateUniqueId(), name, email, password, avatar: avatarUrl.href })
  
    res.status(201).send()
  } catch (error) {
    res.status(500).json(error)
  }
})

server.post('/users/authenticate', async (req, res) => {
  try {
    const { email } = req.body
  
    const { data } = await axios.get(`${url}/users-js?email=${email}`)

    if(!data[0]) {
      const response = await axios.get(`${url}/users-js?email=johndoe@email.com`)

      if (!response.data[0]) {
        await axios.post(`${url}/users/create`, {
          name: 'John Doe', email: 'johndoe@email.com', password: 'password'
        })

        const responseGetEmail = await axios.get(`${url}/users-js?email=johndoe@email.com`)

        return res.json({ fakeToken: responseGetEmail.data[0].id, user: { ...responseGetEmail.data[0], password: undefined } })
      }

      return res.json({ fakeToken: response.data[0].id, user: { ...response.data[0], password: undefined } })
    }

    const { id, name, avatar } = data[0]

    const user = { id, name, avatar }
    const fakeToken = id

    res.json({ fakeToken, user })
  } catch (error) {
    // console.log(error)
    res.status(500).json(error)
  }
})

server.get('/users/:id', async (req, res) => {
  try {
    const { id } = req.params
  
    const { data } = await axios.get(`${url}/users-js/${id}`)

    const { name, avatar } = data

    const user = { id, name, avatar }

    res.json({ user })
  } catch (error) {
    res.status(500).json(error)
  }
})

server.post('/cryptos', async (req, res) => {
  try {
    const { coinId, quantity, price, logo, cmc_rank, name, symbol, percent_change_24h } = req.body
    const userId = req.headers.authorization

    const { data } = await axios.get(`${url}/cryptos-js?coinId=${coinId}&userId=${userId}`)

    const cryptoCoin = data?.[0]

    if (cryptoCoin) {
      const { data: responseCryptos } = await coinMarketAPI.get("/v1/cryptocurrency/listings/latest?limit=100")

      const findCoin = responseCryptos.data.find((coin) => coin.id === coinId)
      const sumQuantity = cryptoCoin.quantity + quantity

      const objectToUpdateCrypto = {
        quantity: sumQuantity
      }

      if (findCoin) {
        objectToUpdateCrypto.price = findCoin.quote?.USD?.price
        objectToUpdateCrypto.percent_change_24h = findCoin.quote?.USD?.percent_change_24h
      }

      await axios.patch(`${url}/cryptos-js/${cryptoCoin.id}`, objectToUpdateCrypto)
      return res.status(200).send()
    }

    await axios.post(`${url}/cryptos-js`, { coinId, quantity, userId, price, logo, cmc_rank, name, symbol, percent_change_24h })

    res.status(201).send()
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
})

server.post('/cryptos/transfer', async (req, res) => {
  try {
    const { coinId, quantity } = req.body
    const userId = req.headers.authorization

    const { data } = await axios.get(`${url}/cryptos-js?coindId=${coinId}&userId=${userId}`)

    if (data[0]) {
      const subtractQuantity = data[0].quantity - quantity

      if (subtractQuantity <= 0) {
        await axios.delete(`${url}/cryptos-js/${data[0].id}`)
      } else {
        await axios.patch(`${url}/cryptos-js/${data[0].id}`, { quantity: subtractQuantity })
      }
    }

    return res.status(200).send()
  } catch (error) {
    res.status(500).json(error)
  }
})

server.get('/cryptos', async (req, res) => {
  try {
    const userId = req.headers.authorization

    const { data } = await axios.get(`${url}/cryptos-js?userId=${userId}`)

    if (!data.length) {
      return res.status(200).json({ coins: [] })
    }

    const { data: responseCryptos } = await coinMarketAPI.get("/v1/cryptocurrency/listings/latest?limit=100")

    const updatePriceAndChangePorcentageForEachCoin = data.map((coin) => {
      const findCoinWithUpdatedValue = responseCryptos.data.find((crypto) => crypto.id === coin.coinId)
      let price = coin.price
      let percent_change_24h = coin.percent_change_24h

      if (findCoinWithUpdatedValue) {
        price = findCoinWithUpdatedValue.quote?.USD?.price
        percent_change_24h = findCoinWithUpdatedValue.quote?.USD?.percent_change_24h
      }
      
      return {
        id: coin.coinId,
        name: coin.name,
        quantity: coin.quantity,
        symbol: coin.symbol,
        logo: coin.logo,
        cmc_rank: coin.cmc_rank,
        price,
        percent_change_24h
      }
    })

    const totalBalance = updatePriceAndChangePorcentageForEachCoin?.reduce((acc, coin) => {
      const calculateTotal = coin.price * coin.quantity
      return acc += calculateTotal
    }, 0) || 0

    res.status(200).json({ coins: updatePriceAndChangePorcentageForEachCoin, totalBalance })
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
})

server.post('/subscribers', delay, async (req, res) => {
  try {
    const { email } = req.body
  
    await axios.post(`${url}/subscribers-js`, { email })
  
    res.send('ok')
  } catch (error) {
    res.status(500).json(error)
  }
})

server.use(router)
server.listen(3000, () => {
  console.log('JSON Server is running on PORT 3000')
})