"use client";

import { useState, useEffect } from "react";

import Distance from "./components/distance";
import Result from "@/app/components/result";
import Time from "@/app/components/time";

function calculatePace(totalSeconds: number, distanceUnit: string, distance: number, resultUnit: string): string {
  if (distance === 0) {
    return "Please enter a distance greater than 0.";
  }

  if (distanceUnit === "km") {
    distance = distance * 0.621371;
  }

  let pace = totalSeconds / distance;

  if (resultUnit === "km") {
    pace = pace * 0.621371;
  }

  let paceMinutes = Math.floor(pace / 60);
  let paceSeconds = pace % 60;
  return `${paceMinutes}:${paceSeconds < 10 ? "0" : ""}${paceSeconds.toFixed(2)}`;
}

export default function Home() {

  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  const [distance, setDistance] = useState(0);

  const [distanceUnits, setDistanceUnits] = useState("mi");
  const [resultUnit, setResultUnit] = useState("mi");

  const [result, setResult] = useState("");

  useEffect(() => {
    const pace = calculatePace(seconds + (minutes * 60) + (hours * 3600), distanceUnits, distance, resultUnit);
    setResult(pace);
  }, [hours, minutes, seconds, distance, distanceUnits, resultUnit]);

  return (
    <main className="flex flex-col items-center space-y-2 m-2">
      <Distance
        setDistance={setDistance}
        setDistanceUnit={setDistanceUnits}
        distanceUnit={distanceUnits}
      />
      <Time setHours={setHours} setMinutes={setMinutes} setSeconds={setSeconds} />
      <Result resultUnit={resultUnit} calculatedResult={result} setResultUnit={setResultUnit} />
    </main>
  );
}
