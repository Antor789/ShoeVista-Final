import Products from "../models/productModel.js";

// Get all products 
export const getProducts = async (req, res) => {
    try {
        const products = await Products.find();
        // Fixed: Ensure we always return an array
        res.status(200).json(products || []);
    } catch (error) {
        console.error(`Error while fetching products: ${error.message}`);
        res.status(500).json([]); // Return empty array to prevent frontend .sort() error
    }
}

// Get single product by id
export const getProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Products.findById(id);
        if (!product) {
            return res.status(404).json({ message: "Product doesn't exist." })
        }
        res.status(200).json(product);
    } catch (error) {
        console.error(`Error while fetching product: ${error.message}`);
        res.status(500).json({ message: error.message });
    }
}

// Add a product
export const addProduct = async (req, res) => {
    try {
        const { img, brand, title, rating, reviews, sellPrice, orders, mrp, discount } = req.body;
        const newProduct = await Products.create({ img, brand, title, rating, reviews, sellPrice, orders, mrp, discount });
        return res.status(201).json({ message: "Product created successfully", product: newProduct });
    } catch (error) {
        console.error(`Error while adding product: ${error.message}`);
        res.status(500).json({ message: error.message });
    }
}
export const getByCategory = async (req, res) => {
    try {
        const { category } = req.params;
        
        // This regex ('i' flag) makes "men", "Men", and "MEN" all match.
        const products = await Products.find({ 
            category: { $regex: new RegExp(`^${category.trim()}$`, "i") } 
        });

        console.log(`--- Terminal Debug ---`);
        console.log(`Frontend asked for: ${category}`);
        console.log(`Database matched: ${products.length} items`);

        res.status(200).json(products);
    } catch (error) {
        console.error("Fetch Error:", error.message);
        res.status(500).json([]);
    }
};

// Get top rated 
export const getTopRated = async (req, res) => {
    try {
        const topRatedShoes = await Products.find()
            .sort({ rating: -1 })
            .limit(12);
        return res.status(200).json(topRatedShoes || []);
    } catch (err) {
        console.error('Error fetching top-rated shoes:', err);
        res.status(500).json([]);
    }
}

// Get best Sellers
export const getBestSellers = async (req, res) => {
    try {
        const products = await Products.find()
            .sort({ reviews: -1 })
            .limit(12);
        return res.status(200).json(products || []);
    } catch (err) {
        console.error('Error fetching best sellers:', err.message);
        res.status(500).json([]);
    }
}

// Get search results
export const searchProducts = async (req, res) => {
    try {
        let query = req.query.q ? req.query.q.trim() : '';
        if (query.length === 0) {
            return res.status(400).json({ message: "Empty search field" });
        }
        if (query.includes('sneakers')) {
            query = query.replace('sneakers', 'sneaker');
        }

        query = query.replace(/kids|boys|girls/gi, "child");
        query = query.replace(/mens/gi, "men");
        query = query.replace(/womens/gi, "women");
        query = query.replace(/\b(shoe|shoes)\b/gi, ' ').trim();
        query = query.replace(/'/g, '');
        
        const terms = query.split(/\s+/);
        const searchQuery = {
            $or: [
                ...terms.map(term => ({
                    $or: [
                        { title: { $regex: term, $options: "i" } },
                        { brand: { $regex: term, $options: "i" } },
                        { category: { $in: term } }
                    ]
                }))
            ]
        };

        const results = await Products.find(searchQuery);
        res.status(200).json(results || []);
    } catch (error) {
        console.error('Error performing search:', error.message);
        res.status(500).json([]);
    }
};

// Filter Products
export const filterProducts = async (req, res) => {
    try {
        const { brand, rating, category, price, discount } = req.query;
        const filter = {};

        if (brand) filter.brand = new RegExp(brand, 'i');

        if (rating) {
            const ratingValue = parseFloat(rating);
            if (!isNaN(ratingValue) && ratingValue >= 1 && ratingValue <= 5) {
                filter.rating = { $gte: ratingValue };
            }
        }

        if (category) {
            if (category === "Unisex") {
                filter.category = "adult";
            } else if (category === "Kids") {
                filter.category = "child";
            } else {
                filter.category = category.toLowerCase();
            }
        }

        let priceRange = {};
        if (price) {
            const priceRangeMatch = price.match(/₹(\d+)-₹(\d+)/);
            if (priceRangeMatch) {
                const minPrice = parseFloat(priceRangeMatch[1].replace(',', ''));
                const maxPrice = parseFloat(priceRangeMatch[2].replace(',', ''));
                priceRange = { $gte: minPrice, $lte: maxPrice };
            } else if (price === "₹3000+") {
                priceRange = { $gte: 3000 };
            }
            filter.sellPrice = priceRange;
        }

        if (discount) {
            const discountMatch = discount.match(/(\d+)%/);
            if (discountMatch) {
                const discountValue = parseInt(discountMatch[1], 10);
                filter.discount = { $gte: discountValue };
            }
        }

        const result = await Products.find(filter);

        // Fixed: Always return array (result) instead of 404 object
        return res.status(200).json(result || []);

    } catch (error) {
        console.error('Error while filtering products:', error.message);
        res.status(500).json([]); 
    }
}

// List of Products
export const listOfProducts = async (req, res) => {
    try {
        const { list } = req.params;
        const idArray = list.split(',').map(id => id.trim());

        if (idArray.length === 0) {
            return res.status(200).json([]);
        }

        const result = await Products.find({ _id: { $in: idArray } });
        res.status(200).json(result || []);
    } catch (error) {
        console.error('Error while fetching list:', error.message);
        res.status(500).json([]);
    }
}