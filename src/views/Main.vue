<template>
  <v-app>
    <v-app-bar app color="#47C83E" dark>
      <v-toolbar-title>어디였지??</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-menu offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-btn v-bind="attrs" v-on="on" icon>
            <v-icon large>mdi-cog</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item
            v-for="(item, index) in items"
            :key="index"
            @click="menuActionClick(item.action)"
          >
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>

    <v-main>
      <v-card style="width: 100%; height: 100%;">
        <Map></Map>
        <SideBar></SideBar>
      </v-card>
    </v-main>
  </v-app>
</template>

<script>
import Map from '@/components/main/Map.vue';
import SideBar from '@/components/main/SideBar.vue';

export default {
  data() {
    return {
      items: [
        { title: '비밀번호 변경', action: 'changePwd' },
        { title: '로그아웃', action: 'logout' },
      ],
      dialog: '',
    };
  },
  components: {
    Map,
    SideBar,
  },
  methods: {
    // 메뉴 버튼 액션
    async menuActionClick(action) {
      if (action === 'changePwd') {
        console.log('changePWd');

        const { value: password } = await this.$swal.fire({
          title: '비밀번호 변경',
          input: 'password',
          inputLabel: '새 비밀번호를 입력하세요',
          inputPlaceholder: '새 비밀번호',
          inputAttributes: {
            minlength: 8,
          },
          showCancelButton: true,
        });

        // 비밀번호 변경
        if (password) {
          const res = await this.$axios.post('/auth/changePwd', {
            password: password,
          });
          console.log(res.data);
          if (res.data.changePwd) {
            this.$swal({
              icon: 'success',
              text: '비밀번호 변경에 성공하였습니다.',
              showConfirmButton: false,
              timer: 1500,
            });
          }
        }
      }
      // 로그아웃
      else if (action === 'logout') {
        await this.$swal({
          icon: 'success',
          text: '로그아웃 되셨습니다.',
          showConfirmButton: false,
          timer: 1500,
        });
        document.cookie.split(';').forEach(function(c) {
          document.cookie = c
            .replace(/^ +/, '')
            .replace(
              /=.*/,
              '=;expires=' + new Date().toUTCString() + ';path=/'
            );
        });
        this.$router.push({ name: 'authLogin' });
      }
    },
  },
};
</script>

<style></style>
