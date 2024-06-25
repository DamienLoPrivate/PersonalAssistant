import TaskListItem from "./TaskListItem"

const CompletedTaskList = ({ tasks }) => {
    const completedTasks = tasks ? tasks.filter(task => task.completedStatus) : [];

    return (
        <div className="completedTasks">
            {completedTasks && completedTasks.map((task) => (
                <TaskListItem key={task._id} task={task} />
            ))}
        </div>
    )

}

export default CompletedTaskList

