<template>
  <v-app>
    <v-app-bar app color="#47C83E" dark>
      <v-toolbar-title>어디였지??</v-toolbar-title>
    </v-app-bar>
    <v-main>
      <div class="text-center text-h6 ma-14 pt-7">
        이메일로 인증 번호를 발송했습니다.<br />
        받으신 인증 번호를 입력해주세요.
      </div>
      <ValidationObserver ref="form">
        <form @submit.prevent="authEmail">
          <v-col class="ma-auto" cols="12" sm="6" md="3">
            <ValidationProvider>
              <v-text-field
                label="인증 번호"
                type="Number"
                v-model="userAuthNum"
                required
                outlined
              ></v-text-field>
            </ValidationProvider>
          </v-col>
          <div class="mb-16 text-center">
            <v-col class="ma-auto" cols="12" sm="6">
              <v-btn
                type="submit"
                style="width: 250px"
                class="white--text"
                rounded
                color="#47C83E"
                x-large
                cols
              >
                확인
              </v-btn>
            </v-col>
          </div>
        </form>
      </ValidationObserver>
    </v-main>
  </v-app>
</template>

<script>
import { ValidationProvider, ValidationObserver } from 'vee-validate';

export default {
  data() {
    return {
      userAuthNum: '',
    };
  },
  props: {
    authNum: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
  },
  components: { ValidationProvider, ValidationObserver },
  methods: {
    async authEmail() {
      console.log('authEmail', this.$route.params);
      const res = await this.$axios.post('/auth/confirmAuthNum', {
        authNum: this.authNum,
        userAuthNum: this.userAuthNum,
      });
      console.log(res.data);
      if (res.data.ConfirmAuthNum) {
        this.$swal({
          icon: 'success',
          text: '인증에 성공하였습니다.',
          showConfirmButton: false,
          timer: 1500,
        });

        await this.$axios.post('/auth/register', {
          email: this.email,
          password: this.password,
          name: this.name,
        });
        this.$router.push('/auth/login');
      }
    },
  },
};
</script>

<style></style>
