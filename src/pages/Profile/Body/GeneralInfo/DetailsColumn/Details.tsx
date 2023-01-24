import { PropsWithChildren } from "react";
import { useProfileContext } from "pages/Profile/ProfileContext";

// import { chainIds } from "constants/chainIds";
// import Copier from "components/Copier";
// import ExtLink from "components/ExtLink";
// import Icon from "components/Icon";
// import { getAddressUrl, maskAddress } from "helpers";

export default function Details() {
  const profile = useProfileContext();

  return (
    <>
      {!!profile.registration_number && (
        <Detail title="registration no.">{profile.registration_number}</Detail>
      )}
      {!!profile.street_address && (
        <Detail title="address">{profile.street_address}</Detail>
      )}
      {/* <Detail title="endowment address">
        <span className="flex items-center gap-4 w-full">
          <span className="hidden sm:block">
            {maskAddress(profile.owner, 14)}
          </span>
          <span className="sm:hidden">{maskAddress(profile.owner, 10)}</span>
          <span className="flex items-center gap-3">
            <Copier text={profile.owner} classes="text-lg" />
            <ExtLink
              href={getAddressUrl(chainIds.juno, profile.owner)}
              className="text-lg"
            >
              <Icon type="ExternalLink" className="hover:text-orange" />
            </ExtLink>
          </span>
        </span>
      </Detail> */}
    </>
  );
}

function Detail(props: PropsWithChildren<{ title: string }>) {
  return (
    <div className="flex flex-col justify-center items-start gap-2 w-full">
      <h6 className="font-header font-bold text-xs tracking-wider uppercase">
        {props.title}
      </h6>
      <span className="font-body font-normal text-base text-gray-d1 dark:text-gray">
        {props.children || "-"}
      </span>
    </div>
  );
}