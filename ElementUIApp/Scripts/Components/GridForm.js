define(['vue'], function (Vue) {
    Vue.component('grid-myform', function (resolve, reject) {
        resolve({
            props: {
                model: {
                    type: Array,
                    default: []
                },
                rowHeight: {
                    type: Number,
                    defult:30
                },
                rowMargin: {
                    type: Number,
                    default:3
                },
                labelWith: {
                    type: String,
                    default:'100px'
                },
                inputWidth: {
                    type: Number,
                    default:80
                },
            },
            template: '<div><template><el-form v-bind:model="formData" size="mini" > \
                           <el-row v-for="n in rowsCount" v-bind:key="n"  v-bind:style="{\'height\':sRowHeight, \'marginBottom\':sRowMargin }"> \
                               <el-col v-bind:span="12" v-bind:style="{\'height\':sRowHeight, \'marginBottom\':sRowMargin }"> \
                                   <el-form-item v-bind:label="model[n*2-2].label" v-bind:label-width="labelWith"> \
                                        <template v-if="model[n*2-2].type==\'2\'"> \
                                           <el-select v-model=\'formData[model[n*2-2].name ]\' v-bind:placeholder="model[n*2-2].placeHolder" v-bind:style="{ width:inputWidth+\'%\'}">\
                                               <el-option v-for="item in model[n*2-2].options" v-bind:key="item.value" v-bind:label="item.label" v-bind:value="item.value"></el-option>\
                                           </el-select>\
                                        </template>\
                                        <template v-else-if="model[n*2-2].type==\'3\'"> \
                                            <el-date-picker type="date" v-bind:placeholder="model[n*2-2].placeHolder" v-model=\'formData[ model[n*2-2].name ]\' v-bind:style="{ width:inputWidth+\'%\'}"></el-date-picker> \
                                        </template>\
                                        <template v-else-if="model[n*2-2].type==\'4\'"> \
                                            <el-time-picker v-bind:placeholder="model[n*2-2].placeHolder" v-model=\'formData[ model[n*2-2].name ]\' v-bind:style="{ width:inputWidth+\'%\'}"></el-time-picker> \
                                        </template>\
                                        <template v-else> \
                                            <el-input v-model=\'formData[ model[n*2-2].name ]\' v-bind:style="{ width:inputWidth+\'%\'}"></el-input>\
                                        </template>\
                                   </el-form-item>\
                               </el-col>\
                               <el-col v-if="model.length >= n*2 " v-bind:span="12" v-bind:style="{\'height\':sRowHeight, \'marginBottom\':sRowMargin }">\
                                   <el-form-item v-bind:label="model[n*2-1].label" v-bind:label-width="labelWith">\
                                        <template v-if="model[n*2-1].type==\'2\'">\
                                            <el-select v-model=\'formData[ model[n*2-1].name ]\' v-bind:placeholder="model[n*2-1].placeHolder" v-bind:style="{ width:inputWidth+\'%\'}">\
                                                <el-option v-for="item in model[n*2-1].options" v-bind:key="item.value" v-bind:label="item.label" v-bind:value="item.value"></el-option>\
                                            </el-select>\
                                        </template>\
                                        <template v-else-if="model[n*2-1].type==\'3\'">\
                                            <el-date-picker type="date" v-bind:placeholder="model[n*2-1].placeHolder" v-model=\'formData[ model[n*2-1].name ]\' v-bind:style="{ width:inputWidth+\'%\'}"></el-date-picker>\
                                        </template>\
                                        <template v-else-if="model[n*2-1].type==\'4\'">\
                                            <el-time-picker v-bind:placeholder="model[n*2-1].placeHolder" v-model=\'formData[ model[n*2-1].name ]\' v-bind:style="{ width:inputWidth+\'%\'}"></el-time-picker>\
                                        </template>\
                                        <template v-else>\
                                            <el-input v-model=\'formData[ model[n*2-1].name ]\' v-bind:style="{ width:inputWidth+\'%\'}"></el-input> \
                                        </template>\
                                    </el-form-item>\
                               </el-col>\
                           </el-row>\
                      </el-form></template></div>',
            data: function () {
                return {
                    formData: {}
                }
            },
            methods: {
                resetDlg: function () {
                    var obj = {};
                    this.model.forEach(function (v) {
                        obj[v.name] = v.defaultValue;
                    });
                    this.formData = JSON.parse(JSON.stringify(obj));
                }
            },
            computed: {
                sRowHeight: function () {
                    return this.rowHeight + 'px';
                },
                sRowMargin: function () {
                    return this.rowMargin + 'px';
                },
                rowsCount: function () {
                    return Math.ceil(this.model.length / 2);
                }
            },
            mounted: function () {
                this.resetDlg();
            }
        });
    });
});