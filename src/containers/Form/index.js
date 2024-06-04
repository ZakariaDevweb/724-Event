import { useCallback, useState } from "react";
import PropTypes from "prop-types";
import Field, { FIELD_TYPES } from "../../components/Field";
import Select from "../../components/Select";
import Button, { BUTTON_TYPES } from "../../components/Button";

const mockContactApi = () => new Promise((resolve) => { setTimeout(resolve, 500); });

const Form = ({ onSuccess, onError }) => {
  const [sending, setSending] = useState(false);
  const [formData, setFormData] = useState({
  
    nom: "",
    prenom: "",
    type: "",
    email: "",
    message: "",
  });

  const handleChange = (selectedOption) => {
    setFormData((prevData) => ({ ...prevData, type: selectedOption.value }));
  
  };

  const sendContact = useCallback(
    async (evt) => {
      evt.preventDefault();
      
      // verification de validation de formulaire
      const form = evt.target;
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }

      setSending(true);
      try {
        await mockContactApi();
        setSending(false);
        onSuccess();
      } catch (err) {
        setSending(false);
        onError(err);
      }
    },
    [onSuccess, onError]
  );

  return (
    <form onSubmit={sendContact} noValidate>
      <div className="row">
        <div className="col">
          <Field
            placeholder=""
            required
            label="Nom"
            type="text"
            name="nom"
            value={formData.nom}
            onChange={() => null}
          />
          <Field
            placeholder=""
            required
            label="Prénom"
            type="text"
            name="prenom"
            value={formData.prenom}
            onChange={() => null}
          />
         
<Select
  required
  selection={["Personel", "Entreprise"]}
  onChange={handleChange} 
  label="Personel / Entreprise"
  type="large"
  titleEmpty
  name="type"
  value={formData.type} 
/>
          <Field
            placeholder=""
            required
            label="Email"
            type="email"
            name="email"
            value={formData.email}
            onChange={() => null}
          />
          <Button type={BUTTON_TYPES.SUBMIT} disabled={sending}>
            {sending ? "En cours" : "Envoyer"}
          </Button>
        </div>
        <div className="col">
          <Field
            required
            placeholder="Message"
            label="Message"
            type={FIELD_TYPES.TEXTAREA}
            name="message"
            value={formData.message}
            onChange={handleChange}
          />
        </div>
      </div>
    </form>
  );
};

Form.propTypes = {
  onError: PropTypes.func,
  onSuccess: PropTypes.func,
};

Form.defaultProps = {
  onError: () => null,
  onSuccess: () => null,
};

export default Form;
