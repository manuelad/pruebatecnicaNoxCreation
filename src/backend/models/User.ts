import { DataTypes } from "sequelize";
import { sequelize } from "./engine";

export const UserModel = () => {
    const User = sequelize.define('User', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        isRemove: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        first_name: {
            type: DataTypes.STRING
        },
        last_name: {
            type: DataTypes.STRING
        },
        ci: {
            type: DataTypes.STRING
        },
        email: {
            type: DataTypes.STRING
        },
        phone: {
            type: DataTypes.STRING
        },
        username: {
            type: DataTypes.STRING,
            unique: true,
        },
        password_hash: {
            type: DataTypes.STRING,
            allowNull: true
        },
    }, {});

    return User
}

