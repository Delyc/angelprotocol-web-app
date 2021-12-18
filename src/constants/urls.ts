import { chainIDs } from "contracts/types";

export const aws_endpoint =
  "https://mu2d2e0oj0.execute-api.us-east-1.amazonaws.com";
export const apes_endpoint =
  "https://9t0u8zpqjk.execute-api.us-east-1.amazonaws.com";

//terra urls
export const terra_lcds: URL_GROUP = {
  [chainIDs.testnet]: "https://bombay-lcd.terra.dev",
  [chainIDs.mainnet]: "https://lcd.terra.dev",
  [chainIDs.localterra]: "http://localhost:3060",
};

export const terra_rpcs: URL_GROUP = {
  [chainIDs.testnet]: "",
  [chainIDs.mainnet]:
    "https://columbus-5--rpc--archive.datahub.figment.io/apikey/6a264141abfde52c7f2ac6473e587eff",
  [chainIDs.localterra]: "",
};

//cosmos urls
export const cosmos4_lcds: URL_GROUP = {
  [chainIDs.cosmos_4]:
    "https://cosmoshub-4--lcd--full.datahub.figment.io/apikey/afe639fa07917ec085c0ce737ab39e67",
  [chainIDs.cosmos_test]: "https://api.testnet.cosmos.network:443",
};

export const cosmos4_rpcs: URL_GROUP = {
  [chainIDs.cosmos_4]:
    "https://cosmoshub-4--rpc--full.datahub.figment.io/apikey/afe639fa07917ec085c0ce737ab39e67",
  [chainIDs.cosmos_test]:
    "https://cosmoshub-4--lcd--full.datahub.figment.io/apikey/afe639fa07917ec085c0ce737ab39e67",
};

//ethereum
export const eth_rpcs: URL_GROUP = {
  [chainIDs.eth_main]:
    "https://mainnet.infura.io/v3/f7ca16d6c4704dee939ca7557896cf07",
  [chainIDs.eth_ropsten]:
    "https://ropsten.infura.io/v3/f7ca16d6c4704dee939ca7557896cf07",
  [chainIDs.eth_kovan]:
    "https://kovan.infura.io/v3/f7ca16d6c4704dee939ca7557896cf07",
};

type URL_GROUP = {
  [index: string]: string;
};
