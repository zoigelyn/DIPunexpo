var Sequelize = require ('sequelize');
var sequelize = require ('../database/database');
const Estado_Prestamo = require ('./estadoPrestamo');
const Usuarios = require('./usuarios');
const Libros = require('./libros');

const Fichas = sequelize.define('fichas', {
    
    n_solicitud: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement:true
        },
    cota_f: {
        type: Sequelize.STRING,
        allowNull: false
    },
    correo_f: {
        type: Sequelize.STRING,
        allowNull: false,
        Validate: {
            isEmail: true
        }
    },
    fecha_e:{
      type: Sequelize.DATE,
      allowNull: false
      },
    
    fecha_d: {
        type: Sequelize.DATE,
        allowNull: false
        },
     fecha_c :Sequelize.DATE,
    estado_f: {
        type: Sequelize.STRING,
        allowNull: false
        },
    createdAt:{
        type: Sequelize.DATE,
        field: 'created_at'
    },
    updatedAt:{
        type: Sequelize.DATE,
        field: 'updated_at'
    }
    
}, {
        timestamps: true
    });



Estado_Prestamo.hasMany(Fichas, {sourceKey: 'estado_ep', foreignKey: 'estado_f'});
Fichas.belongsTo(Estado_Prestamo, { 
targetKey: 'estado_ep', foreignKey: 'estado_f'});

Usuarios.hasMany(Fichas, {
sourceKey: 'correo_u', foreignKey: 'correo_f'});
Fichas.belongsTo(Usuarios, {
targetKey: 'correo_u', foreignKey: 'correo_f'});

Libros.hasOne(Fichas, {sourceKey: 'cota', foreignKey: 'cota_f'});
Fichas.belongsTo(Libros, {targetKey: 'cota', foreignKey: 'cota_f'});





module.exports = Fichas;
