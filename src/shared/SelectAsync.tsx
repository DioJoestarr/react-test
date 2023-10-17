import React, { useEffect } from "react";
import AsyncSelect from "react-select/async";
import ReactSelect, { GroupBase, Props, StylesConfig } from "react-select";

const stylesSelect: StylesConfig<any, boolean, GroupBase<unknown>> = {
  control: (baseStyles: any) => ({
    ...baseStyles,
    minWidth: "100px",
    minHeight: "50px",
    height: "auto",
  }),
  indicatorSeparator: (base, props) => ({
    ...base,
    width: "0px",
  }),
};
export type AsyncSelectType = React.ComponentProps<typeof AsyncSelect>;
const SelectAsync = React.forwardRef<any, AsyncSelectType>(
  ({ components, styles, ...props }, ref) => {
 
    return (
      <AsyncSelect
        ref={ref}
        cacheOptions
        styles={stylesSelect}
        classNames={{
          control: () =>
            `form-control py-0 pe-0 rounded min-w-150 text-nowrap px-0`,
        }}
        menuPosition="fixed"
        noOptionsMessage={() => "Không còn lựa chọn"}
        defaultOptions
        isClearable
        // menuPortalTarget={portalTarget}
        {...props}
      />
    );
  }
);

export default React.memo(SelectAsync);
