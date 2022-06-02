var passport = require('passport');
var GitHubStrategy = require('passport-github2').Strategy;
var mongoose = require('mongoose');

module.exports = function() {
    var Usuario = mongoose.model('Usuario');

    passport.use(new GitHubStrategy({
        clientID: 'Iv1.958982a3c02292ca',
        clientSecret: '53d8e22d2c806be9eb8d47b7b43f8c3ea7657369',
        callbackURL: 'https://dswa5-11-ac-pt3009718.herokuapp.com/auth/github/callback'
    }, function(accessToken, refreshToken, profile, done) {
        Usuario.findOrCreate(
            { "login" : profile.username},
            { "nome" : profile.username},
            function(erro, usuario) {
            if(erro){
                console.log(erro);
                return done(erro);
            }
            return done(null, usuario);
            }
        );
    }));
    passport.serializeUser(function(usuario, done) {
        done(null, usuario._id);
    });
    passport.deserializeUser(function(id, done) {
        Usuario.findById(id).exec()
        .then(function(usuario) {
        done(null, usuario);
        });
    });
};


