const { Post } = require('../models');

const postdata = [
  {
    title: 'Object-Relational Mapping',
    description: 'I have really loved learning about ORMs. It’s really simplified the way I create queries in SQL!',
    post_id: 1
  },
  {
    title: 'Authentication vs. Authorization',
    description: 'There is a difference between authentication and authorization. Authentication means confirming your own identity, whereas authorization means being allowed access to the system.',
    post_id: 2
  },
  {
    title: 'why MVC is so important!',
    description: 'MVC allows developers to maintain a true separation of concerns, devising their code between the Model layer for data, the View layer for design, and the Controller layer for application logic.',
    post_id: 3
  },
];

const seedPost = () => Post.bulkCreate(postdata);

module.exports = seedPost;