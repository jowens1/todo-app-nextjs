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
      <div className="flex rounded h-8 w-52 items-center justify-center shadow-frame">
        <input
          className="border w-[205px] rounded shadow-frame indent-2"
          ref={ref}
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
        />
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;
