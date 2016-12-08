
import { Component, OnInit } from '@angular/core';
import { Configuration } from '../../../../shared/app.constants';
import { AddNewPlayerAccount } from '../../../../shared/models/utils/create-player-account-object';
import { PlayerAccountService } from '../../../../shared/services/player-account.service';
import { User } from '../../../../shared/models/user';
import { Address } from '../../../../shared/models/address';
import { PlayerAccount } from '../../../../shared/models/player-account';

@Component({
  selector: 'app-test-player-account-service',
  templateUrl: './test-player-account-service.component.html',
  styleUrls: ['./test-player-account-service.component.css'],
  providers: [PlayerAccountService,Configuration]
})
export class TestPlayerAccountServiceComponent implements OnInit {

   playerAccountApiJson: Object;
   playerAccountGetById: Object;
   playerAccountGetByUserId: Object;
   playerAccountGetByLogin: Object;
   response: Object;

  AddPlayerAccount : AddNewPlayerAccount={

    login: "HelloWorld",
    gameId: "569104a0417130681bcf1586",
    userId: "569000574367285c00961282"

  };

  constructor(private playerAccountServiceInstance: PlayerAccountService) {}

   private getAllItemsPlayerAccount(): void {
     this.playerAccountServiceInstance
       .GetAllPlayerAccount()
       .subscribe(
        data => this.playerAccountApiJson = data,
         error => console.log(error),
         () => console.log('get All Items complete', this.playerAccountApiJson)
       );
   }
  private getItemPlayerAccountById(): void {
    this.playerAccountServiceInstance
      .GetSinglePlayerAccountById("5729cd638613b6dc11b1fdd1")
      .subscribe(
        data => this.playerAccountGetById = data,
        error => console.log(error),
        () => console.log('get One Player Account by Id',this.playerAccountGetById)//console.log('get All Items complete')
      );
  }
  private getItemPlayerAccountByUserId(): void {
    this.playerAccountServiceInstance
      .GetSinglePlayerAccountByUserId("569000574367285c00961282")
      .subscribe(
        data => this.playerAccountGetByUserId = data,
        error => console.log(error),
        () => console.log('get One Player Account by userId',this.playerAccountGetByUserId)//console.log('get All Items complete')
      );
  }
  private getItemPlayerAccountByLogin(): void {
    this.playerAccountServiceInstance
      .GetSinglePlayerAccountByLogin("leamonsqueezy")
      .subscribe(
        data => this.playerAccountGetByLogin = data,
        error => console.log(error),
        () => console.log('get One Player Account by Login',this.playerAccountGetByLogin)//console.log('get All Items complete')
      );
  }
  private addPlayerAccount(): void {
    console.log(JSON.stringify(this.AddPlayerAccount));
    this.playerAccountServiceInstance
      .AddPlayerAccount(this.AddPlayerAccount)
      .subscribe(
        data => this.response = data,
        error => console.log(error,this.response),
        () => console.log('Add User complete', this.response)
      );
  }
  private deletePlayerAccount(): void {
    this.playerAccountServiceInstance
      .DeletePlayerAccount("583ee5e74820682bc8c372e4")
      .subscribe(
        data => this.response = data,
        error => console.log(error),
        () => console.log('Delete User complete', this.response)
      );
  }
  ngOnInit() {
    //this.getAllItemsPlayerAccount();
    //this.getItemPlayerAccountById();
    //this.getItemPlayerAccountByUserId();
    //this.getItemPlayerAccountByLogin();
    //this.addPlayerAccount();
    this.deletePlayerAccount();
  }

}
