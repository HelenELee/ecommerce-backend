const router = require('express').Router();
//get all models
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    //get all Tags and join with Producy using ProductTag pivot table
    const tagData = await Tag.findAll({
      include: [{ model: Product, through: ProductTag, as: 'products'}],
    });

    if (!tagData) {
      res.status(404).json({ message: 'No tags found!' });
      return;
    }

    res.status(200).json(tagData);
    return;
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
     //get all Tags and join with Producy using ProductTag pivot table
     //use params containing id
    const tagData = await Tag.findByPk(req.params.id, {
      include: [{ model: Product, through: ProductTag, as: 'products'}],
    });

    if (!tagData) {
      res.status(404).json({ message: 'No tag found for that id!' });
      return;
    }

    res.status(200).json(tagData);
    return;
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  // create a new tag
  try {
    //get details from request in body part
    const tagData = await Tag.create({
      tag_name: req.body.tag_name,
    });

    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try {
  //get Tag based on id passed in parameters
  //update based on details bassed in body of request

    const tagData = await Tag.update(
      {
        tag_name: req.body.tag_name,
      },
      {
        where: {
          id: req.params.id,
        },
      }
      );

  if (!tagData) {
    res.status(404).json({ message: 'No tag found with that id!' });
    return;
  }
//check if Tag found - array with value 0 indicates no Tag found
  if (tagData[0] == 0) {
    res.status(404).json({ message: 'No tag found with that id!' });
    return;
  }
    

    res.status(200).json(tagData);
    
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try {
    //get Tag based on id passed as parameter
    const tagData = await Tag.destroy({
      where : {
        id: req.params.id,
      }
    })
    
    if (!tagData) {
      res.status(404).json({ message: 'No tag found with that id!' });
      return;
    }

    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
