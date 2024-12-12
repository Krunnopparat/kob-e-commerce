import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';

type SelectFormProps = {
  someData: {
    id: string;
    name: string;
  }[];
  label: string;
  name: string;
  required?: boolean;
  widthInput?: string | 'w-full';
  defaultValue?: string;
};

const SelectForm = ({ someData, label, name, required, widthInput, defaultValue }: SelectFormProps) => {
  return (
    <div className='space-y-2'>
      <Label>{label} {required && <span className='text-red-500'>*</span>}</Label>
      <Select name={name} defaultValue={defaultValue}>
        <SelectTrigger className={widthInput}>
          <SelectValue placeholder="เลือกหมวดหมู่" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {someData.map((data) => (
              <SelectItem key={data.id} value={data.id}>{data.name}</SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export { SelectForm };

