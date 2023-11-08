const connection =require('../config/connection');
const addQuiz =async(req,res)=>{
    try{
    const [result]=await connection.promise().query(`INSERT INTO quizzes 
    (question,answer1,answer2,answer3,correct_answer,lesson_id) 
    VALUES('${req.body.question}','${req.body.answer1}',
    '${req.body.answer2}','${req.body.answer3}','${req.body.correct_answer}','${req.body.lesson_id}')`);
    if(!result)throw new Error("An error occured");
    res.status(200).json({message:"Adding to quizzes table successfully ",result});
    }catch(error){
        res.status(500).json({message:"Failed adding a new quiz",error});
     }
}
const getQuizByLessonId=async(req,res)=>{
    try{
    const [result]=await connection.promise().query(`SELECT * FROM quizzes  WHERE lesson_id=${req.params.id}`);
    if(!result)throw new Error("An error occured");
    res.status(200).json({message:"Your quizzes ",result});
    }catch(error){
        res.status(500).json({message:"quizzes  not found",error});
    }
}
const getOneQuiz=async(req,res)=>{
    try{
    const [result]=await connection.promise().query(`SELECT * FROM quizzes  WHERE id=${req.params.id}`);
    if(!result)throw new Error("An error occured");
    res.status(200).json({message:"Selecting one quiz by id successfully",result});
    }catch(error){
        res.status(500).json({message:"An error occured during selecting a quiz  ",error});
    }
}
const deleteOne=async(req,res)=>{
    try{
    const [result]=await connection.promise().query(`DELETE FROM quizzes WHERE id=${req.params.id}`);
    if(!result)throw new Error("An error occured");
    res.status(200).json({message:"A row from your quizzes  table deleted successfully",result});
    }catch(error){
        res.status(500).json({message:"Failed to delete this quiz",error});
    }
}
const updateQuiz = async (req, res) => {
    try {
        const { question,answer1,answer2,answer3,correct_answer} = req.body;
        const quizId = req.params.id;
        const sql = `UPDATE quizzes 
                    SET question = ?, answer1 = ?, answer2 = ?, 
                answer3 = ?,correct_answer=? WHERE id=?`;
        const values = [question,answer1,answer2,answer3,correct_answer,quizId];
        const [result] = await connection.promise().query(sql, values);
        if (result.affectedRows === 1) 
            res.status(200).json({ message: "Quizzes updated successfully", result });
         else 
            throw new Error("An error occurred while updating the quiz");
    } catch (error) {
        res.status(500).json({ message: "Failed to update the quiz", error: error.message });
    }
}
module.exports={addQuiz,getQuizByLessonId, getOneQuiz,deleteOne,updateQuiz};