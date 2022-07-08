import { Icon } from '@iconify/react'
import type { Section, QuestionType, Question } from '~/components/Interface';
import { useEffect, useState } from 'react'
import BreadCrumb from '../../BreadCrumb'
import QuestionEditor from './QuestionEditor'
import OptionForQuestion from './OptionForQuestion'
import cuid from 'cuid';
import { useFetcher, useTransition } from '@remix-run/react';


const AddQuestionInSection = ({ sectionDetails, questionTypeList }: { sectionDetails: ((Section & { questions: Question[]; }) | null), questionTypeList: QuestionType[] }) => {


  const [selectedTypeOfQuestion, setSelectedTypeOfQuestion] = useState(questionTypeList[0].id);
  const [question, setQuestion] = useState('');
  const [singleChoiceAnswer, setSingleChoiceAnswer] = useState('');
  const [textAnswer, setTextAnswer] = useState("");
  const [options, setOptions] = useState([{
    option: "",
    isCorrect: false,
    id: cuid()
  }]);

//   useEffect(()=>{
// console.log(options)
//   },[options])
  const transition= useTransition()

  const breadCrumbArray = [
    {
      tabName: "Section",
      tabRoute: "/sections"
    },
    {
      tabName: "Question",
      tabRoute: `/${sectionDetails?.id}`
    },
    {
      tabName: "AddQuestion",
      tabRoute: `/sections/${sectionDetails?.id}/add-question`
    }
  ]
  const getQuestionType = (id: string) => {
    var quesValue = "";
    for (let quesType of questionTypeList) {
      if (quesType.id == id) {
        quesValue = quesType?.value as string;
      }
    }
    return quesValue
  }

  const fetcher = useFetcher();
  const saveQuestion = () => {
    var testQuestion: { question: string, options: Array<{ id: string, option: string, order: number }>, correctOptions: Array<{ id: string, option: string, order: number }>, correctAnswer: Array<string>, questionTypeId: string, sectionId: string } = {
      question,
      options: [],
      correctOptions: [],
      correctAnswer: [],
      questionTypeId: selectedTypeOfQuestion,
      sectionId: sectionDetails?.id as string,
    }
    if (getQuestionType(selectedTypeOfQuestion) === "MULTIPLE_CHOICE") {
      console.log(options)
      options.forEach((option, index) => {
        console.log("Aos:", option)
        var optionForQuestion = {
          id: option.id,
          option: option.option,
          order: index + 1,
        }
        testQuestion.options.push(optionForQuestion);
        if (option.isCorrect) {
          testQuestion.correctOptions.push(optionForQuestion)
        }
      })
    } else if (getQuestionType(selectedTypeOfQuestion) === "SINGLE_CHOICE") {
      options.forEach((option: any, index: number) => {
        var optionForQuestion = {
          id: option.id,
          option: option.option,
          order: index + 1,
        }
        testQuestion.options.push(optionForQuestion);
        if (option.id === singleChoiceAnswer) {
          testQuestion.correctOptions.push(optionForQuestion)
        }
      })
    } else if (getQuestionType(selectedTypeOfQuestion) === "TEXT") {
      options.forEach((option, index) => {
        var optionForQuestion = {
          id: option.id,
          option: option.option,
          order: index + 1,
        }
        testQuestion.options.push(optionForQuestion);
        testQuestion.correctAnswer.push(textAnswer);
        console.log(textAnswer)
      })
    }
console.log(testQuestion)
    fetcher.submit({ quesData: JSON.stringify(testQuestion) }, { method: "post" });
  }
  return (
    <div className='h-full flex flex-col gap-6'>
      <div className='flex items-center justify-between '>
        <h1 title={sectionDetails?.name} className="text-3xl leading-9 font-bold text-gray-900">{sectionDetails?.name} - Add Question</h1>

      </div>

      <div>
        <div className="text-sm leading-5 font-medium text-primary" >
          <BreadCrumb data={breadCrumbArray} />
        </div>
      </div>

      <div className="flex-1 flex gap-6 h-40">

        <QuestionEditor question={question} setQuestion={setQuestion} questionTypeList={questionTypeList} selectedTypeOfQuestion={selectedTypeOfQuestion} setSelectedTypeOfQuestion={setSelectedTypeOfQuestion} />

        <OptionForQuestion textAnswer={textAnswer} setTextAnswer={setTextAnswer} singleChoiceAnswer={singleChoiceAnswer} setSingleChoiceAnswer={setSingleChoiceAnswer} options={options} setOptions={setOptions} selectedTypeOfQuestion={selectedTypeOfQuestion} questionTypeList={questionTypeList} />

      </div>
      <div className='flex flex-end items-center justify justify-between'>
        <button className='bg-gray-600 rounded-lg h-9 text-xs text-white'><span className='py-2 px-5'>Cancel</span></button>
        <button disabled={transition.state === "submitting"} className='bg-primary text-xs rounded-lg h-9 text-white flex items-center px-5 gap-1' onClick={saveQuestion}><Icon icon="ic:round-save"></Icon><span>{transition.state === "submitting"
          ? "Saving..."
          : "Save"}</span></button>
      </div>
    </div>
  )
}

export default AddQuestionInSection



