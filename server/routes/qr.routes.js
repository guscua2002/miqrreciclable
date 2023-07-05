const UserController = require("../controllers/qr.controller");
const { authenticate } = require("../config/jwt.config");

module.exports = app => {
  app.get("/api/users/", authenticate,UserController.findAllUsers);                        
  app.get("/api/users/:id", authenticate,UserController.findOneSingleUser);
  app.put("/api/users/update/:id", authenticate,UserController.updateExistingUser);
  app.post("/api/users/new", authenticate,UserController.createNewUser);                   
  app.delete("/api/users/delete/:id", authenticate,UserController.deleteAnExistingUser);
  

  app.post('/api/user/register', UserController.register);
  app.post('/api/user/login', UserController.login);
  app.post('/api/user/logout', authenticate,UserController.logout);  
  app.put('/api/user/changepassword/:id', authenticate,UserController.changepassword);  

  app.get('/api/qr/:id', UserController.findOneQR);
  app.put("/api/qr/update/:id", authenticate,UserController.updateExistingQR);
  app.put("/api/qr/delete/:id", authenticate,UserController.deleteAnExistingUserQR);  
 
 };




  