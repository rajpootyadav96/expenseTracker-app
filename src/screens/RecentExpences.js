import { useContext, useEffect, useState } from "react"
import { Text } from "react-native"
import { getDateMinusDays } from "../../utilites/date"
import { fetchExpenses } from "../../utilites/http"
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput"
import ErrorOverlay from "../components/UI/ErrorOverlay"
import LoadingOverlay from "../components/UI/LoadingOverlay"
import { ExpenseContext } from "../store/expense-context"


const RecentExpences = () => {
    const [loading,setLoading]=useState(true)
    const [error,setError]=useState()
    const expensesCtx=useContext(ExpenseContext);


    useEffect(()=>{
       const getExpenses=async()=>{
        setLoading(true)
        try{
            const expenses=   await  fetchExpenses()
            expensesCtx.setExpense(expenses)

        }
        catch(error){
            setError('Could not fetch Expense!')
        }
       setLoading(false)
        }
        getExpenses()
    },[])
    const recentExpenses = expensesCtx.expense?.filter((expense) => {
        const today = new Date();
        const date7DaysAgo = getDateMinusDays(today, 7)
        return expense.date > date7DaysAgo
    })

    const errorHandler=()=>{
        setError(null)
    }

    if(error && !loading){
        return <ErrorOverlay message={error} onConfirm={errorHandler}/>
    }

    if(loading){
        return<LoadingOverlay/>

    }
    else{
        return (<ExpensesOutput expenses={recentExpenses} expensesPeriod={'Last 7 Days'} fallbackText="No expense registered for the last 7 days!" />)

    }

}

export default RecentExpences