import { Select } from '@chakra-ui/react'
import React, { useState } from 'react';

interface CommonDistancesProps {
  setDistance: (distance: number) => void
  currentUnit: string
  setSelectedValue: (value: string) => void
  selectedValue: string
}

export default function CommonDistances({ setDistance, currentUnit, setSelectedValue, selectedValue }: CommonDistancesProps) {
  function handleSelection(selectionOption: string, currentUnit: string) {
    const values = selectionOption.split(" ");

    const distanceValue = values[0];
    if (currentUnit == "km") {
      setDistance(parseFloat(distanceValue));
    } else {
      setDistance(parseFloat(distanceValue) * 0.621371);
    }
    setSelectedValue(selectionOption);
  }

  function resetSelection() {
    setSelectedValue('');
  }

  return (
    <div className="">
      <Select className="w-full" value={selectedValue} placeholder="Common Distances" onChange={(e) => handleSelection(e.target.value, currentUnit)}>
        <option value="5 km" >5k</option>
        <option value="10 km" >10k</option>
        <option value="21.0975 km">Half Marathon</option>
        <option value="42.195 km">Marathon</option>
      </Select>
    </div>
  )
}
