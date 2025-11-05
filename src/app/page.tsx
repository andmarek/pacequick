"use client";

import { useState, useEffect, useCallback } from "react";
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
  useColorMode,
  Divider,
  Grid,
  GridItem,
  Heading,
  Box,
  Input,
  HStack,
} from "@chakra-ui/react";

import Distance from "./components/distance";
import Result from "@/app/components/result";
import Time from "@/app/components/time";

function calculatePace(totalSeconds: number, distanceUnit: string, distance: number, resultUnit: string): string {
  if (distance === 0) {
    return "Please enter a distance greater than 0.";
  }

  // Convert distance to miles for calculation
  if (distanceUnit === "km") {
    distance = distance * 0.621371;
  } else if (distanceUnit === "m") {
    distance = distance / 1609.34;
  }

  let pace = totalSeconds / distance;

  // Convert pace to result unit
  if (resultUnit === "km") {
    pace = pace * 0.621371;
  } else if (resultUnit === "m") {
    pace = pace / 1609.34;
  }

  let paceMinutes = Math.floor(pace / 60);
  let paceSeconds = pace % 60;
  return `${paceMinutes}:${paceSeconds < 10 ? "0" : ""}${paceSeconds.toFixed(2)}`;
}

function calculateSplitPace(totalSeconds: number, distanceUnit: string, distance: number, splitDistance: number): string {
  let totalDistanceInMeters: number;
  if (distanceUnit === "km") {
    totalDistanceInMeters = distance * 1000;
  } else if (distanceUnit === "m") {
    totalDistanceInMeters = distance;
  } else {
    totalDistanceInMeters = distance * 1609.34;
  }

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
  const { colorMode } = useColorMode();

  useEffect(() => {
    const pace = calculatePace(seconds + (minutes * 60) + (hours * 3600), distanceUnits, distance, resultUnit);
    setResult(pace);
  }, [hours, minutes, seconds, distance, distanceUnits, resultUnit]);

  const [splitDistances, setSplitDistances] = useState([100, 200, 400, 800, 1600]);
  const [customSplitDistance, setCustomSplitDistance] = useState("");

  const addCustomSplit = useCallback(() => {
    const newSplit = parseInt(customSplitDistance, 10);
    if (!isNaN(newSplit) && newSplit > 0) {
      setSplitDistances(prev => [...prev, newSplit].sort((a, b) => a - b));
      setCustomSplitDistance("");
    }
  }, [customSplitDistance]);

  const removeCustomSplit = useCallback((splitToRemove: number) => {
    setSplitDistances(prev => prev.filter(split => split !== splitToRemove));
  }, []);

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
      
      {distance > 0 && (
        <Button
          onClick={onOpen}
          bg={colorMode === 'dark' ? 'white' : 'black'}
          color={colorMode === 'dark' ? 'black' : 'white'}
          _hover={{ bg: colorMode === 'dark' ? 'gray.200' : 'gray.800' }}
          _active={{ bg: colorMode === 'dark' ? 'gray.300' : 'gray.700' }}
        >
          View Splits
        </Button>
      )}

      <Modal isOpen={isOpen} onClose={onClose} scrollBehavior="inside" isCentered size="lg">
        <ModalOverlay bg={colorMode === 'dark' ? 'blackAlpha.600' : 'blackAlpha.300'} backdropFilter="blur(10px)" />
        <ModalContent
          mx={4}
          my={4}
          bg={colorMode === 'dark' ? 'gray.800' : 'white'}
          color={colorMode === 'dark' ? 'white' : 'black'}
          borderRadius="xl"
          boxShadow="2xl"
        >
          <ModalHeader>
            <Heading size="lg">Splits</Heading>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={6} align="stretch">
              <Box bg={colorMode === 'dark' ? 'gray.700' : 'gray.100'} p={4} borderRadius="md">
                <Heading size="sm" mb={2}>Input Summary</Heading>
                <Grid templateColumns="repeat(2, 1fr)" gap={4}>
                  <GridItem>
                    <Text fontWeight="bold">Distance:</Text>
                    <Text>{distance} {distanceUnits}</Text>
                  </GridItem>
                  <GridItem>
                    <Text fontWeight="bold">Time:</Text>
                    <Text>{hours}h {minutes}m {seconds}s</Text>
                  </GridItem>
                </Grid>
              </Box>
              
              <Divider />
              
              <Box>
                <Heading size="sm" mb={4}>Split Times</Heading>
                <HStack mb={4}>
                  <Input
                    placeholder="Custom split distance (m)"
                    value={customSplitDistance}
                    onChange={(e) => setCustomSplitDistance(e.target.value)}
                    type="number"
                  />
                  <Button onClick={addCustomSplit}>Add</Button>
                </HStack>
                <Grid templateColumns="repeat(2, 1fr)" gap={4}>
                  {splitDistances.map((splitDistance) => (
                    <GridItem key={splitDistance}>
                      <HStack justifyContent="space-between">
                        <VStack align="start">
                          <Text fontWeight="bold">{splitDistance}m:</Text>
                          <Text>{calculateSplitPace(seconds + minutes * 60 + hours * 3600, distanceUnits, distance, splitDistance)}</Text>
                        </VStack>
                        {![100, 200, 400, 800, 1600].includes(splitDistance) && (
                          <Button size="sm" onClick={() => removeCustomSplit(splitDistance)}>Remove</Button>
                        )}
                      </HStack>
                    </GridItem>
                  ))}
                </Grid>
              </Box>
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button
              bg={colorMode === 'dark' ? 'white' : 'black'}
              color={colorMode === 'dark' ? 'black' : 'white'}
              _hover={{ bg: colorMode === 'dark' ? 'gray.200' : 'gray.800' }}
              _active={{ bg: colorMode === 'dark' ? 'gray.300' : 'gray.700' }}
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
