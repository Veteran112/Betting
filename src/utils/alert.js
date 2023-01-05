const toastr = require('toastr')

export default function (success, message) {
  if (success) {
    toastr.success(message, 'Success')
  } else {
    toastr.error(message, 'Error')
  }
}
