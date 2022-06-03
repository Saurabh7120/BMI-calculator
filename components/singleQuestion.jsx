import { Box, Button, FormControl, FormLabel, HStack, Input, Select, Text, useToast } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';

const SingleQuestion = (
    {num, 
    factor,
    ans, 
    question, 
    inputType, 
    unit, 
    options, 
    last, 
    handleNext, 
    handlePrev, 
    active}) => {

    const [answer, setAnswer] = useState('');

    const toast = useToast()

    useEffect(() => {
        if(!ans) return
        setAnswer(ans)
    },[ans])

    return (
        <Box className='fadeIn' w='90%' boxShadow={active ? 'md' : 'none'} p={3} borderRadius={'md'}>
            <form onSubmit={e => {
                e.preventDefault();
                if(answer.trim().length === 0) {
                    toast({title:'Please give an input', status:'warning', duration: 2000})
                    return
                }
                if(inputType==="number" && parseInt(answer) === 0) {
                    toast({title:'Please give a valid input', status:'warning', duration: 2000})
                    return
                }
                handleNext(factor,answer);
            }}>
                <FormControl   
                    isRequired
                    w={'100%'}
                >
                    <FormLabel htmlFor={`question_${num}`}>{question}</FormLabel>
                    <HStack>
                        {(inputType === 'number' || inputType === 'text') && <Input 
                            mb={3}
                            disabled={!active}
                            type={inputType}
                            id={`question_${num}`} 
                            w={'100px'}
                            value={answer}
                            onChange={e => setAnswer(e.target.value)}
                        />}
                        {
                            inputType === 'select' && <Select  
                            placeholder={question}
                            mb={3}
                            disabled={!active}
                            id={`question_${num}`} 
                            value={answer}
                            onChange={e => setAnswer(e.target.value)}
                            >
                                {options && options.map((i,idx) => <option key={idx} value={i}>{i}</option>)}
                            </Select>
                        }
                        {unit && <Text>{unit}</Text>}
                    </HStack>
                    <HStack justifyContent={'flex-end'}>
                       {num > 1 && <Button
                            variant={'ghost'}
                            size='sm'
                            disabled={!active}
                            onClick={() => handlePrev()}
                        >
                            Prev
                        </Button>}
                         <Button 
                            size='sm'
                            type='submit'
                            disabled={!active}
                        >
                           {last ? 'Submit' : 'Next'}
                        </Button>
                    </HStack>
                </FormControl>
            </form>
      
        </Box>
    );
};

export default SingleQuestion;