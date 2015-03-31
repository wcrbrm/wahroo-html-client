/*! 002-loading.js */

CuteLoading = function (opt) {
    var d = this.d = document, pi = parseInt;
    this.bSvg = window.SVGAngle || d.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#BasicStructure", "1.1");
    this.ea = function (de, v) { for (var k in v) de.setAttribute(k, v[k]); };
    this.ce = d.createElement;
    this.SH = null;
    this.o = {
        container: null,
        background: '#fff',
        opacity: 0.7,
        width: 100,
        height: 100,
        z: 1000,
        segments: 16,
        padding: 5,
        minR: 3,
        maxR: 10,
        maxOpacity: 1,
        minOpacity: 0,
        color: '#eef',
        stroke: '#606',
        text: "",
        textColor: '#878',
        fontFamily: 'arial',
        fontWeight: 'bold',
        fontSize: '16px',
        timeout: 100
    };
    for (var k in opt) { this.o[k] = opt[k]; }
    var oo = this.o;

    if (oo.container == null) {
        this.SH = d.createElement('div');
        var op = this.o.opacity;
        this.SH.style.cssText = 'top:0px;left:0px;position:fixed;top:0px;bottom:0px;left:0px;right:0px;;overflow:hidden;z-index:' + oo.z
            + ';background:' + oo.background + ';opacity:' + op + ';-moz-opacity:' + op + ';-khtml-opacity:' + op + ';filter:alpha(opacity=' + pi(op * 100) + ')';
        var c1 = this.o.container = d.createElement('div');
        c1.style.cssText = 'position:absolute;top:50%;left:50%;z-index:' + (oo.z + 1) + ';margin-left:-' + pi(oo.width / 2) + 'px;margin-top:-' + pi(oo.height / 2) + 'px';
        this.SH.appendChild(c1);
        this.d.body.appendChild(this.SH);
    }

    this.r = function () { return pi(this.o.width) / 2 - this.o.maxR - this.o.padding; };

    // get radius of circle number num for a certain frame (linear interpolation)
    this.tick = this.tid = 0;
    this._stop = false;

    this._r = function (n) {
        var nr = (this.tick + n) % this.o.segments;
        return oo.maxR - nr * (oo.maxR - oo.minR) / this.o.segments;
    };
    this._o = function (n) {
        var nr = (this.tick + n) % this.o.segments;
        return oo.maxOpacity - nr * (oo.maxOpacity - oo.minOpacity) / this.o.segments;
    };

    if (this.bSvg) {
        var w3c = "http://www.w3.org/";
        this.ceSvg = function (p) { return d.createElementNS(w3c+"2000/svg", p) };
        this.c = this.ceSvg("svg:svg");
        this.c.setAttributeNS(w3c + "2000/xmlns/", "xmlns:xlink", w3c+"/1999/xlink");
        this.ea(this.c, {
            'width': oo.width,
            'height': oo.height,
            'version': "1.1",
            'viewBox': '0 0 ' + oo.width + ' ' + oo.height
        });
        this.c.style.cssText = "overflow:hidden;position:relative;z-index:" + oo.z;
        oo.container.appendChild(this.c);

        this.tData = d.createTextNode(oo.text);
        this.t = this.ceSvg('text');
        this.ea(this.t, {
            'x': pi(oo.width / 2),
            'y': pi(oo.height / 2),
            'fill': oo.textColor,
            'font-family': oo.fontFamily,
            'font-size': oo.fontSize,
            'font-weight': oo.fontWeight,
            'text-anchor': "middle"
        });
        this.t.appendChild(this.tData);

    } else {
        !d.namespaces.rvml && d.namespaces.add("v", "urn:schemas-microsoft-com:vml");
        this.f = d.createDocumentFragment();

        this.oval = function (x, y, r, c, s) {
            var g = this.f.appendChild(this.ce("v:oval"));
            g.style.cssText = "left:" + pi(x - r) + "px;top:"
                    + pi(y - r) + "px;width:" + 2 * r + "px;height:" + 2 * r + "px;z-index:"
                    + (this.o.z + 1) + ";position:absolute;behavior:url(#default#VML);display:block;";
            this.ea(g, {
                "fillcolor": c,
                "strokecolor": s
            });
            return g;
        };

        this.c = this.ce('div');
        this.c.style.cssText = 'position:relative;width:' + oo.width + 'px;height:' + oo.width + 'px';

        this.t = this.ce("div");
        this.t.innerHTML = oo.text;
        this.t.style.cssText = 'color:' + oo.textColor + ';font-family:' + oo.fontFamily
            + ';font-weight:' + oo.fontWeight + ';font-size:' + oo.fontSize + ';width:' + oo.width + 'px;line-height:' + oo.height + 'px;height:' + oo.height
            + 'px;overflow:hidden;text-align:center;z-index:' + (oo.z + 1);

        this.o.container.appendChild(this.c);
    }
    this.c.appendChild(this.t);

    var CR = function (o, num) {
        this.o = o;
        this.R = function (r) {
            a.r = pi(r);
            if (this.o.bSvg) {
                this.o.ea(this.e, { 'r': a.r });
            } else {
                this.e.style.top = (a.cx - a.r) + 'px';
                this.e.style.left = (a.cy - a.r) + 'px';
                this.e.style.width = a.r * 2 + 'px';
                this.e.style.height = a.r * 2 + 'px';
            }
        };
        this.O = function (opacity) {
            a.opacity = opacity;
            if (this.o.bSvg) {
                this.o.ea(this.e, { 'opacity': opacity });
            } else {
                var nO = pi(opacity * 100), t = "DXImageTransform.Microsoft.";
                var oA = this.e.filters[t + 'alpha'] || this.e.filters.alpha;
                if (oA) oA.opacity = nO;
                else this.e.style.filter += "progid:" + t + "Alpha(opacity=" + nO + ")";
            }
        };
        var _A = n * 6.283 / o.o.segments,
            s = this.o.bSvg ? 1 : -1,
            a = {
                n: num,
                color: o.o.color,
                stroke: o.o.stroke,
                x: o.o.width / 2 + Math.sin(_A) * o.r(),
                y: o.o.height / 2 + s * Math.cos(_A) * o.r(),
                r: o.o.maxR
            };
        if (o.bSvg) {
            var e = this.e = o.ceSvg('circle');
            this.o.ea(e, {
                'cx': pi(a.x),
                'cy': pi(a.y),
                'fill': a.color,
                'stroke': a.stroke,
                'r': a.r
            });
            this.o.ea(e, { 'rel': a.n });
            o.c.appendChild(e);
        } else {
            this.e = o.oval(a.x, a.y, a.r, a.color, a.stroke);
            this.o.ea(this.e, { 'rel': a.n });
        }
    };

    this._D = [];
    for (var n = 0; n < oo.segments; n++)
        this._D.push(new CR(this, n));

    if (!this.bSvg) this.c.appendChild(this.f);

    (function _tckr(b) {
        if (!this._stop) {
            for (var i = 0; i < b._D.length; i++) {
                var sp = b._D[i];
                sp.R(b._r(i));
                sp.O(b._o(i));
            }
            b.tid = setTimeout(function () { _tckr(b) }, b.o.timeout);
            b.tick++;
        }
    })(this);

    this.text = function (str) {
        if (this.bSvg) this.tData.nodeValue = str;
        else this.t.innerHTML = str;
    };
    this.stop = function () {
        this._stop = true;
        clearTimeout(this.tid);
        this._D = [];
        this.o.container.removeChild(this.c);
        if (this.SH) this.d.body.removeChild(this.SH);
        this.c = null;
    };
    return this;
};

$.fn.extend({
    loader: null,
    startLoading: function (options) {
        options['container'] = $(this).get(0);
        $(this).loader = CuteLoading(options);
    },
    stopLoading: function () {
        if ($(this).loader) $(this).loader.stop();
    }
});
