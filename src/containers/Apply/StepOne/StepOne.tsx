/* eslint-disable @next/next/no-img-element */
import {
  Splide,
  SplideProps,
  SplideSlide,
  SplideTrack,
} from "@splidejs/react-splide";
import { useRouter } from "next/router";
import { Planet } from "phosphor-react";
import { useMemo } from "react";
import agent from "../../../api/agent";
import Wrapper from "../../../components/Wrapper/Wrapper";
import { UrlCollection } from "../../../globals";
import { Banner } from "../../../models/components/Banner";
import { Button } from "../../../models/components/Button";
import { Card } from "../../../models/components/Card";
import { Carousel } from "../../../models/components/Carousel";
import { Apply } from "../../../models/containers/Apply";
import { commonSlideProps } from "../../../static/CommonSlideProps";
import { getAppConfig } from "../../../utils/CommonContent";
import { concatStyles } from "../../../utils/Concatinator";
import { t } from "../../../utils/Localization";
import styles from "./StepOne.module.css";

const StepOne: typeof Apply.StepOne = ({
  className,
  children,
  queryParams,
  items,
  templateVariables,
  ...props
}) => {
  const { country, hero_image } = getAppConfig();
  const countries = useMemo(() => agent.AceMock.All(), []);

  const slideProps: SplideProps = {
    ...commonSlideProps,
    options: {
      ...commonSlideProps.options,
      perPage: 3,
      gap: 30,
      breakpoints: {
        1200: {
          perPage: 2,
        },
        768: {
          perPage: 1,
          arrows: false,
          pagination: true,
        },
      },
    },
  };

  const { push } = useRouter();

  const flagUrl =
    UrlCollection.ACEIMAGEURL! +
    countries.find((x) => x.alpha_3_code === country.alpha_3_code)?.flag_icon;

  return (
    <div className={concatStyles(styles.Body, className)} {...props}>
      <Banner.Visa
        heading={`${country.name} Visa`}
        imageUrl={hero_image.file}
        queryParams={queryParams}
        flagImage={
          <img
            alt={country.name}
            style={{
              position: "relative",
              width: 50,
              marginLeft: 20,
            }}
            src={flagUrl}
          />
        }
      />
      <Wrapper>
        {items ? (
          <div className={styles.Collection}>
            <Splide {...slideProps}>
              <SplideTrack>
                {items.map((o) => (
                  <SplideSlide key={o.id}>
                    <Card.Visa
                      templateVariables={templateVariables}
                      itemProps={o}
                      queryParams={queryParams}
                    />
                  </SplideSlide>
                ))}
              </SplideTrack>
              <Carousel.Buttons
                classes={{
                  arrow: styles.Arrow,
                  leftArrow: styles.ArrowLeft,
                  rightArrow: styles.ArrowRight,
                }}
              />
            </Splide>
          </div>
        ) : (
          <div className={styles.Error}>
            <Planet weight="duotone" className={styles.Icon} />
            <span className={styles.Message}>
              {t("error_no_fitting_content", templateVariables)}
            </span>
            <Button.Primary className={styles.Button} onClick={() => push("/")}>
              {t("nav_menu_home", templateVariables)}
            </Button.Primary>
          </div>
        )}
      </Wrapper>
    </div>
  );
};
export default StepOne;
