const router = require("express").Router();

// Controller Imports
const CustomerController = require("./controllers/CustomerController");

// JSON Schema Imports for payload verification
const updateUserPayload = require("./schemas/updateCustomerPayload");


router.post(
  "/",
  CustomerController.createCustomer
);

router.patch(
  "/",
  CustomerController.updateCustomer
);

router.get(
  "/all",
  CustomerController.getAllCustomers
);

router.get(
  "/",
  CustomerController.getAllCustomers
);

router.get(
  "/:id",
  CustomerController.getCustomerById
);

router.get(
  "userId=:userId",
  CustomerController.getCustomerByUserId
);


router.delete(
  "/:userId",
  CustomerController.deleteCustomer
);

module.exports = router;
