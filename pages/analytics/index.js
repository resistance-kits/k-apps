import { Card, CardFooter, CardHeader, CardBody, Heading, Text, Button, Flex, Radio, RadioGroup,Stack } from "@chakra-ui/react"
import { useState } from "react"
export default function poll() {
  const [value, setValue] = useState('1')
  return ( 
    <Flex alignItems="center" justifyContent="center" padding="30px">
      <Card align='right' width="80%">
        <CardHeader>
          <Heading size='md'>What is our national Animal?</Heading>
        </CardHeader>
        <CardBody>
          <Flex alignItems="left">
          <RadioGroup onChange={setValue} value={value}>
            <Stack direction='column'>
              <Radio value='1'>Elephant</Radio>
              <Radio value='2'>Tiger</Radio>
              <Radio value='3'>Lion</Radio>
              <Radio value='4'>Panther</Radio>
            </Stack>
          </RadioGroup>
          </Flex>
        </CardBody>
        <CardFooter>
          <Button colorScheme='blue' onClick={()=>{console.log(value)}} type="button">Next</Button>
        </CardFooter>
      </Card>
    </Flex>
  )
}
