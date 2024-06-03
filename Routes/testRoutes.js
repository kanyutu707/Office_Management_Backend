const express=require('express')
const router=express.Router();
const testController=require('../Controller/testController');

router.get('/', testController.getAllTests);
router.post('/', testController.createTest);
router.get('/:id', testController.getTestById);
router.put('/:id', testController.updateTest);
router.delete('/:id', testController.deleteTest);

module.exports=router