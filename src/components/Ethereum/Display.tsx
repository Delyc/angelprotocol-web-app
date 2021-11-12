// import metaMaskIcon from "assets/icons/wallets/metamask.png";
import Icon from "components/WalletSuite/Icon";
import Details from "./Details";
import useDisplay from "./useDisplay";
export default function Display() {
  const { maskedAddr, balance, detailsShown, toggleDetails, hideDetails } =
    useDisplay();
  //this component won't be rendered if wallet is not connected

  return (
    <div className="flex">
      <button onClick={toggleDetails} className="flex items-center py-2 px-3">
        {/* <img src={metaMaskIcon} alt="" className="w-6 h-6 rounded-full mr-2 " /> */}
        <Icon />
        <span className="pr-2 text-sm text-white-grey hidden sm:block">
          {maskedAddr}
        </span>
        <span className="pl-2 text-sm text-sm text-white-grey sm:border-l">
          ETH {balance}
        </span>
      </button>
      {detailsShown && <Details closeHandler={hideDetails} />}
    </div>
  );
}