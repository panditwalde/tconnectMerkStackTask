

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

      let existEmail = await UserService.find({ 'email': email, 'isVerified': true });


      if (existEmail != undefined && existEmail.length > 0) {
        responseResult.message = "Email already exists"
        console.log("Email already exist:" + email);

        res.status(409).send(responseResult);
      }
      else {

        let res = await UserService.add(user);
        if (res) {

          responseResult.success = true;
          responseResult.message = "user register Sucessfully ";
          responseResult.data = user;
          res.status(200).send(responseResult)

        }
        else {
          responseResult.success = false;
          responseResult.message = "something went wrong";
          res.status(200).send(responseResult)
        }
      }


    } catch (error) {
      responseResult.success = false;
      responseResult.message = error;
      res.status(500).send(responseResult)

    }




  };

  login = async (req, res) => {

    const responseResult = {}

    const { email, password } = req.body;
    try {

      var userInputData = {
        email: email.toLowerCase(),
      }
      UserService.find(userInputData).then(async (userData) => {
        console.log("User Data=====>" + JSON.stringify(userData));
        if (typeof userData != undefined && userData.length > 0) {

          const validPass = await bcrypt.compare(req.body.password, password);
          if (validPass) {
            let token = jwt.sign({ id: userData._id }, ScretKeyConfig.secret);

            return res.header('Authorization', "Bearer " + token).status(200).send(token);

          } else {
            return res.status(400).send({ 'error': 'Invalid email or password' });
          }

        } else {
          res.status(404).send({ 'error': 'Email Id not found' });
        }



      })












      responseResult.success = false;
      responseResult.message = "Please enter proper inputs";
      responseResult.data = token;
      res.status(200).send(responseResult)

    } catch (error) {
      responseResult.success = false;
      responseResult.message = error;
      res.status(500).send(responseResult)

    }


  };


}
module.exports = new Usercontroller();

