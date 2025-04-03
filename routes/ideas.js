const express = require('express');
const router = express.Router();
const Idea = require('../models/Idea');

router.get('/', async (req, res) => {  
  try {
    const ideas = await Idea.find()
    res.send({ success: true, data: ideas })
  } catch (error) {
    res.status(500).json({ success: false, error: error.message })
  }
})
router.get('/:id', async (req, res) => {
    try {
      const idea = await Idea.findById(req.params.id)
      if (!idea) {
        return res.status(404).json({ success: false, message: 'Idea not found' })
      }
      res.send({ success: true, data: idea })
    } catch (error) {
      res.status(500).json({ success: false, error: error.message })
    }
})
router.post('/', async (req, res) => {
  const idea = new Idea({
    text: req.body.text,
    tag: req.body.tag,
    username: req.body.username
  })
  try {
    const newIdea = await idea.save()
    res.status(201).json({ success: true, data: newIdea })
  } catch (error) {
    res.status(500).json({ success: false, error: error.message })
  }
})
router.put('/:id', async (req, res) => {
  try {
    const idea = await Idea.findByIdAndUpdate(
      req.params.id,
      {
        $set: { 
          text: req.body.text, 
          tag: req.body.tag, 
        }
      },
      { new: true }
    )
    res.json({ success: true, data: idea })
  } catch (error) {
    res.status(500).json({ success: false, error: error.message })
  }
})
router.delete('/:id', async (req, res) => {
  try {
    await Idea.findByIdAndDelete(req.params.id)
    res.json({ success: true, message: 'Idea deleted' })
  } catch (error) {
    res.status(500).json({ success: false, error: error.message })
  }
})

module.exports = router;