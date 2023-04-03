import React, {useState, createContext} from 'react';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import firebase from '@react-native-firebase/app';

export const AuthContext = createContext();

function AuthProvider({children}) {
  const [user, setUser] = useState(null);
  
  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        login: async (email, password) => {
          try {
            auth().signInWithEmailAndPassword(email, password);
          } catch (e) {
            console.log(e);
          }
        },

        register: async (name, email, password) => {
          try {
            await auth()
              .createUserWithEmailAndPassword(email, password)
              .then(async value => {
                let uid = value.user.uid;
                await firebase()
                  .collection('users')
                  .add({
                    name: name,
                    saldo: 0,
                  })
                  .then(() => {
                    let data = {
                      uid: uid,
                      name: name,
                      email: value.user.email,
                    };
                    setUser(data);
                  });
              });
          } catch (e) {
            console.log(e);
          }
        },

        logout: async () => {
          try {
            await auth().signOut();
          } catch (e) {
            console.log(e);
          }
        },

        createClient: async (nome, cnpj, contato, email) => {
          firestore().collection('clients').add({
            nome: nome,
            cnpj: cnpj,
            contato: contato,
            email: email,
          });
        },

        createSupplier: async (nome, tecido) => {
          firestore().collection('fornecedores').add({
            nome: nome,
            tecido: tecido,
          });
        },

        createColorRef: async (fornecedor, cor, codigo) => {
          firestore().collection('corRef').add({
            fornecedor: fornecedor,
            cor: cor,
            codigo: codigo,
          });
        },
      }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
