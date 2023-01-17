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

const newUserFields = {
  email: {
    kind: 'TextField',
    id: 'userEmailAddress',
    label: 'Email Address',
    data: '',
    helperTexts: {
      required: 'is Required'
    }
  },
  fname: {
    kind: 'TextField',
    id: 'userfname',
    label: 'First Name',
    data: '',
    helperTexts: {
      required: 'is Required'
    }
  },
  lname: {
    kind: 'TextField',
    id: 'userlname',
    label: 'Last Name',
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
  fname: {
    kind: 'TextField',
    id: 'userfname',
    label: 'First Name',
    data: '',
    helperTexts: {
      required: 'is Required'
    }
  },
  lname: {
    kind: 'TextField',
    id: 'userlname',
    label: 'Last Name',
    data: '',
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
