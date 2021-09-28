const express = require('express');
// const app = express(); //we can't use this statement here becaute this will create a new app.
// So we will call a method of express, this method allows us to create different routes in seperate file.
var router = express.Router();

const servies = require('../services/render');
const controller = require('../controller/controller');

/**
 *  @description Root Route
 *  @method GET /
 */
router.get('/', servies.homeRoutes);

/**
 *  @description for add user
 *  @method GET /add-user
 */
router.get('/add-user', servies.add_user);

/**
 *  @description for update user
 *  @method GET /update-user
 */
router.get('/update-user', servies.update_user);

//API 
router.post('/api/users', controller.create);
router.get('/api/users', controller.find);
router.put('/api/users/:id', controller.update);
router.delete('/api/users/:id', controller.delete);

module.exports = router;