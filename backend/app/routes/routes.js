// const { authJwt } = require("../middlewares");
const controller = require("../controllers/Usercontroller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post("/register", controller.register);

  app.post("/login",  controller.login);

 
};
