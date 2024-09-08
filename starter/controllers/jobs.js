const Job=require('../models/Job')
const { NotFoundError,
    BadRequestError}=require('../errors')


const getAllJobs=async(req,res)=>{
    //find only the jobs created by the user having userId
    const jobs=await Job.find({createdBy:req.user.userId}).sort('createdAt')
    res.status(200).json({jobs,count:jobs.length})
}

const updateJobs=async(req,res)=>{
 const {company,position}=req.body
    const userId = req.user.userId;
    const jobId = req.params.id;
console.log(req.body);

    console.log(company,position);
     
     // Update job
  const job = await Job.findOneAndUpdate(
    { _id: jobId, createdBy: userId },  // Matching both the job ID and the user ID
    req.body,
    { new: true, runValidators: true }  // Ensure `runValidators` is set to `true`
  );
    if(company===''|| position===''){
        throw new BadRequestError('give updated values')
    }
    if(!job){
        throw new NotFoundError('no such job ')
    }
    res.status(200).json({job})
}

const getJobs=async(req,res)=>{
    const userId = req.user.userId;
    const jobId = req.params.id;
    const job=await Job.findOne({
        _id:jobId,
        createdBy:userId
    })
    if(!job){
        throw new NotFoundError('no such job ')
    }
    res.status(200).json({singleJob:job})
}
const createJobs=async(req,res)=>{
    req.body.createdBy=req.user.userId//all other properties of req.nody are given by user but we attch the creator to the body in backend
    const job=await Job.create(req.body)
 res.status(201).json({job})
}
const deleteJobs=async(req,res)=>{
    const userId = req.user.userId;
    const jobId = req.params.id;
    const job=await Job.findOneAndRemove({
        _id:jobId,
        createdBy:userId
    })
    if(!job){
        throw new NotFoundError('no such job ')
    }
    res.status(200).send()

}
module.exports={
    deleteJobs,getJobs,createJobs,updateJobs,getAllJobs
}

//has the routes which need crud