const express=require('express');
const router=express.Router();
const financeController=require('../Controller/financialController');
router.get("/", financeController.getAllFinances);
router.post("/", financeController.createFinances);
router.get("/:id", financeController.getFinancesById);
router.put("/:id", financeController.updateFinances);
router.delete("/:id", financeController.deleteFinance);

module.exports=router;