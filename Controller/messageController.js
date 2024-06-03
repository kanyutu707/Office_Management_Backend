const pool=require('../config/db')

exports.createMessage=async(req, res)=>{
    try{
        const{message_from, message_to, message}=req.body;
        const connection=await pool.getConnection();
        try{
            await connection.query("INSERT INTO Messages (message_from, message_to, message) VALUES (?, ?, ?)", [message_from, message_to, message]);
            connection.release();
            res.status(201).json({message_from, message_to, message});
        }catch(error){
            connection.release()
            throw error;
        }
    }catch(error){
        res.status(500).json({error:error.message});
    }
}

exports.getAllMessages=async(req, res)=>{
    try{
        const connection=await pool.getConnection();
        try{
            const [messages]=await connection.query("SELECT * FROM Messages");
            connection.release();
            res.json(messages);
        }
        catch(error){
            connection.release()
            throw error;
        }
    }
    catch(error){
        res.status(500).json({error:error.message});
    }
}
exports.getMessageById=async(req, res)=>{
    const connection=await pool.getConnection();
    try{
        const{id}=req.params;
        const[message]=await connection.query("SELECT * FROM Messages WHERE id=?", [id]);
        connection.release();
        if(!message.length){
            return res.status(404).json({error: "Message not found"});
        }
        res.json(message[0]);
    }catch(error){
        res.status(500).json({error: error.message});
    }
}
exports.updateMessage=async(req, res)=>{
    try{
        const {id}=req.params;
        const {message_from, message_to, message}=req.body;
        const connection=await pool.getConnection();
        try{
            await connection.query("UPDATE Messages SET message_from=?, message_to=?, message=? WHERE id=?", [message_from, message_to, message, id]);
            connection.release();
            res.json({id, message_from, message_to, message});
        }catch(error){
            connection.release();
            throw error;
        }
    }
    catch(error){
        res.status(500).json({error: error.message});
    }
}
exports.deleteMessage=async(req, res)=>{
    try{
        const {id}=req.params;
        const connection=await pool.getConnection();
        try{
            await connection.query("DELETE FROM Messages WHERE id=?", [id]);
            connection.release();
            res.json({message:'Message deleted successfully'});
        }catch(error){
            connection.release();
            throw error;
        }
    }catch(error){

    }
}