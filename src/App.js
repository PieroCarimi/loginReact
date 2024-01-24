import React, { useState, useEffect } from 'react';
import LoginForm from './LoginForm';
import WelcomeMessage from './WelcomeMessage';

const App = () => {
  const getEmailLogged = () => {
    const email = localStorage.getItem("email");
    return email;
  };

  const [email, setEmail] = useState(getEmailLogged());
  const [users, setUsers] = useState(() => {
    const storedUsers = localStorage.getItem("users");
    return storedUsers ? JSON.parse(storedUsers) : [];
  });

  useEffect(() => {
    // Aggiorna lo stato dopo che il localStorage è stato letto
    setEmail(getEmailLogged());
    setUsers((prevUsers) => {
      const storedUsers = localStorage.getItem('users');
      return storedUsers ? JSON.parse(storedUsers) : prevUsers;
    });
  }, []);  // Dipendenza vuota per eseguire solo all'inizio

  const getUserLogged = () => {
    const emailLogged = getEmailLogged();
    return users.find((user) => user.email === emailLogged);
  };

  const saveEmailLogged = () => {
    const email = document.getElementById('input-login').value;
    setEmail(email);
    localStorage.setItem('email', email);
  };

  const deleteEmailLogged = () => {
    setEmail('');
    localStorage.removeItem('email');
  };

  const onClickLogin = () => {
    saveEmailLogged();
    saveUserToStorage();
  };

  const onClickLogout = () => {
    writeFormLogin();
    deleteEmailLogged();
  };

  const updateUser = () => {
    const emailLogged = getEmailLogged();
    setUsers((prevUsers) => {
      const updatedUsers = prevUsers.map((user) => {
        if (user.email === emailLogged) {
          return {
            ...user,
            actualAccess: new Date().toLocaleString(),
            lastAccess: user.actualAccess,
            counter: user.counter + 1,
          };
        } else {
          return { ...user };
        }
      });
      localStorage.setItem("users", JSON.stringify(updatedUsers));
      return updatedUsers;
    });
  };
  /* const updateUser = () => {
    const prevUsers = JSON.parse(localStorage.getItem("users")) || [];
    const emailLogged = getEmailLogged();
    const user = getUserLogged();
    let lastDataLogin = user.actualAccess;
    const newUsers = prevUsers.map((user) => {
        if (user.email === emailLogged) {
            return {
                ...user,
                actualAccess: new Date().toLocaleString(),
                lastAccess: lastDataLogin,
                counter: user.counter + 1,
            };
        } else return { ...user };
    });
    localStorage.setItem("users", JSON.stringify(newUsers));
}; */

  const saveNewUser = () => {
    const emailLogged = getEmailLogged();
    const newUsers = [
      ...users,
      {
        email: emailLogged,
        actualAccess: new Date().toLocaleString(),
        lastAccess: "",
        counter: 1,
      },
    ];

    setUsers(newUsers);

    localStorage.setItem("users", JSON.stringify(newUsers));
  };

  const saveUserToStorage = () => {
    const emailLogged = getEmailLogged();
    const user = getUserLogged();
    console.log(user)
    if (!!user){
      updateUser();
    }else{ 
      saveNewUser();
    }
  };

  const writeFormLogin = () => {
    return <LoginForm onLogin={onClickLogin} />;
  };

  const writeWelcomeMessage = () => {
    const user = getUserLogged();
    return <WelcomeMessage email={email} user={user} onLogout={onClickLogout} />;
  };


  return <>{getEmailLogged() ? writeWelcomeMessage() : writeFormLogin()}</>;
};

export default App;
