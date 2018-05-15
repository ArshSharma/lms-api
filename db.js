const Sequelize = require('sequelize')

const db = new Sequelize('lms','user','root',{
  host:'localhost',
  dialect:'mysql',
  operatorsAliases: false
  // pool:{
  //   min:0,
  //   max:5,
  // }
})

const Course = db.define('courses',{
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        primaryKey:true
      },
      name:{
        type:Sequelize.STRING,
        allowNull:false,
      },

})
const Batch = db.define('batches',{
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        primaryKey:true
      },
      name:{
        type:Sequelize.STRING,
        allowNull:false,
      }
})
const Teacher = db.define('teachers',{
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        primaryKey:true
      },
      name:{
        type:Sequelize.STRING,
        allowNull:false,
      }
})
const Lecture = db.define('lectures',{
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        primaryKey:true
      },
      name:{
        type:Sequelize.STRING,
        allowNull:false,
      }
})

const Subject = db.define('subjects',{
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        primaryKey:true
      },
      name:{
        type:Sequelize.STRING,
        allowNull:false,
      }
})
const Student = db.define('students',{
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        primaryKey:true
      },
      name:{
        type:Sequelize.STRING,
        allowNull:false,
      }
})


Course.hasMany(Batch)
Course.hasMany(Subject)

Batch.belongsTo(Course)
Batch.hasMany(Lecture)
Batch.belongsToMany(Student,{through:'BatchStudents',as:'student'})

Teacher.belongsTo(Subject)

Lecture.belongsTo(Subject)
Lecture.belongsTo(Teacher)
Lecture.belongsTo(Batch)

Subject.hasMany(Teacher)

Student.belongsToMany(Batch,{through:'BatchStudents', as:'batch'})

db.sync()
.then(()=>console.log("database has been synced"))
.catch((err)=>console.log("Error creating database"))


exports=module.exports={
    Course,Batch,Teacher,Lecture,Subject,Student
  }