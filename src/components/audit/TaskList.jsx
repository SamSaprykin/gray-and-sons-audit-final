import React, { useEffect, useState } from "react";

function TaskList() {
    const [tasks, setTasks] = useState([]);
    const [statusFilter, setStatusFilter] = useState('all');
    const [assignedToFilter, setAssignedToFilter] = useState('all');
    const [isVisible, setIsVisible] = useState(true);
    const [useLocal, setUseLocal] = useState('stg');
    const toggleVisibility = () => setIsVisible(!isVisible);

    useEffect(() => {
        const foundTasks = [];
        document
            .querySelectorAll("ul.contains-task-list li")
            .forEach((t, index) => {
                const assignedTo = t.querySelector("strong")?.textContent?.trim();
                const status = t.querySelector('input[type="checkbox"]')?.checked;
                const taskText = t.textContent.trim();
                const task = taskText.replace(assignedTo, "").replace("✅", "").trim();
                const taskId = `task${index + 1}`;
                t.id = taskId;
                foundTasks.push({ taskId, task, assignedTo, status });
            });
        setTasks(foundTasks);
    }, []);


  const originalHost = 'https://fabulous-gecko-88393f.netlify.app'
  useEffect(() => {
    let host =originalHost
    if (useLocal === 'dev') {
      host = 'http://localhost:8000'
    } else if (useLocal === 'prod') {
      host = 'https://www.grayandsons.com'
    }
    console.log('set link handler')
    window.linkHandler = (url, target) => {
      window.open(url.replace(originalHost, host), target)
    }
    console.log('set link handler', window.linkHandler)
  }, [useLocal])

  useEffect(() => {
    document.querySelectorAll('a').forEach(a => {
      const href = a.getAttribute('href')
      if (!href.startsWith(originalHost)) {
        return;
      }
      a.addEventListener('click', function(e) {
        e.preventDefault()
        window.linkHandler(e.target.getAttribute('href'), '_blank')
      })
    })
  }, [])

    const filteredTasks = tasks.filter(task => {
        if (statusFilter === 'done') {
            return task.status;
        } else if (statusFilter === 'pending') {
            return !task.status;
        }
        return true}).filter(task =>  {
        if (assignedToFilter === 'unassigned') {
            return !task.assignedTo;
        } else if (assignedToFilter !== 'all') {
            return task.assignedTo === assignedToFilter;
        }
        return true;
    });

    const uniqueAssignees = [ ...new Set(tasks.map(task => task.assignedTo).filter(Boolean))];

    return (
      <div
        className={
          "fixed flex flex-col border top-5 duration-700 ease-in-out bottom-5 w-[25vw] bg-white z-[1000] backdrop-blur drop-shadow-lg " +
          (isVisible ? "right-5" : "-right-[25vw] -translate-x-[1rem]")
        }
      >
            <button
          className={
            "bg-emerald-200 absolute top-12 bottom-0 w-[2rem] duration-500 " +
            (isVisible ? "opacity-0 -left-6" : "-left-2 opacity-100 cursor-pointer")
          }
        onClick={toggleVisibility}
        ></button>
        <div className="flex gap-4 bg-stone-200 p-2">
          <select
            className="border flex-grow"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">Status</option>
            <option value="done">Done</option>
            <option value="pending">Pending</option>
          </select>
          <select
            className="border flex-grow"
            value={assignedToFilter}
            onChange={(e) => setAssignedToFilter(e.target.value)}
          >
            <option value="all">Assigned To</option>
            <option value="unassigned">unassigned</option>
            {uniqueAssignees.map((assignee) => (
              <option key={assignee} value={assignee}>
                {assignee}
              </option>
            ))}
          </select>
          <select
            className="border flex-grow"
            value={useLocal}
            onChange={(e) => setUseLocal(e.target.value)}
          >
            <option value="stg">Stg</option>
            <option value="dev">Dev</option>
            <option value="prod">Prod</option>
          </select>
          <button
            className="rounded-full bg-red-300 w-8 h-8 flex items-center justify-center hover:bg-red-400 text-white font-bold"
            onClick={toggleVisibility}
            aria-label="Toggle visibility"
          >
            x
          </button>
        </div>
        <ul className="list-decimal overflow-auto ">
          {filteredTasks.map(({ taskId, task, assignedTo, status }) => (
            <li className="my-4" key={taskId}>
              <a
                href={`#${taskId}`}
                onClick={(e) => {
                  e.preventDefault();
                  const offset = 70;
                  const bodyRect = document.body.getBoundingClientRect().top;
                  const elementRect = document
                    .getElementById(taskId)
                    .getBoundingClientRect().top;
                  const elementPosition = elementRect - bodyRect;
                  const offsetPosition = elementPosition - offset;
                  window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth",
                  });
                }}
                className={
                  "inline text-sm hover:bg-gray-100 " +
                  (status ? "text-emerald-700" : "")
                }
              >
                {task} {assignedTo ? `@${assignedTo}` : ""} {status ? "✅" : ""}
              </a>
            </li>
          ))}
        </ul>
      </div>
    );
}

export default TaskList;
