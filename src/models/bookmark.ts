import { DataTypes, InferAttributes, InferCreationAttributes, Model, Sequelize } from "sequelize";

export class Bookmark extends Model<InferAttributes<Bookmark>, InferCreationAttributes<Bookmark>>{
    declare bookmarkId: number;
    declare title: string;
    declare url: string;
    declare createdAt?: Date;
    declare updatedAt?: Date;
}

export function BookmarkFactory(sequelize: Sequelize) {
    Bookmark.init({
        bookmarkId: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        url: {
            type: DataTypes.STRING,
            allowNull: false
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        }
    }, {
        freezeTableName: true,
        tableName: 'bookmarks',
        sequelize
    });
}