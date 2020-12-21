<template>
  <v-app>
    <v-app-bar app color="#47C83E" dark>
      <v-toolbar-title>어디였지??</v-toolbar-title>
    </v-app-bar>
    <v-main>
      <div class="text-center text-h4 ma-14 pt-7">비밀번호 변경하기<br /></div>
      <div class="text-center text-h8 mb-6">
        새로운 비밀번호를 입력해주세요.
      </div>
      <ValidationObserver ref="form">
        <form @submit.prevent="resetPwd">
          <v-col class="ma-auto" cols="12" sm="6" md="3">
            <ValidationProvider
              name="Password"
              rules="required|min:8"
              v-slot="{ errors }"
              vid="password"
            >
              <v-text-field
                label="Password"
                type="password"
                v-model="password"
                hide-details="2px"
                required
                outlined
              ></v-text-field>
              <FormErrorMsg :errors="errors" />
              <div class="my-4"></div>
            </ValidationProvider>

            <ValidationProvider
              name="Password Confirm"
              rules="required|min:8|confirmed:password"
              v-slot="{ errors }"
            >
              <v-text-field
                label="Confirm Password"
                type="password"
                v-model="passwordConfirm"
                hide-details=""
                required
                outlined
              ></v-text-field>
              <FormErrorMsg :errors="errors" />
              <div class="my-4"></div>
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
import FormErrorMsg from '@/components/common/FormErrorMsg';

export default {
  data() {
    return {
      password: '',
      passwordConfirm: '',
    };
  },
  props: {
    authKey: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
  },
  created() {
    console.log(this.authKey, this.email);
  },
  components: { ValidationProvider, ValidationObserver, FormErrorMsg },
  methods: {
    async resetPwd() {
      console.log('qweqweq');
      const res = await this.$axios.post('/auth/resetPwd', {
        password: this.password,
        authKey: this.authKey,
        email: this.email,
      });
      console.log(res.data);
      if (res.data.resetPwd) {
        this.$swal({
          icon: 'success',
          text: '비밀번호 변경에 성공하였습니다.',
          showConfirmButton: false,
          timer: 1500,
        });
        await this.$router.push('/auth/login');
      }
    },
  },
};
</script>

<style></style>
