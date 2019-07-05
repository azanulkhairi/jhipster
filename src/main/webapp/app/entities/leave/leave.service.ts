import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ILeave } from 'app/shared/model/leave.model';

type EntityResponseType = HttpResponse<ILeave>;
type EntityArrayResponseType = HttpResponse<ILeave[]>;

@Injectable({ providedIn: 'root' })
export class LeaveService {
  public resourceUrl = SERVER_API_URL + 'api/leaves';

  constructor(protected http: HttpClient) {}

  create(leave: ILeave): Observable<EntityResponseType> {
    return this.http.post<ILeave>(this.resourceUrl, leave, { observe: 'response' });
  }

  update(leave: ILeave): Observable<EntityResponseType> {
    return this.http.put<ILeave>(this.resourceUrl, leave, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ILeave>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ILeave[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
