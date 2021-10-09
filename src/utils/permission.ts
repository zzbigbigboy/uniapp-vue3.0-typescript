
const _ = require("lodash");

const hasPermission = {
    install(Vue: any, options: any) {
        //自定义指令v-has：
        Vue.directive('has', {
            //inserted：被绑定元素插入父节点时调用
            inserted: function (el: any, binding: any) {
                if (!Vue.prototype.$_has(binding.value)) {
                    el.parentNode.removeChild(el);
                }
            },
        });
        //权限检查方法
        Vue.prototype.$_has = function (value: any) {
            let isExist = false;
            //将拥有的权限字符串转拆分为数组：
            
            let pageArr =_.split(localStorage.getItem("permissionPage"), ',');
            let buttonArr = _.split(localStorage.getItem("permissionButton"), ',');

            //判断是否页面有权限            //判断是否按钮有权限
            if (pageArr.includes(value) || buttonArr.includes(value)) {
                isExist = true;
            }
            
            return isExist;

        };
    }
};
export default hasPermission;