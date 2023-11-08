const express=require('express');
const router=express.Router();
// const authenticated=require('../midleware/authenticated');
const userController=require('../controllers/users');
// router.use(authenticated)
router.post('/registre',userController.registre);
router.post('/login',userController.login);
router.post('/checkPassword/:id',userController.checkPassword);
router.get("/",userController.getUsers);
router.get("/teachersForSuper",userController.getTeacherWithNCourse);
router.get("/studentsForSuper",userController.getStudentWithNCourse);
router.get("/getUserById/:id",userController.getUserById);
router.delete('/deleteUserById/:id',userController.deleteOneById);
router.put('/updateUserById/:id',userController.updateUserById);
router.put('/updateProfile/:id',userController.updateProfile);
router.put('/updatePassword/:id',userController.updatePassword);
router.get('/getUserByRole/:role',userController.getUserByRole);
module.exports=router;