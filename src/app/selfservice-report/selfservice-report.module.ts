import {ModuleWithProviders, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {AuthGuard, SharedModule} from '../shared';
import {SelfserviceReportComponent} from './selfservice-report.component';

const serlServiceReportRouting: ModuleWithProviders = RouterModule.forChild([
    {
        path: 'selfservice-report',
        component: SelfserviceReportComponent
    }
]);

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        serlServiceReportRouting
    ],
    declarations: [SelfserviceReportComponent]
})
export class SelfserviceReportModule {
}
