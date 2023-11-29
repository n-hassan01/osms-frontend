function Table({ tableData }) {
    return (
      <table className="table" style={{marginLeft:"25%",width:"50%"}}>
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Email</th>
            <th>Age</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((data, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{data.name}</td>
                <td>{data.email}</td>
                <td>{data.age}</td>
              </tr>
            ))}
        </tbody>
      </table>
    );
  }
  export default Table;