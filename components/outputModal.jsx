import React, { useEffect, useState } from 'react';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    Text,
    Spinner,
    Box,
    Image,
    Flex,
  } from '@chakra-ui/react'

const OutputModal = ({isOpen,onClose,reports}) => {
    const [loading, setLoading] = useState(false);
    const [bmi, setBmi] = useState(0);

    

    useEffect(() => {
        if(!reports) return
        const calculate = (r) => {
            const bmi = parseFloat(r['weight'].answer)/Math.pow(parseFloat(r['height'].answer), 2)
            setBmi(bmi)
            setInterval(() => setLoading(false), 2000)
        }

        setLoading(true);
        calculate(reports)
    },[reports])
    
    const getBMIValue = value => {
        if(value < 18.5) {
            return 'Under Weight'
        }else if(value >= 18.5 && value < 25) {
            return "Normal"
        }else if(value >= 25 && value < 30) {
            return "Over Weight"
        }else{
            return "Obese"
        }
    }

    const getImage = () => {

        const output = getBMIValue(bmi)

        switch (output) {
            case 'Under Weight':
                return "/diet.svg"
            case 'Normal':
                return "/normal.svg"
            case 'Obese':
                return "/obese.svg"
            case 'Over Weight':
                return '/overweight.svg'
            default:
                return "/normal.svg";
        }
    }

    const getQuote = () => {
        const output = getBMIValue(bmi)

        switch (output) {
            case 'Under Weight':
                return "Plan a good diet and get a gym membership ASAP"
            case 'Normal':
                return "Keep up the good work and don't forget to keep yourself hydrated"
            case 'Obese':
                return "It's time to hit the gym and eat healthy"
            case 'Over Weight':
                return "If you haven't joined a gym yet, now is the time"
            default:
                return "Keep up the good work and don't forget to keep hydrated";
        }
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent className='fadeIn'>
          <ModalHeader>Your results</ModalHeader>
          <ModalCloseButton />
          <ModalBody >
            {
                loading ?
                <Flex justifyContent={'center'}>
                    <Spinner/>
                    <Text w={'100%'} textAlign='center'>Calculating your BMI...</Text>
                </Flex> :
                <Box>
                    <Text textAlign={'center'}>Calculations show that you are <strong>{getBMIValue(bmi)}</strong></Text>
                    <Image
                        src={
                            getImage()
                        }
                        alt='image'
                        w='200px'
                        my={4}
                        mx='auto'
                    />
                    <Text textAlign={'center'} fontWeight='500' fontSize='xl'>{getQuote()}</Text>
                </Box>
            }

          </ModalBody>
          <ModalFooter>
            <Button variant='ghost' onClick={() => onClose()}>Done</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    );
};

export default OutputModal;