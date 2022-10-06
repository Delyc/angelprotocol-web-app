import React, { ReactNode, useMemo } from "react";
import { ProposalMeta } from "pages/Admin/types";
import { ProposalDetails } from "services/types";
import { Tags } from "slices/transaction/types";
import useAdminVoter from "pages/Admin/Proposal/Voter/useVoter";
import { apesTags } from "services/apes";
import { invalidateJunoTags } from "services/juno";
import { useLatestBlockQuery } from "services/juno";
import {
  accountTags,
  adminTags,
  customTags,
  indexfundTags,
  junoTags,
  registrarTags,
} from "services/juno/tags";
import { useModalContext } from "contexts/ModalContext";
import { useGetWallet } from "contexts/WalletContext/WalletContext";
import TransactionPrompt from "components/Transactor/TransactionPrompt";
import { useSetter } from "store/accessors";
import { sendCosmosTx } from "slices/transaction/transactors";
import CW3 from "contracts/CW3";
import { useAdminResources } from "../Guard";

export default function PollAction(props: ProposalDetails) {
  const { data: latestBlock = "0" } = useLatestBlockQuery(null);
  const { wallet } = useGetWallet();
  const { showModal } = useModalContext();
  const dispatch = useSetter();
  const { cw3 } = useAdminResources();

  const showAdminVoter = useAdminVoter({
    proposalId: props.id,
    type: props.proposal_type,
    existingReason: props.description, //prev NO reason is saved in proposal description
  });

  function executeProposal() {
    const contract = new CW3(wallet, cw3);
    const execMsg = contract.createExecProposalMsg(props.id);

    dispatch(
      sendCosmosTx({
        wallet,
        msgs: [execMsg],
        tagPayloads: getTagPayloads(props.meta),
      })
    );

    showModal(TransactionPrompt, {});
  }

  const isExpired =
    "at_time" in props.expires
      ? new Date() > new Date(props.expires.at_time / 1e6)
      : +latestBlock > props.expires.at_height;

  const userVote = useMemo(
    () => props.votes.find((vote) => vote.voter === wallet?.address),
    [props.votes, wallet?.address]
  );

  const EXED = props.status === "executed";
  const EX =
    props.status === "passed" &&
    /** proposal has embedded execute message*/ props.msgs &&
    props.msgs.length > 0;
  const VE = props.status !== "open" || isExpired;
  const V = userVote !== undefined;

  let node: ReactNode = null;
  //poll is executed
  if (EXED) {
    node = <Text>poll has ended</Text>;
    //voting period ended and poll is passed waiting to be executed
  } else if (EX) {
    node = node = <Button onClick={executeProposal}>Execute Poll</Button>;
    //voting period ended, but poll is not passed
  } else if (VE) {
    node = <Text>voting period has ended</Text>;
  } else {
    //voting ongoing
    if (V) {
      node = <Text>you voted {userVote.vote}</Text>;
    } else {
      node = <Button onClick={showAdminVoter}>Vote</Button>;
    }
  }
  return <>{node}</>;
}

function Text(props: { children: ReactNode }) {
  return <p className="uppercase text-sm">{props.children}</p>;
}

function Button(props: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className="text-xs font-bold uppercase font-heading px-6 pt-1.5 pb-1 rounded-md bg-blue-accent hover:bg-angel-blue border-2 border-white/30"
    />
  );
}
/** 
 *   index = "",
  //registrar
  registrar_updateConfig = "registrar-update-config",
  registrar_updateOwner = "registrar-update-owner",
*/

function getTagPayloads(proposalMeta: ProposalDetails["meta"]) {
  const tagsToInvalidate: Tags = [
    //basic tags to invalidate
    { type: junoTags.admin, id: adminTags.proposals },
    { type: junoTags.custom, id: customTags.proposalDetails },
  ];
  if (!proposalMeta) {
    return [invalidateJunoTags(tagsToInvalidate)];
  }
  const parsedProposalMeta: ProposalMeta = JSON.parse(proposalMeta);
  switch (parsedProposalMeta.type) {
    case "if_alliance":
      tagsToInvalidate.push({
        type: junoTags.indexfund,
        id: indexfundTags.alliance_members,
      });
      break;
    case "if_remove":
    case "if_create":
    case "if_members": //fund members shown via selecFromResult (fund_list)
      tagsToInvalidate.push({
        type: junoTags.indexfund,
        id: indexfundTags.fund_list,
      });
      break;

    case "if_config":
    case "if_owner":
      tagsToInvalidate.push({
        type: junoTags.indexfund,
        id: indexfundTags.config,
      });
      break;

    case "cw4_members":
      tagsToInvalidate.push({
        type: junoTags.admin,
        id: adminTags.members,
      });
      break;

    case "cw3_transfer":
      tagsToInvalidate.push({
        type: apesTags.chain,
      });
      break;

    case "cw3_config":
      tagsToInvalidate.push({
        type: junoTags.admin,
        id: adminTags.config,
      });
      break;

    case "acc_withdraw":
      tagsToInvalidate.push(
        {
          type: junoTags.account,
          id: accountTags.balance,
        },
        { type: apesTags.chain }
        // edge: beneficiary is user wallet
      );
      break;

    case "acc_profile":
      tagsToInvalidate.push({
        type: junoTags.account,
        id: accountTags.profile,
      });
      break;

    case "acc_endow_status":
      tagsToInvalidate.push({
        type: junoTags.account,
        id: accountTags.endowments, //via selectFromResult (endowments), TODO: convert to {endowment:{}} query
      });
      break;

    case "reg_owner":
    case "reg_config":
      tagsToInvalidate.push({
        type: junoTags.registrar,
        id: registrarTags.config,
      });
      break;

    default:
      return [invalidateJunoTags(tagsToInvalidate)];
  }
  return [invalidateJunoTags(tagsToInvalidate)];
}