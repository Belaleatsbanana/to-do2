<script setup lang="ts">

const props = defineProps<{
    message: string;
    visible: boolean;
}>();

const emit = defineEmits<{
    (event: 'update:visible', value: boolean): void;
}>();

const closePopup = () => {
    emit('update:visible', false);
};
</script>

<template>
    <div v-if="props.visible" class="popup-overlay">
        <div class="popup-content">
            <p>{{ props.message }}</p>
            <button class="close-btn" @click="closePopup">Close</button>
        </div>
    </div>
</template>

<style scoped>
.popup-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.6);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
    backdrop-filter: blur(5px);
    /* Adds a subtle blur to the background */
}

.popup-content {
    background-color: var(--vt-c-primary-soft);
    padding: 2rem;
    border-radius: 12px;
    box-shadow: 0 6px 15px rgba(0, 0, 0, 0.3);
    max-width: 500px;
    width: 90%;
    position: relative;
    text-align: center;
    transition: transform 0.3s ease-in-out, opacity 0.3s ease-in-out;
    transform: translateY(0);
    opacity: 1;
}

.popup-content p {
    color: var(--vt-c-primary);
    font-size: 1.3rem;
    line-height: 1.5;
    margin-bottom: 2rem;
}

.close-btn {
    background: none;
    border: none;
    font-size: 1.2rem;
    color: var(--color-heading);
    cursor: pointer;
    transition: color 0.3s ease, transform 0.2s ease;
    bottom: 10px;
    padding: 8px;
    border-radius: 8px;
}

.close-btn:hover {
    background-color: var(--color-muted);
    transform: scale(1.1);
}

.popup-content {
    animation: popup-appear 0.3s ease-out;
}
</style>
