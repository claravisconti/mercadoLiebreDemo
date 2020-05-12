const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
	// Root - Show all products
	root: (req, res) => {
		res.render('products',{allProducts:products});
	},

	// Detail - Detail from one product
	detail: (req, res) => {
		const id= req.params.productId;
		const product = products.find(p=> p.id == id);

		res.render('detail',{
			product: product,
			toThousand: toThousand
		})
	},

	// Create - Form to create
	create: (req, res) => {
		res.render('product-create-form');
	},
	
	// Create -  Method to store
	store: (req, res) => {
		// Do the magic
		const newId = products.length + 1;
		const newProduct = {
			id: newId,
			name: req.body.name,
			price: req.body.price,
			discount: req.body.discount,
			category: req.body.category,
			description: req.body.description,
			image: 'default-image.png'
		}
		const finalProduct = [...products, newProduct];
		fs.writeFileSync(productsFilePath,JSON.stringify(finalProduct, null, ' '));
		res.redirect('/');	
	},

	// Update - Form to edit
	edit: (req, res) => {
		// Do the magic
	},
	// Update - Method to update
	update: (req, res) => {
		// Do the magic
	},

	// Delete - Delete one product from DB
	destroy : (req, res) => {
		// Do the magic
	}
};

module.exports = controller;