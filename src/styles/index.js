import {StyleSheet, Platform} from 'react-native';

export default styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'#313131',
        justifyContent: 'center',
        alignItems: 'center',
    },
    subheader: {
        height: 60,
        flexDirection: 'row',
        width: '90%',
        marginTop: 10,
        backgroundColor:'#FAC209',
        //  justifyContent: 'center',
           alignItems: 'center',
    },
    heading: {
        fontSize: 18,
        textAlign: 'center',
        margin: 10,
        
    },
    menuItem:{
        flexDirection: 'row',
        padding: 10,
        borderWidth: 0.5,
        borderColor: '#d6d7da'
    }
});