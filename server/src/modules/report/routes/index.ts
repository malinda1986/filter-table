import { Router } from 'express';
import { useExpressServer } from 'routing-controllers';
import { ReportController } from '../controllers/ReportController';

export default (app: Router) => {
  useExpressServer(app, {
    routePrefix: '/report',
    controllers: [ReportController],
  });
};
