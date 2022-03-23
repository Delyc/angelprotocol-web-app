import { ReactNode } from "react";
import { useConnectedWallet } from "@terra-money/wallet-provider";
import { PollStatus } from "services/terra/gov/types";
import useDetails from "../usePollDetails";
import useVoter from "components/Transactors/Voter/useVoter";
import usePollEnder from "components/Transactors/PollEnder/usePolllEnder";

export default function PollAction(props: { poll_id: number }) {
  const wallet = useConnectedWallet();
  const details = useDetails(props.poll_id);
  const showPollEnder = usePollEnder(props.poll_id);
  const showVoter = useVoter(props.poll_id);
  const is_voted = details.vote !== undefined;
  const W = !!wallet;
  const V = is_voted;
  const E = details.vote_ended;
  const P = details.status !== PollStatus.in_progress;
  const C = details.creator === wallet?.walletAddress;
  let node: ReactNode = null;

  //poll has ended
  if (P) {
    node = <Text>poll has ended</Text>;
    //poll hasn't ended
  } else {
    if (E) {
      //voting period ended
      if (V || C) {
        node = <Action title="End poll" onClick={showPollEnder} />;
      } else {
        node = <Text>vote period has ended</Text>;
      }
    } else {
      if (V && W) {
        node = <Text>you voted {details.vote}</Text>;
      } else {
        node = <Action title="Vote" onClick={showVoter} />;
      }
      //voting period hasn't ended
    }
  }

  return <>{node}</>;
}
/** states
 * W - is wallet connected?
 * V - already voted ?
 * E - voting period done ?
 * P - poll ended ?
 * C - is creator?
 */

/** button displays
 * vote = !V && !E
 * you voted yes | no = W && V && !P
 * voting period ended = E && !P
 * end poll = E && (V || C)
 * poll has ended = P
 */

function Action(props: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      disabled={props.disabled}
      onClick={(e) => !props.disabled && props.onClick && props.onClick(e)}
      className="text-xs font-bold uppercase font-heading px-6 pt-1.5 pb-1 rounded-md bg-blue-accent hover:bg-angel-blue border-2 border-opacity-30"
    >
      {props.title}
    </button>
  );
}

function Text(props: { children: ReactNode }) {
  return <p className="uppercase text-sm">{props.children}</p>;
}