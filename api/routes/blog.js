const express = require('express')
const router = express.Router()
const blog = require('../model/blog')
const app = express()
const path = require('path')
const { updateOne } = require('../model/blog')

app.use(express.json())


router.post('/ticket', async function (req, res) {
  try {
    const findTicketWithTime= await blog.find({
      $and: [{
          ticket: req.body.date
      }, {
          time: {
              $in: req.body.time
          }
      }]
  }) 
  const findTicket= await blog.find({ ticket: req.body.date}) 

    if(findTicketWithTime.length > 0) {
    console.log("Таокй тикет с временем есть")
   
    } else if(findTicket.length>0) {
      await blog.updateOne({ ticket: req.body.date }, { $addToSet: { time: req.body.time } })
      console.log("В тикет запушено новое время")
    } else {
      const Blog = new blog({
        ticket: req.body.date,
        time: req.body.time
  
    })
    
        const newBlog = Blog.save()
        await res.status(201).json(newBlog)
    }
    
  } catch (err) {
      res.status(400).json({ message: err.message })
  }
})

  router.get('/tickets',async function(req,res){
    const all= await blog.find( ).select('ticket time')
    res.json(all)
  })

module.exports = router