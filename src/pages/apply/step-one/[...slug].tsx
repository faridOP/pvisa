import { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import agent from "../../../api/agent";
import { Page } from "../../../models/components/Page";
import { Apply } from "../../../models/containers/Apply";
import { BackgroundColors } from "../../../static/PageColors";
import { dynamicErrorHandler } from "../../../utils/ErrorHandler";

const StepOne: NextPage<CommonPageProps & Pages.Apply.StepOne.PageProps> = (
  props
) => {
  return (
    <Page.Item backgroundColor={BackgroundColors.Blue}>
      <Head>
        <title>Step One | Pick Visa</title>
      </Head>
      <Apply.StepOne
        items={props?.filterResponse?.visa_types}
        queryParams={props.queryParams}
      />
    </Page.Item>
  );
};

export default StepOne;

export const getServerSideProps: GetServerSideProps<
  Emptiable<Pages.Apply.StepOne.PageProps>
> = async (context) => {
  const { from, to, residence } =
    context.query as Pages.Apply.StepOne.QueryParams;

  return await dynamicErrorHandler<
    CombinationsType.FilterResponse,
    Emptiable<Pages.Apply.StepOne.PageProps>
  >(
    () =>
      agent.Combinations.Filter({
        citizen_of: from.toUpperCase(),
        travel_to: to.toUpperCase(),
        resident_of: residence.toUpperCase(),
      }),
    (response) => ({
      filterResponse: response,
      queryParams: context.query,
    }),
    (error) => {
      if (error.response?.status === 404)
        return {
          props: {
            filterResponse: null,
            queryParams: context.query,
          },
        };
    }
  );
};
