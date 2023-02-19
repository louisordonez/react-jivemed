import { useState } from 'react'
import { DatePicker } from '@mantine/dates'
import { Button } from '@mantine/core'

const UpdateScheduleForm = ({ loading, schedule, onSubmit }) => {
  const [value, setValue] = useState(new Date(schedule.schedule.date))
  const [error, setError] = useState('')

  return (
    <>
      <DatePicker
        required
        value={value}
        onChange={(e) => setValue(new Date(e))}
        mb="xl"
        label="Schedule"
        firstDayOfWeek="sunday"
        withAsterisk
        error={error}
      />
      <Button
        variant="gradient"
        gradient={{ from: 'indigo', to: 'cyan' }}
        fullWidth={true}
        onClick={() => {
          if (value === '') {
            setError('Invalid date.')
          } else {
            onSubmit({
              id: schedule.schedule.id,
              values: {
                schedule: { date: value.toString() },
              },
            })
            setValue()
          }
        }}
        loading={loading}
      >
        Submit
      </Button>
    </>
  )
}

export default UpdateScheduleForm
