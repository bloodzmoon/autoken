import Express from 'express'
import Cors from 'cors'

const PORT = process.env.PORT || 5000
const app = Express()

app.use(Express.json())
app.use(Cors())

app.listen(PORT, () => console.log(`Server has started on port ${PORT}`))
