const UserController = require("../controllers/qr.controller");
const { authenticate } = require("../config/jwt.config");

module.exports = app => {
  app.get("/api/users/", UserController.findAllUsers);                        
  app.get("/api/users/:id", UserController.findOneSingleUser);
  app.put("/api/users/update/:id", UserController.updateExistingUser);
  app.post("/api/users/new", UserController.createNewUser);                   
  app.delete("/api/users/delete/:id", UserController.deleteAnExistingUser);
  app.post("/api/users/stores/", UserController.findStores); 

  app.post('/api/user/register', UserController.register);
  app.post('/api/user/login', UserController.login);
  app.post('/api/user/logout', UserController.logout);  
  app.put('/api/user/changepassword/:id', UserController.changepassword);  

  app.get('/api/qr/:id', UserController.findOneQR);

  };




  