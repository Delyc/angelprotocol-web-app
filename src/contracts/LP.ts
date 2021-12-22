import { Dec, MsgExecuteContract, Coin } from "@terra-money/terra.js";
import { ConnectedWallet } from "@terra-money/wallet-provider";
import { contracts } from "constants/contracts";
import { denoms } from "constants/currency";
import {
  ContractQueryArgs,
  Pool,
  PoolBalance,
  Simulation,
} from "services/terra/types";
import Contract from "./Contract";
import { sc } from "./types";

export default class LP extends Contract {
  factory_address: string;
  pair_address: string;
  router_adddress: string;
  lp_address: string;
  halo_address: string;

  constructor(wallet?: ConnectedWallet) {
    super(wallet);
    this.factory_address = contracts[this.chainID][sc.loop_factory];
    this.pair_address = contracts[this.chainID][sc.loop_haloust_pair];
    this.router_adddress = contracts[this.chainID][sc.loop_router];
    this.lp_address = contracts[this.chainID][sc.loop_haloust_lp];
    this.halo_address = contracts[this.chainID][sc.halo_token];
  }

  gen_simul_args(): ContractQueryArgs {
    return {
      address: this.pair_address,
      msg: {
        simulation: {
          offer_asset: {
            info: {
              native_token: {
                denom: "uusd",
              },
            },
            amount: "0",
          },
          block_time: Math.round(new Date().getTime() / 1000 + 10),
        },
      },
    };
  }

  gen_pool_args(): ContractQueryArgs {
    return { address: this.pair_address, msg: { pool: {} } };
  }

  gen_pairInfo_args() {
    return {
      address: this.pair_address,
      msg: {
        pair: {
          asset_infos: [
            { token: { contract_addr: this.lp_address } },
            { native_token: { denom: "uusd" } },
          ],
        },
      },
    };
  }

  //simul on demand
  async pairSimul(offer_amount: number, from_native: boolean) {
    const offer_uamount = new Dec(offer_amount).mul(1e6).toInt().toString();
    const offer_asset = from_native
      ? {
          native_token: {
            denom: "uusd",
          },
        }
      : {
          token: {
            contract_addr: this.halo_address,
          },
        };
    const result = await this.query<Simulation>(this.pair_address, {
      simulation: {
        offer_asset: {
          info: offer_asset,
          amount: offer_uamount,
        },
        block_time: Math.round(new Date().getTime() / 1000 + 10),
      },
    });
    return result;
  }

  //pool on demand
  async getPoolBalance(): Promise<PoolBalance> {
    const result = await this.query<Pool>(this.pair_address, { pool: {} });
    return {
      token: result.assets[0].amount,
      native_token: result.assets[1].amount,
    };
  }

  async createSellTx(
    halo_amount: number,
    belief_price: string, //"e.g '0.05413'"
    max_spread: string //"e.g 0.02 for 0.02%"
  ) {
    this.checkWallet();
    const uhalo_amount = new Dec(halo_amount).mul(1e6).toInt().toString();
    const sell_msg = new MsgExecuteContract(
      this.walletAddr!,
      this.halo_address,
      {
        send: {
          contract: this.pair_address,
          amount: uhalo_amount,
          msg: btoa(
            JSON.stringify({
              swap: { belief_price, max_spread },
            })
          ),
        },
      }
    );
    const fee = await this.estimateFee([sell_msg]);
    return { msgs: [sell_msg], fee };
  }

  async createBuyTx(
    ust_amount: number,
    belief_price: string, //"e.g '0.05413'"
    max_spread: string //"e.g 0.02 for 0.02%"
  ) {
    this.checkWallet();
    const uust_amount = new Dec(ust_amount).mul(1e6).toInt().toString();
    const buy_msg = new MsgExecuteContract(
      this.walletAddr!,
      this.pair_address,
      {
        swap: {
          offer_asset: {
            info: {
              native_token: {
                denom: denoms.uusd,
              },
            },
            amount: uust_amount,
          },
          belief_price,
          max_spread,
          // to: Option<HumanAddr>
        },
      },
      [new Coin(denoms.uusd, uust_amount)]
    );
    const fee = await this.estimateFee([buy_msg]);
    return { msgs: [buy_msg], fee };
  }
}