import { Container, Text, useDisclosure, VStack } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import OutputModal from '../components/outputModal'
import SingleQuestion from '../components/singleQuestion'

export default function Home() {

  const [currentQuestion, setCurrentQuestion] = useState(1);

  const [report, setReport] = useState({
    'weight':{
      question: 'What is your weight?',
      input:'number',
      unit:'Kg',
      answer: null
    },
    'height':{
      question: 'What is your height?',
      input:'number',
      unit:'Metres',
      answer: null
    },
    'age':{
      question: 'What is your age?',
      input:'number',
      unit:'Years',
      answer: null
    },
    'gender':{
      question: 'What is your gender?',
      input:'select',
      options:['male','female'],
      answer: null
    }
  })

  const {isOpen, onOpen, onClose} = useDisclosure();

  useEffect(() => {
    console.log(report)
  },[report])

  const handleAnswer = (factor,answer) => {
    setReport(prev => {
      return {
        ...prev,
        [factor]:{
          ...prev[factor],
          answer: answer
        }
      }
    })
    if(currentQuestion === 4) {
      onOpen();
      return;
    }
    setCurrentQuestion(prev => prev + 1)
  }

const handlePrev = () => {
  if(currentQuestion === 1) {
    return
  }
  setCurrentQuestion(prev => prev - 1 );
}


  return (
    <Container py={3}>
      <Text fontSize={'2xl'} fontWeight='bold' textAlign='center'>BMI Calculator</Text>
      <VStack mt={5}>
        {
          Object.keys(report).map((i,idx,arr) => (idx === 0 || report[Object.keys(report)[idx-1]]?.answer !== null) &&  <SingleQuestion
          num={idx+1}
          factor={i}
          ans={report[i].answer ? report[i].answer : undefined}
          question={report[i].question}
          inputType={report[i].input}
          unit={report[i].unit && report[i].unit}
          options={report[i].options && report[i].options}
          handleNext={handleAnswer}
          handlePrev={handlePrev}
          last={arr.length === idx + 1}
          active={currentQuestion === parseInt(idx+1)}
        />)
        }
      </VStack>
      <OutputModal isOpen={isOpen} onClose={() => {
        setReport({
          'weight':{
            question: 'What is your weight?',
            input:'number',
            unit:'Kg',
            answer: null
          },
          'height':{
            question: 'What is your height?',
            input:'number',
            unit:'Metres',
            answer: null
          },
          'age':{
            question: 'What is your age?',
            input:'number',
            unit:'Years',
            answer: null
          },
          'gender':{
            question: 'What is your gender?',
            input:'select',
            options:['male','female'],
            answer: null
          }
        });
        setCurrentQuestion(1);
        onClose();
        }} reports={report}/>
    </Container>
  )
}
