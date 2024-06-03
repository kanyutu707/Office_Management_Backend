const pool=require('../config/db')

exports.createEvent=async(req, res)=>{
    try{
        const {title, description, startTime, endTime, companyId}=req.body;
        const connection=await pool.getConnection();
        try{
            await connection.query("INSERT INTO Events (title, description, startTime, endTime, companyId) VALUES (?, ?, ?, ?, ?)", [title, description, startTime, endTime, companyId]);
            connection.release();
            res.status(201).json({title, description, startTime, endTime, companyId});

        }catch(error){
            connection.release()
            throw error;
        }
    }catch(error){
        res.status(500).json({error: error.message});
    }
}

exports.getAllEvents=async(req, res)=>{
    try{
        const connection=await pool.getConnection();
        try{
            const[events]=await connection.query("SELECT * FROM Events");
            connection.release();
            res.json(events);
        }
        catch(error){
            connection.release()
            throw error;
        }
    }
    catch(error){
        res.status(500).json({error: error.message});
    }
}
exports.getEventById=async(req, res)=>{
    const connection=await pool.getConnection();
    try{
        const {id}=req.params;
        const[event]=await connection.query("SELECT * FROM Events WHERE id=?", [id]);
        connection.release();
        if(!event.length){
            return res.status(404).json({error: "Event not found"});
        }
        res.json(event[0]);
    }catch(error){
        res.status(500).json({error: error.message});
    }
};
exports.updateEvent=async(req, res)=>{
    try{
        const {id}=req.params;
        const{title, description, startTime, endTime}=req.body;

        const connection=await pool.getConnection();
        try{
            await connection.query("UPDATE Events SET title=?, description=?, startTime=?, endTime=? WHERE id=?", [title, description, startTime, endTime, id]);
            connection.release();
            res.json({id, title, description, startTime, endTime});
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

exports.deleteEvent=async(req, res)=>{
    try{
        const {id}=req.params;
        const connection=await pool.getConnection();
        try{
            await connection.query('DELETE FROM Events WHERE id=?', [id]);
            connection.release();
            res.json({message: 'Test deleted successfully'});
        }catch(error){
            connection.release();
            throw error;
        }
    }catch(error){
        res.status(500).json({error:error.message});
    }
}