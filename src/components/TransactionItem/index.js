// Write your code here
import './index.css'

const TransactionItem = props => {
  const {transactionDetails, deleteFn} = props
  const {id, title, type, amount} = transactionDetails
  const onClickDelete = () => {
    deleteFn(id)
  }

  return (
    <li>
      <p>{title}</p>
      <p>{amount}</p>
      <p>{type}</p>
      <button data-testid="delete" type="button" onClick={onClickDelete}>
        <img
          src="https://assets.ccbp.in/frontend/react-js/money-manager/delete.png"
          alt="delete"
        />
      </button>
    </li>
  )
}

export default TransactionItem
