import Sequelize from 'sequelize';


const db = new Sequelize({
    dialect: 'sqlite',
    storage: 'database.db',
    logging: false
});
export default db;