var loginRouter = require('./login');
var userRouter = require('./user');
var addressRouter = require('./address');
var statesRouter = require('./states');
var corsRouter = require('./cors');

module.exports = (app) => {
  app.use(corsRouter);
  app.use(loginRouter);
  app.use(userRouter);
  app.use(addressRouter);
  app.use(statesRouter);
};
