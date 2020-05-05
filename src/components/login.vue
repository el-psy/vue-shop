<template>
  <div class="login_content">
    <div class="login_box">
      <div class="avatar_box">
        <img src="../assets/logo.png" alt />
      </div>
      <el-form ref="loginFormRef" label-width="0px" class="login-form" :rules="loginFormRules" :model="loginForm">
        <el-form-item label="" prop="username">
          <el-input  prefix-icon="iconfont icon-user" v-model="loginForm.username"></el-input>
        </el-form-item>
		<el-form-item label="" prop="password">
          <el-input type="password" prefix-icon="iconfont icon-3702mima" v-model="loginForm.password"></el-input>
        </el-form-item>
		<el-form-item class="btns">
          <el-button type="primary" @click="login">登录</el-button>
		  <el-button type="info" @click="resetLoginForm">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
	data(){
		return {
			loginForm:{
				username:'admin',
				password:'123456'
			},
			loginFormRules:{
				username:[
					{required: true, message: '请输入登录名称', trigger: 'blur'},
					{min: 3, max: 10, message: '长度在3到10个字符之间', trigger: 'blur'}
				],
				password:[
					{required: true, message: '请输入密码', trigger: 'blur'},
					{min: 6, max: 15, message: '长度在6到15个字符之间', trigger: 'blur'}
				]
			}
		}
	},
	methods:{
		resetLoginForm(){
			// console.log(this.$refs);
			this.$refs.loginFormRef.resetFields();
		},
		login(){
			this.$refs.loginFormRef.validate(async valid => {
				// console.log(valid);
				if(!valid) return ;
				const {data:result}=await this.$http.post('login',this.loginForm);
				if(result.meta.status!==200) return this.$message.error('登录失败');
				this.$message.success('登录成功');
				console.log(result);
				window.sessionStorage.setItem('token',result.data.token);
				this.$router.push('/home');
			});
		}
	}
};
</script>

<style lang="less" scoped>
.login_content {
  background-color: #2b4b6b;
  height: 100%;
}
.login_box {
  width: 450px;
  height: 300px;
  background-color: #fff;
  border-radius: 3px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}

.avatar_box {
  width: 130px;
  height: 130px;
  border: 1px solid #eee;
  border-radius: 50%;
  padding: 10px;
  box-shadow: 0 0 10px #ddd;
  background-color: #fff;
  img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background-color: #eee;
  }
  position: absolute;
  left: 50%;
  transform: translate(-50%, -50%);
}

.btns {
	display: flex;
	justify-content: flex-end;
}

.login-form {
	position: absolute;
	bottom: 0;
	width: 100%;
	padding: 0 20px;
	box-sizing: border-box;
}
</style>