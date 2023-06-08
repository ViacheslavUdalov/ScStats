const tournamentApiRoutes = require('./api-tournament-routes');
const PlayersRoutes = require('./api-players-routes');
const UserRoutes = require('./user-router');
const uploadRouter = require('./upload');
module.exports = {
    tournamentApiRoutes,
    PlayersRoutes,
    UserRoutes,
    uploadRouter
}