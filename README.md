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
<script type="text/javascript" src="wahroo-html-client/js/loader.js" 
	data-url="/vessels/38"></script>
<!-- WAHROO EMBEDDING END -->
```

## Loader Parameters

All parameters are optional

Parameter | Description
---|---
*data-url* | Default location inside the web application.
 | Example: `/charter/102` 
*data-html-root* | Http path to html client distribution
 | Example: `/wahroo-html-client/`
*data-api-root*  | Http path of the RESTful API
 | Example: `/api/v1/`
*data-container* | CSS selector of container to which embedding will be done
 | Example: `#booking-container`

