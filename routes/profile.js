import { Router } from 'express'
import { isLoggedIn } from '../middleware/middleware.js'
import * as profileCtrl from '../controllers/profile.js'

const router = Router()

router.get('/', isLoggedIn, profileCtrl.index)

export {
  router
}