import React, { useState, useEffect } from "react";
import ReactMultiSelectCheckboxes from "react-multiselect-checkboxes";

// import options from "./data";
import Api from '../../components/RestApis/Api';

const MultiSelectAll = () => {
  const [selectedOptions, setSelectedOptions] = useState([]);

  const [TestArr,SetTestArr]=useState();
  var filter=[];

  useEffect(async() => {
    let response= await Api.usersList();
        response.data.users.forEach(doc => {
          filter.push({'id':doc._id,'value':doc._id,'label':doc.userName});
        });
        SetTestArr(filter)
    setSelectedOptions(filter);
  }, []);

  function getDropdownButtonLabel({ placeholderButtonLabel, value }) {
    if (value && value.some((o) => o.value === "*")) {
      return `${placeholderButtonLabel}: All`;
    } else {
      return `${placeholderButtonLabel}: ${value.length} selected`;
    }
  }

  function onChange(value, event) {
    if (event.action === "select-option" && event.option.value === "*") {
      this.setState(filter);
    } else if (
      event.action === "deselect-option" &&
      event.option.value === "*"
    ) {
      this.setState([]);
    } else if (event.action === "deselect-option") {
      this.setState(value.filter((o) => o.value !== "*"));
    } else if (value.length === filter.length - 1) {
      this.setState(filter);
    } else {
      this.setState(value);
    }
  }

  return (
    <ReactMultiSelectCheckboxes
      options={TestArr}
      placeholderButtonLabel="Customers"
      getDropdownButtonLabel={getDropdownButtonLabel}
      value={selectedOptions}
      onChange={onChange}
      setState={setSelectedOptions}
    />
  );
};

export default MultiSelectAll;
