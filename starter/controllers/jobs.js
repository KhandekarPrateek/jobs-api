const Job=require('../models/Job')
const { NotFoundError,
    BadRequestError}=require('../errors')


const getAllJobs=async(req,res)=>{
    res.send('get hiuhwiefuhjobs ')
}

const updateJobs=async(req,res)=>{
    res.send(' updateJobs ')
}

const getJobs=async(req,res)=>{
    res.send('getJobs ')
}
const createJobs=async(req,res)=>{
    req.body.createdBy=req.user.userId//all other properties of req.nody are given by user but we attch the creator to the body in backend
    const job=await Job.create(req.body)
 res.status(201).json({job})
}
const deleteJobs=async(req,res)=>{
    res.send(' deleteJobs ')
}
module.exports={
    deleteJobs,getJobs,createJobs,updateJobs,getAllJobs
}

//has the routes which need crud