import {AfterViewInit, Component, Input} from '@angular/core';
import {AlertController, NavParams} from 'ionic-angular';

declare let require: any;
declare let window: any;
const Web3 = require('web3');


@Component({
  selector: 'page-hello-ionic',
  templateUrl: 'hello-ionic.html'
})
export class HelloIonicPage implements AfterViewInit{
  web3 = undefined;
  eth_cap = 0;
  current_eth = 0;
  percentage = 0;
  test=123;
  address=undefined;
  abi= [{"constant":false,"inputs":[{"name":"_fee","type":"uint64"}],"name":"set_fee","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"contract_checksum","outputs":[{"name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_address","type":"address[]"}],"name":"add_whitelist","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"send_funds","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"balances","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"value","type":"uint256"}],"name":"withdraw_eth","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"withdrawn_tokens","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_token","type":"address"}],"name":"set_token_address","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"received_tokens","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"ind_max_cap","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"sale","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_cap","type":"uint256"}],"name":"set_token_cap","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_min_cap","type":"uint64"},{"name":"_max_cap","type":"uint64"}],"name":"set_min_max_cap","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"user","type":"address"}],"name":"withdraw_all","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"ind_min_cap","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"whitelist_enabled","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"whitelist","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"kill_switch","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"sent_funds","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"allow_payable","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"contract_eth_value","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"dev_fee","outputs":[{"name":"","type":"uint64"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"developer","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"deposit","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[{"name":"password","type":"string"}],"name":"activate_kill_switch","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"deployer","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"fee_in_tokens","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"eth_cap","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"fee","outputs":[{"name":"","type":"uint64"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_whitelist","type":"bool"}],"name":"trigger_whitelist","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_sale","type":"address"}],"name":"set_addresses","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"token","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"payable":true,"stateMutability":"payable","type":"fallback"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_from","type":"address"},{"indexed":false,"name":"_value","type":"uint256"}],"name":"DepositEther","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_from","type":"address"},{"indexed":false,"name":"_value","type":"uint256"}],"name":"WithdrawEther","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_from","type":"address"},{"indexed":false,"name":"_dest_addr","type":"address"}],"name":"SetDestAddress","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_from","type":"address"},{"indexed":false,"name":"_token_addr","type":"address"}],"name":"SetTokenAddress","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_dest","type":"address"},{"indexed":false,"name":"_amount","type":"uint256"}],"name":"FundsSent","type":"event"}]
  wallet = undefined;
  contribution = "0";
  constructor(public alertCtrl: AlertController,public navParams: NavParams) {

  }

  ngAfterViewInit() {
    // if (typeof window.web3 !== 'undefined') {
    //   this.web3 = new Web3(window.web3.currentProvider);
    // } else {
    //   // set the provider you want from Web3.providers
    //   this.web3 = new Web3(new Web3.providers.HttpProvider("https://mainnet.infura.io/mew"));
    // }
    this.address = this.navParams.get("contract");
    console.log(this.address);
    this.web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:7545"));
    // console.log(contract.methods.eth_cap);
    this.check_progress();

    this.showWalletPrompt();
  }

  check_progress(){
    console.log(this.address);
    if(this.address !== undefined){
      var contract =new this.web3.eth.Contract(this.abi,this.address);
      contract.methods.eth_cap().call().then(resp => {
        //do something with res here
        console.log(resp); //for example
        this.eth_cap = resp;
        console.log(this.test);
      });
      contract.methods.contract_eth_value().call().then(resp => {
        console.log(this.test);
        console.log(resp);
        this.current_eth = resp;
      });

    }

  }

  check_contribution_amount(){
    if(this.wallet !== undefined && this.address!== undefined){
      var contract =new this.web3.eth.Contract(this.abi,this.address);
      contract.methods.balances(this.wallet).call().then(resp => {
        //do something with res here
        console.log("Wallet Info");
        console.log(resp); //for example
        // this.eth_cap = resp;
        // console.log(this.test);
        this.contribution = resp;
      });
    }
  }

  toETH(wei){
    if(this.web3 === undefined){
      return 0;
    }
    else return this.web3.utils.fromWei(wei);

  }

  set_new_progress() {
    this.percentage = this.current_eth / this.eth_cap;
  }


  showPrompt() {
    let prompt = this.alertCtrl.create({
      title: 'Set Address',
      message: "Enter the contract address",
      inputs: [
        {
          name: 'address',
          placeholder: 'Address'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Save',
          handler: data => {
            console.log('Saved clicked');
            this.address = data.address;
            this.check_progress();
            this.check_contribution_amount();
          }
        }
      ]
    });
    prompt.present();
  }



  showWalletPrompt() {
    let prompt = this.alertCtrl.create({
      title: 'Set your wallet Address',
      message: "Enter your wallet address",
      inputs: [
        {
          name: 'address',
          placeholder: 'Address'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Save',
          handler: data => {
            console.log('Saved clicked');
            this.wallet = data.address;
            this.check_contribution_amount();
          }
        }
      ]
    });
    prompt.present();
  }



  loadProgress = 50
}
