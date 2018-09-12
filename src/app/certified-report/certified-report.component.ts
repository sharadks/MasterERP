import { Component, OnInit } from '@angular/core';

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

  constructor() {


    

    this.tableData = [
        {
            client: "Apple",
            dealer_id: 24,
            dealer_code: "1588146",
            dealer_name: "UMANG BUSINESS CONSULTANT PVT LTD",
            address: "UMANG BUSINESS CONSULTANT PVT LTD,55, N.S.B ROAD, RANIGANJ",
            city: "RANIGANJ",
            pin: "713347",
            state: "West Bengal",
            country: "India",
            pan: "AABCU1618E",
            gstin: "19AABCU1618E1ZK",
            contact_person: "RAHUL DASGUPTA",
            mobile: "7044059769",
            email: "udit@udgroup.co.in",
            designation: "Store Sales Executive",
            total_order: 2
        },
        {
            client: "Apple",
            dealer_id: 24,
            dealer_code: "1588146",
            dealer_name: "UMANG BUSINESS CONSULTANT PVT LTD",
            address: "UMANG BUSINESS CONSULTANT PVT LTD,55, N.S.B ROAD, RANIGANJ",
            city: "RANIGANJ",
            pin: "713347",
            state: "West Bengal",
            country: "India",
            pan: "AABCU1618E",
            gstin: "19AABCU1618E1ZK",
            contact_person: "RAHUL DASGUPTA",
            mobile: "7044059769",
            email: "udit@udgroup.co.in",
            designation: "Store Sales Executive",
            total_order: 2
        },
        {
            client: "Apple",
            dealer_id: 24,
            dealer_code: "1588146",
            dealer_name: "UMANG BUSINESS CONSULTANT PVT LTD",
            address: "UMANG BUSINESS CONSULTANT PVT LTD,55, N.S.B ROAD, RANIGANJ",
            city: "RANIGANJ",
            pin: "713347",
            state: "West Bengal",
            country: "India",
            pan: "AABCU1618E",
            gstin: "19AABCU1618E1ZK",
            contact_person: "RAHUL DASGUPTA",
            mobile: "7044059769",
            email: "udit@udgroup.co.in",
            designation: "Store Sales Executive",
            total_order: 2
        },
        {
            client: "Apple",
            dealer_id: 24,
            dealer_code: "1588146",
            dealer_name: "UMANG BUSINESS CONSULTANT PVT LTD",
            address: "UMANG BUSINESS CONSULTANT PVT LTD,55, N.S.B ROAD, RANIGANJ",
            city: "RANIGANJ",
            pin: "713347",
            state: "West Bengal",
            country: "India",
            pan: "AABCU1618E",
            gstin: "19AABCU1618E1ZK",
            contact_person: "RAHUL DASGUPTA",
            mobile: "7044059769",
            email: "udit@udgroup.co.in",
            designation: "Store Sales Executive",
            total_order: 2
        },
        {
            client: "Apple",
            dealer_id: 24,
            dealer_code: "1588146",
            dealer_name: "UMANG BUSINESS CONSULTANT PVT LTD",
            address: "UMANG BUSINESS CONSULTANT PVT LTD,55, N.S.B ROAD, RANIGANJ",
            city: "RANIGANJ",
            pin: "713347",
            state: "West Bengal",
            country: "India",
            pan: "AABCU1618E",
            gstin: "19AABCU1618E1ZK",
            contact_person: "RAHUL DASGUPTA",
            mobile: "7044059769",
            email: "udit@udgroup.co.in",
            designation: "Store Sales Executive",
            total_order: 2
        },
        {
            client: "Apple",
            dealer_id: 24,
            dealer_code: "1588146",
            dealer_name: "UMANG BUSINESS CONSULTANT PVT LTD",
            address: "UMANG BUSINESS CONSULTANT PVT LTD,55, N.S.B ROAD, RANIGANJ",
            city: "RANIGANJ",
            pin: "713347",
            state: "West Bengal",
            country: "India",
            pan: "AABCU1618E",
            gstin: "19AABCU1618E1ZK",
            contact_person: "RAHUL DASGUPTA",
            mobile: "7044059769",
            email: "udit@udgroup.co.in",
            designation: "Store Sales Executive",
            total_order: 2
        },
        {
            client: "Apple",
            dealer_id: 24,
            dealer_code: "1588146",
            dealer_name: "UMANG BUSINESS CONSULTANT PVT LTD",
            address: "UMANG BUSINESS CONSULTANT PVT LTD,55, N.S.B ROAD, RANIGANJ",
            city: "RANIGANJ",
            pin: "713347",
            state: "West Bengal",
            country: "India",
            pan: "AABCU1618E",
            gstin: "19AABCU1618E1ZK",
            contact_person: "RAHUL DASGUPTA",
            mobile: "7044059769",
            email: "udit@udgroup.co.in",
            designation: "Store Sales Executive",
            total_order: 2
        },
        {
            client: "Apple",
            dealer_id: 24,
            dealer_code: "1588146",
            dealer_name: "UMANG BUSINESS CONSULTANT PVT LTD",
            address: "UMANG BUSINESS CONSULTANT PVT LTD,55, N.S.B ROAD, RANIGANJ",
            city: "RANIGANJ",
            pin: "713347",
            state: "West Bengal",
            country: "India",
            pan: "AABCU1618E",
            gstin: "19AABCU1618E1ZK",
            contact_person: "RAHUL DASGUPTA",
            mobile: "7044059769",
            email: "udit@udgroup.co.in",
            designation: "Store Sales Executive",
            total_order: 2
        },
        {
            client: "Apple",
            dealer_id: 24,
            dealer_code: "1588146",
            dealer_name: "UMANG BUSINESS CONSULTANT PVT LTD",
            address: "UMANG BUSINESS CONSULTANT PVT LTD,55, N.S.B ROAD, RANIGANJ",
            city: "RANIGANJ",
            pin: "713347",
            state: "West Bengal",
            country: "India",
            pan: "AABCU1618E",
            gstin: "19AABCU1618E1ZK",
            contact_person: "RAHUL DASGUPTA",
            mobile: "7044059769",
            email: "udit@udgroup.co.in",
            designation: "Store Sales Executive",
            total_order: 2
        },
        {
	client: "Apple",
	dealer_id: 24,
	dealer_code: "1588146",
	dealer_name: "UMANG BUSINESS CONSULTANT PVT LTD",
	address: "UMANG BUSINESS CONSULTANT PVT LTD,55, N.S.B ROAD, RANIGANJ",
	city: "RANIGANJ",
	pin: "713347",
	state: "West Bengal",
	country: "India",
	pan: "AABCU1618E",
	gstin: "19AABCU1618E1ZK",
	contact_person: "RAHUL DASGUPTA",
	mobile: "7044059769",
	email: "udit@udgroup.co.in",
	designation: "Store Sales Executive",
	total_order: 2
}
    ];

    this.colValues = Object.keys(this.tableData[0]);
    for(let i=0;i<this.colValues.length;i++){
        this.cols.push({field: this.colValues[i], header: this.colValues[i]})
    }

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
   }

  ngOnInit() {
  }

}
