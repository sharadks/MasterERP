import { Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {Http} from '@angular/http';
import * as moment from 'moment';
import { environment } from '../../../environments/environment'
import {ReportService} from '../../shared/services/report.service';

const now = new Date();
@Component({
    selector: 'app-generic-report',
    templateUrl: './generic-report-component.html'
})
export class GenericReportComponent implements OnInit {
   routeUrl: string;
    model: any;
    date: { year: number, month: number, day: number };
    selectedDate;
    slaData;
    dateObservable;
    public filterQuery = '';
    public rowsOnPage = 10;
    public sortBy = 'reportname';
    public sortOrder = 'asc';
    public _uridate;
    public alerts = [];
    public alert = [];
    public rows: Array<any> = [];
    public columns: Array<any> = [
        {title: 'JobName', name: 'jobs', filtering: {filterString: '', placeholder: 'Filter by jobname'}},
        {
            title: 'ReportName',
            name: 'reportname',
            sort: false,
            filtering: {filterString: '', placeholder: 'Filter by ReportName'}
        },
        {title: 'Source', className: ['source-header', 'text-success'], name: 'source', sort: 'asc'},
        {title: 'SLA', name: 'sla_achieved', sort: '', filtering: {filterString: '', placeholder: 'Filter by SLA'}},
        {title: 'Actual', className: 'text-warning', name: 'reportstatus'},
        {title: 'ETA (!)', name: 'reportendtime'}
    ];
    public page: number = 1;
    public itemsPerPage: number = 10;
    public maxSize: number = 5;
    public numPages: number = 1;
    public length: number = 0;
    public reportData;
    public config: any = {
        paging: true,
        sorting: {columns: this.columns},
        filtering: {filterString: ''},
        className: ['table-striped', 'table-bordered']
    };
    public reports = [];
    public data: Array<any> = [];
    changeLog = [];
    public temp;
    public rtemp;
    public jobs: Array<any>[] = [];

    public constructor(private reportservice: ReportService, private route: ActivatedRoute,
                       private http: Http, private router: Router) {

        this._uridate = this.getSelectedDate();
        this.model = {year: now.getFullYear(), month: now.getMonth() + 1, day: now.getDate()};
        this.onGet();
        this.onSlaCompliance();
        console.log('I am in GenericReportComponent', this.router.url);
        this.routeUrl = this.router.url;
    }

    public ngOnInit(): void {
        this.onPlannedOut();
    }

    public getSelectedDate() {
        this.selectedDate = moment(this.model).format().substring(0, 10);
        console.log('this is from selected date' + this.selectedDate);
        return this.selectedDate;
    }

    onSetAlerts() {
        for (let x of this.alerts) {
            this.alert.push(x);
            console.log(this.alert);
        }
    }

    public closeAlert(alert: IAlert) {
        const index: number = this.alerts.indexOf(alert);
        this.alerts.splice(index, 1);
    }

    update(event: any) {
        this._uridate = event.year + '-' + event.month + '-' + event.day;
        this.onGet();
        this.onSlaCompliance();
        this.onPlannedOut();
        this.getSelectedDate();
    }

    public getPlacement(): string {
        return window.innerHeight <= 300 ? 'top' : 'right';

    }

    public onGet(): any[] {
        this.reportservice.getOffReport(environment.off_report_path, this._uridate).subscribe(
            (data) => {
                this.temp = Object.keys(data).map((key) => {
                    return data[key];
                });
                this.rtemp = this.temp[2];
                this.reports = this.rtemp;
                this.data = this.reports;
                this.length = this.data.length;
                for (const report of this.data) {
                    this.rows.push(report);
                }
                this.rows.forEach((item: any) => {
                    this.jobs.push(item.jobs);

                });
            });
        return this.data;

    }

    public onSlaCompliance() {
        /*this.reportservice.getSlaCompliance(this._uridate).subscribe(
          (data) => {
            this.slaData = data;
            console.log(this.slaData);
          }
        );*/
    }

    public onPlannedOut() {
        /*this.reportservice.getPlannedOut(this._uridate).subscribe(
          (data) => {
            this.alerts = data;
            console.log(this.alerts);
          }
        );*/
    }

}

export interface IAlert {
    id: number;
    type: string;
    message: string;
}
