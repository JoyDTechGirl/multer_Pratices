const userModel = require("../model/userModel");
const fs = require("fs");

exports.createUser = async (req, res) => {
  try {
    const { fullName, email } = req.body;

    const files = req.files.map((e) => e.filename);

    const user = new userModel({
      fullName,
      email,
      familyPictures: files,
    });
    await user.save();

    res.status(201).json({ message: "User Created Successfully", data: user });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: "Error Creating User" });
  }
};

exports.updateUser = async (req, res) => {
  try {
    // Get the Id From the params
    const { id } = req.params;

    // Extract the field to be updated from the requesst body
    const { fullName, email } = req.body;

    const user = await userModel.findById(id);

    if (!user) {
      return res.status(404).json({ message: "User Not Found" });
    }

    // Create a data object
    const data = {
      fullName,
      email,
      familyPictures: user.familyPictures,
    };

    // Dynamically declear each file path
    const oldFilePaths = user.familyPictures.map((e) => {
      return `./uploads/${e}`;
    });

    // Check if the user is uploading an image
    if (req.files && req.files[0]) {
      // Run a check for each of the file path
      oldFilePaths.forEach((path) => {
        // Check if the path are existing
        if (fs.existsSync(path)) {
          // Delete the existing images
          fs.unlinkSync(path);
          // Upload the new image and update the data object
          const files = req.files.map((e) => e.filename);
          data.familyPictures = files;
        }
      });
    }
    // pass the updated data object to the database
    const updatedUser = await userModel.findByIdAndUpdate(id, data, {
      new: true,
    });
    // send a success response
    res
      .status(200)
      .json({ message: "User Creating Successfully", data: updatedUser });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.getOneUser = async (req, res) => {
  try {
    const { id } = req.params;

    const getuser = await userModel.findById(id);

    if (!users) {
      return res.status(404).json({ message: "User Not Found" });
    }
    res.status(200).json({ message: "User Found", data: getuser });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: "Error Fetching A Particular User" });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const { fullName, email } = req.body;

    // const files = req.files.map((e) => e.filename);

    const allUser = await userModel.find().populate("familyPictures");

    if (!allUser) {
      return res
        .status(404)
        .json({ message: "Users Not Found", data: allUser });
    }
    res.status(200).json({ message: "Users Got Successfully", data: allUser });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: "Error Trying To Get All Users" });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const { fullName, email } = req.body;

    const user = await userModel.findById(id);

    if (!user) {
      return res.status(404).json("User Not Found");
    }

    const oldFilePaths = `./uploads/${user.familyPictures}`;

    const deletedUser = await userModel.findByIdAndDelete(id);

    if (deletedUser) {
      fs.unlinkSync(oldFilePaths);
    }
    res
      .status(200)
      .json({
        message: "User Has Been Found And Has Been Deleted Successfully",
        data: deletedUser,
      });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: "Error Trying To Delete User" });
  }
};
