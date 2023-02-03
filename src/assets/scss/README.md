# SCSS

## Utility

大部分參考至 [Utility API · Bootstrap v5.1](https://getbootstrap.com/docs/5.1/utilities/api/)
	
| 選項 | 必填 | 型別 | 預設值 | 描述 |
| --- | --- | --- | --- | --- |
| [`property`](#property) | **v** | `string | string[]` | – | 屬性名稱 |
| [`values`](#values) | **v** | `list | map` | – | 屬性值。若不希望 class 名稱和屬性值相同時，請用 map。若 key 為 `null` 時，該 class 名稱不以 key 為後綴 |
| [`class`](#class) | – | `string` | null | class 名稱。若未提供此選項，且 `property` 為 `string[]` 時，將預設為 `property` 陣列的第一個元素。若 `class: null` 時，不以 `property` 為 class 的前綴 |
| `only-css-var` | – | `bool` | `false` | 只生成 CSS 變數，不生成任何 CSS rule |
| [`css-var`](#css-variable-utilities) | – | `bool | string[]` | null | 除了 CSS rule 外，也生成 CSS 變數 |
| [`local-vars`](#local-css-variables) | – | `map` | null | 除了 CSS rule 外，也生成 local CSS 變數 |
| [`state`](#states) | – | `list` | null | 生成 pseudo-class variants，例如：`:hover`、`:focus` |
| [`responsive`](#responsive) | – | `bool` | `false` | 生成 responsive class |
| [`print`](#print) | – | `bool` | `false` | 生成 print class，只適用於 `@media print { ... }` |


### 相關 Sass 變數

在 `scss/base/setting.scss` 內相關的 Sass 變數：

```scss
// `:root` CSS 變數的前綴
$variable-prefix: x-;
```


在 `scss/base/utilities.scss` 內相關的 Sass 變數：

```scss
$enable-important-utilities: true;
```


### Property

型別為 `string`：

```scss
$utilities: (
  "opacity": (
    property: opacity,
    values: (
      0: 0,
      100: 1,
    )
  )
);

// 輸出
.opacity-0 { opacity: 0 !important; }
.opacity-100 { opacity: 1 !important; }
```


型別為 `string[]`：

```scss
$utilities: (
  'margin-x': (
    property: margin-right margin-left,
    class: mx,
    values: (
      0: 0,
      1: 1rem,
      auto: auto
    )
  )
);

// 輸出
.mx-0 {
  margin-right: 0 !important;
  margin-left: 0 !important;
}
.mx-1 {
  margin-right: 1rem !important;
  margin-left: 1rem !important;
}
.mx-auto {
  margin-right: auto !important;
  margin-left: auto !important;
}
```


### Values

指定要生成哪些對應的 class 名稱和 CSS 規則所使用的屬性值。

型別為 `list`：

```scss
$utilities: (
  'display': (
    property: display,
    class: d,
    values: inline block none
  )
);

// 輸出：
.d-inline { display: inline !important; }
.d-block { display: block !important; }
.d-none { display: none !important; }
```


型別為 `map`：
- 若不希望 class 名稱和屬性值相同時，請用 map
- 若 key 為 `null` 時，該 class 名稱不以 key 為後綴

```scss
$utilities: (
  'resize': (
    property: resize,
    class: resize,
    values: (
      null: both,
      x: horizontal,
      y: vertical,
      none: none
    )
  )
);

// 輸出：
.resize { resize: both !important; }
.resize-x { resize: horizontal !important; }
.resize-y { resize: vertical !important; }
.resize-none { resize: none !important; }
```


若多個 utility 設定要共用 `values` 選項值時，可用額外的 Sass 變數統一管理，並搭配 `map-merge()` 額外擴充：

```scss
// scss/base/spacing.scss
$spacers: (
  0: 0,
  1: 1rem
};

// scss/base/utilities.scss
@use 'spacing';

$utilities: (
  'margin': (
    property: margin,
    class: m,
    values: map-merge(
      spacing.$spacers,
      (
        auto: auto
      )
    )
  ),
  'padding': (
    property: padding,
    class: p,
    values: spacing.$spacers
  )
);

// 輸出：
.m-0 { margin: 0 !important; }
.m-1 { margin: 1rem !important; }
.m-auto { margin: auto !important; }
.p-0 { padding: 0 !important; }
.p-1 { padding: 1rem !important; }
```


### Class

使用 `class` 選項來自訂 class 的前綴。

例如：從 `.display-` 自訂為 `.d-`：

```scss
$utilities: (
  'display': (
    property: display,
    class: d,
    values: inline block none
  )
);

// 輸出：
.d-inline { display: inline !important; }
.d-block { display: block !important; }
.d-none { display: none !important; }
```


若未提供 `class` 選項，且 `property` 為 `string[]` 時，將預設為 `property` 陣列的第一個元素：

```scss
$utilities: (
  "opacity": (
    property: opacity,
    values: (
      0: 0,
      100: 1,
    )
  )
);

// 輸出
.opacity-0 { opacity: 0 !important; }
.opacity-100 { opacity: 1 !important; }
```


若 `class: null` 時，不以 `property` 為 class 的前綴：

```scss
$utilities: (
  'visibility': (
    property: visibility,
    class: null,
    values: (
      visible: visible,
      invisible: hidden
    )
  )
);

// 輸出：
.visible { visibility: visible !important; }
.invisible { visibility: hidden !important; }
```


### Only CSS variable

使用 `only-css-var` 選項時，只會生成 CSS 變數，不生成任何 CSS rule。不能與 `css-var` 選項一起使用。

```scss
$utilities: (
  'gap': (
    only-css-var: true,
    property: gap,
    class: gap,
    values: (
      0: 0,
      1: 1rem,
    )
  )
);

// 輸出：
.gap-0 { --x-gap: 0; }
.gap-1 { --x-gap: 1rem; }
```


### CSS variable

除了 CSS rule 外，也生成 CSS 變數。生成的 CSS 變數帶有自訂前綴 + `property` 名稱。

型別為 `bool`：生成一個 CSS 變數

```scss
$utilities: (
  'gap': (
    css-var: true,
    property: gap,
    class: gap,
    values: (
      0: 0,
      1: 1rem,
    )
  )
);

// 輸出：
	
.gap-0 {
  --x-gap: 0;
  gap: 0 !important;
}
.gap-1 {
  --x-gap: 1rem;
  gap: 1rem !important;
}
```


型別為 `string[]`：生成多個指定 CSS 變數

```scss
$utilities: (
  'gap': (
    css-var: gap space,
    property: gap,
    class: gap,
    values: (
      0: 0,
      1: 1rem,
    )
  )
);

// 輸出：
.gap-0 {
  --x-gap: 0;
  --x-space: 0;
  gap: 0 !important;
}
.gap-1 {
  --x-gap: 1rem;
  --x-space: 1rem;
  gap: 1rem !important;
}
```


### Local CSS variable

使用 `local-vars` 選項時，除了 CSS rule 外，也生成 local CSS 變數。

```scss
$utilities: (
  "background-color": (
    property: background-color,
    class: bg,
    local-vars: (
      "bg-opacity": 1
    ),
    values: map-merge(
      color.$utilities-colors,
      (
        "transparent": transparent
      )
    )
  )
);

// 輸出：
.bg-primary {
  --bs-bg-opacity: 1;
  background-color: rgba(var(--bs-primary-rgb), var(--bs-bg-opacity)) !important;
}
.bg-secondary {
  --bs-bg-opacity: 1;
  background-color: rgba(var(--bs-secondary-rgb), var(--bs-bg-opacity)) !important;
}
.bg-transparent {
  --bs-bg-opacity: 1;
  background-color: transparent !important;
}
```


### States

使用 `state` 選項時，生成 pseudo-class variants，例如：`:hover`、`:focus`

```scss
$utilities: (
  "opacity": (
    property: opacity,
    class: opacity,
    state: hover,
    values: (
      0: 0,
      100: 1,
    )
  )
);

// 輸出：
.opacity-0-hover:hover { opacity: 0 !important; }
.opacity-100-hover:hover { opacity: 1 !important; }
```


### Responsive

設定 `responsive: true` 生成 responsive class。

```scss
$utilities: (
  'display': (
    responsive: true,
    property: display,
    class: d,
    values: block none
  )
);

// 輸出：
.d-block { display: block !important; }
.d-none { display: none !important; }

@media (min-width: 576px) {
  .d-sm-block { display: block !important; }
  .d-sm-none { display: none !important; }
}
@media (min-width: 768px) {
  .d-md-block { display: block !important; }
  .d-md-none { display: none !important; }
}
@media (min-width: 992px) {
  .d-lg-block { display: block !important; }
  .d-lg-none { display: none !important; }
}
@media (min-width: 1200px) {
  .d-xl-block { display: block !important; }
  .d-xl-none { display: none !important; }
}
```


### Print

設定 `print: true` 會生成 print class，只適用於 `@media print { ... }`。

```scss
$utilities: (
  'display': (
    print: true,
    property: display,
    class: d,
    values: block none
  ),
);

// 輸出：
.d-block { display: block !important; }
.d-none { display: none !important; }

@media print {
  .d-print-block { display: block !important; }
  .d-print-none { display: none !important; }
}
```
