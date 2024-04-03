const db = require("../models");
const ROLES = db.ROLES;
const User = db.user;

checkDuplicateUsernameOrEmail = (req, res, next) => {
  // Check Username if already exists
  User.findOne({
    username: req.body.username,
  }).exec((err, user) => {
    if (err) {
      res.status(500).json({ message: err });
      return;
    }

    if (user) {
      res.status(400).json({ message: "Failed! Username is already in use." });
      return;
    }

    // Check Email if already exists
    User.findOne({
      email: req.body.email,
    }).exec((err, user) => {
      if (err) {
        res.status(500).json({ message: err });
        return;
      }

      if (user) {
        res
          .status(400)
          .json({ message: "Failed! Username is already in use." });
        return;
      }
      next();
    });
  });
};

// check if Role for the user Existed
checkRoleExisted = (req, res, next) => {
  if (req.body.roles) {
    for (let i = 0; i < req.body.length; i++) {
      if (!ROLES.includes(req.body.roles[i])) {
        res.status(400).json({
          message: `Failed! Role ${req.body.roles[i]} does not exist.`,
        });
        return;
      }
    }
  }
  next();
};

const verifySignUp = {
  checkDuplicateUsernameOrEmail,
  checkRoleExisted,
};

module.exports = verifySignUp;
