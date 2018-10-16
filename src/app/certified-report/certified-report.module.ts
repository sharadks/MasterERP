import {ModuleWithProviders, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {AuthGuard, SharedModule} from '../shared';
import {CertifiedReportComponent} from './certified-report.component';
import {PendingOrderComponent} from './components/pendingorders';
import {OnlineDashboardComponent} from './components/onlineDashboard';
import {ChartModule} from 'primeng/primeng';
import {DialogModule} from 'primeng/primeng';
import {DataTableModule} from 'primeng/primeng';
import {TabMenuModule} from 'primeng/primeng';
import { Component, OnInit } from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

const certifiedReportRouting: ModuleWithProviders = RouterModule.forChild([
    {
        path: 'certified-report',
        component: CertifiedReportComponent,
       // canActivate: [AuthGuard],
       children: [
        {
            path: 'dashboard', 
            component: OnlineDashboardComponent
        },
        {
            path: 'pending-orders', 
            component: PendingOrderComponent
        },
        {
            path: 'pending-dispatch', 
            component: PendingOrderComponent
        },
        {
            path: 'cancel-orders', 
            component: PendingOrderComponent
        },
        {
            path: 'complete-orders', 
            component: PendingOrderComponent
        }
      ]
    }   
]);

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        certifiedReportRouting,
        ChartModule,
        DataTableModule,
        NgbModule,
        DialogModule,
        BrowserAnimationsModule,
        TabMenuModule
    ],
    declarations: [CertifiedReportComponent, PendingOrderComponent,OnlineDashboardComponent]
})
export class CertifiedReportModule {
}
