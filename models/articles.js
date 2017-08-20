const Sequelize = require('sequelize');
const sequelize = require('../db');

const Article = sequelize.define('article', {
    title: { type: Sequelize.STRING, allowNull: false},
    author: { type: Sequelize.STRING, allowNull: true},
    image: Sequelize.STRING,
    description: Sequelize.STRING,
    body: Sequelize.STRING,
    uploaded: Sequelize.BOOLEAN,
    featured: { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: false},
    showinmenu: { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: false},
    published: { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: false},
}, {
  timestamps: false,
});

Article.sync();

module.exports  = Article;