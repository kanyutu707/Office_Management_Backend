const express=require('express');
const router=express.Router();
const companyController=require('../Controller/companyController');

router.get("/", companyController.getAllCompanies);
router.post("/", companyController.createCompany);
router.get('/:id', companyController.getCompanyById);
router.put('/:id', companyController.updateCompany);
router.delete('/:id', companyController.deleteCompany);

module.exports=router