Kusama Tips Widget

```html
<script src="https://unpkg.com/kusama-tips-widget/dist/bundle.min.js"></script>
```

Binding the widget

```js
<script>
kusamaTipsWidget.bind(document.body, {
    beneficiary: "5EhR5PRsX...",
})
</script>
```

Use custom button element

```js
<script>
kusamaTipsWidget.bind(document.body, {
    beneficiary: "5EhR5PRsX...",
    element: document.getElementById("my-button")
})
</script>
```
