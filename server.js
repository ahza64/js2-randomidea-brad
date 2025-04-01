const express = require('express')
const port = 5000
const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.get('/', (req, res) => {  
    res.send({ message: 'Welcome to random ideas API' })
})

const ideasRouter = require('./routes/ideas')
app.use('/api/ideas', ideasRouter)

app.listen(port, () => console.log(`listening on port ${port}`))