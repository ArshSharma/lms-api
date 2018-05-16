const express = require('express')
const Course = require('../../db').Course
const Batch = require('../../db').Batch
const BatchStudents = require('../../db').BatchStudents
const Lecture = require('../../db').Lecture
const Student = require('../../db').Student
const Subject = require('../../db').Subject
const Teacher = require('../../db').Teacher
const route = require('express').Router()


// get request
route.get('/', (req, res) => {
    console.log("getting course")
    Course.findAll({
        include: [{
            model: Batch,
        }]
    })
        .then((courses) => {
            res.status(200).send(courses)
        })
        .catch((err) => {
            res.status(500).send({
                error: "Could not return course"
            })
        })
})


//Post request
route.post('/', (req, res) => {
    Course.create({
        name: req.query.name
    }).then((courses) => {
        res.status(201).send(courses)
    }).catch((err) => {
        res.status(501).send({
            error: "Could not add new course"
        })
    })
})

//Delete all courses
route.delete('/', (req, res) => {
    Course.destroy({
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
    Course.findAll({
        where: [{
            id: req.params.id
        }],
        include: [{
            model: Batch,
        }]
    })
        .then((courses) => {
            res.status(200).send(courses)
        })
        .catch((err) => {
            res.status(500).send({
                error: "Could not return course"
            })
        })
})

// delete records with id
route.delete('/:id', (req, res) => {
    Course.destroy({
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
    Course.update({
        name: req.query.name},
        {where: [{id: req.params.id}]})
        .then(res.status(200).send("Record name updated to " + req.query.name)
        ).catch((err) => {
            res.status(501).send({ error: "Could not add delete records" })
        })
})
//get batches using course id
route.get('/:id/batches', (req, res) => {
    console.log("getting batches")
    Batch.findAll({
        where: [{
            courseId: req.params.id
        }],
        // include: [{
        //     model: Lecture,
        // }]
    })
        .then((batches) => {
            res.status(200).send(batches)
        })
        .catch((err) => {
            res.status(500).send({
                error: "Could not return batches"
            })
        })
})

//Posting batches

route.post('/:id/batches', (req, res) => {

    Course.findOne({
        where: {
            id: req.params.id
        }

    }).then((courses) => {
        Batch.create({
            name: req.query.name,
        }).then(batches => {
            batches.setCourse(courses, { save: false })
            batches.save()
            res.status(200).send(batches)
        }).catch(error => {
            res.status(501).send({
                error: "Error adding batch"
            })
        })
    }).catch((err) => {
        error: "Could not find course id"
    })
})


//deleting batches with course id
route.delete('/:id/batches', (req, res) => {
    Batch.destroy({
        where: [{
            courseId: req.params.id
        }]
    })
        .then(res.status(200).send("Record deleted where course id is " + req.params.id)
        ).catch((err) => {
            res.status(501).send({ error: "Could not add delete records" })
        })
})

// courses/id/batches/id get
route.get('/:id/batches/:bid', (req, res) => {
    console.log("getting batches")
    Batch.findAll({
        where: [{
            id:req.params.bid,
            courseId: req.params.id
        }],
        // include: [{
        //     model: Lecture,
        // }]
    })
        .then((batches) => {
            res.status(200).send(batches)
        })
        .catch((err) => {
            res.status(500).send({
                error: "Could not return batches"
            })
        })
})

// update with courses/id/batches/id
route.put('/:id/batches/:bid', (req, res) => {
    Batch.update({
        name: req.query.name},
        {where: [{id: req.params.bid,
        courseId: req.params.id}]})
        .then(res.status(200).send("Record name updated to " + req.query.name)
        ).catch((err) => {
            res.status(501).send({ error: "Could not add delete records" })
        })
})


// courses/id/batches/id delete
route.delete('/:id/batches/:bid', (req, res) => {
    Batch.destroy({
        where: [{
            id:req.params.bid,
            courseId: req.params.id
        }]
    })
        .then(res.status(200).send("Record deleted where course id is " + req.params.id)
        ).catch((err) => {
            res.status(501).send({ error: "Could not add delete records" })
        })
})



//courses/id/batches/id/lectures/lid get

route.get('/:id/batches/:bid/lectures/:lid', (req, res) => {

    Batch.findOne({
        where: {
            courseId:req.params.id,
            id: req.params.bid
        }

    }).then((batches) => {
        if(batches){
        Lecture.all({
            where:[{
                BatchId:req.params.bid,
                id:req.params.lid
            }]
        })
        .then(lectures=>{
            res.status(200).send(lectures)
        })
        .catch((err)=>{
            error: "could not get lectures"
        })
    }
    else{
        res.status(200).send("unable to find course id and batch id mapping")
    }
}).catch((err) => {
        error: "unable to get courses"
    })
})

//courses/id/batches/id/lectures/lid put

route.put('/:id/batches/:bid/lectures/:lid', (req, res) => {

    Batch.findOne({
        where: {
            courseId:req.params.id,
            id: req.params.bid
        }

    }).then((batches) => {
        if(batches){
        Lecture.update({
            name: req.query.name},
            {where: [{id: req.params.lid,
            batchId: req.params.bid}]})
        .then(lectures=>{
            res.status(200).send("Lecture name updated to "+ req.query.name)
        })
        .catch((err)=>{
            error: "could not get lectures"
        })
    }
    else{
        res.status(200).send("unable to find course id and batch id mapping")
    }
}).catch((err) => {
        error: "unable to get courses"
    })
})

//courses/id/batches/id/lectures/lid delete

route.delete('/:id/batches/:bid/lectures/:lid', (req, res) => {

    Batch.findOne({
        where: {
            courseId:req.params.id,
            id: req.params.bid
        }

    }).then((batches) => {
        if(batches){
        Lecture.destroy({
            where:[{
                BatchId:req.params.bid,
                id:req.params.lid
            }]
        })
        .then(lectures=>{
            res.status(200).send("deleted records with course id "+ req.params.id + " batch id " +req.params.bid+ " lecture id "+ req.params.lid )
        })
        .catch((err)=>{
            error: "could not get lectures"
        })
    }
    else{
        res.status(200).send("unable to find course id and batch id mapping")
    }
}).catch((err) => {
        error: "unable to delete lectures"
    })
})


// lectures get
route.get('/:id/batches/:bid/lectures', (req, res) => {
    Batch.findOne({
        where:[{
            courseId:req.params.id,
            id:req.params.bid
        }]
    })
    .then((batches)=>{
    if(batches){
    console.log("getting lectures")
    batches.getLectures()
        .then((lectures) => {
            res.status(200).send(lectures)
        })
        .catch((err) => {
            res.status(500).send({
                error: "Could not return lectures"
            })
        })
    }
else{
    res.status(200).send(  "no records present" )
}})
    .catch((err)=>{
        res.status(500).send({
            error: "this course Is not mapped with batch id"
        })
    })
})

// courses/id/batches/id/students delete
route.delete('/:id/batches/:bid/lectures', (req, res) => {
    Batch.findOne({
        where:[{
            courseId:req.params.id,
            id:req.params.bid
        }]
    }).then(batches=>{
        console.log(batches)
    if(batches){
        batches.getLectures().then((lectures)=>{
        batches.removeLectures(lectures)
        .then(res.status(200).send("lecturess deleted where course id is " + req.params.id + "and batch id" + req.params.bid )
        ).catch((err) => {
            res.status(501).send({
                error: "Could not add delete records" })
        })
    })
    }
    else{
        res.status(200).send("nothing to delete")
    }})
.catch((err)=>{
    res.status(500).send({
        error:"could not find batch related to course id"
    })
})
})


//courses/id/batches/id/students post
route.post('/:id/batches/:bid/lectures', (req, res) => {

    Batch.findOne({
        where: {
            courseId:req.params.id,
            id: req.params.bid
        }

    }).then((batches) => {
        if(batches){
            Lecture.create({
                name: req.query.name,
                }).then((lectures) => {

                lectures.setBatch(batches,{save:false})
                lectures.save()
                .then((students) => {
                res.status(200).send(lectures)
                })
                }).catch((err) => {
                res.status(500).send('Cant post lecture')
                })}

        else{
            res.status(200).send("Unable to find Batch corresponding to course id")
        }
    }).catch((err) => {
        error: "Could not find batch id"
    })
})





// courses/id/batches/id/students get
route.get('/:id/batches/:bid/students', (req, res) => {
    Batch.findOne({
        where:[{
            courseId:req.params.id,
            id:req.params.bid
        }]
    })
    .then((batches)=>{
    if(batches){
    console.log("getting students")
    batches.getStudent()
        .then((students) => {
            res.status(200).send(students)
        })
        .catch((err) => {
            res.status(500).send({
                error: "Could not return students"
            })
        })
    }
else{
    res.status(200).send(  "no records present" )
}})
    .catch((err)=>{
        res.status(500).send({
            error: "this course Is not mapped with batch id"
        })
    })
})

// courses/id/batches/id/students delete
route.delete('/:id/batches/:bid/students', (req, res) => {
    Batch.findOne({
        where:[{
            courseId:req.params.id,
            id:req.params.bid
        }]
    }).then(batches=>{
        console.log(batches)
    if(batches){
        batches.getStudent().then((students)=>{
        batches.removeStudent(students)

        .then(res.status(200).send("Students deleted where course id is " + req.params.id + "and batch id" + req.params.bid )
        ).catch((err) => {
            res.status(501).send({
                error: "Could not add delete records" })
        })
    })
    }
    else{
        res.status(200).send("nothing to delete")
    }})
.catch((err)=>{
    res.status(500).send({
        error:"could not find batch related to course id"
    })
})
})


//courses/id/batches/id/students post
route.post('/:id/batches/:bid/students', (req, res) => {

    Batch.findOne({
        where: {
            courseId:req.params.id,
            id: req.params.bid
        }

    }).then((batches) => {
        if(batches){
            Student.create({
                name: req.query.name,
                }).then((students) => {
                    console.log("getting students")
                students.setBatch(batches,{save:false})
                students.save()
                .then((students) => {
                res.status(200).send(students)
                })
                }).catch((err) => {
                res.status(500).send('Cant find any student')
                })}

        else{
            res.status(200).send("Unable to find Batch corresponding to course id")
        }
    }).catch((err) => {
        error: "Could not find batch id"
    })
})



// courses/id/batches/id/teachers get
route.get('/:id/batches/:bid/teachers', (req, res) => {
    Batch.findOne({
        where:[{
            courseId:req.params.id,
            id:req.params.bid
        }]
    })
    .then((batches)=>{
    if(batches){
    console.log(batches.id)

    Lecture.findAll({
        include: [{
            model: Teacher,

        }],
        where:[{
            batchId: req.params.bid
        }],

    })
        .then((lectures) => {
            console.log("getting teachers")
            Teacher.findAll({
                where:[{
                    lecturedId:Sequelize.col(lectures.id)
                }]
            })
            .then((lectures)=>{
            res.status(200).send(lectures)
        }).catch((err)=>{
            res.status(500).send({
                error:"cannot"
            })
        })

        // lectures.getTeacher().then((teachers)=>{
        //     res.status(200).send(teachers)
        // }).catch((err) => {
        //     res.status(500).send({
        //         error: "Could not return teacher"
        //     })
        // })
        //res.status(200).send(lectures.teacher)
        })
        .catch((err) => {
            res.status(500).send({
                error: "Could not return students"
            })
        })
    }
else{
    res.status(200).send(  "no records present" )
}})
    .catch((err)=>{
        res.status(500).send({
            error: "this course Is not mapped with batch id"
        })
    })
})



// route.get('/:id/batches/:bid/teachers', (req, res) => {
//     Batch.findOne({
//         where:[{
//             courseId:req.params.id,
//             id:req.params.bid
//         }],
//         include: [{
//             model:Lecture,
//             where:[{
//                 batchId:req.params.bid
//             }
//             ],
//             include:[{
//                 model: Teacher
//             }]
//         }]
//     })
//     .then((batches)=>{
//         res.status(200).send(batches.lectures)
//     })
//     .catch((err)=>{
//         res.status(500).send({
//             error: "this course Is not mapped with batch id"
//         })
//     })
// })








// courses/id/batches/id/students delete
route.delete('/:id/batches/:bid/students', (req, res) => {
    Batch.findOne({
        where:[{
            courseId:req.params.id,
            id:req.params.bid
        }]
    }).then(batches=>{
        console.log(batches)
    if(batches){
        batches.getStudent().then((students)=>{
        batches.removeStudent(students)

        .then(res.status(200).send("Students deleted where course id is " + req.params.id + "and batch id" + req.params.bid )
        ).catch((err) => {
            res.status(501).send({
                error: "Could not add delete records" })
        })
    })
    }
    else{
        res.status(200).send("nothing to delete")
    }})
.catch((err)=>{
    res.status(500).send({
        error:"could not find batch related to course id"
    })
})
})


//courses/id/batches/id/teachers post
route.post('/:id/batches/:bid/teachers', (req, res) => {

    Batch.findOne({
        where: {
            courseId:req.params.id,
            id: req.params.bid
        }

    }).then((batches) => {
        if(batches){
            batches.getLecture().then((lectures)=>{
            Teacher.create({
                name: req.query.name,
                }).then((teachers) => {
                    console.log("getting students")
                students.setLecture(lectures,{save:false})
                students.save()
                .then((students) => {
                res.status(200).send(students)
                })
                }).catch((err) => {
                res.status(500).send('Cant find any student')
                })
            })
            }

        else{
            res.status(200).send("Unable to find Batch corresponding to course id")
        }
    }).catch((err) => {
        error: "Could not find batch id"
    })
})





exports = module.exports = route
