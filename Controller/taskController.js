const pool=require("../config/db")

exports.createTask = async (req, res) => {
    try {
        const { description, title, created, assigned_to, deadline, createdby, company_id } = req.body;
        const connection = await pool.getConnection();
        try {
            await connection.query("INSERT INTO tasks (description, title, created, assigned_to, deadline, createdby, company_id) VALUES (?, ?, ?, ?, ?, ?,?)", [description, title, created, assigned_to, deadline, createdby, company_id]);
            connection.release();
            res.status(201).json({ description, title, created, assigned_to, deadline, createdby, company_id });
        } catch (error) {
            connection.release();
            throw error;
            
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
        console.log(error)
    }
}


exports.getAllTasks=async(req, res)=>{
    try{
        const connection=await pool.getConnection();
        try{
            const[tasks]=await connection.query("SELECT * FROM tasks");
            connection.release();
            res.json(tasks);
        }catch(error){
            connection.release()
            throw error;
        }
        
    }
    catch(error){
        res.status(500).json({error:error.message});
    }

}

exports.getTaskById=async(req, res)=>{
    const connection=await pool.getConnection();
    try{
        const {id}=req.params;
        const [task]=await connection.query("SELECT * FROM tasks WHERE id=?", [id]);
        connection.release();
        if(!task.length){
            return res.status(404).json({error: "Task not found"});
        }
        res.json(task[0]);
    }catch(error){
        res.status(500).json({error:error.message});
    }
};
exports.updateTask=async(req, res)=>{
    try{
        const{id}=req.params;
        const {description, title, created, createdby, assigned_to}=req.body;

        const connection=await pool.getConnection();
        try{
            await connection.query("UPDATE tasks SET description=?, title=?, created=?, createdby, assigned_to=?", [description, title, created, createdby, assigned_to, id]);
            connection.release();
            res.json({id, description, title, created,createdby, assigned_to})
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

exports.deleteTask=async(req, res)=>{
    try{
        const {id}=req.params;
        const connection=await pool.getConnection();
        try{
            await connection.query('DELETE FROM tasks WHERE id=?', [id]);
            connection.release();
            res.json({message: 'Task deleted successfully'});
        }catch(error){
            connection.release();
            throw error;
        }
    }catch(error){
        res.status(500).json({error:error.message});
    }
}