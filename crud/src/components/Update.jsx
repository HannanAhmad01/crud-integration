import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Update = () => {
  const [id, setId] = useState(0);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    setId(localStorage.getItem("id"));
    setName(localStorage.getItem("name"));
    setEmail(localStorage.getItem("email"));
  }, []);

  const handleUpdate = (e) => {
    e.preventDefault();
    setError(null);

    if (!name || !email) {
      setError("All fields are required");
      return;
    }

    setIsSubmitting(true);

    axios
      .put(`https://66abbe27636a4840d7cbc271.mockapi.io/crud-integration/${id}`, {
        name: name,
        email: email,
      })
      .then(() => {
        navigate("/read");
      })
      .catch((err) => {
        setError("An error occurred while updating the entry.");
        console.error(err);
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  return (
    <>
      <h2>Update</h2>
      <form onSubmit={handleUpdate}>
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input
            type="text"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Email address</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {error && <div className="alert alert-danger">{error}</div>}

        <button type="submit" className="btn btn-success mx-2" disabled={isSubmitting}>
          {isSubmitting ? "Updating..." : "Update"}
        </button>
        <Link to="/read">
          <button className="btn btn-primary mx-2">Back</button>
        </Link>
      </form>
    </>
  );
};

export default Update;
