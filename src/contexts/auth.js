import React, {useState, createContext} from "react";
import firebase from '../services/firebaseConfig';

export const AuthContext = createContext({});

function AuthProvider({children}) {
  const [user, setUser] = useState(null);

  async function signUp(email, password, name) {
    await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(async (value) => {
        let uid = value.user.uid;
        await firebase
          .database()
          .ref("users")
          .child(uid)
          .set({
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
  }

  return (
    <AuthContext.Provider value={{signed: !!user, user, signUp}}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;