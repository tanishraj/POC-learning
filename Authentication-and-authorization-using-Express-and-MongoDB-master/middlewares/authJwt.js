const jwt = require("jsonwebtoken");
const authConfig = require("../config/auth.config");
const db = require("../models");
const User = db.user;
const Role = db.role;

verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];
  if (!token) {
    res.status(403).json({ message: "No token provided." });
    return;
  }
  jwt.verify(token, authConfig.SECRET, (err, decoded) => {
    if (err) {
      res.status(401).json({ message: `Unauthorized! ${err}` });
      return;
    }
    req.userId = decoded.id;
    next();
  });
};

isAdmin = (req, res, next) => {
  User.findById(req.userId).exec((err, user) => {
    if (err) {
      res.status(500).json({ message: err });
      return;
    }
    Role.find({ _id: { $in: user.roles } }, (err, roles) => {
      if (err) {
        res.status(500).json({ message: err });
        return;
      }

      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "admin") {
          next();
          return;
        }
      }

      res.status(403).json({ message: "Admin role required!" });
      return;
    });
  });
};

isModerator = (req, res, next) => {
  User.findById(req.userId).exec((err, user) => {
    if (err) {
      res.status(500).json({ message: err });
      return;
    }
    Role.find({ _id: { $in: user.roles } }, (err, roles) => {
      if (err) {
        res.status(500).json({ message: err });
        return;
      }

      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "moderator") {
          next();
          return;
        }
      }

      res.status(403).json({ message: "Moderator role required!" });
      return;
    });
  });
};

const authJwt = {
  verifyToken,
  isAdmin,
  isModerator,
};

module.exports = authJwt;
