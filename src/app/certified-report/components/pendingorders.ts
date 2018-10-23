import { Component, OnInit } from '@angular/core';
import { Errors, ReportService, JwtService } from '../../shared';
import { environment } from '../../../environments/environment';
import * as enLocale from 'date-fns/locale/en';
import * as frLocale from 'date-fns/locale/fr';
import {NgbDateStruct, NgbCalendar} from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import {MenuItem} from 'primeng/primeng';

@Component({
    selector: 'app-pending-orders',
    templateUrl: './pendingorders.html'
  })
export class PendingOrderComponent implements OnInit {

  private pendingOrderList:any;
  private postObject:any;
  private currentUser:any;
  private portalId : any;
  private colValues:any;
  private cols:any;
  private displayApprove= false;
  private displayCancel= false;
  private popUpData;any;
  private paymentObj:any;
  private setApprove = {
    status:true
  };

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
      this.reportService.gatPendingOrders(environment.get_pending_orders,this.postObject).subscribe(
          data => {
            this.colValues=[];
            this.cols=[];
            //this.cols.push({field: 'Action', header: 'Action'})
            this.pendingOrderList = data.data;
            if(this.pendingOrderList.length) {
              this.colValues = Object.keys(this.pendingOrderList[0]);
              for(let i=0;i<this.colValues.length;i++){
                  this.cols.push({field: this.colValues[i], header: this.colValues[i]})
              }
              // this.cols.push(
              //   {field: 'Action', 
              //   header: 'Action'
              // })
           }
          },
          err => {
            //this.errors = err;
          }
        );
    }


    Action(row) {         
     
      this.paymentObj = {
        "tran_id" : '1', 
        "portal_id" : row.portal_id, 
        "type" : row.type,  
        "dealer_emp_id":row.dealer_emp_id,  
        "order_no":row.order_no, 
        "order_date":row.date
      }
      
      this.reportService.gatPendingOrderPaymentDetail(environment.get_pendingOrder_details,this.paymentObj).subscribe(
        data => {
          this.popUpData =  data;
          this.displayApprove=true;
          console.log(this.popUpData);
        },
        err => {
          //this.errors = err;
        }
      );

    }

    Approve(row) {         
     
      this.paymentObj = {
        "tran_id" : '1', 
        "portal_id" : row.portal_id, 
        "type" : row.type,  
        "dealer_emp_id":row.dealer_emp_id,  
        "order_no":row.order_no, 
        "order_date":row.date
      }
      
      this.reportService.gatPendingOrderPaymentDetail(environment.get_pendingOrder_details,this.paymentObj).subscribe(
        data => {
          this.popUpData =  data;
          this.displayApprove=true;
          console.log(this.popUpData);
        },
        err => {
          //this.errors = err;
        }
      );

    }

    Cancel(row) {         
      this.paymentObj = {
        "tran_id" : '1', 
        "portal_id" : row.portal_id, 
        "type" : row.type,  
        "dealer_emp_id":row.dealer_emp_id,  
        "order_no":row.order_no, 
        "order_date":row.date
      }
      
      this.reportService.gatPendingOrderPaymentDetail(environment.get_pendingOrder_details,this.paymentObj).subscribe(
        data => {
          this.popUpData =  data;
          this.displayApprove=true;
          console.log(this.popUpData);
        },
        err => {
          //this.errors = err;
        }
      );

    }

}
