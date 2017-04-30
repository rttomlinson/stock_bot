const UsersHelper = {};


UsersHelper.usersPath = () => `/users`;
UsersHelper.userPath = () => `/user`;

UsersHelper.homePath = () => `/user`;

UsersHelper.newUserPath = () => `/user/new`;
UsersHelper.editUserPath = () => `/user/edit`;
UsersHelper.destroyUserPath = () => `/user?_method=delete`;
UsersHelper.updateUserPath = () => `/user?_method=put`;




module.exports = UsersHelper;
