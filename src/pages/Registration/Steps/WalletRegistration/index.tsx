import { useState } from "react";
import { useGetWallet } from "contexts/WalletContext";
import Icon from "components/Icon";
import { useRegState, withStepGuard } from "../StepGuard";
import ChooseWallet from "./ChooseWallet";
import RegisteredWallet from "./RegisteredWallet";
import WalletSubmission from "./WalletSubmission";

function WalletRegistration() {
  const {
    data: { wallet: prevWallet },
  } = useRegState<3>();
  const { wallet, isLoading } = useGetWallet();

  //save prevWallet to intermediate state
  const [prevAddr, setPrevAddr] = useState(prevWallet?.address);

  if (prevAddr) {
    return (
      <RegisteredWallet onChange={() => setPrevAddr("")} address={prevAddr} />
    );
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center gap-2">
        <Icon type="Loading" className="animate-spin" />
        <span>Wallet is loading</span>
      </div>
    );
  }

  if (!wallet) {
    return <ChooseWallet />;
  }

  return <WalletSubmission {...wallet} />;
}

export default withStepGuard(WalletRegistration);