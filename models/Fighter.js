const { pool } = require('../config/database');

class Fighter{
    static async createFighter(fighterData){
        const { firstname, lastname, date_of_birth, nationality, gender, age_category, weight, gym_id } = fighterData;
        const score = "0-0-0"; //default score
        const connection = await pool.getConnection();
        try{ 
            const [result] = await connection.execute(
                'INSERT INTO fighter (firstname, lastname, date_of_birth, nationality, gender, age_category, weight, score, gym_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
                [firstname, lastname, date_of_birth, nationality, gender, age_category, weight, score, gym_id]
            )
        } catch (error) {
            console.error('Error creating fighter:', error);
        } finally {
            connection.release();
        }
    }

    //Ispis svih fightera -- TEST
    //Vraca objekt sa svim atributima fightera
    static async getAllFighters() {
        const connection = await pool.getConnection();
        try {
            const [rows] = await connection.execute(
                'SELECT * FROM fighter'
            );

            return rows;
            
        } catch (error) {
            console.error('Error fetching gyms:', error);
            throw new Error('Database Error');
        } finally {
            connection.release();
        }
    }
}


module.exports = Fighter; 