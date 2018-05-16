const Student=require('../../db').Student
const route=require('express').Router()

var http=require('http')




// get request
route.get('/', (req, res) => {
    console.log("getting students")
    Student.findAll()
        .then((students) => {
            res.status(200).send(students)
        })
        .catch((err) => {
            res.status(500).send({
                error: "Could not return students"
            })
        })
})


//Post request
route.post('/', (req, res) => {
    Student.create({
        name: req.query.name
    }).then((students) => {
        res.status(201).send(students)
    }).catch((err) => {
        res.status(501).send({
            error: "Could not add new students"
        })
    })
})

//Delete all courses
route.delete('/', (req, res) => {
    Student.destroy({
        where: {},
    })
        .then(
            res.status(200).send("All records deleted")
        ).catch((err) => {
            res.status(501).send({ error: "Could not add delete records" })
        })
})




// Get request with course id
route.get('/:id', (req, res) => {
    console.log("gettin it")
    Student.findAll({
        where: [{
            id: req.params.id
        }],

    })
        .then((students) => {
            res.status(200).send(students)
        })
        .catch((err) => {
            res.status(500).send({
                error: "Could not return students"
            })
        })
})

// delete records with id
route.delete('/:id', (req, res) => {
    Student.destroy({
        where: [{
            id: req.params.id
        }]
    })
        .then(res.status(200).send("Record deleted where id is " + req.params.id)
        ).catch((err) => {
            res.status(501).send({ error: "Could not add delete records" })
        })
})
// update with id
route.put('/:id', (req, res) => {
    Student.update({
        name: req.query.name},
        {where: [{id: req.params.id}]})
        .then(res.status(200).send("Record name updated to " + req.query.name)
        ).catch((err) => {
            res.status(501).send({ error: "Could not add delete records" })
        })
})

exports=module.exports=route
