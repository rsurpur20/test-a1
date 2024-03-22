const { DataTypes } = require("sequelize");

const BookModel = {
  isbn: {
    type: DataTypes.STRING,
    validate: {
      notEmpty: true, 
    },
    primaryKey: true,
    allowNull: false,
    unique: {
      msg: 'This ISBN already exists in the system.'
  },
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true, 
    } 
  },
  author: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true, 
    }  
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true, 
    } 
  },
  genre: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true, 
    }   
  },
  price: {
    type: DataTypes.DECIMAL(10,2),
    allowNull: false,
    validate: {
      notEmpty: true, 
      isDecimal: true,
      hasTwoDecimalPlaces(value) {
        const regex = /^[0-9]*\.[0-9]{2}$/;
        if (!regex.test(value)) {
          throw new Error('Price must have exactly two decimal places.');
        }
      },
    },
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      notEmpty: true, 
    } 
  },
};

module.exports = {
  initialise: (sequelize) => {
    this.model = sequelize.define("book", BookModel)
  },

  createBook: (book) => {
    return this.model.create(book);
  },

  findBook: (query) => {
    return this.model.findOne({
      where: query,
    });
  },

  updateBook: (query, updatedValue) => {
    return this.model.update(updatedValue, {
      where: query,
    });
  },

  findAllBooks: (query) => {
    return this.model.findAll({
      where: query
    });
  },

  deleteBook: (query) => {
    return this.model.destroy({
      where: query
    });
  }
}
