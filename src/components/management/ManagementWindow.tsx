import React from 'react'
import CompetitionsWaitingForApproval from './CompetitionsWaitingForApproval/CompetitionsWaitingForApproval'

interface IProps {
    ManagementToken: string
}

const ManagementWindow = ({ManagementToken}:IProps) => {
  return (
    <div>
        <CompetitionsWaitingForApproval managementToken={ManagementToken} />
    </div>
  )
}

export default ManagementWindow