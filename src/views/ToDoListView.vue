<script setup lang="ts">
import ToDoTable from '@/components/ToDoTable.vue';
import { importTasks, TASKS, type Task } from '@/utils/module/task';
import { onMounted, ref } from 'vue';
import PopUp from '@/components/PopUp.vue';

const tasks = ref<Task[]>([]);

const isPopUpVisible = ref(false);
const popUpMessage = ref('');

onMounted(async () => {
    if (TASKS.value.length) {
        tasks.value = TASKS.value;
    } else {
        try {
            tasks.value = await importTasks();
            TASKS.value = tasks.value;
            console.log('Loaded tasks:', tasks.value);
        } catch (error) {
            tasks.value = [];
        }
    }
});

const addTask = () => {
    console.log('Add a new task');
    const newTask = {
        title: 'New Task',
        description: 'New Task Description',
        status: 'pending',
        created_at: new Date().toISOString(),
        editMode: true,
    };
    tasks.value.push(newTask);
    TASKS.value = [...tasks.value];
};

const updateTaskHandler = (updatedTask: Task, status: boolean) => {
    if (status) {
        updatedTask.editMode = false;
    } else {
        updatedTask.editMode = true;
        isPopUpVisible.value = true;
        popUpMessage.value = 'Please enter a valid task title and description.';
    }
    console.log(updatedTask);

    tasks.value = tasks.value.map(task => (task.id === updatedTask.id || !task.id) ? updatedTask : task);
    TASKS.value = [...tasks.value];
};

const removeTaskHandler = (removedTask: Task) => {
    tasks.value = tasks.value.filter(task => task !== removedTask);
    TASKS.value = [...tasks.value];
};
</script>

<template>
    <div class="tasks-page">
        <header class="tasks-header">
            <h1>Your Tasks</h1>
            <p>Manage your daily tasks here. You can edit, update the status, and delete tasks as needed.</p>
        </header>
        <section class="add-task-section">
            <h2>To add a new task, click this button:</h2>
            <button class="add-task-btn" @click="addTask">Add a New Task!</button>
        </section>
        <section class="tasks-table">
            <ToDoTable :editable="true" :tasks="tasks" @updateTask="updateTaskHandler"
                @removeTask="removeTaskHandler" />
        </section>
        <PopUp :message="popUpMessage" :visible="isPopUpVisible" @update:visible="isPopUpVisible = $event" />
    </div>
</template>

<style scoped>
.tasks-page {
    padding: 40px 20px;
    min-height: 80vh;
    border-radius: 0 0 8px 8px;
    background-color: var(--color-background-soft);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    max-width: 1200px;
    margin: 0 auto;
}

.tasks-header {
    margin-bottom: 30px;
    text-align: center;
}

.tasks-header h1 {
    color: var(--color-heading);
    font-size: 2.5rem;
    margin-bottom: 15px;
}

.tasks-header p {
    color: var(--color-heading);
    font-size: 1.25rem;
    margin: 0 auto;
    max-width: 700px;
    text-align: left;
}

.add-task-section {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    text-align: center;
    margin-bottom: 40px;

}

.add-task-section h2 {
    color: var(--color-heading);
    font-size: 1.5rem;
}

.add-task-btn {
    background-color: var(--vt-c-primary);
    color: var(--color-light);
    padding: 8px 12px;
    font-size: 1rem;
    font-weight: bold;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

.add-task-btn:hover {
    background-color: var(--color-muted);
}

.add-task-btn:disabled {
    background-color: var(--color-muted);
    cursor: not-allowed;
}

.tasks-table {
    display: flex;
    justify-content: center;
}

.tasks-table>* {
    width: 100%;
    max-width: 100%;
    background-color: var(--color-background-soft);
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
</style>
