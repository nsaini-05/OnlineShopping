const mongoose = require('mongoose');
const User = require('../models/user')


const productSchema = new mongoose.Schema({

  name: {
    type: String,
    required: [true, 'Please enter the product Name'],
    trim: true,
    maxLength: [100, 'Product name cannot exceed 100 characters ']
  },
  price: {
    type: Number,
    required: [true, 'Please enter the product Price'],
    //maxLength : [5 , 'Product name cannot exceed 5 characters ']
    min: 0.0,
    max: [99999, 'Price Cannot exceed 99999'],
  },
  description: {
    type: String,
    required: [true, 'Please enter the product description'],
  },
  ratings: {
    type: Number,
    default: 0
  },
  images: [{
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true
    }
  }],
  category: {
    type: String,
    required: [true, 'Please Select the category for the product'],
    enum: {
      values: ['Electronics','Headphones','Accessories', 'food', 'Cameras',  'Laptops', 'books', 'Clothes/Shoes', 'Beauty/Health', 'sports', 'outdoor', 'Food'],
      message: 'Please select the correct category'
    }
  },
  seller: {
    type: String,
    required: [true, 'Please enter the Product Seller']
  },


  stock: {
    type: Number,
    required: [true, 'Please enter product stock'],
    max: [99999, 'Product stock cannot exceed more than 9999'],
    default: 0
  },

  numOfReviews: {
    type: Number,
    default: 0
  },

  reviews: [{
    name: {
      type: String,
      required: true
    },
    rating: {
      type: Number,
      required: true
    },
    comment: {
      type: String,
      required: true
    },
    user : {
      type : mongoose.Schema.ObjectId,
      ref : 'USER',
      required : true
    }
   
  }],
 

  createdAt: {
    type: Date,
    default: Date.now
  }
  



});



const Product = mongoose.model('product', productSchema)
module.exports = Product
