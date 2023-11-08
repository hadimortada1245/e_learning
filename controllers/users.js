const con=require("../config/connection");
const bcrypt=require('bcrypt');
const validator=require('validator');
const jwt = require('jsonwebtoken');
require('dotenv').config();
// "email":"hadi111@gmail.com",
// "password":"Hadi!@1234",
const registre = async (req, res) => {
    try {
      const { name, email, password, photo, phone, role } = req.body;
      if(!name ||!email ||  !password || !role)throw Error("All fields must be filled!");
      if(!validator.isEmail(email))throw Error('Email is not valid');
      if(!validator.isStrongPassword(password))throw Error("Password not strong enough!");
      const check = 'SELECT * FROM users WHERE email = ?';
      const [exist] = await con.promise().query(check, [email]);
      if(exist&&exist[0]&&exist[0].email==email)
       throw Error("Email already in use");    
      const salt=await bcrypt.genSalt(10);
      const hashed=await bcrypt.hash(password,salt);
      const query = 'INSERT INTO users (name, email, password, photo, phone, role) VALUES (?, ?, ?, ?, ?, ?)';
      const values = [name, email, hashed, photo || null, phone || null, role];
      const [result] = await con.promise().query(query, values);
      if (!result) 
        throw new Error("An error occurred during adding a new user");
        const userId = result.insertId;
        const User={
          id:userId,
          name:name
        };
        const token = jwt.sign(User, process.env.secretKey, { expiresIn: '1d' });
      res.status(200).json({ message: "Adding a user successful", token });
    } catch (error) {
      res.status(400).json({ message: "Failed adding user", error: error.message });
    }
  };
  const login = async (req, res) => {
    try {
      const { email, password } = req.body;
      if (!email || !password) 
        throw  Error("All fields must be filled!");
      const check = 'SELECT * FROM users WHERE email = ?';
      const [user] = await con.promise().query(check, [email]);
      if (!user || user.length === 0) 
        throw new Error("Incorrect email");
      const match= await bcrypt.compare(password,user[0].password);
      if(!match)throw Error("Wrong password!")
    const User={
      id:user[0].id,
      name:user[0].name,
      role:user[0].role
    }
     const token = jwt.sign(User, process.env.secretKey, { expiresIn: '1d' });
      res.status(200).json({ id:user[0].id,User,role:user[0].role, token });
    } catch (error) {
      res.status(500).json({ message: "Login Failed", error: error.message });
    }
  }
const updateUserById = async (req, res) => {//Tested
    try {
      const {  name, email, password, photo, phone, role } = req.body;
      const query = `
        UPDATE users
        SET name = '${name}', email = '${email}', password = '${password}', 
        photo = '${photo || null}', phone = '${phone || null}', role = '${role}'
        WHERE id = ${req.params.id}`;
      const [result] = await con.promise().query(query);
      if (!result) throw new Error("An error occurred during user update");
      res.status(200).json({ message: "User update successful", result });
    } catch (error) {
      res.status(500).json({ message: "Failed updating user", error: error.message });
    }
  };
const updateProfile = async (req, res) => {//Tested
    try {
      const {  name, email, photo, phone} = req.body;
      const query = `
        UPDATE users
        SET name = '${name}', email = '${email}', 
        photo = '${photo || null}', phone = '${phone || null}'
        WHERE id = ${req.params.id}`;
      const [result] = await con.promise().query(query);
      if (!result) throw new Error("An error occurred during user update");
      res.status(200).json({ message: "User update successful", result });
    } catch (error) {
      res.status(500).json({ message: "Failed updating user", error: error.message });
    }
  };
const updatePassword = async (req, res) => {//Tested
    try {
      const { password} = req.body;
      const query = `
        UPDATE users
        SET password= '${password}'
        WHERE id = ${req.params.id}`;
      const [result] = await con.promise().query(query);
      if (!result) throw new Error("An error occurred during user update");
      res.status(200).json({ message: "User update successful", result });
    } catch (error) {
      res.status(500).json({ message: "Failed updating user", error: error.message });
    }
  };
const getUsers=async(req,res)=>{//Tested
    try{
        const result=await con.promise().execute(`SELECT * FROM users`);
        if(!result)throw new Error("An error occured during selecting all users");
        res.status(200).json({message:"Selecting users successfully",result});
    }catch(error){
        res.status(500).json({message:"Failed selecting users",error});
    }
}
const getTeacherWithNCourse=async(req,res)=>{//Tested
    try{
        const [result]=await con.promise().execute(`SELECT
        users.id AS teacher_id,
        users.name AS teacher_name,
        users.email AS teacher_email,
        COUNT(*) AS count_course
    FROM
        users
    LEFT JOIN
      teachers ON users.id = teachers.teacher_id
    WHERE
        users.role = 'instructor'
    GROUP BY teacher_id
    `);
        if(!result)throw new Error("An error occured during selecting all teachers");
        res.status(200).json({message:"Selecting users successfully",result});
    }catch(error){
        res.status(500).json({message:"Failed selecting teachers",error});
    }
}
const getStudentWithNCourse=async(req,res)=>{//Tested
    try{
        const [result]=await con.promise().execute(`SELECT
  users.id AS student_id,
  users.name AS student_name,
  users.email AS student_email,
  COUNT(enrollement.student_id) AS course_count
FROM
  users
LEFT JOIN
  enrollement ON users.id = enrollment.student_id
WHERE
  users.role = 'student'
GROUP BY
  student_id

    `);
        if(!result)throw new Error("An error occured during selecting all students");
        res.status(200).json({message:"Selecting students successfully",result});
    }catch(error){
        res.status(500).json({message:"Failed selecting students",error});
    }
}
const getUserById=async(req,res)=>{//Tested
    try{
        const result=await con.promise().query(`SELECT * FROM users WHERE id=${req.params.id}`);
        if(!result)throw new Error("An error occured during selecting one user");
        res.status(200).json({message:"Selecting  one user successfully",result});
    }catch(error){
        res.status(500).json({message:"Failed selecting one user",error});
    }
}

const getUserByRole=async(req,res)=>{//Tested
    try{
        const result=await con.promise().query(`SELECT * FROM users WHERE role='${req.params.role}'`);
        if(!result)throw new Error("An error occured during selecting one user");
        res.status(200).json({message:"Selecting   users by role successfully",result});
    }catch(error){
        res.status(500).json({message:"Failed selecting one user",error});
    }
}
const deleteOneById =async(req,res)=>{//Tested
    try{
        const result=await con.promise().query(`DELETE FROM users WHERE id=${req.params.id}`);
        if(!result)throw new Error("An error occured during deleting a user");
        res.status(200).json({message:"Deleting user successfully",result});
    }catch(error){
        res.status(500).json({message:"Failed deleting a user"});
    }
}
const checkPassword =async(req,res)=>{//Tested
    try{
       const {password}=req.body;
        const [result]=await con.promise().query(`SELECT password FROM users WHERE id=${req.params.id}`);
        const match= await bcrypt.compare(password,result[0].password);
      if(!match)throw Error("Wrong password!")
        res.status(200).json({message:"Deleting user successfully",match});
    }catch(error){
        res.status(500).json({message:"Failed deleting a user"});
    }
}

module.exports={registre,getStudentWithNCourse,getTeacherWithNCourse,updatePassword,checkPassword,updateProfile,getUsers,getUserById,deleteOneById,updateUserById,getUserByRole,login};