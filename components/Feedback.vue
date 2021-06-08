<template lang="pug">
    .feedback_container#form
        h2.title.title-feedback
            | {{ statusSuccess ? lang === 'ru' ? 'Спасибо!' : 'Thank you!' : lang === 'ru' ? 'Сделать заказ' : 'Submit you request'}}
        form(v-if="!statusSuccess" v-on:submit.prevent="submitForm()")
            .input
                Input(type="text" name="phone" :class="{error: phone.length < 16 && errorPhone}" v-model="phone" v-mask="'+7(###)-###-####'" placeholder="+7(999)-999-9999")

            .input
                Input(type="text" :class="{error: !name && errorName}" v-model="name" :placeholder="lang === 'ru' ? 'Имя' : 'Name'")

            .input
                Input(type="text" :class="{error: !email && errorEmail}" v-model="email" placeholder="Email")

            .input
                Textarea(:placeholder="lang === 'ru' ? 'Комментарий' : 'Comment'" v-model="comment")

            Button(:classNames="['feedback-button']" :onClick="submitForm" large :disabled="preload") {{ lang === 'ru' ? 'Отправить' : 'Submit' }}

            .error_text(v-if="errorText") {{ errorText }}

            .agreement-wrapper
                Checkbox(v-model="isAgreement")
                    span.agreement-label {{lang === 'ru' ? 'Я согласен с условиями обработки' : 'text on eng'}}
                    span.agreement-label {{'\u2002'}}
                a.agreement-label.agreement-label--link(href="/") {{lang === 'ru' ? 'персональных данных' : 'text on eng'}}
            .lds-dual-ring(v-if="preload")
            .message(v-if="emailStatus") {{ emailStatus }}
            .message.err(v-if="emailStatusErr") {{ emailStatusErr }}



</template>

<script>
    import * as emailjs from 'emailjs-com/dist/email'
    import Contacts from '~/assets/staticData/contacts.json'
    import { mapState } from 'vuex'
    import Input from '@/components/ui/Input'
    import Button from '@/components/ui/Button'
    import Checkbox from '@/components/ui/Checkbox'
    import Textarea from '@/components/ui/Textarea'

    const SERVICE_ID = 'mail_ru';
    const TEMPLATE_ID = 'stone-crafting';
    const USER_ID = 'user_0qIsrdRv9hVhOoGLjqibi'

    export default {
        name: 'Feedback',
        data() {
            return {
                name: '',
                phone: '',
                email: '',
                comment: '',
                isAgreement: false,
                errorName: false,
                errorPhone: false,
                errorEmail: false,
                emailStatus: '',
                emailStatusEng: '',
                emailStatusErr: '',
                emailStatusErrEng: '',
                phoneNumber: Contacts.phoneMain,
                preload: false,
                statusSuccess: false,
                errorText: '',
            }
        },
        props: ['type'],
        components: {
            Input,
            Button,
            Checkbox,
            Textarea
        },
        methods: {
            submitForm() {
                this.emailStatus = ''
                this.emailStatusErr = ''
                this.emailStatusEng = ''
                this.emailStatusErrEng = ''
                this.errorText = ''
                this.errorName = false
                this.errorPhone = false
                this.errorEmail = false

                const data = {
                    service_id: SERVICE_ID,
                    template_id: TEMPLATE_ID,
                    user_id: USER_ID,
                    template_params: {
                        'name': this.name,
                        'phone': this.phone,
                        'email': this.email,
                        'comment': this.comment,
                        'type': this.type
                    }
                };

                if (this.email && !/\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/.test(this.email)) {
                    this.errorEmail = true
                    this.errorText = this.lang === 'ru' ? 'Поле Email заполнено с ошибкой' : 'Wrong email'
                }

                if (!this.name) {
                    this.errorName = true
                }

                if (this.phone.length < 16) {
                    this.errorPhone = true
                }

                if (!this.isAgreement) {
                    this.errorText = this.lang === 'ru' ? 'Требуется соглашение' : 'Fill in required fields'
                }

                if (this.errorName || this.errorPhone) {
                    this.errorText = this.lang === 'ru' ? 'Заполните обязательные поля' : 'Fill in required fields'
                }

                if (this.isAgreement &&
                     this.phone.length >= 16 &&
                     this.name &&
                     (this.email.length === 0 || this.email.length > 0 && !this.errorEmail)) {

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
            line-height 150%
            margin-bottom 60px
            color whiteMain

        form
            display flex
            align-items center
            flex-direction column
            position relative

            .error_text
                position absolute
                bottom 70px
                color #e62117

            .input
                width 100%
                max-width 494px
                margin-bottom 20px

                &:nth-child(4)
                    margin-bottom 50px
            .message
                position absolute
                bottom 50px
                color green
                &.err
                    color red

            .feedback-button
                min-width 494px
                margin-bottom 120px

            input:-webkit-autofill
                -webkit-box-shadow 0 0 0 50px blackBackground inset !important
            
            input:-webkit-autofill
                -webkit-text-fill-color whiteMain !important

    .agreement-wrapper
        width 100%

    .agreement-label
        font-family $TenorSans-Regular
        font-size 14px
        line-height 150%
        letter-spacing 0.03em
        color #8F8F8F

        &--link
            color goldNew !important

    .lds-dual-ring {
        display: inline-block;
        position absolute
        top unset
        bottom 50px
        width: 25px;
        height: 25px;
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

    @media only screen and (max-width 1280px)
        .feedback_container

            h2.title-feedback
                font-size 36px
                margin-bottom 34px

            form
                .error_text
                    bottom 35px

                .input
                    margin-bottom 20px

                button
                    margin-bottom 43px

                .feedback-button
                    margin-bottom 43px
                    padding 20px 20px 22px

                .message
                    &.err
                        position relative
                        bottom: -10px
                        max-width: 497px
        
        .lds-dual-ring
            bottom 30px

    @media only screen and (max-width 850px)
        .feedback_container

            h2.title-feedback
                font-size 26px
                margin-bottom 40px

            form

                .error_text
                    bottom 60px

                .input
                    max-width 322px

                    &:nth-child(3)
                        margin-bottom 20px

                 .feedback-button
                    width 322px
                    min-width 322px
                    padding 17px 17px 19px
                    margin-bottom 52px

        .lds-dual-ring
            bottom 50px

</style>
