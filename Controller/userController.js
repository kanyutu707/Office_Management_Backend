const jwt = require('jsonwebtoken');
const pool = require('../config/db'); 
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await authenticateUser(email, password);

        if (user.error) {
            return res.status(401).json({ error: user.error });
        }

        const accessToken = jwt.sign({ user: user }, process.env.ACCESS_TOKEN_SECRET);

        res.json({ accessToken });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

async function authenticateUser(email, password) {
    try {
        const userResult = await pool.query('SELECT * FROM users WHERE email = ?', [email]);

        // Extract user data from the first element of the userResult array
        const user = userResult[0];

        if (!user || user.length === 0) {
            return { error: "User email does not exist" }; // User with the given email does not exist
        }

        const userData = user[0]; // Accessing the first user object

        const hashedPassword = userData.password;

        // Compare the provided password with the hashed password in the database
        const passwordMatch = await bcrypt.compare(password, hashedPassword);

        if (passwordMatch) {
            return userData; // Passwords match, return the user data
        } else {
            return { error: "Password does not match" };
        }
    } catch (error) {
        throw new Error('Error authenticating user: ' + error.message);
    }
}


exports.createUser = async (req, res) => {
    try {
        const { image, firstName, lastName, email, position, status, password, company_id } = req.body;

        const hashedPassword = await bcrypt.hash(password, 10); // Hash password with bcrypt

        const connection = await pool.getConnection();
        try {
            const employeeNumber = uuidv4();

            await connection.query("INSERT INTO users (employeeNumber, image, firstName, lastName, email, position, status, password, company_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)", [employeeNumber, image, firstName, lastName, email, position, status, hashedPassword, company_id]);
            connection.release();
            res.status(201).json({ employeeNumber, image, firstName, lastName, email, position, status});
        } catch (error) {
            connection.release();
            throw error;
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getAllUsers=async(req, res)=>{
    try{
        const connection=await pool.getConnection();
        try{
            const[users]=await connection.query("SELECT * FROM users");
            connection.release();
            res.json(users);
        }catch(error){
            connection.release()
            throw error;
        }
    }
    catch(error){
        res.status(500).json({error: error.message});
    }
}

exports.getUserById=async(req, res)=>{
    const connection=await pool.getConnection();
    try{
        const{id}=req.params;
        const[user]=await connection.query("SELECT * FROM users WHERE id=?", [id]);
        connection.release();
        if(!user.length){
            return res.status(404).json({error: "User not found"});
        }
        res.json(user[0]);
    }
    catch(error){
        res.status(500).json({error: error.message});
        console.log(error)
    }
}
