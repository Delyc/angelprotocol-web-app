import wingImage from "../../assets/images/angelprotocol-wings-wht.png";

export default function Banner() {
  return (
    <section className="grid items-center bg-banner bg-no-repeat w-full bg-cover h-banner">
      <div className="container mx-auto  grid grid-cols-banner items-center">
        <section className="max-w-3xl pl-5">
          <h1 className="text-5xl text-white leading-normal ">
            Simplified endowments that empower charities to{" "}
            <span className="block font-extrabold text-angel-orange">
              have funding forever
            </span>
          </h1>
        </section>
        <img src={wingImage} alt="" className="w-80" />
      </div>
    </section>
  );
}
