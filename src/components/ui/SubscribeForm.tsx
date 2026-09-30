import { useState } from "react";
import { Input } from "./input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./select";
import axios from "axios";
import clsx from "clsx";
import { Button } from "./button";

const countries = [
  "United States",
  "United Kingdom",
  "Canada",
  "Australia",
  "India",
  "Germany",
  "France",
  "Brazil",
  "Japan",
];

const SubscribeForm = () => {
  const [email, setEmail] = useState("");
  const [country, setCountry] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<{ email?: string; country?: string }>(
    {},
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    const endpoint = import.meta.env.VITE_SUBSCRIBE_API_URL;
    if (!endpoint) {
      setMessage("Subscriptions are not available yet. Please check back soon.");
      return;
    }

    try {
      const response = await axios.post(endpoint, {
        email,
        country,
      });

      setMessage(response.data?.message || "Subscribed successfully!");
      setEmail("");
      setCountry("");
      setErrors({});
    } catch (error) {
      console.error("Subscription error:", error);
      setMessage("Subscription failed.");
    }
  };

  const validateForm = () => {
    const newErrors: { email?: string; country?: string } = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email || !emailRegex.test(email)) {
      newErrors.email = "Please enter a valid email.";
    }

    if (!country) {
      newErrors.country = "Please select a country.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (errors.email && emailRegex.test(value)) {
      setErrors((prev) => ({ ...prev, email: undefined }));
    }
  };

  const handleCountryChange = (value: string) => {
    setCountry(value);

    if (errors.country && value) {
      setErrors((prev) => ({ ...prev, country: undefined }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col">
      <div className="grid grid-cols-1 gap-x-[2rem] gap-y-[.8rem] lg:grid-cols-2">
        {/* Email Field */}
        <div>
          <label
            htmlFor="email"
            className="mb-[.5rem] inline-block text-[1.6rem] leading-[2.4rem]"
          >
            Work Email <span className="text-(--primary-color)">*</span>
          </label>

          <Input
            id="email"
            value={email}
            onChange={handleEmailChange}
            className={errors.email ? "border-red-500" : ""}
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-500">{errors.email}</p>
          )}
        </div>

        {/* Country Field */}
        <div>
          <label
            htmlFor="country"
            className="mb-[.5rem] inline-block text-[1.6rem] leading-[2.4rem]"
          >
            Country: <span className="text-(--primary-color)">*</span>
          </label>

          <Select value={country} onValueChange={handleCountryChange}>
            <SelectTrigger
              className={clsx(
                "h-[3rem]",
                errors.country ? "border-red-500" : "",
              )}
            >
              <SelectValue placeholder="Select your country" />
            </SelectTrigger>
            <SelectContent>
              {countries.map((c) => (
                <SelectItem key={c} value={c}>
                  {c}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.country && (
            <p className="mt-1 text-sm text-red-500">{errors.country}</p>
          )}
        </div>
      </div>

      <p className="my-[2rem] text-[1.2rem] leading-[1.44rem]">
        By clicking “Subscribe” I understand that I will receive BAA
        communications, and I agree to BAA processing my personal data in
        accordance with its <br />
        <a href="" className="hover:underline">
          Privacy Policy
        </a>
        .
      </p>

      <Button className="h-[4rem]">Submit</Button>

      {message && <p className="mt-[2rem] text-[1.8rem]">{message}</p>}
    </form>
  );
};

export default SubscribeForm;
