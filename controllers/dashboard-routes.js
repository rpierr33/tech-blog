const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

// get all available posts for dashboard
router.get('/', withAuth, (req, res) => {
  console.log(req.session);
  console.log('======================');
  Post.findAll({
      where: {
          user_id: req.session.user_id
      },
      attributes: [
          'id',
          'title',
          'description',
          'created_at'
      ],
      include: [
        {
          model: Comment,
          attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
          include: {
            model: User,
            attributes: ['username']
          }
        },
        {
          model: User,
          attributes: ['username']
        }
      ]

  })

    .then(dbPostData => {
      const post = dbPostData.map(post => post.get({ plain: true }));
      console.log('HIT THE DASHBOARD ROUTE!! ABOUT TO SHOW THEM THE PAGE!!!',post);
      res.render('dashboard', { post, loggedIn: true });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.get('/edit/:id', withAuth, (req, res) => {
  Post.findByPk(req.params.id, {
      attributes: [
          'id',
          'title',
          'description',
          'created_at'
      ],
      include: [
          {
              model: Comment,
              attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
              include: {
                  model: User,
                  attributes: ['username']
              }
          },
          {
              model: User,
              attributes: ['username']
          }
      ]
  })
      .then(dbPostData => {
          if (dbPostData) {
              const post = dbPostData.get({ plain: true });

              res.render('edit-post', {
                  post,
                  loggedIn: true
              });
          } else {
              res.status(404).end();
          }
      })
      .catch(err => {
          res.status(500).json(err);
      });
});

module.exports = router;
