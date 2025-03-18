<template>
    <div>
      <div class="bg-login">
        <Header />
        <div class="login-conteiner">
          <div class="login-conteiner-bg">
            <div class="login-conteiner-header">
              <p class="login-conteiner-header-text">Войти</p>
            </div>
            <div class="login-choice-earn">
              <div class="login-choice-earn-passive-income">
                <button
                  @click.prevent="handleClick('passive')"
                  :class="{ 'active-button': activeButton === 'passive' }"
                  type="button"
                >
                  <p class="login-choice-earn-text">Пассивный заработок</p>
                </button>
                <div
                  class="icon-question"
                  data-tooltip="Пассивный доход - это способ зарабатывать без активного участия"
                >
                  <img src="../assets/img/icon-question.png" alt="" />
                </div>
              </div>
              <div class="login-choice-earn-public-trading">
                <button
                  @click.prevent="handleClick('trading')"
                  :class="{ 'active-button': activeButton === 'trading' }"
                  type="button"
                >
                  <p class="login-choice-earn-text">Публичный трейдинг</p>
                </button>
                <div
                  class="icon-question"
                  data-tooltip="Публичный трейдинг - совместная торговля с другими участниками"
                >
                  <img src="../assets/img/icon-question.png" alt="" />
                </div>
              </div>
            </div>
            <form @submit.prevent="signIn">
              <div class="login-input-conteiner">
                <div>
                  <input
                    class="login-input-email"
                    ref="emailInput"
                    :class="{ 'placeholder-hidden': isEmailFocused }"
                    @focus="onEmailFocus"
                    @blur="onEmailBlur"
                    v-model="email"
                    type="email"
                    placeholder="Ваш email"
                  />
                </div>
                <div>
                  <input
                    class="login-input-password"
                    ref="passwordInput"
                    :class="{ 'placeholder-hidden': isPasswordFocused }"
                    @focus="onPasswordFocus"
                    @blur="onPasswordBlur"
                    v-model="password"
                    type="password"
                    placeholder="Ваш пароль"
                  />
                </div>
              </div>
              <div class="login-btn-conteiner">
                <div class="login-btn">
                  <button
                    type="submit"
                    class="login-btn"
                    @focus="clearErrors"
                  >
                    Войти
                  </button>
                </div>
                <p class="login-resset-password-text">Забыли пароль?</p>
              </div>
              <div class="error-container">
                <div v-if="successMsg" class="success-message">
                  {{ successMsg }}
                </div>
                <div v-if="errorMsg" class="error-message">
                  {{ errorMsg }}
                </div>
                <div v-if="profileTypeError" class="error-message">
                  {{ profileTypeError }}
                </div>
              </div>
              <div class="line-conteiner">
                <div class="line-3"></div>
              </div>
              <div class="login-not-acc-conteiner">
                <p class="login-not-acc-text">Еще нет аккаунта?</p>
                <NuxtLink to="register"
                  ><p class="login-register-text">Зарегистрироваться</p>
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
  import { ref } from 'vue';
  
  const activeButton = ref(null);
  const isEmailFocused = ref(false);
  const isPasswordFocused = ref(false);
  const emailInput = ref(null);
  const passwordInput = ref(null);
  
  const client = useSupabaseClient();
  const email = ref('');
  const password = ref('');
  const errorMsg = ref(null);
  const successMsg = ref(null);
  const profileTypeError = ref(null); // Новая переменная для ошибки выбора профиля
  
  async function signIn() {
    clearErrors();
  
    // Проверка выбора типа профиля
    if (!activeButton.value) {
      profileTypeError.value = 'Пожалуйста, выберите тип профиля (пассивный заработок или публичный трейдинг)';
      return;
    }
  
    // Валидация полей
    if (!email.value) {
      errorMsg.value = 'Пожалуйста, введите электронную почту';
      return;
    }
  
    if (!password.value) {
      errorMsg.value = 'Пожалуйста, введите пароль';
      return;
    }
  
    try {
      console.log('Attempting to sign in with:', email.value, password.value);
      const { error } = await client.auth.signInWithPassword({
        email: email.value,
        password: password.value,
      });
      if (error) {
        // Обрабатываем стандартные ошибки Supabase и переводим их на русский
        switch (error.message) {
          case 'Invalid login credentials':
            errorMsg.value = 'Неверный email или пароль';
            break;
          case 'Email not confirmed':
            errorMsg.value = 'Email не подтвержден';
            break;
          case 'Unable to validate email address: invalid format':
            errorMsg.value = 'Неверный формат email';
            break;
          default:
            errorMsg.value = 'Произошла ошибка при входе: ' + error.message;
            break;
        }
        throw error;
      }
      successMsg.value = 'Вход выполнен успешно';
      console.log('Sign-in successful, navigating to /profile');
      navigateTo('/profile_trading');
    } catch (error) {
      console.error('Ошибка входа:', error.message);
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
    if (emailInput.value?.value === '') {
      isEmailFocused.value = false;
    }
  }
  
  function onPasswordFocus() {
    isPasswordFocused.value = true;
  }
  
  function onPasswordBlur() {
    if (passwordInput.value?.value === '') {
      isPasswordFocused.value = false;
    }
  }
  
  function clearErrors() {
    errorMsg.value = null;
    successMsg.value = null;
    profileTypeError.value = null; 
  }
  </script>

<style>

</style>