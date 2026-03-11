import React, { useState } from "react";
import { useAppContext } from "../../contexts/AppContext";
import Card from "../ui/Card";
import Input from "../ui/Input";
import Button from "../ui/Button";
import Spinner from "../ui/Spinner";

const AutomationForm: React.FC = () => {
  const { submitAutomation, isSubmitting } = useAppContext();

  // 🔹 Form State
  const [formData, setFormData] = useState({
    Name: "",
    Email: "",
    Company: "",
    Message: "",
    formMode: "standard"
  });

  const [error, setError] = useState("");

  // 🔹 Validation
  const validate = () => {
    if (!formData.Name || !formData.Email || !formData.Message) {
      setError("Please fill all required fields.");
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.Email)) {
      setError("Enter a valid email address.");
      return false;
    }

    return true;
  };

  // 🔹 Submit Handler (Uses AppContext)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!validate()) return;

    try {
      await submitAutomation({
        Name: formData.Name,
        Email: formData.Email,
        Company: formData.Company,
        Message: formData.Message,
        formMode: formData.formMode
      });

      // Reset Form on success
      setFormData({
        Name: "",
        Email: "",
        Company: "",
        Message: "",
        formMode: "standard"
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to execute workflow. Check your webhook settings.");
    }
  };

  return (
    <Card className="max-w-2xl mx-auto shadow-xl border-none">
      <div className="mb-6">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white">
          Trigger AI Workflow
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Submit details to trigger your configured automation backend.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name + Email */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Full Name *"
            placeholder="John Doe"
            value={formData.Name}
            onChange={(e) =>
              setFormData({ ...formData, Name: e.target.value })
            }
            required
          />

          <Input
            label="Email Address *"
            type="email"
            placeholder="john@example.com"
            value={formData.Email}
            onChange={(e) =>
              setFormData({ ...formData, Email: e.target.value })
            }
            required
          />
        </div>

        {/* Company */}
        <Input
          label="Company"
          placeholder="Acme Corp"
          value={formData.Company}
          onChange={(e) =>
            setFormData({ ...formData, Company: e.target.value })
          }
        />

        {/* Mode */}
        <div>
          <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
            Execution Mode
          </label>
          <select
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
            value={formData.formMode}
            onChange={(e) =>
              setFormData({ ...formData, formMode: e.target.value })
            }
          >
            <option value="standard">Standard Routing</option>
            <option value="urgent">Urgent Processing</option>
            <option value="analysis">Deep Intent Analysis</option>
          </select>
        </div>

        {/* Message */}
        <div>
          <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
            Request Details *
          </label>
          <textarea
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
            rows={4}
            placeholder="Describe automation task..."
            value={formData.Message}
            onChange={(e) =>
              setFormData({ ...formData, Message: e.target.value })
            }
            required
          />
        </div>

        {/* Error */}
        {error && (
          <div className="p-3 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-lg text-sm font-medium border border-red-100 dark:border-red-900/50">
            {error}
          </div>
        )}

        {/* Submit */}
        <Button
          type="submit"
          className="w-full h-12 rounded-xl bg-indigo-600 text-white font-bold shadow-lg shadow-indigo-100 dark:shadow-none hover:bg-indigo-700 transition-all"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <span className="flex items-center">
              <Spinner size="sm" />
              <span className="ml-2">Processing...</span>
            </span>
          ) : (
            "Run Automation"
          )}
        </Button>
      </form>
    </Card>
  );
};

export default AutomationForm;