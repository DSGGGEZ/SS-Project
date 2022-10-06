module.exports = ( sequelize, DataTypes ) => {
    const Place = sequelize.define('Place', {
        placename: DataTypes.STRING,
        thumbnail: DataTypes.STRING,
        pictures: DataTypes.STRING,
        content: DataTypes.TEXT,
        theme: DataTypes.STRING,
        status: DataTypes.STRING,
    })
    return Place
}