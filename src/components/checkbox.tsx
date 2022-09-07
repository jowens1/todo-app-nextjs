import { ChangeEvent } from 'react';
type Props = {
  isChecked: boolean;
  onChange: () => void;
};

const Checkbox = ({ isChecked, onChange }: Props) => {
  //Currying Example, uncessary but wanted to remember for future cases
  /* eslint-disable @typescript-eslint/no-unused-vars */
  const handleChange = (_checked: boolean) => {
    return (_e: ChangeEvent<HTMLInputElement>) => {
      onChange();
    };
  };
  /* eslint-enable @typescript-eslint/no-unused-vars */

  return (
    <div className="flex items-center justify-center">
      <input
        className="shadow-input"
        type="checkbox"
        checked={isChecked}
        onChange={handleChange(isChecked)}
      />
    </div>
  );
};

export default Checkbox;
