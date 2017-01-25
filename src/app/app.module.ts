import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import {HttpModule} from '@angular/Http';
import {RouterModule}   from '@angular/router';

import {AppComponent} from './app.component';
import {TestUserServiceComponent} from './component/test_service_component/test-user-service/test-user-service.component';
import {TestTeamServiceComponent} from './component/test_service_component/test-team-service/test-team-service.component';
import {TestSecurityServiceComponent} from './component/test_service_component/test-security-service/test-security-service.component';
import {TestPlayerAccountServiceComponent} from './component/test_service_component/test-player-account-service/test-player-account-service.component';

import {TestGameServiceComponent} from './component/test_service_component/test-game-service/test-game-service.component';
import {TestAddressServiceComponent} from './component/test_service_component/test-address-service/test-address-service.component';
import {MenuComponent} from './component/shared/menu/menu.component';
import {LogoComponent} from './component/shared/logo/logo.component';
import {NewsComponent} from './component/news/news/news.component';
import {HomeComponent} from './component/home/home/home.component';
import {EventsComponent} from './component/events/events/events.component';
import {StreamingsComponent} from './component/streamings/streamings/streamings.component';
import {ProfileUserComponent} from './component/profile-user/profile-user.component';
import {UserBannerComponent} from './component/profile-user/user-banner/user-banner.component';
import {UserSocialComponent} from './component/profile-user/user-social/user-social.component';
import {UserGamesComponent} from './component/profile-user/user-games/user-games.component';
import {UserResultsComponent} from './component/profile-user/user-results/user-results.component';
import {UserHistoricComponent} from './component/profile-user/user-historic/user-historic.component';
import {UserNewsComponent} from './component/profile-user/user-news/user-news.component';
import { AuthComponent } from './component/auth/auth/auth.component';

import { WizardComponent } from './component/sign_up/wizard/wizard.component';
import { Step0Component } from './component/sign_up/wizard/step0/step0.component';
import { Step1Component } from './component/sign_up/wizard/step1/step1.component';
import { Step2Component } from './component/sign_up/wizard/step2/step2.component';
import { Step3Component } from './component/sign_up/wizard/step3/step3.component';
import { Step4Component } from './component/sign_up/wizard/step4/step4.component';
import { Step5Component } from './component/sign_up/wizard/step5/step5.component';
import { Step6Component } from './component/sign_up/wizard/step6/step6.component';
import { Step7Component } from './component/sign_up/wizard/step7/step7.component';
import { BlueSeparationBarComponent } from './component/profile-user/blue-separation-bar/blue-separation-bar.component';


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
    ProfileUserComponent,
    UserBannerComponent,
    UserSocialComponent,
    UserGamesComponent,
    UserResultsComponent,
    UserHistoricComponent,
    UserNewsComponent,
    AuthComponent,
    UserNewsComponent,
    WizardComponent,
    Step0Component,
    Step1Component,
    Step2Component,
    Step3Component,
    Step4Component,
    Step5Component,
    Step6Component,
    Step7Component,
    BlueSeparationBarComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule,
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
        path: 'profile',
        component: ProfileUserComponent
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
        path: 'signup/step1/:email',
        component: Step1Component
      },
      {
        path: 'signup/step2/:token',
        component: Step2Component,
      },
      {
        path: 'signup/step3/:token',
        component: Step3Component
      },
      {
        path: 'signup/step4/:token',
        component: Step4Component
      },
      {
        path: 'signup/step5/:token',
        component: Step5Component
      },
      {
        path: 'signup/step6/:token',
        component: Step6Component
      },
      {
        path: 'signup/step7/:token',
        component: Step7Component
      },
      {
        path: 'teams',
        component: TestTeamServiceComponent
      },
      {
        path: 'auth',
        component: AuthComponent
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
