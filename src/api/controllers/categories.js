/* eslint-disable consistent-return */
/* eslint-disable no-undef */
const express = require('express');
const Joi = require('@hapi/joi');

const router = express.Router();

const categories = [
  { id: 1, category: 'UCD' },
  { id: 2, category: 'DEV' },
  { id: 3, category: 'MNG' },
  { id: 4, category: 'ENT' },
  { id: 5, category: 'COD' },
  { id: 6, category: 'MAG' }
];

router.get('/api/categories', (req, res) => {
  res.json(categories);
});

router.get('/api/categories/:id', (req, res) => {
  const category = categories.find(c => c.id === parseInt(req.params.id, 10));
  if (!category) return res.status(404).json('The category with the given ID was not found.');

  res.json(category);
  // this.verifyToken()
});

router.post('/api/categories', (req, res) => {
  const { error } = validDateCategories(req.body);
  if (error) return res.status(400).json(error.details[0].message);

  console.log(req.body);
  const newCategory = {
    id: categories.length + 1,
    category: req.body.category
  };

  categories.push(newCategory);
  res.json(categories);
});

router.put('/api/categories/:id', (req, res) => {
  const targetCategory = categories.find(c => c.id === parseInt(req.params.id, 10));
  if (!targetCategory) return res.status(404).json('The category with the given ID was not found.');

  const { error } = validDateCategories(req.body);
  if (error) return res.status(400).json(error.details[0].message);

  targetCategory.category = req.body.category;
  res.json(targetCategory);
});

router.delete('/api/categories/:id', (req, res) => {
  const targetCategory = categories.find(c => c.id === parseInt(req.params.id, 10));
  if (!targetCategory) return res.status(404).json('The category with the given ID was not found');

  const index = categories.indexOf(targetCategory);
  categories.splice(index, 1);

  res.json(categories);
});

validDateCategories = category => {
  const schema = {
    category: Joi.string()
      .alphanum()
      .min(3)
      .max(3)
      .required()
  };

  return Joi.validate(category, schema);
};
module.exports = router;
