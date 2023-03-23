import { Image, Pressable, StyleSheet, View } from "react-native"

const IconButton=({onPress,icon,color})=>{
return <Pressable onPress={onPress} style={({pressed})=>pressed && styles.pressed}>
    <View style={styles.buttonContainer}>
        <Image style={[styles.icon,{tintColor:color?color:'white'}]} source={icon}/>
    </View>
</Pressable>
}

export default IconButton

const styles=StyleSheet.create({
    buttonContainer:{
        borderRadius:24,
        padding:6,
        margin:8,
        marginHorizontal:8,
        marginVertical:2
    },
    pressed:{
        opacity:0.75
    },
    icon:{
        height:24,
        width:24,
    }

}) 