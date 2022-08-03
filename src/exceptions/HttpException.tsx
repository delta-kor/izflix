class HttpException extends Error {
  public status: number;
  public message: string;

  constructor(response: ApiResponse) {
    super();
    this.status = response.status;
    this.message = response.message || '네트워크 연결 중 오류가 발생했어요';
    this.name = 'HttpException';
  }
}

export default HttpException;
