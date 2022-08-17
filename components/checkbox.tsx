type Props = {
  isChecked: boolean;
  onChange: () => void;
};

const Checkbox = ({ isChecked, onChange }: Props) => (
  <div className="flex items-center justify-center">
    <input type="checkbox" checked={isChecked} onChange={onChange} />
  </div>
);

export default Checkbox;
