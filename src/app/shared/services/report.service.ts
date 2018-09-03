import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import {ApiService} from './api.service';

@Injectable()
export class ReportService {
    constructor(private apiService: ApiService) {
    }

    getOffReport(url, date): Observable<any> {
        return this.apiService.get(url + '?date=' + date)
            .map((data) => data);
    };

    getSlaCompliance(url, date): Observable<any> {
        return this.apiService.get(url + '?date=' + date)
            .map((data) => data);
    };

    getPlannedOut(url, date): Observable<any> {
        return this.apiService.get(url + '?date=' + date)
            .map((data) => data);
    };
}
