const workTimeFields = {
  date: {
    kind: 'TextField',
    id: 'date',
    label: 'Date',
    type: 'date'
  },
  time: {
    kind: 'TextField',
    id: 'time',
    label: 'Time',
    type: 'time'
  },
  min: {
    kind: 'TextField',
    id: 'min',
    label: 'Minute',
    type: 'text',
    helperTexts: {
      required: 'is Required'
    },
    data: 0
  },
  sec: {
    kind: 'TextField',
    id: 'sec',
    label: 'Second',
    type: 'text',
    helperTexts: {
      required: 'is Required'
    },
    data: 0
  }
}

export { workTimeFields }
