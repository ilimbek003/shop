import * as React from "react";
import PropTypes from "prop-types";
import { IMaskInput } from "react-imask";

export const CustomMask = React.forwardRef(function TextMaskCustom(props, ref) {
  const { onChange, id, ...other } = props;
  return (
    <IMaskInput
      {...other}
      mask={id}
      definitions={{
        "#": /[1-9]/,
      }}
      inputRef={ref}
      onAccept={(value) => onChange({ target: { name: props.name, value } })}
      overwrite
    />
  );
});

CustomMask.propTypes = {
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};
