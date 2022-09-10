const Project = require('./project');
const User = require('./user');

User.hasMany(Project, {
    foreignKey: 'owner'
});

Project.belongsTo(User, {
    foreignKey: 'owner'
})

module.exports = { Project, User };