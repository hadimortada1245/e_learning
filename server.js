const express=require("express");
const app=express();
require("./config/connection");
const cors=require("cors");
// const creatingTables=require('./setup');
const userRoutes=require('./routes/user');
const courseRoutes=require('./routes/courses');
const lessonsRoutes=require('./routes/lessons');
const quizzesRoutes=require('./routes/quizzes');
const teacherRoutes=require('./routes/teachers');
const Port=5000;
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
// creatingTables();
app.use('/users',userRoutes);
app.use('/courses',courseRoutes);
app.use('/lessons',lessonsRoutes);
app.use('/quizzes',quizzesRoutes);
app.use('/teachers',teacherRoutes);
app.listen(Port,()=>{
    console.log(`You are listening to port ${Port}`);
})