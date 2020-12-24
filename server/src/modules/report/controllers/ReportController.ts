import {
  JsonController,
  Get,
  QueryParam,
} from 'routing-controllers';
import ReportService from '../services/ReportService';
import http from "../../../common/response"

@JsonController()
export class ReportController {
  private reportService: ReportService;

  constructor() {
    this.reportService = new ReportService();
  }

  @Get('')
  async filter(
    @QueryParam('bic') bankBIC: string,
    @QueryParam('minRange') minRange: number,
    @QueryParam('maxRange') maxRange: number,
    @QueryParam('name') bankName: string,
    @QueryParam('publishStatus') status: string,
    @QueryParam('type') type: [string],
    @QueryParam('current') page: number,
    @QueryParam('pageSize') size: number,
    @QueryParam('sortField') sortField: string,
    @QueryParam('sortOrder') sortOrder: string,
  ) {
    try {
    
      const filter = {
        bankBIC,
        minRange,
        maxRange,
        bankName,
        status,
        type,
        page,
        size,
        sortOrder,
        sortField
      }
      const registerResponse = await this.reportService.filter(filter);
      return http.createResponse(registerResponse);
    } catch (e) {
      return {
        success: false,
        message: e.message,
      };
    }
  }
}
