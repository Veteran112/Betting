import React, { useEffect, useState } from 'react'
import { Chip, CircularProgress, Typography } from '@mui/material'
import { PrimaryButton } from 'components/StyledButton'
import { newFields } from './constants'
import { getAPIService } from 'services/apiServices'
import APIConstants from 'services/CONSTANTS'
import Swal from 'sweetalert2'
import UserModal from './components/UserModal'
import UserTableWrapper from './components/UserTableWrapper'
import { useParams } from 'react-router-dom'

const ProviderView = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [currentlyEditingUser, setCurrentlyEditingUser] = useState({})
  const params = useParams()

  const initialUserState = () => {
    return Object.keys(newFields).reduce((allFields, field) => {
      allFields[field] = newFields[field].kind === '0' ? '-1' : ''
      return allFields
    }, {})
  }

  const initialErrorState = () => {
    return Object.keys({ ...newFields }).reduce((allFields, field) => {
      allFields[field] = false
      return allFields
    }, {})
  }

  const [userData, setUserData] = useState(initialUserState)
  const [errors, setErrors] = useState(initialErrorState)

  const [availableUsers, setAvailableUsers] = useState({
    total: 0,
    totalPages: 1,
    data: []
  })
  const [modalsState, setModalsState] = useState({
    createUser: false,
    editUser: false,
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
      const data = await getAPIService(
        APIConstants.COMMANDS + '/' + params.id,
        {},
        'GET'
      )
      if (data.commands) {
        setAvailableUsers({
          total: data.commands.length,
          totalPages: 1,
          data: data.commands
        })
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: data.error
        })
      }
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
    if (
      !modalsState.createUser &&
      !modalsState.editUser &&
      !modalsState.changeUserPassword &&
      !modalsState.deleteUser
    ) {
      getUsers()
    }
  }, [
    JSON.stringify(paginationOptions),
    JSON.stringify(sortFields),
    JSON.stringify(modalsState)
  ])

  return (
    <div className="manage-accounts-container">
      <div className="manage-accounts-details-box container mx-auto">
        <div className="d-flex mt-2 mb-4 justify-content-between">
          <div>
            <Typography variant="h5" component="h5" className="onyx main-font">
              Bettng Providers {params.name}{' '}
              <Chip label={`${availableUsers.total}`} color="primary" />
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
              Add Command
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
                  getAPIService(
                    APIConstants.COMMANDS + '/' + rowData.original._id,
                    {},
                    'DELETE'
                  )
                    .then(() => {
                      setModalsState({
                        ...modalsState,
                        deleteUser: false
                      })
                      Swal.fire(
                        'User Deleted!',
                        'User has been deleted.',
                        'success'
                      )
                    })
                    .catch((err) => {
                      Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: err
                      })
                    })
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
          />
          <UserModal
            open={modalsState.editUser}
            title={'Update'}
            sourceFields={newFields}
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

              getAPIService(
                APIConstants.COMMANDS + '/' + updatedData._id,
                {
                  step: updatedData.step,
                  command: updatedData.command
                },
                'PUT'
              )
                .then(() => {
                  setModalsState({
                    ...modalsState,
                    editUser: false
                  })
                  Swal.fire({
                    icon: 'success',
                    text: 'User Updated',
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
            }}
            isLoading={loading === 'UpdatingUser'}
            primaryActionName={'Update'}
            secondaryActionName={'Close'}
            errors={errors}
            onFieldInteract={({ fieldName }) => {
              setErrors((prevState) => {
                return {
                  ...prevState,
                  [fieldName]: false
                }
              })
            }}
          />
        </div>
      </div>
      <UserModal
        open={modalsState.createUser}
        title={'Create New Command'}
        sourceFields={newFields}
        data={userData}
        primaryActionName={'Create'}
        secondaryActionName={'Close'}
        onPrimaryClick={(newUserData) => {
          setLoading('CreatingUser')

          getAPIService(APIConstants.COMMANDS + '/create', {
            ...newUserData,
            provider_id: params.id
          })
            .then(() => {
              setUserData(initialUserState)
              Swal.fire({
                icon: 'success',
                text: 'User Created',
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
            .finally(() => {
              setModalsState({
                ...modalsState,
                createUser: false
              })
            })
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
        onFieldInteract={({ fieldName }) => {
          setErrors((prevState) => {
            return {
              ...prevState,
              [fieldName]: false
            }
          })
        }}
      />
    </div>
  )
}

export default ProviderView
