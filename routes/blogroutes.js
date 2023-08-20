const express = require('express');

const { getAllBlogs , blogAdd , updateBlog , getById , deleteById , getByUserId} = require('../controller/blogcontroller');

const blogRouter = express.Router();

blogRouter.get('/',getAllBlogs);

blogRouter.post('/add',blogAdd);

blogRouter.put('/update/:id',updateBlog);

blogRouter.get('/:id',getById);

blogRouter.delete('/delete/:id',deleteById);

blogRouter.get('/user/:id',getByUserId);

module.exports = blogRouter;