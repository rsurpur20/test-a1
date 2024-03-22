const CustomerModel = require("./../../common/models/Customer");

module.exports = {
  createCustomer: (req, res) => {
    const { body } = req;

    CustomerModel.createCustomer(body)
      .then((customer) => {
        return res.status(201).json({
          status: true,
          data: customer.toJSON(),
          testing: "createCustomer",
        });
      })
      .catch((err) => {
        // if (err.name === 'SequelizeUniqueConstraintError') {
        //   // Handle the unique constraint violation
        //   return res.status(422).json({
        //     status: false,
        //     error: {
        //       message: 'This user ID already exists in the system.',
        //     },
        //   });
        // } else {
          // Handle other errors
          return res.status(400).json({
            status: false,
            error: err,
          });
        // }
      });
  },

  getCustomer: (req, res) => {
    const {
      customer: { userId },
    } = req;

    CustomerModel.findCustomer({ userId: userId })
      .then((customer) => {
        return res.status(200).json({
          status: true,
          data: customer.toJSON(),
          testing: "getCustomer"
        });
      })
      .catch((err) => {
        return res.status(500).json({
          status: false,
          error: err,
        });
      });
  },

  getCustomerById: (req, res) => {
    const {
      params: { id },
    } = req;

    CustomerModel.findCustomer({ id: id })
      .then((customer) => {
        if (!customer) {
          // Customer not found, return 404 status
          return res.status(404).json({
            status: false,
            error: {
              message: "Customer with the given id not found.",
            },
          });
        }
        return res.status(200).json({
          status: true,
          data: customer.toJSON(),
          testing: "getCustomerById"
        });
      })
      .catch((err) => {
        return res.status(400).json({
          status: false,
          error: err,
        });
      });
  },

  getCustomerByUserId: (req, res) => {
    const {
      params: { userId },
    } = req;

    CustomerModel.findCustomer({ userId: userId })
      .then((customer) => {
        if (!customer || Object.keys(customer).length === 0) {
          // Customer not found, return 404 status
          return res.status(404).json({
            status: false,
            error: {
              message: "Customer with the given userId not found.",
            },
          });
        }
        return res.status(200).json({
          status: true,
          testing: "getCustomerByUserId",
          // data: customer.toJSON(),
        });
      })
      .catch((err) => {
        return res.status(400).json({
          status: false,
          error: err,
        });
      });
  },
  
  updateCustomer: (req, res) => {
    const {
      customer: { userId },
      body: payload,
    } = req;

    // IF the payload does not have any keys,
    // THEN we can return an error, as nothing can be updated
    if (!Object.keys(payload).length) {
      return res.status(400).json({
        status: false,
        error: {
          message: "Body is empty, hence can not update the user.",
        },
      });
    }

    CustomerModel.updateCustomer({ userId: userId }, payload)
      .then(() => {
        return CustomerModel.findCustomer({ userId: userId });
      })
      .then((customer) => {
        return res.status(200).json({
          status: true,
          testing: "updateCustomer",
          data: customer.toJSON(),
        });
      })
      .catch((err) => {
        return res.status(500).json({
          status: false,
          error: err,
        });
      });
  },

  deleteCustomer: (req, res) => {
    const {
      params: { userId },
    } = req;

    CustomerModel.deleteCustomer({ userId: userId })
      .then((numberOfEntriesDeleted) => {
        return res.status(200).json({
          status: true,
          data: {
            numberOfUsersDeleted: numberOfEntriesDeleted
          },
        });
      })
      .catch((err) => {
        return res.status(500).json({
          status: false,
          error: err,
        });
      });
  },

  getAllCustomers: (req, res) => {
    userId = req.query.userId
    CustomerModel.findCustomer({ userId: userId })
      .then((customer) => {
        if (!customer) {
          // Customer not found, return 404 status
          return res.status(404).json({
            status: false,
            error: {
              message: "Customer with the given userId not found.",
            },
          });
        }
        return res.status(200).json({
          status: true,
          testing: "getCustomerByUserId",
          data: customer.toJSON(),
        });
      }
      )

    CustomerModel.findAllCustomers(req.query)
      .then((customers) => {
        return res.status(200).json({
          status: true,
          data: customers,

        });
      })
      .catch((err) => {
        return res.status(500).json({
          status: false,
          error: err,

        });
      });
  },

};
