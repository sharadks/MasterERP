import {ModuleWithProviders, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {AuthGuard, SharedModule} from '../shared';
import {DataDictionaryComponent} from './data-dictionary.component';

const dataDictionaryRouting: ModuleWithProviders = RouterModule.forChild([
    {
        path: 'data-dictionary',
        component: DataDictionaryComponent
    }
]);

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        dataDictionaryRouting
    ],
    declarations: [DataDictionaryComponent]
})
export class DataDictionaryModule {
}
