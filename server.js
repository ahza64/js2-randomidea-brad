const express = require('express')
const port = 5000
const app = express()

const ideas = [
  {
    id: 1,
    text: 'Idea 1',
    tag: 'tag1',
    date: '2025-01-01',
    username: 'John Doe'
  },
  {
    id: 2,
    text: 'Idea 2',
    tag: 'tag2',
    date: '2025-01-02',
    username: 'Jane Doe'    
  }
]

app.get('/', (req, res) => {  
    res.send({ message: 'Welcome to random ideas API' })
})
app.get('/api/ideas', (req, res) => {  
    res.send({ success: true, data: ideas })
})
app.get('/api/ideas/:id', (req, res) => {
    const idea = ideas.find(idea => idea.id === parseInt(req.params.id))
    if (!idea) {
      return res.status(404).send({ success: false, message: 'Idea not found' })
    }
    res.send({ success: true, data: idea })
})

app.listen(port, () => console.log(`listening on port ${port}`))