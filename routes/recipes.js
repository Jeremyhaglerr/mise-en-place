import { Router } from 'express'
import * as recipesCtrl from '../controllers/recipes.js'
import { isLoggedIn } from '../middleware/middleware.js'

const router = Router()

router.get('/', recipesCtrl.index )
router.get('/new', isLoggedIn, recipesCtrl.new)
router.get('/:id/edit', isLoggedIn, recipesCtrl.edit)
router.get('/:id', recipesCtrl.show)

router.post('/', isLoggedIn, recipesCtrl.create)
router.post('/:id/notes', isLoggedIn, recipesCtrl.createNote)

router.delete('/:id', isLoggedIn, recipesCtrl.delete)
router.delete('/:id/:id', isLoggedIn, recipesCtrl.deleteNote)




export {
  router
}