const express = require("express");
const { addUserController, getAllUserController, getUserByIdController, getUserByDataController, updateUserController, deleteUserController, loginUserController } = require("../controllers/userController");
const router = express.Router();

router.post("/add", addUserController);
router.post("/login", loginUserController);
router.get('/getAll', getAllUserController);
router.get('/get/:id', getUserByIdController);
router.get('/search/:info', getUserByDataController);
router.put('/update/:id', updateUserController);
router.delete('/delete/:id', deleteUserController);

module.exports = router;