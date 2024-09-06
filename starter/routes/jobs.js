const express=require('express')

const router=express.Router()
const {deleteJobs,getJobs,createJobs,updateJobs,getAllJobs}=require('../controllers/jobs')


router.route('/').post(createJobs).get(getAllJobs)
router.route('/:id').get(getJobs).patch(updateJobs).delete(deleteJobs)


module.exports=router