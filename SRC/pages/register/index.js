const onCallRegister = async (email, name) => {
  try {
    const data = {
      email,
      name
    }
    const response = await fetch('https://https:localhost/3000/users', {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Contet-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    const user = await response.json
    return user
  } catch (error) {
    return { error }
  }
}

const onRegister = async () => {
  const email = document.getElementById('input-email').value
  const name = document.getElementById('input-name').value

  if (name.length < 3) {
    alert('nome deve conter mais de 3 caracteres')
    return
  }

  if (email.length < 5 || !email.includes('@')) {
    alert('E-mail invalido!')
    return
  }

  const result = await onCallRegister(email, name)
  if (result.error) {
    alert('Falha ao validar e-mail')
    return
  }
  localStorage.setItem('@WalletApp:userEmail', result.email)
  localStorage.setItem('@WalletApp:userName', result.name)
  localStorage.setItem('@WalletApp:userId', result.id)
  window.open('../home/index.html', '_self')
}

window.onload = () => {
  const form = document.getElementById('form-register')
  form.onsubmit = event => {
    event.preventDefault()
    onRegister()
  }
}