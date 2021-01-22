# Kusama Tips Widget

![build](https://github.com/Shard-Labs/kusama-tips-widget/workflows/Build/badge.svg)

## Install

Using CDN: Add the following script to the end of your `<head>` section.

```html
<script src="https://unpkg.com/@shardlabs/kusama-tips-widget@latest/dist/bundle.min.js"></script>
```

## Usage

Binding the widget:

```js
kusamaTipsWidget.bind(target, options)
```

Minimal example:

```html
<script>
  kusamaTipsWidget.bind(document.body, {
    beneficiary: "5EhR5PRsX...",
  });
</script>
```

Use custom button element:

```html
<script>
  kusamaTipsWidget.bind(document.body, {
    beneficiary: "5EhR5PRsX...",
    element: document.getElementById("my-button"),
  });
</script>
```

You can disable proposals by passing `allowProposing: false` to the options object:

```html
<script>
  kusamaTipsWidget.bind(document.body, {
    beneficiary: "5EhR5PRsX...",
    buttonText: "Donate KSM",
    allowProposing: false,
  });
</script>
```

## Options

| Property | Description | Required | Default |
|-|-|-|-|
| beneficiary | The account to be credited with the assets. Use your substrate address here. | Yes | - |
| element | A custom DOM element on which a click handler will be registered. | No | - |
| buttonText | A custom text for the button if the default value does not fit your use case. | No | Kusama Tips |
| allowProposing | A flag to control tip proposing. This flag can be set to `false` in cases where tip proposing is not desired or should not be allowed. Tip proposing is allowed by default. | No | true |
