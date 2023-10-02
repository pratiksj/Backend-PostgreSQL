const express = require('express')
const app = express()
const { PORT } = require('./util/config')
const { connectToDatabase } = require('./util/db')
const blogRouter = require('./controllers/blog')
const { errorHandler } = require('./util/middle')

app.use(express.json())

app.use('/api/blogs', blogRouter)
app.use(errorHandler)

const start = async () => {
    await connectToDatabase()
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`)
    })
}

start()

