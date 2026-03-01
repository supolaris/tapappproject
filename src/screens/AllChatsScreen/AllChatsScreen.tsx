import React, {useCallback} from 'react';
import AllChats from './AllChats';

const AllChatsScreen = () => {
  const onMessagePressed = useCallback(() => {}, []);

  return <AllChats onMessagePressed={onMessagePressed} />;
};

export default AllChatsScreen;
