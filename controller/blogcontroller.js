const { default: mongoose } = require('mongoose');
const Blog = require('../model/Blog');
const User = require('../model/user');


const getAllBlogs = async (req,res,next)=>{
    let blogs;
    try{
        blogs = await Blog.find();
        
        if(!blogs)
        {
            return res.status(404).json({message:"No Blogs found"});
        }
        else
        {
            return res.status(200).json({blogs});
        }
    }
    catch(e)
    {
        console.log(e);
    }
}


const blogAdd = async (req,res,next)=>{
    let { title , description , image , user} = req.body;

    let existinguser;
    try
    {
        existinguser = await User.findById(user);
    }
    catch(e)
    {
        console.log(e);
    }

    if(!existinguser)
    {
        return res.status(400).json({message:"Unable to find user by this ID"});
    }

    const blog = new Blog({
        title,
        description,
        image,
        user
    });

    try{
       
        await blog.save();
        existinguser.blogs.push(blog);
        await existinguser.save();
    }
    catch(err){
        console.log(err);
        return res.status(500).json({message: err});
    }

    res.status(201).json({blog});
}


const updateBlog = async (req,res,next)=>{
    
    const { title , description } = req.body;
    const bid = req.params.id;
    let blog;
    try
    {
        blog = await Blog.findByIdAndUpdate(bid,{
            title,
            description
        });
    }
    catch(e)
    {
        console.log(e);
    }
    if(!blog)
    {
        return res.status(500).json({message:"Unable to update the blog"});
    }
    return res.status(200).json({blog});
}


const getById = async (req,res,next)=>{
    const bid = req.params.id;
    let blog;

    try
    {
        blog = await Blog.findById(bid);
        if(!blog)
        {
            return res.status(404).json({message:"No blog with this ID found"});
        }
        else{
        return res.status(200).json({blog});
        }
    }
    catch(e){
        console.log(e);
    }
}

const deleteById = async (req,res,next)=>{
    const bid = req.params.id;
    let blog;
    try{
        blog = await Blog.findByIdAndRemove(bid).populate('user');
        await blog.user.blogs.pull(blog);
        await blog.user.save();
        if(!blog)
        {
            return res.status(404).json({message:"No blog with this ID to delete"});
        }
        return res.status(200).json({message:"Deleted sucessfully"});
    }
    catch(e)
    {
        console.log(e);
    }
}


const getByUserId = async (req,res,next)=>{
    const userid = req.params.id;
    let userBlogs;
    try{
        userBlogs = await User.findById(userid).populate('blogs');
        if(!userBlogs)
        {
            return res.status(404).json({message:"No blogs found"});
        }
        return res.status(200).json({ blogs: userBlogs});
    }
    catch(e){
        console.log(e);
    }
}

module.exports = {
    getAllBlogs,
    blogAdd,
    updateBlog,
    getById,
    deleteById,
    getByUserId
};