const pool=require('../config/db')

exports.createCompany=async(req, res)=>{
    try{
        const{name}=req.body;
        const connection=await pool.getConnection();

        try{   
            const [result]=await connection.query("INSERT INTO company (name) VALUES (?)", [name]);
            const id=result.insertId;
            connection.release();
            res.status(201).json({id, name});

        }catch(error){
            connection.release()
            throw error;
        }
    }catch(error){
        res.status(500).json({error: error.message});
    }
}

exports.getAllCompanies=async(req, res)=>{
    try{
        const connection=await pool.getConnection();
        try{
            const[companies]=await connection.query("SELECT * FROM company");
            connection.release();
            res.json(companies);
            
        }
        catch(error){
            connection.release()
            throw error;
        }
    }catch(error){
        res.status(500).json({error: error.message});
    }
}

exports.getCompanyById=async(req, res)=>{
    const connection=await pool.getConnection();
    try{
        const{id}=req.params;
        const[company]=await connection.query("SELECT * FROM company WHERE id=?", [id]);
        connection.release();
        if(!company.length){
            return res.status(404).json({error: "Company not found"});
        }
        res.json(company[0]);
    }
    catch(error){
        res.status(500).json({error:error.message});
    }

}

exports.updateCompany=async(req, res)=>{
    try{
        const {id}=req.params;
        const{name}=req.body;

        const connection=await pool.getConnection();

        try{
            await connection.query("UPDATE company set name=? WHERE id=?", [name, id]);
            connection.release();
            res.json({id, name});
        }
        catch(error){
            connection.release();
            throw error;
        }
    }
    catch(error){
        res.status(500).json({error: error.message});
    }
}
exports.deleteCompany=async(req, res)=>{
    try{
        const {id}=req.params;
        const connection=await pool.getConnection();
        try{
            await connection.query("DELETE FROM company WHERE id=?", [id]);
            connection.release();
            res.json({message: 'Company deleted successfully'});
        }catch(error){
            connection.release();
            throw error;
        }
    }
    catch(error){
        res.status(500).json({error:error.message});
    }
}