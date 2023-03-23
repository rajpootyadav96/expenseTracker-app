import { useState } from "react"
import { StyleSheet, View, Text, Alert } from "react-native"
import { getFormatedDate } from "../../../utilites/date";
import { GlobalStyles } from "../../constants/styles";
import Button from "../UI/Button";
import Input from "./input"


const ExpenseForm = ({ onCancel, onSubmit, submitButtoLabel,defaultValues }) => {
    const [inputValues, setInputValues] = useState({
        amount:{value:defaultValues?defaultValues?.amount.toString(): '',isValid:!!defaultValues},
        date:{value: defaultValues?getFormatedDate(defaultValues?.date): '',isValid:!!defaultValues},
        description: {value:defaultValues?defaultValues?.description:'',isValid:!!defaultValues}
    });

    InputChangedHandler = (inputIdentifier, enteredValue) => {
        setInputValues((currentInputValues) => {
            return {
                ...currentInputValues,
                [inputIdentifier]: {value:enteredValue,isValid:true}
            }
        })
    }

    const submitHandler = () => {
        const expenseData = {
            amount: +inputValues.amount.value,
            date: new Date(inputValues.date.value),
            description: inputValues.description.value
        }

        const amoutIsValid=!isNaN(expenseData?.amount)&&expenseData.amount>0;
        const dateIsValid=expenseData.date.toString()!=='Invalid Date';
        const descriptionIsValid=expenseData.description.trim().length>0;
        if(!amoutIsValid || !dateIsValid || !descriptionIsValid){
            // Alert.alert('Invalid input','Please check your input values');
            setInputValues((currenInput)=>{
                return{
                    amount:{value:currenInput.amount.value,isValid:amoutIsValid},
                    date:{value:currenInput.date.value,isValid:dateIsValid},
                    description:{value:currenInput.description.value,isValid:descriptionIsValid}
                }
            })
            return
        }
        onSubmit(expenseData)

    }

const formIsInvalid=!inputValues.amount.isValid ||
                    !inputValues.date.isValid ||
                    !inputValues.description.isValid;
  

    return (<View style={styles.form}>
        <Text style={styles.title}>Your Expense</Text>
        <View style={styles.container}>
            <Input label="Amount"
                style={styles.rowInput}
                inValid={!inputValues.amount.isValid}
                textInputConfig={{
                    keyboardType: 'decimal-pad',
                    value: inputValues.amount.value,
                    onChangeText: InputChangedHandler.bind(this, 'amount',),
                }} />
            <Input label="Date"
                style={styles.rowInput}
                inValid={!inputValues.date.isValid}

                textInputConfig={{
                    placeholder: "YYYY-MM-DD",
                    maxLength: 10,
                    value: inputValues.date.value,

                    onChangeText: InputChangedHandler.bind(this, 'date',),
                }} />
        </View>

        <Input label="Description"
                inValid={!inputValues.description.isValid}
                textInputConfig={{
            multiline: true,
            // autoCorrect:false,
            value: inputValues.description.value,

            onChangeText: InputChangedHandler.bind(this, 'description',),
        }} />
        {formIsInvalid && (<Text style={styles.errorText}>Invalid input values - please check your entered data!</Text>)}

        <View style={styles.buttons}>
            <Button style={styles.button} mode="flat" onPress={onCancel}>Cancel</Button>
            <Button style={styles.button} onPress={submitHandler}>{submitButtoLabel}</Button>
        </View>
    </View>)
}

export default ExpenseForm

const styles = StyleSheet.create({
    form: {
        marginTop: 40
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
        marginVertical: 24,
        textAlign: 'center'
    },
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    rowInput: {
        flex: 1
    },
    buttons: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    button: {
        minWidth: 120,
        marginHorizontal: 8
    },
    errorText:{
        textAlign:'center',
        color:GlobalStyles.colors.error500,
        margin:8
    }
})