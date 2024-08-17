<script setup lang="ts">
import { ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';
import { API_URL } from '@/utils/constants';
import { setToken, type user } from '../utils/module/user';
import PopUp from '@/components/PopUp.vue';
import { importTasks } from '@/utils/module/task';

const email = ref('');
const password = ref('');
const router = useRouter();
const loading = ref(false);
const isPopUpVisible = ref(false);
const popUpMessage = ref('Invalid email or password');

const login = async () => {
    loading.value = true;
    const user: user = {
        email: email.value,
        password: password.value,
    };
    console.log(`${API_URL}/login`);

    try {
        const response = await axios.post(`${API_URL}/login`, user);
        console.log(response.data);

        setToken(response.data.token);
        await importTasks();

        const lastRoute = localStorage.getItem('lastRoute');

        if (lastRoute) {
            router.push(lastRoute);
            localStorage.removeItem('lastRoute');
        } else {
            router.push('/home');
        }
    } catch (err: any) {
        console.log(err);
        if (err.response && err.response.status === 422) {
            isPopUpVisible.value = true;
            popUpMessage.value = 'Invalid email or password';
        } else {
            isPopUpVisible.value = true;
            popUpMessage.value = 'An unexpected error occurred. Please try again.';
        }
    } finally {
        loading.value = false;
    }
};
</script>


<template>
    <!-- * Handle API to Create new user & catch Unproccessable Content -->
    <!-- * Handle PopUps -->
    <div class="center-content">
        <div class="loginPage">
            <img src="../assets/image.png" alt="Logo" class="logo" />
            <div class="login-content">
                <div class="welcome-container">
                    <h2>Welcome Back!</h2>
                    <p>If you are not a user, click below to sign up.</p>
                    <router-link to="/register" class="signup-button">Sign Up</router-link>
                </div>

                <div class="login-container">
                    <h1 class="login-title">Login</h1>
                    <form @submit.prevent>
                        <div class="input-group">
                            <input type="email" v-model="email" placeholder="Email" />
                        </div>
                        <div class="input-group">
                            <input type="password" v-model="password" placeholder="Password" />
                        </div>
                        <div class="button-container">
                            <button class="login-button" @click="login" :disabled="loading">Log In</button>
                        </div>
                    </form>
                    <!-- * Replace "to" prop value with variable -->
                    <router-link to="/register" class="signup-link">New to the website? Sign up</router-link>
                </div>
                <PopUp :message="popUpMessage" :visible="isPopUpVisible" @update:visible="isPopUpVisible = $event" />
            </div>
        </div>
    </div>
</template>

<style scoped>
.center-content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
}

.loginPage {
    display: flex;
    flex-direction: column;
    justify-content: center;

}

.logo {
    width: auto;
    height: 100px;
    object-fit: cover;
    border-radius: 8px 8px 0 0;
}

.login-content {
    display: flex;
    align-items: stretch;
}

.welcome-container,
.login-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 2rem;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    width: 300px;
    background-color: white;
    min-height: 50vh;
}

.welcome-container {
    background-color: #007bff;
    color: white;
    border-radius: 0 0 0 8px;
}

.login-container {
    background-color: white;
    border-radius: 0 0 8px 0;
}

.welcome-container h2 {
    margin-bottom: 1rem;
    font-size: 1.8rem;
}

.welcome-container p {
    margin-bottom: 1.5rem;
    font-size: 1rem;
}

.signup-button {
    padding: 0.75rem;
    background-color: white;
    color: #007bff;
    border: none;
    border-radius: 4px;
    font-size: 1rem;
    cursor: pointer;
    transition: background-color 0.3s, color 0.3s;
    text-decoration: none;
    display: inline-block;
    width: 100%;
    text-align: center;
}

.signup-button:hover {
    background-color: #2a3138;
    color: white;
}

.login-title {
    margin-bottom: 1.5rem;
    font-size: 1.5rem;
    font-weight: bold;
    color: #333;
}

.input-group {
    margin-bottom: 1rem;
}

input {
    width: 100%;
    padding: 0.75rem;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 1rem;
}

input:focus {
    border-color: #007bff;
    outline: none;
}

.button-container {
    margin-top: 1.5rem;
}

.login-button {
    width: 100%;
    padding: 0.75rem;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    font-size: 1rem;
    cursor: pointer;
    transition: background-color 0.3s;
}

.login-button:hover {
    background-color: #0056b3;
}

.login-button:disabled {
    background-color: #ccc;
    cursor: not-allowed;
}

.signup-link {
    margin-top: 1rem;
    display: block;
    color: #007bff;
    text-decoration: none;
    font-size: 1rem;
}

.signup-link:hover {
    text-decoration: underline;
}
</style>
