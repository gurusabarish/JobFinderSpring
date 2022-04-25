import React, { useState } from "react";
import CompanyToAdd from "./company";
import HR from "./HR";

const Admin = (props) => {
  React.useEffect(() => {
    console.log(props.user);
    if (!props.user.enabled) {
      setCompanyAdded(true);
    } else {
      setCompanyAdded(false);
    }
  }, [props.user]);

  const [companyAdded, setCompanyAdded] = useState(null);

  const handleCompanyAdded = (val) => {
    setCompanyAdded(val);
  };
  return (
    <>
      {companyAdded && (
        <CompanyToAdd
          user={props.user}
          handleCompanyAdded={handleCompanyAdded}
        />
      )}

      {companyAdded === false && <HR user={props.user} />}
    </>
  );
};

export default Admin;
