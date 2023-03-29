export type inputProps = {
  label?: string;
  children?: any;
  name?: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
};
export const Field = ({ label, children }: inputProps) => {
  return (
    <label>
      <span className="text-sm text-slate-500">{label}</span>
      {children}
    </label>
  );
};

export const InputField = ({
  label,
  name,
  type = "text",
  placeholder,
  required = true,
}: inputProps) => {
  return (
    <Field label={label}>
      <input
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        className="w-full rounded-none border-b border-slate-200 py-3 pr-7 pl-3 text-slate-800 placeholder-slate-400"
      />
    </Field>
  );
};

export const TextareaField = ({
  label,
  name,
  placeholder,
  required = true,
}: inputProps) => {
  return (
    <Field label={label}>
      <textarea
        name={name}
        required={required}
        placeholder={placeholder}
        className="h-40 w-full rounded-none border-b border-slate-200 py-3 pr-7 pl-3 text-slate-800 placeholder-slate-400"
      />
    </Field>
  );
};
