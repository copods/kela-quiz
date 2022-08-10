import React from 'react'
import AdminLayout from '~/components/layouts/AdminLayout'
import CandidateListOfTest from '~/components/results/CandidateListOfTest'

function CandidateListRoute() {
  return (
    <AdminLayout>
      <CandidateListOfTest />
    </AdminLayout>
  )
}

export default CandidateListRoute
