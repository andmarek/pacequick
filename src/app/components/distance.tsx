import React, { useState, useEffect } from 'react';
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
  const [inputValue, setInputValue] = useState(distance.toString());

  useEffect(() => {
    setInputValue(distance.toString());
  }, [distance]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    if (value === '') {
      setDistance(0);
    } else {
      const numValue = parseFloat(value);
      if (!isNaN(numValue)) {
        setDistance(numValue);
      }
    }
    resetSelection();
  };

  const handleUnitChange = (newUnit: string) => {
    if (newUnit !== distanceUnit) {
      let convertedDistance = distance;

      // Convert current distance to meters first
      let distanceInMeters = distance;
      if (distanceUnit === 'mi') {
        distanceInMeters = distance * 1609.34;
      } else if (distanceUnit === 'km') {
        distanceInMeters = distance * 1000;
      }

      // Convert from meters to target unit
      if (newUnit === 'mi') {
        convertedDistance = distanceInMeters / 1609.34;
      } else if (newUnit === 'km') {
        convertedDistance = distanceInMeters / 1000;
      } else {
        convertedDistance = distanceInMeters;
      }

      setDistance(Number(convertedDistance.toFixed(2)));
      setDistanceUnit(newUnit);
    }
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
            onClick={() => handleUnitChange("mi")}> mi </p>
          <p> / </p>
          <p className={`${distanceUnit === "km" ? "font-bold" : ""} cursor-pointer`}
            onClick={() => handleUnitChange("km")}> km </p>
          <p> / </p>
          <p className={`${distanceUnit === "m" ? "font-bold" : ""} cursor-pointer`}
            onClick={() => handleUnitChange("m")}> m </p>
        </span>
        <CommonDistances setDistance={setDistance} currentUnit={distanceUnit} setSelectedValue={setSelectedValue} selectedValue={selectedValue} />
      </div>
      <Input
        value={inputValue}
        onChange={handleInputChange}
        placeholder={`Distance (${distanceUnit})`}
      />
    </div>
  )
}
