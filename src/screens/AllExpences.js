import { useContext } from "react"
import { Text } from "react-native"
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput"
import { ExpenseContext } from "../store/expense-context"


const AllExpences=()=>{
    const expenseCtx=useContext(ExpenseContext)

    return(<ExpensesOutput expenses={expenseCtx.expense} expensesPeriod={'Total'} fallbackText="No registered Expenses found!"/> )
}

export default AllExpences