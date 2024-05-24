import PropTypes from "prop-types";
import "./style.scss";

export const FIELD_TYPES = {
  INPUT_TEXT: "INPUT_TEXT",
  TEXTAREA: "TEXTAREA",
};

const Field = ({ type = FIELD_TYPES.INPUT_TEXT, label, name, placeholder, value, onChange }) => {
  let component;
  switch (type) {
    case FIELD_TYPES.INPUT_TEXT:
      component = (
        <input
          type="text"
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          data-testid="field-testid"
        />
      );
      break;
    case FIELD_TYPES.TEXTAREA:
      component = (
        <textarea
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          data-testid="field-testid"
        />
      );
      break;
    default:
      component = (
        <input
          type={type}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          data-testid="field-testid"
        />
      );
  }
  return (
    <div className="inputField">
      <span>{label}</span>
      {component}
    </div>
  );
};

Field.propTypes = {
  type: PropTypes.oneOf([
    FIELD_TYPES.INPUT_TEXT, 
    FIELD_TYPES.TEXTAREA, 
    "text", 
    "email", 
    "password", 
    "number", 
    "tel", 
    "url", 
    "date", 
    "datetime-local", 
    "month", 
    "week", 
    "time", 
    "search", 
    "color"
  ]),
  name: PropTypes.string,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
};

Field.defaultProps = {
  label: "",
  placeholder: "",
  type: FIELD_TYPES.INPUT_TEXT,
  name: "field-name",
  value: "",
  onChange: () => {},
};

export default Field;
