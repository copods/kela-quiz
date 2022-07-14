import { ActionFunction, LoaderFunction, redirect } from "@remix-run/server-runtime";
import { useActionData, useLoaderData, useNavigate } from "@remix-run/react";
import { json } from "@remix-run/node";
import invariant from "tiny-invariant";
import AdminLayout from "~/components/layouts/AdminLayout";
import { getSectionById, getQuestionType, addQuestion } from "~/models/sections.server";
import AddQuestionInSection from "~/components/sections/add-question/AddQuestionInSection";
import { requireUserId } from "~/session.server";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { response } from "express";
//import SectionDetails from "~/components/sections/SectionDetails";


type LoaderData = {
  sectionDetails: Awaited<ReturnType<typeof getSectionById>>
  questionTypes: Awaited<ReturnType<typeof getQuestionType>>
}
type ActionData = {
  error?: {
    data?: string
    status?: number
  },
  success?: {
    data?: string
    addMoreQuestion?: boolean
    status?: number
  }
}


export const loader: LoaderFunction = async ({ request, params }) => {

  const questionTypes = await getQuestionType();

  invariant(params.sectionId, 'sectionId not found')

  const sectionDetails = await getSectionById({ id: params.sectionId })


  if (!sectionDetails) {
    throw new Response('No Found', { status: 404 })
  }
  return json<LoaderData>({ sectionDetails, questionTypes })
}

export const action: ActionFunction = async ({ request }) => {
  const createdById = await requireUserId(request);
  const formData = await request.formData();
  const question = JSON.parse(formData.get('quesData') as string)

  console.log("Call to function to save in DB")
  //var response: json<ActionData>;
  await addQuestion(question.question, question.options, question.correctAnswer, question.questionTypeId, question.sectionId, createdById)
    .then((res) => {
      console.log("Success to save db")
      return json<ActionData>(
        { success: { data: "Question Added Successfully", addMoreQuestion:question?.addMoreQuestion } },
        { status: 200 } ,
      )
    })
    .catch((err) => {
      console.log("Fail to save db")

      return json<ActionData>(
        { error: { data: "Question Not Added Successfully" } },
        { status: 400 },
      )
    })
 // return response;

}

export default function AddQuestion() {
  const data = useLoaderData() as LoaderData
  const actionData = useActionData();
  const navigate = useNavigate();
  const [addQuestionKey,setAddQuestionKey] = useState(0);
  useEffect(()=>{
    console.log(actionData)
    if(actionData?.success){
      toast.success(actionData?.success?.data)
      if(actionData.success.addMoreQuestion){
        setAddQuestionKey(prev => prev+=1)
      } else
      navigate(`/sections/${data.sectionDetails?.id}`)
    } else if(actionData?.error){
      toast.error(actionData?.data)
    }
  },[actionData,navigate,data.sectionDetails?.id])
  return (
    <AdminLayout>
      <AddQuestionInSection key={addQuestionKey} sectionDetails={data.sectionDetails}
        questionTypeList={data.questionTypes} error={actionData} />
    </AdminLayout>
  );
}