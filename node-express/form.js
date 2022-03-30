import { useMemo, useState } from "react";
import { Form, Input, Textarea, useFormValidation } from "reactjs-forms";

const App = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [address, setAddress] = useState("");
  const [errors, setErrors] = useState({});
  const [addressErrors, setAddressErrors] = useState({});

  const validation = useFormValidation();
  const validationForAddress = useFormValidation("address"); //you may send args to get only specific inputs errors like ["adress","email"] or "address","email"

  const emailErrors = useMemo(
    () =>
      errors.email ? errors.email.map((v, i) => <li key={i}>{v.msg}</li>) : [],
    [errors]
  );

  const nameErrors = useMemo(
    () =>
      errors.name ? errors.name.map((v, i) => <li key={i}>{v.msg}</li>) : [],
    [errors]
  );

  const ageErrors = useMemo(
    () =>
      errors.age ? errors.age.map((v, i) => <li key={i}>{v.msg}</li>) : [],
    [errors]
  );

  const onlyAddressErrors = useMemo(
    () =>
      addressErrors.address
        ? addressErrors.address.map((v, i) => <li key={i}>{v.msg}</li>)
        : [],
    [addressErrors]
  );

  return (
    <div>
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          console.log(e.currentTarget.validation); //we have accessed to the validation results via submit event currentTarget
          setErrors(validation()); //get validation errors and set errors state for rendering
        }}
      >
        <label htmlFor="email">Email:</label>
        <Input
          onChange={(e) => setEmail(e.target.value)}
          value={email} //we have to declare value attribute
          identity="email" //also we have to declare identity attribute because of that value is used to get validation results
          id="email" //
          type="email"
          validation={{
            required: true,
            isEmail: true,
          }}
        />
        {/* list all email erros*/}
        <ul>{emailErrors}</ul>
        <br />
        <label htmlFor="name">Name:</label>
        <Input
          onChange={(e) => setName(e.target.value)}
          value={name}
          identity="name"
          id="name"
          validation={{
            isName: {
              msg: "custom message", //you may or not declare a custom message
              value: true, //you dont have to declare value also
            },
          }}
        />
        {/* list all name erros*/}
        <ul>{nameErrors}</ul>
        <br />
        <label htmlFor="age">Age:</label>
        <Input
          onChange={(e) => setAge(e.target.value)}
          value={age}
          identity="age"
          id="age"
          validation={{
            isNumeric: true,
            min: 17, //you can assign value or msg like object notation
            max: {
              value: "120",
              msg: "What was that.holy lighten!!!!!",
            },
          }}
        />
        <ul>{ageErrors}</ul>
        <br />
        <label htmlFor="address">Address:</label>
        <br />
        <Textarea
          onChange={(e) => setAddress(e.target.value)}
          value={address}
          identity="address"
          id="address"
          validation={{
            required: true,
            isUnicode: true,
          }}
          onBlur={() => {
            setAddressErrors(validationForAddress());
          }}
        />
        <ul>{onlyAddressErrors}</ul>
        <button>Send</button>
      </Form>
    </div>
  );
};

export default App;