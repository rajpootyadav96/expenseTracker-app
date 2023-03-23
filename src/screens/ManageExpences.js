import { useContext, useLayoutEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native"
import { storeExpense,updateExpense,deleteExpense } from "../../utilites/http";
import ExpenseForm from "../components/ManageExpense/ExpenseForm";
import Button from "../components/UI/Button";
import ErrorOverlay from "../components/UI/ErrorOverlay";
import IconButton from "../components/UI/IconButton";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import { GlobalStyles } from "../constants/styles";
import { ExpenseContext } from "../store/expense-context";



const ManageExpences = ({ route, navigation }) => {
    const expensesCtx = useContext(ExpenseContext)
    const [isSubmitting,setIsSubmitting]=useState(false)
    const [error,setError]=useState()

    const editedExpenseId = route.params?.expenseId;
    const isEditing = !!editedExpenseId
    const selectedExpense = expensesCtx?.expense?.find(expense => expense?.id === editedExpenseId)


    useLayoutEffect(() => {


        navigation.setOptions({
            title: isEditing ? 'Edit Expense' : 'Add Expense'
        })
    }, [navigation, isEditing])
    const deleteExpenseHandler = async() => {
        setIsSubmitting(true)
       await deleteExpense(editedExpenseId)
    //    setIsSubmitting(false)
        expensesCtx.deleteExpense(editedExpenseId)
        navigation.goBack()
    }
    const cancelHandler = () => {
        navigation.goBack()
    }

    const confirmHandler = (expenseData) => {
        setIsSubmitting(true)
       try {if (isEditing) {
            expensesCtx.updateExpense(editedExpenseId, expenseData)
            updateExpense(editedExpenseId,expenseData)
        }
        else {
            const id = storeExpense(expenseData)
            console.log('id',id);
            expensesCtx.addExpense({ ...expenseData, id: id })
        }
        navigation.goBack()
    
    }
        catch(error){
            setError('Could not fetch Expense!');
        setIsSubmitting(false)

        }

    }
    const errorHandler=()=>{
        setError(null)
    }

    if(error && !isSubmitting){
        return <ErrorOverlay message={error} onConfirm={errorHandler}/>
    }


        if(isSubmitting){
           return <LoadingOverlay/>
        }
            return (
                <View style={styles.container}>
                    <ExpenseForm onCancel={cancelHandler}
                        submitButtoLabel={isEditing ? 'Update' : 'Add'}
                        onSubmit={confirmHandler}
                        defaultValues={selectedExpense}
                    />
        
                    {isEditing && (
                        <View style={styles.deleteContainer}>
                            <IconButton color={'red'} onPress={deleteExpenseHandler} icon={require('../constants/Assets/trash.png')} />
                        </View>
                    )}
                </View>
            )

   
}

export default ManageExpences;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        backgroundColor: GlobalStyles.colors.primary800
    },
    deleteContainer: {
        marginTop: 16,
        paddingTop: 8,
        borderTopWidth: 2,
        borderTopColor: GlobalStyles.colors.primary200,
        alignItems: 'center'
    },

})