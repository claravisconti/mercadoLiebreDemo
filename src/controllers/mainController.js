/*Llama al archivo .json y lo convierte*/
const fs = require('fs');
const path = require('path');
const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

/* Separa en index los productos para in-sale y visited - FILTER()*/
const pdtosInSale = products.filter(pdto => pdto.category == 'in-sale');
const pdtosVisited = products.filter(pdto => pdto.category == 'visited');

/*Formula de saparador de miles*/
const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

/*Datos del controller*/
const controller = {
	root: (req, res) => {
		res.render("index",{
			 	 productsInSale: pdtosInSale,
				 productsVisited: pdtosVisited,
				 toThousand: toThousand
			 });
	},

	/*Search del index*/
		search: (req, res) => {
		let userSearch = req.query.keywords;
		let results = [];
		for (let i = 0; i < products.length; i++) {
			if (products[i].name.toLowerCase().includes(userSearch.toLowerCase())) {
				results.push(products[i]); 	
				res.render('results', {
					allProducts:results, 
					userSearch:userSearch 
				});			
			} else {
			res.render('resultsNone', {
				userSearch:userSearch
			});
			}
		}
	},
}; 

module.exports = controller;
