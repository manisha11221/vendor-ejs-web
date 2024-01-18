const express = require('express');
const router = express.Router();
const developerController = require('../controllers/developerController');
const auth = require('../middlewares/vendorMiddleware')


router.post('/add-dev',auth,developerController.addDeveloper);
router.get('/get-dev/:id', developerController.getDeveloperById);
router.get('/get-devAll/', developerController.getDeveloperAll);
router.get('/get-by-vendor',auth,developerController.getByVendor);
router.put('/update-dev/:id',auth, developerController.updateDeveloper);
router.delete('/delete-dev/:id',auth, developerController.deleteDeveloper);


module.exports = router;
