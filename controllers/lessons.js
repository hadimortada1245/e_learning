const connection =require('../config/connection');
const addLesson =async(req,res)=>{//Tested
    try{
    const [result]=await connection.promise().query(`INSERT INTO lessons 
    (text,video_link,date,course_id) 
    VALUES('${req.body.text}','${req.body.video_link}',
    '${req.body.date}','${req.body.course_id}')`);
    if(!result)throw new Error("An error occured");
    res.status(200).json({message:"Adding to lessons table successfully ",result});
    }catch(error){
        res.status(500).json({message:"Failed adding a new lesson",error});
    }
}
const lessonInfo=async(req,res)=>{
    try{
        const [result]=await connection.promise().query(`SELECT c.name AS course_name, c.start_date AS course_start_date, c.end_date AS course_end_date, l.*, q.*
        FROM courses c
        INNER JOIN lessons l ON c.id = l.course_id
        LEFT JOIN quizzes q ON l.id = q.lesson_id
        WHERE l.id =${req.params.id};
        `);
        if(!result)throw new Error("An error occured");
        res.status(200).json({message:"selecting  lessons table successfully ",result});
        }catch(error){
            res.status(500).json({message:"Failed to select this lesson",error});
        }
}
const getAllLessonsByCourseId=async(req,res)=>{//Tested
    try{
    const [result]=await connection.promise().query(`SELECT * FROM lessons WHERE course_id=${req.params.id}`);
    if(!result)throw new Error("An error occured");
    res.status(200).json({message:"Your lessons",result});
    }catch(error){
        res.status(500).json({message:"Lessons not found",error});
    }
}
const getOneLesson=async(req,res)=>{//Tested
    try{
    const [result]=await connection.promise().query(`SELECT * FROM lessons WHERE id=${req.params.id}`);
    if(!result)throw new Error("An error occured");
    res.status(200).json({message:"Selecting one lesson by id successfully",result});
    }catch(error){
        res.status(500).json({message:"An error occured during selecting a lesson ",error});
    }
}
const deleteOne=async(req,res)=>{//Tested
    try{
    const [result]=await connection.promise().query(`DELETE FROM lessons WHERE id=${req.params.id}`);
    if(!result)throw new Error("An error occured");
    res.status(200).json({message:"A row from your lessons table deleted successfully",result});
    }catch(error){
        res.status(500).json({message:"Failed to delete this lesson",error});
    }
}
const updateLesson = async (req, res) => {//Tested
    try {
        const { text, video_link,  course_id } = req.body;
        const lessonId = req.params.id;
        const sql = `UPDATE lessons
                    SET text = ?, video_link = ?
                    WHERE course_id = ? AND id = ?`; 
        const values = [text, video_link,  course_id, lessonId];
        const [result] = await connection.promise().query(sql, values);
        if (result.affectedRows === 1) 
            res.status(200).json({ message: "Lesson updated successfully", result });
         else 
            throw new Error("An error occurred while updating the lesson");
    } catch (error) {
        res.status(500).json({ message: "Failed to update the lesson", error: error.message });
    }
}
module.exports={addLesson,lessonInfo, getAllLessonsByCourseId,getOneLesson,deleteOne,updateLesson};