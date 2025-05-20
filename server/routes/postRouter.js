const Router = require('express')
const postController = require('../controllers/postController')
const checkRoleMiddleware = require('../middlewares/checkRoleMiddleware')
const router = new Router()

router.get('/', postController.getAll)
router.get('/:id', postController.getOne)
router.post('/', checkRoleMiddleware('ADMIN'), postController.create)
router.put('/:id', checkRoleMiddleware('ADMIN'), postController.update)
router.delete('/:id', checkRoleMiddleware('ADMIN'), postController.delete)

module.exports = router