import {Injectable} from "@angular/core";
import {web3_api} from "../config.global";
import Web3 from "web3";

@Injectable()
export class Web3AdminTools {

  public web3 = null;
  public contract_address = null;

  constructor(contract_address){
    this.web3 = new Web3(new Web3.providers.HttpProvider(web3_api));
    this.contract_address = contract_address;
  }

  set_max_cap(){

  }

  set_individual_cap(){

  }

  set_token_address(){

  }

  set_dest_address(){

  }

  send_funds(){
  }

}
