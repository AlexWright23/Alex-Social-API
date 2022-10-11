const { User, Thought } = require('../models');


module.exports = {
  getUser(req, res) {
    User.find()
        .then((user) => res.json(user))
        .catch((err) => res.status(500).json(err));
},

getSingleUser(req, res) {
  User.findOne({ _id: req.params.userId })
      .select('-__v')
      .then((user) =>
          !user
              ? res.status(404).json({ message: 'No ID related to that user' })
              : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
},

createUser(req, res) {
  User.create(req.body)
      .then((user) => res.json(user))
      .catch((err) => {
          console.log(err);
          return res.status(500).json(err);
      });
},

deleteUser(req, res) {
  User.findOneAndDelete({ _id: req.params.userId })
      .then((user) =>
          !user
              ? res.status(404).json({ message: 'No ID related to that user' })
              : Thought.deleteMany({ _id: { $in: user.thoughts } })
      )
      .then(() => res.json({ message: 'Sent to shadow realm' }))
      .catch((err) => res.status(500).json(err));
},
}
