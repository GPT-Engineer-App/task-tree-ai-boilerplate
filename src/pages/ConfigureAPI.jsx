import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";

const ConfigureAPI = () => {
  const [apiKey, setApiKey] = useState("");
  const { toast } = useToast();

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real application, you'd want to store this securely, possibly encrypting it
    localStorage.setItem("openai_api_key", apiKey);
    toast({
      title: "API Key Saved",
      description: "Your OpenAI API key has been saved successfully.",
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Configure OpenAI API</h1>
      <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
        <div className="space-y-2">
          <Label htmlFor="api-key">OpenAI API Key</Label>
          <Input
            id="api-key"
            type="password"
            placeholder="Enter your OpenAI API key"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            required
          />
        </div>
        <Button type="submit">Save API Key</Button>
      </form>
    </div>
  );
};

export default ConfigureAPI;