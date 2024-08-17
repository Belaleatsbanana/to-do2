<script setup lang="ts">
import { ref } from 'vue';
import Popup from '../components/PopUp.vue';

const showPopup = ref(false);
const popupMessage = ref('This is a popup message!');

</script>

<template>
    <div class="about-container">
        <div class="about-content">
            <h1 class="about-heading">About This To-Do List App</h1>
            <p class="about-text">
                This To-Do List application helps you manage your tasks efficiently. With a user-friendly interface, it
                allows you to add, edit, and delete tasks, ensuring you stay organized and productive.
            </p>
            <p class="about-text">
                The app is built using modern web technologies including Vue.js and Axios ensuring a smooth
                and responsive user experience.
            </p>
            <p class="about-text">
                Whether you're managing daily chores or planning a project, this app is designed to help you stay on top
                of your tasks.
            </p>
            <button @click="showPopup = true">Show Popup</button>
            <Popup :message="popupMessage" :visible="showPopup" @update:visible="showPopup = $event" />
        </div>
    </div>
</template>

<style scoped>
.about-container {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 80vh;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.about-content {
    max-width: 800px;
    text-align: left;
    background-color: var(--vt-c-primary-soft);
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);
}

.about-heading {
    color: var(--color-heading);
    font-size: 2rem;
    margin-bottom: 20px;
}

.about-text {
    color: var(--vt-c-primary);
    font-size: 1.125rem;
    line-height: 1.8;
    margin-bottom: 16px;
}
</style>
