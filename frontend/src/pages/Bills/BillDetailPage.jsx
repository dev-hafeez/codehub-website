import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "../../axios";

function BillDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [bill, setBill] = useState(null);
  const [newImage, setNewImage] = useState(null);

  useEffect(() => {
    axiosInstance.get(`/bills/${id}/`)
      .then(res => setBill(res.data))
      .catch(err => console.error(err));
  }, [id]);

  const handleSave = async () => {
    const fd = new FormData();
    fd.append("description", bill.description);
    fd.append("amount", bill.amount);
    fd.append("date", bill.date);
    if (newImage) fd.append("image", newImage);

    await axiosInstance.put(`/bills/${id}/`, fd, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    alert("Updated!");
  };

  const handleDelete = async () => {
    if (window.confirm("Delete this bill?")) {
      await axiosInstance.delete(`/bills/${id}/`);
      navigate("/dashboard/bills");
    }
  };

  if (!bill) return <p>Loading...</p>;

  return (
    <div className="container mt-5">
      <h2 className="dashboard-title">Edit Bill</h2>

      <label>Description</label>
      <textarea
        className="form-control"
        value={bill.description}
        onChange={(e) => setBill({ ...bill, description: e.target.value })}
      />

      <label>Amount</label>
      <input
        className="form-control"
        value={bill.amount}
        onChange={(e) => setBill({ ...bill, amount: e.target.value })}
      />

      <label>Date</label>
      <input
        type="date"
        className="form-control"
        value={bill.date}
        onChange={(e) => setBill({ ...bill, date: e.target.value })}
      />

      <label>Current Image</label><br />
      <img src={bill.image} height="120" />

      <label className="mt-3">Replace Image</label>
      <input type="file" className="form-control" onChange={(e) => setNewImage(e.target.files[0])} />

      <button className="btn btn-design mt-3" onClick={handleSave}>Save</button>
      <button className="btn btn-design mt-3 ms-2" onClick={handleDelete}>Delete</button>
    </div>
  );
}

export default BillDetailPage;
