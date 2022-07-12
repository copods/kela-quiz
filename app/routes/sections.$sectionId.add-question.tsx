import { ActionFunction, LoaderFunction, redirect } from "@remix-run/server-runtime";
import { useActionData, useLoaderData } from "@remix-run/react";
import { json } from "@remix-run/node";
import invariant from "tiny-invariant";
import AdminLayout from "~/components/layouts/AdminLayout";
import { getSectionById, getQuestionType, addQuestion } from "~/models/sections.server";
import AddQuestionInSection from "~/components/sections/add-question/AddQuestionInSection";
import { requireUserId } from "~/session.server";
import { toast } from "react-toastify";
//import SectionDetails from "~/components/sections/SectionDetails";


type LoaderData = {
  sectionDetails: Awaited<ReturnType<typeof getSectionById>>
  questionTypes: Awaited<ReturnType<typeof getQuestionType>>
}
type ActionData = {
  error?: {
    data?: number
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
  const questionForTest = question.question;

  // if(question.question.length === 0){
  //   throw new Error("No Question Provided")
  //   //toast.error("No Question Provided from route")
  // }

  // if(questionForTest.length !==0){
  //   return json(
  //     { errors: { title: 'Question is required' } },
  //     { status: 400 }
  //   )
  // }
  var s: any;
  await addQuestion(question.question, question.options, question.correctAnswer, question.questionTypeId, question.sectionId, createdById)
    .then((res) => {
      s = json<ActionData>(
        { error: { data: 456 } },
        { status: 200 } ,
      )
      // redirect(`/sections/${question.sectionId}`)
    })
    .catch((err) => {
      s = json<ActionData>(
        { error: { data: 123 } },
        { status: 400 }
      )
    })
    console.log("Ss==",s.statusText)
  return s

}

export default function AddQuestion() {
  const data = useLoaderData() as LoaderData
  const actionData = useActionData();
  return (
    <AdminLayout>
      <AddQuestionInSection sectionDetails={data.sectionDetails}
        questionTypeList={data.questionTypes} error={actionData} />
    </AdminLayout>
  );
}