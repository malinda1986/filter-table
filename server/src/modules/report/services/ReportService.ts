import moment from 'moment';
import _ from "lodash"
import {Data, Filter, Paginate, Report} from "../../types"
import data from './data/report';

export default class ReportService {

  private paginate (data: Array<Report>, page: number, size: number):Paginate{
    const records =  data.slice((page - 1) * size, page * size)
    return {
      records,
      pages: Math.ceil(data.length/size),
      total: data.length,
      current: page,
      next: parseInt(page.toString()) + 1
    }
  }

  private async query( data: Array<Data>, params: Filter):Promise<Array<Report>>{
    const q: any = {}
    Object.keys(params).forEach(function(key){
        if (typeof params[key] != 'undefined' && params[key]!=null && params[key]!="null"  && params[key] != "undefined"){
            q[key] = params[key];
        }
    })
    let result = data.map(item => {
      const {body, createdAt, publishedAt, uuid} = item
      const input = {createdAt, publishedAt, ...body}
      let isFiltered = true
      for(let key in q){
        if(key == "bankName" && !input[key].includes(q[key])){
          isFiltered = false
        }
        if(key == "bankBIC" && !input[key].includes(q[key])){
          isFiltered = false
        }
        if(key == "type" && !q[key].includes(input[key])){
          isFiltered = false
        }
        if((key == "minRange" || key == "maxRange") && (key == "minRange" || key == "maxRange") 
          && !(input["reportScore"] <= q["maxRange"] && input["reportScore"] >= q["minRange"])
        ){
          isFiltered = false
        }

        if(key == "status"){
          const createdAt = moment(input["createdAt"], "YYYY-MM-DD").unix();
          const now = moment().unix();
          if((q[key] === "published" ) && !(now >= createdAt) ){
            isFiltered = false
          }
          if((q[key] === "unpublished" ) && !(now < createdAt) ){
            isFiltered = false
          }
         
        }
      }
      if(isFiltered){
        return {
          id: uuid,
          createdAt, publishedAt, 
          bankName: body.bankName, 
          bankBIC: body.bankBIC[0],
          reportScore: body.reportScore, 
          type: body.type.toUpperCase()
        }
      } 
    });
    
    if(q.sortField && q.sortOrder){
      result = _.orderBy(result, [q.sortField], [q.sortOrder == "descend" ? "desc" : "asc" ])
    }
    return _.filter(result)

  }

  public async filter(filter: Filter): Promise<Paginate> {
    const { page = 1, size = 10 } = filter
    const filteredData = await this.query(data, filter)
    const result = this.paginate(filteredData, page, size)
    return result;
  }
}
