import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const TaskTreeVisualization = ({ tasks, onSelectTask }) => {
  const [expandedTasks, setExpandedTasks] = useState([]);

  const toggleExpand = (taskId) => {
    setExpandedTasks(prev =>
      prev.includes(taskId)
        ? prev.filter(id => id !== taskId)
        : [...prev, taskId]
    );
  };

  const renderTask = (task, depth = 0) => {
    const isExpanded = expandedTasks.includes(task.id);
    const successTask = tasks.find(t => t.id === task.nextTaskSuccess);
    const failureTask = tasks.find(t => t.id === task.nextTaskFailure);

    return (
      <div key={task.id} style={{ marginLeft: `${depth * 20}px` }}>
        <Card className="mb-4">
          <CardHeader>
            <CardTitle className="flex justify-between items-center">
              <span>{task.title}</span>
              <Button variant="ghost" size="sm" onClick={() => toggleExpand(task.id)}>
                {isExpanded ? "Collapse" : "Expand"}
              </Button>
            </CardTitle>
            <CardDescription>{task.description}</CardDescription>
          </CardHeader>
          {isExpanded && (
            <CardContent>
              <p><strong>Criteria:</strong> {task.criteria}</p>
              <p><strong>Prompt:</strong> {task.prompt}</p>
              <div className="mt-2">
                <Button variant="outline" size="sm" onClick={() => onSelectTask(task)}>
                  Edit Task
                </Button>
              </div>
            </CardContent>
          )}
        </Card>
        {isExpanded && (
          <>
            {successTask && (
              <div className="ml-8">
                <p className="text-green-600 mb-2">Success →</p>
                {renderTask(successTask, depth + 1)}
              </div>
            )}
            {failureTask && (
              <div className="ml-8">
                <p className="text-red-600 mb-2">Failure →</p>
                {renderTask(failureTask, depth + 1)}
              </div>
            )}
          </>
        )}
      </div>
    );
  };

  const rootTasks = tasks.filter(task => !tasks.some(t => t.nextTaskSuccess === task.id || t.nextTaskFailure === task.id));

  return (
    <div>
      {rootTasks.map(task => renderTask(task))}
    </div>
  );
};

export default TaskTreeVisualization;