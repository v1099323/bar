/*! For license information please see app.min.js.LICENSE.txt */
(() => {
  var t = {
      2: function (t, e, n) {
        var o, a;
        window.Element &&
          !Element.prototype.closest &&
          (Element.prototype.closest = function (t) {
            var e,
              n = (this.document || this.ownerDocument).querySelectorAll(t),
              o = this;
            do {
              for (e = n.length; 0 <= --e && n.item(e) !== o; );
            } while (e < 0 && (o = o.parentElement));
            return o;
          }),
          (function () {
            function t(t, e) {
              e = e || { bubbles: !1, cancelable: !1, detail: void 0 };
              var n = document.createEvent("CustomEvent");
              return n.initCustomEvent(t, e.bubbles, e.cancelable, e.detail), n;
            }
            "function" != typeof window.CustomEvent &&
              ((t.prototype = window.Event.prototype),
              (window.CustomEvent = t));
          })(),
          (function () {
            for (
              var t = 0, e = ["ms", "moz", "webkit", "o"], n = 0;
              n < e.length && !window.requestAnimationFrame;
              ++n
            )
              (window.requestAnimationFrame =
                window[e[n] + "RequestAnimationFrame"]),
                (window.cancelAnimationFrame =
                  window[e[n] + "CancelAnimationFrame"] ||
                  window[e[n] + "CancelRequestAnimationFrame"]);
            window.requestAnimationFrame ||
              (window.requestAnimationFrame = function (e, n) {
                var o = new Date().getTime(),
                  a = Math.max(0, 16 - (o - t)),
                  r = window.setTimeout(function () {
                    e(o + a);
                  }, a);
                return (t = o + a), r;
              }),
              window.cancelAnimationFrame ||
                (window.cancelAnimationFrame = function (t) {
                  clearTimeout(t);
                });
          })(),
          (a =
            void 0 !== n.g
              ? n.g
              : "undefined" != typeof window
              ? window
              : this),
          (o = function () {
            return (function (t) {
              "use strict";
              var e = {
                  ignore: "[data-scroll-ignore]",
                  header: null,
                  topOnEmptyHash: !0,
                  speed: 500,
                  speedAsDuration: !1,
                  durationMax: null,
                  durationMin: null,
                  clip: !0,
                  offset: 0,
                  easing: "easeInOutCubic",
                  customEasing: null,
                  updateURL: !0,
                  popstate: !0,
                  emitEvents: !0,
                },
                n = function () {
                  var t = {};
                  return (
                    Array.prototype.forEach.call(arguments, function (e) {
                      for (var n in e) {
                        if (!e.hasOwnProperty(n)) return;
                        t[n] = e[n];
                      }
                    }),
                    t
                  );
                },
                o = function (t) {
                  "#" === t.charAt(0) && (t = t.substr(1));
                  for (
                    var e,
                      n = String(t),
                      o = n.length,
                      a = -1,
                      r = "",
                      i = n.charCodeAt(0);
                    ++a < o;

                  ) {
                    if (0 === (e = n.charCodeAt(a)))
                      throw new InvalidCharacterError(
                        "Invalid character: the input contains U+0000."
                      );
                    r +=
                      (1 <= e && e <= 31) ||
                      127 == e ||
                      (0 === a && 48 <= e && e <= 57) ||
                      (1 === a && 48 <= e && e <= 57 && 45 === i)
                        ? "\\" + e.toString(16) + " "
                        : 128 <= e ||
                          45 === e ||
                          95 === e ||
                          (48 <= e && e <= 57) ||
                          (65 <= e && e <= 90) ||
                          (97 <= e && e <= 122)
                        ? n.charAt(a)
                        : "\\" + n.charAt(a);
                  }
                  return "#" + r;
                },
                a = function () {
                  return Math.max(
                    document.body.scrollHeight,
                    document.documentElement.scrollHeight,
                    document.body.offsetHeight,
                    document.documentElement.offsetHeight,
                    document.body.clientHeight,
                    document.documentElement.clientHeight
                  );
                },
                r = function (e) {
                  return e
                    ? ((n = e),
                      parseInt(t.getComputedStyle(n).height, 10) + e.offsetTop)
                    : 0;
                  var n;
                },
                i = function (e, n, o) {
                  0 === e && document.body.focus(),
                    o ||
                      (e.focus(),
                      document.activeElement !== e &&
                        (e.setAttribute("tabindex", "-1"),
                        e.focus(),
                        (e.style.outline = "none")),
                      t.scrollTo(0, n));
                },
                c = function (e, n, o, a) {
                  if (n.emitEvents && "function" == typeof t.CustomEvent) {
                    var r = new CustomEvent(e, {
                      bubbles: !0,
                      detail: { anchor: o, toggle: a },
                    });
                    document.dispatchEvent(r);
                  }
                };
              return function (s, l) {
                var u,
                  d,
                  f,
                  h,
                  m = {
                    cancelScroll: function (t) {
                      cancelAnimationFrame(h),
                        (h = null),
                        t || c("scrollCancel", u);
                    },
                    animateScroll: function (o, s, l) {
                      m.cancelScroll();
                      var d = n(u || e, l || {}),
                        g =
                          "[object Number]" ===
                          Object.prototype.toString.call(o),
                        p = g || !o.tagName ? null : o;
                      if (g || p) {
                        var v = t.pageYOffset;
                        d.header &&
                          !f &&
                          (f = document.querySelector(d.header));
                        var w,
                          b,
                          _,
                          y,
                          E,
                          L,
                          A,
                          S,
                          I = r(f),
                          C = g
                            ? o
                            : (function (e, n, o, r) {
                                var i = 0;
                                if (e.offsetParent)
                                  for (
                                    ;
                                    (i += e.offsetTop), (e = e.offsetParent);

                                  );
                                return (
                                  (i = Math.max(i - n - o, 0)),
                                  r && (i = Math.min(i, a() - t.innerHeight)),
                                  i
                                );
                              })(
                                p,
                                I,
                                parseInt(
                                  "function" == typeof d.offset
                                    ? d.offset(o, s)
                                    : d.offset,
                                  10
                                ),
                                d.clip
                              ),
                          O = C - v,
                          k = a(),
                          x = 0,
                          q =
                            ((w = O),
                            (_ = (b = d).speedAsDuration
                              ? b.speed
                              : Math.abs((w / 1e3) * b.speed)),
                            b.durationMax && _ > b.durationMax
                              ? b.durationMax
                              : b.durationMin && _ < b.durationMin
                              ? b.durationMin
                              : parseInt(_, 10)),
                          M = function (e) {
                            var n, a, r;
                            y || (y = e),
                              (x += e - y),
                              (L =
                                v +
                                O *
                                  ((a = E =
                                    1 < (E = 0 === q ? 0 : x / q) ? 1 : E),
                                  "easeInQuad" === (n = d).easing &&
                                    (r = a * a),
                                  "easeOutQuad" === n.easing &&
                                    (r = a * (2 - a)),
                                  "easeInOutQuad" === n.easing &&
                                    (r =
                                      a < 0.5
                                        ? 2 * a * a
                                        : (4 - 2 * a) * a - 1),
                                  "easeInCubic" === n.easing && (r = a * a * a),
                                  "easeOutCubic" === n.easing &&
                                    (r = --a * a * a + 1),
                                  "easeInOutCubic" === n.easing &&
                                    (r =
                                      a < 0.5
                                        ? 4 * a * a * a
                                        : (a - 1) * (2 * a - 2) * (2 * a - 2) +
                                          1),
                                  "easeInQuart" === n.easing &&
                                    (r = a * a * a * a),
                                  "easeOutQuart" === n.easing &&
                                    (r = 1 - --a * a * a * a),
                                  "easeInOutQuart" === n.easing &&
                                    (r =
                                      a < 0.5
                                        ? 8 * a * a * a * a
                                        : 1 - 8 * --a * a * a * a),
                                  "easeInQuint" === n.easing &&
                                    (r = a * a * a * a * a),
                                  "easeOutQuint" === n.easing &&
                                    (r = 1 + --a * a * a * a * a),
                                  "easeInOutQuint" === n.easing &&
                                    (r =
                                      a < 0.5
                                        ? 16 * a * a * a * a * a
                                        : 1 + 16 * --a * a * a * a * a),
                                  n.customEasing && (r = n.customEasing(a)),
                                  r || a)),
                              t.scrollTo(0, Math.floor(L)),
                              (function (e, n) {
                                var a = t.pageYOffset;
                                if (
                                  e == n ||
                                  a == n ||
                                  (v < n && t.innerHeight + a) >= k
                                )
                                  return (
                                    m.cancelScroll(!0),
                                    i(o, n, g),
                                    c("scrollStop", d, o, s),
                                    !(h = y = null)
                                  );
                              })(L, C) ||
                                ((h = t.requestAnimationFrame(M)), (y = e));
                          };
                        0 === t.pageYOffset && t.scrollTo(0, 0),
                          (A = o),
                          (S = d),
                          g ||
                            (history.pushState &&
                              S.updateURL &&
                              history.pushState(
                                {
                                  smoothScroll: JSON.stringify(S),
                                  anchor: A.id,
                                },
                                document.title,
                                A === document.documentElement
                                  ? "#top"
                                  : "#" + A.id
                              )),
                          "matchMedia" in t &&
                          t.matchMedia("(prefers-reduced-motion)").matches
                            ? i(o, Math.floor(C), !1)
                            : (c("scrollStart", d, o, s),
                              m.cancelScroll(!0),
                              t.requestAnimationFrame(M));
                      }
                    },
                  },
                  g = function (e) {
                    if (
                      !e.defaultPrevented &&
                      !(
                        0 !== e.button ||
                        e.metaKey ||
                        e.ctrlKey ||
                        e.shiftKey
                      ) &&
                      "closest" in e.target &&
                      (d = e.target.closest(s)) &&
                      "a" === d.tagName.toLowerCase() &&
                      !e.target.closest(u.ignore) &&
                      d.hostname === t.location.hostname &&
                      d.pathname === t.location.pathname &&
                      /#/.test(d.href)
                    ) {
                      var n, a;
                      try {
                        n = o(decodeURIComponent(d.hash));
                      } catch (e) {
                        n = o(d.hash);
                      }
                      if ("#" === n) {
                        if (!u.topOnEmptyHash) return;
                        a = document.documentElement;
                      } else a = document.querySelector(n);
                      (a = a || "#top" !== n ? a : document.documentElement) &&
                        (e.preventDefault(),
                        (function (e) {
                          if (
                            history.replaceState &&
                            e.updateURL &&
                            !history.state
                          ) {
                            var n = t.location.hash;
                            (n = n || ""),
                              history.replaceState(
                                {
                                  smoothScroll: JSON.stringify(e),
                                  anchor: n || t.pageYOffset,
                                },
                                document.title,
                                n || t.location.href
                              );
                          }
                        })(u),
                        m.animateScroll(a, d));
                    }
                  },
                  p = function (t) {
                    if (
                      null !== history.state &&
                      history.state.smoothScroll &&
                      history.state.smoothScroll === JSON.stringify(u)
                    ) {
                      var e = history.state.anchor;
                      ("string" == typeof e &&
                        e &&
                        !(e = document.querySelector(
                          o(history.state.anchor)
                        ))) ||
                        m.animateScroll(e, null, { updateURL: !1 });
                    }
                  };
                return (
                  (m.destroy = function () {
                    u &&
                      (document.removeEventListener("click", g, !1),
                      t.removeEventListener("popstate", p, !1),
                      m.cancelScroll(),
                      (h = f = d = u = null));
                  }),
                  (function () {
                    if (
                      !(
                        "querySelector" in document &&
                        "addEventListener" in t &&
                        "requestAnimationFrame" in t &&
                        "closest" in t.Element.prototype
                      )
                    )
                      throw "Smooth Scroll: This browser does not support the required JavaScript methods and browser APIs.";
                    m.destroy(),
                      (u = n(e, l || {})),
                      (f = u.header ? document.querySelector(u.header) : null),
                      document.addEventListener("click", g, !1),
                      u.updateURL &&
                        u.popstate &&
                        t.addEventListener("popstate", p, !1);
                  })(),
                  m
                );
              };
            })(a);
          }.apply(e, [])),
          void 0 === o || (t.exports = o);
      },
      732: function (t) {
        t.exports = (function () {
          "use strict";
          function t() {
            return (
              (t =
                Object.assign ||
                function (t) {
                  for (var e = 1; e < arguments.length; e++) {
                    var n = arguments[e];
                    for (var o in n)
                      Object.prototype.hasOwnProperty.call(n, o) &&
                        (t[o] = n[o]);
                  }
                  return t;
                }),
              t.apply(this, arguments)
            );
          }
          var e = "undefined" != typeof window,
            n =
              (e && !("onscroll" in window)) ||
              ("undefined" != typeof navigator &&
                /(gle|ing|ro)bot|crawl|spider/i.test(navigator.userAgent)),
            o = e && "IntersectionObserver" in window,
            a = e && "classList" in document.createElement("p"),
            r = e && window.devicePixelRatio > 1,
            i = {
              elements_selector: ".lazy",
              container: n || e ? document : null,
              threshold: 300,
              thresholds: null,
              data_src: "src",
              data_srcset: "srcset",
              data_sizes: "sizes",
              data_bg: "bg",
              data_bg_hidpi: "bg-hidpi",
              data_bg_multi: "bg-multi",
              data_bg_multi_hidpi: "bg-multi-hidpi",
              data_poster: "poster",
              class_applied: "applied",
              class_loading: "loading",
              class_loaded: "loaded",
              class_error: "error",
              class_entered: "entered",
              class_exited: "exited",
              unobserve_completed: !0,
              unobserve_entered: !1,
              cancel_on_exit: !0,
              callback_enter: null,
              callback_exit: null,
              callback_applied: null,
              callback_loading: null,
              callback_loaded: null,
              callback_error: null,
              callback_finish: null,
              callback_cancel: null,
              use_native: !1,
            },
            c = function (e) {
              return t({}, i, e);
            },
            s = function (t, e) {
              var n,
                o = "LazyLoad::Initialized",
                a = new t(e);
              try {
                n = new CustomEvent(o, { detail: { instance: a } });
              } catch (t) {
                (n = document.createEvent("CustomEvent")).initCustomEvent(
                  o,
                  !1,
                  !1,
                  { instance: a }
                );
              }
              window.dispatchEvent(n);
            },
            l = "src",
            u = "srcset",
            d = "sizes",
            f = "poster",
            h = "llOriginalAttrs",
            m = "loading",
            g = "loaded",
            p = "applied",
            v = "error",
            w = "native",
            b = "data-",
            _ = "ll-status",
            y = function (t, e) {
              return t.getAttribute(b + e);
            },
            E = function (t) {
              return y(t, _);
            },
            L = function (t, e) {
              return (function (t, e, n) {
                var o = "data-ll-status";
                null !== n ? t.setAttribute(o, n) : t.removeAttribute(o);
              })(t, 0, e);
            },
            A = function (t) {
              return L(t, null);
            },
            S = function (t) {
              return null === E(t);
            },
            I = function (t) {
              return E(t) === w;
            },
            C = [m, g, p, v],
            O = function (t, e, n, o) {
              t &&
                (void 0 === o ? (void 0 === n ? t(e) : t(e, n)) : t(e, n, o));
            },
            k = function (t, e) {
              a
                ? t.classList.add(e)
                : (t.className += (t.className ? " " : "") + e);
            },
            x = function (t, e) {
              a
                ? t.classList.remove(e)
                : (t.className = t.className
                    .replace(new RegExp("(^|\\s+)" + e + "(\\s+|$)"), " ")
                    .replace(/^\s+/, "")
                    .replace(/\s+$/, ""));
            },
            q = function (t) {
              return t.llTempImage;
            },
            M = function (t, e) {
              if (e) {
                var n = e._observer;
                n && n.unobserve(t);
              }
            },
            R = function (t, e) {
              t && (t.loadingCount += e);
            },
            W = function (t, e) {
              t && (t.toLoadCount = e);
            },
            T = function (t) {
              for (var e, n = [], o = 0; (e = t.children[o]); o += 1)
                "SOURCE" === e.tagName && n.push(e);
              return n;
            },
            F = function (t, e) {
              var n = t.parentNode;
              n && "PICTURE" === n.tagName && T(n).forEach(e);
            },
            N = function (t, e) {
              T(t).forEach(e);
            },
            z = [l],
            $ = [l, f],
            D = [l, u, d],
            H = function (t) {
              return !!t[h];
            },
            U = function (t) {
              return t[h];
            },
            P = function (t) {
              return delete t[h];
            },
            Q = function (t, e) {
              if (!H(t)) {
                var n = {};
                e.forEach(function (e) {
                  n[e] = t.getAttribute(e);
                }),
                  (t[h] = n);
              }
            },
            j = function (t, e) {
              if (H(t)) {
                var n = U(t);
                e.forEach(function (e) {
                  !(function (t, e, n) {
                    n ? t.setAttribute(e, n) : t.removeAttribute(e);
                  })(t, e, n[e]);
                });
              }
            },
            G = function (t, e, n) {
              k(t, e.class_loading),
                L(t, m),
                n && (R(n, 1), O(e.callback_loading, t, n));
            },
            Y = function (t, e, n) {
              n && t.setAttribute(e, n);
            },
            B = function (t, e) {
              Y(t, d, y(t, e.data_sizes)),
                Y(t, u, y(t, e.data_srcset)),
                Y(t, l, y(t, e.data_src));
            },
            V = {
              IMG: function (t, e) {
                F(t, function (t) {
                  Q(t, D), B(t, e);
                }),
                  Q(t, D),
                  B(t, e);
              },
              IFRAME: function (t, e) {
                Q(t, z), Y(t, l, y(t, e.data_src));
              },
              VIDEO: function (t, e) {
                N(t, function (t) {
                  Q(t, z), Y(t, l, y(t, e.data_src));
                }),
                  Q(t, $),
                  Y(t, f, y(t, e.data_poster)),
                  Y(t, l, y(t, e.data_src)),
                  t.load();
              },
            },
            J = ["IMG", "IFRAME", "VIDEO"],
            K = function (t, e) {
              !e ||
                (function (t) {
                  return t.loadingCount > 0;
                })(e) ||
                (function (t) {
                  return t.toLoadCount > 0;
                })(e) ||
                O(t.callback_finish, e);
            },
            Z = function (t, e, n) {
              t.addEventListener(e, n), (t.llEvLisnrs[e] = n);
            },
            X = function (t, e, n) {
              t.removeEventListener(e, n);
            },
            tt = function (t) {
              return !!t.llEvLisnrs;
            },
            et = function (t) {
              if (tt(t)) {
                var e = t.llEvLisnrs;
                for (var n in e) {
                  var o = e[n];
                  X(t, n, o);
                }
                delete t.llEvLisnrs;
              }
            },
            nt = function (t, e, n) {
              !(function (t) {
                delete t.llTempImage;
              })(t),
                R(n, -1),
                (function (t) {
                  t && (t.toLoadCount -= 1);
                })(n),
                x(t, e.class_loading),
                e.unobserve_completed && M(t, n);
            },
            ot = function (t, e, n) {
              var o = q(t) || t;
              tt(o) ||
                (function (t, e, n) {
                  tt(t) || (t.llEvLisnrs = {});
                  var o = "VIDEO" === t.tagName ? "loadeddata" : "load";
                  Z(t, o, e), Z(t, "error", n);
                })(
                  o,
                  function (a) {
                    !(function (t, e, n, o) {
                      var a = I(e);
                      nt(e, n, o),
                        k(e, n.class_loaded),
                        L(e, g),
                        O(n.callback_loaded, e, o),
                        a || K(n, o);
                    })(0, t, e, n),
                      et(o);
                  },
                  function (a) {
                    !(function (t, e, n, o) {
                      var a = I(e);
                      nt(e, n, o),
                        k(e, n.class_error),
                        L(e, v),
                        O(n.callback_error, e, o),
                        a || K(n, o);
                    })(0, t, e, n),
                      et(o);
                  }
                );
            },
            at = function (t, e, n) {
              !(function (t) {
                t.llTempImage = document.createElement("IMG");
              })(t),
                ot(t, e, n),
                (function (t) {
                  H(t) || (t[h] = { backgroundImage: t.style.backgroundImage });
                })(t),
                (function (t, e, n) {
                  var o = y(t, e.data_bg),
                    a = y(t, e.data_bg_hidpi),
                    i = r && a ? a : o;
                  i &&
                    ((t.style.backgroundImage = 'url("'.concat(i, '")')),
                    q(t).setAttribute(l, i),
                    G(t, e, n));
                })(t, e, n),
                (function (t, e, n) {
                  var o = y(t, e.data_bg_multi),
                    a = y(t, e.data_bg_multi_hidpi),
                    i = r && a ? a : o;
                  i &&
                    ((t.style.backgroundImage = i),
                    (function (t, e, n) {
                      k(t, e.class_applied),
                        L(t, p),
                        n &&
                          (e.unobserve_completed && M(t, e),
                          O(e.callback_applied, t, n));
                    })(t, e, n));
                })(t, e, n);
            },
            rt = function (t, e, n) {
              !(function (t) {
                return J.indexOf(t.tagName) > -1;
              })(t)
                ? at(t, e, n)
                : (function (t, e, n) {
                    ot(t, e, n),
                      (function (t, e, n) {
                        var o = V[t.tagName];
                        o && (o(t, e), G(t, e, n));
                      })(t, e, n);
                  })(t, e, n);
            },
            it = function (t) {
              t.removeAttribute(l), t.removeAttribute(u), t.removeAttribute(d);
            },
            ct = function (t) {
              F(t, function (t) {
                j(t, D);
              }),
                j(t, D);
            },
            st = {
              IMG: ct,
              IFRAME: function (t) {
                j(t, z);
              },
              VIDEO: function (t) {
                N(t, function (t) {
                  j(t, z);
                }),
                  j(t, $),
                  t.load();
              },
            },
            lt = function (t, e) {
              (function (t) {
                var e = st[t.tagName];
                e
                  ? e(t)
                  : (function (t) {
                      if (H(t)) {
                        var e = U(t);
                        t.style.backgroundImage = e.backgroundImage;
                      }
                    })(t);
              })(t),
                (function (t, e) {
                  S(t) ||
                    I(t) ||
                    (x(t, e.class_entered),
                    x(t, e.class_exited),
                    x(t, e.class_applied),
                    x(t, e.class_loading),
                    x(t, e.class_loaded),
                    x(t, e.class_error));
                })(t, e),
                A(t),
                P(t);
            },
            ut = ["IMG", "IFRAME", "VIDEO"],
            dt = function (t) {
              return t.use_native && "loading" in HTMLImageElement.prototype;
            },
            ft = function (t, e, n) {
              t.forEach(function (t) {
                return (function (t) {
                  return t.isIntersecting || t.intersectionRatio > 0;
                })(t)
                  ? (function (t, e, n, o) {
                      var a = (function (t) {
                        return C.indexOf(E(t)) >= 0;
                      })(t);
                      L(t, "entered"),
                        k(t, n.class_entered),
                        x(t, n.class_exited),
                        (function (t, e, n) {
                          e.unobserve_entered && M(t, n);
                        })(t, n, o),
                        O(n.callback_enter, t, e, o),
                        a || rt(t, n, o);
                    })(t.target, t, e, n)
                  : (function (t, e, n, o) {
                      S(t) ||
                        (k(t, n.class_exited),
                        (function (t, e, n, o) {
                          n.cancel_on_exit &&
                            (function (t) {
                              return E(t) === m;
                            })(t) &&
                            "IMG" === t.tagName &&
                            (et(t),
                            (function (t) {
                              F(t, function (t) {
                                it(t);
                              }),
                                it(t);
                            })(t),
                            ct(t),
                            x(t, n.class_loading),
                            R(o, -1),
                            A(t),
                            O(n.callback_cancel, t, e, o));
                        })(t, e, n, o),
                        O(n.callback_exit, t, e, o));
                    })(t.target, t, e, n);
              });
            },
            ht = function (t) {
              return Array.prototype.slice.call(t);
            },
            mt = function (t) {
              return t.container.querySelectorAll(t.elements_selector);
            },
            gt = function (t) {
              return (function (t) {
                return E(t) === v;
              })(t);
            },
            pt = function (t, e) {
              return (function (t) {
                return ht(t).filter(S);
              })(t || mt(e));
            },
            vt = function (t, n) {
              var a = c(t);
              (this._settings = a),
                (this.loadingCount = 0),
                (function (t, e) {
                  o &&
                    !dt(t) &&
                    (e._observer = new IntersectionObserver(
                      function (n) {
                        ft(n, t, e);
                      },
                      (function (t) {
                        return {
                          root: t.container === document ? null : t.container,
                          rootMargin: t.thresholds || t.threshold + "px",
                        };
                      })(t)
                    ));
                })(a, this),
                (function (t, n) {
                  e &&
                    window.addEventListener("online", function () {
                      !(function (t, e) {
                        var n;
                        ((n = mt(t)), ht(n).filter(gt)).forEach(function (e) {
                          x(e, t.class_error), A(e);
                        }),
                          e.update();
                      })(t, n);
                    });
                })(a, this),
                this.update(n);
            };
          return (
            (vt.prototype = {
              update: function (t) {
                var e,
                  a,
                  r = this._settings,
                  i = pt(t, r);
                W(this, i.length),
                  !n && o
                    ? dt(r)
                      ? (function (t, e, n) {
                          t.forEach(function (t) {
                            -1 !== ut.indexOf(t.tagName) &&
                              (function (t, e, n) {
                                t.setAttribute("loading", "lazy"),
                                  ot(t, e, n),
                                  (function (t, e) {
                                    var n = V[t.tagName];
                                    n && n(t, e);
                                  })(t, e),
                                  L(t, w);
                              })(t, e, n);
                          }),
                            W(n, 0);
                        })(i, r, this)
                      : ((a = i),
                        (function (t) {
                          t.disconnect();
                        })((e = this._observer)),
                        (function (t, e) {
                          e.forEach(function (e) {
                            t.observe(e);
                          });
                        })(e, a))
                    : this.loadAll(i);
              },
              destroy: function () {
                this._observer && this._observer.disconnect(),
                  mt(this._settings).forEach(function (t) {
                    P(t);
                  }),
                  delete this._observer,
                  delete this._settings,
                  delete this.loadingCount,
                  delete this.toLoadCount;
              },
              loadAll: function (t) {
                var e = this,
                  n = this._settings;
                pt(t, n).forEach(function (t) {
                  M(t, e), rt(t, n, e);
                });
              },
              restoreAll: function () {
                var t = this._settings;
                mt(t).forEach(function (e) {
                  lt(e, t);
                });
              },
            }),
            (vt.load = function (t, e) {
              var n = c(e);
              rt(t, n);
            }),
            (vt.resetStatus = function (t) {
              A(t);
            }),
            e &&
              (function (t, e) {
                if (e)
                  if (e.length) for (var n, o = 0; (n = e[o]); o += 1) s(t, n);
                  else s(t, e);
              })(vt, window.lazyLoadOptions),
            vt
          );
        })();
      },
    },
    e = {};
  function n(o) {
    var a = e[o];
    if (void 0 !== a) return a.exports;
    var r = (e[o] = { exports: {} });
    return t[o].call(r.exports, r, r.exports, n), r.exports;
  }
  (n.g = (function () {
    if ("object" == typeof globalThis) return globalThis;
    try {
      return this || new Function("return this")();
    } catch (t) {
      if ("object" == typeof window) return window;
    }
  })()),
    (() => {
      "use strict";
      let t = !0,
        e = (e = 500) => {
          let n = document.querySelector("body");
          if (t) {
            let o = document.querySelectorAll("[data-lp]");
            setTimeout(() => {
              for (let t = 0; t < o.length; t++) {
                o[t].style.paddingRight = "0px";
              }
              (n.style.paddingRight = "0px"),
                document.documentElement.classList.remove("lock");
            }, e),
              (t = !1),
              setTimeout(function () {
                t = !0;
              }, e);
          }
        },
        o = (e = 500) => {
          let n = document.querySelector("body");
          if (t) {
            let o = document.querySelectorAll("[data-lp]");
            for (let t = 0; t < o.length; t++) {
              o[t].style.paddingRight =
                window.innerWidth -
                document.querySelector(".wrapper").offsetWidth +
                "px";
            }
            (n.style.paddingRight =
              window.innerWidth -
              document.querySelector(".wrapper").offsetWidth +
              "px"),
              document.documentElement.classList.add("lock"),
              (t = !1),
              setTimeout(function () {
                t = !0;
              }, e);
          }
        };
      function a(t) {
        setTimeout(() => {
          window.FLS && console.log(t);
        }, 0);
      }
      function r(t) {
        return t.filter(function (t, e, n) {
          return n.indexOf(t) === e;
        });
      }
      new (n(732))({
        elements_selector: "[data-src],[data-srcset]",
        class_loaded: "_lazy-loaded",
        use_native: !0,
      });
      new (class {
        constructor(t) {
          (this.config = Object.assign({ logging: !0 }, t)),
            this.observer,
            !document.documentElement.classList.contains("watcher") &&
              this.scrollWatcherRun();
        }
        scrollWatcherUpdate() {
          this.scrollWatcherRun();
        }
        scrollWatcherRun() {
          document.documentElement.classList.add("watcher"),
            this.scrollWatcherConstructor(
              document.querySelectorAll("[data-watch]")
            );
        }
        scrollWatcherConstructor(t) {
          if (t.length) {
            this.scrollWatcherLogging(
              `??????????????????, ?????????? ???? ?????????????????? (${t.length})...`
            ),
              r(
                Array.from(t).map(function (t) {
                  return `${
                    t.dataset.watchRoot ? t.dataset.watchRoot : null
                  }|${t.dataset.watchMargin ? t.dataset.watchMargin : "0px"}|${t.dataset.watchThreshold ? t.dataset.watchThreshold : 0}`;
                })
              ).forEach((e) => {
                let n = e.split("|"),
                  o = { root: n[0], margin: n[1], threshold: n[2] },
                  a = Array.from(t).filter(function (t) {
                    let e = t.dataset.watchRoot ? t.dataset.watchRoot : null,
                      n = t.dataset.watchMargin ? t.dataset.watchMargin : "0px",
                      a = t.dataset.watchThreshold
                        ? t.dataset.watchThreshold
                        : 0;
                    if (
                      String(e) === o.root &&
                      String(n) === o.margin &&
                      String(a) === o.threshold
                    )
                      return t;
                  }),
                  r = this.getScrollWatcherConfig(o);
                this.scrollWatcherInit(a, r);
              });
          } else
            this.scrollWatcherLogging(
              "????????, ?????? ???????????????? ?????? ????????????????. ZzzZZzz"
            );
        }
        getScrollWatcherConfig(t) {
          let e = {};
          if (
            (document.querySelector(t.root)
              ? (e.root = document.querySelector(t.root))
              : "null" !== t.root &&
                this.scrollWatcherLogging(
                  `??????... ?????????????????????????? ?????????????? ${t.root} ?????? ???? ????????????????`
                ),
            (e.rootMargin = t.margin),
            !(t.margin.indexOf("px") < 0 && t.margin.indexOf("%") < 0))
          ) {
            if ("prx" === t.threshold) {
              t.threshold = [];
              for (let e = 0; e <= 1; e += 0.005) t.threshold.push(e);
            } else t.threshold = t.threshold.split(",");
            return (e.threshold = t.threshold), e;
          }
          this.scrollWatcherLogging(
            "???? ????, ?????????????????? data-watch-margin ?????????? ???????????????? ?? PX ?????? %"
          );
        }
        scrollWatcherCreate(t) {
          this.observer = new IntersectionObserver((t, e) => {
            t.forEach((t) => {
              this.scrollWatcherCallback(t, e);
            });
          }, t);
        }
        scrollWatcherInit(t, e) {
          this.scrollWatcherCreate(e),
            t.forEach((t) => this.observer.observe(t));
        }
        scrollWatcherIntersecting(t, e) {
          t.isIntersecting
            ? (!e.classList.contains("_watcher-view") &&
                e.classList.add("_watcher-view"),
              this.scrollWatcherLogging(
                `?? ???????? ${e.classList}, ?????????????? ?????????? _watcher-view`
              ))
            : (e.classList.contains("_watcher-view") &&
                e.classList.remove("_watcher-view"),
              this.scrollWatcherLogging(
                `?? ???? ???????? ${e.classList}, ?????????? ?????????? _watcher-view`
              ));
        }
        scrollWatcherOff(t, e) {
          e.unobserve(t),
            this.scrollWatcherLogging(`?? ???????????????? ?????????????? ???? ${t.classList}`);
        }
        scrollWatcherLogging(t) {
          this.config.logging && a(`[??????????????????????]: ${t}`);
        }
        scrollWatcherCallback(t, e) {
          const n = t.target;
          this.scrollWatcherIntersecting(t, n),
            n.hasAttribute("data-watch-once") &&
              t.isIntersecting &&
              this.scrollWatcherOff(n, e),
            document.dispatchEvent(
              new CustomEvent("watcherCallback", { detail: { entry: t } })
            );
        }
      })({});
      var i = n(2);
      let c = (t, n = !1, o = 500, r = 0) => {
          const c = "string" == typeof t ? document.querySelector(t) : t;
          if (c) {
            let s = "",
              l = 0;
            n &&
              ((s = "header.header"),
              (l = document.querySelector(s).offsetHeight));
            let u = {
              speedAsDuration: !0,
              speed: o,
              header: s,
              offset: r,
              easing: "easeOutQuad",
            };
            if (
              (document.documentElement.classList.contains("menu-open") &&
                (e(), document.documentElement.classList.remove("menu-open")),
              void 0 !== i)
            )
              new i().animateScroll(c, "", u);
            else {
              let t = c.getBoundingClientRect().top + scrollY;
              window.scrollTo({ top: l ? t - l : t, behavior: "smooth" });
            }
            a(`[gotoBlock]: ????????...???????? ?? ${t}`);
          } else a(`[gotoBlock]: ???? ????..???????????? ?????????? ?????? ???? ????????????????: ${t}`);
        },
        s = !1;
      setTimeout(() => {
        if (s) {
          let t = new Event("windowScroll");
          window.addEventListener("scroll", function (e) {
            document.dispatchEvent(t);
          });
        }
      }, 0);
      const l = document.querySelectorAll("section"),
        u = document.querySelectorAll(".menu-item"),
        d = new IntersectionObserver(
          (t) => {
            t.forEach((t) => {
              if (t.isIntersecting && t.intersectionRatio > 0.5) {
                u.forEach((t) => t.classList.remove("active"));
                const e = t.target.id,
                  n = document.querySelector(`.menu-item[href="#${e}"]`);
                n && n.classList.add("active");
              }
            });
          },
          { threshold: [0.2, 0.5, 0.8] }
        );
      l.forEach((t) => {
        d.observe(t);
      }),
        (window.FLS = !0),
        (function (t) {
          let e = new Image();
          (e.onload = e.onerror =
            function () {
              t(2 == e.height);
            }),
            (e.src =
              "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA");
        })(function (t) {
          let e = !0 === t ? "webp" : "no-webp";
          document.documentElement.classList.add(e);
        }),
        (function () {
          let n = document.querySelector(".icon-menu");
          n &&
            n.addEventListener("click", function (n) {
              t &&
                (((t = 500) => {
                  document.documentElement.classList.contains("lock")
                    ? e(t)
                    : o(t);
                })(),
                document.documentElement.classList.toggle("menu-open"),
                document.documentElement.classList.contains("catalog-open") &&
                  document.documentElement.classList.remove("catalog-open"),
                document.documentElement.classList.contains("sub-menu-open") &&
                  document.documentElement.classList.remove("sub-menu-open"));
            });
        })(),
        (function () {
          function t(t) {
            if ("click" === t.type) {
              const e = t.target;
              if (e.closest("[data-goto]")) {
                const n = e.closest("[data-goto]"),
                  o = n.dataset.goto ? n.dataset.goto : "",
                  a = !!n.hasAttribute("data-goto-header"),
                  r = n.dataset.gotoSpeed ? n.dataset.gotoSpeed : "500";
                c(o, a, r), t.preventDefault();
              }
            } else if ("watcherCallback" === t.type && t.detail) {
              const e = t.detail.entry,
                n = e.target;
              if ("navigator" === n.dataset.watch) {
                const t = n.id,
                  o =
                    (document.querySelector("[data-goto]._navigator-active"),
                    document.querySelector(`[data-goto="${t}"]`));
                e.isIntersecting
                  ? o && o.classList.add("_navigator-active")
                  : o && o.classList.remove("_navigator-active");
              }
            }
          }
          document.addEventListener("click", t),
            document.addEventListener("watcherCallback", t);
        })(),
        (function () {
          s = !0;
          const t = document.querySelector("header.header"),
            e = t.hasAttribute("data-scroll-show"),
            n = t.dataset.scrollShow ? t.dataset.scrollShow : 500,
            o = t.dataset.scroll ? t.dataset.scroll : 1;
          let a,
            r = 0;
          document.addEventListener("windowScroll", function (i) {
            const c = window.scrollY;
            clearTimeout(a),
              c >= o
                ? (!t.classList.contains("_header-scroll") &&
                    t.classList.add("_header-scroll"),
                  e &&
                    (c > r
                      ? t.classList.contains("_header-show") &&
                        t.classList.remove("_header-show")
                      : !t.classList.contains("_header-show") &&
                        t.classList.add("_header-show"),
                    (a = setTimeout(() => {
                      !t.classList.contains("_header-show") &&
                        t.classList.add("_header-show");
                    }, n))))
                : (t.classList.contains("_header-scroll") &&
                    t.classList.remove("_header-scroll"),
                  e &&
                    t.classList.contains("_header-show") &&
                    t.classList.remove("_header-show")),
              (r = c <= 0 ? 0 : c);
          });
        })();
    })();
})();
