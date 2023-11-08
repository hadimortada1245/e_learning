const express=require('express');
const router=express.Router();
const teacherControllers=require('../controllers/teachers');
router.get('/',teacherControllers.getAll);
router.post('/add',teacherControllers.assignTeacher);
router.get('/courses/:id',teacherControllers.getCourses);
module.exports=router;