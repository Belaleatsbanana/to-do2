<script setup lang="ts">
</script>

<template>
    <div class="welcome-container">
        <div class="welcome-message">
            <h1>Welcome to Your To-Do List App!</h1>
            <p>Manage your tasks efficiently with our easy-to-use to-do list application. Sign up or log in to get
                started!</p>
            <div class="button-container">
                <router-link to="/login" class="btn btn-primary">Log In</router-link>
                <router-link to="/register" class="btn btn-secondary">Sign Up</router-link>
            </div>
        </div>
        <div class="image-container">
            <img src="../assets/w.png" alt="To-Do List" />
        </div>
    </div>
</template>

<style scoped>
.welcome-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    padding: 2rem;
    gap: 2rem;
}

.welcome-message {
    flex: 5;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    max-width: 800px;
    text-align: center;
    color: var(--vt-c-primary);
}

.welcome-message h1 {
    font-size: 2.5rem;
    margin-bottom: 1rem;
}

.welcome-message p {
    font-size: 1.2rem;
    margin-bottom: 2rem;
}

.button-container {
    display: flex;
    justify-content: center;
    gap: 1rem;
}

.btn {
    padding: 0.75rem 1.5rem;
    border-radius: 4px;
    text-decoration: none;
    color: white;
    font-size: 1rem;
    font-weight: bold;
    cursor: pointer;
    transition: background-color 0.3s;
}

.btn-primary {
    background-color: #007bff;
}

.btn-primary:hover {
    background-color: #0056b3;
}

.btn-secondary {
    background-color: #6c757d;
}

.btn-secondary:hover {
    background-color: #5a6268;
}

.image-container {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 1rem;
}

.image-container img {
    max-height: 50vh;
    max-width: 100%;
    border-radius: 8px;
}
</style>
