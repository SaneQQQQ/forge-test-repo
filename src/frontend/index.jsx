import React, { useEffect, useState } from 'react';
import ForgeReconciler, { Text, useProductContext} from '@forge/react';
import { invoke, requestJira } from '@forge/bridge';

const App = () => {
  const [data, setData] = useState(null);
  const context = useProductContext();


  const [comments, setComments] = useState();


  const fetchCommentsForIssue = async () => {
      const issueId = context?.extension.issue.id;
      const res = await requestJira(`/rest/api/3/issue/${issueId}/comment`);
      const resData = await res.json();
      return resData.comments;




    };






  useEffect(() => {
    invoke('getText', { example: 'my-invoke-variable' }).then(setData);




    if (context) {
        const issueId = context.extension.issue.id;
        fetchCommentsForIssue().then(setComments);
      }
  }, [context]);

  return (
    <>
      <Text>Hello world!</Text>
      <Text>{data ? data : 'Loading...'}</Text>
      <Text>
          Number of comments on this issue: {comments?.length}
      </Text>
    </>
  );
};

ForgeReconciler.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);



