const express = require("express");
const User = require("../models/user.js");
const multer = require("multer");
const router = new express.Router();
const auth = require("../middleware/auth.js");

router.get("/test", (req, res) => {
  res.send("this from user file of router");
});

router.post("/users", async (req, res) => {
  const user = new User(req.body);
  try {
    await user.save();
    const token = user.generateAuthToken();
    res.status(200).send({ user, token });
  } catch (e) {
    res.status(400).send(e);
  }
});
router.post("/users/login", async (req, res) => {
  try {
    const user = await User.findByCredentials(
      req.body.Email,
      req.body.password
    );
    const token = await user.generateAuthToken();
    // res.send({ user:user.getPublicProfile(), token });
    res.send({ user, token });
  } catch (e) {
    res.status(400).send();
  }
});
router.post("/users/logout", auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token !== req.token;
    });
    await req.user.save();

    res.send();
  } catch (e) {
    res.status(500).send();
  }
});
router.post("/users/logoutall", auth, async (req, res) => {
  try {
    req.user.tokens = [];
    await req.user.save();

    res.send();
  } catch (e) {
    res.status(500).send();
  }
});
router.get("/users/me", auth, async (req, res) => {
  res.send(req.user);
});

router.patch("/users/me", auth, async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["name", "Email", "age", "password"];
  const isValidOperation = updates.every((update) => {
    return allowedUpdates.includes(update);
  });
  if (!isValidOperation) {
    return res.status(404).send({ error: "Invalid Field" });
  }
  try {
    // const user = await User.findById(req.params.id);

    updates.forEach((update) => {
      req.user[update] = req.body[update];
    });
    await req.user.save();
    // const user = await User.findByIdAndUpdate(req.params.id, req.body, {
    //   new: true,
    //   runValidators: true,
    // });
    // if (!user) {
    //   res.status(500).send("Error:- User not present");
    // }
    res.status(200).send(req.user);
  } catch (e) {
    res.status(400).send(e);
  }
});
router.delete("/users/me", auth, async (req, res) => {
  try {
    await req.user.remove();
    res.send(req.user);
  } catch (e) {
    res.status(500).send(e);
  }
});

const upload = multer({
  dest: "avatars",
  limits: {
    fileSize: 1000000,
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return cb(new Error("file must be image"));
    }
    cb(undefined, true);
  },
});
router.post(
  "/users/me/avatar",
  upload.single("avatar"),
  (req, res) => {
    res.send();
  },
  (error, req, res, next) => {
    res.status(400).send({ error: error.message });
  }
);
module.exports = router;
