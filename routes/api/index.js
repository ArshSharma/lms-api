const route=require('express').Router()

route.use('/courses',require('./courses'))
route.use('/subjects',require('./subjects'))
route.use('/teachers',require('./teachers'))
route.use('/students',require('./students'))

exports= module.exports={
  route
}