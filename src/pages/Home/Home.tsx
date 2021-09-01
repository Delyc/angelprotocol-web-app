import Banner from "./Banner";
import Highlights from "./Highlights";
import Info from "./Info";
import Process from "./Process";
import Specs from "./Specs";

export default function Home() {
  return (
    <div className="pt-24">
      <Banner />
      <Info />
      <Highlights />
      <Specs />
      <Process />
    </div>
  );
}
