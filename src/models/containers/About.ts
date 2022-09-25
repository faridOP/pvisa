import Content from "../../containers/About/Content/Content";
import Honours from "../../containers/About/Honours/Honours";

type AboutComponent = {
  Content: DivElement;
  Honours: DivElement<{
    items: {
      imageUrl: string;
      wide?: boolean;
    }[];
  }>;
};

export const About: AboutComponent = {
  Content,
  Honours,
};
