import {ModuleWithProviders, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {AuthGuard, SharedModule} from '../shared';
import {TrainingComponent} from './training.component';

const trainingRouting: ModuleWithProviders = RouterModule.forChild([
    {
        path: 'training',
        component: TrainingComponent
    }
]);

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        trainingRouting
    ],
    declarations: [TrainingComponent]
})
export class TrainingModule {
}
