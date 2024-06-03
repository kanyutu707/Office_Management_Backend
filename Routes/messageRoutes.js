const express=require('express');
const router=express.Router();
const messageController=require('../Controller/messageController');

router.get('/', messageController.getAllMessages);
router.post('/', messageController.createMessage);
router.get('/:id', messageController.getMessageById);
router.put('/:id', messageController.updateMessage);
router.delete('/:id', messageController.deleteMessage);;

module.exports=router