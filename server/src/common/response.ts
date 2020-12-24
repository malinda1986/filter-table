export default class http {
  static createResponse(data: any, code = 200) {
    const successCodes = [200, 201];
    return {
      success: successCodes.includes(code) ? true : false,
      data,
    };
  }
}
