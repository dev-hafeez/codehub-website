import { useEffect, useState } from "react";
import axiosInstance from "../../axios";
import { Link } from "react-router-dom";

function BillsListPage() {
  const [bills, setBills] = useState([]);

  useEffect(() => {
    axiosInstance.get("/bills/")
      .then(res => setBills(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="container mt-5">
      <h2>Bills</h2>
   

      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Description</th>
            <th>Amount</th>
            <th>Date</th>
            <th>Image</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {bills.map(b => (
            <tr key={b.id}>
              <td>{b.description}</td>
              <td>{b.amount}</td>
              <td>{b.date}</td>
              <td>
                <img src={b.image} height="80" />
              </td>
              <td>
                <Link to={`/dashboard/bills/${b.id}`} className="btn btn-design btn-sm">
                  View 
                </Link>
              </td>
            </tr>
          ))}
        </tbody>

      </table>
    </div>
  );
}

export default BillsListPage;
