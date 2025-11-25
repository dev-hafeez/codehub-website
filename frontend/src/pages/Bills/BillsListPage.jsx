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
      
      {/* 💡 Custom class 'bills-table-wrapper' is used for CSS targeting */}
      <div className="bills-table-wrapper"> 
        <table className="table table-bordered bills-table">
          <thead>
            <tr>
              <th>Description</th>
              <th>Amount</th>
              <th>Date</th>
              <th className="d-none d-sm-table-cell">Image</th> {/* Hide on extra small screens */}
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {bills.map(b => (
              <tr key={b.id}>
                <td data-label="Description">{b.description}</td>
                <td data-label="Amount">{b.amount}</td>
                <td data-label="Date">{b.date}</td>
                <td data-label="Image" className="d-none d-sm-table-cell"> 
                  <img src={b.image} height="80" alt="Bill" />
                </td>
                <td data-label="Action">
                  <Link to={`/dashboard/bills/${b.id}`} className="btn btn-design btn-sm w-100">
                    Edit
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>
    </div>
  );
}


export default BillsListPage;
