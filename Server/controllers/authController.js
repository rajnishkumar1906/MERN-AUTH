import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import transporter from "../config/nodemailer.js";

// Helper to generate 6-digit OTP
const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();

// REGISTER
export const register = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password)
    return res.status(400).json({ message: "All fields are required" });

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashedPassword });
    await user.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    try {
      await transporter.sendMail({
        from: process.env.SENDER_EMAIL,
        to: email,
        subject: "Welcome to Hospitex",
        text: `Hello ${name}, you have successfully registered on Hospitex!`,
      });
    } catch (err) {
      console.error("Failed to send registration email:", err.message);
    }

    res.json({ success: true, message: "Registration successful" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// LOGIN
export const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ message: "Email and password are required" });

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid email or password" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid email or password" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    try {
      await transporter.sendMail({
        from: process.env.SENDER_EMAIL,
        to: email,
        subject: "Welcome Back to Hospitex",
        text: `Hello ${user.name}, you have successfully logged in!`,
      });
    } catch (err) {
      console.error("Failed to send login email:", err.message);
    }

    res.json({ success: true, message: "Login successful" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// LOGOUT
export const logout = (req, res) => {
  res.clearCookie("token");
  res.json({ success: true, message: "Logged out successfully" });
};

// SEND VERIFY OTP
export const sendVerifyOTP = async (req, res) => {
  try {
    const { userId } = req.body;
    if (!userId) return res.status(400).json({ success: false, message: "User ID is required" });

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ success: false, message: "User not found" });

    const otp = generateOTP();
    const expireAt = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes

    user.verifyOtp = otp;
    user.verifyOtpExpireAt = expireAt;
    await user.save();

    await transporter.sendMail({
      from: process.env.SENDER_EMAIL,
      to: user.email,
      subject: "Your Account Verification OTP",
      text: `Hello ${user.name}, your OTP to verify your account is: ${otp}. It expires in 5 minutes.`,
    });

    res.json({ success: true, message: "OTP sent successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};



export const verifyEmail = async (req, res) => {
  const { userId, otp } = req.body

  if (!userId || !otp) {
    return res.json({ success: false, message: "Enter Details" })
  }

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.json({ success: false, message: "user not found" })
    }

    if (user.verifyOtp === '' || user.verifyOtp !== otp) {
      return res.json({ success: false, message: 'Invalid OTP' })
    }

    if (user.verifyOtpExpireAt < Date.now()) {
      return res.json({ success: false, message: 'OTP Expired' })
    }

    user.isAccountVerified = true;
    user.verifyOtp = '';
    user.verifyOtpExpireAt = 0;
    await user.save();
    return res.json({ success: true, message: 'Email varified successfully' })
  } catch (error) {
    return res.json({ success: false, message: error.message })
  }
}


// Check if authenticaticated
export const isAuthenticated = () => {
  try {
    return re.json({ 
      success: true,
      userId : req.userId
    })
  } catch (error) {
    res.json({
      success: false,
      message: error.message
    })
  }
}


// Send Password reset Otp
export const sendResetOtp = async (req, res) => {
  const { email } = req.body
  if (!email) {
    return res.json({
      success: false,
      message: 'Email is required'
    })
  }

  try {
    const user = await User.findOne({ email })
    if (!user) {
      return res.json({
        success: false,
        message: 'User not found'
      })
    }
    else {
      const otp = generateOTP();
      const expireAt = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes

      user.resetOtp = otp;
      user.resetOtpExpireAt = expireAt;
      // Save the otp
      await user.save();

      await transporter.sendMail({
        from: process.env.SENDER_EMAIL,
        to: user.email,
        subject: "Your Account Verification OTP",
        text: `Hello ${user.name}, your OTP to resetting  your account is: ${otp}. It expires in 15 minutes.`,
      });

      return res.json({
        success : true,
        message : 'OTP resent to your email'
      })
    }
  } catch (error) {

  }
}

// Reset user password  - need of email, otp and new password
export const resetPassword = async (req,res)=>{
  const {email,Otp, newPassword} = req.body

  if(!email || !Otp || !newPassword)
  {
    return res.json({
      success : false,
      message : 'Email , Otp and new password is required'
    })
  }


  try{
      const user = await User.findOne({email});
      if(!user)
      {
        res.json({
          success : false,
          message : 'User not found'
        })
      }
      
      if(user.resetOtp === "" || user.resetOtp !== Otp){
          return res.json({
            success : false,
            message : 'Invalid Otp'
        })
      }

      if(user.resetOtpExpireAt  < Date.now()){
          return res.json({
            success : false,
            message : 'OTP Expired'})
        }

        const hashedPassword = await bcrypt.hash(newPassword,10);

        user.password = hashedPassword;
        user.resetOtp = '';
        user.resetOtpExpireAt = 0;

        await user.save();

        return res.json({
          success : true,
          message : 'Password has been reset successfully'
        })
  }catch(error){
    return res.json({
      success : false,
      message : error.message
    })
  }
}