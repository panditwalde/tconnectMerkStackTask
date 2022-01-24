
const userModel = require('../models/userModel');

class UserService {


    add(data) {



        return userModel.add(data)
            .then((result) => {
                return result
            })
            .catch((error) => {
                return error
            })
    }

    find(data,) {


        return userModel.find(data)
            .then((result) => {
                //console.log(result); return;
                return result
            })
            .catch((error) => {
                return error
            })
    }


    findOne(data,) {
        //console.log(data); return;
        return userModel.findOne(data,)
            .then((result) => {
                //console.log(result); return;
                return result
            })
            .catch((error) => {
                return error
            })
    }



}

module.exports = new UserService();

