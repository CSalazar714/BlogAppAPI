const express = require('express')
const bodyParser = require('body-parser')
const helmet = require('helmet')
require('dotenv').config()
const morgan = require('morgan')
const swagger = require('swagger-ui-express')

const mongoConnect = require('./config')

const blogRouter = require('./routes/blogRoutes')
const authRouter = require('./routes/authRoutes')
// const swaggerRoute = require('./docs/basicinfo')

const app = express()
const port = 1500 || process.env.PORT

app.use(helmet())
app.use(bodyParser.json())
app.use(morgan('dev'))
app.use('/auth', authRouter)

app.use('/blog', blogRouter)



app.get('/', (req, res) => {
    res.status(200).json({ message: "We are Live" })
})


app.listen(port, () => {
    mongoConnect()
    console.log(`Server is Listening at ${port}`)

})
