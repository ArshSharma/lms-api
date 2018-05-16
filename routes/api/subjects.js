const route=require('express').Router()
const Subject=require('../../db').Subject
const Teacher=require('../../db').Teacher
// get request
route.get('/', (req, res) => {
    console.log("getting subjects")
    Subject.findAll()
        .then((subjects) => {
            res.status(200).send(subjects)
        })
        .catch((err) => {
            res.status(500).send({
                error: "Could not return course"
            })
        })
})


//Post request
route.post('/', (req, res) => {
    Subject.create({
        name: req.query.name
    }).then((subjects) => {
        res.status(201).send(subjects)
    }).catch((err) => {
        res.status(501).send({
            error: "Could not add new subjects"
        })
    })
})

//Delete all courses
route.delete('/', (req, res) => {
    Subject.destroy({
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
    Subject.findAll({
        where: [{
            id: req.params.id
        }]
    })
        .then((subjects) => {
            res.status(200).send(subjects)
        })
        .catch((err) => {
            res.status(500).send({
                error: "Could not return subjects"
            })
        })
})

// delete records with id
route.delete('/:id', (req, res) => {
    Subject.destroy({
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
    Subject.update({
        name: req.query.name},
        {where: [{id: req.params.id}]})
        .then(res.status(200).send("Record name updated to " + req.query.name)
        ).catch((err) => {
            res.status(501).send({ error: "Could not add delete records" })
        })
})

//get batches using course id
route.get('/:id/teachers', (req, res) => {
    console.log("getting batches")
    Teacher.findAll({
        where: [{
            subjectId: req.params.id
        }],
        // include: [{
        //     model: Lecture,
        // }]
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

//Posting teachers

route.post('/:id/teachers', (req, res) => {

    Subject.findOne({
        where: {
            id: req.params.id
        }

    }).then((subjects) => {
        if(subjects){
        Teacher.create({
            name: req.query.name,
        }).then(teachers => {
            teachers.setSubject(subjects, { save: false })
            teachers.save()
            res.status(200).send(teachers)
        }).catch(error => {
            res.status(501).send({
                error: "Error adding teachers"
            })
        })}
        else{
            res.status(200).send("so subject with given subject id")
        }
    }).catch((err) => {
        error: "Could not find student id"
    })
})


//deleting batches with course id
route.delete('/:id/teachers', (req, res) => {
    Teacher.destroy({
        where: [{
            subjectId: req.params.id
        }]
    })
        .then(res.status(200).send("Record deleted where subject id is " + req.params.id)
        ).catch((err) => {
            res.status(501).send({ error: "Could not add delete records" })
        })
})





exports=module.exports=route
