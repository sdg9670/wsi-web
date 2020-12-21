import { ValidationProvider, extend } from 'vee-validate';
import { required, email, min, confirmed } from 'vee-validate/dist/rules';

extend('email', { ...email, message: '이메일 형식이 아닙니다.' });
extend('required', { ...required, message: '필수 입력항목입니다.' });
extend('min', { ...min, message: '8글자 이상이어야 합니다.' });
extend('confirmed', { ...confirmed, message: '비밀번호가 일치하지 않습니다.' });

export default ValidationProvider;
