import Sequelize from 'sequelize';


const db = new Sequelize(process.env.DATABASE_URL,{
    dialect: 'postgress',
    protocol: 'postgress',
    options:{
        ssl:{
            required:true,
            rejectUnauthorized:false
        }
    }
});
export default db;