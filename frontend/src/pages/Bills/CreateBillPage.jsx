import { useState } from "react";
import axiosInstance from "../../axios";

function CreateBillPage() {
  const [form, setForm] = useState({
    description: "",
    amount: "",
    date: "",
  });
  const [image, setImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const fd = new FormData();
    fd.append("description", form.description);
    fd.append("amount", form.amount);
    fd.append("date", form.date);
    fd.append("image", image);

    try {
      await axiosInstance.post("/bills/", fd, {
        headers: { "Content-Type": "multipart/form-data" }
      });

      alert("Bill added!");
    } catch (err) {
      console.error(err);
      alert("Failed to upload bill");
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="dashboard-title">Add New Bill</h2>

      <form onSubmit={handleSubmit}>

        <label>Description</label>
        <textarea
          className="form-control"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />

        <label>Amount</label>
        <input
          type="number"
          className="form-control"
          value={form.amount}
          onChange={(e) => setForm({ ...form, amount: e.target.value })}
        />

        <label>Date</label>
        <input
          type="date"
          className="form-control"
          value={form.date}
          onChange={(e) => setForm({ ...form, date: e.target.value })}
        />

        <label>Bill Image</label>
        <input
          type="file"
          className="form-control"
          onChange={(e) => setImage(e.target.files[0])}
        />

        <button className="btn btn-design mt-3">Submit</button>
      </form>
    </div>
  );
}

export default CreateBillPage;
