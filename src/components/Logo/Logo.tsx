import whiteLogo from "assets/images/angelprotocol-horiz-wht.png";
import blueLogo from "assets/images/angelprotocol-horiz-blu.png";

import { app, site, web } from "types/routes";
import { Link, useLocation } from "react-router-dom";
import useScrollTop from "hooks/useScrollTop";
export default function Logo() {
  const location = useLocation();
  //Logo component is in App and Website and watches changes in routes
  useScrollTop(location.pathname);
  switch (location.pathname) {
    case `${site.home}${web.index}`:
    case `${site.home}${web.charities}`:
    case `${site.home}${web.privacy}`:
    case `${site.home}${web.donors}`:
    case `${site.home}${web.about}`:
    case `${site.home}${web.contact}`:
      return (
        <Link to={site.home} title="to home">
          <img src={blueLogo} alt="" className="w-32 sm:w-36" />
        </Link>
      );
    case `/app`:
    case `/app/${app.charities}`:
    case `/app/${app.charity}`:
    case `/app/${app.dashboard}`:
    case `/app/${app.tca}`:
    case `/app/${app.auction}`:
    case `/app/${app.withdraw}`:
    case `/app/${app.marketplace}`:
      return (
        <Link to={app.marketplace} title="to home">
          <img src={whiteLogo} alt="" className="w-32 sm:w-36" />
        </Link>
      );
    default:
      return (
        <Link to={site.home} title="to home">
          <img src={whiteLogo} alt="" width="150" />
        </Link>
      );
  }
}
