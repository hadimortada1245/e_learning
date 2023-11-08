const con =require('./config/connection');
const creatingTables=()=>{
    // con.query(`CREATE TABLE IF NOT EXISTS users (
    //     id INT AUTO_INCREMENT PRIMARY KEY,
    //     name VARCHAR(255) NOT NULL,
    //     email VARCHAR(255) NOT NULL,
    //     password VARCHAR(255) NOT NULL,
    //     photo VARCHAR(255),
    //     phone VARCHAR(20),
    //     role VARCHAR(255) NOT NULL)`, (error, result) => {
    //     if (error)  
    //       console.error('Creating users table failed: ' + error);
    //      else 
    //       console.log('Users table created successfully');
    //   });
    //   con.query(`CREATE TABLE IF NOT EXISTS courses (
    //     id INT AUTO_INCREMENT PRIMARY KEY,
    //     name VARCHAR(255) NOT NULL,
    //     description longtext NOT NULL,
    //     img VARCHAR(255) NOT NULL,
    //     start_date DATE NOT NULL,
    //     end_date DATE NOT NULL
    //   )`, (error, result) => {
    //     if (error) 
    //       console.error('Creating courses table failed: ' + error);
    //      else 
    //       console.log('Courses table created successfully');
    //   });
    //   con.query(`CREATE TABLE IF NOT EXISTS lessons (
    //     id INT AUTO_INCREMENT PRIMARY KEY,
    //     text VARCHAR(255),
    //     video_link VARCHAR(255),
    //     date DATE NOT NULL,
    //     course_id INT,
    //     FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE ON UPDATE CASCADE
    //   )`, (error, result) => {
    //     if (error) 
    //       console.error('Creating lessons table failed: ' + error);
    //      else 
    //       console.log('Lessons table created successfully');
    //   });
    //   con.query(`CREATE TABLE IF NOT EXISTS quizzes (
    //     id INT AUTO_INCREMENT PRIMARY KEY,
    //     question VARCHAR(255),
    //     answer1 VARCHAR(255),
    //     answer2 VARCHAR(255),
    //     answer3 VARCHAR(255),
    //     correct_answer VARCHAR(255),
    //     lesson_id INT,
    //     FOREIGN KEY (lesson_id) REFERENCES lessons(id) ON DELETE CASCADE ON UPDATE CASCADE
    //   )`, (error, result) => {
    //     if (error) 
    //       console.error('Creating quizzes table failed: ' + error);
    //      else 
    //       console.log('Quizzes table created successfully');
    //   });
    //   con.query(`
    //   CREATE TABLE IF NOT EXISTS teachers (
    //     teacher_id INT,
    //     course_id INT,
    //     FOREIGN KEY (teacher_id) REFERENCES users(id) ON UPDATE CASCADE ON DELETE CASCADE,
    //     FOREIGN KEY (course_id) REFERENCES courses(id) ON UPDATE CASCADE ON DELETE CASCADE
    //   )`,
    //   (error, result) => {
    //     if (error) 
    //       console.error('Creating teachers table failed: ' + error);
    //     else 
    //       console.log('Teachers table created successfully');
    //   });
    //   con.query(`
    //   CREATE TABLE IF NOT EXISTS attendance (
    //     student_id INT,
    //     quiz_id INT,
    //     attended BOOLEAN,
    //     FOREIGN KEY (student_id) REFERENCES users(id) ON UPDATE CASCADE ON DELETE CASCADE,
    //     FOREIGN KEY (quiz_id) REFERENCES quizzes(id) ON UPDATE CASCADE ON DELETE CASCADE
    //   )`,
    //   (error, result) => {
    //     if (error) 
    //       console.error('Creating attendance table failed: ' + error);
    //     else 
    //       console.log('Attendance table created successfully');
    //   });
    //   con.query(`
    //   CREATE TABLE IF NOT EXISTS enrollement (
    //     student_id INT,
    //     course_id INT,
    //     completed BOOLEAN,
    //     FOREIGN KEY (student_id) REFERENCES users(id) ON UPDATE CASCADE ON DELETE CASCADE,
    //     FOREIGN KEY (course_id) REFERENCES courses(id) ON UPDATE CASCADE ON DELETE CASCADE
    //   )`,
    //   (error, result) => {
    //     if (error) 
    //       console.error('Creating  enrollement table failed: ' + error);
    //     else 
    //       console.log('Enrollement table created successfully');
    //   });
}
module.exports=creatingTables;