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
    UserNewsComponent
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
        path: 'profile',
        component: ProfileUserComponent
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
