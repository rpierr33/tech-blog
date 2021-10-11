const router = require('express').Router();
const { json } = require('sequelize/types');
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
  Category.findAll({
    // include Products
    include: [
      {
        model: Product,
      }
    ]
  })
    // then return the category data from the db in json format
    .then(dbCategoryData => res.json(dbCategoryData))
    // if theres an error, console log error with 500 status
    .catch(err => {
      console.log(err);
      res.status(500).json(err)
    });
});

router.get('/:id', (req, res) => {
  // find specific id
  Category.findOne({
    where: {
      id: req.params.id
    },
    // include the product model
    include: [
      {
        model: Product,
      }
    ]
  })
    // then return the category data from the db in json format
    .then(dbCategoryData => {
      // if there is no data tht matches this id, return the 404 error with the message below
      if (!dbCategoryData) {
        res.status(404).json({ message: 'No category found with this id' });
        return;
      }
      // after finding the data associated with this id
      res.json(dbCategoryData);
    })

    // if theres an error, console log error with 500 status
    .catch(err => {
      console.log(err);
      res.status(500).json(err)
    });
});






router.post('/', (req, res) => {
  // create a new category
  Category.create({
    // expects => {category_name:}
    category_name: req.body.category_name
  })
    .then(dbCategoryData => res.json(dbCategoryData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.put('/:id', (req, res) => {
  // update product data
  Category.update(
    {
      category_name: req.body.category_name
    },
    {
      where: {
        id: req.params.id
      }
    }
  )
    .then(dbCategoryData => {
      // if there is no data tht matches this id, return the 404 error with the message below
      if (!dbCategoryData) {
        res.status(404).json({ message: 'No post found with this id' });
        return;
      }
      // after finding the data associated with this id
      res.json(dbCategoryData);
    })

    // if theres an error, console log error with 500 status
    .catch(err => {
      console.log(err);
      res.status(500).json(err)
    });
});


router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  Category.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(dbCategoryData => {

      // if there is no data tht matches this id, return the 404 error with the message below
      if (!dbCategoryData) {
        res.status(404).json({ message: 'No post found with this id' });
        return;
      }
      // after finding the data associated with this id
      res.json(dbCategoryData);
    })

    // if theres an error, console log error with 500 status
    .catch(err => {
      console.log(err);
      res.status(500).json(err)
    });

});
module.exports = router;
