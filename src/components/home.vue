<template>
  <el-container class="home-container">
    <el-header>
      <div>
        <img src="../assets/heima.png" />
        <span>电商后台管理系统</span>
      </div>
      <el-button type="info" @click="loginout">退出</el-button>
    </el-header>
    <el-container>
      <el-aside :width="isCollapse? '64px': '200px'">
		  <div class="toggle-button" @click="toggleCollapse">|||</div>
        <el-menu background-color="#323743" text-color="#fff" active-text-color="#4284cf" unipue-opened="true" :collapse="isCollapse" :collapse-transition="false" :router="true" :default-active="activePath">
          <el-submenu :index="item.id+''" v-for="item in menulist" :key="item.id">
            <template slot="title">
              <i :class="iconsObj[item.id]"></i>
              <span>{{item.authName}}</span>
            </template>

            <el-menu-item :index="'/'+subitem.path" v-for="subitem in item.children" :key="subitem.id" @click="saveNavState('/'+subitem.path)">
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span>{{subitem.authName}}</span>
              </template>
            </el-menu-item>

          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main>
		  <router-view></router-view>
	  </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
	created() {
    this.getMenuList();
    this.activePath=window.sessionStorage.getItem('activePath');
	},
	data(){
		return {
			menulist:[],
			iconsObj:{
				'125':'iconfont icon-user',
				'103':'iconfont icon-tijikongjian',
				'101':'iconfont icon-shangpin',
				'102':'iconfont icon-danju',
				'145':'iconfont icon-baobiao'
			},
      isCollapse:false,
      activePath:''
		}
	},
  methods: {
    loginout() {
      window.sessionStorage.clear();
      this.$router.push("/login");
	},
	async getMenuList(){
		const {data: res}=await this.$http.get('menus');
		if(res.meta.status!==200) return this.$message.error(res.meta.msg);
		this.menulist=res.data;
		// console.log(res);
	},
	toggleCollapse(){
		this.isCollapse=!this.isCollapse;
  },
  saveNavState(activePath){
    window.sessionStorage.setItem('activePath', activePath);
    this.activePath=activePath;
  }
  }
};
</script>

<style lang="less" scoped>
.home-container {
  height: 100%;
}
.el-header {
  background-color: #373d3f;
  display: flex;
  justify-content: space-between;
  padding-left: 0;
  align-items: center;
  color: #fff;
  font-size: 20px;
  > div {
    display: flex;
    align-items: center;
    span {
      margin-left: 15px;
    }
  }
}
.el-aside {
  background-color: #323743;
  .el-menu {
	  border-right: none;
  }
}
.el-main {
  background-color: #e9edf0;
}

.iconfont {
	margin-right: 10px;
}

.toggle-button {
	background-color: #4a5064;
	font-size: 10px;
	line-height: 24px;
	color: #fff;
	text-align: center;
	letter-spacing: 0.2em;
	cursor: pointer;
}
</style>