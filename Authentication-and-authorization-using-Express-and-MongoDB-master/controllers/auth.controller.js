const config = require("../config/auth.config");
const db = require("../models");
const User = db.user;
const Role = db.role;

const jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = (req, res) => {
  const user = new User({
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
  });

  user.save((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    if (req.body.roles) {
      Role.find({ name: { $in: req.body.roles } }, (err, roles) => {
        if (err) {
          res.status(500).json({ message: err });
          return;
        }

        user.roles = roles.map((role) => role._id);
        user.save((err) => {
          if (err) {
            res.status(500).json({ message: err });
            return;
          }
          res
            .status(200)
            .json({ message: "User was registered successfully!" });
        });
      });
    } else {
      Role.findOne({ name: "user" }, (err, role) => {
        if (err) {
          res.status(500).json({ message: err });
          return;
        }
        user.roles = [roles._id];
        user.save((err) => {
          if (err) {
            res.status(500).json({ message: err });
            return;
          }
          res
            .status(500)
            .json({ message: "User was registered successfully!" });
        });
      });
    }
  });
};

exports.signin = (req, res) => {
  User.findOne({
    username: req.body.username,
  })
    .populate("roles", "-__v")
    .exec((err, user) => {
      if (err) {
        res.status(500).json({ message: err });
        return;
      }

      if (!user) {
        res.status(404).json({ message: "User not found!" });
        return;
      }

      let passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        res
          .status(401)
          .json({ accessToken: null, message: "Invalid Password." });
        return;
      }

      let token = jwt.sign({ id: user.id }, config.SECRET, {
        expiresIn: 86400,
      });

      let authorities = [];
      for (let i = 0; i < user.roles.length; i++) {
        authorities.push("ROLE_" + user.roles[i].name.toUpperCase());
      }

      res.status(200).json({
        id: user._id,
        username: user.username,
        email: user.email,
        roles: authorities,
        accessToken: token,
      });
    });
};
