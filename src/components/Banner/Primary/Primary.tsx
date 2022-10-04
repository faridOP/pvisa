import React from "react";
import { Banner } from "../../../models/components/Banner";
import { Heading } from "../../../models/components/Heading";
import { SearchBar } from "../../../models/components/SearchBar";
import { concatStyles } from "../../../utils/Concatinator";
import Overlay from "../../Overlay/Overlay";
import Wrapper from "../../Wrapper/Wrapper";
import styles from "./Primary.module.css";

const Primary: typeof Banner.Primary = ({
  children,
  className,
  imageUrl,
  heading,
  style,
  templateVariables,
  ...props
}) => {
  return (
    <div
      className={concatStyles(styles.Body, className)}
      style={{
        backgroundImage: `url(${imageUrl})`,
        ...style,
      }}
      {...props}
    >
      <Overlay />
      <Wrapper>
        <Heading.Banner elementsToHighlight={[0, 1, 3, 4]}>
          {heading}
        </Heading.Banner>
        <SearchBar.Primary
          templateVariables={templateVariables}
          className={styles.SearchBar}
        />
      </Wrapper>
    </div>
  );
};
export default Primary;