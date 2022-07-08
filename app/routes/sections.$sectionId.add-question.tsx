import type { ActionFunction, LoaderFunction } from "@remix-run/server-runtime";
import { useLoaderData } from "@remix-run/react";
import { json } from "@remix-run/node";
import invariant from "tiny-invariant";
import AdminLayout from "~/components/layouts/AdminLayout";
import { getSectionById, getQuestionType, addQuestion } from "~/models/sections.server";
import AddQuestionInSection from "~/components/sections/add-question/AddQuestionInSection";
import { requireUserId } from "~/session.server";


type LoaderData = {
  sectionDetails: Awaited<ReturnType<typeof getSectionById>>
  questionTypes: Awaited<ReturnType<typeof getQuestionType>>
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
  console.log("qurstionssss: ", question)
  await addQuestion(question.question, question.options, question.correctOptions, question.correctAnswer, question.questionTypeId, question.sectionId, createdById)
  return null
  // return redirect('/sections')
}
export default function AddQuestion() {
  const data = useLoaderData() as LoaderData
  return (
    <AdminLayout>
      <AddQuestionInSection sectionDetails={data.sectionDetails}
        questionTypeList={data.questionTypes} />
    </AdminLayout>
  );
} 