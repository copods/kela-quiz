import type { User, Section } from '@prisma/client'
import { prisma } from '~/db.server'

export async function getSectionById({ id }: Pick<Section, 'id'>) {
  return prisma.section.findUnique({
    where: {
      id,
    },
    include: {
      questions: true,
    },
  })
}

export async function getAllSections() {
  // if(!filterbyType && !sort ){
    // var filter = url?{...url}:null;
    // console.log("hellllll",filter);
    
      return await prisma.section.findMany({
      //  ...filter ,
        include: {
          createdBy: true,
        },
      })
  // }

  // if(filterbyType && filterbyType === "name" && sort==="asc"){
  //   return await prisma.section.findMany({
  //     orderBy:{
  //       name:"asc"
  //     },
  //     include: {
  //       createdBy: true,
  //     },
  //   })
  // }

  // if(filterbyType && filterbyType === "name" && sort==="desc"){
  //   return await prisma.section.findMany({
  //     orderBy:{
  //       name:"desc"
  //     },
  //     include: {
  //       createdBy: true,
  //     },
  //   })
  // }
}


export async function getAllSectionsByName() {
  return await prisma.section.findMany({
    include: {
      createdBy: true,
    },
  })
}

export async function createSection({
  name,
  description,
  createdById,
}: Pick<Section, 'name' | 'description'> & { createdById: User['id'] }) {
  return await prisma.section.create({
    data: {
      name,
      description,
      createdById,
    },
  })
}

export async function deleteSectionById(id: string) {
  return prisma.section.delete({ where: { id } })
}
