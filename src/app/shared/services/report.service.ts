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

    getPortalFigures(url): Observable<any> {
        return this.apiService.get(url)
            .map((data) => data);
    };

    getPortalList(url): Observable<any> {
        return this.apiService.get(url)
            .map((data) => data);
    };

    getDateFilters(url): Observable<any> {
        return this.apiService.get(url)
            .map((data) => data);
    };

    updateDateFilters(url, data): Observable<any> {
        return this.apiService.post(url, data)
            .map(
            data => {
                return data;
            }
        );
    };

    getGridData(url, data): Observable<any> {
        return this.apiService.post(url, data)
            .map(
            data => {
                return data;
            }
        );
    };

    getSlaCompliance(url, date): Observable<any> {
        return this.apiService.get(url + '?date=' + date)
            .map((data) => data);
    };

    getPlannedOut(url, date): Observable<any> {
        return this.apiService.get(url + '?date=' + date)
            .map((data) => data);
    };

    getReportData(url, data): Observable<any> {
        return this.apiService.post(url, data)
            .map(
            data => {
                return data;
            }
        );
    };
}
