const { Model, DataTypes } = require('sequelize')

const { sequelize } = require('../util/db')

class ReadingTables extends Model { }

ReadingTables.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'users', key: 'id' },
    },
    blogId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'blogs', key: 'id' },
    },
    isRead: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    }
}, {
    sequelize,
    underscored: true,
    timestamps: false,
    modelName: 'reading_tables'
})

module.exports = ReadingTables