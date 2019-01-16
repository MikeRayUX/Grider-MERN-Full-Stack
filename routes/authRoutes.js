const passport = require("passport");

module.exports = app => {
  // first in request chain
  app.get(
    "/auth/google",
    passport.authenticate("google", {
      // ask google to give us user profile and email address for account creation
      scope: ["profile", "email"]
    })
  );
  // after google authenticates and redirects back
  app.get("/auth/google/callback", passport.authenticate("google"));

  app.get("/api/logout", (req, res) => {
    // passport function
    req.logout();
    res.send(req.user);
  });

  app.get("/api/current_user", (req, res) => {
    res.send(req.user);
  });
};
