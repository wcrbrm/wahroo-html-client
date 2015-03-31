WAHROO API HTML CLIENT
===
*Warning: Wahroo's HTML API is still in beta, more changes are coming!*

## Installation instructions

#### 1. Save clone of this repository to your web root
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
done, we are ready to start.


## Javascript loader parameters

All parameters are optional

Parameter | Description
---|---
**data-url**| Default location inside the web application.
 | Example: `/charter/102` 
**data-html-root** | Http path to html client distribution
 | Example: `/wahroo-html-client/`
**data-api-root**  | Http path of the RESTful API
 | Example: `/api/v1/`
**data-container** | CSS selector of container to which embedding will be done
 | Example: `#booking-container`

## Customizing CSS and Javascript

To customize CSS or Javascript you need to have NodeJS and Grunt installed locally and working from your command line.
If they are present, before starting modifications, please do the following:

```
cd wahroo-html-client
# installs all required dependencies (plugins for grunt)
npm install
# start daemon to watch changes and recompile them on fly
grunt watch
```
While the deamon is watching your changes, feel free to edit LESS files and Javscript - they will be automatically compiled in minified versions.

