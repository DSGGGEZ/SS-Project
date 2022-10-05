module.exports = ( sequelize, DataTypes ) => {
    const Cafe = sequelize.define('Cafe', {
        cafename: DataTypes.STRING,
        thumbnail: DataTypes.STRING,
        pictures: DataTypes.STRING,
        content: DataTypes.TEXT,
        theme: DataTypes.STRING,
        status: DataTypes.STRING,
    })
    return Cafe
}