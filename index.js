require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
const userRoute = require('./routes/user')
const db = require('./models')


app.use(cors())
app.use(bodyParser.json()) //so can use as json
app.use(bodyParser.urlencoded({ extended: false })) //cannot use in nest form (extended:false)
app.use('/users',userRoute)

db.sequelize.sync().then(() => {
    app.listen(process.env.PORT, () => console.log(`Server is running on ${process.env.PORT}`))
})

