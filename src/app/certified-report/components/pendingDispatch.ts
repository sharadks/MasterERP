import { Component, OnInit } from '@angular/core';
import { Errors, ReportService, JwtService } from '../../shared';
import { environment } from '../../../environments/environment';
import * as enLocale from 'date-fns/locale/en';
import * as frLocale from 'date-fns/locale/fr';
import {NgbDateStruct, NgbCalendar} from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import {MenuItem} from 'primeng/primeng';

@Component({
  selector: 'app-pending-dispatch',
  templateUrl: './pendingDispatch.html'
  })
export class PendingDispatchComponent implements OnInit {

  private PendingDishpatchList:any;
  private postObject:any;
  private currentUser:any;
  private portalId : any;
  private colValues:any;
  private cols:any;
  private displayApprove= false;
  private displayCancel= false;
  private paymentObj:any;
  public popUpData:any = {
    'courier': null,
	  'docket_no': null,
	  'delivery_date': null,	 
	  'dealer_emp_id':null, 
	  'new_identity': null,
  	'order_date': null,
	  'order_no': null,
	  'dispatch_qty': null,
	  'mode_of_transport': null,
	  'portal_id': null,	
	  'tran_id': null,
	  'type': null,
	  'user_id': null
  };
  public updateStatusObj:any = {}

 
  public StatusList:any = ['Approved'];
  public statusRejectList:any = ['Not Approved'];
  public selectedListType:any;

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
      this.reportService.gatPendingforDispatchedOrders(environment.get_pendingDispatch_order,this.postObject).subscribe(
          data => {
            this.colValues=[];
            this.cols=[];
            //this.cols.push({field: 'Action', header: 'Action'})
            this.PendingDishpatchList = data.data;
            if(this.PendingDishpatchList.length) {
              this.colValues = Object.keys(this.PendingDishpatchList[0]);
              for(let i=0;i<this.colValues.length;i++){
                if(this.colValues[i]!=='portal_id' && this.colValues[i]!=='dealer_id' && this.colValues[i]!=='tran_id' && this.colValues[i]!=='srno') {
                  this.cols.push({field: this.colValues[i], header: this.toCamelCase(this.colValues[i])});
                }              }
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
      console.log(this.paymentObj);
      this.reportService.gatPendingDispatchedOrderPaymentDetail(environment.get_dispatchedorder_detail,this.paymentObj).subscribe(
        data => {
          this.popUpData =  {
            'courier': data.courier,
            'docket_no': data.docket_no,
            'delivery_date': data.delivery_date,	 
            'dealer_emp_id':this.paymentObj.dealer_emp_id,
            'new_identity': data.new_identity,
            'order_date': this.paymentObj.order_date,
            'order_no': this.paymentObj.order_no,
            'dispatch_qty': data.dispatch_qty,
            'mode_of_transport': data.mode_of_transport,
            'portal_id': this.paymentObj.portal_id,
            'tran_id': this.paymentObj.tran_id,
            'type': this.paymentObj.type,
            'user_id': data.user_id,
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
        "tran_id": this.paymentObj.tran_id,
        "portal_id": this.paymentObj.portal_id,
        "type": this.paymentObj.type,
        "dealer_emp_id": this.paymentObj.dealer_emp_id,
        "order_no": this.paymentObj.order_no,
        "order_date": this.paymentObj.order_date,
        "dispatch_qty": this.popUpData.dispatch_qty,
        "delivery_date": this.popUpData.delivery_date,
        "docket_no": this.popUpData.docket_no,
        "courier": this.popUpData.courier,
        "mode_of_transport": this.popUpData.mode_of_transport,        
        "user_id": this.popUpData.user_id
      }
      this.reportService.updatePendingDispatchedOrderStatus(environment.update_dispatchedorder_status,this.updateStatusObj).subscribe(
        data => {
          console.log(data);
          this.getDefaultData();
        },
        err => {
          //this.errors = err;
        }
      );

    }

    getDefaultData(){
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
      this.reportService.gatPendingforDispatchedOrders(environment.get_pendingDispatch_order,this.postObject).subscribe(
          data => {
            this.colValues=[];
            this.cols=[];
            //this.cols.push({field: 'Action', header: 'Action'})
            this.PendingDishpatchList = data.data;
            if(this.PendingDishpatchList.length) {
              this.colValues = Object.keys(this.PendingDishpatchList[0]);
              for(let i=0;i<this.colValues.length;i++){
                if(this.colValues[i]!=='portal_id' && this.colValues[i]!=='dealer_id' && this.colValues[i]!=='tran_id' && this.colValues[i]!=='srno') {
                  this.cols.push({field: this.colValues[i], header: this.toCamelCase(this.colValues[i])});
                }              }
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