import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 32,
    },
  
    main: {
      flex: 1,
      justifyContent: 'center',
    },
  
    title: {
      color: '#322153',
      fontSize: 24,
      fontFamily: 'Ubuntu_700Bold',
      maxWidth: 260,
      marginTop: 64,
      paddingBottom: 10
    },
  
    description: {
      color: '#6C6C80',
      fontSize: 16,
      marginTop: 16,
      fontFamily: 'Roboto_400Regular',
      maxWidth: 260,
      lineHeight: 24,
    },
  
    footer: {},
  
    select: {},
  
    input: {
      height: 60,
      backgroundColor: '#FFF',
      borderRadius: 10,
      marginBottom: 200,
      paddingHorizontal: 24,
      fontSize: 16,
    },
    input2: {
      height: 60,
      backgroundColor: '#FFF',
      borderRadius: 10,
      marginBottom: 8,
      paddingHorizontal: 24,
      fontSize: 16,
    },


    button: {
      backgroundColor: '#34CB79',
      height: 60,
      flexDirection: 'row',
      borderRadius: 10,
      overflow: 'hidden',
      alignItems: 'center',
      marginTop: 8,
    },
  
    buttonIcon: {
      height: 60,
      width: 60,
      backgroundColor: 'rgba(0, 0, 0, 0.1)',
      justifyContent: 'center',
      alignItems: 'center'
    },
  
    buttonText: {
      flex: 1,
      justifyContent: 'center',
      textAlign: 'center',
      color: '#FFF',
      fontFamily: 'Roboto_500Medium',
      fontSize: 16,
    },

    titleRegister: {
      fontFamily: 'Roboto_500Medium',
      justifyContent: 'center',
      textAlign: 'center',
      color: '#000',
      padding: 10,
    },

    titleAlert: {
      fontFamily: 'Roboto_500Medium',
      color: '#d34242',
      paddingBottom: 10,
    },

    mapContainer: {
      backgroundColor: '#FFF',
      borderWidth: 1,
      borderColor: '#e6e6f0',
      borderRadius: 8,
      marginBottom: 16,
      overflow: 'hidden',        
      flexDirection: 'row',
    },

    profile: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 24
    },
    avatar: {
      width: 64,
      height: 64,
      borderRadius: 32,
      backgroundColor: "#eee",

    },
    profileInfo: {
      marginLeft: 16
    },
    name: {
      fontFamily: 'Ubuntu_700Bold',
      color: '#32264d',
      fontSize: 20,
    },
    subject: {
      fontFamily: 'Roboto_400Regular',
      color: '#6a6180',
      fontSize: 12,
      marginTop: 4,
    },

    tesfg: {
      borderRadius: 8,
      marginLeft:53,
      backgroundColor: '#34cb78',
      alignItems: 'flex-end',
      width: '30%'
    },

    te: {
      alignItems: 'center',
      marginTop: 30
    },

    centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 22
    },
    modalView: {
      margin: 20,
      backgroundColor: "white",
      borderRadius: 20,
      padding: 35,
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5
    },
    buttonmodal: {
      borderRadius: 20,
      padding: 10,
      elevation: 2
    },
    buttonOpen: {
      backgroundColor: "#F194FF",
    },
    buttonClose: {
      backgroundColor: "#2196F3",
    },
    textStyle: {
      color: "white",
      fontWeight: "bold",
      textAlign: "center"
    },
    modalText: {
      marginBottom: 15,
      textAlign: "center"
    }

  });
export default styles;