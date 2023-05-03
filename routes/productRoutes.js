import express from "express";
import { isAdmin, requireSignIn } from "./../middlewares/authMiddleware.js";
import { braintreePaymentController, braintreeTokenController, createProductController, deleteProductController, getProductController, getSingleProductController, productCategoryController, productCountController, productFiltersController, productListController, productPhotoController, relatedProductController, searchProductController, updateProductController } from "../controllers/productController.js";
import formidable from "express-formidable";

const router = express.Router();

// routes

router.post(
  "/create-product",
  requireSignIn,
  isAdmin,
  formidable(),
  createProductController
);
// update- product
router.put(
  "/update-product/:pid",
  requireSignIn,
  isAdmin,
  formidable(),
  updateProductController
);

// get controller

router.get('/get-product', getProductController)

//  get singleProduct route

router.get("/get-product/:slug",getSingleProductController)

// get photo
router.get('/product-photo/:pid',productPhotoController)

// delete product
router.delete('/delete-product/:pid',deleteProductController)

// filter product 
router.post('/product-filters', productFiltersController)

// Product- count

router.get('/product-count', productCountController)

// product-per-page 
router.get('/product-list/:page', productListController)


//  search Products

router.get('/search/:keyword', searchProductController)

// Similar Products

router.get('/related-product/:pid/:cid',relatedProductController)

// category wise-product

router.get('/product-category/:slug',productCategoryController)

// payment Gate wayy
// Token

router.get('/braintree/token', braintreeTokenController)

// Payments

router.post('/braintree/payment',requireSignIn,braintreePaymentController)

export default router;
