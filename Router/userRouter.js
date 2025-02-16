const { createUser, updateUser,getOneUser,getAllUsers, deleteUser} = require("../Controllers/userController");

const upload = require("../utils/multer");

const router = require("express").Router();

router.post("/users", upload.array("familyPictures", 5), createUser);

router.patch("/users/:id", upload.array("familyPictures", 5), updateUser);

router.get('/users/:id',getOneUser)

router.get('/users',getAllUsers)

router.delete('/users/:id',upload.array("familyPictures",5),deleteUser)


module.exports = router;
