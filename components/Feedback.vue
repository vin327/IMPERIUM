<template>
    <div>
        <div class="feedback-conteiner">
            <div class="feedback-conteiner-bg">
                <div class="feedback-header">
                    <p class="feedback-text">Обратная связь</p>
                    <p class="feedback-header-text">Если у вас остались вопросы напишите нам и наши менеджеры свяжуться с вами как можно быстрее</p>
                </div>
                <div class="feedback-content-data">
                    <div class="">
                        <input class="feedback-input-data"
                        ref="nameInput"
                        :class="{ 'placeholder-hidden': isNameFocused }"
                        @focus="onNameFocus"
                        @blur="onNameBlur"
                        placeholder="Ваше имя"
                      />
                    </div>
                    <div class="">
                        <input class="feedback-input-data"
                        ref="emailInput"
                        :class="{ 'placeholder-hidden': isEmailFocused }"
                        @focus="onEmailFocus"
                        @blur="onEmailBlur"
                        type="email"
                        placeholder="Ваш email"
                      />
                    </div>
                </div>
                <div class="feedback-content-message">
                    <div class="">
                        <input class="feedback-input-message"
                        ref="messageInput"
                        :class="{ 'placeholder-hidden': isMessageFocused }"
                        @focus="onMessageFocus"
                        @blur="onMessageBlur"
                        placeholder="Сообщение"
                      />
                    </div>
                </div>
                <div class="feedback-send-message">
                    <div class="feedback-send-message-btn">
                        <button class="feedback-send-message-btn-text">Отправить сообщение</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  data() {
    return {
      isNameFocused: false,
      isEmailFocused: false,
      isMessageFocused: false
    }
  },
  methods: {
    onNameFocus() {
      this.isNameFocused = true;
    },
    onNameBlur() {
      if (this.$refs.nameInput.value === '') {
        this.isNameFocused = false;
      }
    },
    onEmailFocus() {
      this.isEmailFocused = true;
    },
    onEmailBlur() {
      if (this.$refs.emailInput.value === '') {
        this.isEmailFocused = false;
      }
    },
    onMessageFocus() {
       this.isMessageFocused = true;
    },
    onMessageBlur() {
      if (this.$refs.messageInput.value === '') {
        this.isMessageFocused = false;
      }
    }
  }
}
</script>

<style lang="scss" scoped>

</style>