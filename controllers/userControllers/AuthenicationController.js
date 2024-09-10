const userModel = require("../../model/userModel");
const bcrypt = require("bcryptjs")





const login = function(req,res){
    res.render("users/login");
}
// login post

const userAuthentication = async function(req,res){
   try {
    const {email,password} = req.body;
   
    const user = await userModel.findOne({email});
   
    if(!user){
        res.render("users/login",{message:"user doesn't exist"})
    }
    const r =  await bcrypt.compare(password,user.password);
   
   
    if(r){
      next()
    }else{
        res.render("users/login",{message:"Wrong Password"});
    }
    
   
   } catch (error) {
    console.log(error.message);
   }
    
}

const registration = function(req,res){
    
    res.render("users/registration")
}

const userRegistration = async function(req,res){
   
    try {
        const {email,fullname,password,cfmpassword} = req.body;
        const userExist = await userModel.findOne({email});
        
        const npassword =  await bcrypt.hash(password,10);
       
        const result =  await bcrypt.compare(cfmpassword,npassword);
    if(result){
        const user = new userModel({
            email,
            fullname,
            password : npassword
            
        })
        const existUser = await userModel.findOne({email})
        if(existUser){
            res.render("users/registration",{message:"user already exist try another email"});
        }else{
            const userData = await userModel.create(user);
            console.log(userData)
            
        }
        
    }else{
        res.render("users/registration",{cfmerror:"Entered password didn't match"})
    }
    } catch (error) {
        console.log(error.message);
    }

}


module.exports = {
    login,
    registration,
    userRegistration,
    userAuthentication
    
}