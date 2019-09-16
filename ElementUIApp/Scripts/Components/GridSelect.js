define(['vue', 'axios'], function (Vue, axios) {
    Vue.component('grid-myselect', function (resolve, reject) {
        resolve({
            props: {
                selectParams: {
                    type: Array,
                    default: function () {
                        return []
                    }
                },
                selectUrl: {
                    type: String
                },
                selectData: {
                    type: Array,
                    default: function () {
                        return []
                    }
                },
                selectValue: {
                    type: String,
                    default:''
                },
                size: {
                    type: String,
                    default:'mini'
                }
            },
            template: '<el-select clearable filterable v-model="value" v-bind:size="size" placeholder="请选择"  > \
                           <el-option v-for="item in options" v-bind:key="item.value" v-bind:label="item.label" v-bind:value="item.value">\
                           </el-option>\
                       </el-select>',
            data: function () {
                return {
                    options: [],
                    value: ''
                }
            },
            methods: {
                loadData: function () {
                    var _this = this;
                    if (this.selectUrl) {
                        axios.post(this.selectUrl, {
                            DATA_XML: JSON.stringify(this.selectParams)
                        })
                     .then(function (response) {
                         _this.options = response.data.rows;
                         _this.value = _this.selectValue;
                     })
                     .catch(function (error) {
                         console.log(error);
                     });
                    } else {
                        this.options = this.selectData;
                        this.value = this.selectValue;
                    }
                }
            },
            computed:{
            
            },
            mounted: function () {
                
                this.loadData();
            }
        });
    });
});