import { OwnerUpdateMeta } from "pages/Admin/types";
import KeyValue from "./common/KeyValue";
import PreviewContainer from "./common/PreviewContainer";

export default function OwnerUpdate(props: OwnerUpdateMeta["data"]) {
  return (
    <PreviewContainer>
      <KeyValue _key="current owner">
        <span className="font-mono">{props.owner}</span>
      </KeyValue>
      <KeyValue _key="new owner">
        <span className="font-mono">{props.newOwner}</span>
      </KeyValue>
    </PreviewContainer>
  );
}