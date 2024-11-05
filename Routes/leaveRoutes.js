const express=require('express');
const router=express.Router();
const leaveController=require('../Controller/LeaveController');

router.get("/", leaveController.getAllLeaves);
router.post("/", leaveController.createLeave);
router.get("/:id", leaveController.getLeaveById);
router.put("/:id", leaveController.updateLeaves);
router.delete("/:id", leaveController.deleteLeave);

module.exports=router;