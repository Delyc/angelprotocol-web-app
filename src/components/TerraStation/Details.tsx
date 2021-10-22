import { useWallet, WalletStatus } from "@terra-money/wallet-provider";
import { Coin } from "@terra-money/terra.js";
import { IoClose } from "react-icons/io5";
import Holdings from "./Holdings";
import Address from "./Address";
import Portal from "./Portal";

type Props = {
  coinData: Coin.Data[];
  closeHandler: () => void;
  chainId: string;
};

export default function Details(props: Props) {
  const { disconnect, status, wallets } = useWallet();
  const isConnected = status === WalletStatus.WALLET_CONNECTED;
  const isEmpty = props.coinData.length <= 0;
  const addr = wallets[0]?.terraAddress;
  const handleDisconnect = () => disconnect();

  return (
    <div className="z-50 grid grid-rows-a1a absolute top-full mt-2 bg-white w-full left-0 rounded-md overflow-hidden shadow-lg">
      <button
        className="text-white absolute top-2 right-2"
        onClick={props.closeHandler}
      >
        <IoClose />
      </button>
      <div className="bg-angel-grey text-white-grey uppercase text-sm p-2">
        network : {props.chainId}
      </div>
      <Address address={addr} />
      <Portal address={addr} />
      {(!isEmpty && <Holdings coinData={props.coinData} />) || (
        <span className="text-white-grey p-10 text-center text-sm uppercase">
          Wallet is empty
        </span>
      )}
      <button
        disabled={!isConnected}
        onClick={handleDisconnect}
        className="uppercase text-sm bg-blue-accent hover:bg-angel-blue p-2 text-white"
      >
        disconnect
      </button>
    </div>
  );
}
