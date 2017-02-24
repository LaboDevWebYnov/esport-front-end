
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
// sample data we would get back from an api

export class TestPlayerAccountServiceComponent implements OnInit {

  playerAccountApiJson: Object;
  playerAccountGetById: Object;
  playerAccountGetByUserId: Object;
  playerAccountGetByLogin: Object;
  updatedPlayerAccount:Object;
  response: Object;


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
  private getItemPlayerAccountById(query : string): void {
    this.playerAccountServiceInstance
      .GetSinglePlayerAccountById(query)
      .subscribe(
        data => this.playerAccountGetById = data,
        error => console.log(error),
        () => console.log('get One Player Account by Id',this.playerAccountGetById)//console.log('get All Items complete')
      );
  }
  private getItemPlayerAccountByUserId(query : string): void {
    this.playerAccountServiceInstance
      .GetSinglePlayerAccountByUserId(query)
      .subscribe(
        data => this.playerAccountGetByUserId = data,
        error => console.log(error),
        () => console.log('get One Player Account by userId',this.playerAccountGetByUserId)//console.log('get All Items complete')
      );
  }
  private getItemPlayerAccountByLogin(query : string): void {
    this.playerAccountServiceInstance
      .GetSinglePlayerAccountByLogin(query)
      .subscribe(
        data => this.playerAccountGetByLogin = data,
        error => console.log(error),
        () => console.log('get One Player Account by Login',this.playerAccountGetByLogin)//console.log('get All Items complete')
      );
  }
  private addPlayerAccount(addPlayerAccount : AddNewPlayerAccount, userid : string, gameid : string): void {

    this.playerAccountServiceInstance
      .AddPlayerAccount(addPlayerAccount, userid, gameid)
      .subscribe(
        data => this.response = data,
        error => console.log(error,this.response),
        () => console.log('Add player account complete', this.response)
      );
  }
  private deletePlayerAccount(query : string): void {
    this.playerAccountServiceInstance
      .DeletePlayerAccount(query)
      .subscribe(
        data => this.response = data,
        error => console.log(error),
        () => console.log('Delete player account complete', this.response)
      );
  }

  private updatePlayerAccount(playerAccountid : string, playerAccount: AddNewPlayerAccount): void {
    this.playerAccountServiceInstance
      .UpdatePlayerAccount(playerAccountid, playerAccount)
      .subscribe(
        data => this.response = data,
        error => console.log(error),
        () => console.log('Update player account complete', this.response)
      );
  }


  ngOnInit() {
    this.getAllItemsPlayerAccount();
    //this.getItemPlayerAccountById();
    //this.getItemPlayerAccountByUserId();
    //this.getItemPlayerAccountByLogin();
    //this.addPlayerAccount();
    //this.deletePlayerAccount();
  }
  public submitAddForm():void{
    var addPlayerAccount: AddNewPlayerAccount = {
      login: (<HTMLInputElement>document.getElementById('login')).value,

    };
    var userId:string = (<HTMLInputElement>document.getElementById('userid')).value;
    var gameId:string = (<HTMLInputElement>document.getElementById('gameid')).value;
    this.addPlayerAccount(addPlayerAccount,userId,gameId);
    console.log('test add');
  }

  public submitUpdateForm():void{
    var  id:string = (<HTMLInputElement>document.getElementById('playerAccountId')).value;
    var  updatePlayerAccount:AddNewPlayerAccount = {
      login:(<HTMLInputElement>document.getElementById('playerAccountLogin')).value
    };
    this.updatePlayerAccount(id, updatePlayerAccount);
    console.log('test update');
  }

  public onSelectPlayerAccount(id : string):void{
    console.log("Id " +id);
    this.getItemPlayerAccountById(id);
  }

}
