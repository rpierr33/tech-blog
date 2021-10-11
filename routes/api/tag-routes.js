const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // find all tags
  dbProductData
  Tag.findAll({
  // be sure to include its associated Product data
  include: [
      {
        model: Product,
        through: ProductTag
      }
    ]
  })
    // then return the category data from the db in json format
    .then(dbTagData => res.json(dbTagData))
    // if theres an error, console log error with 500 status
    .catch(err => {
      console.log(err);
      res.status(500).json(err)
    });
});

router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  Tag.findOne({
    // be sure to include its associated Product data
        where: {
          id:req.params.id
        },
      
    include: [
        {
          model: Product,
          through: ProductTag
        }
      ]
    })
       // then return the category data from the db in json format (line 49)
       .then(dbTagData => {
        // if there is no data tht matches this id, return the 404 error with the message below
        if (!dbTagData) {
          res.status(404).json({ message: 'No tag found with this id' });
          return;
        }
        // after finding the data associated with this id
        res.json(dbTagData);
      })
      // if theres an error, console log error with 500 status
      .catch(err => {
        console.log(err);
        res.status(500).json(err)
      });
});

router.post('/', (req, res) => {
  // create a new tag
  Tag.create(
    // expects => {tag_name:}
    req.body)
    // then convert to data to json format
    .then(dbTagData => res.json(dbTagData))
          // if theres an error, console log error with 500 status
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  Tag.update(
    {
      where: {
        id: req.params.id
      }
    }
  )
    .then(dbTagData => {
      // if there is no data tht matches this id, return the 404 error with the message below
      if (!dbTagData) {
        res.status(404).json({ message: 'No tag found with this id' });
        return;
      }
      // after finding the data associated with this id, convert to json format
      res.json(dbTagData);
    })

    // if theres an error, console log error with 500 status
    .catch(err => {
      console.log(err);
      res.status(500).json(err)
    });
});







router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  Tag.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(dbTagData => {

      // if there is no data tht matches this id, return the 404 error with the message below
      if (!dbTagData) {
        res.status(404).json({ message: 'No product found with this id' });
        return;
      }
      // after finding the data associated with this id
      res.json(dbTagData);
    })

    // if theres an error, console log error with 500 status
    .catch(err => {
      console.log(err);
      res.status(500).json(err)
    });
});

module.exports = router;
