import "../blocks/subscription.css";
import { useEffect } from "react";

export default function SubscriptionPage({
  header,
  setPageModifier,
  redirectToCustomerPortalUrl,
}) {
  useEffect(() => {
    setPageModifier("page_subscription");

    return () => {
      setPageModifier("");
    };
  }, [setPageModifier]);

  return (
    <div className="subscription">
      {header}
      <div className="subscription__container">
        <h2 className="subscription__title">Want to elevate your studying?</h2>
        <stripe-pricing-table
          pricing-table-id="prctbl_1QaV5LBusZ3sqj29oFYxEmbd"
          publishable-key="pk_test_51QaUsVBusZ3sqj29mFxubjN1Tj295Q2osBNIxNuJR8jVIyMwlzrR17rbRaf8gJP5tZwlrUYvyUqeB9qkC7wKnw8k00dpQMkHtX"
        ></stripe-pricing-table>
      </div>
      <form method="POST" action="/create-customer-portal-session">
        <button onClick={redirectToCustomerPortalUrl}>Manage Billing</button>
      </form>
    </div>
  );
}
