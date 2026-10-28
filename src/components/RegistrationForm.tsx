import { useState } from "react";
import SuccessMessage from "./SuccessMessage";

interface FormData {
  fullName: string;
  email: string;
  course: string;
  comments: string;
}

function RegistrationForm() {
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    course: "",
    comments: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const validateForm = () => {
    if (formData.fullName.trim() === "") {
      setError("Name is required.");
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(formData.email)) {
      setError("Please enter a valid email.");
      return false;
    }

    if (!formData.course) {
      setError("Please select a course.");
      return false;
    }

    setError("");
    return true;
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!validateForm()) return;

    try {
      setLoading(true);

      const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        throw new Error();
      }

      setSubmitted(true);
    } catch {
      setError("Unable to submit form.");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return <SuccessMessage />;
  }

  return (
    <form onSubmit={handleSubmit}>
      <h1>Course Registration</h1>

      <input
        name="fullName"
        type="text"
        placeholder="Full Name"
        value={formData.fullName}
        onChange={handleChange}
      />

      <input
        name="email"
        type="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
      />

      <select
        name="course"
        value={formData.course}
        onChange={handleChange}
      >
        <option value="">Select Course</option>
        <option value="React">React</option>
        <option value="TypeScript">TypeScript</option>
        <option value="Full Stack">Full Stack Development</option>
      </select>

      <textarea
        name="comments"
        placeholder="Comments"
        value={formData.comments}
        onChange={handleChange}
      />

      <button type="submit" disabled={loading}>
        {loading ? "Submitting..." : "Submit"}
      </button>

      {error && <p className="error">{error}</p>}
    </form>
  );
}

export default RegistrationForm;