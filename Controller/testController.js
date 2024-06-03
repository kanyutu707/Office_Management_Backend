const pool=require("../config/db")

exports.createTest=async(req, res)=>{
    try{
        const {title, description}=req.body;
        const connection=await pool.getConnection();
        try{
            await connection.query("INSERT INTO tests (title, description) VALUES (?, ?)", [title, description]);
            connection.release();
            res.status(201).json({title, description});
        }catch(error){
            connection.release();
            throw error;
        }
    }catch(error){
        res.status(500).json({error: error.message});
    }
};
exports.getAllTests=async(req, res)=>{
    try{
        const connection=await pool.getConnection();
        try{
            const [tests]=await connection.query("SELECT * FROM tests");
            connection.release();
            res.json(tests);
        
    }catch(error){
        connection.release();
        throw error;
    }
}catch(error){
    res.status(500).json({error: error.message});
}
};

exports.getTestById = async (req, res) => {
    try {
      const { id } = req.params;
  
      const connection = await pool.getConnection();
      try {
        const [test] = await connection.query('SELECT * FROM tests WHERE id = ?', [id]);
        connection.release();
        if (!test.length) {
          return res.status(404).json({ error: 'Test not found' });
        }
        res.json(test[0]);
      } catch (error) {
        connection.release();
        throw error;
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
 
  exports.updateTest = async (req, res) => {
    try {
      const { id } = req.params;
      const { title, description } = req.body;
  
      const connection = await pool.getConnection();
      try {
        await connection.query('UPDATE tests SET title = ?, description = ? WHERE id = ?', [title, description, id]);
        connection.release();
        res.json({ id, title, description });
      } catch (error) {
        connection.release();
        throw error;
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  // Function to delete a test by ID
  exports.deleteTest = async (req, res) => {
    try {
      const { id } = req.params;
  
      const connection = await pool.getConnection();
      try {
        await connection.query('DELETE FROM tests WHERE id = ?', [id]);
        connection.release();
        res.json({ message: 'Test deleted successfully' });
      } catch (error) {
        connection.release();
        throw error;
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  