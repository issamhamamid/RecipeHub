const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const {hashPassword} = require('../Util/passwordHashing');


const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    first_name: {
        type: DataTypes.STRING,
        allowNull: false,

    },
    last_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: {
                args: true,
                msg: 'This username is already in use. Please supply another one.'
            },
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
            args: true,
            msg: 'This email address is already in use. Please supply another one.'
        },
        validate: {
            isEmail: true,
        },
    },
    password: {
        type: DataTypes.STRING(64),
        allowNull: false,
        validate: {
            len : {
                args : [5,30],
                msg : "Password must be at least 5 characters long."
            }
        }
    },
    role: {
        type: DataTypes.ENUM('admin', 'user'),
        allowNull: false,
        defaultValue : 'user',
        validate : {
            isIn : {
                args : [["user" ,'admin']],
                msg: "Invalid role"
            }
        }
    },
    updated_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },
}, {
    tableName: 'users',
    timestamps: false,
},

);


User.beforeCreate(async (user)=>{
    user.password = await  hashPassword(user.password);
})

User.beforeUpdate(async (user) => {
    if (user.changed('password')) {
        user.password = await hashPassword(user.password);
    }
});

module.exports = User;
