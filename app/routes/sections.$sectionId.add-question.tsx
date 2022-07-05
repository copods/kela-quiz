import type { LoaderFunction } from "@remix-run/server-runtime";
import { useLoaderData } from "@remix-run/react";
import {json} from "@remix-run/node";
import invariant from "tiny-invariant";
import AdminLayout from "~/components/layouts/AdminLayout";
import { getSectionById, getQuestionType } from "~/models/sections.server";
import AddQuestionInSection from "~/components/sections/add-question/AddQuestionInSection";


type LoaderData = {
  sectionDetails: Awaited<ReturnType<typeof getSectionById>>
   questionTypes: Awaited<ReturnType<typeof getQuestionType>>
}


export const loader: LoaderFunction = async ({request,params}) =>{

  const questionTypes = await getQuestionType();

  invariant(params.sectionId, 'sectionId not found')

  const sectionDetails = await getSectionById({id : params.sectionId})
  

  if(!sectionDetails){
    throw new Response('No Found', {status:404})
  }
  return json<LoaderData>({sectionDetails,questionTypes})
}
export default function AddQuestion (){
  const data = useLoaderData() as LoaderData
  console.log(data)
return (
  <AdminLayout>
    <AddQuestionInSection sectionDetails={data.sectionDetails} 
      questionTypeList={data.questionTypes} />
  </AdminLayout>
);
} 