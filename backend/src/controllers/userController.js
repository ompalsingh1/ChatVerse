import User from "../models/userModel.js";

export const registerUser = async(req,res) =>{
    try{
        const username = req.body.username?.trim();

        // Validate User

        if(!username){
            return res.status(400).json({message: "Username is required"});
        }

        // Check if user already exists
        const existingUser = await User.findOne({username});
        if(existingUser){
            return res.status(400).json({message: "User already exists"});
        }

        // Create new user
        const user = new User({username});
        await user.save();

        res.status(201).json({message: "User registered successfully", user});
    } catch (error) {
        res.status(500).json({message: "Internal server error", error: error.message});
    }
};

export const loginUser = async (req, res) => {
  try {
    const username = req.body.username?.trim();

    // Validate username
    if (!username) {
      return res.status(400).json({
        message: "Username is required",
      });
    }

    // Find user
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.status(200).json({
      message: "Login successful",
      user,
    });
  } catch (error) {
    console.error("Login user error:", error);

    res.status(500).json({
      message: "Internal server error",
    });
  }
};