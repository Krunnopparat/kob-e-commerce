import { LucideIcon } from 'lucide-react';
import { Input } from '../ui/input';
import { Label } from '../ui/label';

type InputFormProps = {
  label?: string;
  type: 'text' | 'number' | 'email' | 'password' | 'file';
  name: string;
  placeholder?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  defaultValue?: string;
  required?: boolean;
  icon?: LucideIcon;
  sizeIcon?: number;
  styleIcon?: string;
  styleLabel?: string;
};

const InputForm = (props: InputFormProps) => {

  const Icon = props.icon;

  return (
    <div className='space-y-2'>
      <div className='flex items-center gap-1'>
        {Icon && <Icon size={props.sizeIcon} className={props.styleIcon} />}
        <Label
          htmlFor={props.name}
          className={props.styleLabel}
        >
          {props.label}
        </Label>
        {props.required && <span className='text-red-500'>*</span>}
      </div>
      <Input
        type={props.type}
        id={props.name}
        name={props.name}
        placeholder={props.placeholder}
        onChange={props.onChange}
        className={props.className}
        defaultValue={props.defaultValue}
      />
    </div>
  );
};
export default InputForm;