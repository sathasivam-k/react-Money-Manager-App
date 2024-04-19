import {Component} from 'react'
import {v4} from 'uuid'
import TransactionItem from '../TransactionItem'
import MoneyDetails from '../MoneyDetails'
import './index.css'

const transactionTypeOptions = [
  {
    optionId: 'INCOME',
    displayText: 'Income',
  },
  {
    optionId: 'EXPENSES',
    displayText: 'Expenses',
  },
]

// Write your code here
class MoneyManager extends Component {
  state = {
    titleInput: '',
    amountInput: '',
    optionId: transactionTypeOptions[0].optionId,
    transactionList: [],
  }

  onChangeTitle = event => {
    this.setState({titleInput: event.target.value})
  }

  onChangeAmount = event => {
    this.setState({amountInput: event.target.value})
  }

  onChangeSelect = event => {
    this.setState({optionId: event.target.value})
  }

  addTransaction = event => {
    event.preventDefault()
    const {titleInput, amountInput, optionId} = this.state
    const optionIdObj = transactionTypeOptions.find(
      eachItem => eachItem.optionId === optionId,
    )
    const {displayText} = optionIdObj
    const newTransaction = {
      id: v4(),
      title: titleInput,
      amount: parseInt(amountInput),
      type: displayText,
    }
    this.setState(prevState => ({
      transactionList: [...prevState.transactionList, newTransaction],
      titleInput: '',
      amountInput: '',
      optionId: transactionTypeOptions[0].optionId,
    }))
  }

  getIncome = () => {
    const {transactionList} = this.state
    let totalIncome = 0
    transactionList.forEach(eachItem => {
      if (eachItem.type === transactionTypeOptions[0].displayText) {
        totalIncome += eachItem.amount
      }
    })
    return totalIncome
  }

  getExpanse = () => {
    const {transactionList} = this.state
    let totalExpanse = 0
    transactionList.forEach(eachItem => {
      if (eachItem.type === transactionTypeOptions[1].displayText) {
        totalExpanse += eachItem.amount
      }
    })
    return totalExpanse
  }

  getBalance = () => {
    const {transactionList} = this.state
    let income = 0
    let expanse = 0
    let balance = 0
    transactionList.forEach(eachItem => {
      if (eachItem.type === transactionTypeOptions[0].displayText) {
        income += eachItem.amount
      } else {
        expanse += eachItem.amount
      }
    })
    balance = income - expanse
    return balance
  }

  deleteFn = id => {
    const {transactionList} = this.state
    const updatedList = transactionList.filter(eachItem => eachItem.id !== id)
    this.setState({transactionList: updatedList})
  }

  render() {
    const {titleInput, amountInput, optionId, transactionList} = this.state
    const incomeAmount = this.getIncome()
    const expanseAmount = this.getExpanse()
    const balanceAmount = this.getBalance()
    return (
      <div>
        <div>
          <h1>Hi Richerd</h1>
          <img alt="Manager" src="https://assets.ccbp.in/frontend/react-js/money-manager/money-manager-bg.png" />
          <p>
            Welcome back to your<span>Money Manager</span>
          </p>
        </div>
        <MoneyDetails
          incomeAmount={incomeAmount}
          expanseAmount={expanseAmount}
          balanceAmount={balanceAmount}
        />
        <div>
          <form onSubmit={this.addTransaction}>
            <h1>Add Transaction</h1>
            <label htmlFor="title">TITLE</label>
            <input
              type="text"
              id="title"
              value={titleInput}
              onChange={this.onChangeTitle}
              placeholder="TITLE"
            />
            <label htmlFor="amount">AMOUNT</label>
            <input
              type="text"
              id="amount"
              value={amountInput}
              onChange={this.onChangeAmount}
              placeholder="AMOUNT"
            />
            <label htmlFor="select">TYPE</label>
            <select id="select" value={optionId} onChange={this.onChangeSelect}>
              {transactionTypeOptions.map(eachItem => (
                <option key={eachItem.optionId} value={eachItem.optionId}>
                  {eachItem.displayText}
                </option>
              ))}
            </select>
            <button type="submit">Add</button>
          </form>
        </div>
        <div>
          <h1>History</h1>
          <ul>
            <li>
              <p>Title</p>
              <p>Amount</p>
              <p>Type</p>
            </li>
            {transactionList.map(eachItem => (
              <TransactionItem
                key={eachItem.id}
                transactionDetails={eachItem}
                deleteFn={this.deleteFn}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default MoneyManager
