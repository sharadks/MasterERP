import { Component, OnInit } from '@angular/core';
import { Errors, ReportService } from '../shared';
import { environment } from '../../environments/environment';

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

  constructor(private reportService: ReportService) {
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
        this.postObject = 
        { 
        Draw : "1", "Start" : "1", "Length" : "222",
        Search : { "Value" : "", "Regex" : "" },
        Order : [{"Column" : "0", "Dir" : "asc"}, {"Column" : "1", "Dir" : ""}, {"Column" : "2", "Dir" : ""}],
        Columns : [{ "Data" : "", "Name" : "", "Searchable" : "true", "Orderable" : "false"}]
        }
   }

  ngOnInit() {
    this.reportService.getReportData(environment.report_path,this.postObject).subscribe(
        data => {
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

}
