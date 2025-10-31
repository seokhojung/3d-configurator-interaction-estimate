(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/Desktop/3d-Configurator-interaction-estimate/src/app/templates/_components/SchemaForm.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>SchemaForm
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$3d$2d$Configurator$2d$interaction$2d$estimate$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/3d-Configurator-interaction-estimate/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$3d$2d$Configurator$2d$interaction$2d$estimate$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/3d-Configurator-interaction-estimate/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
function defaultValue(field) {
    if (field.type === 'checkbox') return false;
    return '';
}
function validateField(field, value) {
    if (field.required) {
        if (field.type === 'text') {
            if (typeof value !== 'string' || value.trim() === '') return '필수 항목입니다';
        } else if (field.type === 'checkbox') {
            if (typeof value !== 'boolean') return '불리언 값이 필요합니다';
        } else if (field.type === 'select') {
            if (!field.options || !Array.isArray(field.options)) return '';
            if (!field.options.includes(value)) return '유효한 옵션을 선택하세요';
        }
    } else {
        // optional but type check for checkbox/select
        if (field.type === 'checkbox' && typeof value !== 'boolean') return '불리언 값이 필요합니다';
        if (field.type === 'select' && value && field.options && !field.options.includes(value)) return '유효한 옵션을 선택하세요';
    }
    return '';
}
function SchemaForm({ templateId, schema, onValuesChange }) {
    _s();
    const firstInputRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$3d$2d$Configurator$2d$interaction$2d$estimate$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const fieldRefs = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$3d$2d$Configurator$2d$interaction$2d$estimate$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])({});
    const fields = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$3d$2d$Configurator$2d$interaction$2d$estimate$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "SchemaForm.useMemo[fields]": ()=>schema.sections.flatMap({
                "SchemaForm.useMemo[fields]": (s)=>s.fields
            }["SchemaForm.useMemo[fields]"])
    }["SchemaForm.useMemo[fields]"], [
        schema
    ]);
    const [values, setValues] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$3d$2d$Configurator$2d$interaction$2d$estimate$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        "SchemaForm.useState": ()=>{
            const init = {};
            fields.forEach({
                "SchemaForm.useState": (f)=>init[f.pdf_field_name] = defaultValue(f)
            }["SchemaForm.useState"]);
            return init;
        }
    }["SchemaForm.useState"]);
    const [errors, setErrors] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$3d$2d$Configurator$2d$interaction$2d$estimate$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({});
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$3d$2d$Configurator$2d$interaction$2d$estimate$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "SchemaForm.useEffect": ()=>{
            // Reset when templateId changes
            const init = {};
            fields.forEach({
                "SchemaForm.useEffect": (f)=>init[f.pdf_field_name] = defaultValue(f)
            }["SchemaForm.useEffect"]);
            setValues(init);
            setErrors({});
            // focus first input
            setTimeout({
                "SchemaForm.useEffect": ()=>firstInputRef.current?.focus()
            }["SchemaForm.useEffect"], 0);
            if (onValuesChange) onValuesChange(init);
        }
    }["SchemaForm.useEffect"], [
        templateId,
        fields
    ]);
    function onChange(field, v) {
        setValues((prev)=>{
            const next = {
                ...prev,
                [field.pdf_field_name]: v
            };
            if (onValuesChange) onValuesChange(next);
            return next;
        });
        // live validate
        const msg = validateField(field, v);
        setErrors((prev)=>({
                ...prev,
                [field.pdf_field_name]: msg
            }));
    }
    function onSubmit(e) {
        e.preventDefault();
        const nextErrors = {};
        fields.forEach((f)=>{
            const msg = validateField(f, values[f.pdf_field_name]);
            if (msg) nextErrors[f.pdf_field_name] = msg;
        });
        setErrors(nextErrors);
        if (Object.keys(nextErrors).length === 0) {
        // noop for now
        } else {
            // focus first invalid field for accessibility
            for (const f of fields){
                if (nextErrors[f.pdf_field_name]) {
                    const el = fieldRefs.current[f.pdf_field_name];
                    if (el && typeof el.focus === 'function') {
                        // schedule after state update flush
                        setTimeout(()=>el.focus(), 0);
                    }
                    break;
                }
            }
        }
    }
    const hasErrors = Object.values(errors).some((m)=>m);
    let firstInputAssigned = false;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$3d$2d$Configurator$2d$interaction$2d$estimate$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
        onSubmit: onSubmit,
        "aria-labelledby": "schema-form-title",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$3d$2d$Configurator$2d$interaction$2d$estimate$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                id: "schema-form-title",
                style: {
                    fontSize: 18
                },
                children: "작성 폼"
            }, void 0, false, {
                fileName: "[project]/Desktop/3d-Configurator-interaction-estimate/src/app/templates/_components/SchemaForm.tsx",
                lineNumber: 117,
                columnNumber: 7
            }, this),
            schema.sections.map((sec, si)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$3d$2d$Configurator$2d$interaction$2d$estimate$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                    "aria-labelledby": `section-${si}-title`,
                    children: [
                        sec.title && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$3d$2d$Configurator$2d$interaction$2d$estimate$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                            id: `section-${si}-title`,
                            children: sec.title
                        }, void 0, false, {
                            fileName: "[project]/Desktop/3d-Configurator-interaction-estimate/src/app/templates/_components/SchemaForm.tsx",
                            lineNumber: 120,
                            columnNumber: 25
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$3d$2d$Configurator$2d$interaction$2d$estimate$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: sec.fields.map((f, fi)=>{
                                const id = `${f.pdf_field_name}`;
                                const err = errors[f.pdf_field_name] || '';
                                const commonProps = {
                                    ref: (el)=>{
                                        fieldRefs.current[f.pdf_field_name] = el;
                                        if (!firstInputAssigned && el) {
                                            firstInputRef.current = el;
                                        }
                                    }
                                };
                                if (!firstInputAssigned) firstInputAssigned = true;
                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$3d$2d$Configurator$2d$interaction$2d$estimate$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        marginBottom: 12
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$3d$2d$Configurator$2d$interaction$2d$estimate$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            htmlFor: id,
                                            children: [
                                                f.label || f.pdf_field_name,
                                                f.required ? ' *' : ''
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Desktop/3d-Configurator-interaction-estimate/src/app/templates/_components/SchemaForm.tsx",
                                            lineNumber: 136,
                                            columnNumber: 19
                                        }, this),
                                        f.type === 'text' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$3d$2d$Configurator$2d$interaction$2d$estimate$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            id: id,
                                            type: "text",
                                            value: values[f.pdf_field_name] ?? '',
                                            onChange: (e)=>onChange(f, e.target.value),
                                            ...commonProps
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/3d-Configurator-interaction-estimate/src/app/templates/_components/SchemaForm.tsx",
                                            lineNumber: 138,
                                            columnNumber: 21
                                        }, this),
                                        f.type === 'checkbox' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$3d$2d$Configurator$2d$interaction$2d$estimate$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            id: id,
                                            type: "checkbox",
                                            checked: Boolean(values[f.pdf_field_name]),
                                            onChange: (e)=>onChange(f, e.target.checked),
                                            ...commonProps
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/3d-Configurator-interaction-estimate/src/app/templates/_components/SchemaForm.tsx",
                                            lineNumber: 147,
                                            columnNumber: 21
                                        }, this),
                                        f.type === 'select' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$3d$2d$Configurator$2d$interaction$2d$estimate$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                            id: id,
                                            value: values[f.pdf_field_name] ?? '',
                                            onChange: (e)=>onChange(f, e.target.value),
                                            ...commonProps,
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$3d$2d$Configurator$2d$interaction$2d$estimate$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    value: "",
                                                    children: "선택..."
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/3d-Configurator-interaction-estimate/src/app/templates/_components/SchemaForm.tsx",
                                                    lineNumber: 162,
                                                    columnNumber: 23
                                                }, this),
                                                (f.options || []).map((opt)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$3d$2d$Configurator$2d$interaction$2d$estimate$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                        value: opt,
                                                        children: opt
                                                    }, opt, false, {
                                                        fileName: "[project]/Desktop/3d-Configurator-interaction-estimate/src/app/templates/_components/SchemaForm.tsx",
                                                        lineNumber: 164,
                                                        columnNumber: 25
                                                    }, this))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Desktop/3d-Configurator-interaction-estimate/src/app/templates/_components/SchemaForm.tsx",
                                            lineNumber: 156,
                                            columnNumber: 21
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$3d$2d$Configurator$2d$interaction$2d$estimate$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            role: "status",
                                            "aria-live": "polite",
                                            style: {
                                                color: '#d00',
                                                minHeight: 16
                                            },
                                            children: err
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/3d-Configurator-interaction-estimate/src/app/templates/_components/SchemaForm.tsx",
                                            lineNumber: 168,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, id, true, {
                                    fileName: "[project]/Desktop/3d-Configurator-interaction-estimate/src/app/templates/_components/SchemaForm.tsx",
                                    lineNumber: 135,
                                    columnNumber: 17
                                }, this);
                            })
                        }, void 0, false, {
                            fileName: "[project]/Desktop/3d-Configurator-interaction-estimate/src/app/templates/_components/SchemaForm.tsx",
                            lineNumber: 121,
                            columnNumber: 11
                        }, this)
                    ]
                }, sec.section_id || si, true, {
                    fileName: "[project]/Desktop/3d-Configurator-interaction-estimate/src/app/templates/_components/SchemaForm.tsx",
                    lineNumber: 119,
                    columnNumber: 9
                }, this)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$3d$2d$Configurator$2d$interaction$2d$estimate$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                type: "submit",
                "aria-disabled": hasErrors,
                children: "Next"
            }, void 0, false, {
                fileName: "[project]/Desktop/3d-Configurator-interaction-estimate/src/app/templates/_components/SchemaForm.tsx",
                lineNumber: 177,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Desktop/3d-Configurator-interaction-estimate/src/app/templates/_components/SchemaForm.tsx",
        lineNumber: 116,
        columnNumber: 5
    }, this);
}
_s(SchemaForm, "YUhPcWIIkDXQ4gT3hXIotuXH8YI=");
_c = SchemaForm;
var _c;
__turbopack_context__.k.register(_c, "SchemaForm");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Desktop/3d-Configurator-interaction-estimate/src/app/templates/_components/PdfPreview.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>PdfPreview
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$3d$2d$Configurator$2d$interaction$2d$estimate$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/3d-Configurator-interaction-estimate/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
"use client";
;
function PdfPreview({ src }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$3d$2d$Configurator$2d$interaction$2d$estimate$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        "aria-labelledby": "pdf-preview-title",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$3d$2d$Configurator$2d$interaction$2d$estimate$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                id: "pdf-preview-title",
                children: "PDF Preview"
            }, void 0, false, {
                fileName: "[project]/Desktop/3d-Configurator-interaction-estimate/src/app/templates/_components/PdfPreview.tsx",
                lineNumber: 7,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$3d$2d$Configurator$2d$interaction$2d$estimate$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("iframe", {
                title: "PDF Preview",
                src: src,
                style: {
                    width: '100%',
                    height: 480,
                    border: '1px solid #ccc'
                }
            }, void 0, false, {
                fileName: "[project]/Desktop/3d-Configurator-interaction-estimate/src/app/templates/_components/PdfPreview.tsx",
                lineNumber: 8,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Desktop/3d-Configurator-interaction-estimate/src/app/templates/_components/PdfPreview.tsx",
        lineNumber: 6,
        columnNumber: 5
    }, this);
}
_c = PdfPreview;
var _c;
__turbopack_context__.k.register(_c, "PdfPreview");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Desktop/3d-Configurator-interaction-estimate/src/lib/templates/validation.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ERROR",
    ()=>ERROR,
    "isTemplateType",
    ()=>isTemplateType,
    "storagePathSeemsValid",
    ()=>storagePathSeemsValid,
    "validateCreateInput",
    ()=>validateCreateInput,
    "validateUpdateInput",
    ()=>validateUpdateInput
]);
const ERROR = {
    VALIDATION_ERROR: 'VALIDATION_ERROR',
    STORAGE_PATH_INVALID: 'STORAGE_PATH_INVALID',
    STORAGE_UNAVAILABLE: 'STORAGE_UNAVAILABLE',
    UNAUTHORIZED: 'UNAUTHORIZED',
    NOT_FOUND: 'NOT_FOUND',
    FORBIDDEN: 'FORBIDDEN'
};
function isTemplateType(v) {
    return v === 'basic' || v === 'advanced';
}
function validateCreateInput(body) {
    if (!body || typeof body !== 'object') {
        return {
            code: ERROR.VALIDATION_ERROR,
            message: 'Body must be an object'
        };
    }
    const { name, type, storage_path } = body;
    if (!name || typeof name !== 'string') {
        return {
            code: ERROR.VALIDATION_ERROR,
            message: 'name is required'
        };
    }
    if (!type || typeof type !== 'string' || !isTemplateType(type)) {
        return {
            code: ERROR.VALIDATION_ERROR,
            message: 'type must be basic|advanced'
        };
    }
    if (!storage_path || typeof storage_path !== 'string') {
        return {
            code: ERROR.VALIDATION_ERROR,
            message: 'storage_path is required'
        };
    }
    return null;
}
function storagePathSeemsValid(path) {
    return /^supabase:\/\/templates\/.+/.test(path);
}
function validateUpdateInput(body) {
    return validateCreateInput(body);
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Desktop/3d-Configurator-interaction-estimate/src/lib/storage/supabaseClient.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "STORAGE_ERROR",
    ()=>STORAGE_ERROR,
    "existsStoragePath",
    ()=>existsStoragePath,
    "uploadTemplateContent",
    ()=>uploadTemplateContent
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$3d$2d$Configurator$2d$interaction$2d$estimate$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/Desktop/3d-Configurator-interaction-estimate/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
const STORAGE_ERROR = {
    STORAGE_UNAVAILABLE: 'STORAGE_UNAVAILABLE'
};
const memoryBucket = new Set();
function keyFromPath(path) {
    const m = /^supabase:\/\/([^\/]+)\/(.+)$/.exec(path);
    if (!m) return null;
    return {
        bucket: m[1],
        key: m[2]
    };
}
function useRealSdk() {
    const url = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$3d$2d$Configurator$2d$interaction$2d$estimate$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.SUPABASE_URL;
    const serviceKey = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$3d$2d$Configurator$2d$interaction$2d$estimate$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.SUPABASE_SERVICE_ROLE_KEY;
    return Boolean(url && serviceKey && __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$3d$2d$Configurator$2d$interaction$2d$estimate$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.USE_SUPABASE_SDK === '1');
}
function existsStoragePath(path) {
    try {
        const parsed = keyFromPath(path);
        if (!parsed) return {
            ok: true,
            exists: false
        };
        if (useRealSdk()) {
            // Lazy, bundler-opaque require to avoid build-time resolution errors in Next dev
            try {
                // eslint-disable-next-line no-eval
                const req = (0, eval)('require');
                const { createClient } = req('@supabase/supabase-js');
                const client = createClient(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$3d$2d$Configurator$2d$interaction$2d$estimate$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.SUPABASE_URL, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$3d$2d$Configurator$2d$interaction$2d$estimate$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.SUPABASE_SERVICE_ROLE_KEY);
                // HEAD via list with prefix limited to exact key; reduce network when possible.
                // Note: in this environment tests run without SDK; this branch is only used when explicitly enabled.
                const bucket = client.storage.from(parsed.bucket);
                const list = bucket.list(parsed.key.replace(/\/[^/]+$/, ''), {
                    search: parsed.key.split('/').pop()
                });
                // Promise-like guard: if list is a promise, handle synchronously unsupported in this wrapper context.
                if (typeof list?.then === 'function') {
                    // Not awaited to keep current sync signature; treat as unavailable for now.
                    return {
                        ok: false,
                        error: {
                            code: STORAGE_ERROR.STORAGE_UNAVAILABLE,
                            message: 'Async SDK path check not supported in sync context'
                        }
                    };
                }
            } catch (e) {
            // Fallback to stub on missing SDK or runtime errors
            }
        }
        const composite = `${parsed.bucket}/${parsed.key}`;
        return {
            ok: true,
            exists: memoryBucket.has(composite)
        };
    } catch (e) {
        return {
            ok: false,
            error: {
                code: STORAGE_ERROR.STORAGE_UNAVAILABLE,
                message: e?.message || 'Storage unavailable'
            }
        };
    }
}
function uploadTemplateContent(params) {
    try {
        const bucket = 'templates';
        const key = `${params.uid}/template-${params.version}.${params.ext}`;
        if (useRealSdk()) {
            try {
                // eslint-disable-next-line no-eval
                const req = (0, eval)('require');
                const { createClient } = req('@supabase/supabase-js');
                const client = createClient(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$3d$2d$Configurator$2d$interaction$2d$estimate$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.SUPABASE_URL, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$3d$2d$Configurator$2d$interaction$2d$estimate$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.SUPABASE_SERVICE_ROLE_KEY);
                const storage = client.storage.from(bucket);
                const file = new Blob([
                    params.content
                ], {
                    type: params.contentType || 'application/octet-stream'
                });
                const uploadRes = storage.upload(key, file, {
                    upsert: true
                });
                if (typeof uploadRes?.then === 'function') {
                    // Cannot await in current sync interface; report temporary unavailability in this environment.
                    return {
                        ok: false,
                        error: {
                            code: STORAGE_ERROR.STORAGE_UNAVAILABLE,
                            message: 'Async SDK upload not supported in sync context'
                        }
                    };
                }
            } catch (e) {
                // On any SDK error, map to STORAGE_UNAVAILABLE per contract
                return {
                    ok: false,
                    error: {
                        code: STORAGE_ERROR.STORAGE_UNAVAILABLE,
                        message: e?.message || 'Storage unavailable'
                    }
                };
            }
        }
        const composite = `${bucket}/${key}`;
        memoryBucket.add(composite);
        const storage_path = `supabase://${bucket}/${key}`;
        return {
            ok: true,
            storage_path
        };
    } catch (e) {
        return {
            ok: false,
            error: {
                code: STORAGE_ERROR.STORAGE_UNAVAILABLE,
                message: e?.message || 'Storage unavailable'
            }
        };
    }
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Desktop/3d-Configurator-interaction-estimate/src/lib/templates/service.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createTemplate",
    ()=>createTemplate,
    "deleteTemplate",
    ()=>deleteTemplate,
    "getTemplate",
    ()=>getTemplate,
    "listTemplates",
    ()=>listTemplates,
    "updateTemplate",
    ()=>updateTemplate
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$3d$2d$Configurator$2d$interaction$2d$estimate$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$crypto$2d$browserify$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/3d-Configurator-interaction-estimate/node_modules/next/dist/compiled/crypto-browserify/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$3d$2d$Configurator$2d$interaction$2d$estimate$2f$src$2f$lib$2f$templates$2f$validation$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/3d-Configurator-interaction-estimate/src/lib/templates/validation.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$3d$2d$Configurator$2d$interaction$2d$estimate$2f$src$2f$lib$2f$storage$2f$supabaseClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/3d-Configurator-interaction-estimate/src/lib/storage/supabaseClient.ts [app-client] (ecmascript)");
;
;
;
// In-memory store as a placeholder until DB integration (Supabase) is added.
const STORE = {};
function nowISO() {
    return new Date().toISOString();
}
function createTemplate(input, createdBy) {
    {
        const chk = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$3d$2d$Configurator$2d$interaction$2d$estimate$2f$src$2f$lib$2f$storage$2f$supabaseClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["existsStoragePath"])(String(input.storage_path));
        if (!chk.ok) return {
            ok: false,
            error: {
                code: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$3d$2d$Configurator$2d$interaction$2d$estimate$2f$src$2f$lib$2f$templates$2f$validation$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ERROR"].STORAGE_UNAVAILABLE,
                message: 'Storage unavailable'
            }
        };
        if (!chk.exists) return {
            ok: false,
            error: {
                code: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$3d$2d$Configurator$2d$interaction$2d$estimate$2f$src$2f$lib$2f$templates$2f$validation$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ERROR"].STORAGE_PATH_INVALID,
                message: 'Invalid or unreachable storage_path'
            }
        };
    }
    const id = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$3d$2d$Configurator$2d$interaction$2d$estimate$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$crypto$2d$browserify$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["randomUUID"])();
    const record = {
        id,
        name: String(input.name),
        type: input.type,
        storage_path: String(input.storage_path),
        version: input.version ?? 1,
        created_by: createdBy,
        created_at: nowISO()
    };
    STORE[id] = record;
    return {
        ok: true,
        id
    };
}
function listTemplates() {
    return Object.values(STORE);
}
function getTemplate(id) {
    return STORE[id] ?? null;
}
function updateTemplate(id, input, uid) {
    const existing = STORE[id];
    if (!existing) return {
        ok: false,
        error: {
            code: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$3d$2d$Configurator$2d$interaction$2d$estimate$2f$src$2f$lib$2f$templates$2f$validation$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ERROR"].NOT_FOUND,
            message: 'Template not found'
        }
    };
    if (existing.created_by !== uid) return {
        ok: false,
        error: {
            code: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$3d$2d$Configurator$2d$interaction$2d$estimate$2f$src$2f$lib$2f$templates$2f$validation$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ERROR"].FORBIDDEN,
            message: 'Forbidden'
        }
    };
    {
        const chk = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$3d$2d$Configurator$2d$interaction$2d$estimate$2f$src$2f$lib$2f$storage$2f$supabaseClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["existsStoragePath"])(String(input.storage_path));
        if (!chk.ok) return {
            ok: false,
            error: {
                code: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$3d$2d$Configurator$2d$interaction$2d$estimate$2f$src$2f$lib$2f$templates$2f$validation$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ERROR"].STORAGE_UNAVAILABLE,
                message: 'Storage unavailable'
            }
        };
        if (!chk.exists) return {
            ok: false,
            error: {
                code: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$3d$2d$Configurator$2d$interaction$2d$estimate$2f$src$2f$lib$2f$templates$2f$validation$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ERROR"].STORAGE_PATH_INVALID,
                message: 'Invalid or unreachable storage_path'
            }
        };
    }
    const updated = {
        id: existing.id,
        name: String(input.name),
        type: input.type,
        storage_path: String(input.storage_path),
        version: input.version ?? existing.version,
        created_by: existing.created_by,
        created_at: existing.created_at
    };
    STORE[id] = updated;
    return {
        ok: true,
        record: updated
    };
}
function deleteTemplate(id, uid) {
    const existing = STORE[id];
    if (!existing) return {
        ok: false,
        error: {
            code: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$3d$2d$Configurator$2d$interaction$2d$estimate$2f$src$2f$lib$2f$templates$2f$validation$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ERROR"].NOT_FOUND,
            message: 'Template not found'
        }
    };
    if (existing.created_by !== uid) return {
        ok: false,
        error: {
            code: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$3d$2d$Configurator$2d$interaction$2d$estimate$2f$src$2f$lib$2f$templates$2f$validation$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ERROR"].FORBIDDEN,
            message: 'Forbidden'
        }
    };
    delete STORE[id];
    return {
        ok: true
    };
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Desktop/3d-Configurator-interaction-estimate/src/api/pdf-generate.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "handlePostPdfGenerate",
    ()=>handlePostPdfGenerate
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$3d$2d$Configurator$2d$interaction$2d$estimate$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$buffer$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/Desktop/3d-Configurator-interaction-estimate/node_modules/next/dist/compiled/buffer/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$3d$2d$Configurator$2d$interaction$2d$estimate$2f$src$2f$lib$2f$templates$2f$validation$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/3d-Configurator-interaction-estimate/src/lib/templates/validation.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$3d$2d$Configurator$2d$interaction$2d$estimate$2f$src$2f$lib$2f$templates$2f$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/3d-Configurator-interaction-estimate/src/lib/templates/service.ts [app-client] (ecmascript)");
;
;
function unauthorized(message = 'Missing or invalid Authorization header') {
    return {
        status: 401,
        body: {
            code: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$3d$2d$Configurator$2d$interaction$2d$estimate$2f$src$2f$lib$2f$templates$2f$validation$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ERROR"].UNAUTHORIZED,
            message
        }
    };
}
function parseAuthUid(headers) {
    const auth = headers['authorization'] || headers['Authorization'];
    if (!auth) return null;
    const m = /^Bearer\s+user-(?<uid>[a-zA-Z0-9-]+)$/.exec(auth);
    return m?.groups?.uid ?? null;
}
function nowMs() {
    return Date.now();
}
function stubPdfBase64() {
    const minimalPdf = '%PDF-1.1\n%\u25B5\n1 0 obj\n<<>>\nendobj\ntrailer\n<<>>\n%%EOF\n';
    return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$3d$2d$Configurator$2d$interaction$2d$estimate$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$buffer$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Buffer"].from(minimalPdf, 'utf-8').toString('base64');
}
async function handlePostPdfGenerate(req) {
    const started = nowMs();
    // E2E test hook: allow artificial delay via localStorage flags (browser-only)
    try {
        // eslint-disable-next-line no-undef
        const ls = typeof localStorage !== 'undefined' ? localStorage : null;
        if (ls) {
            const slow = ls.getItem('e2e_slow_pdf');
            const delayStr = ls.getItem('e2e_delay_ms');
            let delayMs = 0;
            if (slow === 'true') delayMs = 6000; // exceed 5s timeout
            if (delayStr && !isNaN(Number(delayStr))) delayMs = Math.max(delayMs, Number(delayStr));
            if (delayMs > 0) {
                await new Promise((r)=>setTimeout(r, delayMs));
            }
        }
    } catch  {}
    const uid = parseAuthUid(req.headers);
    if (!uid) return unauthorized();
    const body = req.body ?? {};
    if (!body || typeof body !== 'object') {
        return {
            status: 422,
            body: {
                code: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$3d$2d$Configurator$2d$interaction$2d$estimate$2f$src$2f$lib$2f$templates$2f$validation$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ERROR"].VALIDATION_ERROR,
                message: 'Body must be an object'
            }
        };
    }
    const { template_id, data } = body;
    if (!template_id || typeof template_id !== 'string') {
        return {
            status: 422,
            body: {
                code: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$3d$2d$Configurator$2d$interaction$2d$estimate$2f$src$2f$lib$2f$templates$2f$validation$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ERROR"].VALIDATION_ERROR,
                message: 'template_id is required'
            }
        };
    }
    if (!data || typeof data !== 'object') {
        return {
            status: 422,
            body: {
                code: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$3d$2d$Configurator$2d$interaction$2d$estimate$2f$src$2f$lib$2f$templates$2f$validation$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ERROR"].VALIDATION_ERROR,
                message: 'data must be an object',
                details: {
                    typeErrors: [
                        'data must be object'
                    ]
                }
            }
        };
    }
    const meta = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$3d$2d$Configurator$2d$interaction$2d$estimate$2f$src$2f$lib$2f$templates$2f$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getTemplate"])(template_id);
    if (!meta) {
        return {
            status: 404,
            body: {
                code: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$3d$2d$Configurator$2d$interaction$2d$estimate$2f$src$2f$lib$2f$templates$2f$validation$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ERROR"].NOT_FOUND,
                message: 'Template not found'
            }
        };
    }
    // NOTE: Minimal stub – actual schema vs data validation will be added in renderer story.
    try {
        const pdf_base64 = stubPdfBase64();
        const elapsed = Math.max(0, nowMs() - started);
        return {
            status: 200,
            headers: {
                'x-processing-ms': String(elapsed),
                'Content-Type': 'application/json'
            },
            body: {
                pdf_base64
            }
        };
    } catch (e) {
        return {
            status: 503,
            body: {
                code: 'GENERATOR_UNAVAILABLE',
                message: e?.message || 'Generator unavailable'
            }
        };
    }
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Desktop/3d-Configurator-interaction-estimate/src/lib/pdf/request.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "buildPdfPayload",
    ()=>buildPdfPayload,
    "generatePdf",
    ()=>generatePdf
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$3d$2d$Configurator$2d$interaction$2d$estimate$2f$src$2f$api$2f$pdf$2d$generate$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/3d-Configurator-interaction-estimate/src/api/pdf-generate.ts [app-client] (ecmascript)");
;
function buildPdfPayload(templateId, values) {
    return {
        template_id: templateId,
        data: values ?? {}
    };
}
async function generatePdf(templateId, values, opts = {}) {
    const timeoutMs = opts.timeoutMs ?? 5000;
    const transport = opts.transport ?? (async (req)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$3d$2d$Configurator$2d$interaction$2d$estimate$2f$src$2f$api$2f$pdf$2d$generate$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["handlePostPdfGenerate"])(req));
    const req = {
        headers: {
            Authorization: 'Bearer user-test'
        },
        body: buildPdfPayload(templateId, values)
    };
    return new Promise((resolve, reject)=>{
        const timer = setTimeout(()=>{
            const err = new Error('PDF generation timed out');
            err.code = 'PDF_TIMEOUT';
            reject(err);
        }, timeoutMs);
        transport(req).then((resp)=>{
            clearTimeout(timer);
            if (resp.status !== 200) {
                const err = new Error(resp.body?.message || 'PDF generation failed');
                err.code = resp.body?.code || 'PDF_ERROR';
                err.details = resp.body?.details;
                throw err;
            }
            const pdfBase64 = resp.body?.pdf_base64;
            const dataUrl = `data:application/pdf;base64,${pdfBase64}`;
            resolve({
                pdfBase64,
                dataUrl
            });
        }).catch((err)=>{
            clearTimeout(timer);
            if (err && !err.code) {
                err.code = err?.message ? 'PDF_ERROR' : 'UNKNOWN_ERROR';
            }
            reject(err);
        });
    });
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Desktop/3d-Configurator-interaction-estimate/src/lib/errors/pdf.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getPdfErrorMessage",
    ()=>getPdfErrorMessage
]);
const defaultMessages = {
    PDF_TIMEOUT: 'PDF 생성 시간이 초과되었습니다 (5초). 다시 시도해 주세요.',
    UNAUTHORIZED: '인증이 필요합니다.',
    NOT_FOUND: '템플릿을 찾을 수 없습니다.',
    VALIDATION_ERROR: '입력 데이터가 유효하지 않습니다.',
    GENERATOR_UNAVAILABLE: 'PDF 생성 서비스를 사용할 수 없습니다.',
    PDF_ERROR: 'PDF 생성 중 오류가 발생했습니다.'
};
function getPdfErrorMessage(code, t) {
    // If i18n translator provided, prefer translation keys like 'pdf.error.PDF_TIMEOUT'
    if (t) {
        const key = `pdf.error.${code}`;
        const translated = t(key);
        if (translated && translated !== key) return translated;
    }
    return defaultMessages[code] || `오류가 발생했습니다: ${code}`;
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Desktop/3d-Configurator-interaction-estimate/src/lib/pdf/util.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "base64ToUint8Array",
    ()=>base64ToUint8Array,
    "createPdfBlobUrl",
    ()=>createPdfBlobUrl,
    "fnv1a",
    ()=>fnv1a,
    "makeTemplatePdfCacheKey",
    ()=>makeTemplatePdfCacheKey
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$3d$2d$Configurator$2d$interaction$2d$estimate$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$buffer$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/Desktop/3d-Configurator-interaction-estimate/node_modules/next/dist/compiled/buffer/index.js [app-client] (ecmascript)");
function base64ToUint8Array(base64) {
    if (typeof __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$3d$2d$Configurator$2d$interaction$2d$estimate$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$buffer$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Buffer"] !== 'undefined') {
        // Node/test env
        return new Uint8Array(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$3d$2d$Configurator$2d$interaction$2d$estimate$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$buffer$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Buffer"].from(base64, 'base64'));
    }
    // Browser fallback
    const binary = atob(base64);
    const len = binary.length;
    const bytes = new Uint8Array(len);
    for(let i = 0; i < len; i++)bytes[i] = binary.charCodeAt(i);
    return bytes;
}
function createPdfBlobUrl(pdfBase64) {
    try {
        const bytes = base64ToUint8Array(pdfBase64);
        const blob = new Blob([
            bytes
        ], {
            type: 'application/pdf'
        });
        return URL.createObjectURL(blob);
    } catch  {
        return null;
    }
}
function fnv1a(str) {
    let h = 0x811c9dc5;
    for(let i = 0; i < str.length; i++){
        h ^= str.charCodeAt(i);
        h = Math.imul(h, 0x01000193);
    }
    // Convert to unsigned and hex
    return (h >>> 0).toString(16).padStart(8, '0');
}
function makeTemplatePdfCacheKey(templateId, values) {
    const payload = JSON.stringify(values ?? {});
    return `${templateId}:${fnv1a(payload)}`;
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Desktop/3d-Configurator-interaction-estimate/src/app/templates/_components/EditPageClient.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>EditPageClient
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$3d$2d$Configurator$2d$interaction$2d$estimate$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/3d-Configurator-interaction-estimate/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$3d$2d$Configurator$2d$interaction$2d$estimate$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/3d-Configurator-interaction-estimate/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$3d$2d$Configurator$2d$interaction$2d$estimate$2f$src$2f$app$2f$templates$2f$_components$2f$SchemaForm$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/3d-Configurator-interaction-estimate/src/app/templates/_components/SchemaForm.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$3d$2d$Configurator$2d$interaction$2d$estimate$2f$src$2f$app$2f$templates$2f$_components$2f$PdfPreview$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/3d-Configurator-interaction-estimate/src/app/templates/_components/PdfPreview.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$3d$2d$Configurator$2d$interaction$2d$estimate$2f$src$2f$lib$2f$pdf$2f$request$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/3d-Configurator-interaction-estimate/src/lib/pdf/request.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$3d$2d$Configurator$2d$interaction$2d$estimate$2f$src$2f$lib$2f$errors$2f$pdf$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/3d-Configurator-interaction-estimate/src/lib/errors/pdf.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$3d$2d$Configurator$2d$interaction$2d$estimate$2f$src$2f$lib$2f$pdf$2f$util$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/3d-Configurator-interaction-estimate/src/lib/pdf/util.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
function getMockSchema(templateId) {
    if (!templateId) return null;
    return {
        sections: [
            {
                section_id: 'basic',
                title: '기본 정보',
                fields: [
                    {
                        type: 'text',
                        pdf_field_name: 'company',
                        label: '회사명',
                        required: true
                    },
                    {
                        type: 'checkbox',
                        pdf_field_name: 'need_demo',
                        label: '데모 요청'
                    },
                    {
                        type: 'select',
                        pdf_field_name: 'size',
                        label: '규모',
                        options: [
                            'S',
                            'M',
                            'L'
                        ],
                        required: true
                    }
                ]
            }
        ]
    };
}
function EditPageClient({ templateId, pdfOptions }) {
    _s();
    const [mode, setMode] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$3d$2d$Configurator$2d$interaction$2d$estimate$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('preview');
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$3d$2d$Configurator$2d$interaction$2d$estimate$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$3d$2d$Configurator$2d$interaction$2d$estimate$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [previewSrc, setPreviewSrc] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$3d$2d$Configurator$2d$interaction$2d$estimate$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [lastValues, setLastValues] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$3d$2d$Configurator$2d$interaction$2d$estimate$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({});
    const [previewCacheKey, setPreviewCacheKey] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$3d$2d$Configurator$2d$interaction$2d$estimate$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    // Revoke blob URLs on change/unmount to avoid leaks
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$3d$2d$Configurator$2d$interaction$2d$estimate$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "EditPageClient.useEffect": ()=>{
            return ({
                "EditPageClient.useEffect": ()=>{
                    if (previewSrc && previewSrc.startsWith('blob:')) {
                        try {
                            URL.revokeObjectURL(previewSrc);
                        } catch  {}
                    }
                }
            })["EditPageClient.useEffect"];
        }
    }["EditPageClient.useEffect"], [
        previewSrc
    ]);
    if (!templateId) return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$3d$2d$Configurator$2d$interaction$2d$estimate$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        role: "alert",
        children: "templateId가 필요합니다"
    }, void 0, false, {
        fileName: "[project]/Desktop/3d-Configurator-interaction-estimate/src/app/templates/_components/EditPageClient.tsx",
        lineNumber: 45,
        columnNumber: 27
    }, this);
    const schema = getMockSchema(templateId);
    if (!schema) return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$3d$2d$Configurator$2d$interaction$2d$estimate$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        role: "status",
        children: "스키마가 없습니다"
    }, void 0, false, {
        fileName: "[project]/Desktop/3d-Configurator-interaction-estimate/src/app/templates/_components/EditPageClient.tsx",
        lineNumber: 47,
        columnNumber: 23
    }, this);
    async function onGenerate() {
        setError(null);
        setLoading(true);
        try {
            const { dataUrl, pdfBase64 } = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$3d$2d$Configurator$2d$interaction$2d$estimate$2f$src$2f$lib$2f$pdf$2f$request$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["generatePdf"])(templateId, lastValues, {
                timeoutMs: 5000,
                ...pdfOptions || {}
            });
            const blobUrl = pdfBase64 ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$3d$2d$Configurator$2d$interaction$2d$estimate$2f$src$2f$lib$2f$pdf$2f$util$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createPdfBlobUrl"])(pdfBase64) : null;
            const url = blobUrl || dataUrl;
            if (mode === 'preview') {
                setPreviewSrc(url);
            } else {
                const a = document.createElement('a');
                a.href = url;
                a.download = `quote-${templateId}-${Date.now()}.pdf`;
                document.body.appendChild(a);
                a.click();
                a.remove();
            }
        } catch (e) {
            const code = e?.code || 'PDF_ERROR';
            setError((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$3d$2d$Configurator$2d$interaction$2d$estimate$2f$src$2f$lib$2f$errors$2f$pdf$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getPdfErrorMessage"])(code));
        } finally{
            setLoading(false);
        }
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$3d$2d$Configurator$2d$interaction$2d$estimate$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$3d$2d$Configurator$2d$interaction$2d$estimate$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                children: "Template Edit"
            }, void 0, false, {
                fileName: "[project]/Desktop/3d-Configurator-interaction-estimate/src/app/templates/_components/EditPageClient.tsx",
                lineNumber: 76,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$3d$2d$Configurator$2d$interaction$2d$estimate$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    marginBottom: 12
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$3d$2d$Configurator$2d$interaction$2d$estimate$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$3d$2d$Configurator$2d$interaction$2d$estimate$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                type: "radio",
                                name: "mode",
                                value: "preview",
                                checked: mode === 'preview',
                                onChange: ()=>setMode('preview')
                            }, void 0, false, {
                                fileName: "[project]/Desktop/3d-Configurator-interaction-estimate/src/app/templates/_components/EditPageClient.tsx",
                                lineNumber: 79,
                                columnNumber: 11
                            }, this),
                            " Preview"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/3d-Configurator-interaction-estimate/src/app/templates/_components/EditPageClient.tsx",
                        lineNumber: 78,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$3d$2d$Configurator$2d$interaction$2d$estimate$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                        style: {
                            marginLeft: 12
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$3d$2d$Configurator$2d$interaction$2d$estimate$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                type: "radio",
                                name: "mode",
                                value: "download",
                                checked: mode === 'download',
                                onChange: ()=>setMode('download')
                            }, void 0, false, {
                                fileName: "[project]/Desktop/3d-Configurator-interaction-estimate/src/app/templates/_components/EditPageClient.tsx",
                                lineNumber: 82,
                                columnNumber: 11
                            }, this),
                            " Download"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/3d-Configurator-interaction-estimate/src/app/templates/_components/EditPageClient.tsx",
                        lineNumber: 81,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$3d$2d$Configurator$2d$interaction$2d$estimate$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: onGenerate,
                        disabled: loading,
                        "aria-busy": loading,
                        "aria-label": "Generate PDF",
                        style: {
                            marginLeft: 12
                        },
                        children: loading ? 'Generating…' : 'Generate'
                    }, void 0, false, {
                        fileName: "[project]/Desktop/3d-Configurator-interaction-estimate/src/app/templates/_components/EditPageClient.tsx",
                        lineNumber: 84,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Desktop/3d-Configurator-interaction-estimate/src/app/templates/_components/EditPageClient.tsx",
                lineNumber: 77,
                columnNumber: 7
            }, this),
            error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$3d$2d$Configurator$2d$interaction$2d$estimate$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                role: "alert",
                "aria-live": "assertive",
                style: {
                    color: '#d00',
                    marginBottom: 8
                },
                children: error
            }, void 0, false, {
                fileName: "[project]/Desktop/3d-Configurator-interaction-estimate/src/app/templates/_components/EditPageClient.tsx",
                lineNumber: 89,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$3d$2d$Configurator$2d$interaction$2d$estimate$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$3d$2d$Configurator$2d$interaction$2d$estimate$2f$src$2f$app$2f$templates$2f$_components$2f$SchemaForm$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                templateId: templateId,
                schema: schema,
                onValuesChange: (vals)=>{
                    setLastValues(vals);
                    // Clear preview when inputs change to respect cache invalidation note
                    setPreviewSrc(null);
                    setPreviewCacheKey((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$3d$2d$Configurator$2d$interaction$2d$estimate$2f$src$2f$lib$2f$pdf$2f$util$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["makeTemplatePdfCacheKey"])(templateId, vals));
                }
            }, void 0, false, {
                fileName: "[project]/Desktop/3d-Configurator-interaction-estimate/src/app/templates/_components/EditPageClient.tsx",
                lineNumber: 93,
                columnNumber: 7
            }, this),
            previewSrc && mode === 'preview' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$3d$2d$Configurator$2d$interaction$2d$estimate$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$3d$2d$Configurator$2d$interaction$2d$estimate$2f$src$2f$app$2f$templates$2f$_components$2f$PdfPreview$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                src: previewSrc
            }, void 0, false, {
                fileName: "[project]/Desktop/3d-Configurator-interaction-estimate/src/app/templates/_components/EditPageClient.tsx",
                lineNumber: 103,
                columnNumber: 44
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Desktop/3d-Configurator-interaction-estimate/src/app/templates/_components/EditPageClient.tsx",
        lineNumber: 75,
        columnNumber: 5
    }, this);
}
_s(EditPageClient, "dKKVYU426aV6tOt56h6m+9Ui0o0=");
_c = EditPageClient;
var _c;
__turbopack_context__.k.register(_c, "EditPageClient");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=Desktop_3d-Configurator-interaction-estimate_src_cd1d3052._.js.map