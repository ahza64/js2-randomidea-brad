const express = require('express');
const router = express.Router();

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

router.get('/', (req, res) => {  
    res.send({ success: true, data: ideas })
})
router.get('/:id', (req, res) => {
    const idea = ideas.find(idea => idea.id === parseInt(req.params.id))
    if (!idea) {
      return res.status(404).send({ success: false, message: 'Idea not found' })
    }
    res.send({ success: true, data: idea })
})
router.post('/', (req, res) => {
  const idea = {
    id: ideas.length + 1,
    text: req.body.text,
    tag: req.body.tag,
    date: new Date().toISOString().slice(0, 10),
    username: req.body.username
  }

  ideas.push(idea)
  res.json({ success: true, data: idea })
})
router.put('/:id', (req, res) => {
    const idea = ideas.find(idea => idea.id === parseInt(req.params.id))
    if (!idea) {
      return res.status(404).send({ success: false, message: 'Idea not found' })
    }
    idea.text = req.body.text || idea.text
    idea.tag = req.body.tag || idea.tag
    res.send({ success: true, data: idea })
})
router.delete('/:id', (req, res) => {
    const idea = ideas.find(idea => idea.id === parseInt(req.params.id))
    if (!idea) {
      return res.status(404).send({ success: false, message: 'Idea not found' })
    }
    const index = ideas.indexOf(idea)
    ideas.splice(index, 1)
    res.send({ success: true, data: ideas })
})

module.exports = router;