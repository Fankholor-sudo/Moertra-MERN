import { useState } from 'react'
import { Category, JobDetails } from '../types'

const EMPTY_DETAILS: JobDetails = { work: '', description: '', specifics: '' }

export function useJobRequest() {
  const [visible, setVisible] = useState(false)
  const [category, setCategory] = useState<Category | null>(null)
  const [sent, setSent] = useState(false)
  const [details, setDetails] = useState<JobDetails>(EMPTY_DETAILS)

  const open = () => {
    setVisible(true)
    setCategory(null)
    setSent(false)
  }

  const close = () => setVisible(false)

  const updateDetail = (field: keyof JobDetails, value: string) =>
    setDetails((current) => ({ ...current, [field]: value }))

  const submit = () => {
    if (details.work.trim() && details.description.trim()) setSent(true)
  }

  return {
    visible,
    category,
    sent,
    details,
    open,
    close,
    selectCategory: setCategory,
    updateDetail,
    submit,
  }
}

export type JobRequest = ReturnType<typeof useJobRequest>
