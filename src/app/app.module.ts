import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/Http';
import {RouterModule}   from '@angular/router';

import {AppComponent} from './app.component';
import {TestUserServiceComponent} from './component/test_service_component/test-user-service/test-user-service.component';
import {TestTeamServiceComponent} from './component/test_service_component/test-team-service/test-team-service.component';
import {TestSecurityServiceComponent} from './component/test_service_component/test-security-service/test-security-service.component';
import {TestPlayerAccountServiceComponent} from './component/test_service_component/test-player-account-service/test-player-account-service.component';
import { TestGameServiceComponent } from './component/test_service_component/test-game-service/test-game-service.component';
import { TestAddressServiceComponent } from './component/test_service_component/test-address-service/test-address-service.component';
import { MenuComponent } from './component/shared/menu/menu.component';
import { LogoComponent } from './component/shared/logo/logo.component';
import { NewsComponent } from './component/news/news/news.component';
import { HomeComponent } from './component/home/home/home.component';
import { EventsComponent } from './component/events/events/events.component';
import { StreamingsComponent } from './component/streamings/streamings/streamings.component';
import { WizardComponent } from './component/sign_up/wizard/wizard.component';
import { Step0Component } from './component/sign_up/wizard/step0/step0.component';
import { Step1Component } from './component/sign_up/wizard/step1/step1.component';
import { Step2Component } from './component/sign_up/wizard/step2/step2.component';
import { Step3Component } from './component/sign_up/wizard/step3/step3.component';
import { Step4Component } from './component/sign_up/wizard/step4/step4.component';
import { Step5Component } from './component/sign_up/wizard/step5/step5.component';
import { Step6Component } from './component/sign_up/wizard/step6/step6.component';
import { Step7Component } from './component/sign_up/wizard/step7/step7.component';


@NgModule({
  declarations: [
    AppComponent,
    TestUserServiceComponent,
    TestTeamServiceComponent,
    TestGameServiceComponent,
    TestSecurityServiceComponent,
    TestPlayerAccountServiceComponent,
    TestAddressServiceComponent,
    MenuComponent,
    LogoComponent,
    NewsComponent,
    HomeComponent,
    EventsComponent,
    StreamingsComponent,
    WizardComponent,
    Step0Component,
    Step1Component,
    Step2Component,
    Step3Component,
    Step4Component,
    Step5Component,
    Step6Component,
    Step7Component
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot([
      {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full'

      },
      {
        path: 'home',
        component: HomeComponent
      },
      {
        path: 'news',
        component: NewsComponent
      },
      {
        path: 'streamings',
        component: StreamingsComponent
      },
      {
        path: 'events',
        component: EventsComponent
      },
      /*ROUTE DE TEST POUR LES SERVICES*/
      {
        path: 'users',
        component: TestUserServiceComponent
      },
      {
        path: 'signup',
        component: WizardComponent
      },
      {
        path: 'signup/step0',
        component: Step0Component
      },
      {
        path: 'signup/step1',
        component: Step1Component
      },
      {
        path: 'signup/step2',
        component: Step2Component
      },
      {
        path: 'signup/step3',
        component: Step3Component
      },
      {
        path: 'signup/step4',
        component: Step4Component
      },
      {
        path: 'signup/step4',
        component: Step4Component
      },
      {
        path: 'signup/step5',
        component: Step5Component
      },
      {
        path: 'signup/step6',
        component: Step6Component
      },
      {
        path: 'signup/step7',
        component: Step7Component
      },
      {
        path: 'teams',
        component: TestTeamServiceComponent
      },
      {
        path: 'auth',
        component: TestSecurityServiceComponent
      },
      {
        path: 'player-account',
        component: TestPlayerAccountServiceComponent
      },
      {
        path: 'game',
        component: TestGameServiceComponent
      },
      {
        path: 'address',
        component: TestAddressServiceComponent
      }
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
