const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: false
  },
  email: {
    type: String,
    required: false
  },
  password: {
    type: String,
    required: false
  }
}

);

const user = mongoose.model('users', userSchema);
class UserModel {
  add(data, callback) {
    let userData = new user(data);

    return new Promise((resolve, reject) => {
      userData.save().then((result) => {
        resolve(result);
      }).catch((err) => {
        reject(err);
      })
    })
  }



  find(data) {


    return new Promise((resolve, reject) => {
      user.find(data)
        .then((result) => {
          resolve(result);
        }).catch((err) => {
          reject(err);
        })
    })

  }


  findOne(data, callback) {
    return new Promise((resolve, reject) => {
      user.findOne(data).then((result) => {
        resolve(result);
      }).catch((err) => {
        reject(err);
      })
    })
  }


}

module.exports = new UserModel();
