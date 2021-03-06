! function(t, e) {
  "object" == typeof exports && "undefined" != typeof module ? e(exports, require("chart.js")) : "function" == typeof define && define.amd ? define(["exports", "chart.js"], e) : e((t = t || self).ChartBoxPlot = {}, t.Chart)
}(this, function(t, e) {
  "use strict";

  function r(t, e, r) {
    return e in t ? Object.defineProperty(t, e, {
      value: r,
      enumerable: !0,
      configurable: !0,
      writable: !0
    }) : t[e] = r, t
  }

  function i(t, e) {
    var r = Object.keys(t);
    if (Object.getOwnPropertySymbols) {
      var i = Object.getOwnPropertySymbols(t);
      e && (i = i.filter(function(e) {
        return Object.getOwnPropertyDescriptor(t, e).enumerable
      })), r.push.apply(r, i)
    }
    return r
  }

  function n(t) {
    for (var e = 1; e < arguments.length; e++) {
      var n = null != arguments[e] ? arguments[e] : {};
      e % 2 ? i(Object(n), !0).forEach(function(e) {
        r(t, e, n[e])
      }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(n)) : i(Object(n)).forEach(function(e) {
        Object.defineProperty(t, e, Object.getOwnPropertyDescriptor(n, e))
      })
    }
    return t
  }

  function o(t, e) {
    return function(t) {
      if (Array.isArray(t)) return t
    }(t) || function(t, e) {
      if ("undefined" == typeof Symbol || !(Symbol.iterator in Object(t))) return;
      var r = [],
        i = !0,
        n = !1,
        o = void 0;
      try {
        for (var a, l = t[Symbol.iterator](); !(i = (a = l.next()).done) && (r.push(a.value), !e || r.length !== e); i = !0);
      } catch (t) {
        n = !0, o = t
      } finally {
        try {
          i || null == l.return || l.return()
        } finally {
          if (n) throw o
        }
      }
      return r
    }(t, e) || function(t, e) {
      if (!t) return;
      if ("string" == typeof t) return a(t, e);
      var r = Object.prototype.toString.call(t).slice(8, -1);
      "Object" === r && t.constructor && (r = t.constructor.name);
      if ("Map" === r || "Set" === r) return Array.from(r);
      if ("Arguments" === r || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return a(t, e)
    }(t, e) || function() {
      throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
    }()
  }

  function a(t, e) {
    (null == e || e > t.length) && (e = t.length);
    for (var r = 0, i = new Array(e); r < e; r++) i[r] = t[r];
    return i
  }

  function l(t) {
    return 1 / Math.sqrt(2 * Math.PI) * Math.exp(-.5 * t * t)
  }

  function s(t, e) {
    return t - e
  }

  function u(t) {
    var e = function(t, e) {
      var r = (t = t.slice().sort(s)).length - 1;
      return e.map(function(e) {
        if (0 === e) return t[0];
        if (1 === e) return t[r];
        var i = 1 + e * r,
          n = Math.floor(i),
          o = i - n,
          a = t[n - 1];
        return 0 === o ? a : a + o * (t[n] - a)
      })
    }(t, [.25, .75]);
    return e[1] - e[0]
  }

  function c(t) {
    var e = u(t) / 1.34;
    return 1.06 * Math.min(Math.sqrt(function(t) {
      var e = t.length;
      if (e < 1) return NaN;
      if (1 === e) return 0;
      for (var r = function(t) {
          var e = t.length;
          if (0 === e) return NaN;
          for (var r = 0, i = -1; ++i < e;) r += (t[i] - r) / (i + 1);
          return r
        }(t), i = -1, n = 0; ++i < e;) {
        var o = t[i] - r;
        n += o * o
      }
      return n / (e - 1)
    }(t)), e) * Math.pow(t.length, -.2)
  }

  function h(t, e) {
    var r = t.length - 1,
      i = function(i) {
        var n = i * r,
          o = Math.floor(n),
          a = n - o,
          l = t[o];
        return 0 === a ? l : e(l, t[Math.min(o + 1, r)], a)
      };
    return {
      min: t[0],
      q1: i(.25),
      median: i(.5),
      q3: i(.75),
      max: t[r]
    }
  }

  function f(t) {
    return h(t, function(t, e, r) {
      return t + r * (e - t)
    })
  }

  function m(t) {
    return h(t, function(t, e, r) {
      return t + (e - t) * r
    })
  }

  function d(t) {
    return h(t, function(t) {
      return t
    })
  }

  function v(t) {
    return h(t, function(t, e) {
      return e
    })
  }

  function p(t) {
    return h(t, function(t, e, r) {
      return r < .5 ? t : e
    })
  }

  function g(t) {
    return h(t, function(t, e) {
      return .5 * (t + e)
    })
  }

  function b(t) {
    var e = t.length,
      r = Math.floor((e + 3) / 2) / 2,
      i = function(e) {
        return .5 * (t[Math.floor(e) - 1] + t[Math.ceil(e) - 1])
      };
    return {
      min: t[0],
      q1: i(r),
      median: i((e + 1) / 2),
      q3: i(e + 1 - r),
      max: t[e - 1]
    }
  }

  function x(t, e) {
    var r = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 1.5,
      i = t.q3 - t.q1,
      n = "number" == typeof r && r > 0,
      o = n ? Math.max(t.min, t.q1 - r * i) : t.min,
      a = n ? Math.min(t.max, t.q3 + r * i) : t.max;
    if (Array.isArray(e)) {
      for (var l = 0; l < e.length; l++) {
        var s = e[l];
        if (s >= o) {
          o = s;
          break
        }
      }
      for (var u = e.length - 1; u >= 0; u--) {
        var c = e[u];
        if (c <= a) {
          a = c;
          break
        }
      }
    }
    return {
      whiskerMin: o,
      whiskerMax: a
    }
  }
  var y = {
    coef: 1.5,
    quantiles: 7
  };

  function _(t) {
    return {
      coef: null == t || "number" != typeof t.coef ? y.coef : t.coef,
      quantiles: function(t) {
        return "function" == typeof t ? t : {
          hinges: b,
          fivenum: b,
          7: f,
          quantiles: f,
          linear: m,
          lower: d,
          higher: v,
          nearest: p,
          midpoint: g
        } [t] || f
      }(null == t ? null : t.quantiles)
    }
  }

  function w(t, e) {
    if (0 === t.length) return {};
    (t = t.filter(function(t) {
      return "number" == typeof t && !isNaN(t)
    })).sort(function(t, e) {
      return t - e
    });
    var r = (0, _(e).quantiles)(t);
    return r.kde = function() {
      var t = l,
        e = [],
        r = c;

      function i(i, n) {
        var o = r.call(this, e);
        return i.map(function(r) {
          for (var i = -1, n = 0, a = e.length; ++i < a;) n += t((r - e[i]) / o);
          return [r, n / o / a]
        })
      }
      return i.kernel = function(e) {
        return arguments.length ? (t = e, i) : t
      }, i.sample = function(t) {
        return arguments.length ? (e = t, i) : e
      }, i.bandwidth = function(t) {
        return arguments.length ? (r = "function" == typeof(e = t) ? e : function() {
          return e
        }, i) : r;
        var e
      }, i
    }().sample(t), r
  }

  function k(t, e) {
    if (!t) return null;
    if ("number" == typeof t.median && "number" == typeof t.q1 && "number" == typeof t.q3) {
      if (void 0 === t.whiskerMin) {
        var r = _(e).coef,
          i = x(t, Array.isArray(t.items) ? t.items.slice().sort(function(t, e) {
            return t - e
          }) : null, r),
          n = i.whiskerMin,
          o = i.whiskerMax;
        t.whiskerMin = n, t.whiskerMax = o
      }
      return t
    }
    return Array.isArray(t) ? (void 0 === t.__stats && (t.__stats = function(t, e) {
      if (0 === t.length) return {
        min: NaN,
        max: NaN,
        median: NaN,
        q1: NaN,
        q3: NaN,
        whiskerMin: NaN,
        whiskerMax: NaN,
        outliers: []
      };
      (t = t.filter(function(t) {
        return "number" == typeof t && !isNaN(t)
      })).sort(function(t, e) {
        return t - e
      });
      var r = _(e),
        i = r.quantiles,
        n = r.coef,
        o = i(t),
        a = x(o, t, n),
        l = a.whiskerMin,
        s = a.whiskerMax;
      return o.outliers = t.filter(function(t) {
        return t < l || t > s
      }), o.whiskerMin = l, o.whiskerMax = s, o
    }(t, e)), t.__stats) : void 0
  }

  function q(t, e) {
    return t ? "number" != typeof t.median || "function" != typeof t.kde && !Array.isArray(t.coords) ? Array.isArray(t) ? (void 0 === t.__kde && (t.__kde = w(t, e)), t.__kde) : void 0 : t : null
  }

  function M(t, e) {
    if (!t) return t;
    if ("number" == typeof t || "string" == typeof t) return Number(t);
    var r = k(t, e);
    return r ? r.median : t
  }
  var P = {
    ticks: n({
      minStats: "min",
      maxStats: "max"
    }, y)
  };

  function S(t) {
    var e = this,
      r = this.chart,
      i = this.isHorizontal(),
      n = this.options.ticks,
      o = n.minStats,
      a = n.maxStats;
    this.min = null, this.max = null, r.data.datasets.forEach(function(n, l) {
      var s = r.getDatasetMeta(l);
      r.isDatasetVisible(l) && function(t) {
        return i ? t.xAxisID === e.id : t.yAxisID === e.id
      }(s) && n.data.forEach(function(r, i) {
        if (null != r && !s.data[i].hidden) {
          var n, l, u = function(t, e, r, i) {
            return "number" == typeof t[e] && "number" == typeof t[r] ? t : Array.isArray(t) && 0 !== t.length ? k(t, i) : void 0
          }(r, o, a, e.options.ticks);
          if (u) n = u[o], l = u[a];
          else {
            var c = +e.getRightValue(r);
            if (isNaN(c)) return;
            n = l = c
          }(null === e.min || n < e.min) && (e.min = n), (null === e.max || l > e.max) && (e.max = l), t && t(u)
        }
      })
    })
  }
  var N = n({}, e.defaults.global.elements.rectangle, {
      borderWidth: 1,
      outlierRadius: 2,
      outlierColor: e.defaults.global.elements.rectangle.backgroundColor,
      lowerColor: e.defaults.global.elements.rectangle.lowerColor,
      medianColor: null,
      itemRadius: 0,
      itemStyle: "circle",
      itemBackgroundColor: e.defaults.global.elements.rectangle.backgroundColor,
      itemBorderColor: e.defaults.global.elements.rectangle.borderColor,
      hitPadding: 2,
      outlierHitRadius: 4,
      tooltipDecimals: 2
    }),
    V = e.Element.extend({
      isVertical: function() {
        return void 0 !== this._view.width
      },
      draw: function() {},
      _drawItems: function(t, r, i, n) {
        if (!(t.itemRadius <= 0 || !r.items || r.items.length <= 0)) {
          i.save(), i.strokeStle = t.itemBorderColor, i.fillStyle = t.itemBackgroundColor;
          var o, a = (void 0 === (o = 1e3 * this._datasetIndex + this._index) && (o = Date.now()), function() {
            return (o = (9301 * o + 49297) % 233280) / 233280
          });
          n ? r.items.forEach(function(r) {
            e.canvasHelpers.drawPoint(i, t.itemStyle, t.itemRadius, t.x - t.width / 2 + a() * t.width, r)
          }) : r.items.forEach(function(r) {
            e.canvasHelpers.drawPoint(i, t.itemStyle, t.itemRadius, r, t.y - t.height / 2 + a() * t.height)
          }), i.restore()
        }
      },
      _drawOutliers: function(t, e, r, i) {
        t.outlierRadius <= 0 || !e.outliers || 0 === e.outliers.length || (r.fillStyle = t.outlierColor, r.beginPath(), i ? e.outliers.forEach(function(e) {
          r.arc(t.x, e, t.outlierRadius, 0, 2 * Math.PI)
        }) : e.outliers.forEach(function(e) {
          r.arc(e, t.y, t.outlierRadius, 0, 2 * Math.PI)
        }), r.fill(), r.closePath())
      },
      _getBounds: function() {
        return {
          left: 0,
          top: 0,
          right: 0,
          bottom: 0
        }
      },
      _getHitBounds: function() {
        var t = this._view.hitPadding,
          e = this._getBounds();
        return {
          left: e.left - t,
          top: e.top - t,
          right: e.right + t,
          bottom: e.bottom + t
        }
      },
      height: function() {
        return 0
      },
      inRange: function(t, e) {
        return !!this._view && (this._boxInRange(t, e) || this._outlierIndexInRange(t, e) >= 0)
      },
      inLabelRange: function(t, e) {
        if (!this._view) return !1;
        var r = this._getHitBounds();
        return this.isVertical() ? t >= r.left && t <= r.right : e >= r.top && e <= r.bottom
      },
      inXRange: function(t) {
        var e = this._getHitBounds();
        return t >= e.left && t <= e.right
      },
      inYRange: function(t) {
        var e = this._getHitBounds();
        return t >= e.top && t <= e.bottom
      },
      _outlierIndexInRange: function(t, e) {
        var r = this._view,
          i = r.outlierHitRadius,
          n = this._getOutliers(),
          o = this.isVertical();
        if (o && Math.abs(t - r.x) > i || !o && Math.abs(e - r.y) > i) return -1;
        for (var a = o ? e : t, l = 0; l < n.length; l++)
          if (Math.abs(n[l] - a) <= i) return l;
        return -1
      },
      _boxInRange: function(t, e) {
        var r = this._getHitBounds();
        return t >= r.left && t <= r.right && e >= r.top && e <= r.bottom
      },
      getCenterPoint: function() {
        var t = this._view;
        return {
          x: t.x,
          y: t.y
        }
      },
      getArea: function() {
        return 0
      },
      _getOutliers: function() {
        return []
      },
      tooltipPosition: function(t, e) {
        if (!t) return this.getCenterPoint();
        delete e._tooltipOutlier;
        var r = this._view,
          i = this._outlierIndexInRange(t.x, t.y);
        return i < 0 ? this.getCenterPoint() : (e._tooltipOutlier = i, this.isVertical() ? {
          x: r.x,
          y: this._getOutliers()[i]
        } : {
          x: this._getOutliers()[i],
          y: r.y
        })
      }
    });
  e.defaults.global.elements.boxandwhiskers = n({}, N);
  var O = e.elements.BoxAndWhiskers = V.extend({
    transition: function(t) {
      var r = e.Element.prototype.transition.call(this, t),
        i = this._model,
        n = this._start,
        o = this._view;
      return i && 1 !== t ? null == n.boxplot ? r : (i.boxplot === o.boxplot && (o.boxplot = e.helpers.clone(o.boxplot)), function(t, e, r, i) {
        for (var n = 0, o = Object.keys(r); n < o.length; n++) {
          var a = o[n],
            l = r[a],
            s = t[a];
          if (s !== l)
            if ("number" != typeof l) {
              if (Array.isArray(l))
                for (var u = e[a], c = Math.min(l.length, s.length), h = 0; h < c; ++h) u[h] = s[h] + (l[h] - s[h]) * i
            } else e[a] = s + (l - s) * i
        }
      }(n.boxplot, o.boxplot, i.boxplot, t), r) : r
    },
    draw: function() {
      var t = this._chart.ctx,
        e = this._view,
        r = e.boxplot,
        i = this.isVertical();
      t.save(), t.fillStyle = e.backgroundColor, t.strokeStyle = e.borderColor, t.lineWidth = e.borderWidth, this._drawBoxPlot(e, r, t, i), this._drawOutliers(e, r, t, i), t.restore(), this._drawItems(e, r, t, i)
    },
    _drawBoxPlot: function(t, e, r, i) {
      i ? this._drawBoxPlotVert(t, e, r) : this._drawBoxPlotHoriz(t, e, r)
    },
    _drawBoxPlotVert: function(t, e, r) {
      var i = t.x,
        n = t.width,
        o = i - n / 2;
      e.q3 > e.q1 ? r.fillRect(o, e.q1, n, e.q3 - e.q1) : r.fillRect(o, e.q3, n, e.q1 - e.q3), r.save(), t.medianColor && (r.strokeStyle = t.medianColor), r.beginPath(), r.moveTo(o, e.median), r.lineTo(o + n, e.median), t.lowerColor && (r.fillStyle = t.lowerColor, e.q3 > e.q1 ? r.fillRect(o, e.median, n, e.q3 - e.median) : r.fillRect(o, e.median, n, e.q1 - e.median)), r.closePath(), r.stroke(), r.restore(), e.q3 > e.q1 ? r.strokeRect(o, e.q1, n, e.q3 - e.q1) : r.strokeRect(o, e.q3, n, e.q1 - e.q3), r.beginPath(), r.moveTo(o, e.whiskerMin), r.lineTo(o + n, e.whiskerMin), r.moveTo(i, e.whiskerMin), r.lineTo(i, e.q1), r.moveTo(o, e.whiskerMax), r.lineTo(o + n, e.whiskerMax), r.moveTo(i, e.whiskerMax), r.lineTo(i, e.q3), r.closePath(), r.stroke()
    },
    _drawBoxPlotHoriz: function(t, e, r) {
      var i = t.y,
        n = t.height,
        o = i - n / 2;
      e.q3 > e.q1 ? r.fillRect(e.q1, o, e.q3 - e.q1, n) : r.fillRect(e.q3, o, e.q1 - e.q3, n), r.save(), t.medianColor && (r.strokeStyle = t.medianColor), r.beginPath(), r.moveTo(e.median, o), r.lineTo(e.median, o + n), r.closePath(), r.stroke(), r.restore(), e.q3 > e.q1 ? r.strokeRect(e.q1, o, e.q3 - e.q1, n) : r.strokeRect(e.q3, o, e.q1 - e.q3, n), r.beginPath(), r.moveTo(e.whiskerMin, o), r.lineTo(e.whiskerMin, o + n), r.moveTo(e.whiskerMin, i), r.lineTo(e.q1, i), r.moveTo(e.whiskerMax, o), r.lineTo(e.whiskerMax, o + n), r.moveTo(e.whiskerMax, i), r.lineTo(e.q3, i), r.closePath(), r.stroke()
    },
    _getBounds: function() {
      var t = this._view,
        e = this.isVertical(),
        r = t.boxplot;
      if (!r) return {
        left: 0,
        top: 0,
        right: 0,
        bottom: 0
      };
      if (e) {
        var i = t.x,
          n = t.width,
          o = i - n / 2;
        return {
          left: o,
          top: r.whiskerMax,
          right: o + n,
          bottom: r.whiskerMin
        }
      }
      var a = t.y,
        l = t.height,
        s = a - l / 2;
      return {
        left: r.whiskerMin,
        top: s,
        right: r.whiskerMax,
        bottom: s + l
      }
    },
    height: function() {
      var t = this._view;
      return t.base - Math.min(t.boxplot.q1, t.boxplot.q3)
    },
    getArea: function() {
      var t = this._view,
        e = Math.abs(t.boxplot.q3 - t.boxplot.q1);
      return this.isVertical() ? e * t.width : e * t.height
    },
    _getOutliers: function() {
      return this._view.boxplot && this._view.boxplot.outliers || []
    }
  });
  e.defaults.global.elements.violin = n({
    points: 100
  }, N);
  var T = e.elements.Violin = V.extend({
      transition: function(t) {
        var r = e.Element.prototype.transition.call(this, t),
          i = this._model,
          n = this._start,
          o = this._view;
        return i && 1 !== t ? null == n.violin ? r : (i.violin === o.violin && (o.violin = e.helpers.clone(o.violin)), function(t, e, r, i) {
          for (var n = 0, o = Object.keys(r); n < o.length; n++) {
            var a = o[n],
              l = r[a],
              s = t[a];
            if (s !== l)
              if ("number" != typeof l) {
                if ("coords" === a)
                  for (var u = e[a], c = Math.min(l.length, s.length), h = 0; h < c; ++h) u[h].v = s[h].v + (l[h].v - s[h].v) * i, u[h].estimate = s[h].estimate + (l[h].estimate - s[h].estimate) * i
              } else e[a] = s + (l - s) * i
          }
        }(n.violin, o.violin, i.violin, t), r) : r
      },
      draw: function() {
        var t = this._chart.ctx,
          r = this._view,
          i = r.violin,
          n = this.isVertical();
        t.save(), t.fillStyle = r.backgroundColor, t.strokeStyle = r.borderColor, t.lineWidth = r.borderWidth;
        var o = i.coords;
        if (e.canvasHelpers.drawPoint(t, "rectRot", 5, r.x, r.y), t.stroke(), t.beginPath(), n) {
          var a = r.x,
            l = r.width / 2 / i.maxEstimate;
          t.moveTo(a, i.min), o.forEach(function(e) {
            var r = e.v,
              i = e.estimate;
            t.lineTo(a - i * l, r)
          }), t.lineTo(a, i.max), t.moveTo(a, i.min), o.forEach(function(e) {
            var r = e.v,
              i = e.estimate;
            t.lineTo(a + i * l, r)
          }), t.lineTo(a, i.max)
        } else {
          var s = r.y,
            u = r.height / 2 / i.maxEstimate;
          t.moveTo(i.min, s), o.forEach(function(e) {
            var r = e.v,
              i = e.estimate;
            t.lineTo(r, s - i * u)
          }), t.lineTo(i.max, s), t.moveTo(i.min, s), o.forEach(function(e) {
            var r = e.v,
              i = e.estimate;
            t.lineTo(r, s + i * u)
          }), t.lineTo(i.max, s)
        }
        t.stroke(), t.fill(), t.closePath(), this._drawOutliers(r, i, t, n), t.restore(), this._drawItems(r, i, t, n)
      },
      _getBounds: function() {
        var t = this._view,
          e = this.isVertical(),
          r = t.violin;
        if (e) {
          var i = t.x,
            n = t.width,
            o = i - n / 2;
          return {
            left: o,
            top: r.max,
            right: o + n,
            bottom: r.min
          }
        }
        var a = t.y,
          l = t.height,
          s = a - l / 2;
        return {
          left: r.min,
          top: s,
          right: r.max,
          bottom: s + l
        }
      },
      height: function() {
        var t = this._view;
        return t.base - Math.min(t.violin.min, t.violin.max)
      },
      getArea: function() {
        var t = this._view,
          e = Math.abs(t.violin.max - t.violin.min);
        return this.isVertical() ? e * t.width : e * t.height
      },
      _getOutliers: function() {
        return this._view.violin.outliers || []
      }
    }),
    A = {
      scales: {
        yAxes: [{
          type: "arrayLinear"
        }]
      }
    },
    B = {
      scales: {
        xAxes: [{
          type: "arrayLinear"
        }]
      }
    };

  function I(t) {
    var e = this._chart.config.options.tooltipDecimals;
    return null == e || "number" != typeof e || e < 0 ? t : Number.parseFloat(t).toFixed(e)
  }
  var C = ["outlierRadius", "itemRadius", "itemStyle", "itemBackgroundColor", "itemBorderColor", "outlierColor", "medianColor", "hitPadding", "outlierHitRadius", "lowerColor"],
    R = [!1, !1, !1, !0, !0, !0, !0, !1, !1, !0],
    E = {
      _elementOptions: function() {
        return {}
      },
      updateElement: function(t, r, i) {
        var n = this.getDataset(),
          o = t.custom || {},
          a = this._elementOptions();
        e.controllers.bar.prototype.updateElement.call(this, t, r, i);
        var l = e.helpers.options.resolve,
          s = {
            chart: this.chart,
            dataIndex: r,
            dataset: n,
            datasetIndex: this.index
          };
        C.forEach(function(e) {
          t._model[e] = l([o[e], n[e], a[e]], s, r)
        })
      },
      _calculateCommonModel: function(t, e, r, i) {
        r.outliers && (t.outliers = r.outliers.map(function(t) {
          return i.getPixelForValue(Number(t))
        })), Array.isArray(e) ? t.items = e.map(function(t) {
          return i.getPixelForValue(Number(t))
        }) : r.items && (t.items = r.items.map(function(t) {
          return i.getPixelForValue(Number(t))
        }))
      },
      setHoverStyle: function(t) {
        e.controllers.bar.prototype.setHoverStyle.call(this, t);
        var r = this.chart.data.datasets[t._datasetIndex],
          i = t._index,
          n = t.custom || {},
          o = t._model,
          a = e.helpers.getHoverColor,
          l = e.helpers.options.resolve;
        C.forEach(function(e, s) {
          t.$previousStyle[e] = o[e];
          var u = "hover".concat(e.charAt(0).toUpperCase()).concat(e.slice(1)),
            c = R[s] && null != o[e] ? a(o[e]) : o[e];
          t._model[e] = l([n[u], r[u], c], void 0, i)
        })
      }
    };
  var j = {
    tooltips: {
      position: "boxplot",
      callbacks: {
        label: function(t, e) {
          for (var r = k(e.datasets[t.datasetIndex].data[t.index], this._chart.getDatasetMeta(t.datasetIndex).controller._getValueScale().options.ticks), i = null == this._tooltipOutlier ? -1 : this._tooltipOutlier, n = this._options.callbacks.boxplotLabel, o = arguments.length, a = new Array(o > 2 ? o - 2 : 0), l = 2; l < o; l++) a[l - 2] = arguments[l];
          return n.apply(this, [t, e, r, i].concat(a))
        },
        boxplotLabel: function(t, e, r, i) {
          //           if (e.dataset[t.datasetIndex].type == 'line') {
          //             return t.yLabel.toFixed(2);
          //           } else {
          var n = e.datasets[t.datasetIndex].label || "",
            o = "".concat(n, " ").concat("string" == typeof t.xLabel ? t.xLabel : t.yLabel);

          // if (!r) return "".concat(o, " (NaN)");
          if (!r) {
            if (e.datasets[t.datasetIndex].type == 'line') {
              return "Mediana: " + t.yLabel.toFixed(2);
            } else {
              return "".concat(o, " (NaN)");
            };
          };


          if (i >= 0) {
            var a = r.outliers[i];
            return "".concat(o, " (outlier: ").concat(I.call(this, a), ")")
          };
          return "".concat(o, " (Min: ").concat(I.call(this, r.min), " | Q1: ").concat(I.call(this, r.q1.toFixed(2)), " | Mediana: ").concat(I.call(this, r.median.toFixed(2)), " | Q3: ").concat(I.call(this, r.q3.toFixed(2)), " | Max: ").concat(I.call(this, r.max), ")");
          // };

        }
      }
    }
  };
  e.defaults.boxplot = e.helpers.merge({}, [e.defaults.bar, A, j]), e.defaults.horizontalBoxplot = e.helpers.merge({}, [e.defaults.horizontalBar, B, j]), e.defaults.global.datasets && e.defaults.global.datasets.bar && (e.defaults.global.datasets.boxplot = n({}, e.defaults.global.datasets.bar)), e.defaults.global.datasets && e.defaults.global.datasets.horizontalBar && (e.defaults.global.datasets.horizontalBoxplot = n({}, e.defaults.global.datasets.horizontalBar));
  var L = n({}, E, {
      dataElementType: e.elements.BoxAndWhiskers,
      _elementOptions: function() {
        return this.chart.options.elements.boxandwhiskers
      },
      _updateElementGeometry: function(t, r, i) {
        for (var n, o = arguments.length, a = new Array(o > 3 ? o - 3 : 0), l = 3; l < o; l++) a[l - 3] = arguments[l];
        (n = e.controllers.bar.prototype._updateElementGeometry).call.apply(n, [this, t, r, i].concat(a)), t._model.boxplot = this._calculateBoxPlotValuesPixels(this.index, r)
      },
      _calculateBoxPlotValuesPixels: function(t, e) {
        var r = this._getValueScale(),
          i = this.chart.data.datasets[t].data[e];
        if (!i) return null;
        var n = k(i, r.options.ticks),
          o = {};
        return Object.keys(n).forEach(function(t) {
          "outliers" !== t && "items" !== t && (o[t] = r.getPixelForValue(Number(n[t])))
        }), this._calculateCommonModel(o, i, n, r), o
      }
    }),
    D = e.controllers.boxplot = e.controllers.bar.extend(L),
    z = e.controllers.horizontalBoxplot = e.controllers.horizontalBar.extend(L);
  var H = {
    tooltips: {
      callbacks: {
        label: function(t, e) {
          for (var r = q(e.datasets[t.datasetIndex].data[t.index], this._chart.getDatasetMeta(t.datasetIndex).controller._getValueScale().options.ticks), i = this._options.callbacks.violinLabel, n = arguments.length, o = new Array(n > 2 ? n - 2 : 0), a = 2; a < n; a++) o[a - 2] = arguments[a];
          return i.apply(this, [t, e, r].concat(o))
        },
        violinLabel: function(t, e) {
          var r = e.datasets[t.datasetIndex].label || "",
            i = t.value,
            n = "".concat(r, " ").concat("string" == typeof t.xLabel ? t.xLabel : t.yLabel);
          return "".concat(n, " (").concat(I.call(this, i), ")")
        }
      }
    }
  };
  e.defaults.violin = e.helpers.merge({}, [e.defaults.bar, A, H]), e.defaults.horizontalViolin = e.helpers.merge({}, [e.defaults.horizontalBar, B, H]), e.defaults.global.datasets && e.defaults.global.datasets.bar && (e.defaults.global.datasets.violin = n({}, e.defaults.global.datasets.bar)), e.defaults.global.datasets && e.defaults.global.datasets.horizontalBar && (e.defaults.global.datasets.horizontalViolin = n({}, e.defaults.global.datasets.horizontalBar));
  var F = n({}, E, {
      dataElementType: e.elements.Violin,
      _elementOptions: function() {
        return this.chart.options.elements.violin
      },
      _updateElementGeometry: function(t, r, i) {
        for (var n, o = arguments.length, a = new Array(o > 3 ? o - 3 : 0), l = 3; l < o; l++) a[l - 3] = arguments[l];
        (n = e.controllers.bar.prototype._updateElementGeometry).call.apply(n, [this, t, r, i].concat(a));
        var s = t.custom || {},
          u = this._elementOptions();
        t._model.violin = this._calculateViolinValuesPixels(this.index, r, void 0 !== s.points ? s.points : u.points)
      },
      _calculateViolinValuesPixels: function(t, e, r) {
        var i = this._getValueScale(),
          n = this.chart.data.datasets[t].data[e],
          o = q(n, i.options.ticks);
        if (!Array.isArray(n) && "number" == typeof n && !Number.isNaN || null == o) return {
          min: n,
          max: n,
          median: n,
          coords: [{
            v: n,
            estimate: Number.NEGATIVE_INFINITY
          }],
          maxEstimate: Number.NEGATIVE_INFINITY
        };
        for (var a = [], l = (o.max - o.min) / r, s = o.min; s <= o.max && l > 0; s += l) a.push(s);
        a[a.length - 1] !== o.max && a.push(o.max);
        var u = o.coords || o.kde(a).map(function(t) {
            return {
              v: t[0],
              estimate: t[1]
            }
          }),
          c = {
            min: i.getPixelForValue(o.min),
            max: i.getPixelForValue(o.max),
            median: i.getPixelForValue(o.median),
            coords: u.map(function(t) {
              var e = t.v,
                r = t.estimate;
              return {
                v: i.getPixelForValue(e),
                estimate: r
              }
            }),
            maxEstimate: u.reduce(function(t, e) {
              return Math.max(t, e.estimate)
            }, Number.NEGATIVE_INFINITY)
          };
        return this._calculateCommonModel(c, n, o, i), c
      }
    }),
    W = (e.controllers.violin = e.controllers.bar.extend(F), e.controllers.horizontalViolin = e.controllers.horizontalBar.extend(F)),
    G = e.helpers.merge({}, [P, e.scaleService.getScaleDefaults("linear")]),
    Y = e.scaleService.getScaleConstructor("linear").extend({
      getRightValue: function(t) {
        return e.LinearScaleBase.prototype.getRightValue.call(this, M(t, this.options.ticks))
      },
      _parseValue: function(t) {
        return e.LinearScaleBase.prototype._parseValue.call(this, M(t, this.options.ticks))
      },
      determineDataLimits: function() {
        S.call(this), this.handleTickRangeOptions()
      }
    });
  e.scaleService.registerScaleType("arrayLinear", Y, G);
  var Z = e.helpers,
    U = Z.merge({}, [P, e.scaleService.getScaleDefaults("logarithmic")]),
    $ = e.scaleService.getScaleConstructor("logarithmic").extend({
      getRightValue: function(t) {
        return e.LinearScaleBase.prototype.getRightValue.call(this, M(t, this.options.ticks))
      },
      _parseValue: function(t) {
        return e.LinearScaleBase.prototype._parseValue.call(this, M(t, this.options.ticks))
      },
      determineDataLimits: function() {
        var t = this,
          e = this.options.ticks;
        this.minNotZero = null, S.call(this, function(r) {
          var i = r[e.minStats];
          0 !== i && (null === t.minNotZero || i < t.minNotZero) && (t.minNotZero = i)
        }), this.min = Z.valueOrDefault(e.min, this.min - .05 * this.min), this.max = Z.valueOrDefault(e.max, this.max + .05 * this.max), this.min === this.max && (0 !== this.min && null !== this.min ? (this.min = Math.pow(10, Math.floor(Z.log10(this.min)) - 1), this.max = Math.pow(10, Math.floor(Z.log10(this.max)) + 1)) : (this.min = 1, this.max = 10))
      }
    });
  e.scaleService.registerScaleType("arrayLogarithmic", $, U), e.Tooltip.positioners.boxplot = function(t, e) {
    var r = this;
    if (!t.length) return !1;
    var i = o(t.reduce(function(t, i) {
        var n = o(t, 3),
          a = n[0],
          l = n[1],
          s = n[2];
        if (i && i.hasValue()) {
          var u = i.tooltipPosition(e, r);
          return [a + u.x, l + u.y, s + 1]
        }
        return [a, l, s]
      }, [0, 0, 0]), 3),
      n = i[0],
      a = i[1],
      l = i[2];
    return {
      x: n / l,
      y: a / l
    }
  }, t.ArrayLinearScale = Y, t.ArrayLogarithmicScale = $, t.BoxAndWhiskers = O, t.BoxPlot = D, t.HorizontalBoxPlot = z, t.HorizontalViolin = W, t.Violin = T, Object.defineProperty(t, "__esModule", {
    value: !0
  })
});
