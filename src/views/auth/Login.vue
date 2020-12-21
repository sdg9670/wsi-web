<template>
  <v-app>
    <v-app-bar app color="#47C83E" dark>
      <v-toolbar-title>어디였지??</v-toolbar-title>
    </v-app-bar>
    <v-main>
      <div class="text-center text-h3 font-weight-bold green--text ma-14 pt-7">
        WHERE WAS IT
      </div>
      <ValidationObserver ref="form">
        <form @submit.prevent="login">
          <v-col class="ma-auto" cols="12" sm="6" md="3">
            <ValidationProvider>
              <v-text-field
                label="E-mail"
                type="email"
                v-model="email"
                required
                outlined
              ></v-text-field>
            </ValidationProvider>

            <ValidationProvider>
              <v-text-field
                label="Password"
                type="password"
                v-model="password"
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
                LOGIN
              </v-btn>
            </v-col>
            <div class="text-center text-h6 font-weight-bold">
              <v-icon small color="blue">mdi-lock</v-icon
              ><v-btn x text color="blue" @click="findpwd">
                비밀번호가 생각나지 않으시나요?
              </v-btn>
            </div>
          </div>
        </form>
      </ValidationObserver>

      <div class="text-center">
        아이디가 없으신가요?
        <v-btn
          class="ml-4"
          outlined
          rounded
          color="#47C83E"
          dark
          to="/auth/register"
        >
          SIGN UP
        </v-btn>
      </div>
    </v-main>
  </v-app>
</template>

<script>
import { ValidationProvider, ValidationObserver } from 'vee-validate';

export default {
  data() {
    return {
      email: '',
      password: '',
    };
  },
  components: { ValidationProvider, ValidationObserver },

  watch: {
    email(n, o) {
      console.log(n, o);
    },
  },
  async created() {
    console.log('result');
  },
  mounted() {
    console.log('mounted');
  },
  methods: {
    async login() {
      const success = await this.$refs.form.validate();
      if (!success) {
        return;
      }
      const res = await this.$axios.post('/auth/login', {
        email: this.email,
        password: this.password,
      });
      if (res) {
        this.$router.push({ name: 'main', params: { email: this.email } });
      }
      console.log(res.data);
      console.log('success');
    },
    async findpwd() {
      const { value: email } = await this.$swal.fire({
        title: '비밀번호 찾기',
        input: 'email',
        inputLabel: '이메일을 입력하세요',
        inputPlaceholder: '이메일',
        showCancelButton: true,
      });
      if (email) {
        const res = await this.$axios.post('/auth/findPwd', {
          email: email,
        });
        console.log(res);
        if (res.data.sendEmail) {
          this.$swal({
            icon: 'success',
            text: '메일을 전송하였습니다.',
            showConfirmButton: false,
            timer: 1500,
          });
        }
      }
    },
  },
};
</script>

<style></style>
