<script setup lang="ts">
import LogoutIcon from '@/assets/logoutIcon.vue';
const logoutAccount = () => {
    localStorage.removeItem('token');
}
</script>

<template>
    <nav class="navbar">
        <img src="../assets/logo.png" class="logo" alt="Task Manager Logo">
        <p class="logo-text">Task Manager</p>
        <div class="nav-links">
            <RouterLink to="/home" class="nav-link" active-class="active">Home</RouterLink>
            <RouterLink to="/tasks" class="nav-link" active-class="active">Tasks</RouterLink>
            <RouterLink to="/about" class="nav-link" active-class="active">About</RouterLink>
        </div>
        <RouterLink to="/login" class="nav-link logout" aria-label="Logout" @click="logoutAccount">
            <div class="logout-content">
                Logout
                <LogoutIcon fill-color="#FFFFFF" />
            </div>
        </RouterLink>
    </nav>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@700&display=swap');

.logout-content {
    display: flex;
    align-items: center;
}

.navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: var(--color-heading);
    padding: 1rem 2rem;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.logo {
    width: 50px;
    height: 50px;
    transition: transform 0.3s ease;
}

.logo:hover {
    cursor: pointer;
    transform: scale(1.1);
    /* Slight zoom on hover */
}

.logo-text {
    color: var(--color-text);
    /* Battleship gray for logo text */
    font-size: 1.5rem;
    font-family: 'Roboto', sans-serif;
    margin-left: 1rem;
}

.nav-links {
    display: flex;
    justify-content: center;
    flex: 1;
    margin-left: 1rem;
    margin-right: 1rem;
}

.nav-link {
    color: var(--color-text);
    /* Battleship gray for link text */
    text-decoration: none;
    margin: 0 1.5rem;
    font-size: 1.1rem;
    font-family: 'Roboto', sans-serif;
    transition: color 0.3s ease, border-bottom 0.3s ease;

}

.nav-link:hover {
    color: var(--color-accent);
    border-bottom: 2px solid var(--vt-c-primary-soft);
}

.nav-link.active {
    color: var(--color-accent);
    /* Active link color */
    border-bottom: 2px solid var(--vt-c-primary-soft);
    /* Border to indicate active state */
}

.logout {
    margin-left: auto;
}

.logout img {
    width: 24px;
    height: 24px;
    transition: opacity 0.3s ease;
}

.logout img:hover {
    opacity: 0.7;
}
</style>
