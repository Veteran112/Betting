/* eslint-disable no-async-promise-executor */
const fileTobase64 = function (file) {
  return new Promise(async (resolve, reject) => {
    const reader = new FileReader()

    reader.onload = async () => {
      resolve(reader.result)
    }

    reader.onerror = (error) => {
      reject(error)
    }
    reader.readAsDataURL(file)
  })
}

export default fileTobase64
