import React, { useState } from 'react';
import { Input } from '@chakra-ui/react'
import CommonDistances from './common-distances';

interface DistanceProps {
  distance: number;
  distanceUnit: string;
  setDistance: (distance: number) => void;
  setDistanceUnit: (unit: string) => void;
}

export default function Distance({ distance, setDistance, setDistanceUnit, distanceUnit }: DistanceProps) {
  const [selectedValue, setSelectedValue] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === '') {
      setDistance(0);
    } else {
      const numValue = parseFloat(value);
      if (!isNaN(numValue)) {
        setDistance(numValue);
      }
    }
    resetSelection()
  };

  function resetSelection() {
    setSelectedValue('');
  }

  return (
    <div className="flex flex-col space-y-2">
      <div>
        <span className="flex space-x-2">
          <p> Distance </p>
          <p className={`${distanceUnit === "mi" ? "font-bold" : ""} cursor-pointer`}
            onClick={() => setDistanceUnit("mi")}> mi </p>
          <p> / </p>
          <p className={`${distanceUnit === "km" ? "font-bold" : ""} cursor-pointer`}
            onClick={() => setDistanceUnit("km")}> km </p>
        </span>
        <CommonDistances setDistance={setDistance} currentUnit={distanceUnit} setSelectedValue={setSelectedValue} selectedValue={selectedValue} />
      </div>
      <Input
        value={distance || ''}
        onChange={handleInputChange}
        placeholder={`Distance (${distanceUnit})`}
      />
    </div>
  )
}
