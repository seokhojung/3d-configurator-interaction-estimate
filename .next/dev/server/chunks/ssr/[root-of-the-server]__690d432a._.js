module.exports = [
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[project]/Desktop/3d-Configurator-interaction-estimate/src/app/templates/_components/TemplateList.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "TemplateList",
    ()=>TemplateList,
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$3d$2d$Configurator$2d$interaction$2d$estimate$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/3d-Configurator-interaction-estimate/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$3d$2d$Configurator$2d$interaction$2d$estimate$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/3d-Configurator-interaction-estimate/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
"use client";
;
;
function TemplateList({ items, onSelect, selectedId: externalSelected }) {
    const [filter, setFilter] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$3d$2d$Configurator$2d$interaction$2d$estimate$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('all');
    const [selectedId, setSelectedId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$3d$2d$Configurator$2d$interaction$2d$estimate$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(externalSelected ?? null);
    const filtered = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$3d$2d$Configurator$2d$interaction$2d$estimate$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        if (filter === 'all') return items;
        return items.filter((t)=>t.type === filter);
    }, [
        items,
        filter
    ]);
    function handleSelect(id) {
        setSelectedId(id);
        onSelect?.(id);
    }
    function onKeyDown(e) {
        const idx = filtered.findIndex((t)=>t.id === selectedId);
        if (e.key === 'ArrowDown') {
            const next = filtered[Math.min(idx + 1, filtered.length - 1)]?.id ?? filtered[0]?.id;
            if (next) handleSelect(next);
            e.preventDefault();
        } else if (e.key === 'ArrowUp') {
            const prev = filtered[Math.max(idx - 1, 0)]?.id ?? filtered[filtered.length - 1]?.id;
            if (prev) handleSelect(prev);
            e.preventDefault();
        } else if (e.key === 'Enter' && selectedId) {
            // noop – selection already set; proceed button uses selectedId
            e.preventDefault();
        }
    }
    const proceedHref = selectedId ? `?templateId=${encodeURIComponent(selectedId)}` : undefined;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$3d$2d$Configurator$2d$interaction$2d$estimate$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$3d$2d$Configurator$2d$interaction$2d$estimate$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                role: "group",
                "aria-label": "Filters",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$3d$2d$Configurator$2d$interaction$2d$estimate$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        "aria-pressed": filter === 'all',
                        onClick: ()=>setFilter('all'),
                        children: "All"
                    }, void 0, false, {
                        fileName: "[project]/Desktop/3d-Configurator-interaction-estimate/src/app/templates/_components/TemplateList.tsx",
                        lineNumber: 48,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$3d$2d$Configurator$2d$interaction$2d$estimate$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        "aria-pressed": filter === 'basic',
                        onClick: ()=>setFilter('basic'),
                        children: "Basic"
                    }, void 0, false, {
                        fileName: "[project]/Desktop/3d-Configurator-interaction-estimate/src/app/templates/_components/TemplateList.tsx",
                        lineNumber: 49,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$3d$2d$Configurator$2d$interaction$2d$estimate$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        "aria-pressed": filter === 'advanced',
                        onClick: ()=>setFilter('advanced'),
                        children: "Advanced"
                    }, void 0, false, {
                        fileName: "[project]/Desktop/3d-Configurator-interaction-estimate/src/app/templates/_components/TemplateList.tsx",
                        lineNumber: 50,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Desktop/3d-Configurator-interaction-estimate/src/app/templates/_components/TemplateList.tsx",
                lineNumber: 47,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$3d$2d$Configurator$2d$interaction$2d$estimate$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                role: "list",
                "aria-label": "Templates",
                tabIndex: 0,
                onKeyDown: onKeyDown,
                style: {
                    outline: 'none'
                },
                children: [
                    filtered.length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$3d$2d$Configurator$2d$interaction$2d$estimate$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        role: "status",
                        children: "No templates"
                    }, void 0, false, {
                        fileName: "[project]/Desktop/3d-Configurator-interaction-estimate/src/app/templates/_components/TemplateList.tsx",
                        lineNumber: 60,
                        columnNumber: 35
                    }, this),
                    filtered.map((t)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$3d$2d$Configurator$2d$interaction$2d$estimate$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            role: "listitem",
                            "aria-selected": t.id === selectedId,
                            onClick: ()=>handleSelect(t.id),
                            style: {
                                cursor: 'pointer',
                                padding: '4px 8px',
                                borderBottom: '1px solid #eee'
                            },
                            "data-testid": `template-${t.id}`,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$3d$2d$Configurator$2d$interaction$2d$estimate$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$3d$2d$Configurator$2d$interaction$2d$estimate$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                            children: t.name
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/3d-Configurator-interaction-estimate/src/app/templates/_components/TemplateList.tsx",
                                            lineNumber: 70,
                                            columnNumber: 18
                                        }, this),
                                        " ",
                                        t.version ? `(v${t.version})` : null
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Desktop/3d-Configurator-interaction-estimate/src/app/templates/_components/TemplateList.tsx",
                                    lineNumber: 70,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$3d$2d$Configurator$2d$interaction$2d$estimate$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        fontSize: 12,
                                        color: '#666'
                                    },
                                    children: t.type
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/3d-Configurator-interaction-estimate/src/app/templates/_components/TemplateList.tsx",
                                    lineNumber: 71,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, t.id, true, {
                            fileName: "[project]/Desktop/3d-Configurator-interaction-estimate/src/app/templates/_components/TemplateList.tsx",
                            lineNumber: 62,
                            columnNumber: 11
                        }, this))
                ]
            }, void 0, true, {
                fileName: "[project]/Desktop/3d-Configurator-interaction-estimate/src/app/templates/_components/TemplateList.tsx",
                lineNumber: 53,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$3d$2d$Configurator$2d$interaction$2d$estimate$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    marginTop: 8
                },
                children: proceedHref ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$3d$2d$Configurator$2d$interaction$2d$estimate$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                    href: proceedHref,
                    "aria-disabled": false,
                    children: "Proceed"
                }, void 0, false, {
                    fileName: "[project]/Desktop/3d-Configurator-interaction-estimate/src/app/templates/_components/TemplateList.tsx",
                    lineNumber: 78,
                    columnNumber: 11
                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$3d$2d$Configurator$2d$interaction$2d$estimate$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                    "aria-disabled": true,
                    children: "Proceed"
                }, void 0, false, {
                    fileName: "[project]/Desktop/3d-Configurator-interaction-estimate/src/app/templates/_components/TemplateList.tsx",
                    lineNumber: 80,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/Desktop/3d-Configurator-interaction-estimate/src/app/templates/_components/TemplateList.tsx",
                lineNumber: 76,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Desktop/3d-Configurator-interaction-estimate/src/app/templates/_components/TemplateList.tsx",
        lineNumber: 46,
        columnNumber: 5
    }, this);
}
const __TURBOPACK__default__export__ = TemplateList;
}),
"[project]/Desktop/3d-Configurator-interaction-estimate/node_modules/next/dist/server/route-modules/app-page/module.compiled.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
;
else {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    else {
        if ("TURBOPACK compile-time truthy", 1) {
            if ("TURBOPACK compile-time truthy", 1) {
                module.exports = __turbopack_context__.r("[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)");
            } else //TURBOPACK unreachable
            ;
        } else //TURBOPACK unreachable
        ;
    }
} //# sourceMappingURL=module.compiled.js.map
}),
"[project]/Desktop/3d-Configurator-interaction-estimate/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

module.exports = __turbopack_context__.r("[project]/Desktop/3d-Configurator-interaction-estimate/node_modules/next/dist/server/route-modules/app-page/module.compiled.js [app-ssr] (ecmascript)").vendored['react-ssr'].ReactJsxDevRuntime; //# sourceMappingURL=react-jsx-dev-runtime.js.map
}),
"[project]/Desktop/3d-Configurator-interaction-estimate/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

module.exports = __turbopack_context__.r("[project]/Desktop/3d-Configurator-interaction-estimate/node_modules/next/dist/server/route-modules/app-page/module.compiled.js [app-ssr] (ecmascript)").vendored['react-ssr'].React; //# sourceMappingURL=react.js.map
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__690d432a._.js.map