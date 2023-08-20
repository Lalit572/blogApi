const User = require('../model/user');


const getAllUser = async (req, res, next) => {
    try {
        const users = await User.find().exec();
        if (!users || users.length === 0) {
            return res.status(404).json({ message: "No users found" });
        }
        return res.status(200).json({ users });
    } catch (e) {
        console.log(e);
        return res.status(500).json({ message: "Server error" });
    }
}


const signup = async (req, res, next) => {
    const { name, email, password } = req.body;

    try {
        const existingUser = await User.findOne({ email }).exec();

        if (existingUser) {
            return res.status(400).json({ message: "User already exists! Login instead" });
        }

        const user = new User({
            name,
            email,
            password,
            blogs:[]
        });

        await user.save();
        return res.status(201).json({ user });
    } catch (e) {
        console.log(e);
        return res.status(500).json({ message: "Server error" });
    }
}


const login = async (req,res,next)=>{
    const { email , password } = req.body;

    let existingUser;
    try{
        existingUser = await User.findOne({email}).exec();
        if(!existingUser)
        {
            return res.status(400).json({message:"Could not find user of this email you need to sign up first!"});
        }
    }
    catch(e)
    {
        console.log(e);
    }

    if(password===existingUser.password)
    {
        return res.status(200).json({message:"Login sucessfull!"});
    }

   return res.status(400).json({message:"Incorrect password!"});
    

}


const deleteUserById = async (req,res,next)=>{
    const uid = req.params.id;

    let deluser;
    try{
        deluser = await User.findByIdAndRemove(uid);
        if(!deluser)
        {
            return res.status(404).json({message:"No user found to delete with this ID"});
        }
        return res.status(200).json({message:"User removed sucesfully!"})
    }
    catch(e)
    {
        console.log(e);
    }

}


module.exports = {
    getAllUser,
    signup,
    login,
    deleteUserById
};