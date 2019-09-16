define(['vue', 'axios'], function (Vue, axios) {
    Vue.component("grid-mymenu", function (resolve, reject) {
        resolve({
            props: {
                backgroundColor: {
                    type: String,
                    default: '#545c64'
                },
                activeTextColor: {
                    type: String,
                    default: '#ffd04b'
                },
                textColor: {
                    type: String,
                    default: '#fff'
                },
                menu: {
                    type: Array,
                    default:[]
                }
            },
            template: '<div>\
                          <el-menu\
                            class="el-menu-demo"\
                            mode="horizontal"\
                            v-on:select="handleSelect"\
                            v-bind:background-color="backgroundColor"\
                            v-bind:text-color="textColor"\
                            v-bind:active-text-color="activeTextColor">\
                                <el-submenu v-for="(m, i) in menu" v-bind:index="submenu1Index(i)" v-bind:key="submenu1Index(i)" >\
                                    <template slot="title">\
                                        {{m.name}}\
                                    </template>\
                                    <template >\
                                         <el-menu-item v-for="(m2,i2) in submenu2Item(m.submenu)" v-bind:index="submenu2Index(i,i2)" v-bind:key="submenu2Index(i,i2)">\
                                                {{m2.name}}\
                                          </el-menu-item>\
                                    </template>\
                                    <template>\
                                        <el-submenu v-for="(m2,i2) in submenu3Item(m.submenu)"  v-bind:index="submenu3ParentIndex(i,i2)" v-bind:key="submenu3ParentIndex(i,i2)">\
                                            <template slot="title">\
                                                {{m2.name}}\
                                            </template>\
                                            <el-menu-item v-for="(m3,i3) in m2.submenu" v-bind:index="submenu3Index(i,i2,i3)" v-bind:key="submenu3Index(i,i2,i3)">\
                                                {{m3.name}}\
                                            </el-menu-item>\
                                        </el-submenu>\
                                    </template>\
                                </el-submenu>\
                          </el-menu>  \
                      </div>',
            data: function () {
                return {
                    activeIndex:0
                }
            },
            methods: {
                handleSelect: function (key, keyPath) {
                    this.$emit('menu-click', key);
                },
                submenu2Item: function (submenu) {
                    var item = [];
                    submenu.forEach(function (v) {
                        if (!v.submenu) {
                            item.push(JSON.parse(JSON.stringify(v)));
                        }
                    });
                    return item;
                },
                submenu3Item:function(submenu){
                    var item = [];
                    submenu.forEach(function (v) {
                        if (v.submenu) {
                            item.push(JSON.parse(JSON.stringify(v)));
                        }
                    });
                    return item;
                },
                submenu1Index: function (i) {
                    return i + "";
                },
                submenu2Index: function (i, i2) {
                    return i + "-" + i2;
                },
                submenu3Index: function (i, i2, i3) {
                    return i + "-" + i2+"-"+i3;
                },
                submenu3ParentIndex: function (i, i2) {
                    return i + "-" + i2 + "-" + "S";
                }
            },
            watch: {

            },
            computed: {

            },
            mounted: function () {

            }
        });
    });
});