import React from 'react';

const WelcomeMessage = ({ email, user, onLogout }) => {
  return (
    <div className="container d-flex flex-column align-items-center justify-content-start" style={{ height: '100vh', padding: '20px' }}>
      {user && user.counter > 1 ? (
        <>
            <div className="row mb-2 w-100 justify-content-between">
                <div className="col" style={{ fontSize: '130%' }}>
                    <pre>
                        <b>
                            <span title="Numero accessi">{user.counter}</span>     <span title="Ultimo accesso">{user.lastAccess}</span>
                        </b>
                    </pre>
                </div>
                <div className="col text-end">
                    <button id="button-logout" className="btn btn-primary" onClick={onLogout}>
                        Logout
                    </button>
                </div>
            </div>
            <div className="text-center mt-auto mb-auto">
                <h1>
                    Bentornat*<br /><br />{email}
                </h1>
            </div>
        </>
      ) : (
        <>
            <div className="row mb-2 w-100">
                <div className="col text-end">
                    <button id="button-logout" className="btn btn-primary" onClick={onLogout}>
                        Logout
                    </button>
                </div>
            </div>
            <div className="text-center mt-auto mb-auto">
                <h1>
                    Benvenut*<br /><br />{email}
                </h1>
            </div>
        </>
      )}
    </div>
  );
};

export default WelcomeMessage;
