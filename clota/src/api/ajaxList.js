/**
 * Created by Sasha on 2018/6/1.
 */
import axios from './index';
import orgApilist from './modules/orgApilist';

export default {

    /*****************登录+获取用户信息公用接口****************/

  // 登录
  login (param = {}) {
      return axios.post('login', param);
  },

  /*****************组织管理****************/
    ...orgApilist
}
