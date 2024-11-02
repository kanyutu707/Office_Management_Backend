const pool=require('../config/db');

exports.createFinances=async(req, res)=>{
    try{
        const {description, source, type, amount, company_id}=req.body;
        const connection=await pool.getConnection();
        try{
            await connection.query("INSERT INTO financials (description, source, type, amount, company_id) VALUES (?, ?, ?, ?,?)", [description, source, type,amount, company_id]);
            connection.release();
            res.status(201).json({description, source, type, amount, company_id});

        }catch(error){
            connection.release();
            throw error;
        }
    }
    catch(error){
        res.status(500).json({error: error.message});
    }
};

exports.getAllFinances=async(req, res)=>{
    try{
        const connection=await pool.getConnection();
        try{
            const [finances]=await connection.query("SELECT * FROM financials");
            connection.release();
            res.json(finances);
        }catch(error){
            connection.release();
            throw error;
        }
    }catch(error){
        res.status(500).json({error:error.message});
    }
};

exports.getFinancesById = async (req, res) => {
    try {
      const { id } = req.params;
  
      const connection = await pool.getConnection();
      try {
        const [test] = await connection.query('SELECT * FROM financials WHERE id = ?', [id]);
        connection.release();
        if (!test.length) {
          return res.status(404).json({ error: 'Finances not found' });
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
 
  exports.updateFinances = async (req, res) => {
    try {
      const { id } = req.params;
      const {description, source, type, amount,company_id}= req.body;
  
      const connection = await pool.getConnection();
      try {
        await connection.query('UPDATE financials SET description = ?, source = ?, type=?, amount=?, company_id=? WHERE id = ?', [description, source, type, amount, company_id, id]);
        connection.release();
        res.json({id, description, source, type, amount, company_id});
      } catch (error) {
        connection.release();
        throw error;
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  

  exports.deleteFinance = async (req, res) => {
    try {
      const { id } = req.params;
  
      const connection = await pool.getConnection();
      try {
        await connection.query('DELETE FROM financials WHERE id = ?', [id]);
        connection.release();
        res.json({ message: 'Finances deleted successfully' });
      } catch (error) {
        connection.release();
        throw error;
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };