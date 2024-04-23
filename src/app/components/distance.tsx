import { Input, Text } from '@chakra-ui/react'

interface distanceProps {
  setDistance: (distance: number) => void;
  setDistanceUnit: (distanceUnit: string) => void;
  distanceUnit: string
}

export default function Distance({ setDistance, setDistanceUnit, distanceUnit }: distanceProps) {
  return (
    <div className="flex flex-col space-y-2">
      <Text>Distance:
        <span className={`${distanceUnit == "mi" ? "font-bold" : ""} cursor-pointer`} onClick={() => { setDistanceUnit("mi") }}> mi </span>
        <span> / </span>
        <span className={`${distanceUnit == "km" ? "font-bold" : ""} cursor-pointer`} onClick={() => { setDistanceUnit("km") }} >km </span>
      </Text>
      <Input onChange={(e) => { setDistance(parseInt(e.target.value)) }} placeholder="Distance" />
    </div>
  )
}
