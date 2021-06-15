const router = require('express-promise-router')();
const spendingController = require('../controllers/spending.controller');
const spendingSummaryController = require('../controllers/spendingSummary.controller');
// ==> create :3000/api/acc
router.post('/addSpending', spendingController.addSpending);

// ==> Get all spending
router.post('/getALLSpending', spendingController.getAllSpending);

// ==> update spending
router.post('/updateSpending', spendingController.updateSpending);

// ==> del spending
router.post('/delSpending', spendingController.delSpending);

// ==> Summary spending
router.post('/spendingSummary', spendingSummaryController.summarySpending);

module.exports = router;