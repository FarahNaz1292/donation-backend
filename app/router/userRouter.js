const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
// crud operation
router.post("/signup", userController.signup);
router.post("/signin", userController.signin);
router.get("/user", userController.getAllUsers);
router.get("/get-user/:id", userController.findUser);
router.put("/user-update/:id", userController.updateUser);
router.delete("/delete-user", userController.delelteUser);
module.exports = router;
