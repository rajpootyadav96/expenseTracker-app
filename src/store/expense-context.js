import { createContext, useReducer } from "react";



export const ExpenseContext=createContext({
    expenses:[],
    addExpense:({description,amount,date})=>{},
    setExpense:(()=>{}),
    DeleteExpense:(id)=>{},
    updateExpense:(id,{description,amount,date})=>{}
})

const ExpenseReducer=(state,action)=>{
    switch(action.type){
        case 'ADD':
            // const id=new Date().toString() + Math.random().toString()
            return [action.payload,...state];
            case 'SET':
                const invertedArr=action.payload.reverse();
                return invertedArr;
            case 'UPDATE':
                const updatedExpenseIndex=state.findIndex((expense)=>expense.id===action.payload.id);
                const updatedExpense=state[updatedExpenseIndex];
                const updatedItem={...updatedExpense,...action.payload.data};
                const updatedExpenses=[...state]

                updatedExpenses[updatedExpenseIndex]=updatedItem;
                console.log(updatedExpenses);
                return updatedExpenses
            case 'DELETE':
                return state.filter((expense)=>{return expense.id!=action.payload})

                default:
                    return state;
    }
}

const ExpenseContextProvider=({children})=>{
    const [expenseState,dispatch]=useReducer(ExpenseReducer,[])

   const addExpense=(expenseData)=>{
        dispatch({type:'ADD',payload:expenseData})
    }

    const setExpense=(expenses)=>{
        dispatch({type:'SET',payload:expenses})
    }
   const deleteExpense=(id)=>{
        dispatch({type:'DELETE',payload:id})
    }
   const updateExpense=(id,expenseData)=>{
        dispatch({type:'UPDATE',payload:{id:id,data:expenseData}})
    }

    const value={
        expense:expenseState,
        addExpense:addExpense,
        setExpense:setExpense,
        deleteExpense:deleteExpense,
        updateExpense:updateExpense,

    };

return <ExpenseContext.Provider value={value}>{children}</ExpenseContext.Provider>
}

export default ExpenseContextProvider;