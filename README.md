# Kusama Tips Widget

## Install

Using CDN: Add the following script to the end of your `<head>` section.

```html
<script src="https://unpkg.com/@shardlabs/kusama-tips-widget@latest/dist/bundle.min.js"></script>
```

## Usage

Binding the widget

```html
<script>
  kusamaTipsWidget.bind(document.body, {
    beneficiary: "5EhR5PRsX...",
  });
</script>
```

Use custom button element

```html
<script>
  kusamaTipsWidget.bind(document.body, {
    beneficiary: "5EhR5PRsX...",
    element: document.getElementById("my-button"),
  });
</script>
```

You can disable proposals by passing `allowProposing: false` to the options object.

```html
<script>
  kusamaTipsWidget.bind(document.body, {
    beneficiary: "5EhR5PRsX...",
    buttonText: "Donate KSM",
    allowProposing: false,
  });
</script>
```
