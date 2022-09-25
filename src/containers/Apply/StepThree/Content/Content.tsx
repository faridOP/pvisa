import { Divider } from "antd";
import { CheckCircle, XCircle } from "phosphor-react";
import { useEffect, useState } from "react";
import agent from "../../../../api/agent";
import Fade from "../../../../components/Animations/Fade/Fade";
import Paragraph from "../../../../components/Paragraph/Paragraph";
import Wrapper from "../../../../components/Wrapper/Wrapper";
import { StringExtensions } from "../../../../extensions/String";
import { Button } from "../../../../models/components/Button";
import { Heading } from "../../../../models/components/Heading";
import { Apply } from "../../../../models/containers/Apply";
import { ActionButtonColors } from "../../../../static/ActionButtonColors";
import { concatStyles } from "../../../../utils/Concatinator";
import styles from "./Content.module.css";

type CurrentApplicant = {
  currentFormId?: Indefinable<string>;
  applicantOrderNumber: number;
};

const Content: typeof Apply.StepThree.Content = ({
  className,
  children,
  orderData,
  ...props
}) => {
  const [currentApplicant, setCurrentApplicant] = useState<CurrentApplicant>({
    currentFormId: orderData.orders?.[0]?.submitted_form_id,
    applicantOrderNumber: 1,
  });

  const [badgeVisible, setBadgeVisible] = useState<boolean>(true);

  const [formsData, setFormsData] = useState<FormsType.StepThreeResponse>();

  useEffect(() => {
    fetchFormData(currentApplicant);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentApplicant]);

  const fetchFormData = async (currentApplicant: CurrentApplicant) => {
    try {
      const order: Indefinable<OrdersType.SingleOrder> = orderData.orders.find(
        (x) => x.submitted_form_id === currentApplicant.currentFormId
      );

      const response = await agent.Forms.GetFieldsStepThree({
        form_type: order?.order_type ?? null,
        service_id: order?.service_id!,
        submitted_form_id: currentApplicant.currentFormId!,
      });

      setFormsData(response.data);
    } catch (error) {}
  };

  return (
    <div className={concatStyles(styles.Body, className)} {...props}>
      <Wrapper>
        <div className={styles.Head}>
          <div>
            <Fade visible={badgeVisible} duration={300}>
              <Button.Extended
                color={ActionButtonColors.Success}
                leftContent={<CheckCircle />}
                rightContent={<XCircle />}
                onClick={() => setBadgeVisible(false)}
              >
                Thank you for your purchase!
              </Button.Extended>
            </Fade>
            <Heading.Secondary className={styles.Heading}>
              Applicant form
            </Heading.Secondary>
            <Paragraph className={styles.Description}>
              {` We know this can be a time - consuming process, but we've minimized the
        amount of information you need to provide to reflect the embassy's
        requirements. Don't let this postpone your travel!`}
            </Paragraph>
          </div>
          <div />
        </div>
        <div className={styles.Main}>
          <Apply.StepThree.ApplicationForm
            className={styles.ApplicationForm}
            orderData={orderData.orders.find(
              (x) => x.submitted_form_id === currentApplicant.currentFormId
            )}
            applicantOrderNumber={currentApplicant.applicantOrderNumber}
            formData={formsData}
          />
          <Apply.StepThree.ApplicantStatus
            applicants={orderData.orders.map((x, i) => ({
              content:
                x.applicant.name +
                StringExtensions.WhiteSpace +
                x.applicant.surname,
              form_type: x.order_type,
              orderNumber: i + 1,
              status: x.details.visa_status,
              submitted_form_id: x.submitted_form_id,
            }))}
            changeCurrentApplicant={setCurrentApplicant}
          />
        </div>
      </Wrapper>
    </div>
  );
};
export default Content;
