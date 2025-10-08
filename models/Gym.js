const { pool } = require('../config/database');

class Gym{

    static async saveGym(gymData){
        if(gymData.gym_contact == "") gymData.gym_contact = null;

        const connection = await pool.getConnection();
        try {
            const [result] = await connection.execute(
                'INSERT INTO gym (name, contact) VALUES (?, ?)',
                [gymData.gym_name, gymData.gym_contact]
            );
        } catch (error) {
            console.error('Error adding gym:', error);
            throw new Error('Database Error');
        } finally {
            connection.release();
        }
    };


    //static async getAllGyms() {};

    static async deleteGym(gymId){
        const connection = await pool.getConnection();
        try {
            const [result] = await connection.execute(
                'DELETE FROM gym WHERE id = ?',
                [gymId]
            );
        } catch (error) {
            console.error('Error deleting gym:', error);
            throw new Error('Database Error');
        } finally {
            connection.release();
        }
    };
    
}

module.exports = Gym;