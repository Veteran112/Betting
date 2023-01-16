import React, { useEffect, useState } from 'react'
import { Chip, CircularProgress, Typography } from '@mui/material'
import { PrimaryButton } from 'components/StyledButton'
import { newUserFields, changePasswordFields, filterFields } from './constants'
import { getAPIService } from 'services/apiServices'
import APIConstants from 'services/CONSTANTS'
import Swal from 'sweetalert2'
import UserModal from './components/UserModal'
import FilterModal from './components/FilterModal'
import UserTableWrapper from './components/UserTableWrapper'
import { removeKeysFromObject } from 'utils/convertors'

import { availableUsersData } from 'data'

const ManageAccountsView = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [currentlyEditingUser, setCurrentlyEditingUser] = useState({})

  const initialUserState = () => {
    return Object.keys(newUserFields).reduce((allFields, field) => {
      switch (field) {
        case 'password': {
          allFields[field] = Math.random().toString(36).slice(2, 10)
          break
        }
        default: {
          allFields[field] = newUserFields[field].kind === '0' ? '-1' : ''
        }
      }
      return allFields
    }, {})
  }
  const initialFilterState = () => {
    return Object.keys(filterFields).reduce((allFields, field) => {
      allFields[field] = filterFields[field].kind === 'Select' ? '-1' : ''
      return allFields
    }, {})
  }

  const initialErrorState = () => {
    return Object.keys({ ...newUserFields, ...changePasswordFields }).reduce(
      (allFields, field) => {
        allFields[field] = false
        return allFields
      },
      {}
    )
  }
  const [userData, setUserData] = useState(initialUserState)
  const [filterData, setFilterData] = useState(initialFilterState)
  const [errors, setErrors] = useState(initialErrorState)
  const [helperTexts, setHelperTexts] = useState(() => {
    return Object.keys({ ...newUserFields, ...changePasswordFields }).reduce(
      (allFields, field) => {
        allFields[field] = `${
          { ...newUserFields, ...changePasswordFields }[field].label
        } is required`
        return allFields
      },
      {}
    )
  })

  const [availableUsers, setAvailableUsers] = useState({
    totalUsers: 0,
    totalPages: 1,
    usersData: []
  })
  const [modalsState, setModalsState] = useState({
    createUser: false,
    editUser: false,
    changeUserPassword: false,
    deleteUser: false,
    filter: false
  })

  const [paginationOptions, setPaginationOptions] = useState({
    limit: 10,
    page: 1
  })

  const [sortFields, setSortFields] = useState({})
  const getUsers = async () => {
    setIsLoading(true)
    try {
      // const data = await getAPIService(APIConstants.GET_USERS, {
      //   ...paginationOptions,
      //   // searchAccount: searchAccount,
      //   filter: filterData,
      //   sortFields: sortFields
      // })
      setAvailableUsers(availableUsersData)
    } catch (err) {
      console.log(err)
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: err
      })
    }
    setIsLoading(false)
  }
  const [loading, setLoading] = useState('')

  useEffect(() => {
    document.title = 'Betting-Users'
  }, [])

  useEffect(() => {
    getUsers()
  }, [paginationOptions, sortFields])

  useEffect(() => {
    setPaginationOptions({
      page: 1,
      limit: 10
    })
    getUsers()
  }, [filterData])

  // useEffect(() => {
  //   if (!modalsState.editUser) {
  //     getUsers()
  //   }
  // }, [modalsState.editUser])

  // useEffect(() => {
  //   if (!modalsState.deleteUser) {
  //     getUsers()
  //   }
  // }, [modalsState.deleteUser])

  // useEffect(() => {
  //   if (!modalsState.createUser) {
  //     getUsers()
  //   }
  // }, [modalsState.createUser])

  const [sortColumns, setSortColumns] = useState([
    {
      id: 'firstName',
      desc: false
    }
  ])

  useEffect(() => {
    if (JSON.stringify(sortFields) !== JSON.stringify({})) {
      setSortColumns([
        {
          id: Object.keys(sortFields)[0],
          desc: Object.values(sortFields)[0] === 1 ? false : true
        }
      ])
    } else {
      setSortColumns([
        {
          id: 'firstName',
          desc: false
        }
      ])
    }
  }, [JSON.stringify(sortFields)])

  return (
    <div className="manage-accounts-container">
      <div className="manage-accounts-details-box container mx-auto">
        <div className="d-flex mt-2 mb-4 justify-content-between">
          <div>
            <Typography variant="h5" component="h5" className="onyx main-font">
              Users{' '}
              <Chip label={`${availableUsers.totalUsers}`} color="primary" />
            </Typography>
            {isLoading && (
              <CircularProgress
                size={20}
                color="inherit"
                sx={{ alignSelf: 'center', marginLeft: '10px' }}
              />
            )}
          </div>
          <div>
            <PrimaryButton
              onClick={() =>
                setModalsState({
                  ...modalsState,
                  createUser: true
                })
              }
            >
              Create User
            </PrimaryButton>
          </div>
        </div>
        <div>
          <UserTableWrapper
            data={availableUsers}
            pageLimit={paginationOptions.limit}
            recordIncreaseNumber={
              paginationOptions.page === 1
                ? 1
                : (parseInt(paginationOptions.page) - 1) *
                  parseInt(paginationOptions.limit)
            }
            onEdit={(rowData) => {
              setModalsState({
                ...modalsState,
                editUser: true
              })
              setCurrentlyEditingUser(rowData.original)
            }}
            onPasswordUpdate={(rowData) => {
              setModalsState({
                ...modalsState,
                changeUserPassword: true
              })
              setCurrentlyEditingUser(rowData.original)
            }}
            onDelete={(rowData) => {
              setModalsState({
                ...modalsState,
                deleteUser: true
              })
              Swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
              }).then((result) => {
                if (result.isConfirmed) {
                  let data = availableUsersData
                  data.usersData = data.usersData.filter(
                    (item) => item.id !== rowData.original.id
                  )
                  setModalsState({
                    ...modalsState,
                    deleteUser: false
                  })
                  Swal.fire(
                    'User Deleted!',
                    'User has been deleted.',
                    'success'
                  )
                  setAvailableUsers(data)
                  // getAPIService(APIConstants.DELETE_USER, {
                  //   editUserId: rowData.original._id,
                  //   email: rowData.original.email
                  // })
                  //   .then(() => {
                  //     setModalsState({
                  //       ...modalsState,
                  //       deleteUser: false
                  //     })
                  //     Swal.fire(
                  //       'User Deleted!',
                  //       'User has been deleted.',
                  //       'success'
                  //     )
                  //   })
                  //   .catch((err) => {
                  //     Swal.fire({
                  //       icon: 'error',
                  //       title: 'Oops...',
                  //       text: err
                  //     })
                  //   })
                }
              })
            }}
            onPaginationChange={(currentPage) => {
              setPaginationOptions({
                limit: currentPage.pageSize,
                page: currentPage.currentPage
              })
            }}
            onSearchAccountsChange={(text) => {
              console.log(text)
              // setSearchAccount(text)
            }}
            onSortChange={(column) => {
              setSortFields((prevState) => {
                return {
                  [column.id]: parseInt(prevState[column.id] ?? 1) * -1
                }
              })
            }}
            selectedSorts={sortFields}
            sortColumns={sortColumns}
          />
          <UserModal
            open={modalsState.editUser}
            title={'Update User'}
            sourceFields={removeKeysFromObject(newUserFields, ['password'])}
            data={currentlyEditingUser}
            onSecondaryClick={() => {
              setModalsState({
                ...modalsState,
                editUser: false
              })
              setErrors(initialErrorState)
            }}
            onPrimaryClick={(updatedData) => {
              setLoading('UpdatingUser')
              setModalsState({
                ...modalsState,
                editUser: false
              })
              let data = availableUsers
              for (let i = 0; i < data.usersData.length; i++) {
                if (data.usersData[i].id === updatedData.id) {
                  data.usersData[i] = updatedData
                }
              }
              setAvailableUsers(data)

              Swal.fire({
                icon: 'success',
                text: 'User Updated',
                showConfirmButton: false,
                timer: 1500
              })
              setLoading('')
              // getAPIService(
              //   APIConstants.UPDATE_USER,
              //   {
              //     editUserId: updatedData._id,
              //     userData: { ...updatedData }
              //   },
              //   'PUT'
              // )
              //   .then(() => {
              //     setModalsState({
              //       ...modalsState,
              //       editUser: false
              //     })
              //     Swal.fire({
              //       icon: 'success',
              //       text: 'User Updated',
              //       showConfirmButton: false,
              //       timer: 1500
              //     })
              //     setLoading('')
              //   })
              //   .catch((err) => {
              //     Swal.fire({
              //       icon: 'error',
              //       title: 'Oops...',
              //       text: err
              //     })
              //     setLoading('')
              //   })
            }}
            isLoading={loading === 'UpdatingUser'}
            primaryActionName={'Update User'}
            secondaryActionName={'Close'}
            errors={errors}
            helperTexts={helperTexts}
            onFieldInteract={({ fieldName }) => {
              setErrors((prevState) => {
                return {
                  ...prevState,
                  [fieldName]: false
                }
              })
            }}
          />
          <UserModal
            open={modalsState.changeUserPassword}
            title={'Change Password'}
            sourceFields={changePasswordFields}
            data={{
              ...currentlyEditingUser,
              newPassword: '',
              confirmPassword: ''
            }}
            onSecondaryClick={() => {
              setModalsState({
                ...modalsState,
                changeUserPassword: false
              })
              setErrors(initialErrorState)
            }}
            onPrimaryClick={(newPasswordData) => {
              const { newPassword, confirmPassword } = newPasswordData
              if (!newPassword || !confirmPassword) {
                setErrors((prevState) => {
                  return {
                    ...prevState,
                    newPassword: newPassword === '',
                    confirmPassword: confirmPassword === ''
                  }
                })
                return
              }
              if (newPassword !== confirmPassword) {
                setHelperTexts((prevState) => {
                  return {
                    ...prevState,
                    confirmPassword:
                      changePasswordFields.confirmPassword.helperTexts.mismatch
                  }
                })
                setErrors((prevState) => {
                  return {
                    ...prevState,
                    newPassword: false,
                    confirmPassword: true
                  }
                })
              } else {
                setLoading('ChangingPassword')
                getAPIService(
                  APIConstants.CHANGE_USER_PASSWORD,
                  {
                    editUserId: newPasswordData._id,
                    newPassword: newPasswordData.newPassword,
                    confirmPassword: newPasswordData.confirmPassword
                  },
                  'PATCH'
                )
                  .then(() => {
                    setModalsState({
                      ...modalsState,
                      changeUserPassword: false
                    })
                    setErrors((prevState) => {
                      return {
                        ...prevState,
                        newPassword: false,
                        confirmPassword: false
                      }
                    })
                    Swal.fire({
                      icon: 'success',
                      text: 'Password Changed',
                      showConfirmButton: false,
                      timer: 1500
                    })
                    setLoading('')
                  })
                  .catch((err) => {
                    Swal.fire({
                      icon: 'error',
                      title: 'Oops...',
                      text: err
                    })
                    setLoading('')
                  })
              }
            }}
            isLoading={loading === 'ChangingPassword'}
            primaryActionName={'Update Password'}
            secondaryActionName={'Close'}
            errors={errors}
            helperTexts={helperTexts}
            onFieldInteract={({ fieldName }) => {
              if (errors[fieldName]) {
                setErrors((prevState) => {
                  return {
                    ...prevState,
                    [fieldName]: false
                  }
                })
              }
            }}
          />
        </div>
      </div>
      <UserModal
        open={modalsState.createUser}
        title={'Create New User'}
        sourceFields={newUserFields}
        data={userData}
        primaryActionName={'Create'}
        secondaryActionName={'Close'}
        onPrimaryClick={(newUserData) => {
          newUserData.id = Math.random()
          setLoading('CreatingUser')
          let data = availableUsers
          data.usersData.push(newUserData)
          setAvailableUsers(data)
          setUserData(initialUserState)
          Swal.fire({
            icon: 'success',
            text: 'User Created',
            showConfirmButton: false,
            timer: 1500
          })
          setLoading('')
          setModalsState({
            ...modalsState,
            createUser: false
          })
          // getAPIService(APIConstants.REGISTER, newUserData)
          //   .then(() => {
          //     setUserData(initialUserState)
          //     Swal.fire({
          //       icon: 'success',
          //       text: 'User Created',
          //       showConfirmButton: false,
          //       timer: 1500
          //     })
          //     setLoading('')
          //   })
          //   .catch((err) => {
          //     Swal.fire({
          //       icon: 'error',
          //       title: 'Oops...',
          //       text: err
          //     })
          //     setLoading('')
          //   })
          //   .finally(() => {
          //     setModalsState({
          //       ...modalsState,
          //       createUser: false
          //     })
          //   })
        }}
        isLoading={loading === 'CreatingUser'}
        onSecondaryClick={() => {
          setModalsState({
            ...modalsState,
            createUser: false
          })
          setErrors(initialErrorState)
        }}
        errors={errors}
        helperTexts={helperTexts}
        onFieldInteract={({ fieldName }) => {
          setErrors((prevState) => {
            return {
              ...prevState,
              [fieldName]: false
            }
          })
        }}
      />
      <FilterModal
        open={modalsState.filter}
        title={'Filter'}
        sourceFields={filterFields}
        data={filterData}
        primaryActionName={'Filter'}
        secondaryActionName={'Close'}
        onPrimaryClick={(newFilterData) => {
          // setLoading('filtering')
          setFilterData(newFilterData)
          setModalsState({
            ...modalsState,
            filter: false
          })
          getUsers()
        }}
        isLoading={loading === 'filtering'}
        onSecondaryClick={() => {
          setModalsState({
            ...modalsState,
            filter: false
          })
        }}
      />
    </div>
  )
}

export default ManageAccountsView
