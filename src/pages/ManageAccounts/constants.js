const accountTypeData = [
  {
    value: -1,
    label: '-Select-'
  },
  {
    label: 'Admin',
    value: 'admin'
  },
  {
    label: 'Interpreter',
    value: 'interpreter'
  },
  {
    label: 'Client',
    value: 'client'
  }
]

const experiencesData = [
  { value: '1', label: '1 year' },
  { value: '2', label: '2 years' },
  { value: '3', label: '3 years' },
  { value: '4', label: '4 years' },
  { value: '5', label: '5 years' },
  { value: '6', label: 'Over 5 years' }
]
const availabilitiesData = [
  { value: '0', label: 'Available' },
  { value: '1', label: 'Unavailable' },
  { value: '2', label: 'Scheduled' }
]

const newUserFields = {
  userType: {
    kind: 'Select',
    id: 'userAccountType',
    label: 'Account Type',
    data: accountTypeData
  },
  email: {
    kind: 'TextField',
    id: 'userEmailAddress',
    label: 'Email Address',
    data: '',
    helperTexts: {
      required: 'is Required'
    }
  },
  firstName: {
    kind: 'TextField',
    id: 'userFirstName',
    label: 'First Name',
    data: '',
    helperTexts: {
      required: 'is Required'
    }
  },
  lastName: {
    kind: 'TextField',
    id: 'userLastName',
    label: 'Last Name',
    data: '',
    helperTexts: {
      required: 'is Required'
    }
  },
  language: {
    kind: 'TextField',
    id: 'language',
    label: 'Language',
    data: '',
    helperTexts: {
      required: 'is Required'
    }
  },
  phone: {
    kind: 'phone',
    id: 'phone',
    label: 'Phone',
    data: '',
    helperTexts: {
      required: 'is Required'
    }
  },
  location: {
    kind: 'Select',
    id: 'location',
    label: 'Location',
    data: [],
    helperTexts: {
      required: 'is Required'
    }
  },
  experience: {
    kind: 'Select',
    id: 'location',
    label: 'Experience',
    data: experiencesData,
    helperTexts: {
      required: 'is Required'
    }
  },
  availability: {
    kind: 'Select',
    id: 'availability',
    label: 'Availability',
    data: availabilitiesData,
    helperTexts: {
      required: 'is Required'
    }
  },
  company: {
    kind: 'TextField',
    id: 'company',
    label: 'Company',
    data: '',
    helperTexts: {
      required: 'is Required'
    }
  },
  password: {
    kind: 'TextField',
    id: 'userPassword',
    label: 'Password',
    data: '12345678',
    helperTexts: {
      required: 'is Required'
    }
  }
}
const filterFields = {
  userType: {
    kind: 'Select',
    id: 'userAccountType',
    label: 'Account Type',
    data: [
      ...accountTypeData,
      {
        label: 'All',
        value: 'all'
      }
    ]
  },
  email: {
    kind: 'TextField',
    id: 'userEmailAddress',
    label: 'Email Address',
    data: '',
    helperTexts: {
      required: 'is Required'
    }
  },
  firstName: {
    kind: 'TextField',
    id: 'userFirstName',
    label: 'First Name',
    data: '',
    helperTexts: {
      required: 'is Required'
    }
  },
  lastName: {
    kind: 'TextField',
    id: 'userLastName',
    label: 'Last Name',
    data: '',
    helperTexts: {
      required: 'is Required'
    }
  },
  language: {
    kind: 'TextField',
    id: 'language',
    label: 'Language',
    data: '',
    helperTexts: {
      required: 'is Required'
    }
  },
  // phone: {
  //   kind: 'phone',
  //   id: 'phone',
  //   label: 'Phone',
  //   data: '',
  //   helperTexts: {
  //     required: 'is Required'
  //   }
  // },
  availability: {
    kind: 'Select',
    id: 'availability',
    label: 'Availability',
    data: [{ label: 'All', value: 'all' }, ...availabilitiesData],
    helperTexts: {
      required: 'is Required'
    }
  }
}

const changePasswordFields = {
  newPassword: {
    kind: 'TextField',
    id: 'userPassword',
    label: 'Password',
    data: '',
    helperTexts: {
      required: 'is Required',
      mismatch: 'passwords Do not match'
    }
  },
  confirmPassword: {
    kind: 'TextField',
    id: 'userPassword',
    label: 'Confirm Password',
    data: '',
    helperTexts: {
      required: 'is Required',
      mismatch: 'Password do not match'
    }
  }
}
export { newUserFields, changePasswordFields, filterFields }
