import placeholder from "assets/icons/tca/validators/Angel@4x.png";
import no_poverty from "assets/icons/unsdg/no_poverty.png";
import zero_hunger from "assets/icons/unsdg/zero_hunger.png";
import good_health from "assets/icons/unsdg/good_health.png";
import education from "assets/icons/unsdg/education.png";
import gender_equality from "assets/icons/unsdg/gender_equality.png";
import clean_water from "assets/icons/unsdg/clean_water.png";
import energy from "assets/icons/unsdg/energy.png";
import decent_work from "assets/icons/unsdg/decent_work.png";
import industry from "assets/icons/unsdg/industry.png";
import sustainable from "assets/icons/unsdg/sustainable_communities.png";
import consumption from "assets/icons/unsdg/consumption.png";
import climate from "assets/icons/unsdg/climate.png";
import life_water from "assets/icons/unsdg/life_water.png";
import life_land from "assets/icons/unsdg/life_land.png";
import partnership from "assets/icons/unsdg/partnership.png";
import unsdg from "assets/icons/unsdg/unsdg.png";

type S = string;
type UNSDG = {
  text_light: S;
  text_dark: S;
  bg: S;
  border: S;
  icon: S;
  title: S;
  desc: S;
  youtube: S;
  website: S;
};

export const unsdgs: { [index: number]: UNSDG } = {
  0: {
    text_light: "text-white-grey",
    text_dark: "text-angel-grey",
    bg: "bg-white",
    border: "border-black",
    icon: unsdg,
    title: "no poverty",
    desc: "End poverty in all its forms everywhere.",
    youtube: "",
    website: "",
  },
  1: {
    text_light: "text-white-grey",
    text_dark: "text-sdg1",
    bg: "bg-sdg1",
    border: "border-sdg1",
    icon: no_poverty,
    title: "no poverty",
    desc: "End poverty in all its forms everywhere.",
    youtube: "",
    website: "",
  },
  2: {
    text_light: "text-white-grey",
    text_dark: "text-sdg2",
    bg: "bg-sdg2",
    border: "border-sdg2",
    icon: zero_hunger,
    title: "zero hunger",
    desc: "End hunger, achieve food security and improved nutrition and promote sustainable agriculture.",
    youtube: "",
    website: "",
  },
  3: {
    text_light: "text-white-grey",
    text_dark: "text-sdg3",
    bg: "bg-sdg3",
    border: "border-sdg3",
    icon: good_health,
    title: "good health",
    desc: "Ensure healthy lives and promote well-being for all at all ages.",
    youtube: "",
    website: "",
  },
  4: {
    title: "quality education",
    desc: "Ensure inclusive and equitable quality education and promote lifelong learning opportunities for all.",
    text_light: "text-white-grey",
    text_dark: "text-sdg4",
    bg: "bg-sdg4",
    border: "border-sdg4",
    icon: education,
    youtube: "",
    website: "",
  },
  5: {
    title: "gender equality",
    desc: "Achieve gender equality and empower all women and girls.",
    text_light: "text-white-grey",
    text_dark: "text-sdg5",
    bg: "bg-sdg5",
    border: "border-sdg5",
    icon: gender_equality,
    youtube: "",
    website: "",
  },
  6: {
    title: "clean water",
    desc: "Ensure availability and sustainable management of water and sanitation for all.",
    text_light: "text-white-grey",
    text_dark: "text-sdg6",
    bg: "bg-sdg6",
    border: "border-sdg6",
    icon: clean_water,
    youtube: "",
    website: "",
  },
  7: {
    title: "afforable and clean energy",
    desc: "Ensure access to affordable, reliable, sustainable and modern energy for all.",
    text_light: "text-white-grey",
    text_dark: "text-sdg7",
    bg: "bg-sdg7",
    border: "border-sdg7",
    icon: energy,
    youtube: "",
    website: "",
  },
  8: {
    title: "decent work and economic growth",
    desc: "Promote sustained, inclusive and sustainable economic growth, full and productive employment and decent work for all.",
    text_light: "text-white-grey",
    text_dark: "text-sdg8",
    bg: "bg-sdg8",
    border: "border-sdg8",
    icon: decent_work,
    youtube: "",
    website: "",
  },
  9: {
    title: "industry, innovation and infrastructure",
    desc: "Build resilient infrastructure, promote inclusive and sustainable industrialization and foster innovation.",
    text_light: "text-white-grey",
    text_dark: "text-sdg9",
    bg: "bg-sdg9",
    border: "border-sdg9",
    icon: industry,
    youtube: "",
    website: "",
  },
  10: {
    title: "reduced inequalities",
    desc: "Reduce inequality within and among countries.",
    text_light: "text-white-grey",
    text_dark: "text-sdg10",
    bg: "bg-sdg10",
    border: "border-sdg10",
    icon: placeholder,
    youtube: "",
    website: "",
  },
  11: {
    title: "sustainable cities and communities",
    desc: "Make cities and human settlements inclusive, safe, resilient and sustainable.",
    text_light: "text-white-grey",
    text_dark: "text-sdg11",
    bg: "bg-sdg11",
    border: "border-sdg11",
    icon: sustainable,
    youtube: "",
    website: "",
  },
  12: {
    title: "responsible consumption and production",
    desc: "Ensure sustainable consumption and production patterns.",
    text_light: "text-white-grey",
    text_dark: "text-sdg12",
    bg: "bg-sdg12",
    border: "border-sdg12",
    icon: consumption,
    youtube: "",
    website: "",
  },
  13: {
    title: "climate action",
    desc: "Take urgent action to combat climate change and its impacts.",
    text_light: "text-white-grey",
    text_dark: "text-sdg13",
    bg: "bg-sdg13",
    border: "border-sdg13",
    icon: climate,
    youtube: "",
    website: "",
  },
  14: {
    title: "life below water",
    desc: "Conserve and sustainably use the oceans, seas and marine resources for sustainable development.",
    text_light: "text-white-grey",
    text_dark: "text-sdg14",
    bg: "bg-sdg14",
    border: "border-sdg14",
    icon: life_water,
    youtube: "",
    website: "",
  },
  15: {
    title: "life on land",
    desc: "Protect, restore and promote sustainable use of terrestrial ecosystems, sustainably manage forests, combat desertification, and halt and reverse land degradation and halt biodiversity loss.",
    text_light: "text-white-grey",
    text_dark: "text-sdg15",
    bg: "bg-sdg15",
    border: "border-sdg15",
    icon: life_land,
    youtube: "",
    website: "",
  },
  16: {
    title: "peace justice and strong institutions",
    desc: "Promote peaceful and inclusive societies for sustainable development, provide access to justice for all and build effective, accountable and inclusive institutions at all levels.",
    text_light: "text-white-grey",
    text_dark: "text-sdg16",
    bg: "bg-sdg16",
    border: "border-sdg16",
    icon: placeholder,
    youtube: "",
    website: "",
  },
  17: {
    title: "parnerships for the goals",
    desc: "Strengthen the means of implementation and revitalize the global partnership for sustainable development.",
    text_light: "text-white-grey",
    text_dark: "text-sdg",
    bg: "bg-sdg17",
    border: "border-sdg17",
    icon: partnership,
    youtube: "",
    website: "",
  },
};
