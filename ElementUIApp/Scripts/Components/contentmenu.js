!
function(e, t) {
    "object" == typeof exports && "undefined" != typeof module ? t(exports) : "function" == typeof define && define.amd ? define(["exports"], t) : t(e.VContextmenu = {})
    //"object" == typeof exports && "object" == typeof module ? module.exports = t(require("vue")) : "function" == typeof define && define.amd ? define("CONTENTMENU", ["vue"], t) : "object" == typeof exports ? exports.CONTENTMENU = t(require("vue")) : e.CONTENTMENU = t(e.Vue)
    //"object" == typeof exports && "object" == typeof module ? module.exports = t(require("vue")) : "function" == typeof define && define.amd ? define("VContextmenu", ["vue", "exports"], t) : "object" == typeof exports ? exports.VContextmenu = t(require("vue")) : e.VContextmenu = t({})
} (this,
function(e) {
    var t = {
        inserted: function(e, t, n) {
            var i = n.context.$refs[t.arg];
            i.addRef({
                el: e,
                vnode: n
            }),
            i.$contextmenuId = e.id || i._uid
        }
    };
    var n = {
        name: "VContextmenu",
        provide: function() {
            return {
                $$contextmenu: this
            }
        },
        props: {
            eventType: {
                type: String,
                default:
                    "contextmenu"
            },
            theme: {
                type: String,
                default:
                    "default"
            },
            autoPlacement: {
                type: Boolean,
                default:
                    !0
            },
            disabled: Boolean,
            containerSelector: {
                type: String,
                default:
                    "body"
            }
        },
        data: function() {
            return {
                visible: !1,
                references: [],
                style: {
                    top: 0,
                    left: 0
                }
            }
        },
        computed: {
            clickOutsideHandler: function() {
                return this.visible ? this.hide: function() {}
            },
            isClick: function() {
                return "click" === this.eventType
            },
            contextmenuCls: function() {
                return ["v-contextmenu", "v-contextmenu--" + this.theme]
            }
        },
        watch: {
            visible: function(e) {
                var t = document.querySelector(this.containerSelector);
                e ? (this.$emit("show", this), t.addEventListener("click", this.handleBodyClick)) : (this.$emit("hide", this), t.removeEventListener("click", this.handleBodyClick))
            }
        },
        mounted: function() {
            var e, t, n;
            document.querySelector(this.containerSelector).appendChild(this.$el),
            window.$$VContextmenu ? window.$$VContextmenu[this.$contextmenuId] = this: window.$$VContextmenu = (e = {},
            t = this.$contextmenuId, n = this, t in e ? Object.defineProperty(e, t, {
                value: n,
                enumerable: !0,
                configurable: !0,
                writable: !0
            }) : e[t] = n, e)
        },
        beforeDestroy: function() {
            var e = this,
            t = document.querySelector(this.containerSelector);
            t.removeChild(this.$el),
            delete window.$$VContextmenu[this.$contextmenuId],
            this.references.forEach(function(t) {
                t.el.removeEventListener(e.eventType, e.handleReferenceContextmenu)
            }),
            t.removeEventListener("click", this.handleBodyClick)
        },
        methods: {
            addRef: function(e) {
                this.references.push(e),
                e.el.addEventListener(this.eventType, this.handleReferenceContextmenu)
            },
            handleReferenceContextmenu: function(e) {
                var t = this;
                if (e.preventDefault(), !this.disabled) {
                    var n = this.references.find(function(t) {
                        return t.el.contains(e.target)
                    });
                    this.$emit("contextmenu", n ? n.vnode: null);
                    var i = e.pageX,
                    o = e.pageY;
                    this.show(),
                    this.$nextTick(function() {
                        var e = {
                            top: o,
                            left: i
                        };
                        if (t.autoPlacement) {
                            var n = t.$refs.contextmenu.clientWidth,
                            s = t.$refs.contextmenu.clientHeight;
                            s + o >= window.innerHeight && (e.top -= s),
                            n + i >= window.innerWidth && (e.left -= n)
                        }
                        t.style = {
                            top: e.top + "px",
                            left: e.left + "px"
                        }
                    })
                }
            },
            handleBodyClick: function(e) {
                this.$el.contains(e.target) || this.isClick && this.references.some(function(t) {
                    return t.el.contains(e.target)
                }) || (this.visible = !1)
            },
            show: function(e) {
                var t = this;
                Object.keys(window.$$VContextmenu).forEach(function(e) {
                    e !== t.$contextmenuId && window.$$VContextmenu[e].hide()
                }),
                e && (this.style = {
                    top: e.top + "px",
                    left: e.left + "px"
                }),
                this.visible = !0
            },
            hide: function() {
                this.visible = !1
            },
            hideAll: function() {
                Object.keys(window.$$VContextmenu).forEach(function(e) {
                    window.$$VContextmenu[e].hide()
                })
            }
        }
    },
    i = function() {
        var e = this.$createElement;
        return (this._self._c || e)("ul", {
            directives: [{
                name: "show",
                rawName: "v-show",
                value: this.visible,
                expression: "visible"
            }],
            ref: "contextmenu",
            class: this.contextmenuCls,
            style: this.style
        },
        [this._t("default")], 2)
    };
    i._withStripped = !0;
    var o, s, r, u, c = (o = {
        render: i,
        staticRenderFns: []
    },
    s = void 0, r = !1, "undefined" != typeof __vue_create_injector_ssr__ && __vue_create_injector_ssr__, (u = (void 0 === n ? {}: n) || {}).__file = "/Users/Stephen/Repos/snokier/v-contextmenu/src/components/Contextmenu.vue", u.render || (u.render = o.render, u.staticRenderFns = o.staticRenderFns, u._compiled = !0, r && (u.functional = !0)), u._scopeId = s, u),
    d = {
        name: "VContextmenuItem",
        inject: ["$$contextmenu"],
        props: {
            divider: Boolean,
            disabled: Boolean,
            autoHide: {
                type: Boolean,
                default:
                    !0
            }
        },
        data: function() {
            return {
                hover: !1
            }
        },
        computed: {
            classname: function() {
                return {
                    "v-contextmenu-item": !this.divider,
                    "v-contextmenu-item--hover": this.hover,
                    "v-contextmenu-item--disabled": this.disabled
                }
            }
        },
        methods: {
            handleMouseenter: function(e) {
                this.disabled || (this.hover = !0, this.$emit("mouseenter", this, e))
            },
            handleMouseleave: function(e) {
                this.disabled || (this.hover = !1, this.$emit("mouseleave", this, e))
            },
            handleClick: function(e) {
                this.disabled || (this.$emit("click", this, e), this.autoHide && this.$$contextmenu.hide())
            }
        }
    },
    a = function() {
        var e = this.$createElement,
        t = this._self._c || e;
        return this.divider ? t("li", {
            staticClass: "v-contextmenu-divider"
        }) : t("li", {
            class: this.classname,
            on: {
                click: this.handleClick,
                mouseenter: this.handleMouseenter,
                mouseleave: this.handleMouseleave
            }
        },
        [this._t("default")], 2)
    };
    a._withStripped = !0;
    var l = function(e, t, n, i, o, s, r, u) {
        var c = n || {};
        return c.__file = "/Users/Stephen/Repos/snokier/v-contextmenu/src/components/ContextmenuItem.vue",
        c.render || (c.render = e.render, c.staticRenderFns = e.staticRenderFns, c._compiled = !0, o && (c.functional = !0)),
        c._scopeId = i,
        c
    } ({
        render: a,
        staticRenderFns: []
    },
    0, void 0 === d ? {}: d, void 0, !1, 0, 0, "undefined" != typeof __vue_create_injector_ssr__ && __vue_create_injector_ssr__);
    var h = {
        name: "VContextmenuSubmenu",
        props: {
            title: String,
            disabled: Boolean
        },
        data: function() {
            return {
                hover: !1,
                submenuPlacement: []
            }
        },
        computed: {
            classname: function() {
                return {
                    "v-contextmenu-item": !0,
                    "v-contextmenu-submenu": !0,
                    "v-contextmenu-item--hover": this.hover,
                    "v-contextmenu-item--disabled": this.disabled
                }
            },
            submenuCls: function() {
                return ["v-contextmenu"].concat(function(e) {
                    if (Array.isArray(e)) {
                        for (var t = 0,
                        n = Array(e.length); t < e.length; t++) n[t] = e[t];
                        return n
                    }
                    return Array.from(e)
                } (this.submenuPlacement))
            }
        },
        methods: {
            handleMouseenter: function(e) {
                var t = this;
                if (!this.disabled) {
                    var n = e.target.getBoundingClientRect();
                    this.hover = !0,
                    this.$emit("mouseenter", this, e),
                    this.$nextTick(function() {
                        var e = t.$refs.submenu.clientWidth,
                        i = t.$refs.submenu.clientHeight,
                        o = [];
                        n.right + e >= window.innerWidth ? o.push("left") : o.push("right"),
                        n.bottom + i >= window.innerHeight ? o.push("bottom") : o.push("top"),
                        t.submenuPlacement = o
                    })
                }
            },
            handleMouseleave: function(e) {
                this.disabled || (this.hover = !1, this.$emit("mouseleave", this, e))
            }
        }
    },
    m = function() {
        var e = this,
        t = e.$createElement,
        n = e._self._c || t;
        return n("li", {
            class: e.classname,
            on: {
                mouseenter: e.handleMouseenter,
                mouseleave: e.handleMouseleave
            }
        },
        [n("span", {
            staticClass: "v-contextmenu-submenu__title"
        },
        [e._t("title", [e._v(e._s(e.title))]), e._v(" "), n("span", {
            staticClass: "v-contextmenu-iconfont v-contextmenu-submenu__icon"
        })], 2), e._v(" "), n("ul", {
            directives: [{
                name: "show",
                rawName: "v-show",
                value: e.hover,
                expression: "hover"
            }],
            ref: "submenu",
            class: e.submenuCls
        },
        [e._t("default")], 2)])
    };
    m._withStripped = !0;
    var v = function(e, t, n, i, o, s, r, u) {
        var c = n || {};
        return c.__file = "/Users/Stephen/Repos/snokier/v-contextmenu/src/components/ContextmenuSubmenu.vue",
        c.render || (c.render = e.render, c.staticRenderFns = e.staticRenderFns, c._compiled = !0, o && (c.functional = !0)),
        c._scopeId = i,
        c
    } ({
        render: m,
        staticRenderFns: []
    },
    0, void 0 === h ? {}: h, void 0, !1, 0, 0, "undefined" != typeof __vue_create_injector_ssr__ && __vue_create_injector_ssr__),
    f = {
        name: "VContextmenuGroup",
        props: {
            maxWidth: [Number, String]
        },
        computed: {
            menusStyle: function() {
                return this.maxWidth ? {
                    "max-width": "number" == typeof this.maxWidth ? this.maxWidth + "px": this.maxWidth,
                    "overflow-x": "auto"
                }: null
            }
        }
    },
    _ = function() {
        var e = this.$createElement,
        t = this._self._c || e;
        return t("li", {
            staticClass: "v-contextmenu-group"
        },
        [t("ul", {
            staticClass: "v-contextmenu-group__menus",
            style: this.menusStyle
        },
        [this._t("default")], 2)])
    };
    _._withStripped = !0;
    var p = function(e, t, n, i, o, s, r, u) {
        var c = n || {};
        return c.__file = "/Users/Stephen/Repos/snokier/v-contextmenu/src/components/ContextmenuGroup.vue",
        c.render || (c.render = e.render, c.staticRenderFns = e.staticRenderFns, c._compiled = !0, o && (c.functional = !0)),
        c._scopeId = i,
        c
    } ({
        render: _,
        staticRenderFns: []
    },
    0, void 0 === f ? {}: f, void 0, !1, 0, 0, "undefined" != typeof __vue_create_injector_ssr__ && __vue_create_injector_ssr__),
    x = function(e) {
        e.directive("contextmenu", t),
        e.component(c.name, c),
        e.component(l.name, l),
        e.component(v.name, v),
        e.component(p.name, p)
    };
    "undefined" != typeof window && window.Vue && x(window.Vue);
    var b = {
        install: x
    };
    e.directive = t,
    e.Contextmenu = c,
    e.ContextmenuItem = l,
    e.ContextmenuSubmenu = v,
    e.ContextmenuGroup = p,
    e.default = b,
    Object.defineProperty(e, "__esModule", {
        value: !0
    })
});