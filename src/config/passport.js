const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

/* Passport Middleware */
passport.use(
    new GoogleStrategy(
        {
            clientID: '1037952582731-rcsjulinabkd73i5b2isn6es0gj8t1dp.apps.googleusercontent.com',  // Client ID
            clientSecret: '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',  // Client secret
            callbackURL: "/conexao/auth/google/callback",
            scope: ["profile", "email", "openid", "https://www.googleapis.com/auth/calendar", "https://www.googleapis.com/auth/gmail.send"],
            accessType: 'offline',
            prompt: 'consent',
            session: false
        },
        async (accessToken, refreshToken, profile, done) => {
            // console.log('✅ Perfil do Google recebido!');
            // console.log('👤 Nome:', profile.displayName);

            // if (refreshToken) {
            //     console.log('🔄 Guarde este Refresh Token em seu banco de dados:', refreshToken);
            // }

            return done(null, { profile, accessToken, refreshToken });
        }
    )
);

/* Exporting Passport Configuration */
module.exports = passport;
