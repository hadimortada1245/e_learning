const connection =require('../config/connection');
const addCourse =async(req,res)=>{//Tested
    try{
    const [result]=await connection.promise().query(`INSERT INTO courses 
    (name,description,img,start_date,end_date) 
    VALUES('${req.body.name}','${req.body.description}',
    '${req.body.img}','${req.body.start_date}','${req.body.end_date}')`);
    if(!result)throw new Error("An error occured");
    res.status(200).json({message:"Adding to courses table successfully ",result});
    }catch(error){
        res.status(500).json({message:"Failed adding a new course",error});
    }
}
const AllCoursesForIndex =async(req,res)=>{//Tested
    try{
    const [result]=await connection.promise().query(`SELECT
    c.id AS course_id,
    c.name AS course_name,
    c.img AS course_image,
    c.start_date AS course_start_date,
    c.end_date AS course_end_date,
    c.description AS course_description,
    COUNT(l.id) AS number_of_lessons
FROM
    courses c
LEFT JOIN
    lessons l
ON
    c.id = l.course_id
GROUP BY
    c.id, c.name, c.img, c.start_date, c.end_date;
`);
    if(!result)throw new Error("An error occured");
    res.status(200).json({message:"Selecting courses table successfully ",result});
    }catch(error){
        res.status(500).json({message:"Failed to select courses table",error});
    }
}

const AllCoursesForOneTeacher =async(req,res)=>{//Tested
    try{
    const [result]=await connection.promise().query(`SELECT
    c.id AS course_id,
    c.name AS course_name,
    c.img AS course_image,
    c.start_date AS course_start_date,
    c.end_date AS course_end_date,
    COUNT(l.id) AS number_of_lessons
FROM
    courses c
LEFT JOIN
    lessons l
ON
    c.id = l.course_id
LEFT JOIN
    teachers t
ON
    c.id = t.course_id
WHERE
t.teacher_id = ${req.params.id} 
GROUP BY
    c.id, c.name, c.img, c.start_date, c.end_date, t.teacher_id
`);
    if(!result)throw new Error("An error occured");
    res.status(200).json({message:"Selecting courses table successfully ",result});
    }catch(error){
        res.status(500).json({message:"Failed to select courses table",error});
    }
}
const singleCourseInfo =async(req,res)=>{
    try{
        const [result] = await connection.promise().execute(
            `SELECT
               c.name AS course_name,
               c.start_date AS course_start_date,
               c.end_date AS course_end_date,
               COUNT(l.id) AS number_of_lessons, 
               u.name AS teacher_name,
               c.description AS course_description
             FROM
               courses c
             LEFT JOIN
               lessons l ON c.id = l.course_id
             LEFT JOIN
               teachers t ON c.id = t.course_id
             LEFT JOIN  
               users u ON u.id = t.teacher_id
             WHERE
               t.course_id = ?`,
            [req.params.id]
          );
          
    if(!result)throw new Error("An error occured");
    res.status(200).json({message:"Selecting courses table successfully ",result});
    }catch(error){
        res.status(500).json({message:"Failed to select courses table",error});
    }
}
const getAllCourses=async(req,res)=>{//Tested
    try{
    const [result]=await connection.promise().query(`SELECT * FROM courses`);
    if(!result)throw new Error("An error occured");
    res.status(200).json({message:"Your courses",result});
    }catch(error){
        res.status(500).json({message:"Courses not found",error});
    }
}
const getOneCourse=async(req,res)=>{//Tested
    try{
    const [result]=await connection.promise().query(`SELECT * FROM courses WHERE id=${req.params.id}`);
    if(!result)throw new Error("An error occured");
    res.status(200).json({message:"Selecting one course by id successfully",result});
    }catch(error){
        res.status(500).json({message:"An error occured during selecting a course ",error});
    }
}
const deleteOne=async(req,res)=>{//Tested
    try{
    const [result]=await connection.promise().query(`DELETE FROM courses WHERE id=${req.params.id}`);
    if(!result)throw new Error("An error occured");
    res.status(200).json({message:"A row from your courses table deleted successfully",result});
    }catch(error){
        res.status(500).json({message:"Failed to delete this course",error});
    }
}
const updateCourse = async (req, res) => {//Tested
    try {
        const { name, description, img, start_date, end_date } = req.body;
        const courseId = req.params.id;
        const sql = `UPDATE courses
                    SET name = ?, description = ?, img = ?, 
                    start_date = ?, end_date = ?
                    WHERE id = ?`;
        const values = [name, description, img, start_date, end_date, courseId];
        const [result] = await connection.promise().query(sql, values);
        if (result.affectedRows === 1) 
            res.status(200).json({ message: "Course updated successfully", result });
         else 
            throw new Error("An error occurred while updating the course");
    } catch (error) {
        res.status(500).json({ message: "Failed to update the course", error: error.message });
    }
}

module.exports={addCourse,singleCourseInfo,AllCoursesForOneTeacher,getAllCourses,getOneCourse,deleteOne,updateCourse,AllCoursesForIndex};