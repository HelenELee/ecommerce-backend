const router = require('express').Router();
//import models
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const categoryData = await Category.findAll({
      include: [{ model: Product }],
    });

    if (!categoryData) {
      res.status(404).json({ message: 'No categories found!' });
      return;
    }

    res.status(200).json(categoryData);
    return;
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// The `/api/categories/9` endpoint

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    //get details from request - parameter part
    const categoryData = await Category.findByPk(req.params.id, {
      include: [{ model: Product }],
    });
    //check something was found
    if (!categoryData) {
      res.status(404).json({ message: 'No category found with that id!' });
      return;
    }
    //return success
    res.status(200).json(categoryData);
    
  } catch (err) {
    //catch error
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  // create a new category
  try {
    //get values from request - body part
    const categoryData = await Category.create({
      category_name: req.body.category_name,
    });
    //success
    res.status(200).json(categoryData);
  } catch (err) {
    //catch error
    res.status(500).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
    //get details from both body and params
    const categoryData = await Category.update(
      {
        category_name: req.body.category_name,
      },
      {
        where: {
          id: req.params.id,
        },
      }
      );
    //check if category found
    if (!categoryData) {
      res.status(404).json({ message: 'No category found with that id!' });
      return;
    }
    //check its not an array with value 0 returned - no category with the id
    if (categoryData[0] == 0 ) {
      res.status(404).json({ message: 'No category found with that id!' });
      return;
    }

    res.status(200).json(categoryData);
    
  } catch (err) {
    
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    //get details from params
    const categoryData = await Category.destroy({
      where : {
        id: req.params.id,
      }
    })
    
    if (!categoryData) {
      res.status(404).json({ message: 'No category found with that id!' });
      return;
    }

    res.status(200).json(categoryData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
