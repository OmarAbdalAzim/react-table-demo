export default function generateRandomUserData(count: number): IDataItem[] {
    const names = ['John Doe', 'Jane Smith', 'Alice Johnson', 'Bob Williams', 'Emily Brown', 'Michael Davis'];
    const organizations = ['Org1', 'Org2', 'Org3', 'Org4', 'Org5'];
    const userTypes = ['Admin', 'User', 'Guest'];
    const statuses = ['online', 'offline', 'suspended'];
    const data: IDataItem[] = [];
  
    for (let i = 0; i < count; i++) {
      const randomName = names[Math.floor(Math.random() * names.length)];
      const randomAge = Math.floor(Math.random() * 50) + 20; // Age between 20 and 70
      const randomAddress = `${Math.floor(Math.random() * 1000) + 1} Main St`;
      const randomOrganization = organizations[Math.floor(Math.random() * organizations.length)];
      const randomUserType = userTypes[Math.floor(Math.random() * userTypes.length)];
      const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
  
      data.push({
        name: randomName,
        age: randomAge,
        address: randomAddress,
        organization: randomOrganization,
        userType: randomUserType,
        status: randomStatus,
      });
    }
  
    return data;
  }
  