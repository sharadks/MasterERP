import { Component, OnInit } from '@angular/core';
import { Errors, ReportService, JwtService } from '../shared';
import { environment } from '../../environments/environment';
import * as enLocale from 'date-fns/locale/en';
import * as frLocale from 'date-fns/locale/fr';
import {NgbDateStruct, NgbCalendar} from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import {MenuItem} from 'primeng/primeng';

@Component({
  selector: 'app-certified-report',
  templateUrl: './certified-report.component.html',
  styleUrls: ['./certified-report.component.css']
})
export class CertifiedReportComponent implements OnInit {
items: MenuItem[];

  constructor(private reportService: ReportService, private jwtService: JwtService, private calendar: NgbCalendar, private router:Router) {
    
  this.items = [
      {label: 'Dashboard Portal', icon: 'fa fa-fw fa-bar-chart', routerLink: ['dashboard']},
      {label: 'Pending Orders', icon: 'fa fa-fw fa-calendar', routerLink: ['pending-orders']},
      {label: 'Pending For Dispatch', icon: 'fa fa-fw fa-book', routerLink: ['pending-orders']},
      {label: 'Cancel Orders', icon: 'fa fa-fw fa-support', routerLink: ['pending-orders']},
      {label: 'Complete Orders', icon: 'fa fa-fw fa-twitter', routerLink: ['pending-orders']}
  ];   
      }
  ngOnInit() {

  }
}
