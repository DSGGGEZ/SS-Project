const Promise = require('bluebird')
const bcrypt = Promise.promisifyAll(require('bcrypt-nodejs'))

function hashPassword(user, options){
    const SALT_FACTOR = 8

    if(!user.changed('password')){
        return
    }
    return bcrypt
        .genSaltAsync(SALT_FACTOR)
        .then(salt => bcrypt.hashAsync(user.password, salt, null))
        .then(hash =>{
            user.setDataValue('password',hash)
        })
}

module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        email: DataTypes.STRING,
        password: DataTypes.STRING,
        name: DataTypes.STRING,
        lastname: DataTypes.STRING,
        status: DataTypes.STRING,
        type: DataTypes.STRING
    }
    ,{
        hooks:{
            beforeCreate: hashPassword,
            beforeUpdate: hashPassword
        }
    }
    )

    User.prototype.comparePassword = function (password) {
        // if (password == this.password) {
        //     return true
        // }
        // return false
        console.log('*** login ***')
        console.log(password)
        console.log(this.password)
        return bcrypt.compareSync(password, this.password)
    }

    User.associate = function (models) { }
    
    return User;
}