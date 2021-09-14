import { useEffect, useState } from "react";
import NewTextBadge from "../TextBadge/newTextBadge";

interface CharityCardProps {
  title: string;
  description: string;
  backgroundImageUrl: string;
}

const CharityCard = ({
  title,
  description,
  backgroundImageUrl,
}: CharityCardProps) => {
  // Simple logic for the date
  const oldDate = new Date(2021, 8, 13);
  const newDate = new Date(2021, 8, 27);
  const dateDiff = newDate.getDate() - oldDate.getDate(); //Difference in days
  const [isCharityNew, setIsCharityNew] = useState(false);

  useEffect(() => {
    if (dateDiff <= 14) {
      setIsCharityNew(true);
    } else {
      setIsCharityNew(false);
    }
  }, [dateDiff]);

  return (
    <article className="relative w-64 h-48 ml-4 flex-none ">
      <a href={`/donate/${title}`}>
        <img
          className="rounded-lg img-no-drag"
          src={backgroundImageUrl}
          alt="charity banner"
        />
        <h1 className="text-white-grey font-bold text-base uppercase text-grey-light font-bold mt-1">
          {title}
        </h1>
        <p className="text-xs text-white-grey">{description}</p>
        {isCharityNew ? <NewTextBadge /> : null}
      </a>
    </article>
  );
};

export default CharityCard;
