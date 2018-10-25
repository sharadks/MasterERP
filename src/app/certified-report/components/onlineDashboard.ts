import { Component, OnInit } from '@angular/core';
import { Errors, ReportService, JwtService } from '../../shared';
import { environment } from '../../../environments/environment';
import * as enLocale from 'date-fns/locale/en';
import * as frLocale from 'date-fns/locale/fr';
import {NgbDateStruct, NgbCalendar} from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import {MenuItem} from 'primeng/primeng';

@Component({
  selector: 'app-online-dashboard',
  templateUrl: './onlineDashboard.html',
  styleUrls: ['../certified-report.component.css']
})
export class OnlineDashboardComponent implements OnInit {

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
private isLoggedIn:boolean= false;
private graphData:any;
private DEFAULT_COLORS:any;
private graphColors:any;
private display: boolean = false;
private header: any;
items: MenuItem[];
public loading = false;

  constructor(private reportService: ReportService, private jwtService: JwtService, private calendar: NgbCalendar, private router:Router) {
    
  this.items = [
      {label: 'Dashboard Portal', icon: 'fa fa-fw fa-bar-chart', routerLink: ['dashboard']},
      {label: 'Pending Orders', icon: 'fa fa-fw fa-calendar', routerLink: ['pending-orders']},
      {label: 'Pending For Dispatch', icon: 'fa fa-fw fa-book', routerLink: ['pending-orders']},
      {label: 'Cancel Orders', icon: 'fa fa-fw fa-support', routerLink: ['pending-orders']},
      {label: 'Complete Orders', icon: 'fa fa-fw fa-twitter', routerLink: ['pending-orders']}
  ];
    
    
    this. DEFAULT_COLORS = ['#3366CC', '#DC3912', '#FF9900', '#109618', '#990099',
    '#3B3EAC', '#0099C6', '#DD4477', '#66AA00', '#B82E2E',
    '#316395', '#994499', '#22AA99', '#AAAA11', '#6633CC',
    '#E67300', '#8B0707', '#329262', '#5574A6', '#3B3EAC'];



    
        this.currentUser = this.jwtService.getCurrentUser();
          var authData = {
          'userId':this.currentUser.userId,
          'token':this.currentUser.token
          };
          
          this.reportService.authenticateUser(environment.check_auth, authData).subscribe(
            data => {
              this.isLoggedIn= true;
              var url = environment.get_date_filter+this.currentUser.userId;
              this.reportService.getDateFilters(url).subscribe(
                data => {
                  var url=environment.get_graph_data+this.currentUser.userId;
                  this.getGraphData(url);
                },
                err => {
                  
                }
              );
            },
            err => {
              this.isLoggedIn= false;
              window.localStorage.clear();
              this.router.navigateByUrl('/login'); 
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
         this.tableData = data.data;
         if(this.tableData.length) {
            this.colValues = Object.keys(this.tableData[0]);
            for(let i=0;i<this.colValues.length;i++){
                this.cols.push({field: this.colValues[i], header: this.toCamelCase(this.colValues[i])})
            }
         }
        },
        err => {
          //this.errors = err;
        }
      );

  }


  getGraphData(url) {
    this.reportService.getGraphData(url).subscribe(
        data => {
        this.graphData = data;
          this.graphColors = this.configureDefaultColours(this.graphData.datasets);
          for(var i=0;i<this.graphData.datasets.length;i++) {
            this.graphData.datasets[i].backgroundColor = this.graphColors[i];
          }
        },
        err => { 
        }
      );
  }

 configureDefaultColours(data: number[]): string[] {
    let customColours = []
    if (data.length) {
    customColours = data.map((element, idx) => {
        return this.DEFAULT_COLORS[idx % this.DEFAULT_COLORS.length];
    });
    }
    return customColours;
}

  getGridData(path, heading){
    this.loading = true;
    this.postObject.Columns[2].Data=this.portalId;
    this.reportService.getGridData(environment[path],this.postObject).subscribe(
        data => {
          this.loading = false;
            this.tableData = null;
            this.colValues = null;
            this.cols = [];
            this.tableData = data.data;
         this.colValues = Object.keys(this.tableData[0]);
         for(let i=0;i<this.colValues.length;i++){
          if(this.colValues[i]!=='portal_id' && this.colValues[i]!=='dealer_id' && this.colValues[i]!=='tran_id' && this.colValues[i]!=='srno') {
            this.cols.push({field: this.colValues[i], header: this.toCamelCase(this.colValues[i])});
          }        
         }
         this.header = heading;
         
         this.display= true;
        },
        err => {
          //this.errors = err;
          this.loading = false;
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
                 var url = environment.get_dashboard_figure +this.currentUser.userId+'&portal_id='+this.portalId;
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

   toCamelCase = function(str) {
    {
      str= str[0].toUpperCase() + str.substring(1)
      // Lower cases the string
      return str
        // Replaces any - or _ characters with a space 
        .replace( /[-_]+/g, ' ')
        // Removes any non alphanumeric characters 
        .replace( /[^\w\s]/g, '')
        // Uppercases the first character in each group immediately following a space 
        // (delimited by spaces) 
        .replace( / (.)/g, function($1) { return $1.toLowerCase(); })
  
    }
         
  }
}

