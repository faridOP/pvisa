/* eslint-disable @next/next/no-img-element */
import { Select } from "antd";
import { useRouter } from "next/router";
import { CaretDown } from "phosphor-react";
import { useEffect, useMemo, useState } from "react";
import agent from "../../../api/agent";
import { StringExtensions } from "../../../extensions/String";
import { UrlCollection } from "../../../globals";
import { Button } from "../../../models/components/Button";
import { SearchBar } from "../../../models/components/SearchBar";
import { getAppConfig } from "../../../utils/CommonContent";
import { concatStyles } from "../../../utils/Concatinator";
import { t } from "../../../utils/Localization";
import styles from "./Primary.module.css";
const Primary: typeof SearchBar.Primary = ({
  className,
  children,
  templateVariables,
  currentCountry,
  ...props
}) => {
  const countries = useMemo(() => agent.AceMock.All(), []);

  const { push, locale } = useRouter();

  const { country } = getAppConfig();

  const countriesSelect = useMemo(
    () =>
      countries?.map((x) => {
        const keyword = x.details
          .find((x) => x.locale === locale)
          ?.keywords.concat();
        return {
          ...x,
          flag_icon:
            UrlCollection.ACEIMAGEURL && x.flag_icon
              ? UrlCollection.ACEIMAGEURL + x.flag_icon
              : StringExtensions.Empty,
          display_name:
            x.details.find((c) => c.locale === locale)?.display_name ??
            x.display_name,
          keyword,
        };
      }),
    [countries, locale]
  );

  function handleSelectDefaultCountry() {
    setSelectedCountry(
      countriesSelect.find((x) =>
        x.keyword?.includes(
          agent.GeoLocation.LocateCurrentCountry()?.split("/")?.[1]
        )
      )?.alpha_3_code ?? country.alpha_3_code
    );
  }

  useEffect(
    () => {
      handleSelectDefaultCountry();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const [selectedCountry, setSelectedCountry] = useState<string>();

  return (
    <div className={concatStyles(styles.Body, className)} {...props}>
      <div className={styles.HelperText}>
        {t("apply_select_nationality", templateVariables)}
      </div>
      <div className={concatStyles(styles.SelectBar)}>
        <Select
          suffixIcon={<CaretDown className={styles.CaretIcon} weight="bold" />}
          className={concatStyles(
            styles.SelectDropDown,
            "nationality-select-bar"
          )}
          value={selectedCountry}
          onChange={setSelectedCountry}
          filterOption={(input, option) => {
            return (option?.children?.[0].key as unknown as string)
              .toLowerCase()
              .includes(input.toLowerCase());
          }}
          optionFilterProp="children[0].key"
          showSearch
        >
          {countriesSelect?.map((c) => (
            <Select.Option
              key={c.alpha_3_code}
              className={styles.SelectOption}
              value={c.alpha_3_code}
            >
              <span className={styles.OptionLabel} key={c.keyword}>
                {c.display_name}
              </span>
              <img
                alt={c.display_name}
                className={styles.FlagImage}
                src={c.flag_icon ?? undefined}
              />
            </Select.Option>
          ))}
        </Select>
        <Button.Primary
          className={styles.Button}
          onClick={() =>
            push(
              `/apply/step-one/params?to=${
                country.alpha_3_code
              }&from=${selectedCountry?.toUpperCase()}&residence=${selectedCountry?.toUpperCase()}`
            )
          }
        >
          {t("buttons_apply", templateVariables)}
        </Button.Primary>
      </div>
    </div>
  );
};
export default Primary;
