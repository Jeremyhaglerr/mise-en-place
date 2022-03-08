import { Router } from 'express'
import * as recipesCtrl from '../controllers/recipes.js'
import { isLoggedIn } from '../middleware/middleware.js'

const router = Router()

router.get('/', recipesCtrl.index )
router.get('/new', isLoggedIn, recipesCtrl.new)

router.post('/', isLoggedIn, recipesCtrl.create)

router.get('/:id', recipesCtrl.show)

router.post('/:id/reviews', isLoggedIn, recipesCtrl.createReview)

router.get('/:id/edit', isLoggedIn, recipesCtrl.edit)

router.delete('/:id', isLoggedIn, recipesCtrl.delete)

export {
  router
}