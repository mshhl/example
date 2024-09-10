const {check,validationResult} = require("express-validator")

const registrationValidator = function(req,res,next){
   
   
    check(req.body.email)
    .trim()
    .isEmpty()
    .isEmail()
    .withMessage("Email is not valid")
    // field 2
    check(req.body.fullname )
    .trim()
    .isEmpty()
    .isLength({min:0,max:35})
    .withMessage("pls give a valid name")
    // field 3

    check(req.body.password,"password is not valid")
    .trim()
    .isEmpty()
    .isLength({min:6,max:16})
    .withMessage("password should contain min of 6 characters and max of 16 characters")
    .matches(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/)
    .withMessage("Password must contain atleast one number and a special character");

    // field 4

    check(req.body.cfmpassword)
    .trim()
    .isEmpty()
    .isAlphanumeric()
    .withMessage("password doesn't match to the password you have entered");

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }else{
        console.log("register validator");
        next();
    }


    

    
}

const loginValidator = function(req,res,next){
   check(req.body.email,)
   .trim()
   .isEmpty()
   .withMessage("Email is empty")
   .isEmail()
   .withMessage("Email is invalid");

   check(req.body.password)
   .trim()
    .isEmpty()
    .isLength({min:6,max:16})
    .withMessage("password should contain min of 6 characters and max of 16 characters")
    .matches(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/)
    .withMessage("Password must contain atleast one number and a special character");

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }else{
        next()
    }
}
module.exports = {
    registrationValidator,
    loginValidator
};