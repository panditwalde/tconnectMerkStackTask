

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
const ScretKeyConfig = require("../config/ScretKeyConfig");
const UserService = require("../Service/UserService");
class Usercontroller {

  register = async (req, res) => {

    const responseResult = {}
    const { name, email, password } = req.body;

    try {

      const user = {
        username: name,
        email: email,
        password: bcrypt.hashSync(password, 8)
      };

      let existEmail = await UserService.find({ 'email': email });

      if (existEmail  && existEmail.length > 0) {

        responseResult.message = "Email already exists"
        res.status(200).send(responseResult);
      }
      else {

        let response = await UserService.add(user);

        if (response) {
          responseResult.success = true;
          responseResult.message = "user register Sucessfully ";
          responseResult.data = response;
          res.status(201).send(responseResult)

        }
        else {
          responseResult.success = false;
          responseResult.message = "something went wrong";
          res.status(201).send(responseResult)
        }
      }


    } catch (error) {
      responseResult.success = false;
      responseResult.message = error.message;
      res.status(200).send(responseResult)
    }
  };



  login = async (req, res) => {

    const responseResult = {}

    const { email, password } = req.body;
    try {

      var userInputData = { email: email}
      UserService.find(userInputData).then(async (userData) => {
        if ( userData && userData.length > 0) {

          const validPass = await bcrypt.compare(password, userData[0].password);
          if (validPass) {
            let token = jwt.sign({ id: userData[0]._id }, ScretKeyConfig.secret);
            responseResult.success = true;
            responseResult.message = "login sucssfully";
            responseResult.token = token;
            res.status(200).send(responseResult);

          } else {

            responseResult.success = false;
            responseResult.message = "Invalid email or password";
            res.status(200).send(responseResult);
          }

        } else {
          responseResult.success = false;
          responseResult.message = "Email Id not found";
          res.status(200).send(responseResult);
        }
      })
  
    } catch (error) {
      responseResult.success = false;
      responseResult.message = error.message;
      res.status(200).send(responseResult)

    }


  };


}
module.exports = new Usercontroller();

