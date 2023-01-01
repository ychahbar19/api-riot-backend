export class ApiController {
  private endpoint: string;
  constructor(private childEndpoint: string) {
    this.endpoint = `api/${childEndpoint}`;
  }
}
