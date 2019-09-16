require.config({
    baseUrl: "../../Scripts",
    urlArgs: "r=" + (new Date()).getTime(),
    paths: {
        "jquery": "jquery-1.10.2.min",
        "vue": "https://unpkg.com/vue/dist/vue",
        "ELEMENT": "https://unpkg.com/element-ui/lib/index",
        "axios": "https://unpkg.com/axios/dist/axios.min",
        "VContextmenu": "Components/contentmenu",
        "gridtable": "Components/GridTable",
        "gridselect": "Components/GridSelect",
        "gridform": "Components/GridForm",
        "gridmenu": "Components/GridMenu",
    },
    shim: {
        
        //"ELEMENT": {
        //    deps: ["contentmenu"],
        //},
        //"axios": {
        //    exports: "axios"
        //},
        //"gridtable": {
        //    deps: ["vue"]
        //}

        "VContextmenu": {
            deps: ["vue"],
            exports: "VContextmenu"
        }
    }
});