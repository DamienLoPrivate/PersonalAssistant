import TaskListItem from "./TaskListItem"

const UncompletedTaskList = ({ tasks }) => {
    const uncompletedTasks = tasks ? tasks.filter(task => !task.completedStatus).sort((b, a) => a.title.localeCompare(b.title)) : [];

    return (
        <div className="tasks">
            {uncompletedTasks && uncompletedTasks.map((task) => (
                <TaskListItem key={task._id} task={task} />
            ))}
        </div>
    )

}

export default UncompletedTaskList

