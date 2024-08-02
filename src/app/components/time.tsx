import { Input, Text } from '@chakra-ui/react'

interface timeProps {
  setHours: any;
  setMinutes: any;
  setSeconds: any;
}

export default function Time({ setHours, setMinutes, setSeconds }: timeProps) {
  function formatTimeInput(value: string): number {
    if (value == '') {
      value = '0';
    }
    try {
      const floatVal = parseFloat(value);
      if (floatVal < 0) {
        return 0;
      } else {
        return floatVal;
      }
    } catch (error) {
      return 0;
    }
  }

  return (
    <div className="flex flex-col space-y-2">
      <Text> Time </Text>
      <Input onChange={(e) => { setHours(formatTimeInput(e.target.value)) }} placeholder="Hours" />
      <Input onChange={(e) => { setMinutes(formatTimeInput(e.target.value)) }} placeholder="Minutes" />
      <Input onChange={(e) => { setSeconds(formatTimeInput(e.target.value)) }} placeholder="Seconds" />
    </div>
  )
}
