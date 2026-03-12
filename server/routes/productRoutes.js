import express from "express";
import {
    addProduct,
    filterProducts,
    getBestSellers,
    getByCategory,
    getProduct,
    getProducts,
    getTopRated,
    listOfProducts,
    searchProducts,
}
    from "../controllers/productControllers.js";

const router = express.Router();

// Remove the extra '/shoes/' prefix if your frontend isn't using it
// This makes the URL: http://localhost:5000/api/men
// This makes the final URL: /api/shoes/:category
// Remove any extra slashes or 'api' words here

router.get('/shoes/:category', getByCategory);
//Route to get all products
router.get('/', getProducts);

//Route to get a single product by id
router.get('/product/:id', getProduct);

//Route to add a product
router.post("/product", addProduct);


//Route to get top rated products
router.get('/filter/topRated', getTopRated);

//Route to get best sellers
router.get('/filter/bestSellers', getBestSellers)

//Route to search for an item
router.get('/products/search', searchProducts)

//Route to sort products
 //router.get('/products/:category/sortby/:criteria/:order', sortProducts)

//Route to filter products
router.get('/products/filterBy', filterProducts)

//Route to get list of products
router.get('/products/:list', listOfProducts)


export default router;