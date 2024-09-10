const speakeasy = require("speakeasy");
const nodemailer = require("nodemailer");


const loadOtpPage = function(req,res){
   try {
    res.render("users/otpverification")
    
   } catch (error) {
    console.log("rendering failed!")
   }
}

const generateOtp = function(){
    const otp = speakeasy.totp({
        secret:process.env.OTP_SECRET,
        encoding:"base32"


    })
    return otp;
}

const sentOtpEmail =  async function(email){
    let transporter = nodemailer.createTransport({
        service:"gmail",
        auth:{
            user:process.env.MYGMAIL,
            pass:process.env.GMAIL_PASSWORD
        }
    })
    
    let info = await transporter.sendMail({
        from:process.env.MYGMAIL,
        to:email,
        subject:"Your Otp Code for shopCom",
        text:`Your OTP code is ${otp}`
    })
    console.log(`Message sent: ${info.messageId}`);
}
const otpHandler =  async function(req,res){
  const {email} = req.body;
  if(!email){
    return res.status(400).json({error:"Email is required"});
  }
  const otp = generateOtp();
  try {
    await sentOtpEmail(email,otp);
    console.log("otp sucessfully sent");
    res.redirect("/otp")
  } catch (error) {
    console.log(error.message);
    res.status(500).json({error:"Failed to send otp email"});
  }
}

const verifier = function(token){
    const verified = speakeasy.totp.verify({
        secret:process.env.OTP_SECRET,
        encoding:"base32",
        token:token,
        window:1
    })
    return verified;
}
const verifyOtp = function(req,res){
   try {
    const {otp} = req.body;
    const isVerified = verifier(otp);
   if(isVerified) res.redirect("/home");

   } catch (error) {
    console.log(error.message);
   }
}




module.exports = {
    loadOtpPage,
    otpHandler,
    verifyOtp
}