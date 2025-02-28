<template>
    <div>
        <div class="bg-login">
            <Header/>
            <div class="login-conteiner">
                <div class="login-conteiner-bg">
                    <div class="login-conteiner-header">
                        <p class="login-conteiner-header-text">Войти</p>
                    </div>
                    <div class="login-choice-earn">
                        <div class="login-choice-earn-passive-income">
                            <button 
                                @click.prevent="handleClick('passive')"
                                :class="{'active-button': activeButton === 'passive'}"
                                type="button"
                            >
                                <p class="login-choice-earn-text">Пассивный заработок</p>
                            </button>
                            <div class="icon-question" data-tooltip="Пассивный доход - это способ зарабатывать без активного участия">
                                <img src="../assets/img/icon-question.png" alt="">
                            </div>
                        </div>
                        <div class="login-choice-earn-public-trading">
                            <button 
                                @click.prevent="handleClick('trading')"
                                :class="{'active-button': activeButton === 'trading'}"
                                type="button"
                            >
                                <p class="login-choice-earn-text">Публичный трейдинг</p>
                            </button>
                            <div class="icon-question" data-tooltip="Публичный трейдинг - совместная торговля с другими участниками">
                                <img src="../assets/img/icon-question.png" alt="">
                            </div>
                        </div>
                    </div>
                    <div class="login-input-conteiner">
                        <div class="">
                            <input class="login-input-email"
                            ref="emailInput"
                            :class="{ 'placeholder-hidden': isEmailFocused }"
                            @focus="onEmailFocus"
                            @blur="onEmailBlur"
                            type="email"
                            placeholder="Ваш email"
                          />
                        </div>
                        <div class="">
                            <input class="login-input-password"
                            ref="passwordInput"
                            :class="{ 'placeholder-hidden': isPasswordFocused }"
                            @focus="onPasswordFocus"
                            @blur="onPasswordBlur"
                            type="password"
                            placeholder="Ваш пароль"
                          />
                        </div>
                    </div>
                    <div class="login-btn-conteiner">
                        <div class="login-btn">
                            <button class="login-btn-text">Войти</button>
                        </div>
                        <p class="login-resset-password-text">Забыли пароль?</p>
                    </div>
                    <div class="line-conteiner">
                        <div class="line-3"></div>
                    </div>
                    <div class="login-not-acc-conteiner">
                        <p class="login-not-acc-text">Еще нет аккаунта?</p>
                        <p class="login-register-text">Зарегистрироваться</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Header from "#components";

export default {
    data() {
        return {
            activeButton: null,
            isEmailFocused: false,
            isPasswordFocused: false
        }
    },
    methods: {
        handleClick(button) {
            this.activeButton = button;
            console.log('Active button:', this.activeButton);
        },
        onEmailFocus() {
            this.isEmailFocused = true;
        },
        onEmailBlur() {
            if (this.$refs.emailInput.value === '') {
                this.isEmailFocused = false;
            }
        },
        onPasswordFocus() {
            this.isPasswordFocused = true;
        },
        onPasswordBlur() {
            if (this.$refs.passwordInput.value === '') {
                this.isPasswordFocused = false;
            }
        }
    }
}
</script>

<style>

</style>