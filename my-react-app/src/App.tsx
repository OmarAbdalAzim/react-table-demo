import React from 'react';
import TableComponent from './Components/TableComponent';
import generateRandomUserData from './Utilites/generateRandomUserData';

const App: React.FC = () => {
  const columns = [
    { Header: 'Name', accessor: 'name' },
    { Header: 'Age', accessor: 'age' },
    { Header: 'Address', accessor: 'address' },
    { Header: 'Organization', accessor: 'organization' },
    { Header: 'User Type', accessor: 'userType' },
    { Header: 'Status', accessor: 'status' },
  ];

  const randomUserData = generateRandomUserData(200);
  console.log(randomUserData);
  return <TableComponent columns={columns} data={randomUserData} />;
};

export default App;


