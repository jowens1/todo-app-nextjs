import React, { forwardRef } from 'react';

type Props = {
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
};

const Input = forwardRef<HTMLInputElement, Props>(
  ({ placeholder = 'Placeholder text', value = '', onChange }: Props, ref) => {
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      if (onChange) onChange(event.currentTarget.value);
    };

    return (
      <input
        className="border w-[205px] h-8 rounded indent-2 shadow-input focus:outline-none"
        ref={ref}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
      />
    );
  }
);

Input.displayName = 'Input';

export default Input;
