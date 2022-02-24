import React, { useContext, useState, useEffect } from 'react';
import { Task } from '../../challenge/challenge layout/Task';
import { CodeEditor } from '../../challenge/challenge layout/CodeEditor';
import { CodePreview } from '../../challenge/challenge layout/CodePreview';
import { UserContext } from '../../../../context/global states/UserState';
import { Helmet } from 'react-helmet-async';

export const Challenge = () => {
  const [userCodeValue, setUserCodeValue] = useState('');
  const [initialUserCodeValue, setInitialUserCodeValue] = useState('');
  const { setNewDestination } = useContext(UserContext);

  useEffect(() => {
    setNewDestination({
      destination: '/dashboard/tasks/history',
      className: 'fas fa-history',
      title: 'See History',
    });
    // eslint-disable-next-line
  }, []);

  const codeValue = (value) => {
    setUserCodeValue(value);
  };

  const onChangeCodeValue = (value) => {
    setInitialUserCodeValue(value);
  };

  return (
    <>
      <Helmet>
        <title>Tasks - SortCode Challenge</title>
      </Helmet>
      <div className='task-container col-12'>
        <Task codeValue={codeValue} onChangeCodeValue={onChangeCodeValue} />
      </div>
      <div className='code-editor-container col-6'>
        <CodeEditor
          codeValue={codeValue}
          onChangeCodeValue={onChangeCodeValue}
          initialUserCodeValue={initialUserCodeValue}
        />
      </div>
      <div className='code-preview-container col-6'>
        <CodePreview
          previewing={true}
          author={'Your Code'}
          userCode={userCodeValue}
        />
      </div>
      <div className='code-nav-helper'></div>
    </>
  );
};
