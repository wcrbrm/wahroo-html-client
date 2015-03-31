WAHROO API HTML CLIENT
===
*Warning: Wahroo's HTML API is still in beta, more changes are coming!*

## Installation instructions

#### 1. Create a clone of this repository
```
git clone https://github.com/wcrbrm/wahroo-html-client
```

#### 2. Put simplest code for embedding to your HTML
```
<!-- WAHROO EMBEDDING START -->
<script type="text/javascript" src="wahroo-html-client/js/loader.js" data-url="/vessels/38"></script>
<!-- WAHROO EMBEDDING START -->
```

## Loader Parameters

All parameters are optional

Parameter | Example Value | Description
---|---|---
data-url | /charter/102 | Default location inside the web application
data-html-root | /wahroo-html-client/ | Http path to html client distribution
data-api-root | http://www.wahroo.com/api/v1/ | Http path of the RESTful API
data-container | #booking-container | CSS selector of container to which ebmedding will be done

