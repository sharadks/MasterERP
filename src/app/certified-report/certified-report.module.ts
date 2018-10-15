import {ModuleWithProviders, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {AuthGuard, SharedModule} from '../shared';
import {CertifiedReportComponent} from './certified-report.component';
import {ChartModule} from 'primeng/primeng';
import {DialogModule} from 'primeng/primeng';
import {DataTableModule} from 'primeng/primeng';
import { Component, OnInit } from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

const certifiedReportRouting: ModuleWithProviders = RouterModule.forChild([
    {
        path: 'certified-report',
        component: CertifiedReportComponent,
       // canActivate: [AuthGuard]
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
        DialogModule
    ],
    declarations: [CertifiedReportComponent]
})
export class CertifiedReportModule {
}
