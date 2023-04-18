import { StyleSheet } from 'react-native';
import { COLORS } from '../../constants/colors';

export default StyleSheet.create({
    login: {
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
    },
    icon: {
        width: 100,
        height: 100,
        marginBottom: 20
    },
    title: {
        fontSize: 18,
        fontWeight: '500',
        opacity: 0.7,
        marginBottom: 5
    },
    description: {
        fontSize: 14,
        opacity: 0.5,
        paddingLeft: 20,
        paddingRight: 20,
        textAlign: 'center'
    },
    form: {
        width: '100%',
        marginTop: 20
    },
    or: {
        marginTop: 15,
        marginBottom: 15,
        opacity: 0.4
    },
    registerLink: {
        color: COLORS.LIGHT_BLUE,
        fontWeight: "500",
        textAlign: 'center'
    }
});