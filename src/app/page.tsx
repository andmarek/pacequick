"use client";

import { useState, useEffect } from "react";
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  VStack,
  Text,
} from "@chakra-ui/react";

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

function calculateSplitPace(totalSeconds: number, distanceUnit: string, distance: number, splitDistance: number): string {
  const totalDistanceInMeters = distanceUnit === "km" ? distance * 1000 : distance * 1609.34;
  const splitTime = (totalSeconds / totalDistanceInMeters) * splitDistance;
  const splitMinutes = Math.floor(splitTime / 60);
  const splitSeconds = splitTime % 60;
  return `${splitMinutes}:${splitSeconds < 10 ? "0" : ""}${splitSeconds.toFixed(2)}`;
}

export default function Home() {
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  const [distance, setDistance] = useState(0);

  const [distanceUnits, setDistanceUnits] = useState("mi");
  const [resultUnit, setResultUnit] = useState("mi");

  const [result, setResult] = useState("");

  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    const pace = calculatePace(seconds + (minutes * 60) + (hours * 3600), distanceUnits, distance, resultUnit);
    setResult(pace);
  }, [hours, minutes, seconds, distance, distanceUnits, resultUnit]);

  const splitDistances = [100, 200, 400, 800, 1600];

  return (
    <main className="flex flex-col items-center space-y-2 m-2">
      <Distance
        distance={distance}
        setDistance={setDistance}
        setDistanceUnit={setDistanceUnits}
        distanceUnit={distanceUnits}
      />
      <Time setHours={setHours} setMinutes={setMinutes} setSeconds={setSeconds} />
      <Result resultUnit={resultUnit} calculatedResult={result} setResultUnit={setResultUnit} />
      
      <Button
        onClick={onOpen}
        bg="black"
        color="white"
        _hover={{ bg: "gray.800" }}
        _active={{ bg: "gray.700" }}
      >
        View Split Paces
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} scrollBehavior="inside" isCentered>
        <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(10px)" />
        <ModalContent
          mx={4}
          my={4}
          maxW={{ base: "90%", md: "400px" }}
          bg="whiteAlpha.800"
          backdropFilter="blur(10px)"
        >
          <ModalHeader>Split Paces</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4} align="stretch">
              <Text fontWeight="bold">Input Summary:</Text>
              <Text>Distance: {distance} {distanceUnits}</Text>
              <Text>Time: {hours}h {minutes}m {seconds}s</Text>
              <Text fontWeight="bold">Split Paces:</Text>
              {splitDistances.map((splitDistance) => (
                <Text key={splitDistance}>
                  {splitDistance}m: {calculateSplitPace(seconds + minutes * 60 + hours * 3600, distanceUnits, distance, splitDistance)}
                </Text>
              ))}
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button
              bg="black"
              color="white"
              _hover={{ bg: "gray.800" }}
              _active={{ bg: "gray.700" }}
              onClick={onClose}
            >
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </main>
  );
}
