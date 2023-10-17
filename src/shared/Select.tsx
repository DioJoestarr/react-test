import React, { useEffect } from 'react';

import ReactSelect, { GroupBase, Props, StylesConfig } from 'react-select';

const stylesSelect: StylesConfig<any, boolean, GroupBase<unknown>> = {
  control: (baseStyles: any) => ({
    ...baseStyles,
    minWidth: '100px',
    minHeight: '50px',
    height: 'auto',
  }),
  indicatorSeparator: (base, props) => ({
    ...base,
    width: '0px',
  }),
};
const Select = React.forwardRef<any, Props>(
  ({ components, styles, ...props }, ref) => {
    const [portalTarget, setPortalTarget] = React.useState<HTMLElement>();

    // useEffect(() => {
    //   setPortalTarget(document.body);
    // }, []);

    return (
      <ReactSelect
        ref={ref}
        styles={stylesSelect}
        classNames={{
          control: () =>
            `form-control py-0 pe-0 rounded min-w-150 text-nowrap px-0`,
        }}
        menuPosition='fixed'
        noOptionsMessage={() => 'Không còn lựa chọn'}
        isClearable
        // menuPortalTarget={portalTarget}
        {...props}
      />
    );
  }
);

Select.displayName = 'Select';

export default React.memo(Select);
