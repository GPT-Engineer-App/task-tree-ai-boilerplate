import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const TaskForm = ({ onSubmit, initialTask, tasks }) => {
  const [task, setTask] = useState({
    title: "",
    description: "",
    criteria: "",
    prompt: "",
    nextTaskSuccess: "",
    nextTaskFailure: "",
  });

  useEffect(() => {
    if (initialTask) {
      setTask(initialTask);
    }
  }, [initialTask]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask({ ...task, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(task);
    setTask({
      title: "",
      description: "",
      criteria: "",
      prompt: "",
      nextTaskSuccess: "",
      nextTaskFailure: "",
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          name="title"
          value={task.title}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          name="description"
          value={task.description}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <Label htmlFor="criteria">Decision Criteria</Label>
        <Input
          id="criteria"
          name="criteria"
          value={task.criteria}
          onChange={handleChange}
          placeholder="e.g., keywords to look for in API response"
          required
        />
      </div>
      <div>
        <Label htmlFor="prompt">OpenAI API Prompt</Label>
        <Textarea
          id="prompt"
          name="prompt"
          value={task.prompt}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <Label htmlFor="nextTaskSuccess">Next Task (Success)</Label>
        <Select
          name="nextTaskSuccess"
          value={task.nextTaskSuccess}
          onValueChange={(value) => setTask({ ...task, nextTaskSuccess: value })}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select next task" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">None</SelectItem>
            {tasks.filter(t => t.id !== task.id).map(t => (
              <SelectItem key={t.id} value={t.id}>{t.title}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label htmlFor="nextTaskFailure">Next Task (Failure)</Label>
        <Select
          name="nextTaskFailure"
          value={task.nextTaskFailure}
          onValueChange={(value) => setTask({ ...task, nextTaskFailure: value })}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select next task" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">None</SelectItem>
            {tasks.filter(t => t.id !== task.id).map(t => (
              <SelectItem key={t.id} value={t.id}>{t.title}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <Button type="submit">{initialTask ? "Update Task" : "Add Task"}</Button>
    </form>
  );
};

export default TaskForm;