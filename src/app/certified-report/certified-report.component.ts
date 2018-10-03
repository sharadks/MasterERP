import { Component, OnInit } from '@angular/core';
import { Errors, ReportService, JwtService } from '../shared';
import { environment } from '../../environments/environment';
import * as enLocale from 'date-fns/locale/en';
import * as frLocale from 'date-fns/locale/fr';
import {NgbDateStruct, NgbCalendar} from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';

@Component({
  selector: 'app-certified-report',
  templateUrl: './certified-report.component.html',
  styleUrls: ['./certified-report.component.css']
})
export class CertifiedReportComponent implements OnInit {

public data: any;
public pieColors : any;
public tableData: any;
public colValues:any;
private cols: any[] = [];
private postObject: any;
private portalFigures: any;
private currentUser: any;
private portalList: any;
private toDate: any;
private fromDate :any;
private portalId : any;

  constructor(private reportService: ReportService, private jwtService: JwtService, private calendar: NgbCalendar, private router:Router) {
  this.pieColors = ['#3366CC', '#DC3912', '#FF9900', '#109618', '#990099',
'#3B3EAC', '#0099C6', '#DD4477', '#66AA00', '#B82E2E',
'#316395', '#994499', '#22AA99', '#AAAA11', '#6633CC',
'#E67300', '#8B0707', '#329262', '#5574A6', '#3B3EAC'];
		this.data = {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
            datasets: [
                {
                    label: 'First Dataset',
                    data: [65, 59, 80, 81, 56, 55, 40]
                },
                {
                    label: 'Second Dataset',
                    data: [28, 48, 40, 19, 86, 27, 90]
                }
            ],
             backgroundColor: this.pieColors,

        }
        this.currentUser = this.jwtService.getCurrentUser();
          var authData = {
          'userId':this.currentUser.userId,
          'token':this.currentUser.token
          };
          
          this.reportService.authenticateUser(environment.check_auth, authData).subscribe(
            data => {
            },
            err => {
              window.localStorage.clear();
              this.router.navigateByUrl('/login'); 
              //this.errors = err;
            }
          );




        var url = environment.get_date_filter+this.currentUser.userId;
        this.reportService.getDateFilters(url).subscribe(
          data => {
            
          },
          err => {
            //this.errors = err;
          }
        );

          
      }

  ngOnInit() {
    this.currentUser = this.jwtService.getCurrentUser();
    this.portalId = 0;
     var url = environment.get_portal_list+this.currentUser.userId;
    this.reportService.getPortalList(url).subscribe(
        data => {
          this.portalList = data;
          this.getInitialFigures();
        },
        err => {
          //this.errors = err;
        }
      );
  }

  doSearch(value) {
    this.postObject.Search.Value = value;
    this.reportService.getReportData(environment.report_path,this.postObject).subscribe(
        data => {
         console.log("Report Data", data);
         this.tableData = data.data;
         console.log(this.tableData);
         if(this.tableData.length) {
            this.colValues = Object.keys(this.tableData[0]);
            for(let i=0;i<this.colValues.length;i++){
                this.cols.push({field: this.colValues[i], header: this.colValues[i]})
            }
         }
        },
        err => {
          //this.errors = err;
        }
      );

  }

  getGridData(path){
    this.postObject.Columns[2].Data=this.portalId;
    console.log(this.postObject);
    this.reportService.getGridData(environment[path],this.postObject).subscribe(
        data => {
            this.tableData = null;
            this.colValues = null;
            this.cols = [];
            this.tableData = data.data;
         console.log(this.tableData);
         this.colValues = Object.keys(this.tableData[0]);
         for(let i=0;i<this.colValues.length;i++){
             this.cols.push({field: this.colValues[i], header: this.colValues[i]})
         }
        },
        err => {
          //this.errors = err;
        }
      );
    }

    getDataForFilters (portalId){
     this.portalId = portalId;
     var url = environment.get_dashboard_figure +this.currentUser.userId+'&portal_id='+portalId;
          this.reportService.getPortalFigures(url).subscribe(
            data => {
                this.portalFigures = data;
            },
            err => {
              //this.errors = err;
            }
          );
    }

    updateDate(fromValue,toValue){
        var date1 = fromValue.day+'/'+fromValue.month+'/'+ fromValue.year;
        var date2 = toValue.day+'/'+toValue.month+'/'+ toValue.year;

        var DateObject = { user_id: this.currentUser.userId, from_date: date1, to_date: date2}
        this.reportService.updateDateFilters(environment.update_date_filter, DateObject).subscribe(
          data => {
            this.getInitialFigures();
          },
          err => {
            //this.errors = err;
          }
        );
    }

    getInitialFigures() {
                 var url = environment.get_dashboard_figure +this.currentUser.userId+'&portal_id=0';
                 this.reportService.getPortalFigures(url).subscribe(
                   data => {
                       this.portalFigures = data;
               this.postObject = 
               { 
               Draw : "1", "Start" : "1", "Length" : "100",
               Search : { "Value" : "", "Regex" : "" },
               Order : [{"Column" : "0", "Dir" : "asc"}, {"Column" : "1", "Dir" : ""}, {"Column" : "2", "Dir" : ""}],
               Columns : [
                 { "Data" : "", "Name" : "", "Searchable" : "true", "Orderable" : "false"},
                 { "Data" : this.currentUser.userId, "Name" : "user_id", "Searchable" : "true", "Orderable" : "false"},
                 { "Data" : this.portalId, "Name" : "portal_id", "Searchable" : "true", "Orderable" : "false"}
               ]
               }
                   },
                   err => {
                     //this.errors = err;
                   }
                 );
    }
}
