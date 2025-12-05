import React, { useEffect, useState } from "react";
import axiosInstance from "../../axios";
import "./blogowner.css";

const BlogOwner = () => {
  const loggedInUserId = parseInt(localStorage.getItem("user_id"));
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const res = await axiosInstance.get("/students/");
        const students = Array.isArray(res.data) ? res.data : [res.data];
        const foundStudent = students.find(
          (s) => s.user && s.user.id === loggedInUserId
        );
        if (foundStudent) {
          setStudent(foundStudent);
        }
      } catch (err) {
        console.error("Failed to fetch student profile:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchStudent();
  }, [loggedInUserId]);

  if (loading) return <p>Loading blog owner...</p>;
  if (!student) return <p>No profile found</p>;

  return (
    <div className="blog-owner-wrapper">
      <div className="blog-owner-card">
        <div className="owner-info">
          <img
            src={student.profile_pic}
            alt={student.user.first_name + " " + student.user.last_name}
            className="owner-img"
          />
          <div>
            <span className="owner-name">
              {student.user.first_name} {student.user.last_name}
            </span>
            <span className="owner-role">{student.title || "Blogger"}</span>
          </div>
        </div>

        <p className="description-text">
          {student.profile_desc || "This user hasn’t added a description yet."}
        </p>

       
      </div>
    </div>
  );
};

export default BlogOwner;
