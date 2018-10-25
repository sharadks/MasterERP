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
  public popUpData:any = {
    'amount': null,
	  'approval': null,
	  'bank_ref_no': null,
	  'card_no': null,
	  'dealer_emp_id':null, 
	  'new_identity': null,
  	'order_date': null,
	  'order_no': null,
	  'order_status': null,
	  'payment_mode': null,
	  'portal_id': null,
	  'tracking_id': null,
	  'tran_id': null,
	  'type': null,
	  'user_id': null
  };
  public updateStatusObj:any = {}
  private paymentObj:any;
  private setApprove = {
    status:true
  };
  public StatusList:any = ['Approved'];
  public statusRejectList:any = ['Not Approved'];
  public selectedListType:any;
  public loading = false;

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
            this.pendingOrderList = data.data;
            if(this.pendingOrderList.length) {
              this.colValues = Object.keys(this.pendingOrderList[0]);
              for(let i=0;i<this.colValues.length;i++){
                if(this.colValues[i]!=='portal_id' && this.colValues[i]!=='dealer_id' && this.colValues[i]!=='tran_id' && this.colValues[i]!=='srno') {
                  this.cols.push({field: this.colValues[i], header: this.toCamelCase(this.colValues[i])});
                } 
              }  
           }
          },
          err => {
            //this.errors = err;
          }
        );
    }


    Action(row) {         
      this.paymentObj = {
        "tran_id" : row.tran_id, 
        "portal_id" : row.portal_id, 
        "type" : row.type,  
        "dealer_emp_id":row.dealer_emp_id,  
        "order_no":row.order_no, 
        "order_date":row.date
      }
      
      this.reportService.gatPendingOrderPaymentDetail(environment.get_pendingOrder_details,this.paymentObj).subscribe(
        data => {
          this.popUpData =  {
    'amount': data.amount,
	  'approval': data.approval,
	  'bank_ref_no': data.bank_ref_no,
	  'card_no': data.card_no,
	  'dealer_emp_id':data.dealer_emp_id, 
	  'new_identity': data.new_identity,
  	'order_date': data.order_date,
	  'order_no': data.order_no,
	  'order_status': data.order_status,
	  'payment_mode': data.payment_mode,
	  'portal_id': data.portal_id,
	  'tracking_id': data.tracking_id,
	  'tran_id': data.tran_id,
	  'type': data.type,
	  'user_id': data.user_id
          };
          this.displayApprove=true;
          console.log(this.popUpData);
        },
        err => {
          //this.errors = err;
        }
      );

    }

    updateStatus(status) {    
      this.updateStatusObj = {
        "tran_id": this.popUpData.tran_id,
        "portal_id": this.popUpData.portal_id,
        "type": this.popUpData.type,
        "dealer_emp_id": this.popUpData.dealer_emp_id,
        "order_no": this.popUpData.order_no,
        "order_date": this.popUpData.order_date,
        "order_status": this.popUpData.order_status,
        "approval": this.selectedListType,
        "payment_mode": this.popUpData.payment_mode,
        "bank_ref_no": this.popUpData.bank_ref_no,
        "tracking_id": this.popUpData.tracking_id,
        "card_no": this.popUpData.card_no,
        "amount": this.popUpData.amount,
        "user_id": this.popUpData.user_id
      }
      this.reportService.updatePendingOrderStatus(environment.update_order_status,this.updateStatusObj).subscribe(
        data => {
         // console.log(data);
          this.getDefaultData();
        },
        err => {
          //this.errors = err;
        }
      );

    }



    getDefaultData() {
      this.displayApprove = false;
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
            this.pendingOrderList = data.data;
            if(this.pendingOrderList.length) {
              this.colValues = Object.keys(this.pendingOrderList[0]);
              for(let i=0;i<this.colValues.length;i++){
                if(this.colValues[i]!=='portal_id' && this.colValues[i]!=='dealer_id' && this.colValues[i]!=='tran_id' && this.colValues[i]!=='srno') {
                  this.cols.push({field: this.colValues[i], header: this.toCamelCase(this.colValues[i])});
                }
              }  
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
