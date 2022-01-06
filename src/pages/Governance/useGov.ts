import { Dec } from "@terra-money/terra.js";
import { getSpotPrice } from "components/Swapper/getSpotPrice";
import { useState, useEffect, useMemo } from "react";
import {
  useGovBalance,
  useHaloInfo,
  usePairSimul,
} from "services/terra/queriers";

export default function useGov() {
  const [staked, setStaked] = useState(0);
  const [percentStaked, setPercentStaked] = useState(0);

  const simul = usePairSimul();

  const spot_price = useMemo(() => getSpotPrice(simul), [simul]);
  const token_info = useHaloInfo();
  const gov_balance = useGovBalance();

  useEffect(() => {
    (async () => {
      const halo_supply = new Dec(token_info.total_supply);
      const halo_balance = new Dec(gov_balance);
      const _staked = halo_balance.toNumber();
      const _pct_staked = halo_supply.lte(0)
        ? 0
        : //convert back to utoken
          halo_balance.mul(1e6).div(halo_supply).mul(100).toNumber();

      setStaked(_staked);
      setPercentStaked(_pct_staked);
    })();
  }, [token_info, gov_balance]);

  return { staked, percentStaked, spot_price: spot_price.toNumber() };
}
