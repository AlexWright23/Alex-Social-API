const router = require('express').Router();
const {
  getUser, getSingleUser, createUser, updateUser, deleteUser, addFriend, removeFriend,
} = require('../../controllers/userController.js');

router.route('/').get(getUser).post(createUser);


router
    .route('/:userId')
    .get(getSingleUser)
    .put(updateUser)
    .delete(deleteUser);
    router.route('/:userId/friend/:friendId').delete(removeFriend).put(addFriend)

module.exports = router;

