import React from 'react';

export default function Input({
  label,
  type,
  name,
  className,
  value,
  onChange,
  error,
  onBlur,
  placeholder,
}: {
  label?: string;
  type?: React.HTMLInputTypeAttribute;
  name?: string;
  className?: string;
  value?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  error?: string;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
  placeholder?: string;
}) {
  return (
    <div
      className="grid text-gray-800
    "
    >
      <label htmlFor={name} className="ml-1">
        {label}
      </label>
      <input
        id={name}
        name={name}
        className={className}
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        onBlur={onBlur}
      />
      {error && <p className="">{error}</p>}
    </div>
  );
}
