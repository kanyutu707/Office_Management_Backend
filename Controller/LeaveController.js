const pool=require('../config/db');

exports.createLeave=async (req, res)=>{
    try {
        const{startDate, endDate, status, companyId, userId}=req.body;
        const connection=await pool.getConnection();
        try {
            await connection.query("INSERT INTO leaves (startDate, endDate, status, companyId, userId) VALUES (?, ?, ?, ?, ?)", [startDate, endDate, status, companyId, userId]);
            connection.release();
            res.status(201).json({startDate, endDate, status, companyId, userId});
        } catch (error) {
            connection.release();
            console.log(error)
            throw error;
        
        }
    } catch (error) {
        res.status(500).json({error: error.message});
  
    }
}

exports.getAllLeaves=async(req, res)=>{
    try {
        const connection=await pool.getConnection();
        try {
            const[leaves]=await connection.query("SELECT * FROM leaves");
            connection.release();
            res.json(leaves);
        } catch (error) {
            connection.release();
            throw error;
        }
    } catch (error) {
        res.status(500).json({error:error.message});
    }
}

exports.getLeaveById=async(req, res)=>{
    try {
        const{id}=req.params;
        const connection=await pool.getConnection();
        try {
            const [leave]=await connection.query("SELECT * FROM leaves where id=?", [id]);
            connection.release();
            if(!leave.length){
                return res.status(404).json({error: 'Leaves not found'});
            }
            res.json(leave[0]);
        } catch (error) {
            connection.release();
            throw error;
        }
    } catch (error) {
        res.status(500).json({error: error.message});
        
    }
};

exports.updateLeaves=async(req, res)=>{
    try {
        const{id}=req.params;
        const{status}=req.body;
        const connection=await pool.getConnection();
        try {
            await connection.query("UPDATE leaves SET status=? WHERE id=?", [status, id]);
            connection.release();
            res.json({id, status});
        } catch (error) {
            connection.release();
            throw error;
        }
    } catch (error) {
        res.status(500).json({error:error.message});
    }
};

exports.deleteLeave=async(req, res)=>{
    try {
        const{id}=req.params;
        const connection=await pool.getConnection();
        try {
            await connection.query("DELETE FROM leaves WHERE id=?", [id]);
            connection.release();
            res.json({message: 'Leave deleted successfully'});
        } catch (error) {
            connection.release();
            throw error;
        }
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}
