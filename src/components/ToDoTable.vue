<script setup lang="ts">
import { TASKS, type Task } from '@/utils/module/task';
import editTaskIcon from '@/assets/editTaskIcon.vue';
import deleteTaskIcon from '@/assets/deleteTaskIcon.vue';
import saveTaskIcon from '@/assets/saveTaskIcon.vue';
import { TOKEN } from '@/utils/module/user';
import { API_URL } from '@/utils/constants';
import axios from 'axios';

const props = defineProps<{
    editable: boolean;
    tasks: Task[];
}>();

const emit = defineEmits<{
    (event: 'updateTask', updatedTask: Task, status: boolean): void;
    (event: 'removeTask', removedTask: Task): void;
}>();

const editTask = (task: Task) => {
    task.editMode = true;
    console.log('Edit task:', task.id);
};

const saveEditTask = (task: Task) => {
    if (task.id) {
        saveTaskToApi(task);
    } else {
        addTaskToApi(task);
    }
    task.editMode = false;
    console.log('Stop edit task:', task);
};

const saveTaskToApi = (task: Task) => {
    TOKEN.value = localStorage.getItem('token');
    console.log(TOKEN.value);
    axios
    axios.put(`/tasks/${task.id}`, task, {
        baseURL: API_URL,
        headers: {
            Authorization: `Bearer ${TOKEN.value}`,
        }
    }).then((response) => {
        emit('updateTask', task, true); // Emit event to update task in parent
        console.log('Task updated:', response.data);
    }).catch((error) => {
        console.error('Error updating task:', error);
    });
};

const addTaskToApi = (task: Task) => {
    TOKEN.value = localStorage.getItem('token');

    axios.post(`/tasks`, task, {
        baseURL: API_URL,
        headers: {
            Authorization: `Bearer ${TOKEN.value}`,
        }
    }).then((response) => {
        console.log('Task added:', response.data);
        emit('updateTask', response.data, true); // Emit event to update task in parent
    }).catch((error) => {
        console.error('Error adding task:', error);
        emit('updateTask', task, false); // Emit event to update task in parent
    });
};

const removeTask = (task: Task) => {
    if (task.id) {
        removeTaskFromApi(task);
    } else {
        emit('removeTask', task); // Emit event to remove task in parent
    }
    console.log('Remove task:', task);
};

const removeTaskFromApi = (task: Task) => {
    TOKEN.value = localStorage.getItem('token');
    axios.delete(`/tasks/${task.id}`, {
        baseURL: API_URL,
        headers: {
            Authorization: `Bearer ${TOKEN.value}`,
        }
    }).then((response) => {
        console.log('Task removed:', response.data);
        TASKS.value = TASKS.value.filter((t) => t !== task);
        emit('removeTask', task); // Emit event to remove task in parent
    }).catch((error) => {
        console.error('Error removing task:', error);
    });
};
</script>

<template>
    <div v-if="props.tasks.length">
        <table class="todo-table">
            <thead>
                <tr>
                    <th class="title">Title</th>
                    <th class="description">Description</th>
                    <th class="status">Status</th>
                    <th class="created-at">Created At</th>
                    <th v-if="props.editable">Edit</th>
                    <th v-if="props.editable">Remove</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(task, index) in props.tasks" :key="index">
                    <td class="title">
                        <input v-if="task.editMode" v-model="task.title" />
                        <span v-else>{{ task.title }}</span>
                    </td>
                    <td class="description">
                        <input v-if="task.editMode" v-model="task.description" />
                        <span v-else>{{ task.description }}</span>
                    </td>
                    <td class="status">
                        <span v-if="task.editMode">
                            <select v-model="task.status" :placeholder="task.status">
                                <option value="pending">Pending</option>
                                <option value="in_Progress">In Progress</option>
                                <option value="done">Done</option>
                            </select>
                        </span>
                        <span v-else>{{ task.status }}</span>
                    </td>
                    <td class="created-at">{{ task.created_at?.split('T')[0] }}</td>
                    <td v-if="props.editable">
                        <button v-if="task.editMode" class="edit-btn" @click="saveEditTask(task)">
                            <saveTaskIcon />
                        </button>
                        <button v-else class="edit-btn" @click="editTask(task)">
                            <editTaskIcon />
                        </button>
                    </td>
                    <td v-if="props.editable">
                        <button class="remove-btn" @click="removeTask(task)">
                            <deleteTaskIcon />
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
    <div v-else>
        <h1>No tasks available</h1>
    </div>
</template>

<style scoped>
h1 {
    color: var(--color-heading);
    font-size: 2.5em;
    text-align: center;
    margin: 2rem 0;
}

.todo-table {
    width: 100%;
    border-collapse: collapse;
    background-color: var(--vt-c-primary-soft);
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.todo-table th,
.todo-table td {
    padding: 12px 15px;
    font-weight: bold;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    text-align: left;
}

.todo-table th {
    background-color: var(--color-heading);
}

.todo-table td {
    background-color: var(--color-background-soft);
    color: var(--vt-c-primary);
}

.todo-table tbody tr:hover {
    background-color: var(--color-battleship-gray);
}

.todo-table th.title,
.todo-table td.title {
    width: 25%;
    font-size: 0.9rem;
}

.todo-table th.description,
.todo-table td.description {
    width: 35%;
    font-size: 0.9rem;
}

.todo-table th.created-at,
.todo-table td.created-at {
    width: 20%;
    font-size: 0.9rem;
}

.todo-table th.status,
.todo-table td.status {
    width: 20%;
    font-size: 0.9rem;
}

.todo-table button {
    padding: 6px 12px;
    color: var(--color-seashell);
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 0.9rem;
    transition: background-color 0.3s ease;
}

.edit-btn {
    background-color: var(--color-raisin-black);
}

.edit-btn:hover {
    background-color: var(--color-muted);
}

.remove-btn {
    background-color: var(--color-red-crayola);
}

.remove-btn:hover {
    background-color: #d32f2f;
}

input {
    width: 100%;
    padding: 6px 12px;
    border: 1px solid var(--color-heading);
    border-radius: 4px;
    font-size: 0.9rem;
}

select {
    width: 100%;
    padding: 6px 12px;
    border: 1px solid var(--color-heading);
    border-radius: 4px;
    font-size: 0.9rem;
}
</style>
