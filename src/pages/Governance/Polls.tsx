import { useGovPollsQuery } from "services/terra/terra";
import Halo from "contracts/Halo";
import Poll from "./Poll";
import { useMemo } from "react";
import { useConnectedWallet } from "@terra-money/wallet-provider";

export default function Polls() {
  const wallet = useConnectedWallet();
  const halo_contract = useMemo(() => new Halo(wallet), [wallet]);
  const { data } = useGovPollsQuery({
    address: halo_contract.gov_address,
    msg: { polls: {} },
  });

  return (
    <div className="bg-white bg-opacity-10 border border-opacity-10 shadow-xl rounded-md h-ful p-6">
      <div className="flex items-center mb-4">
        <p className="uppercase text-2xl font-bold text-white-grey mr-4">
          Polls
        </p>
        <p className="px-5 py-1 text-white-grey border-2 border-white-grey opacity-80 hover:opacity-100 uppercase text-center rounded-full ml-auto mr-4">
          <span></span>
          <span>Filter</span>
        </p>
        <button className="px-5 py-1 text-white-grey border-2 border-white-grey opacity-80 hover:opacity-100 uppercase text-center rounded-full">
          Create Poll
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {(data || []).map((poll) => (
          <Poll key={poll.id} {...poll} />
        ))}
      </div>
    </div>
  );
}
