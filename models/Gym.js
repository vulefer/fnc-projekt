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

    //GetAllGyms vraca array objekata tipa {gym_id, name}
    static async getAllGyms() {
        const connection = await pool.getConnection();
        try {
            const [rows] = await connection.execute(
                'SELECT gym_id, name FROM gym'
            );

            return rows;

        } catch (error) {
            console.error('Error fetching gyms:', error);
            throw new Error('Database Error');
        } finally {
            connection.release();
        }
    }


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