


'use strict';
import {Injectable} from "@angular/core";
import Web3 from "web3";
import {web3_api,contract_abi} from "../config.global";

@Injectable()
export class Web3Tools {
  public web3 = null;
  public contract_address = "";

  constructor(){
    this.web3 = new Web3(new Web3.providers.HttpProvider(web3_api));
  }

  toETH(wei){
    if(this.web3 === null){
      this.init();
    }
    return this.web3.utils.fromWei(wei);
  }


  get_contribute_process(contract_address){
    console.log("Contract Address:" + contract_address);
    let eth_cap =0,current_eth =0;
    if(this.address !== undefined){
      var contract =new this.web3.eth.Contract(contract_abi,contract_address);
      contract.methods.eth_cap().call().then(resp => {
        //do something with res here
        console.log("Total："+ resp); //for example
        let eth_cap = resp;
      });
      contract.methods.contract_eth_value().call().then(resp => {
        console.log("Contributed："+ resp);
        let current_eth = resp;
      });
      return [eth_cap,current_eth];
    }

  }

  check_contribution_amount(wallet_address, contract_address){
    if(wallet_address !== undefined && contract_address!== undefined){
      let contribution_amount = 0;
      var contract =new this.web3.eth.Contract(contract_abi, contract_address);
      contract.methods.balances(wallet_address).call().then(resp => {
        //do something with res here
        console.log("Wallet Info:" + resp);
        contribution_amount = resp;
      });
      return contribution_amount;
    }
  }



  contribute_eth(){

  }






}
