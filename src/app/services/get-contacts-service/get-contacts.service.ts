import { environment } from '../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class GetContactsService {
  baseApiUrl: string = environment.api;

  constructor(
    private http: HttpClient) { }

  public getContacts(): Observable<any> {
    return this.http.get(this.baseApiUrl);
  }

}
