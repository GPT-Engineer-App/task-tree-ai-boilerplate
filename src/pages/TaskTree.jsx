import { useState } from "react";
import { Button } from "@/components/ui/button";
import TaskForm from "@/components/TaskForm";
import TaskTreeVisualization from "@/components/TaskTreeVisualization";

const TaskTree = () => {
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);

  const addTask = (newTask) => {
    setTasks([...tasks, { ...newTask, id: Date.now().toString() }]);
  };

  const updateTask = (updatedTask) => {
    setTasks(tasks.map(task => task.id === updatedTask.id ? updatedTask : task));
    setSelectedTask(null);
  };

  const deleteTask = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId));
    setSelectedTask(null);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Task Tree Management</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-semibold mb-4">
            {selectedTask ? "Edit Task" : "Add New Task"}
          </h2>
          <TaskForm
            onSubmit={selectedTask ? updateTask : addTask}
            initialTask={selectedTask}
            tasks={tasks}
          />
          {selectedTask && (
            <Button
              variant="destructive"
              onClick={() => deleteTask(selectedTask.id)}
              className="mt-4"
            >
              Delete Task
            </Button>
          )}
        </div>
        <div>
          <h2 className="text-2xl font-semibold mb-4">Task Tree Visualization</h2>
          <TaskTreeVisualization
            tasks={tasks}
            onSelectTask={setSelectedTask}
          />
        </div>
      </div>
    </div>
  );
};

export default TaskTree;