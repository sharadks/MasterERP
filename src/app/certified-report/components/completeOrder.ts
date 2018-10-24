import { Component, OnInit } from '@angular/core';
import { Errors, ReportService, JwtService } from '../../shared';
import { environment } from '../../../environments/environment';
import * as enLocale from 'date-fns/locale/en';
import * as frLocale from 'date-fns/locale/fr';
import {NgbDateStruct, NgbCalendar} from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import {MenuItem} from 'primeng/primeng';

@Component({
  selector: 'app-complete-orders',
  templateUrl: './completeOrder.html'
})
export class CompleteOrderComponent implements OnInit {

  private completeOrderList:any;
  private postObject:any;
  private currentUser:any;
  private portalId : any;
  private colValues:any;
  private cols:any;
  private paymentObj:any;

  constructor(private reportService: ReportService, private jwtService: JwtService, private calendar: NgbCalendar, private router:Router) {
    this.currentUser = this.jwtService.getCurrentUser();
  }

    ngOnInit() {
      this.portalId = 0;
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
      this.reportService.gatCompleteOrders(environment.get_complete_orders,this.postObject).subscribe(
          data => {
            this.colValues=[];
            this.cols=[];
            //this.cols.push({field: 'Action', header: 'Action'})
            this.completeOrderList = data.data;
            if(this.completeOrderList.length) {
              this.colValues = Object.keys(this.completeOrderList[0]);
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
}