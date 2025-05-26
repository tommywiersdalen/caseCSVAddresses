import { defineStore } from "pinia";
import { computed, ref } from "vue";
import type { User } from "../Utils/user";



export const useAuthStore = defineStore('auth', () => {
    const isAuthenticated = ref<boolean>(false);
    const user = ref<User | null>(null);
    const users: User[] = [
        {
            id: "1",
            name: "Ola Nordmann",
            email: "ola@example.com",
            passsword: "password123",
            role: "role1"
        },
        {
            id: "2",
            name: "Kari Nordmann",
            email: "kari@example.com",
            passsword: "password456",
            role: "role2"
        }
    ];

    const getLoggedInUser = computed(() => {
        return user.value;
    });

    function loginUser1() {
        user.value = users[0];
        isAuthenticated.value = true;

    }
    function loginUser2() {
        user.value = users[1];
        isAuthenticated.value = true;

    }

    function logout() {
        user.value = null;
        isAuthenticated.value = false;
    }


    return {
        isAuthenticated,
        user,
        getLoggedInUser,
        loginUser1,
        loginUser2,
        logout
    };
});

