import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {HttpModule} from '@angular/http';
import {RouterModule}   from '@angular/router';
import { CoolStorageModule } from 'angular2-cool-storage';
import { ChartsModule } from 'ng2-charts';



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
import {DetailsTournamentComponent} from './component/tournament/details-tournament/details-tournament.component';

import { WizardComponent } from './component/sign_up/wizard/wizard.component';
import { Step0Component } from './component/sign_up/wizard/step0/step0.component';
import { Step1Component } from './component/sign_up/wizard/step1/step1.component';
import { Step2Component } from './component/sign_up/wizard/step2/step2.component';
import { Step3Component } from './component/sign_up/wizard/step3/step3.component';
import { Step4Component } from './component/sign_up/wizard/step4/step4.component';
import { Step5Component } from './component/sign_up/wizard/step5/step5.component';
import { Step6Component } from './component/sign_up/wizard/step6/step6.component';
import { Step7Component } from './component/sign_up/wizard/step7/step7.component';
import { LogoutComponent } from './component/auth/logout/logout.component';
import { BlueSeparationBarComponent } from './component/blue_bar/blue-separation-bar/blue-separation-bar.component';
import { VerticalBlueSeparationComponent } from './component/blue_bar/vertical-blue-separation/vertical-blue-separation.component';
import { BlueSeparationBarSmallComponent } from './component/blue_bar/blue-separation-bar-small/blue-separation-bar-small.component';
import { TeamComponent } from './component/team/team/team.component';
import { ProfilePlayerAccountComponent } from './component/profile-player-account/profile-player-account.component';
import { PlayerAccountBannerComponent } from './component/profile-player-account/player-account-banner/player-account-banner.component';
import { PlayerAccountDetailsComponent } from './component/profile-player-account/player-account-details/player-account-details.component';
import { PlayerAccountHistoricComponent } from './component/profile-player-account/player-account-historic/player-account-historic.component';
import { CreateTeamComponent } from './component/team/create-team/create-team.component';
import { SelectTeamComponent } from './component/team/select-team/select-team.component';
import { DetailsTeamComponent } from './component/team/details-team/details-team.component';

import { Step1TeamComponent } from './component/team/create-team/step1-team/step1-team.component';
import { Step2TeamComponent } from './component/team/create-team/step2-team/step2-team.component';
import { Step3TeamComponent } from './component/team/create-team/step3-team/step3-team.component';

import { Step4TeamComponent } from './component/team/create-team/step4-team/step4-team.component';
import { Step5TeamComponent } from './component/team/create-team/step5-team/step5-team.component';

import { SearchTeamComponent } from './component/team/search-team/search-team.component';
import { UserInfoComponent } from './component/profile-user/user-info/user-info.component';
import { SliderHomeComponent } from './component/home/slider-home/slider-home.component';
import { PlayerAccountLastGamesComponent } from './component/profile-player-account/player-account-last-games/player-account-last-games.component';
import { StatsGamesComponent } from './component/home/stats-games/stats-games.component';

import { PlayerAccountLastGameLolComponent } from './component/profile-player-account/player-account-last-game-lol/player-account-last-game-lol.component';
import { FooterComponent } from './component/footer/footer.component';
import { ContactComponent } from './component/contact/contact.component';
import { Step1TournamentComponent } from './component/tournament/create-tournament/step1-tournament/step1-tournament.component';
import { Step2TournamentComponent } from './component/tournament/create-tournament/step2-tournament/step2-tournament.component';
import { Step3TournamentComponent } from './component/tournament/create-tournament/step3-tournament/step3-tournament.component';
import { Step4TournamentComponent } from './component/tournament/create-tournament/step4-tournament/step4-tournament.component';
import { Step5TournamentComponent } from './component/tournament/create-tournament/step5-tournament/step5-tournament.component';
import { InformationsComponent } from './component/tournament/details-tournament/informations/informations.component';
import { ParticipantsComponent } from './component/tournament/details-tournament/participants/participants.component';
import { MatchesComponent } from './component/tournament/details-tournament/matches/matches.component';

import {TournamentsComponent} from './component/tournament/tournaments/tournaments.component';
import { MessageComponent } from './component/message/message.component';
import { HomeConnectedComponent } from './component/home_connected/home-connected/home-connected.component';
import { HeaderConnectedComponent } from './component/home_connected/header-connected/header-connected.component';
import { TournoisConnectedComponent } from './component/home_connected/tournois-connected/tournois-connected.component';
import { FriendsConnectedComponent } from './component/home_connected/friends-connected/friends-connected.component';
import { FeedConnectedComponent } from './component/home_connected/feed-connected/feed-connected.component';
import { TeamConnectedComponent } from './component/home_connected/team-connected/team-connected.component';
import { PlayerAccountConnectedComponent } from './component/home_connected/player-account-connected/player-account-connected.component';




@NgModule({
  declarations: [
    TeamComponent,
    DetailsTeamComponent,
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
    LogoutComponent,
    BlueSeparationBarComponent,
    BlueSeparationBarSmallComponent,
    VerticalBlueSeparationComponent,
    TeamComponent,
    ProfilePlayerAccountComponent,
    PlayerAccountBannerComponent,
    PlayerAccountDetailsComponent,
    PlayerAccountHistoricComponent,

    CreateTeamComponent,
    Step1Component,
    Step1TeamComponent,
    Step2TeamComponent,
    Step3TeamComponent,
    CreateTeamComponent,
    SelectTeamComponent,
    DetailsTeamComponent,
    Step4TeamComponent,
    Step5TeamComponent,
    SearchTeamComponent,
    UserInfoComponent,
    SliderHomeComponent,
    PlayerAccountLastGamesComponent,
    StatsGamesComponent,
    PlayerAccountLastGameLolComponent,
    FooterComponent,
    TournamentsComponent,
    ContactComponent,
    DetailsTournamentComponent,
    Step1TournamentComponent,
    Step2TournamentComponent,
    Step3TournamentComponent,
    Step4TournamentComponent,
    Step5TournamentComponent,
    InformationsComponent,
    ParticipantsComponent,
    MatchesComponent,
    MessageComponent,
    HomeConnectedComponent,
    HeaderConnectedComponent,
    TournoisConnectedComponent,
    FriendsConnectedComponent,
    FeedConnectedComponent,
    TeamConnectedComponent,
    PlayerAccountConnectedComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    HttpClientModule,
    CoolStorageModule,
    ReactiveFormsModule,
    ChartsModule,
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
        path: 'team',
        component: TeamComponent
      },
      {
        path: 'team-search',
        component: SearchTeamComponent
      },

      {
        path: 'team/create-team',
        component: CreateTeamComponent,
        children: [
          { path: '', redirectTo: 'step1-team', pathMatch: 'full' },
          { path: 'step1-team', component: Step1TeamComponent },
          { path: 'step2-team', component: Step2TeamComponent },
          { path: 'step3-team', component: Step3TeamComponent },
          { path: 'step4-team', component: Step4TeamComponent },
          { path: 'step5-team', component: Step5TeamComponent },
        ],
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
        component: TournamentsComponent
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
        path: 'logout',
        component: LogoutComponent
      },
      {
        path: 'player-account/:playerAccountId',
        component: ProfilePlayerAccountComponent
      },
      {
        path: 'team/:teamid',
        component: DetailsTeamComponent
      },
      {
        path: 'contact',
        component: ContactComponent
      },
      {
        path: 'events/detail/:toornamentId',
        component: DetailsTournamentComponent
      },
      {
        path: 'events/create/step1',
        component: Step1TournamentComponent
      },
      {
        path: 'events/create/step2',
        component: Step2TournamentComponent
      },
      {
        path: 'message',
        component: MessageComponent
      },
      {
        path: 'home-connected',
        component: HomeConnectedComponent
      }
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
