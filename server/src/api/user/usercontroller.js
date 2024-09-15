import { prisma } from "../../config/prisma.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { STATUS } from "@prisma/client";
import { SECRET } from "../../config/secrete.js";
import { generatePassword } from "../../utils/generator.js"
import { sendEmail } from "../../utils/emailSender.js";

const userController = {
  signup: async (req, res) => {
  //check if the email exists
  const isUserExist = await prisma.user.findFirst({
    where: {
      email: req.body.email,
    },
  });
  if (isUserExist) {
    return res.status(409).json({
      success: false,
      message: "Email is already in use",
    });
  }
  
  try {
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(req.body.passwordHash, salt);
  
    const newUser = await prisma.user.create({
      data: {
        email: req.body.email,
        username:req.body.username,
        passwordHash: hashedPassword,
        phonenumber:req/body.phonenumber    
       
      },
    });
  
    return res.status(201).json({
      success: true,
      message: "User created successfully",
      data: newUser,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Error creating user",
    });
  }
},
  

  login: async (req, res) => {
    console.log("sdfvsf");
    
    const user = await prisma.user.findFirst({
      where: {
        email: req.body.email,
      },
    });
   
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "user not found",
      });
    }

    if (!bcrypt.compareSync(req.body.password, user.passwordHash)) {
      return res.status(404).json({
        success: false,
        message: "password is incorrect",
      });
    }
    
    const payload = {
      id: user.id,
      username: user.username,
    };
    console.log("kdajkn");
    
    const token = await jwt.sign(payload, SECRET);

    return res.status(200).json({
      success: true,
      message: "user logged in successfully",
      data: user,
      token: token,
    });
  },
  changePassword: async (req, res) => {
    const id = req.params.id;
    const user = await prisma.user.findFirst({
      where: {
        id: +id,
      },
    });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "user not found",
      });
    }
    console.log("sdfvsf");
   if (!bcrypt.compareSync(req.body.password, user.passwordHash)) {
    return res.status(404).json({
      success: false,
      message: "password is incorrect",
    });
  }
    if (req.body.newpassword != req.body.conformpassword) {
      return res.status(404).json({
        success: false,
        message: "new passwords does not match",
      });
    }
    
    const salt = bcrypt.genSaltSync(10);
    const newpassword = bcrypt.hashSync(req.body.newpassword, salt);
    const updateUser = await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        passwordHash: newpassword,
      },
    });


    return res.status(200).json({
      success: true,
      message: "password updated successfully",
      data: updateUser,
    });
  },  getAll:async(req,re)=>{

    try {
        const users= await prisma.user.findMany();
        
        res.status(200).json({ success: true,
          message: "all Users",users});
      } catch (error) {
        throw(error);
      }
    },
  resetPassword: async (req, res) => {
    const email = req.body.email;
    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required",
      });
    }
  
    const user = await prisma.user.findFirst({
      where: {
        email,
      },
    });
  
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
  
    const newOtp = generatePassword();
    
  const updateUser = await prisma.user.update({
    where: {
          email: email,
        },
        data:{
        otp:newOtp
  }});

  sendEmail(user.email, newOtp);
  
    return res.status(200).json({
      success: true,
      message: "Otp send successfully",

    });
  }, 
  otpVerification: async (req, res) => {
    try {
      const { email, otp } = req.body;
  
      const users= await prisma.user.findUnique({
        where: { email },
      });
  
      if (
        !users ||
        users.otp !== otp 
       
      ) {
        return res.status(400).json({
          success: false,
          message: "Invalid or expired OTP. Pleas a new OTP.",
        });
      }
  
      res.status(200).json({
        success: true,
        message: "OTP verified successfully.",
      });
    } catch (error) {
      console.error("Error in otpVerification:", error);
      res.status(500).json({
        success: false,
        message: "An error occurred while verifying the OTP.",
        error: error.message,
      });
    }
  },
   newPassword: async (req, res) => {
    const email = req.body.email;
    const newPassword = req.body.newpassword;
  
    if (!email || !newPassword) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }
  
    try {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(newPassword, salt);
  
      const userExist = await prisma.user.findFirst({
        where: {
          email,
        },
      });
  
      if (!userExist) {
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }
  
      await prisma.user.update({
        where: {
          email,
        },
        data: {
          passwordHash: hashedPassword,
        },
      });
  
      return res.status(200).json({
        success: true,
        message: "Password updated successfully",
      });
    } catch (error) {
      console.error('Error in newPassword:', error);
      return res.status(500).json({
        success: false,
        message: 'An error occurred while processing newPassword.',
  
      });
    }
  } 

};
export default userController;
