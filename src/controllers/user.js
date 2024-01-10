"use strict";

const User = require("../models/user");
const Token = require("../models/token");
const passwordEncrypt = require("../helpers/passwordEncrypt");

module.exports = {
  list: async (req, res) => {
    /*
            #swagger.tags = ["Users"]
            #swagger.summary = "List Users"
            
        */

    const filters = req.user?.is_superadmin ? {} : { _id: req.user?._id };

    const data = await User.find(filters);

    res.status(200).send({
      error: false,
      data,
    });
  },

  create: async (req, res) => {
    /*
            #swagger.tags = ["Users"]
            #swagger.summary = "Create User"
            #swagger.parameters['body'] = {
                in: 'body',
                required: true,
                schema: {
                    "username": "test",
                    "password": "1234",
                    "email": "test@site.com",
            
                }
            }
        */

    // Disallow setting admin

    // req.body.is_superadmin = false

    const data = await User.create(req.body);

    // Create token for auto-login:
    const tokenData = await Token.create({
      user_id: data._id,
      token: passwordEncrypt(data._id + Date.now()),
    });

    res.status(201).send({
      error: false,
      token: tokenData.token,
      ...data._doc,
    });
  },

  read: async (req, res) => {
    /*
            #swagger.tags = ["Users"]
            #swagger.summary = "Get Single User"
        */

    // const filters = (req.user?.is_superadmin) ? { _id: req.params.id } : { _id: req.user._id }

    const data = await User.findOne({ _id: req.params.id });

    res.status(200).send({
      error: false,
      data,
    });
  },

  update: async (req, res) => {
    /*
            #swagger.tags = ["Users"]
            #swagger.summary = "Update User"
            #swagger.parameters['body'] = {
                in: 'body',
                required: true,
                schema: {
                    "username": "test",
                    "password": "1234",
                    "email": "test@site.com",
                  
                }
            }
        */

    // const filters = (req.user?.is_superadmin) ? { _id: req.params.id } : { _id: req.user._id }
    req.body.is_superadmin = req.user?.is_superadmin
      ? req.body.is_superadmin
      : false;

    if (req.body.key) {
      const user = await User.findOne({ _id: req.params.id });

      if (req.body.key == "people") {
        const filteredPeople = user.people.filter(
          (item) => item.name == req.body.character.name
        );

        if (filteredPeople.length) {
          throw new Error("The people already in your favorites");
        } else {
          user.people.push(req.body.character);
          const data = await User.updateOne(
            { _id: req.params.id },
            { people: user.people },
            { runValidators: true }
          );
          res.status(202).send({
            error: false,
            data,
            new: await User.findOne({ _id: req.params.id }),
          });
        }
      } else if (req.body.key == "planets") {

       
        const filteredPlanets = user.planets.filter(
          (item) => item.name == req.body.planet.name
        );

        if (filteredPlanets.length) {
          throw new Error("The planet already in your favorites");
        } else {

          console.log(req.body.planet);
          user.planets.push(req.body.planet);
          const data = await User.updateOne(
            { _id: req.params.id },
            { planets: user.planets },
            { runValidators: true }
          );
          res.status(202).send({
            error: false,
            data,
            new: await User.findOne({ _id: req.params.id }),
          });
        }
      }
    } else {
      const data = await User.updateOne(filters, req.body, {
        runValidators: true,
      });

      res.status(202).send({
        error: false,
        data,
        new: await User.findOne(),
      });
    }
  },

  delete: async (req, res) => {
    /*
            #swagger.tags = ["Users"]
            #swagger.summary = "Delete User"
        */

    const filters = req.user?.is_superadmin
      ? { _id: req.params.id }
      : { _id: req.user._id };

    const data = await User.deleteOne(filters);

    res.status(data.deletedCount ? 204 : 404).send({
      error: !data.deletedCount,
      data,
    });
  },
};
