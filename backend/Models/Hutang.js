const { DataTypes } = require("sequelize")
const db = require("../Database/config");

const Hutang = db.define("hutang", {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    nama:DataTypes.STRING,
    uang:DataTypes.INTEGER,
}, { freezeTableName: true });

module.exports = Hutang;
