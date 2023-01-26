import React, {useState, createContext} from 'react';
import firebase from '../services/firebaseConfig';

export const AuthContext = createContext({});

function AuthProvider({children}) {
  const [user, setUser] = useState(null);

  async function signUp(email, password, nome) {
    await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(async value => {
        let uid = value.user.uid;
        await firebase.database().ref('users').child(uid).set({
          nome: nome,
          saldo: 0,
        })
        .then(() => {
            let data = {
                uid: uid,
                nome: nome,
                email: value.user.email
            }; 
            setUser(data);
        })
      });
  }

  return (
    <AuthContext.Provider value={{signed: !!user, user}}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
