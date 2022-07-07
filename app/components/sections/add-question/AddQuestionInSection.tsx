import { Icon } from '@iconify/react'
//import type { Question, Section, QuestionType } from '@prisma/client'
import type { Section,QuestionType,Question } from '~/components/Interface';
import { useState } from 'react'
import BreadCrumb from '../../BreadCrumb'
import QuestionEditor from './QuestionEditor'
import OptionForQuestion from './OptionForQuestion'


const AddQuestionInSection = ({ sectionDetails, questionTypeList }: { sectionDetails: ((Section & { questions: Question[]; }) | null ), questionTypeList: QuestionType[] }) => {


  const [selectedTypeOfQuestion, setSelectedTypeOfQuestion] = useState(questionTypeList[0].id);
  const [question, setQuestion] = useState('');
  const [singleChoiceAnswer, setSingleChoiceAnswer] = useState('');
  const [textAnswer, setTextAnswer] = useState("");
  const [options, setOptions] = useState([{
    option: "",
    isCorrect: false,
    id: 1 // just for maintaining data in UI(key for map)
  }]);

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
  // console.group(singleChoiceAnswer)
  return (
    <div className='h-full flex flex-col gap-6'>
      <div className='flex items-center justify-between '>
        <h1 title={sectionDetails?.name} className="text-3xl leading-9 font-bold text-gray-900">{sectionDetails?.name} - Add Question</h1>
        <button className='bg-primary rounded-lg h-9 px-3 flex items-center text-[#F0FDF4] text-xs'>
          <Icon icon='ic:round-save' className='text-xs mr-1' />
          Preview
        </button>
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
        <button className='bg-primary text-xs rounded-lg h-9 text-white flex items-center px-5 gap-1'><Icon icon="ic:round-save"></Icon><span>Save</span></button>
      </div>
    </div>
  )
}

export default AddQuestionInSection



