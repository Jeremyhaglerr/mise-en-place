import { Router } from 'express'
import * as recipesCtrl from '../controllers/recipes.js'
import { isLoggedIn } from '../middleware/middleware.js'

const router = Router()

router.get('/', recipesCtrl.index )
router.get('/new', isLoggedIn, recipesCtrl.new)

router.post('/', isLoggedIn, recipesCtrl.create)

export {
  router
}