<script setup lang="ts">
import PopUp from '@/components/PopUp.vue';
import { API_URL } from '@/utils/constants';
import { setToken } from '@/utils/module/user';
import axios from 'axios';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const name = ref('');
const email = ref('');
const password = ref('');
const conirmedPassword = ref('');
const loading = ref(false);

const popUpMessage = ref('');
const isPopUpVisible = ref(false);

const router = useRouter();

const register = async () => {
    loading.value = true;
    const user = {
        email: email.value,
        name: name.value,
        password: password.value,
        password_confirmation: conirmedPassword.value,
    }
    console.log(user);
    await axios
        .post(`${API_URL}/register`, user)
        .then((response) => {
            console.log(response.data)
            setToken(response.data.token)

            const lastRoute = localStorage.getItem('lastRoute');

            if (lastRoute) {
                router.push(lastRoute);
                localStorage.removeItem('lastRoute');
            } else {
                router.push('/home');
            }
        })
        .catch((err) => {
            console.log(err.message);
            popUpMessage.value = 'Invalid Credentials'
            isPopUpVisible.value = true;
        }).finally(() => {
            loading.value = false;
        });
}
</script>


<template>
    <!-- * Catch Unproccessable Content -->
    <!-- * Handle PopUps -->
    <div class="center-content">
        <div class="signup-content">
            <div class="message-container">
                <h2>Join Us Today!</h2>
                <p>Sign up to access exclusive features and stay updated with the latest news.</p>
                <p>Already have an account? <router-link to="/login" class="login-button">Log in here</router-link>
                </p>
            </div>
            <div class="signup-container">
                <h1 class="signup-title">Sign Up</h1>
                <form @submit.prevent>
                    <div class="input-group">
                        <input type="text" v-model="name" placeholder="Username" />
                    </div>
                    <div class="input-group">
                        <input type="email" v-model="email" placeholder="Email" />
                    </div>
                    <div class="input-group">
                        <input type="password" v-model="password" placeholder="Password" />
                    </div>
                    <div class="input-group">
                        <input type="password" v-model="conirmedPassword" placeholder="Confirm Password" />
                    </div>
                    <div class="button-container">
                        <button class="signup-button" @click="register" :disabled="loading">Sign Up</button>
                    </div>
                </form>
                <!-- * Replace "to" prop value with variable -->
                <router-link to="/login" class="login-link">Already have an account? Log in</router-link>
            </div>
            <PopUp :message="popUpMessage" :visible="isPopUpVisible" @update:visible="isPopUpVisible = $event" />
        </div>
    </div>
</template>

<style scoped>
.center-content {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
}

.signup-content {
    display: flex;
    align-items: stretch;
}

.message-container {
    background-color: #007bff;
    color: #ffffff;
    padding: 2rem;
    border-radius: 8px 0 0 8px;
    width: 300px;
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
}

.message-container h2 {
    margin-bottom: 1rem;
    font-size: 1.8rem;
}

.message-container p {
    margin-bottom: 1rem;
    font-size: 1rem;
}

.login-button {
    margin-top: 1em;
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

.login-button:hover {
    background-color: #2a3138;
    color: white;
}

.signup-container {
    background-color: white;
    padding: 2rem;
    border-radius: 0 8px 8px 0;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    width: 300px;
    text-align: center;
    transition: transform 0.5s ease-in-out;
}

.signup-title {
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

.signup-button {
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

.signup-button:hover {
    background-color: #0056b3;
    transform: translateY(-2px);
}

.signup-button:disabled {
    background-color: var(--color-muted);
    cursor: not-allowed;
}

.login-link {
    margin-top: 1rem;
    display: block;
    color: #007bff;
    text-decoration: none;
    font-size: 1rem;
}

.login-link:hover {
    text-decoration: underline;
}
</style>
