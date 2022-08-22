import { forwardRef } from 'react';

type Props = {
  placeholder?: string;
};

const Input = forwardRef<HTMLInputElement, Props>(
  ({ placeholder = 'Placeholder text' }: Props, ref) => {
    return (
      <div className="flex rounded h-8 w-52 items-center justify-center shadow-frame">
        <input
          className="border w-[205px] rounded shadow-frame indent-2"
          ref={ref}
          placeholder={placeholder}
        />
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;
