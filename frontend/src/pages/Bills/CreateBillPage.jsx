import { useState } from "react";
// NOTE: axiosInstance is assumed to be defined elsewhere and imported correctly.
import axiosInstance from "../../axios";
import "./CreateBill.css"; // Imports the CSS for styling
import { useNavigate } from "react-router-dom";
function CreateBillPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    description: "",
    amount: "",
    date: "",
  });

  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  /**
   * Clears the image state and preview URL, and resets the file input element.
   */
  const removeImage = () => {
    setImage(null);
    setImagePreview(null);
    // Use the ID to clear the file input field visually
    const input = document.getElementById("bill-image-upload");
    if (input) input.value = null;
  };

  /**
   * Handles the file input change, setting the image file and generating a preview URL.
   * @param {Event} e - The change event from the file input.
   */
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Clear previous URL before setting new one to avoid memory leak
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview);
      }
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    } else {
      removeImage();
    }
  };

  /**
   * Handles form submission, uploads data to the backend via FormData,
   * includes validation and alerts for success/failure.
   * @param {Event} e - The form submission event.
   */
  const handleSubmit = async (e) => {
    e.preventDefault();

    // 1. Input Validation Check
    if (!form.description.trim() || !form.amount || !form.date) {
      alert("Error: All input fields (Description, Amount, Date) must be filled.");
      return; // Stop the submission process
    }

    const fd = new FormData();
    fd.append("description", form.description);
    const amountInCents = Math.round(parseFloat(form.amount) * 100);
fd.append("amount", amountInCents);
    fd.append("amount", form.amount);
    fd.append("date", form.date);
    
    // Only append the image if it exists
    if (image) {
      fd.append("image", image);
    }

    try {
      await axiosInstance.post("/bills/", fd, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      // 2. Success Alert
      alert("Success! Bill added successfully.");

      // Reset form state
      setForm({ description: "", amount: "", date: "" });
      removeImage(); 
      navigate("/dashboard/bills");
    } catch (err) {
      console.error("Failed to upload bill:", err);
      
      // 3. Error Alert with detail (if available)
      const errorMessage = err.response?.data
        ? JSON.stringify(err.response.data, null, 2) // Backend specific error details
        : err.message; // Generic error message like network issues
        
      alert(`Error submitting bill: ${errorMessage}. Please check your input.`);
    }
  };

  return (
    <div className="create-bill-wrapper">
      <div className="form-card">
        <h2 className="dashboard-title">Create Bill</h2>

        <form onSubmit={handleSubmit}>
          {/* Description */}
          <div className="form-group">
            <label className="custom-label">Description</label>
            <textarea
              className="custom-textarea"
              placeholder="Enter bill details"
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
            />
          </div>

          {/* Amount */}
          <div className="form-group">
            <label className="custom-label">Amount</label>
            <input
              type="number"
              className="custom-input"
              placeholder="0.00"
              value={form.amount}
              onChange={(e) => setForm({ ...form, amount: e.target.value })}
            />
          </div>

          {/* Date */}
          <div className="form-group">
            <label className="custom-label">Date</label>
            <input
              type="date"
              className="custom-input"
              value={form.date}
              onChange={(e) => setForm({ ...form, date: e.target.value })}
            />
          </div>

          {/* File Input */}
          <div className="form-group">
            <label className="custom-label">Upload Images</label>
            <input
              type="file"
              id="bill-image-upload" // Important: ID for clearing input
              accept="image/*"
              className="custom-input file-input-wrapper"
              onChange={handleImageChange}
            />
          </div>

          {/* IMAGE PREVIEW using event styling */}
          {imagePreview && (
            <div className="image-preview-container single-image-container">
              {/* File Name Display */}
              <div className="file-name-display-bill">
                  <span className="file-name-text">{image ? image.name : ''}</span>
              </div>
              
              {/* Image Box */}
              <div className="image-preview-box">
                <img src={imagePreview} alt="Preview" className="image-preview" />
                <button
                  type="button"
                  className="remove-image-btn"
                  onClick={removeImage}
                  aria-label="Remove image"
                >
                  ✕
                </button>
              </div>
            </div>
          )}

          <button type="submit" className="btn-submit">
            Submit Bill
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateBillPage;