import { Router } from 'express'
import report from '../modules/report/routes'
export default () => {
    const app = Router()
    report(app)

    return app
}
