define(['vue', 'axios'], function (Vue, axios) {
    Vue.component('grid-mytable', function (resolve, reject) {
        resolve({
            props: {
                height: {
                    type: Number,
                    default: 500
                },
                showCheckbox: {
                    type: Boolean,
                    default: false
                },
                showIndex: {
                    type: Boolean,
                    default: false
                },
                showPagination: {
                    type: Boolean,
                    default: true
                },
                showPopover: {
                    type: Boolean,
                    default:false
                },
                showPopoverCols: {
                    type: Array,
                    default:[]
                },
                popoverData: {
                    type: Array,
                    default:[]
                },

                pageSize: {
                    type: Number,
                    default: 1
                },
                pageSizes: {
                    type: Array,
                    default: function () {
                        return [1, 2, 3, 4, 5]
                    }
                },
                layout: {
                    type: String,
                    default: 'total, sizes, prev, pager, next, jumper'
                },
                tableHeader: {
                    type: Array,
                    default: function () {
                        return []
                    }
                },
                tableParams: {
                    type: Array,
                    default: function () {
                        return []
                    }
                },
                tableUrl: {
                    type: String
                },
                tableRows: {
                    type: Array,
                    default: function () {
                        return []
                    }
                }
            },
            template: '<div><template>\
                        <el-table \
                                border\
                                stripe\
                                highlight-current-row\
                                v-bind:height="height"\
                                size="mini"\
                                style="width:100%;"\
                                v-bind:data="tableData"\
                                v-bind:row-style="{height:\'15px\'}"\
                                v-bind:cell-style="{padding:\'0px\'} "\
                                v-bind:header-cell-style="{height:\'15px\', padding:\'0px\' }" \
                                v-bind:row-class-name=\"tableRowClassName\"\
                                v-on:row-click="rowClick"\
                                v-on:row-contextmenu="rowContextmenu"\
                                v-on:selection-change="selectionChange"\
                                v-on:cell-mouse-enter="cellMouseEnter"\
                                v-on:cell-mouse-leave="cellMouseLeave"\
                                >\
                            <el-table-column v-if="showCheckbox" fixed type="selection" width="50"></el-table-column>\
                            <el-table-column v-if="showIndex" fixed type="index" width="50" label=""></el-table-column>\
                            <el-table-column v-for="(th, key) in tableHeader"\
                                v-bind:key="key"\
                                v-bind:prop="th.prop"\
                                v-bind:label="th.label"\
                                v-bind:fixed="th.fixed"\
                                v-bind:min-width="th.minWidth"\
                                v-bind:sortable="th.sortable"\
                                align="center">\
                                 <template slot-scope="scope">\
                                    <div v-if="th.oper">\
                                        <el-button v-for="(o, key) in th.oper"  \
                                                v-bind:key="key" \
                                                v-on:click="o.clickFun(scope.$index,scope.row)" \
                                                v-bind:type="o.type"\
                                                size="mini">{{o.name}}</el-button>\
                                    </div>\
                                    <div v-else>\
                                        <template v-if="isShowPopover(th.prop)">\
                                             <el-popover trigger="hover" placement="right" transition="el-zoom-in-bottom">\
                                                <p v-for="(p,i) in popoverData" v-bind:key="i">\
                                                    {{p.label}}: <span style="padding-left:3px;" v-for="(n) in p.name" v-bind:key="n">{{ scope.row[n] }}</span>\
                                                </p>\
                                                <div slot="reference" class="name-wrapper">\
                                                    <template v-if="th.inputFortmat"> \
                                                        <el-input v-model="scope.row[th.prop]" size="mini"></el-input>\
                                                    </template>\
                                                    <template v-else-if="th.selectFormat">\
                                                        <el-select filterable size="mini" v-model="scope.row[th.prop]" placeholder="请选择">\
                                                            <el-option v-for="item in th.options" v-bind:key="item.value" v-bind:label="item.label" v-bind:value="item.value">\</el-option>\
                                                        </el-select>\
                                                    </template>\
                                                    <span v-else-if="th.txtFormat">{{ th.txtFormat(scope.row[th.prop]) }}</span>\
                                                    <span v-else>\
                                                        {{ scope.row[th.prop] }}\
                                                    </span>\
                                                </div>\
                                            </el-popover>\
                                        </template>\
                                        <template v-else>\
                                            <div slot="reference" class="name-wrapper">\
                                                <template v-if="th.inputFortmat"> \
                                                    <el-input v-model="scope.row[th.prop]" size="mini"></el-input>\
                                                </template>\
                                                <template v-else-if="th.selectFormat">\
                                                    <el-select filterable size="mini" v-model="scope.row[th.prop]" placeholder="请选择">\
                                                        <el-option v-for="item in th.options" v-bind:key="item.value" v-bind:label="item.label" v-bind:value="item.value">\</el-option>\
                                                    </el-select>\
                                                </template>\
                                                <span v-else-if="th.txtFormat">{{ th.txtFormat(scope.row[th.prop]) }}</span>\
                                                <span v-else>\
                                                    {{ scope.row[th.prop] }}\
                                                </span>\
                                            </div>\
                                        </template>\
                                    </div>\
                                </template>\
                            </el-table-column>\
                        </el-table>\
                        <el-col v-if="showPagination" v-bind:span="24" class="toolbar" style="text-align:center; border:1px solid #EBEEF5; border-top:none;  height:35px;">\
                            <el-pagination v-on:current-change="currentChange"\
                                           v-on:size-change="sizeChange"\
                                           v-bind:page-sizes="pageSizes"\
                                           v-bind:current-page="pager.currentPage"\
                                           v-bind:page-size="pager.pageSize"\
                                           v-bind:total="pager.total"\
                                           v-bind:layout="layout"\
                                           v-bind:background="true">\
                            </el-pagination>\
                        </el-col>\
                        </template></div>',
            data: function () {
                return {
                    pager: { currentPage: 1, pageSize: this.pageSize, total: 0 },
                    tableData: [],
                    allData: this.tableRows,
                    defaultData: [{
                        date: '2016-05-02',
                        name: '王小虎',
                        address: '上海市普陀区金沙江路 1518 弄',
                        province: '北京',
                        city: '北京',
                    }, {
                        date: '2016-05-04',
                        name: '曹晓骄',
                        address: '上海市普陀区金沙江路 1517 弄',
                        province: '上海',
                        city: '上海',
                    }, {
                        date: '2016-05-01',
                        name: '刘志成',
                        address: '上海市普陀区金沙江路 1519 弄',
                        province: '杭州',
                        city: '杭州',
                    }]
                }
            },
            methods: {
                tableRowClassName: function (p) {
                    p.row.index = p.rowIndex;
                },
                rowClick: function (row, column) {
                    //console.log('gridtable rowclick');
                    this.$emit('row-click', row);
                },
                rowContextmenu: function (row, column, event) {
                    event.preventDefault();
                    this.$emit('row-contextmenu', row);
                },
                cellMouseEnter: function (row, column, cell, event) {
                    this.$emit('cell-mouse-enter', row,column,cell);
                },
                cellMouseLeave: function (row, column, cell, event) {
                    this.$emit('cell-mouse-leave', row, column, cell);
                },
                selectionChange: function (selection) {
                    this.$emit('selectionChange', selection);
                },
                currentChange: function (currentPage) {
                    this.pager.currentPage = currentPage;
                    this.loadData();
                },
                sizeChange: function (pageSize) {
                    this.pager.pageSize = pageSize;
                    this.loadData();
                },
                
                loadData: function () {
                    var _this = this;
                    if (this.tableUrl) {
                        axios.post(this.tableUrl, {
                            DATA_XML: JSON.stringify(this.tableParams),
                            PAGE_XML: this.showPagination ? JSON.stringify({ pageSize: this.pager.pageSize, currentPage: this.pager.currentPage }) : ''
                        })
                       .then(function (response) {
                           _this.pager.total = response.data.total;
                           _this.tableData = response.data.rows;
                       })
                       .catch(function (error) {
                           console.log(error);
                       });
                    } else {
                        _this.pager.total = this.allData.length;
                        _this.tableData = this.allData.slice((this.currentPage - 1) * this.pager.pageSize, this.pager.currentPage * this.pager.pageSize);
                    }
                },
                reloadData: function () {
                    this.pager.currentPage = 1;
                    this.loadData();
                },
                isShowPopover: function (name) {
                    if (!this.showPopover) return false;
                    var show = false;
                    if (this.showPopoverCols) {
                        this.showPopoverCols.forEach(function (v) {
                            if (name == v && !show) {
                                show = true;
                                return;
                            }
                        });
                    }
                    return show;
                }
            },
            watch: {
            },
            computed: {
                showTableData: function () {
                }
            },
            mounted: function () {
                this.loadData();
            }
        });
    });
});
