import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';

export const InfoModal = ({ closeModal, currentUser }) => {
  const [redirect, setRedirect] = useState(false);
  // sign user out
  const signOut = () => {
    localStorage.removeItem('token');

    setRedirect(true);
  };
  return (
    <>
      {redirect && <Redirect push to='/' />}
      <div className='modal-header'>
        <h3>{currentUser.fullname}</h3>
        <p className='cnclBtn' onClick={() => closeModal()}>
          &times;
        </p>
      </div>
      <div className='modal-body'>
        <div className='table'>
          <table>
            <thead>
              <tr>
                <th>Questions Attempted</th>
                <td>
                  <i className='fas fa-arrow-right'></i>
                </td>
                <td>{currentUser.questionsAnswered}</td>
              </tr>
            </thead>
            <thead>
              <tr>
                <th>Tasks Attempted</th>
                <td>
                  <i className='fas fa-arrow-right'></i>
                </td>
                <td>{currentUser.tasks}</td>
              </tr>
            </thead>
            <thead>
              <tr>
                <th>Quiz Score</th>
                <td>
                  <i className='fas fa-arrow-right'></i>
                </td>
                <td>{currentUser.score}</td>
              </tr>
            </thead>
            <thead>
              <tr>
                <th>Challenge Upvotes</th>
                <td>
                  <i className='fas fa-arrow-right'></i>
                </td>
                <td>{currentUser.upvotes}</td>
              </tr>
            </thead>
            <thead>
              <tr>
                <th>Tasks Upvoted</th>
                <td>
                  <i className='fas fa-arrow-right'></i>
                </td>
                <td>{currentUser.hearts.length}</td>
              </tr>
            </thead>
          </table>
          <div className='logout' onClick={signOut}>
            <i className='fas fa-sign-out-alt'></i>
            <span>Logout</span>
          </div>
        </div>
      </div>
    </>
  );
};
