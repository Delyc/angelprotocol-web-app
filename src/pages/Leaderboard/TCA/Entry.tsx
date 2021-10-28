import toCurrency from "helpers/toCurrency";
import { Names } from "./types";
import { memberInfo } from "./infos";
import defaultIcon from "assets/icons/tca/Angel-Alliance-logo.png";

type Props = { name: Names; amount?: number };
export default function TCAMember(props: Props) {
  const { icon = defaultIcon, url = "https://angelprotocol.io" } =
    memberInfo[props.name] || {};
  return (
    <tr className="border-b">
      <td>
        <div className="flex items-center">
          <img src={icon} alt="" className="w-12 ml-0" />
          <a
            href={url}
            target="_blank"
            rel="noreferrer noopener"
            className="text-angel-grey font-bold"
          >
            {props.name}
          </a>
        </div>
      </td>
      <td className="text-angel-grey">$ {toCurrency(props.amount, 0)}</td>
    </tr>
  );
}
