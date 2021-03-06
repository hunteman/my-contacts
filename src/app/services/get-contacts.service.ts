import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';

@Injectable()
export class GetContactsService {
  baseApiUrl: string = environment.api;

  constructor(
    private http: HttpClient) { }

  public getContacts() {
    return this.http.get(this.baseApiUrl);
  }

}
