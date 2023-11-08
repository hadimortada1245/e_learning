const connection=require("../config/connection");
const assignTeacher =async(req,res)=>{
    try{
    const [result]=await connection.promise().query(`INSERT INTO teachers (teacher_id, course_id)
    VALUES (${req.body.teacher_id},${req.body.course_id})`);
    if(!result)throw new Error("An error occured");
    res.status(200).json({message:"Adding to teachers table successfully ",result});
    }catch(error){
        res.status(500).json({message:"Failed assign this course",error});
    }
}
const getAll =async(req,res)=>{
    try{
    const [result]=await connection.promise().query(`SELECT * FROM teachers
    )`);
    if(!result)throw new Error("An error occured");
    res.status(200).json({message:"Selecting teachers successfully ",result});
    }catch(error){
        res.status(500).json({message:"Failed to select all teachers",error});
    }
}
const getCourses=async(req,res)=>{
    try{
        const [result]=await connection.promise().query(`SELECT courses.*
        FROM courses
        INNER JOIN teachers ON courses.id = teachers.course_id WHERE teachers.teacher_id = ${req.params.id})`);
        if(!result)throw new Error("An error occured");
        res.status(200).json({message:"Selecting courses successfully ",result});
        }catch(error){
            res.status(500).json({message:"Failed to select all courses",error});
        }
}
module.exports={assignTeacher,getAll,getCourses};