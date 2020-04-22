# sweet-log

> 将 log 展示在页面上，便于调试。适合使用在 jsfiddle，codepen 等示例中。

![demo](https://cdn.jsdelivr.net/npm/figure-bed@0.0.45/images/sc.png)

# 引入方式

```html
<script src="http://cdn.jsdelivr.net/npm/sweet-log/dist/index.js"></script>
```

# 配置


## 使用 querystring（推荐）

```html
<script src="http://cdn.jsdelivr.net/npm/sweet-log/dist/index.js?display=true"></script>
```

## 定义全局对象
```js
window.SWEET_LOG_CONFIG = {
  /** 是否默认展示 */
  display: false,
  /** 位置，支持 top / right / bottom / left */
  position: 'right',
  /** 展示区域宽度 */
  width: '',
  /** 展示区域高度 */
  height: '',
}
```

## 使用 dataset

```html
<script src="http://cdn.jsdelivr.net/npm/sweet-log/dist/index.js" data-display="true"></script>
```

