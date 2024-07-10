import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-6">Welcome to Task Tree Builder</h1>
      <p className="text-xl mb-8">
        Create and manage task trees that interact with the OpenAI API. Make decisions and automate your workflow.
      </p>
      <div className="space-x-4">
        <Button asChild>
          <Link to="/configure-api">Configure API</Link>
        </Button>
        <Button asChild>
          <Link to="/task-tree">Manage Task Tree</Link>
        </Button>
      </div>
    </div>
  );
};

export default Index;