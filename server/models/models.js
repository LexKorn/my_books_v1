const sequelize = require('../db');
const {DataTypes} = require('sequelize');

const User = sequelize.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    username: {type: DataTypes.STRING, unique: true},
    password: {type: DataTypes.STRING}
});

const Book = sequelize.define('book', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, allowNull: false},
    link: {type: DataTypes.STRING, allowNull: true},
    rating: {type: DataTypes.INTEGER, defaultValue: 0},
    comment: {type: DataTypes.STRING, allowNull: true},
    cover: {type: DataTypes.STRING, allowNull: false}
});

const Author = sequelize.define('author', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
    description: {type: DataTypes.STRING, allowNull: false},
    photo: {type: DataTypes.STRING, allowNull: false}
});

const Country = sequelize.define('country', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false}
});

const Note = sequelize.define('note', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false}
});


User.hasMany(Book);
Book.belongsTo(User);

User.hasMany(Note);
Note.belongsTo(User);

User.hasMany(Country);
Country.belongsTo(User);

User.hasMany(Author);
Author.belongsTo(User);

Author.hasMany(Book);
Book.belongsTo(Author);

Country.hasMany(Author);
Author.belongsTo(Country);

Country.hasMany(Book);
Book.belongsTo(Country);


module.exports = {
    User, 
    Book,
    Author,
    Country,
    Note
};