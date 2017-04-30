const SessionsHelper = {};



SessionsHelper.loginPath = () => '/login';
SessionsHelper.newSessionPath = () => '/sessions/new';

SessionsHelper.logoutPath = () => '/logout?_method=delete';




module.exports = SessionsHelper;
