import {ModuleWithProviders, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouterModule} from '@angular/router';
import {AppComponent} from './app.component';
import {AuthModule} from './auth/auth.module';
import {HomeModule} from './home/home.module';
import {LogoutModule} from './logout/logout.module';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {DataDictionaryModule} from './data-dictionary/data-dictionary.module';
import {DataQualityModule} from './data-quality/data-quality.module';
import {ReportAvailabilityModule} from './report-availability/report-availability.module';
import {CertifiedReportModule} from './certified-report/certified-report.module';
import {TrainingModule} from './training/training.module';
import {SelfserviceReportModule} from './selfservice-report/selfservice-report.module';
import {ChartModule} from 'primeng/primeng';
import {DataTableModule} from 'primeng/primeng';


import {
    ApiService,
    AuthGuard,
    FooterComponent,
    HeaderComponent,
    JwtService,
    SharedModule,
    UserService,
    ReportService
} from './shared';

const rootRouting: ModuleWithProviders = RouterModule.forRoot([], {useHash:false});

@NgModule({
    declarations: [
        AppComponent,
        FooterComponent,
        HeaderComponent
    ],
    exports: [],
    imports: [
        BrowserModule,
        AuthModule,
        HomeModule,
        rootRouting,
        SharedModule,
        NgbModule.forRoot(),
        LogoutModule,
        DataTableModule,
        DataDictionaryModule,
        DataQualityModule,
        ReportAvailabilityModule,
        CertifiedReportModule,
        TrainingModule,
        SelfserviceReportModule,
        ChartModule,
        DataTableModule
    ],
    providers: [
        ApiService,
        AuthGuard,
        JwtService,
        UserService,
        ReportService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
