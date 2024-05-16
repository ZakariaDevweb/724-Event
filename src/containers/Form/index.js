import { useCallback, useState } from "react";
import PropTypes from "prop-types";
import Field, { FIELD_TYPES } from "../../components/Field";
import Select from "../../components/Select";
import Button, { BUTTON_TYPES } from "../../components/Button";

const mockContactApi = () => new Promise((resolve) => { setTimeout(resolve, 500); })

const Form = ({ onSuccess, onError }) => {
  const [sending, setSending] = useState(false);
  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    type: "",
    email: "",
    message: ""
  });

  const sendContact = useCallback(
    async (evt) => {
      evt.preventDefault();

      // Vérifier si tous les champs requis sont remplis
      if (
        !formData.nom ||
        !formData.prenom ||
        !formData.type ||
        !formData.email ||
        !formData.message
      ) {
        onError(new Error("Veuillez remplir tous les champs obligatoires"));
        return;
      }

      setSending(true);
      // Nous essayons d'appeler mockContactApi
      try {
        await mockContactApi();
        setSending(false);
        onSuccess(); // Appeler onSuccess ici
      } catch (err) {
        setSending(false);
        onError(err);
      }
    },
    [formData, onSuccess, onError]
  );

  const handleChange = (field, value) => {
    setFormData({
      ...formData,
      [field]: value
    });
  };

  return (
    <form onSubmit={sendContact}>
      <div className="row">
        <div className="col">
          <Field
            placeholder=""
            required
            label="Nom"
            value={formData.nom}
            onChange={(value) => handleChange("nom", value)}
          />
          <Field
            placeholder=""
            required
            label="Prénom"
            value={formData.prenom}
            onChange={(value) => handleChange("prenom", value)}
          />
          <Select
            required
            selection={["Personnel", "Entreprise"]}
            onChange={(value) => handleChange("type", value)}
            label="Personnel / Entreprise"
            type="large"
            titleEmpty
          />
          <Field
            placeholder=""
            required
            label="Email"
            value={formData.email}
            onChange={(value) => handleChange("email", value)}
          />
          <Button type={BUTTON_TYPES.SUBMIT} disabled={sending}>
            {sending ? "En cours" : "Envoyer"}
          </Button>
        </div>
        <div className="col">
          <Field
            required
            placeholder="message"
            label="Message"
            type={FIELD_TYPES.TEXTAREA}
            value={formData.message}
            onChange={(value) => handleChange("message", value)}
          />
        </div>
      </div>
    </form>
  );
};

Form.propTypes = {
  onError: PropTypes.func,
  onSuccess: PropTypes.func,
}

Form.defaultProps = {
  onError: () => null,
  onSuccess: () => null,
}

export default Form;
