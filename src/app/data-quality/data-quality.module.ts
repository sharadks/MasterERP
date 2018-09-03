import {ModuleWithProviders, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {AuthGuard, SharedModule} from '../shared';
import {DataQualityComponent} from './data-quality.component';

const dataQualityRouting: ModuleWithProviders = RouterModule.forChild([
    {
        path: 'data-quality',
        component: DataQualityComponent
    }
]);

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        dataQualityRouting
    ],
    declarations: [DataQualityComponent]
})
export class DataQualityModule {
}
