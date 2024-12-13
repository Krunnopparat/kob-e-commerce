import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Minus, Plus } from 'lucide-react';

interface QuantityInputProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
}

export default function QuantityInput({ value, onChange, min = 1, max = Infinity }: QuantityInputProps){
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(e.target.value);
    if (!isNaN(newValue)) {
      updateValue(newValue);
    }
  };

  const updateValue = (newValue: number) => {
    // Ensure the value stays within bounds
    const clampedValue = Math.max(min, Math.min(max, newValue));
    onChange(clampedValue);
  };

  const increment = () => updateValue(value + 1);
  const decrement = () => updateValue(value - 1);

  return (
    <div className="flex items-center w-32 h-10">
      <Button
        variant="outline"
        size="icon"
        className="h-full rounded-r-none"
        onClick={decrement}
        disabled={value <= min}
      >
        <Minus className="h-4 w-4" />
      </Button>
      <Input
        type="number"
        value={value}
        onChange={handleInputChange}
        className="h-full rounded-none text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
        min={min}
        max={max}
      />
      <Button
        variant="outline"
        size="icon"
        className="h-full rounded-l-none"
        onClick={increment}
        disabled={value >= max}
      >
        <Plus className="h-4 w-4" />
      </Button>
    </div>
  );
};