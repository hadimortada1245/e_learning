const express=require('express');
const router=express.Router();
const quizzesController=require('../controllers/quizzes');
router.post('/add',quizzesController.addQuiz);
router.get("/getQuizByLessonId/:id",quizzesController.getQuizByLessonId);
router.get("/getQuizById/:id",quizzesController.getOneQuiz);
router.delete('/deleteQuizById/:id',quizzesController.deleteOne);
router.put('/updateQuizById/:id',quizzesController.updateQuiz);
module.exports=router;