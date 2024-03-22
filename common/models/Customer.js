const { DataTypes } = require("sequelize");

const CustomerModel = {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    validate: {
      notEmpty: true,    
    },
    unique: {
      msg: 'This id is already taken.'
  }
  },
  userId: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,    
      notEmpty: true,    
    },
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: false,
    validate: {
      notEmpty: true,    
    },
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,    
    },
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,    
    },
  },
  address2: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  city: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,    
    },
  },
  state: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,    
      isValidStateAbbreviation(value) {
        const validStateAbbreviations = [
          'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA',
          'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD',
          'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ',
          'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC',
          'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY'
        ];
       
        if (!validStateAbbreviations.includes(value)) {
          throw new Error('Invalid state abbreviation. Must be a 2-letter U.S. state code.');
        }
      },
    },
  },
  zipcode: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,    
    },
  }
};

module.exports = {
  initialise: (sequelize) => {
    this.model = sequelize.define("customer", CustomerModel);
  },

  createCustomer: (customer) => {
    return this.model.create(customer);
  },

  findCustomer: (query) => {
    return this.model.findOne({
      where: query,
    });
  },

  updateCustomer: (query, updatedValue) => {
    return this.model.update(updatedValue, {
      where: query,
    });
  },

  findAllCustomers: (query) => {
    return this.model.findAll({
      where: query
    });
  },

  deleteCustomer: (query) => {
    return this.model.destroy({
      where: query
    });
  }
};
