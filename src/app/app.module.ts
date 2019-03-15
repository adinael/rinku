import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { HttpClientModule} from '@angular/common/http';
import { SweetAlert2Module } from '@toverux/ngx-sweetalert2';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { NgSelectModule } from '@ng-select/ng-select';
import { AccordionModule } from 'primeng/accordion';
import { CalendarModule} from 'primeng/calendar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { TabMenuModule } from 'primeng/tabmenu';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServicesModule } from './services/services.module';
import { ConfigService } from './services/config.service';

export function ConfigLoader(configService: ConfigService) {
  return () => configService.getJSON();
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ServicesModule,
    HttpClientModule,
    SweetAlert2Module.forRoot(),
    AngularFontAwesomeModule,
    NgSelectModule,
    AccordionModule,
    BrowserAnimationsModule,
    CalendarModule,
    AutoCompleteModule,
    TabMenuModule
  ],
  providers: [
    ConfigService,
    {
      provide: APP_INITIALIZER,
      useFactory: ConfigLoader,
      deps: [ConfigService],
      multi: true,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
