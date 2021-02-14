const Product = require('../models/product');






exports.getProducts = (req,res,next)=>{
res.status(200).json({
  success : true,
  message : 'This route'
})
}


exports.newProduct = async(req,res,next)=>{
  const product = await Product.create(req.body);

  res.status(201).json({
    success : true,
    product
  })

}
