<script setup lang="ts">
import { onMounted, ref } from 'vue';
import ToDoTable from '../components/ToDoTable.vue';
import { importTasks, TASKS, type Task } from '@/utils/module/task';
import { ROUTES } from '@/utils/constants';
import { isPopUpVisible, popUpMessage } from '@/router/index'
import PopUp from '@/components/PopUp.vue';
const tasks = ref<Task[]>([]);

onMounted(
    async () => {
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

</script>

<template>
    <div class="home-view">
        <h1 class="title">Welcome to Home Page!
            <br>
            Here is an overview of your tasks.
        </h1>
        <div class="in-liner">
            <h2>To modify your tasks head over to the tasks page</h2>
            <button @click="$router.push(ROUTES.TASKS)" class="btn">Go to Tasks</button>
        </div>
        <div class="table-container">
            <ToDoTable :editable="false" :tasks="tasks" />
        </div>
        <PopUp :message="popUpMessage" :visible="isPopUpVisible" @update:visible="isPopUpVisible = $event" />
    </div>
</template>

<style scoped>
h2 {
    color: var(--color-heading);
}

.in-liner {
    display: flex;
    justify-content: space-evenly;
}

.btn {
    padding: 0.75rem 1.5rem;
    border-radius: 4px;
    text-decoration: none;
    color: var(--color-heading);
    font-size: 1rem;
    font-weight: bold;
    cursor: pointer;
    transition: background-color 0.3s;
}

.home-view {
    padding: 2rem;
    max-width: 1200px;
    margin: 0 auto;
}

.title {
    font-size: 2rem;
    margin-bottom: 1rem;
    color: var(--color-heading);
    text-align: center;
}

.table-container {
    display: flex;
    align-items: left;
    flex-direction: column;
    margin-top: 1rem;
    background-color: var(--color-background-soft);
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}
</style>
