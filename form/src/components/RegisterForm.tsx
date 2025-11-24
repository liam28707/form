import { useState } from "react";
import "./RegisterForm.css";
import { useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";;


type FormData = {
  fullName: string;
  age: string;
  email: string;
  phone: string;
  address: string;
  password: string;
  confirmPassword: string;
  worksite?: string;
};

export default function RegisterForm() {
  const registerWorker = useMutation(api.register.registerWorker);

  const [form, setForm] = useState<FormData>({
    fullName: "",
    age: "",
    email: "",
    phone: "",
    address: "",
    password: "",
    confirmPassword: "",
    worksite: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function validate() {
    const err: Record<string, string> = {};
    if (!form.fullName.trim()) err.fullName = "Full name is required";
    const ageNum = Number(form.age);
    if (!form.age || Number.isNaN(ageNum) || ageNum <= 0)
      err.age = "Enter a valid age";
    if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/))
      err.email = "Enter a valid email";
    if (!form.phone.match(/^\+?[0-9\s-]{7,20}$/))
      err.phone = "Enter a valid phone number";
    if (!form.address.trim()) err.address = "Address is required";
    if (form.password.length < 8)
      err.password = "Password must be at least 8 characters";
    if (form.password !== form.confirmPassword)
      err.confirmPassword = "Passwords don't match";
    return err;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMessage(null);
    const validation = validate();
    setErrors(validation);
    if (Object.keys(validation).length > 0) return;

    setSubmitting(true);
    try {
      const payload = {
        fullName: form.fullName.trim(),
        age: form.age ? Number(form.age) : null,
        email: form.email.trim(),
        phone: form.phone.trim(),
        address: form.address.trim(),
        worksite: form.worksite ? form.worksite.trim() : null,
        password: form.password,
      } as const;

      const result = await registerWorker(payload as any);
      console.log("registerWorker result:", result);
      setMessage("Registration successful");
      setForm({
        fullName: "",
        age: "",
        email: "",
        phone: "",
        address: "",
        password: "",
        confirmPassword: "",
        worksite: "",
      });
      setErrors({});
    } catch (err: any) {
      console.error(err);
      setMessage(err?.message || "Failed to submit — try again");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section className="register-section">
      <div className="register-container">
        <form className="register-form" onSubmit={handleSubmit} noValidate>
          <h2>SmartLife — Worker Registration</h2>
          <p className="lead"></p>
          <label>
            Full name
            <input
              name="fullName"
              value={form.fullName}
              onChange={handleChange}
              required
            />
            {errors.fullName && (
              <span className="error">{errors.fullName}</span>
            )}
          </label>

          <label>
            Age
            <input
              name="age"
              type="number"
              min={1}
              value={form.age}
              onChange={handleChange}
              required
            />
            {errors.age && <span className="error">{errors.age}</span>}
          </label>

          <label>
            Email
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              required
            />
            {errors.email && <span className="error">{errors.email}</span>}
          </label>

          <label>
            Phone number
            <input
              name="phone"
              type="tel"
              value={form.phone}
              onChange={handleChange}
              required
            />
            {errors.phone && <span className="error">{errors.phone}</span>}
          </label>

          <label>
            Address
            <textarea
              name="address"
              value={form.address}
              onChange={handleChange}
              rows={3}
              required
            />
            {errors.address && <span className="error">{errors.address}</span>}
          </label>

          <label>
            Worksite / Department (optional)
            <input
              name="worksite"
              value={form.worksite}
              onChange={handleChange}
            />
          </label>

          <label>
            Password
            <input
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              required
            />
            {errors.password && (
              <span className="error">{errors.password}</span>
            )}
          </label>

          <label>
            Confirm password
            <input
              name="confirmPassword"
              type="password"
              value={form.confirmPassword}
              onChange={handleChange}
              required
            />
            {errors.confirmPassword && (
              <span className="error">{errors.confirmPassword}</span>
            )}
          </label>

          <div className="actions">
            <button type="submit" disabled={submitting}>
              {submitting ? "Submitting…" : "Register"}
            </button>
          </div>

          {message && <p className="message">{message}</p>}
        </form>
      </div>
    </section>
  );
}
