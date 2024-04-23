import { Text } from "@chakra-ui/react";
import { useState } from "react";

interface ResultProps {
  calculatedResult: string;
  resultUnit: string;
  setResultUnit: (unit: string) => void;
}

export default function Result({
  calculatedResult,
  resultUnit,
  setResultUnit,
}: ResultProps) {
  return (
    <div className="flex flex-col">
      <Text>
        {" "}
        Your pace (minutes per{" "}
        <span
          className={`${resultUnit == "mi" ? "font-bold" : ""} cursor-pointer`}
          onClick={() => {
            setResultUnit("mi");
          }}
        >
          {" "}
          mi
        </span>{" "}
        /{" "}
        <span
          className={`${resultUnit == "km" ? "font-bold" : ""} cursor-pointer`}
          onClick={() => {
            setResultUnit("km");
          }}
        >
          km
        </span>
        ):
      </Text>
      <Text> {calculatedResult} </Text>
    </div>
  );
}
