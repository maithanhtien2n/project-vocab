const isEmpty = (value) => {
  return (
    value === '' ||
    value === null ||
    value === undefined ||
    (Array.isArray(value) && !value.length) ||
    (!!value && value.constructor === Object && Object.keys(value).length === 0)
  )
}

const isValidEmail = (email) => {
  // Sử dụng biểu thức chính quy để kiểm tra định dạng email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

  return emailRegex.test(email)
}

const onValidPassword = (password) => {
  const regex = /^.{6,}$/
  return regex.test(password)
}

export { isEmpty, isValidEmail, onValidPassword }
