const route=require('express').Router()
const Teacher=require('../../db').Teacher

route.get('/', (req, res) => {
    console.log("getting subjects")
    Teacher.findAll()
        .then((teachers) => {
            res.status(200).send(teachers)
        })
        .catch((err) => {
            res.status(500).send({
                error: "Could not return teachers"
            })
        })
})


//Post request
route.post('/', (req, res) => {
    Teacher.create({
        name: req.body.name
    }).then((teachers) => {
        res.status(201).send(teachers)
    }).catch((err) => {
        res.status(501).send({
            error: "Could not add new Teachers"
        })
    })
})

//Delete all courses
route.delete('/', (req, res) => {
    Teacher.destroy({
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
    Teacher.findAll({
        where: [{
            id: req.params.id
        }]
    })
        .then((teachers) => {
            res.status(200).send(teachers)
        })
        .catch((err) => {
            res.status(500).send({
                error: "Could not return teachers"
            })
        })
})
// update with id
route.put('/:id', (req, res) => {
    Teacher.update({
        name: req.body.name},
        {where: [{id: req.params.id}]})
        .then(res.status(200).send("Record name updated to " + req.body.name)
        ).catch((err) => {
            res.status(501).send({ error: "Could not add delete records" })
        })
})

// delete records with id
route.delete('/:id', (req, res) => {
    Teacher.destroy({
        where: [{
            id: req.params.id
        }]
    })
        .then(res.status(200).send("Record deleted where id is " + req.params.id)
        ).catch((err) => {
            res.status(501).send({ error: "Could not add delete records" })
        })
})

//get batches using course id
// route.get('/:id/teachers', (req, res) => {
//     console.log("getting batches")
//     Teacher.findAll({
//         where: [{
//             subjectId: req.params.id
//         }],
//         // include: [{
//         //     model: Lecture,
//         // }]
//     })
//         .then((teachers) => {
//             res.status(200).send(teachers)
//         })
//         .catch((err) => {
//             res.status(500).send({
//                 error: "Could not return teachers"
//             })
//         })
// })

exports=module.exports=route
