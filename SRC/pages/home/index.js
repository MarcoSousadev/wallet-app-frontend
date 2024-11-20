const renderFinancesList = data => {
  const table = document.getElementById('finances-table')
  data.map(item => {
    const tableRow = document.createElement('tr')
    tableRow.className = 'mt smaller'

    // Title

    const titleTd = document.createElement('td')
    const titleText = document.createElement(item.title)
    titleTd.appendChild(titleText)
    tableRow.appendChild(titleTd)

    // category

    const categoryTd = document.createElement('td')
    const categoryText = document.createElement(item.name)
    categoryTd.appendChild(categoryText)
    tableRow.appendChild(categoryTd)

    // date

    const dateTd = document.createElement('td')
    const dateText = document.createTextNode(
      new Date(item.date).toLocaleDateString()
    )
    dateTd.appendChild(dateText)
    tableRow.appendChild(dateTd)

    //value

    const valueTd = document.createElement('td')
    valueTd.className = 'center'
    const valueText = document.createTextNode(
      new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
      }).format(item.value)
    )
    valueTd.appendChild(valueText)
    tableRow.appendChild(valueTd)

    // delete

    const deleteTd = document.createElement('td')
    deleteTd.className = 'right'
    const deleteText = document.createTextNode('Deletar')
    deleteTd.appendChild(deleteText)
    tableRow.appendChild(deleteTd)

    // table add tablerow
    table.appendChild(tableRow)
  })
}

const renderFinanceElements = () => {
  const totalItens = data.length
  const revenues = data
    .filter(item => Number(item.value) > 0)
    .reduce((acc, item) => acc + Number(item.value), 0)
  const expenses = data
    .filter(item => Number(item.value) < 0)
    .reduce((acc, item) => acc + Number(item.value), 0)
  const totalValue = revenues + expenses

  //  render total itens

  const financeCard1 = document.getElementById('finance-card-1')
  const totalText = document.createTextNode(totalItens)
  const totalElement = document.createElement('h1')
  totalElement.className = ' mt smaller'
  totalElement.appendChild(totalText)
  financeCard1.appendChild(totalElement)

  //  render revenue

  const financeCard2 = document.getElementById('finance-card-1')
  const revenueText = document.createTextNode(
    new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(revenues)
  )
  const revenueTextElement = document.createElement('h1')
  revenueTextElement.className = ' mt smaller'
  revenueTextElement.appendChild(revenueText)
  financeCard2.appendChild(revenueTextElement)

  // render expenses

  const financeCard3 = document.getElementById('finance-card-1')
  const expensesText = document.createTextNode(
    new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(expenses)
  )
  const expensesTextElement = document.createElement('h1')
  expensesTextElement.className = ' mt smaller'
  expensesTextElement.appendChild(expensesText)
  financeCard3.appendChild(expensesTextElement)

  // render total

  const financeCard4 = document.getElementById('finance-card-1')
  const balanceText = document.createTextNode(
    new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(totalValue)
  )

  const balanceTextElement = document.createElement('h1')
  balanceTextElement.className = ' mt smaller'
  balanceTextElement.style.color = '#5936CD'
  balanceTextElement.appendChild(balanceText)
  financeCard4.appendChild(balanceTextElement)
}

const onloadFinancesData = async () => {
  try {
    const email = localStorage.getItem('@WalletApp:userEmail')
    const date = '2022-12-15'
    const result = await fetch(
      `
      https://mp-wallet-app-api.herokuapp.com/finances?date=${date}`,
      {
        method: 'GET',
        headers: {
          email
        }
      }
    )

    const data = await result.json()
    renderFinanceElements(data)
    renderFinancesList(data)
    return data
  } catch (error) {
    return { error }
  }
}

const onLoadUserInfo = () => {
  const email = localStorage.getItem('@WalletApp:userEmail')
  const name = localStorage.getItem('@WalletApp:userName')

  const navbarUserInfo = document.getElementById('navbar-user-container')
  const navbarUserAvatar = document.getElementById('navbar-user-avatar')

  // add user email

  const emailElement = document.createElement('p')
  const emailText = document.createTextNode(email)

  emailElement.appendChild(emailText)
  navbarUserInfo.appendChild(emailElement)

  // add logout link

  const logoutElement = document.createElement('a')
  const logoutText = document.createTextNode('sair')
  logoutElement.appendChild(logoutText)
  navbarUserInfo.appendChild(logoutElement)

  // add user first letter inside avatar

  const nameElement = document.createElement('h3')
  const nameText = document.createTextNode(name.charAt(0))
  nameElement.appendChild(nameText)
  navbarUserAvatar.appendChild(nameElement)
}

window.onload = () => {
  onLoadUserInfo()
  onloadFinancesData()
}
