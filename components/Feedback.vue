<template lang="pug">
    .feedback_container#form
        h2.title.title-feedback
            | {{ statusSuccess ? lang === 'ru' ? 'Спасибо!' : 'Thank you!' : lang === 'ru' ? 'Оставить заявку' : 'Submit you request'}}
        h3.title(v-html="statusSuccess && emailStatus ? lang === 'ru' ? emailStatus : emailStatusEng : lang === 'ru' ? formDesc : formDescEng")
        form(v-if="!statusSuccess" v-on:submit.prevent="submitForm()")
            .input
                input(type="text" :class="{error: !name && errorName}" v-model="name" :placeholder="lang === 'ru' ? 'Имя' : 'Name'")

            .input
                input(type="text" :class="{error: phone.length < 16 && errorPhone}" v-model="phone" v-mask="'+7(###)-###-####'" placeholder="+7(999)-999-9999")

            .input
                textarea(v-model="comment" :placeholder="lang === 'ru' ? 'Комментарий' : 'Comment'")

            .error_text(v-if="(!name && errorName) || (phone.length < 16 && errorPhone)") {{lang === 'ru' ? 'Заполните обязательные поля' : 'Fill in required fields' }}
                div
            .button(@click="submitForm()") {{ lang === 'ru' ? 'Оставить заявку' : 'Submit you request' }}
            .lds-dual-ring(v-if="preload")
            .message(v-if="emailStatus") {{ emailStatus }}
            .message.err(v-if="emailStatusErr") {{ emailStatusErr }}



</template>

<script>
    import * as emailjs from 'emailjs-com/dist/email'
    import Contacts from '~/assets/staticData/contacts.json'
    import { mapState } from 'vuex'



    export default {
        data() {
            return {
                name: '',
                phone: '',
                comment: '',
                errorName: false,
                errorPhone: false,
                emailStatus: '',
                emailStatusEng: '',
                emailStatusErr: '',
                emailStatusErrEng: '',
                formDesc: 'Оставьте заявку и мы скоро с Вами свяжемся',
                formDescEng: 'Leave a request and we will contact you shortly',
                phoneNumber: Contacts.phoneMain,
                preload: false,
                statusSuccess: false,
            }
        },
        props: ['type'],
        components: {
        },
        methods: {
            submitForm() {
                this.emailStatus = ''
                this.emailStatusErr = ''
                this.emailStatusEng = ''
                this.emailStatusErrEng = ''


                const data = {
                    service_id: '',
                    template_id: '',
                    user_id: '',
                    template_params: {
                        'name': this.name,
                        'phone': this.phone,
                        'comment': this.comment,
                        'type': this.type
                    }
                };

                if (!this.name) {
                    this.errorName = true
                }

                if (this.phone.length < 16) {
                    this.errorPhone = true
                }

                if (this.phone.length >= 16 && this.name) {
                    this.errorName = false
                    this.errorPhone = false

                    this.preload = true
                    emailjs.send(data.service_id, data.template_id, data.template_params, data.user_id)
                        .then((res) => {
                            this.emailStatus = 'Заявка отправлена, мы скоро с Вами свяжемся'
                            this.emailStatusEng = 'Application sent, we will contact you shortly'
                            this.name = ''
                            this.phone = ''
                            this.preload = false
                            this.statusSuccess = true
                        }, (error) => {
                            this.emailStatusErr = `Что-то пошло не так, попробуйте позже или свяжитесь с нами по телефону ${this.phoneNumber}`
                            this.emailStatusErrEng = `Oops, try again later or contact us by phone ${this.phoneNumber}`
                            this.preload = false
                            this.statusSuccess = false
                        });
                }
            }
        },
        computed: {
            ...mapState('localization', [
                'lang',
            ]),
        },
        async created() {

        },
        mounted() {
            this.statusSuccess = false;
        },
        destroyed() {
            this.statusSuccess = false
        }
    }

</script>

<style lang="stylus">
    .feedback_container
        text-align center

        h2.title-feedback
            color white
            margin-bottom 20px

        h3.title
            color white
            margin-bottom 20px


        form
            display flex
            align-items center
            flex-direction column
            position relative

            .button
                margin-bottom 20px
                width 200px
                text-align center
                cursor pointer
                border 1px solid
                padding 5px 10px
                color darkRed
                background-color backgroundReverse
                &:hover
                    color backgroundReverse
                    background-color darkRed

            .error_text
                position absolute
                bottom 55px
                color #e62117

            input, textarea
                color #000
                border 1px solid #c0c0c0
                outline none
                font-size 18px
                width 65%
                max-width 500px
                padding 10px 20px 11px
                cursor pointer
                &.error
                    border-color #e62117
                    color #e62117
                    &::placeholder
                        color #e62117
                &:focus
                &:hover
                    border 1px solid orangeMain

            .input
                width 100%
                margin-bottom 20px

                &:nth-child(3)
                    margin-bottom 50px
            .message
                margin-bottom 20px
                color green
                &.err
                    color red

    .lds-dual-ring {
        display: inline-block;
        width: 25px;
        height: 25px;
        position relative
        top 10px
        margin-bottom: 30px;
    }
    .lds-dual-ring:after {
        content: " ";
        display: block;
        width: 25px;
        height: 25px;
        margin: 1px;
        border-radius: 50%;
        border: 5px solid darkRed;
        border-color: darkRed transparent darkRed transparent;
        animation: lds-dual-ring 1.2s linear infinite;
    }
    @keyframes lds-dual-ring {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }

    @media only screen and (max-width 767px)
        .feedback_container
            padding $PaddingContainersMobile

    @media only screen and (max-width 500px)
        .feedback_container
            padding $PaddingContainersMobile
            form
                input,
                textarea
                    width 100%
</style>
