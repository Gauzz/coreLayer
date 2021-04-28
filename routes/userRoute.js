const router = require('express').Router();
const modelController = require("../controllers/userCoreController");

router.post('/create', modelController.create);

router.get('/list', modelController.list);

router.get('/get', modelController.get);

router.post('/update', modelController.update);

router.post('/updateOne', modelController.updateOne);

router.get('/delete', modelController.delete);

router.get('/deleteOne', modelController.deleteOne);

router.get('/count', modelController.count);

module.exports = router;