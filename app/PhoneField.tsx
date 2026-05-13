"use client";

import PhoneInput, { isValidPhoneNumber, type Value } from "react-phone-number-input";
import flags from "react-phone-number-input/flags";
import "react-phone-number-input/style.css";

export type { Value };
export { isValidPhoneNumber };

type Props = {
  id?: string;
  value: Value | undefined;
  onChange: (v: Value | undefined) => void;
  invalid: boolean;
};

export default function PhoneField({ id, value, onChange, invalid }: Props) {
  return (
    <PhoneInput
      id={id}
      international
      defaultCountry="AE"
      flags={flags}
      countryCallingCodeEditable={false}
      placeholder="50 000 0000"
      value={value}
      onChange={onChange}
      className={`phone-input${invalid ? " is-invalid" : ""}`}
    />
  );
}
