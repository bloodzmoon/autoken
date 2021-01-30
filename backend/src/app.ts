import Express from 'express'
import Cors from 'cors'
import Dotenv from 'dotenv'
import Routes from './routes'

Dotenv.config()

const PORT = process.env.PORT || 5000
const app = Express()

app.use(Express.json())
app.use(Cors())
app.use(Routes())

app.get('/', (req, res) => res.send('Hello Autoken!'))
app.listen(PORT, () => console.log(`Server has started on port ${PORT}`))
