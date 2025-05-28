# KPI ID Sign In Button

## Running the project

### Button script

```sh
# Locate to project
cd button

# Install deps
npm install

# Make a build
npm run build

# Run it in preview mode
npm run preview
```

Button script is cinfigured to run on port `5174`

### Demo page

```sh
# Locate to project
cd demo

# Install deps
npm install

# Run in dev mode
npm run dev
```

### Installing KPI ID SignIn on your website

1. Include button tag

```html
<div id="kpi_id_signin" data-app-id="app-id" data-size="large" data-logo-alignment="left" data-locale="uk" data-color="brand"></div>
```

2. Include script and initialization at the bottom of a web page

```html
<script src="https://auth.kpi.ia/kpi-id-signin.js" async=""></script>
<script>
  if (window.KPIID && isInitialized) {
    window.KPIID.init();
  }
</script>
```

