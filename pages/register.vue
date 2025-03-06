<template>
    <div>
        <div class="bg-register">
            <Header/>
            <div class="register-conteiner">
                <div class="register-conteiner-bg">
                    <div class="register-conteiner-header">
                        <p class="register-conteiner-header-text">Регистрация</p>
                    </div>
                    <div class="register-choice-earn">
                        <div class="register-choice-earn-passive-income">
                            <button 
                                @click.prevent="handleClick('passive')"
                                :class="{'active-button': activeButton === 'passive'}"
                                type="button"
                            >
                                <p class="register-choice-earn-text">Пассивный заработок</p>
                            </button>
                            <div class="icon-question" data-tooltip="Пассивный доход - это способ зарабатывать без активного участия">
                                <img src="../assets/img/icon-question.png" alt="">
                            </div>
                        </div>
                        <div class="register-choice-earn-public-trading">
                            <button 
                                @click.prevent="handleClick('trading')"
                                :class="{'active-button': activeButton === 'trading'}"
                                type="button"
                            >
                                <p class="register-choice-earn-text">Публичный трейдинг</p>
                            </button>
                            <div class="icon-question" data-tooltip="Публичный трейдинг - совместная торговля с другими участниками">
                                <img src="../assets/img/icon-question.png" alt="">
                            </div>
                        </div>
                    </div>
                    <form
                    @submit.prevent="signUp"
                    >
                    <div class="register-input-conteiner">
                        <div class="">
                            <input class="register-input-email"
                            ref="emailInput"
                            :class="{ 'placeholder-hidden': isEmailFocused }"
                            @focus="onEmailFocus"
                            @blur="onEmailBlur"
                            v-model="email"
                            type="email"
                            placeholder="Email"
                          />
                        </div>
                        <div class="">
                            <input class="register-input-password"
                            ref="passwordInput"
                            :class="{ 'placeholder-hidden': isPasswordFocused }"
                            @focus="onPasswordFocus"
                            @blur="onPasswordBlur"
                            v-model="password"
                            type="password"
                            placeholder="Пароль"
                          />
                        </div>
                        <div class="">
                            <input class="register-input-password"
                            ref="tryPasswordInput"
                            :class="{ 'placeholder-hidden': isTryPasswordFocused }"
                            @focus="onTryPasswordFocus"
                            @blur="onTryPasswordBlur"
                            v-model="tryPassword"
                            type="password"
                            placeholder="Повторите пароль"
                          />
                        </div>
                    </div>
                    <div class="register-btn-conteiner">
                        <div class="">
                            <button type="submit" class="register-btn"  @focus="clearErrors">Зарегистрироваться</button>
                        </div>
                    </div>
                    <div class="error-container">
                        <div v-if="successMsg" class="success-message">
                            {{ successMsg }}
                        </div>
                        <div v-if="errorMsg" class="error-message">
                            {{ errorMsg }}
                        </div>
                        <div v-if="passwordMismatch" class="error-message">
                            {{ passwordMismatch }}
                        </div>
                    </div>
                    <div class="line-conteiner">
                        <div class="line-3"></div>
                    </div>
                    <div class="register-not-acc-conteiner">
                        <p class="register-not-acc-text">Уже зарегистрированы?</p>
                        <NuxtLink
                        to="login"><p class="register-text">Войти в аккаунт</p>
                        </NuxtLink> 
                    </div>
                </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { Header } from '#components';
import { ref } from 'vue'

const activeButton = ref(null);
const isEmailFocused = ref(false);
const isPasswordFocused = ref(false);
const isTryPasswordFocused = ref(false);
const emailInput = ref(null);
const passwordInput = ref(null);
const tryPasswordInput = ref(null);

const client = useSupabaseClient();
const email = ref("");
const password = ref(null);
const tryPassword = ref(null);
const errorMsg = ref(null);
const successMsg = ref(null);
const passwordMismatch = ref(null); 

async function signUp() {
    clearErrors();
    
    // Валидация полей
    if (!email.value) {
        errorMsg.value = "Пожалуйста, введите электронную почту";
        return;
    }

    if (!password.value) {
        errorMsg.value = "Пожалуйста, введите пароль";
        return;
    }

    if (password.value.length < 6) {
        errorMsg.value = "Пароль должен содержать не менее 6 символов";
        return;
    }

    if (password.value !== tryPassword.value) {
        passwordMismatch.value = "Пароли не совпадают";
        return;
    }

    try {
        const { data, error } = await client.auth.signUp({
            email: email.value,
            password: password.value,
        });

        if (error) {
            // Перевод стандартных ошибок Supabase
            switch (error.message) {
                case 'User already exists':
                    errorMsg.value = "Пользователь с таким email уже существует";
                    break;
                case 'Invalid login credentials':
                    errorMsg.value = "Неверные учетные данные";
                    break;
                case 'Invalid email':
                    errorMsg.value = "Некорректный формат электронной почты";
                    break;
                case 'Password should be at least 6 characters':
                    errorMsg.value = "Пароль должен содержать не менее 6 символов";
                    break;
                default:
                    errorMsg.value = "Произошла ошибка при регистрации. Попробуйте позже.";
            }
            return;
        }

        successMsg.value = "На ваш email отправлено письмо с подтверждением. Пожалуйста, проверьте почту.";
        errorMsg.value = null;
        passwordMismatch.value = null;
    } catch (error) {
        errorMsg.value = "Произошла неизвестная ошибка. Попробуйте позже.";
        console.error(error);
    }
}

function handleClick(button) {
    activeButton.value = button;
    console.log('Active button:', activeButton.value);
}

function onEmailFocus() {
    isEmailFocused.value = true;
}

function onEmailBlur() {
    if (emailInput.value.value === '') {
        isEmailFocused.value = false;
    }
}

function onPasswordFocus() {
    isPasswordFocused.value = true;
}

function onPasswordBlur() {
    if (passwordInput.value.value === '') {
        isPasswordFocused.value = false;
    }
}

function onTryPasswordFocus() {
    isTryPasswordFocused.value = true;
}

function onTryPasswordBlur() {
    if (tryPasswordInput.value.value === '') {
        isTryPasswordFocused.value = false;
    }
}

function clearErrors() {
    errorMsg.value = null;
    passwordMismatch.value = null;
    successMsg.value = null;
}
</script>

<style>

</style>