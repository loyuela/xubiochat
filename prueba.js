(() => {
    var t,
      e = {
        25: () => {
          function t(i) {
            return (
              (t =
                "function" == typeof Symbol && "symbol" == typeof Symbol.iterator

          }
          if (void 0 === window.pixelAdded) {
            var e = function (t) {
                ("app" != Ni || yi("poptin_enable_console_messages")) &&
                  console.log(t);
              },
              n = function () {
                void 0 !== $i.id &&
                  ("undefined" != typeof Storage
                    ? null == window.sessionStorage.getItem("poptin_client_id") &&
                      window.sessionStorage.setItem("poptin_client_id", $i.id)
                    : yi("poptin_client_id") ||
                      hi("poptin_client_id", $i.id, 365));
              },
              o = function () {
                var t = $i.id;
                return (
                  null == $i.id &&
                    ("undefined" != typeof Storage &&
                    null != window.sessionStorage.getItem("poptin_client_id")
                      ? (t = window.sessionStorage.getItem("poptin_client_id"))
                      : yi("poptin_client_id") && (t = gi("poptin_client_id"))),
                  t
                );
              },
              p = function () {
                a(), r(), l(), _(), c(), g(), it(), s();
              },
              a = function () {
                void 0 !== window.Shopify &&
                  window.Shopify.shop &&
                  jQ224
                    .ajax(
                      {
                        url: "/cart.js",
                        type: "get",
                        dataType: "json",
                        async: !1,
                      },
                      "json"
                    )
                    .done(function (t) {
                      var i = t.total_price / 100;
                      Fn.push({ tag_input: "shpfy_value", pre: 1, value: i }),
                        Fn.push({
                          tag_input: "shpfy_count",
                          pre: 1,
                          value: t.item_count,
                        }),
                        jQ224.ajax({
                          url: Ai + "/APIRequest/shopify/get-price-rules/" + o(),
                          type: "get",
                          async: !1,
                          success: function (t) {
                            Ln = t.price_rules;
                            var e = null;
                            jQ224(Ln).each(function (t, n) {
                              if (
                                null == e &&
                                (("shipping_line" == n.target_type &&
                                  "each" == n.allocation_method) ||
                                  ("line_item" == n.target_type &&
                                    "across" == n.allocation_method)) &&
                                "all" == n.target_selection
                              ) {
                                var o =
                                  (e = n) &&
                                  e.prerequisite_subtotal_range &&
                                  e.prerequisite_subtotal_range
                                    .greater_than_or_equal_to
                                    ? parseFloat(
                                        e.prerequisite_subtotal_range
                                          .greater_than_or_equal_to
                                      )
                                    : 0;
                                Fn.push({
                                  tag_input: "shpfy_thres",
                                  pre: 1,
                                  value: o,
                                }),
                                  Fn.push({
                                    tag_input: "shpfy_gap",
                                    pre: 1,
                                    value: o - i,
                                  });
                              }
                            });
                          },
                        });
                    });
              },
              r = function () {
                document.referrer.length > 1 &&
                  hi(
                    "poptin_referrer",
                    Wt().length > 1 ? Wt() : document.referrer,
                    0.00138888888888889
                  ),
                  setInterval(function () {
                    hi(
                      "poptin_referrer",
                      Wt().length > 1 ? Wt() : document.referrer,
                      0.00138888888888889
                    );
                  }, 6e4);
              },
              s = function () {
                if (
                  document.referrer &&
                  -1 !== document.referrer.indexOf(window.location.host)
                    ? document.referrer
                    : null
                ) {
                  var t = new URL(document.referrer),
                    i = t.pathname + t.search;
                  if ("/" == i) return;
                  var e = localStorage.getItem("poptin_previous_visited_pages");
                  if (e && e.length > 0) {
                    var n = e.split("|");
                    n.includes(i) || n.push(i),
                      localStorage.setItem(
                        "poptin_previous_visited_pages",
                        n.join("|")
                      );
                  } else localStorage.setItem("poptin_previous_visited_pages", i);
                }
              },
              d = function () {
                return localStorage.getItem("poptin_previous_visited_pages");
              },
              l = function () {
                null != previous_url_spa && poptin_single_page_app
                  ? hi(
                      "poptin_previous_url",
                      previous_url_spa,
                      0.00138888888888889
                    )
                  : document.referrer.length > 1 &&
                    hi(
                      "poptin_previous_url",
                      document.referrer,
                      0.00138888888888889
                    );
              },
              _ = function () {
                jQ224(document).on(
                  "mouseover",
                  "a:not(.poptin-click)",
                  function (t) {
                    -1 !== this.href.indexOf("/APIRequest/click/") &&
                      (jQ224(this).addClass("poptin-click"),
                      jQ224(this).attr("data-href", jQ224(this).attr("href")),
                      jQ224(this).attr("href", "#"));
                  }
                ),
                  jQ224(document).on("click", "a.poptin-click", function (t) {
                    e("displayPoptinOnClick"), t.preventDefault();
                    try {
                      (poptin_id = jQ224(this)
                        .attr("data-href")
                        .split("click/")[1]),
                        y(poptin_id);
                    } catch (t) {
                      vi(
                        "displayPoptinOnClick()->error()",
                        t,
                        "OK",
                        this.href,
                        !1
                      );
                    }
                  });
              },
              c = function () {
                e("set: onTextClickClose()");
                try {
                  jQ224(".o-close").off("click");
                } catch (t) {
                  e(t);
                }
                jQ224(document).on("click", ".o-close", function (t) {
                  (poptin_id = jQ224(t.target)
                    .parents(".poptin-popup")
                    .attr("data-poptin-id")),
                    (Ze[poptin_id].poptin_trigger.close_trigger = "cancel_click"),
                    closePoptin(poptin_id);
                });
              },
              f = function (t) {
                e(t),
                  jQ224.when(jQ224.ajax(t.poptin_url)).then(
                    function (i, e, n) {
                      (Ve[t.poptin_id].poptin = i), (tn[t.poptin_id].poptin = i);
                    },
                    function (t, i, n) {
                      e(t);
                    }
                  );
              },
              u = function (t, i, n, p, a) {
                if (
                  ((n = null != n && n),
                  (p = null != p && p),
                  (a = null != a && a),
                  e("initiatePullPoptinsRequestOnClick()"),
                  (poptin_id = t.split("click/")[1].substr(0, 13)),
                  null != tn[poptin_id] && tn[poptin_id].display)
                )
                  n && y(poptin_id);
                else {
                  var r = window.location.href,
                    s = Yt(),
                    l = Vt(),
                    _ = document.title,
                    c = 0,
                    u = 0,
                    g = [],
                    m = "";
                  if ("undefined" != typeof Shopify) {
                    var b = h();
                    if (
                      ((c = b.total_price || 0),
                      (u = b.item_count || 0),
                      (g = b.items || []).length > 0)
                    )
                      m = g
                        .map(function (t, i, e) {
                          return t.variant_id;
                        })
                        .join(",");
                  }
                  jQ224
                    .get(
                      t.replace("app", "app") +
                        "?client_id=" +
                        o() +
                        "&domain=" +
                        r +
                        "&referrer=" +
                        Wt() +
                        "&previous_url=" +
                        Gt() +
                        "&cookies=" +
                        s +
                        "&triggers=" +
                        l +
                        "&if_mobile=" +
                        sn +
                        "&page_title=" +
                        _ +
                        "&poptin_display=" +
                        i +
                        "&origin_landing_page=" +
                        Zt() +
                        "&cancel_visitor_count=" +
                        p +
                        "&previous_visited_pages=" +
                        d() +
                        "&shopify_customer_id=" +
                        Nn +
                        "&cart_total_price=" +
                        c +
                        "&cart_total_items=" +
                        u +
                        "&cart_products_ids_list=" +
                        m,
                      {},
                      "json"
                    )
                    .done(function (t) {
                      var i;
                      (e(t), "not_allowed" !== t.display)
                        ? ((Ye = t.country),
                          (cn = t.if_freemium),
                          (_n = t.lang),
                          w(_n),
                          a
                            ? y(i)
                            : jQ224.each(t.poptins, function (t, e) {
                                (tn[(i = this).poptin_id] = i),
                                  n
                                    ? 1 == landing_page_teaser_on
                                      ? A(tn[i.poptin_id], 0)
                                      : y(i.poptin_id)
                                    : f(i);
                              }))
                        : ("not_allowed" != t.display ||
                            ("Client restricted" != t.message &&
                              "You have been reached the max poptins views number" !=
                                t.message) ||
                            !0,
                          e(t.display));
                    })
                    .fail(function (t, i, e) {});
                }
              },
              h = function () {
                var t = {};
                return (
                  jQ224
                    .ajax(
                      {
                        url: "/cart.js",
                        type: "get",
                        dataType: "json",
                        async: !1,
                      },
                      "json"
                    )
                    .done(function (i) {
                      t = i;
                    })
                    .fail(function (t, i, n) {
                      e("Cart Error");
                    }),
                  t
                );
              },
              g = function () {
                try {
                  "undefined" == typeof poptin_landing_page
                    ? b()
                    : (jQ224(".landing-form").show(),
                      u(poptin_landing_page_url, !1, !0));
                } catch (t) {}
              },
              m = function (t, i, e) {
                ($href = Ai + "/APIRequest/click/" + t), u($href, !0, i, e);
              },
              y = function (t) {
                null != tn[t]
                  ? (Xi = tn[t]).display
                    ? void 0 ===
                        jQ224(
                          ".poptin-popup[data-poptin-id=" + Xi.poptin_id + "]"
                        )[0] &&
                      (null == Ve && (Ve = new Object()),
                      (poptin_template = ""),
                      null != Ve[Xi.poptin_id] &&
                        "" != Ve[Xi.poptin_id].poptin &&
                        (poptin_template = Ve[Xi.poptin_id].poptin),
                      (Ve[Xi.poptin_id] = Xi),
                      (Ve[Xi.poptin_id].poptin = poptin_template),
                      (Ze[Xi.poptin_id] = {}),
                      j(Xi),
                      Q(Xi),
                      (Ze[Xi.poptin_id].poptin_trigger = {
                        convert: !1,
                        shown: !1,
                        poptin_active: !0,
                        scroll_flag: !0,
                        mouse_leave_flag: !0,
                        click_counter: 0,
                        trigger: "",
                        close_trigger: "",
                      }),
                      et(Xi, !0),
                      tt(Xi, !0),
                      B(Xi, !0),
                      "embedded" != Xi.poptin_type &&
                        "fullpage" != Xi.poptin_type &&
                        Di(Xi),
                      st(Xi),
                      Ti(Xi),
                      Ii(Xi))
                    : poptin_display_trigger || m(t, !0, !1)
                  : m(t, !0, !1);
              },
              b = function () {
                if (
                  (console.log("initiatePullPoptinsRequest()"),
                  sn &&
                    sn &&
                    window.history &&
                    window.history.pushState &&
                    "undefined" == typeof Ecwid)
                ) {
                  if (!poptin_single_page_app) {
                    var n = 100;
                    window.history.state &&
                      window.history.state.page &&
                      (n = window.history.state.page),
                      window.history.pushState({ page: n + 1 }, "");
                  }
                  setTimeout(function () {
                    e("pop_urls"),
                      (En = "object" === t(En) ? En : JSON.parse(En))[
                        En.length - 1
                      ] != window.location.href &&
                        (En.push(window.location.href),
                        e("pop_urls2"),
                        sessionStorage.setItem("pop_urls", JSON.stringify(En)));
                  }, 300),
                    "undefined" == typeof Ecwid &&
                      window.addEventListener("popstate", function () {
                        En.pop(),
                          e("pop_urls"),
                          sessionStorage.setItem("pop_urls", JSON.stringify(En));
                      });
                }
                var p = window.location.href,
                  a =
                    Yt() +
                    " " +
                    oi() +
                    " " +
                    ni() +
                    " " +
                    Mi("poptin_abtest_session_"),
                  r = Vt(),
                  s = pi(),
                  l = Wt(),
                  _ = Gt(),
                  c = document.title;
                jQ224(document).ready(function () {
                  var t = document.querySelectorAll(".poptin-embedded"),
                    n = t.length,
                    u = [];
                  if (n)
                    for (i = 0; i < n; i++) u.push(t[i].getAttribute("data-id"));
                  var g = 0,
                    m = 0,
                    y = [],
                    b = "";
                  if ("undefined" != typeof Shopify) {
                    var j = h();
                    if (
                      ((g = j.total_price || 0),
                      (m = j.item_count || 0),
                      (y = j.items || []).length > 0)
                    )
                      b = y
                        .map(function (t, i, e) {
                          return t.variant_id;
                        })
                        .join(",");
                  }
                  jQ224(".poptin-embedded").empty(),
                    jQ224
                      .ajax(
                        {
                          url: Ai + "/APIRequest/" + o(),
                          type: "get",
                          data: {
                            domain: p,
                            referrer: l,
                            previous_url: _,
                            cookies: a,
                            triggers: r,
                            cc: s,
                            poptin_forms_id: u,
                            if_mobile: sn,
                            page_title: c,
                            origin_landing_page: Zt(),
                            if_page_refreshed: ji(),
                            poptin_viewed_url: ti(),
                            previous_visited_pages: d(),
                            shopify_customer_id: Nn,
                            cart_total_items: m,
                            cart_total_price: g,
                            cart_products_ids_list: b,
                          },
                          dataType: "json",
                          async: !0,
                        },
                        "json"
                      )
                      .done(function (t) {
                        (Ve = t.poptins),
                          (cn = t.if_freemium),
                          (Ye = t.country),
                          e(t),
                          "not_allowed" !== t.display
                            ? (jQ224.each(Ve, function (i, n) {
                                this.ab_test_parent_id &&
                                  jQ224(
                                    ".poptin-embedded[data-id='" +
                                      this.ab_test_parent_id +
                                      "']"
                                  ).attr("data-id", this.poptin_id),
                                  (this.display || this.is_teasers_on) &&
                                    (("embedded" == this.poptin_type &&
                                      0 ==
                                        jQ224(
                                          ".poptin-embedded[data-id='" +
                                            this.poptin_id +
                                            "']"
                                        ).length) ||
                                      ((_n = t.lang),
                                      w(t.lang),
                                      k(this),
                                      (dn = !0))),
                                  this.on_click &&
                                    ((tn[this.poptin_id] = this),
                                    this.display ||
                                      ((_n = t.lang),
                                      w(t.lang),
                                      e(this),
                                      f(this)));
                              }),
                              dn && ((_n = t.lang), w(t.lang)),
                              poptin_single_page_app &&
                                setTimeout(function () {
                                  setInterval(function () {
                                    jQ224(".poptin-embedded").each(function (t) {
                                      if (jQ224(this).is(":empty")) {
                                        var i = jQ224(this).attr("data-id");
                                        poptin_display_form(i);
                                      }
                                    });
                                  }, 5e3);
                                }, 5e3))
                            : t.is_client_restriction
                            ? ((upgrade_popup_setting =
                                t.client_restriction_setting),
                              Oi(t),
                              !0)
                            : "not_allowed" != t.display ||
                              ("Client restricted" != t.message &&
                                "You have been reached the max poptins views number" !=
                                  t.message) ||
                              !0,
                          v(t),
                          ii();
                      })
                      .fail(function (t, i, n) {
                        e("initiatePullPoptinsRequest()->auto->->error()");
                      });
                });
              },
              v = function (t) {
                yi("poptin_user_ip") ||
                  null == t.ip ||
                  hi("poptin_user_ip", t.ip, 365),
                  ((!yi("poptin_user_country_code") && null != t.cc) ||
                    (gi("poptin_user_country_code") != t.cc && null != t.cc)) &&
                    hi("poptin_user_country_code", t.cc, 365);
              },
              w = function (t) {
                (winie =
                  /Windows NT 6.1/i.test(navigator.userAgent) &&
                  (/Trident/i.test(navigator.userAgent) ||
                    /MSIE/i.test(navigator.userAgent))
                    ? "-ie"
                    : ""),
                  (font_link = ""),
                  jQ224("#poptin_heb_fonts_preload").remove(),
                  jQ224("#poptin_heb_fonts").remove(),
                  (font_link +=
                    '<link rel="preload" id="poptin_heb_fonts_preload" as="style"  href="' +
                    Li +
                    "/css/heb-fonts" +
                    winie +
                    '.min.css">'),
                  (font_link +=
                    '<link rel="stylesheet" id="poptin_heb_fonts" type="text/css" href="' +
                    Li +
                    "/css/heb-fonts" +
                    winie +
                    '.min.css" defer>'),
                  poptin_disable_fa ||
                    (0 == jQ224("#poptin-fa-preload").length &&
                      0 == jQ224("#poptin-fa").length &&
                      (jQ224("#poptin-fa-preload").remove(),
                      jQ224("#poptin-fa").remove(),
                      (font_link +=
                        '<link rel="preload" id="poptin-fa-preload" as="style" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">'),
                      (font_link +=
                        '<link rel="stylesheet" id="poptin-fa" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"  defer>'))),
                  Ai.indexOf("dev") >= 0
                    ? 0 == jQ224("#poptin-css-file-preload").length &&
                      0 == jQ224("#poptin-css-file-preload").length &&
                      (jQ224("#poptin-css-file-preload").remove(),
                      jQ224("#poptin-css-file").remove(),
                      (font_link +=
                        '<link  rel="preload" as="style" id="poptin-css-file-preload"  href="' +
                        Ei +
                        "/css/poptin-style-" +
                        t +
                        '.css?ver=10">'),
                      (font_link +=
                        '<link rel="stylesheet" type="text/css" id="poptin-css-file" href="' +
                        Ei +
                        "/css/poptin-style-" +
                        t +
                        '.css?ver=10"  defer>'))
                    : 0 == jQ224("#poptin-css-file-preload").length &&
                      0 == jQ224("#poptin-css-file-preload").length &&
                      (jQ224("#poptin-css-file-preload").remove(),
                      jQ224("#poptin-css-file").remove(),
                      (font_link +=
                        '<link  rel="preload" as="style" id="poptin-css-file-preload"  href="' +
                        Li +
                        "/css/poptin-style-" +
                        t +
                        '.css?ver=10">'),
                      (font_link +=
                        '<link  rel="stylesheet" type="text/css" id="poptin-css-file" href="' +
                        Li +
                        "/css/poptin-style-" +
                        t +
                        '.css?ver=10"  defer>')),
                  jQ224(
                    "#poptin_custom_fonts_preconnect, #poptin_custom_fonts_preload"
                  ).remove(),
                  jQ224("head").append(
                    '<link rel="preconnect" id="poptin_custom_fonts_preconnect" href="https://d362h7pxdteoyk.cloudfront.net/"></link>'
                  ),
                  jQ224("head").append(
                    '<link rel="preload" id="poptin_custom_fonts_preload" href="https://d362h7pxdteoyk.cloudfront.net/"></link>'
                  ),
                  "en" == t
                    ? (jQ224("#poptin_poppins_font_preload").remove(),
                      jQ224("#poptin_poppins_font_link").remove(),
                      jQ224("head").append(
                        '<link rel="preload" id="poptin_poppins_font_preload" as="style" href="https://fonts.popt.in?family=Poppins&display=swap">'
                      ),
                      jQ224("head").append(
                        '<link rel="stylesheet" id="poptin_poppins_font_link" href="https://fonts.popt.in?family=Poppins&display=swap">'
                      ))
                    : (jQ224("#poptin_opensanshebrew_font_preload").remove(),
                      jQ224("#poptin_opensanshebrew_font_link").remove(),
                      jQ224("head").append(
                        '<link rel="preload" id="poptin_opensanshebrew_font_preload" as="style" href="https://fonts.popt.in/?family=Open%20Sans%20Hebrew&display=swap">'
                      ),
                      jQ224("head").append(
                        '<link rel="stylesheet" id="poptin_opensanshebrew_font_link" href="https://fonts.popt.in/?family=Open%20Sans%20Hebrew&display=swap">'
                      )),
                  jQ224("head").append(font_link),
                  I();
              },
              j = function (t) {
                1 == t.design_properties.timer_ver ||
                (0 == t.design_properties.timer_ver &&
                  (t.poptin_type + "_" + t.poptin_format == "lightbox_format_5" ||
                    t.poptin_type + "_" + t.poptin_format ==
                      "lightbox_format_11" ||
                    t.poptin_type + "_" + t.poptin_format == "bar_format_5" ||
                    t.poptin_type + "_" + t.poptin_format == "bar_format_10"))
                  ? 0 == jQ224("#poptin-timer-v1").length &&
                    jQ224("head").append(
                      '<link rel="stylesheet" id="poptin-timer-v1" type="text/css" href="' +
                        Li +
                        '/css/timer.css?ver=10" defer>'
                    )
                  : 2 == t.design_properties.timer_ver &&
                    0 == jQ224("#poptin-timer-v2").length &&
                    jQ224("head").append(
                      '<link rel="stylesheet" id="poptin-timer-v2" type="text/css" href="' +
                        Li +
                        '/css/v_2/timer.css?ver=10" defer>'
                    );
              },
              Q = function (t) {
                t.poptin_type + "_" + t.poptin_format == "gamified_format_3" &&
                  jQ224("head").append(
                    '<link rel="stylesheet" id="poptin-timer-v1" type="text/css" href="' +
                      Ei +
                      '/css/v_2/spin-wheel.css" defer>'
                  );
              },
              k = function (t) {
                e("downloadPoptinTemplateFromS3-poptin_id: " + t.poptin_id),
                  "" == Ve[t.poptin_id].poptin &&
                    jQ224.when(jQ224.ajax(t.poptin_url)).then(
                      function (i, n, o) {
                        if (
                          (e("downloadPoptinTemplateFromS3->status: " + n),
                          (t.poptin = i),
                          (Ve[t.poptin_id].poptin = i),
                          null != Ze[t.poptin_id] && (Ze[t.poptin_id].poptin = i),
                          void 0 !== window.Shopify && window.Shopify.shop)
                        )
                          if (
                            jQ224(t.poptin).find("input#shopifyProductsJSON")
                              .length > 0
                          ) {
                            Qt();
                            var p = JSON.parse(
                              jQ224(t.poptin)
                                .find("input#shopifyProductsJSON")
                                .val()
                            );
                            !p ||
                            ("last_visited" != p.category &&
                              "product_in_cart" != p.category)
                              ? (e(
                                  "show teasers if products available for collections and manual_products"
                                ),
                                A(t, 0))
                              : xt(t, p).then(function (i) {
                                  1 == i.display &&
                                    (e("show teasers if products available"),
                                    A(t, 0));
                                });
                          } else A(t, 0);
                        else A(t, 0);
                        j(t),
                          Q(t),
                          nt(t.poptin_id),
                          et(t),
                          tt(t),
                          t.display && C(t);
                      },
                      function (t, i, n) {
                        e("downloadPoptinTemplateFromS3->error: " + t);
                      }
                    );
              },
              C = function (t) {
                e("setPoptinTrigger for: " + t.poptin_id);
                var i,
                  n,
                  o = "embedded" == t.poptin_type;
                if (
                  ((t.display_after_sec_active = o
                    ? 0
                    : t.display_after_sec_active),
                  (Ze[t.poptin_id].poptin_trigger = {
                    convert: !1,
                    poptin_active: !0,
                    scroll_flag: !0,
                    mouse_leave_flag: !0,
                    click_counter: 0,
                    trigger: "",
                    close_trigger: "",
                    shown: !1,
                  }),
                  "yes" == t.display_after_exit_website_active)
                )
                  if (sn) {
                    if (window.history && window.history.pushState) {
                      if (!poptin_single_page_app) {
                        var p = 100;
                        window.history.state &&
                          window.history.state.page &&
                          (p = window.history.state.page),
                          window.history.pushState({ page: p + 1 }, "");
                      }
                      window.addEventListener("popstate", function () {
                        !(function (t) {
                          if (
                            (e("going back " + En.length),
                            En.length < 1 &&
                              "" !== location.hash.split("#!/")[1] &&
                              "" === window.location.hash)
                          ) {
                            if (Gn.ifActive() && Gn.ifRelevent(t))
                              return e("load after back button trigger"), !1;
                            ((Ze[t.poptin_id] &&
                              Ze[t.poptin_id].poptin_trigger.mouse_leave_flag &&
                              Ze[t.poptin_id].poptin_trigger.poptin_active) ||
                              !Ze[t.poptin_id].poptin_trigger.shown) &&
                              (e("load after back button trigger"),
                              (Ze[t.poptin_id].poptin_trigger.poptin_active = !1),
                              (Ze[t.poptin_id].poptin_trigger.trigger =
                                "close tab"),
                              B(t, !!o || null),
                              (Ze[t.poptin_id].poptin_trigger.mouse_leave_flag =
                                !1));
                          }
                        })(t);
                      });
                    }
                  } else
                    jQ224(document).mouseleave(function (i) {
                      if (X(t) && E(t)) {
                        var n = i.clientY,
                          o = document.body.clientWidth - i.pageX,
                          p = jQ224(window).height() - i.clientY;
                        i.pageX;
                        if ("select" == i.target.tagName.toLowerCase()) return !1;
                        if (o > 0 && p > 0 && n <= 0) {
                          if (
                            (e("load after mouse leave trigger: " + t.poptin_id),
                            Gn.ifActive() && Gn.ifRelevent(t))
                          )
                            return e("not"), !1;
                          ((Ze[t.poptin_id] &&
                            Ze[t.poptin_id].poptin_trigger.mouse_leave_flag &&
                            Ze[t.poptin_id].poptin_trigger.poptin_active) ||
                            !Ze[t.poptin_id].poptin_trigger.shown) &&
                            (e("yes"),
                            (Ze[t.poptin_id].poptin_trigger.poptin_active = !1),
                            (Ze[t.poptin_id].poptin_trigger.trigger =
                              "close tab"),
                            B(t),
                            (Ze[t.poptin_id].poptin_trigger.mouse_leave_flag =
                              !1));
                        }
                      }
                    });
                if ("no" != t.display_after_sec_active) {
                  if ("website" == t.display_after_sec_active_on) {
                    if (!yi("poptin_session_account_time_" + t.account_id)) {
                      var a = { set_at: Date.now(), expiry_at: Date.now() + 6e4 };
                      hi(
                        "poptin_session_account_time_" + t.account_id,
                        JSON.stringify(a),
                        1 / 24 / 60
                      );
                    }
                    setInterval(function () {
                      if (gi("poptin_session_account_time_" + t.account_id)) {
                        var i = JSON.parse(
                          gi("poptin_session_account_time_" + t.account_id)
                        );
                        if ((i.expiry_at - Date.now()) / 1e3 < 60) {
                          var e = {
                            set_at: i.set_at,
                            expiry_at: Date.now() + 6e4,
                          };
                          hi(
                            "poptin_session_account_time_" + t.account_id,
                            JSON.stringify(e),
                            1 / 24 / 60
                          );
                        }
                      } else {
                        e = { set_at: Date.now(), expiry_at: Date.now() + 6e4 };
                        hi(
                          "poptin_session_account_time_" + t.account_id,
                          JSON.stringify(e),
                          1 / 24 / 60
                        );
                      }
                    }, 2e4);
                    var r =
                        JSON.parse(
                          gi("poptin_session_account_time_" + t.account_id)
                        ).set_at / 1e3,
                      s = Date.now() / 1e3 - r;
                  }
                  var d =
                    "page" === t.display_after_sec_active_on
                      ? 1e3 * t.display_after_sec_active
                      : 1e3 * (t.display_after_sec_active - s);
                  poptinTimeDelayTrigger = window.setTimeout(function () {
                    if (
                      (e(
                        "load after " +
                          t.display_after_sec_active +
                          " seconds trigger on " +
                          t.display_after_sec_active_on
                      ),
                      X(t) && E(t))
                    ) {
                      if (Gn.ifActive() && Gn.ifRelevent(t)) return !1;
                      (!Ze[t.poptin_id].poptin_trigger.poptin_active &&
                        Ze[t.poptin_id].poptin_trigger.shown) ||
                        ((Ze[t.poptin_id].poptin_trigger.poptin_active = !1),
                        (Ze[t.poptin_id].poptin_trigger.trigger =
                          "after " + t.display_after_sec_active + " seconds"),
                        B(t));
                    }
                  }, d);
                }
                if ("no" != t.display_after_scroll_active && !Bn) {
                  e(t.display_after_scroll_active);
                  jQ224(document).height(),
                    jQ224(window).height(),
                    t.display_after_scroll_active;
                  jQ224(window).scroll(function () {
                    var i =
                      (jQ224(document).height() - jQ224(window).height()) *
                      t.display_after_scroll_active *
                      0.01;
                    if (
                      jQ224(window).scrollTop() >= i &&
                      Ze[t.poptin_id].poptin_trigger.scroll_flag &&
                      (Ze[t.poptin_id].poptin_trigger.scroll_flag,
                      (Ze[t.poptin_id].poptin_trigger.poptin_active ||
                        !Ze[t.poptin_id].poptin_trigger.shown) &&
                        (e(
                          "load after " +
                            t.display_after_scroll_active +
                            " scroll page trigger"
                        ),
                        X(t) && E(t)))
                    ) {
                      if (Gn.ifActive() && Gn.ifRelevent(t)) return !1;
                      (Ze[t.poptin_id].poptin_trigger.poptin_active = !1),
                        (Ze[t.poptin_id].poptin_trigger.trigger =
                          "after " +
                          t.display_after_scroll_active +
                          "% scrolling"),
                        B(t),
                        (Ze[t.poptin_id].poptin_trigger.scroll_flag = !1);
                    }
                    setTimeout(function () {
                      Ze[t.poptin_id].poptin_trigger.scroll_flag;
                    }, 300);
                  });
                }
                if (
                  ("no" != t.display_after_page_click_number_active &&
                    jQ224(document).on("click tap", function () {
                      e(Ze[t.poptin_id].poptin_trigger.click_counter),
                        Ze[t.poptin_id].poptin_trigger.click_counter++,
                        Ze[t.poptin_id].poptin_trigger.click_counter ==
                          t.display_after_page_click_number_active &&
                          ((!Ze[t.poptin_id].poptin_trigger.poptin_active &&
                            Ze[t.poptin_id].poptin_trigger.shown) ||
                            (X(t) &&
                              E(t) &&
                              (e(
                                "load after " +
                                  t.display_after_page_click_number_active +
                                  " clicks page trigger"
                              ),
                              (Ze[t.poptin_id].poptin_trigger.trigger =
                                "after " +
                                t.display_after_page_click_number_active +
                                " clicks"),
                              (Gn.ifActive() && Gn.ifRelevent(t)) ||
                                ((Ze[t.poptin_id].poptin_trigger.poptin_active =
                                  !1),
                                B(t)),
                              (Ze[
                                t.poptin_id
                              ].poptin_trigger.click_counter = 0))));
                    }),
                  "no" != t.display_after_visit_page_active)
                )
                  if ("undefined" != typeof Storage) {
                    if (
                      "disactive" !=
                      window.sessionStorage.getItem(
                        "display_after_visit_page_active_" + t.poptin_id
                      )
                    ) {
                      if (
                        window.sessionStorage.getItem(
                          "page_url_" + t.poptin_id
                        ) != window.location.href
                      ) {
                        var l =
                          (window.sessionStorage.getItem(
                            "page_visit_" + t.poptin_id
                          )
                            ? Number(
                                window.sessionStorage.getItem(
                                  "page_visit_" + t.poptin_id
                                )
                              )
                            : 0) + 1;
                        window.sessionStorage.setItem(
                          "page_visit_" + t.poptin_id,
                          l
                        );
                      }
                      window.sessionStorage.getItem(
                        "page_visit_" + t.poptin_id
                      ) == t.display_after_visit_page_active &&
                      window.sessionStorage.getItem("page_url_" + t.poptin_id) !=
                        window.location.href
                        ? (e(
                            "load after " +
                              t.display_after_visit_page_active +
                              " clicks page trigger"
                          ),
                          X(t) &&
                            E(t) &&
                            ((Gn.ifActive() && Gn.ifRelevent(t)) ||
                              (B(t),
                              (Ze[t.poptin_id].poptin_trigger.poptin_active = !1),
                              window.sessionStorage.setItem(
                                "display_after_visit_page_active_" + t.poptin_id,
                                "disactive"
                              )),
                            window.sessionStorage.setItem(
                              "page_visit_" + t.poptin_id,
                              0
                            ),
                            window.sessionStorage.setItem(
                              "page_url_" + t.poptin_id,
                              window.location.href
                            )))
                        : window.sessionStorage.setItem(
                            "page_url_" + t.poptin_id,
                            window.location.href
                          );
                    }
                  } else e("Sorry! No Web Storage support..");
                if ("no" != t.display_after_inactive_seconds_active) {
                  !(function () {
                    var i,
                      e = !1;
                    function n() {
                      (e = !0),
                        X(t) &&
                          E(t) &&
                          (B(t),
                          (Ze[t.poptin_id].poptin_trigger.poptin_active = !1));
                    }
                    function o() {
                      clearTimeout(i),
                        (i = e
                          ? null
                          : setTimeout(
                              n,
                              1e3 * t.display_after_inactive_seconds_active
                            ));
                    }
                    (window.onload = o()),
                      (window.onmousemove = o),
                      (window.onmousedown = o),
                      (window.ontouchstart = o),
                      (window.onclick = o),
                      (window.onkeypress = o),
                      window.addEventListener("scroll", o, !0);
                  })();
                }
                t.shopify_cart_trigger_active &&
                  (yi("poptin_fetch_initial_shopify_cart") ||
                    jQ224
                      .ajax(
                        {
                          url: "/cart.js",
                          type: "get",
                          dataType: "json",
                          async: !1,
                        },
                        "json"
                      )
                      .done(function (t) {
                        var i = [];
                        jQ224.each(t.items, function (t, e) {
                          i.push(e.product_id);
                        }),
                          hi("poptin_fetch_initial_shopify_cart", !0),
                          hi("poptin_shopify_cart_product_id", i.join(","));
                      }),
                  (i = window),
                  "function" == typeof (n = window.fetch) &&
                    (i.fetch = function () {
                      var i = n.apply(this, arguments);
                      return (
                        i.then(function (i) {
                          [
                            "".concat(window.location.origin, "/cart/add.js"),
                            "".concat(window.location.origin, "/cart/add"),
                            "".concat(window.location.origin, "/cart/update.js"),
                            "".concat(window.location.origin, "/cart/update"),
                            "".concat(window.location.origin, "/cart/change.js"),
                            "".concat(window.location.origin, "/cart/change"),
                            "".concat(window.location.origin, "/cart/clear.js"),
                            "".concat(window.location.origin, "/cart/clear"),
                          ].includes(i.url) &&
                            i
                              .clone()
                              .json()
                              .then(function (e) {
                                P(i, t, "fetch", e);
                              });
                        }),
                        i
                      );
                    }),
                  S(t));
              },
              S = function (t) {
                e("Initialized XHR Listener");
                var i = new Object();
                "undefined" == typeof XMLHttpRequest &&
                  (XMLHttpRequest = function () {
                    try {
                      return new ActiveXObject("Msxml2.XMLHTTP.6.0");
                    } catch (t) {}
                    try {
                      return new ActiveXObject("Msxml2.XMLHTTP.3.0");
                    } catch (t) {}
                    try {
                      return new ActiveXObject("Microsoft.XMLHTTP");
                    } catch (t) {}
                    throw new Error(
                      "This browser does not support XMLHttpRequest."
                    );
                  }),
                  (i.tempOpen = XMLHttpRequest.prototype.open),
                  (i.tempSend = XMLHttpRequest.prototype.send),
                  (i.callback = function (i) {
                    var n = "";
                    i.hasOwnProperty("_url")
                      ? (n = i._url)
                      : i.hasOwnProperty("url") && (n = i.url),
                      [
                        "/cart/add.js",
                        "/cart/add",
                        "/cart/update.js",
                        "/cart/update",
                        "/cart/change.js",
                        "/cart/change",
                        "/cart/clear.js",
                        "/cart/clear",
                      ].includes(n) &&
                        (e("add-to-cart url found, call global listener"),
                        P(i, t, "xhr"));
                  }),
                  (XMLHttpRequest.prototype.open = function (t, e) {
                    if (!t) t = "";
                    if (!e) e = "";
                    i.tempOpen.apply(this, arguments),
                      (i.method = t),
                      (i.url = e),
                      "get" == t.toLowerCase() &&
                        ((i.data = e.split("?")), (i.data = i.data[1]));
                  }),
                  (XMLHttpRequest.prototype.send = function (t, e) {
                    if (!t) t = "";
                    if (!e) e = "";
                    i.tempSend.apply(this, arguments),
                      "post" == i.method.toLowerCase() && (i.data = t),
                      i.callback(this);
                  });
              },
              P = function (t, i, n) {
                var o =
                    arguments.length > 3 && void 0 !== arguments[3]
                      ? arguments[3]
                      : null,
                  p = [],
                  a = null,
                  r = null;
                if ("fetch" == n) {
                  (p = [
                    "".concat(window.location.origin, "/cart/add.js"),
                    "".concat(window.location.origin, "/cart/add"),
                    "".concat(window.location.origin, "/cart/update.js"),
                    "".concat(window.location.origin, "/cart/update"),
                    "".concat(window.location.origin, "/cart/change.js"),
                    "".concat(window.location.origin, "/cart/change"),
                    "".concat(window.location.origin, "/cart/clear.js"),
                    "".concat(window.location.origin, "/cart/clear"),
                  ]),
                    (a = t.url),
                    (r = o);
                  var s = 4;
                } else {
                  (p = [
                    "/cart/add.js",
                    "/cart/add",
                    "/cart/update.js",
                    "/cart/update",
                    "/cart/change.js",
                    "/cart/change",
                    "/cart/clear.js",
                    "/cart/clear",
                  ]),
                    e("request is"),
                    (a = t._url);
                  s = 0;
                }
                var d = setInterval(function () {
                  "xhr" == n && (s = t.readyState),
                    4 == s &&
                      (clearInterval(d),
                      p.includes(a) &&
                        "/cart.js" != a &&
                        jQ224
                          .ajax(
                            {
                              url: "/cart.js",
                              type: "get",
                              dataType: "json",
                              async: !1,
                            },
                            "json"
                          )
                          .done(function (e) {
                            if (
                              "added_product" == i.shopify_cart_trigger_action &&
                              null != i.shopify_cart_trigger_products
                            )
                              (a != p[0] && a != p[1]) ||
                                ("xhr" == n && (r = JSON.parse(t.response)),
                                ("any_product" ==
                                  i.shopify_cart_trigger_products ||
                                  i.shopify_cart_trigger_products
                                    .split(",")
                                    .includes(r.product_id.toString())) &&
                                  B(i));
                            else if (
                              "removed_product" == i.shopify_cart_trigger_action
                            ) {
                              if (a != p[0] && t != p[1]) {
                                var o = yi("poptin_shopify_cart_product_id")
                                    ? gi("poptin_shopify_cart_product_id").split(
                                        ","
                                      )
                                    : [],
                                  s = [];
                                if (
                                  (jQ224.each(e.items, function (t, i) {
                                    s.push(i.product_id.toString());
                                  }),
                                  "any_product" ==
                                    i.shopify_cart_trigger_products &&
                                    s.length < o.length)
                                )
                                  B(i);
                                else if (
                                  "empty_cart" ==
                                    i.shopify_cart_trigger_products &&
                                  e.item_count < 1
                                )
                                  B(i);
                                else {
                                  (o = yi("poptin_shopify_cart_product_id")
                                    ? gi("poptin_shopify_cart_product_id").split(
                                        ","
                                      )
                                    : []).length > 0 &&
                                    jQ224.each(o, function (t, e) {
                                      s.includes(e) ||
                                        (i.shopify_cart_trigger_products
                                          .split(",")
                                          .includes(e) &&
                                          B(i));
                                    });
                                }
                              }
                            } else if (
                              ("cart_item" == i.shopify_cart_trigger_action ||
                                "cart_value" == i.shopify_cart_trigger_action) &&
                              null != i.shopify_cart_trigger_cart_spec_filter &&
                              null != i.shopify_cart_trigger_cart_spec_value
                            ) {
                              var d = i.shopify_cart_trigger_cart_spec_filter,
                                l = i.shopify_cart_trigger_cart_spec_value,
                                _ =
                                  "cart_item" == i.shopify_cart_trigger_action
                                    ? e.item_count
                                    : e.total_price / 100;
                              switch (d) {
                                case "greater_than":
                                  _ > l && B(i);
                                  break;
                                case "equal":
                                  _ == l && B(i);
                                  break;
                                case "greater_than_or_equal":
                                  _ >= l && B(i);
                              }
                            }
                            s = [];
                            jQ224.each(e.items, function (t, i) {
                              s.push(i.product_id.toString());
                            }),
                              hi("poptin_shopify_cart_product_id", s.join(","));
                          })
                          .fail(function (t, i, n) {
                            e("Cart Error");
                          }));
                }, 100);
              },
              T = function () {
                var t = window.navigator.userAgent,
                  i = t.indexOf("MSIE");
                return i > 0
                  ? parseInt(t.substring(i + 5, t.indexOf(".", i)))
                  : navigator.userAgent.match(/Trident\/7\./)
                  ? 11
                  : 0;
              },
              I = function () {
                if (
                  (e("setPoptinStyle()"),
                  clearTimeout(poptinTimeDelayTrigger),
                  (poptinTimeDelayTrigger = null),
                  0 == jQ224("#setPoptinStyle").length &&
                    ((poptin_style =
                      '<style type="text/css" id="setPoptinStyle"> .poptin-popup .close-x-button{min-height: initial;background-color:initial;},  .draggable-container:not(.poptin-tab-container) p{font-family: "Open Sans Hebrew" !important;} .draggable-container form{display:initial;background-color:initial;width: initial;height: initial;top: initial;position: initial;}  .draggable-container:not(.poptin-tab-container) .draggable{border: none;}  .draggable-container:not(.poptin-tab-container) .inputs-container input{font-family: "Open Sans Hebrew";background-image:none;background-color:#ffffff;background:#ffffff;border-radius:0px;} .empty-field{border:2px solid red !important} .empty-field::-webkit-input-placeholder{color:red;} .empty-field::-moz-placeholder{color:red;}  .draggable-container:not(.poptin-tab-container) input,  .draggable-container:not(.poptin-tab-container) button{background-image: none;padding: 0px;margin: 0px;box-sizing: border-box;-webkit-box-sizing: border-box;-moz-box-sizing: border-box;} .draggable-container:not(.poptin-tab-container) p{box-sizing: initial;-webkit-box-sizing: initial;-moz-box-sizing: initial;} .poptin-popup a{text-decoration: none;} .poptin-popup a:hover{text-decoration: underline;}</style>'),
                    jQ224("head").append(poptin_style)),
                  !document.getElementById("poptin_animations"))
                ) {
                  var t = "";
                  Ai.indexOf("dev") >= 0
                    ? (0 == jQ224("#poptin_animations_preload").length &&
                        (t =
                          '<link rel="preload" id="poptin_animations_preload" as="style"  href="' +
                          Ei +
                          '/css/poptin-animations.css?ver=10">'),
                      0 == jQ224("#poptin_animations").length &&
                        (t +=
                          '<link rel="stylesheet" type="text/css" id="poptin_animations" href="' +
                          Ei +
                          '/css/poptin-animations.css?ver=10"  defer>'))
                    : (0 == jQ224("#poptin_animations_preload").length &&
                        (t =
                          '<link rel="preload" id="poptin_animations_preload" as="style"  href="' +
                          Li +
                          '/css/poptin-animations.css?ver=10">'),
                      0 == jQ224("#poptin_animations").length &&
                        (t +=
                          '<link rel="stylesheet" type="text/css" id="poptin_animations" href="' +
                          Li +
                          '/css/poptin-animations.css?ver=10"  defer>')),
                    t && jQ224("head").append(t);
                }
              },
              z = function (i, e) {
                return (
                  !i.js_filter.display_if_specific_js_active ||
                  (($js_array = (function () {
                    for (var i in ((array = []), this))
                      jQ224.inArray(t(this[i]), ["number", "string", "boolean"]) >
                        -1 && array.push({ key: i, value: String(this[i]) });
                    return array;
                  })()),
                  ($result_array = []),
                  $js_array.length > 0 &&
                    (jQ224.each(i.js_filter.display_if_specific_js, function (t) {
                      this.js_name_pair.length > 0 &&
                        this.js_value_pair.length > 0 &&
                        this.js_show_pair.length > 0 &&
                        (($js_name_role_pair = this.js_name_pair.split("|:|")),
                        ($js_name_role =
                          null != $js_name_role_pair[0]
                            ? $js_name_role_pair[0]
                            : ""),
                        ($js_name_value =
                          null != $js_name_role_pair[1]
                            ? $js_name_role_pair[1]
                            : ""),
                        ($js_value_role_pair = this.js_value_pair.split("|:|")),
                        ($js_value_role =
                          null != $js_value_role_pair[0]
                            ? $js_value_role_pair[0]
                            : ""),
                        ($js_value_value =
                          null != $js_value_role_pair[1]
                            ? $js_value_role_pair[1]
                            : ""),
                        ($js_show_value = this.js_show_pair),
                        "undefined" !==
                        window.Function("return typeof " + $js_name_value)()
                          ? $js_name_value.indexOf(".") > -1
                            ? (($js_name = !0),
                              ($js_value = M(
                                $js_value_role,
                                window.Function("return " + $js_name_value)(),
                                $js_value_value
                              )),
                              $result_array.push({
                                rule: $js_name && $js_value,
                                show: $js_show_value,
                              }))
                            : jQ224.inArray(
                                window.Function(
                                  "return typeof " + $js_name_value
                                )(),
                                ["number", "string", "boolean"]
                              ) > -1
                            ? jQ224.each($js_array, function (t) {
                                ($js_name = M(
                                  $js_name_role,
                                  this.key,
                                  $js_name_value
                                )),
                                  ($js_value = M(
                                    $js_value_role,
                                    this.value,
                                    $js_value_value
                                  )),
                                  $result_array.push({
                                    rule: $js_name && $js_value,
                                    show: $js_show_value,
                                  });
                              })
                            : "object" ==
                                window.Function("typeof " + $js_name_value)() &&
                              (($js_name = !0),
                              ($js_value = M(
                                $js_value_role,
                                JSON.stringify(
                                  window.Function(
                                    "return typeof " + $js_name_value
                                  )()
                                ),
                                $js_value_value
                              )),
                              $result_array.push({
                                rule: $js_name && $js_value,
                                show: $js_show_value,
                              }))
                          : jQ224.each($js_array, function (t) {
                              ($js_name = M(
                                $js_name_role,
                                this.key,
                                $js_name_value
                              )),
                                ($js_value = M(
                                  $js_value_role,
                                  this.value,
                                  $js_value_value
                                )),
                                $result_array.push({
                                  rule: $js_name && $js_value,
                                  show: $js_show_value,
                                });
                            }));
                    }),
                    $js_array.length > 0 &&
                      (($flag = !1),
                      ($dont_show = !1),
                      jQ224.each($result_array, function (t) {
                        if (this.rule && "dont_show" == this.show)
                          return ($flag = !1), ($dont_show = !0), !1;
                        $flag = !0;
                      }),
                      $dont_show ||
                        jQ224.each($result_array, function (t) {
                          if (this.rule && "show" == this.show)
                            return ($flag = !0), !1;
                          "show" == this.show && ($flag = !1);
                        }),
                      $flag)))
                );
              },
              D = function (t, i) {
                return (
                  !t.cookie_filter.display_if_specific_cookie_active ||
                  (($cookies_array = Kt()),
                  ($result_array = []),
                  $cookies_array.length > 0 &&
                    (jQ224.each(
                      t.cookie_filter.display_if_specific_cookie,
                      function (t) {
                        this.cookie_name_pair.length > 0 &&
                          this.cookie_value_pair.length > 0 &&
                          this.cookie_show_pair.length > 0 &&
                          (($cookie_name_role_pair =
                            this.cookie_name_pair.split("|:|")),
                          ($cookie_name_role =
                            null != $cookie_name_role_pair[0]
                              ? $cookie_name_role_pair[0]
                              : ""),
                          ($cookie_name_value =
                            null != $cookie_name_role_pair[1]
                              ? $cookie_name_role_pair[1]
                              : ""),
                          ($cookie_value_role_pair =
                            this.cookie_value_pair.split("|:|")),
                          ($cookie_value_role =
                            null != $cookie_value_role_pair[0]
                              ? $cookie_value_role_pair[0]
                              : ""),
                          ($cookie_value_value =
                            null != $cookie_value_role_pair[1]
                              ? $cookie_value_role_pair[1]
                              : ""),
                          ($cookie_show_value = this.cookie_show_pair),
                          jQ224.each($cookies_array, function (t) {
                            ($c_name = O(
                              $cookie_name_role,
                              this.key,
                              $cookie_name_value
                            )),
                              ($c_value = O(
                                $cookie_value_role,
                                this.value,
                                $cookie_value_value
                              )),
                              $result_array.push({
                                rule: $c_name && $c_value,
                                show: $cookie_show_value,
                              });
                          }));
                      }
                    ),
                    $cookies_array.length > 0 &&
                      (($flag = !1),
                      ($dont_show = !1),
                      jQ224.each($result_array, function (t) {
                        if (this.rule && "dont_show" == this.show)
                          return ($flag = !1), ($dont_show = !0), !1;
                        $flag = !0;
                      }),
                      $dont_show ||
                        jQ224.each($result_array, function (t) {
                          if (this.rule && "show" == this.show)
                            return ($flag = !0), !1;
                          "show" == this.show && ($flag = !1);
                        }),
                      $flag)))
                );
              },
              O = function (t, i, e) {
                if ((($flag = !1), "" != t))
                  switch (t) {
                    case "contain":
                      $flag = i.indexOf(e) > -1;
                      break;
                    case "exact":
                      $flag = i == e;
                      break;
                    case "start":
                      $flag = i.startsWith(e);
                      break;
                    case "end":
                      $flag = i.endsWith(e);
                      break;
                    case "greater_than":
                      $flag = parseFloat(i) > parseFloat(e);
                      break;
                    case "less_than":
                      $flag = parseFloat(i) < parseFloat(e);
                      break;
                    case "any_value":
                      $flag = !0;
                      break;
                    default:
                      return !0;
                  }
                return $flag;
              },
              M = function (t, i, e) {
                if (
                  (($flag = !1),
                  (i = "[]" == i ? "" : String(i).toLowerCase()),
                  (e = "[]" == e ? "" : String(e).toLowerCase()),
                  "" != t)
                )
                  switch (t) {
                    case "contain":
                      $flag = i.indexOf(e) > -1;
                      break;
                    case "exact":
                      $flag = i == e;
                      break;
                    case "start":
                      $flag = i.startsWith(e);
                      break;
                    case "end":
                      $flag = i.endsWith(e);
                      break;
                    case "greater_than":
                      $flag = parseFloat(i) > parseFloat(e);
                      break;
                    case "less_than":
                      $flag = parseFloat(i) < parseFloat(e);
                      break;
                    case "any_value":
                      $flag = !0;
                      break;
                    default:
                      return !0;
                  }
                return $flag;
              },
              A = function (t, i) {
                var n = !1,
                  o = !1;
                if (
                  (t.display && D(t) && z(t) && X(t) && (n = !0),
                  e("fshow:" + i),
                  t.is_teasers_on && t.display && n)
                )
                  if ((e("extractTeaser"), "" == t.poptin))
                    jQ224.when(jQ224.ajax(t.poptin_url)).then(
                      function (e, n, p) {
                        (t.poptin = e),
                          (poptin_data =
                            "" == t.poptin ? Ve[t.poptin_id].poptin : t.poptin);
                        var a = jQ224(t.poptin)
                            .find("#poptinDraggableContainer-tab")
                            .get(0)
                            .outerHTML.replace(
                              'id="poptinDraggableContainer-tab"',
                              'id="poptinDraggableContainer-tab" data-load-poptin="' +
                                t.poptin_id +
                                '"'
                            ),
                          r = t.stop_showing_to_converted_users,
                          s = gi("poptin_conversion_" + t.poptin_id),
                          d = !0;
                        if (
                          ((o = jQ224(t.poptin).find("#poptinMobileContainer")
                            .length
                            ? 1
                            : 0),
                          1 == r && "" != s && (d = !1),
                          0 == t.x_close_button &&
                            gi("poptin_c_p_o_x_c_" + t.poptin_id) &&
                            "all@display_everytime_everypage_5" == t.d_f_r &&
                            (d = !1),
                          landing_page_teaser_on &&
                            "undefined" != typeof poptin_landing_page &&
                            (d = !0),
                          rt(t) && d)
                        ) {
                          var l =
                              void 0 !== jQ224(t.poptin).attr("data-tabshow")
                                ? jQ224(t.poptin).attr("data-tabshow")
                                : "always",
                            _ = R(t);
                          1 == landing_page_teaser_on && (_ = !1),
                            "after_close" == l &&
                              1 == landing_page_teaser_on &&
                              (i = 1),
                            "always" == l
                              ? F(i, t, a, o)
                              : "before_show" != l || _
                              ? "after_close" == l &&
                                1 == i &&
                                (1 == landing_page_teaser_on
                                  ? y(t.poptin_id)
                                  : F(i, t, a, o))
                              : F(i, t, a, o);
                        }
                      },
                      function (t, i, e) {}
                    );
                  else {
                    poptin_data =
                      "" == t.poptin ? Ve[t.poptin_id].poptin : t.poptin;
                    var p = jQ224(t.poptin)
                        .find("#poptinDraggableContainer-tab")
                        .get(0)
                        .outerHTML.replace(
                          'id="poptinDraggableContainer-tab"',
                          'id="poptinDraggableContainer-tab" data-load-poptin="' +
                            t.poptin_id +
                            '"'
                        ),
                      a = t.stop_showing_to_converted_users,
                      r = gi("poptin_conversion_" + t.poptin_id),
                      s = !0;
                    if (
                      ((o = jQ224(t.poptin).find("#poptinMobileContainer").length
                        ? 1
                        : 0),
                      1 == a && "" != r && (s = !1),
                      0 == t.x_close_button &&
                        gi("poptin_c_p_o_x_c_" + t.poptin_id) &&
                        "all@display_everytime_everypage_5" == t.d_f_r &&
                        (s = !1),
                      landing_page_teaser_on &&
                        "undefined" != typeof poptin_landing_page &&
                        (s = !0),
                      rt(t) && s)
                    ) {
                      var d =
                          void 0 !== jQ224(t.poptin).attr("data-tabshow")
                            ? jQ224(t.poptin).attr("data-tabshow")
                            : "always",
                        l = R(t);
                      1 == landing_page_teaser_on && (l = !1),
                        "after_close" == d &&
                          1 == landing_page_teaser_on &&
                          (i = 1),
                        "always" == d
                          ? F(i, t, p, o)
                          : "before_show" != d || l
                          ? "after_close" == d && 1 == i && F(i, t, p, o)
                          : F(i, t, p, o);
                    }
                  }
              },
              F = function (t, i, e, n) {
                var o = (o = i.poptin).trim(),
                  p =
                    (jQ224(i.poptin).attr("data-tabshow"),
                    JSON.parse(jQ224(o).find(" #tab_variations_hidden").val())),
                  a = jQ224(o).attr("data-teaser-mobile-view"),
                  r =
                    (jQ224(o).attr("data-teaser-desktop-view"), p[a + "-mobile"]);
                void 0 === a &&
                  "mobile" != i.poptin_type &&
                  n &&
                  ((o = jQ224(o).get(1).outerHTML),
                  (r =
                    p[
                      (a = jQ224(o).attr("data-teaser-mobile-view")) + "-mobile"
                    ]));
                var s =
                  '#poptinDraggableContainer-tab[data-load-poptin="' +
                  i.poptin_id +
                  '"]';
                jQ224(o + "#poptinMobileContainer-tab").remove(),
                  jQ224(o + "#poptinDesktopContainer-tab").remove(),
                  sn && "mobile" != i.poptin_type && n
                    ? ((r = (r = r.replace(
                        'id="poptinDraggableContainer-tab"',
                        'id="poptinDraggableContainer-tab" data-load-poptin="' +
                          i.poptin_id +
                          '"'
                      )).replace(
                        'onclick="closeTabPoptinOnXclick();"',
                        "onclick=\"closeTabPoptinOnXclick(this,'" +
                          i.poptin_id +
                          "');\""
                      )),
                      jQ224(s).length > 0 && jQ224(s).remove(),
                      jQ224("body").append(r))
                    : ((e = e.replace(
                        'onclick="closeTabPoptinOnXclick();"',
                        "onclick=\"closeTabPoptinOnXclick(this,'" +
                          i.poptin_id +
                          "');\""
                      )),
                      jQ224(s).length > 0 && jQ224(s).remove(),
                      jQ224("body").append(e)),
                  L(i),
                  jQ224(s).css("cursor", "pointer"),
                  jQ224(s + " .handle-icon").remove(),
                  jQ224(s + " .pos-helper").remove(),
                  jQ224(s + " .handle-icon-wrapper").remove(),
                  jQ224(s).attr("data-load-poptin", i.poptin_id),
                  jQ224(s)
                    .find('[contenteditable="true"]')
                    .prop("contenteditable", !1);
                jQ224(s).attr("data-poptin-tablocation");
                jQ224(s)
                  .get(0)
                  .style.setProperty("position", "fixed", "important"),
                  jQ224(s)
                    .get(0)
                    .style.setProperty("z-index", "999998", "important"),
                  jQ224(s)
                    .find(".draggable")
                    .each(function (t) {
                      jQ224(this)
                        .get(0)
                        .style.setProperty("position", "absolute"),
                        jQ224(this).get(0).style.setProperty("cursor", "pointer"),
                        jQ224(this).find(".fr-box").css("position", "relative");
                    }),
                  jQ224(s).css("cursor", "pointer"),
                  jQ224(s).get(0).style.setProperty("display", "none"),
                  jQ224(s).get(0).style.setProperty("opacity", "1"),
                  setTimeout(function () {
                    jQ224(s + " #closeTabXButton").length > 0 &&
                      jQ224(s + " #closeTabXButton")
                        .get(0)
                        .style.setProperty("z-index", "99", "important"),
                      (function (t) {
                        var i =
                            '#poptinDraggableContainer-tab[data-load-poptin="' +
                            t.poptin_id +
                            '"]',
                          e = jQ224(i);
                        void 0 !== jQ224(t.poptin).attr("data-tabeffect") &&
                          (null != e.attr("data-poptin-animate") &&
                          "" != e.attr("data-poptin-animate")
                            ? setInterval(function () {
                                var t = e.attr("data-poptin-animate");
                                e.toggleClass("no-animated"),
                                  e.toggleClass("poptin__animated animate__" + t);
                              }, 3e3)
                            : jQ224(i)
                                .get(0)
                                .style.setProperty(
                                  "display",
                                  "block",
                                  "important"
                                ));
                      })(i),
                      N(i, "entry");
                  }, 500),
                  jQ224(
                    '#poptinDraggableContainer-tab[data-load-poptin="' +
                      i.poptin_id +
                      '"]:not(#closeTabXButton),#poptinDraggableContainer-tab[data-load-poptin="' +
                      i.poptin_id +
                      '"]:not(#poptinFormCloseText)'
                  ).on("click", function (t) {
                    if (
                      jQ224(
                        '#poptinDraggableContainer-tab[data-load-poptin="' +
                          i.poptin_id +
                          '"]'
                      ).is(":visible") &&
                      "close-icon" != jQ224(t.target).attr("class")
                    ) {
                      var e = jQ224(
                        ".poptin-popup[data-poptin-id=" + i.poptin_id + "]"
                      );
                      jQ224(
                        '#poptinDraggableContainer-tab[data-load-poptin="' +
                          i.poptin_id +
                          '"]'
                      ).removeClass("poptin__animated"),
                        0 == e.length ? y(i.poptin_id) : wi(i);
                    }
                  });
              },
              L = function (t) {
                var i =
                  '#poptinDraggableContainer-tab[data-load-poptin="' +
                  t.poptin_id +
                  '"]';
                jQ224(
                  "[data-load-poptin=" + t.poptin_id + "] .froala-image-wrapper"
                ).each(function () {
                  jQ224(this).find("img").css("width", jQ224(this).css("width")),
                    jQ224(this)
                      .find("img")
                      .css("height", jQ224(this).css("height")),
                    jQ224(this).find("img").attr("alt", t.poptin_name);
                }),
                  jQ224(i)
                    .find(
                      "p, span, div:not(.poptin-credit), button, label, ul, ol, li, img, strong, i"
                    )
                    .each(function (t) {
                      var i = "";
                      jQ224.each(this.attributes, function (t) {
                        if (
                          this.specified &&
                          "style" == this.name &&
                          ((i = (i = (i = (i = (i = this.value).replace(
                            / ?!important/g,
                            ""
                          )).replace(/\;base64/g, ":base64")).replace(
                            /\;/g,
                            " !important;"
                          )).replace(/\:base64/g, ";base64")),
                          -1 !== this.value.indexOf("font-family"))
                        )
                          try {
                            at(this.value);
                          } catch (t) {
                            e(t);
                          }
                      }),
                        jQ224(this).attr("style", i);
                    });
              },
              N = function (t, i) {
                var n = jQ224(
                  '#poptinDraggableContainer-tab[data-load-poptin="' +
                    t.poptin_id +
                    '"]'
                );
                if (n.length) {
                  n.removeClass("poptin__animated");
                  var o = "";
                  o =
                    "entry" == i
                      ? void 0 !== jQ224(n).attr("data-teaser-entry")
                        ? jQ224(n).attr("data-teaser-entry")
                        : "entry_effect-up"
                      : void 0 !== jQ224(n).attr("data-teaser-exit")
                      ? jQ224(n).attr("data-teaser-exit")
                      : "exit_effect-none";
                  var p = { effect: null, speed: "_default", delay: "-default" };
                  switch (o.split("-")[1]) {
                    case "none":
                      p.effect = "_none";
                      break;
                    case "up":
                      p.effect = "_slideInDown";
                      break;
                    case "down":
                      p.effect = "_slideInUp";
                      break;
                    case "left":
                      p.effect = "_slideInLeft";
                      break;
                    case "right":
                      p.effect = "_slideInRight";
                      break;
                    case "blind":
                    case "fold":
                      p.effect = "_flipInX";
                      break;
                    case "bounce":
                      p.effect = "_bounceIn";
                      break;
                    case "clip":
                    case "size":
                    case "scale-out":
                      p.effect = "_zoomIn";
                      break;
                    case "explode":
                    case "fade":
                      p.effect = "_fadeIn";
                      break;
                    case "highlight":
                      p.effect = "_tada";
                      break;
                    case "puff":
                      p.effect = "_pulse";
                      break;
                    case "pulsate":
                      p.effect = "_flash";
                      break;
                    case "scale":
                      p.effect = "_heartBeat";
                      break;
                    case "shake":
                      p.effect = "_shakeX";
                  }
                  if ("exit" == i) {
                    var a = p.effect;
                    (p.effect = a.replace("In", "Out")),
                      jQ224(n).addClass("poptin__animated"),
                      -1 !== p.effect.indexOf("slide") &&
                        jQ224(n).addClass("animate__faster"),
                      jQ224(n).addClass("animate_" + p.effect);
                  } else
                    try {
                      e("Entry Animate"),
                        jQ224(n).addClass("poptin-visible poptin__animated"),
                        -1 !== p.effect.indexOf("slide") &&
                          jQ224(n).addClass("animate__faster"),
                        jQ224(n).addClass("animate_" + p.effect),
                        jQ224(n).css({ display: "block" });
                    } catch (t) {
                      e("Entry Animate err3"),
                        jQ224(n).addClass("poptin-visible poptin__animated"),
                        -1 !== p.effect.indexOf("slide") &&
                          jQ224(n).addClass("animate__faster"),
                        jQ224(n).css({ display: "block" });
                    }
                  setTimeout(function () {
                    jQ224(n).removeClass("poptin__animated"),
                      jQ224(n).removeClass(function (t, i) {
                        return (i.match(/\banimate_\S+/g) || []).join(" ");
                      }),
                      "exit" == i && jQ224(n).css({ display: "none" }),
                      "entry" == i &&
                        jQ224(n).is(":hidden") &&
                        (jQ224(n).addClass("poptin__animated"),
                        e("animateClass.effect:" + p.effect),
                        jQ224(n).addClass("animate_" + p.effect),
                        jQ224(n).css({ display: "block" }));
                  }, 1e3);
                }
              },
              B = function (t, i) {
                function n() {
                  if (
                    (e("appendPoptin"),
                    e("appendPoptin:" + i),
                    e("poptin.poptin_type:" + t.poptin_type),
                    null != i)
                  )
                    if ("" == t.poptin && "" == Ve[t.poptin_id].poptin)
                      jQ224.when(jQ224.ajax(t.poptin_url)).then(
                        function (e, n, o) {
                          ((t.poptin = e), "embedded" == t.poptin_type)
                            ? jQ224(
                                ".poptin-embedded[data-id='" + t.poptin_id + "']"
                              ).append(t.poptin)
                            : jQ224("body").append(t.poptin);
                          (Ze[t.poptin_id].poptin = t.poptin),
                            (Ve[t.poptin_id].poptin = t.poptin),
                            W(t, i);
                        },
                        function (t, i, n) {
                          e(t);
                        }
                      );
                    else {
                      if (
                        ((poptin_data =
                          "" == t.poptin ? Ve[t.poptin_id].poptin : t.poptin),
                        "embedded" == t.poptin_type)
                      )
                        jQ224(
                          ".poptin-embedded[data-id='" + t.poptin_id + "']"
                        ).append(t.poptin);
                      else jQ224("body").append(t.poptin);
                      (Ze[t.poptin_id].poptin = t.poptin), W(t, i);
                    }
                  else
                    D(t) &&
                      z(t) &&
                      ("" == t.poptin && "" == Ve[t.poptin_id].poptin
                        ? jQ224.when(jQ224.ajax(t.poptin_url)).then(
                            function (e, n, o) {
                              (t.poptin = e),
                                (Ve[t.poptin_id].poptin = e),
                                Gn.checkQueue(t, i);
                            },
                            function (t, i, n) {
                              e(t);
                            }
                          )
                        : ((t.poptin =
                            "" == t.poptin ? Ve[t.poptin_id].poptin : t.poptin),
                          Gn.checkQueue(t, i)));
                }
                e("Adblock trigger:" + t.display_if_adblock_active),
                  "yes" == t.display_if_adblock_active
                    ? jQ224
                        .when(
                          jQ224.getScript("https://display.popt.in/js/adex.js")
                        )
                        .then(function () {})
                        .fail(n)
                    : n();
              },
              R = function (t) {
                return yi("poptin_o_a_d_" + t.poptin_id);
              },
              X = function (t) {
                if (
                  !t.engagement_with_other_poptin_filter_active ||
                  null == t.engagement_with_other_poptin_filter
                )
                  return !0;
                var i = t.engagement_with_other_poptin_filter.split("|"),
                  e = !!i && i[0],
                  n = !!i && i[1],
                  o = !!i && i[2],
                  p = !!i && i[3],
                  a = [];
                "embedded" == o
                  ? jQ224.each(Ve, function (i, e) {
                      t.poptin_id != this.poptin_id &&
                        "embedded" == this.poptin_type &&
                        ("any" != p
                          ? this.poptin_id == p && a.push(this)
                          : a.push(this));
                    })
                  : jQ224.each(Ve, function (i, e) {
                      t.poptin_id != this.poptin_id &&
                        "embedded" != this.poptin_type &&
                        ("any" != p
                          ? this.poptin_id == p && a.push(this)
                          : a.push(this));
                    });
                var r = !1;
                if (a.length > 0)
                  switch (n) {
                    case "seen_poptin":
                      jQ224.each(a, function (t, i) {
                        R(this) && (r = !0);
                      });
                      break;
                    case "not_seen":
                      jQ224.each(a, function (t, i) {
                        (function (t) {
                          return !yi("poptin_o_a_d_" + t.poptin_id);
                        })(this) && (r = !0);
                      });
                      break;
                    case "closed":
                      jQ224.each(a, function (t, i) {
                        (function (t) {
                          return yi("poptin_c_p_o_x_c_" + t.poptin_id);
                        })(this) && (r = !0);
                      });
                      break;
                    case "converted":
                      jQ224.each(a, function (t, i) {
                        (function (t) {
                          return yi("poptin_conversion_" + t.poptin_id);
                        })(this) && (r = !0);
                      });
                  }
                return r ? "show" == e : "show" != e;
              },
              E = function (t) {
                var i = !0;
                if (
                  !t.source_code_target_active ||
                  null == t.source_code_target_html
                )
                  return !0;
                var e = jQ224("html").html(),
                  n = (e = e.replace(
                    /(<!--.*?-->)|(<!--[\S\s]+?-->)|(<!--[\S\s]*?$)/g,
                    ""
                  ))
                    .replace(/\s/g, "")
                    .toLowerCase(),
                  o = t.source_code_target_html.replace(/\s/g, "").toLowerCase();
                return (
                  n.includes(o) && "show" == t.source_code_target_role
                    ? (i = !0)
                    : n.includes(o) && "dont_show" == t.source_code_target_role
                    ? (i = !1)
                    : n.includes(o) || "show" != t.source_code_target_role
                    ? n.includes(o) ||
                      "dont_show" != t.source_code_target_role ||
                      (i = !0)
                    : (i = !1),
                  i
                );
              },
              q = function (t) {
                var i = new RegExp("[?&]" + t + "=([^&#]*)", "i").exec(
                  window.location.href
                );
                return i ? decodeURI(i[1]) : null;
              },
              U = function (t) {
                var i = ".poptin-popup[data-poptin-id='" + t.poptin_id + "'] ",
                  n = jQ224(i).attr("data-pop-lang");
                if (jQ224(i).length) {
                  if (!cn) {
                    var o = new Array();
                    if (
                      ((p = jQ224(i).find(".dynamic-text-tags-input")).length &&
                        ((p = p.text()),
                        (o = null != p && "" != p ? JSON.parse(p) : new Array())),
                      Fn.push({ tag_input: "country", pre: 1, value: Ye }),
                      (o = o.concat(Fn)),
                      jQ224(o).each(function (t) {
                        var e,
                          p = o[t].tag_input,
                          a = o[t].pre;
                        "" != p &&
                          ("?" == (p = p.replace(/[()]/g, "")).substring(0, 1)
                            ? ((e =
                                null != (e = q(p.substring(1)))
                                  ? e
                                  : o[t].class_input),
                              (p = "\\" + p))
                            : a
                            ? ((e = o[t].value), 2 == a && (e = e[n || "en"]))
                            : (e = jQ224(o[t].class_input).text()),
                          (p = "{{" + p + "}}"),
                          jQ224(i)
                            .find(".froala-editor-text, .froala-editor-ticker")
                            .each(function () {
                              var t = new RegExp(p, "gm");
                              jQ224(this).find(".fr-marker").remove(),
                                jQ224(this).html(
                                  jQ224(this).html().replace(t, e)
                                );
                            }));
                      }),
                      (p = jQ224(i).find(".dynamic-input-tags-input")).length)
                    ) {
                      var p = p.text();
                      (o = null != p && "" != p ? JSON.parse(p) : new Array()),
                        jQ224(o).each(function (t) {
                          if ("" != (n = o[t].class_input)) {
                            var e,
                              n,
                              p = o[t].tag_input;
                            (e =
                              "?" == (n = n.replace(/[()]/g, "")).substring(0, 1)
                                ? null != (e = q(n.substring(1)))
                                  ? e
                                  : o[t].class_input
                                : jQ224(o[t].class_input).text()),
                              jQ224(i)
                                .find(
                                  "input#" +
                                    p +
                                    ", textarea#" +
                                    p +
                                    ", select#" +
                                    p
                                )
                                .val(e);
                            var a = jQ224(i).find('[name="' + p + '"]');
                            if (a.length)
                              if (
                                "radio" == a.attr("type") ||
                                "checkbox" == a.attr("type")
                              )
                                if ("poptinDesignInputTextFieldCheckbox" != p)
                                  !(r = jQ224(i).find(
                                    '[name="' + p + '"][value="' + e + '"]'
                                  )).length || (r.get(0).checked = !0);
                                else if (
                                  "poptinDesignInputTextFieldCheckbox" == p &&
                                  "true" == e
                                ) {
                                  var r;
                                  !(r = jQ224(i).find('[name="' + p + '"]'))
                                    .length || (r.get(0).checked = !0);
                                }
                          }
                        });
                    }
                    jQ224(i)
                      .find(".froala-image-wrapper")
                      .each(function () {
                        var t = jQ224(this).attr("data-selector");
                        null != t &&
                          "" != t &&
                          jQ224(this)
                            .find("img")
                            .attr("src", jQ224(t).attr("src"));
                      });
                  }
                  jQ224(
                    i +
                      " > div:not(.poptin-tab-container) .inputs-container select option[value='child-default']"
                  ).val(""),
                    jQ224(
                      i +
                        " > div:not(.poptin-tab-container) .inputs-container input[type='number']"
                    ).on("keydown", function (t) {
                      return (
                        !!(
                          8 === t.keyCode ||
                          9 === t.keyCode ||
                          46 === t.keyCode ||
                          (t.keyCode > 36) & (t.keyCode < 41)
                        ) || !isNaN(Number(t.key))
                      );
                    }),
                    jQ224(
                      i +
                        " > div:not(.poptin-tab-container) [name='poptinDesignInputTextFieldCheckbox'][data-action-validate='true']"
                    ).each(function () {
                      jQ224(this).prop("checked", !0), (this.checked = !0);
                    }),
                    jQ224(
                      i +
                        ".inputs-container input[name='poptinDesignInputTextFieldEmail'][data-action-validate='true']"
                    ).attr("type", "email"),
                    jQ224(
                      i +
                        ".inputs-container input[data-name='poptinDesignWebsiteField'][data-action-validate='true']"
                    ).attr("type", "url");
                  var a = jQ224(
                    i +
                      ".inputs-container input[name='poptinDesignInputTextFieldPhone'][data-action-validate='true'], " +
                      i +
                      ".draggable-container .inputs-container input[name='poptinDesignInputTextFieldPhone'][data-action-validate='basic']"
                  );
                  a.attr("pattern", "^[0-9-+s()]*$"),
                    a.attr("maxlength", "15"),
                    a.attr("minlength", "7");
                  var r =
                    "[data-poptin-id=" +
                    t.poptin_id +
                    "]  > div:not(.poptin-tab-container) .inputs-container .form-input-class.field-checkbox[data-action-required='true'] input";
                  jQ224(document).on("change", r, function () {
                    var t = jQ224(this).parent().parent();
                    t.find("input").is(":checked")
                      ? t.find("input").prop("required", !1)
                      : t
                          .find(".checkbox-child-field:first-child input")
                          .attr("required", !0)
                          .attr("required", !0);
                  }),
                    jQ224(
                      i +
                        " > div:not(.poptin-tab-container) .facebook-messanger-conversion-wrap"
                    ).remove();
                  var s = jQ224(
                    i +
                      ".inputs-container input[data-name='poptinDesignDateField']"
                  );
                  if (pn) {
                    if (s.length > 0) {
                      var d = document.createElement("link");
                      d.setAttribute("rel", "stylesheet"),
                        d.setAttribute("type", "text/css"),
                        d.setAttribute(
                          "href",
                          "https://cdn.jsdelivr.net/npm/pikaday/css/pikaday.css"
                        ),
                        document.head.appendChild(d);
                      var l = document.createElement("script");
                      (l.type = "text/javascript"),
                        (l.onload = function () {
                          for (var t = 0; t < s.length; t++)
                            new Pikaday({
                              field: s[t],
                              maxDate: new Date(),
                              yearRange: 80,
                              format: "DD/MM/YYYY",
                            });
                        }),
                        (l.src =
                          "https://cdn.jsdelivr.net/npm/pikaday/pikaday.js"),
                        document.body.appendChild(l);
                      var _ = document.createElement("script");
                      (_.type = "text/javascript"),
                        (_.src =
                          "https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.25.0/moment.min.js"),
                        document.body.appendChild(_),
                        setTimeout(function () {
                          jQ224(".pika-single").css("z-index", 9999999999);
                        }, 500);
                    }
                  } else
                    s.on("focus", function () {
                      "text" == jQ224(this).attr("type") &&
                        (jQ224(this).attr("type", "date"),
                        jQ224(this).focus().click());
                    }).on("blur", function () {
                      jQ224(this).attr(
                        "type",
                        "" == jQ224(this).val() ? "text" : "date"
                      );
                    });
                  var c = jQ224(
                    i +
                      " > div:not(.poptin-tab-container) .inputs-container select[data-action-search='true']"
                  );
                  jQ224(c).each(function () {
                    var t = jQ224(this);
                    jQ224(
                      i + " > div:not(.poptin-tab-container) .inputs-container"
                    ).css("z-index", "9999997"),
                      jQ224(
                        i +
                          " > div:not(.poptin-tab-container) .poptin-checkbox-wrapper"
                      ).css("z-index", "9999995"),
                      jQ224(
                        i +
                          " > div:not(.poptin-tab-container) #poptinFormSubmitText"
                      ).css("z-index", "9999996");
                    var e = t.get(0).id;
                    if (0 == document.querySelectorAll(".wrapper-" + e).length) {
                      var n = t.parent(),
                        o = G() ? "×—×™×¤×•×©..." : "Search...",
                        p = G()
                          ? "×œ× × ×ž×¦××• ×ª×•×¦××•×ª"
                          : "No results found";
                      n.prepend(
                        '<div class="poptin-custom-select wrapper-' +
                          e +
                          '"><input type="text" role="search" placeholder="' +
                          o +
                          '" class="poptin-custom-select-input" data-select="' +
                          e +
                          '" autocomplete="off" aria-label="' +
                          o +
                          '"><div class="poptin-opt-group"></div></div>'
                      );
                      var a = document.querySelectorAll(".wrapper-" + e)[0];
                      jQ224(t)
                        .find("option")
                        .each(function () {
                          "child-default" == this.value && (this.value = ""),
                            "" != this.value &&
                              jQ224(a)
                                .find(".poptin-opt-group")
                                .append(
                                  '<span class="poptin-custom-option ' +
                                    jQ224(this).attr("class") +
                                    '" data-value="' +
                                    this.value +
                                    '">' +
                                    this.innerText +
                                    "</span>"
                                );
                        }),
                        jQ224(a)
                          .find(".poptin-opt-group")
                          .append(
                            '<span class="poptin-custom-option no-result" data-value="">' +
                              p +
                              "</span>"
                          ),
                        jQ224(a)
                          .find("input")
                          .attr("style", jQ224(t).attr("style")),
                        jQ224(a)
                          .find(".poptin-opt-group")
                          .css({
                            "font-family": jQ224(t).css("font-family"),
                            "font-size": jQ224(t).css("font-size"),
                            color: jQ224(t).css("color"),
                            background: jQ224(t).css("background"),
                            direction: jQ224(t).css("direction"),
                            "text-align": jQ224(t).css("text-align"),
                          });
                    }
                  }),
                    jQ224(document).on(
                      "keyup",
                      ".poptin-custom-select-input",
                      function (t) {
                        var i = jQ224(t.target).attr("data-select"),
                          n = document.querySelectorAll(".wrapper-" + i)[0],
                          o = n.querySelectorAll("span.poptin-custom-option"),
                          p = o.length,
                          a = t.target.value.toUpperCase();
                        jQ224(n).find(".no-result, .poptin-custom-option").hide();
                        for (var r = 0; r < p; r++) {
                          var s = o[r].textContent || o[r].innerText,
                            d = !0;
                          try {
                            null != jQ224(n).attr("data-current-parent") &&
                              ((d = !1),
                              null != o[r].getAttribute("class") &&
                                o[r]
                                  .getAttribute("class")
                                  .indexOf("custom-opt-") > -1 &&
                                (d =
                                  o[r]
                                    .getAttribute("class")
                                    .split("custom-opt-")[1]
                                    .split(" ")[0] ==
                                  jQ224(n).attr("data-current-parent")));
                          } catch (t) {
                            e(t);
                          }
                          d &&
                            s.toUpperCase().indexOf(a) > -1 &&
                            (o[r].style.display = "");
                        }
                        jQ224(n).find(".poptin-custom-option").is(":visible") ||
                          jQ224(n).find(".no-result").css("display", "block");
                      }
                    ),
                    jQ224(document).on("click", function (t) {
                      var i = jQ224(t.target).parents(".form-input-class");
                      jQ224(t.target).hasClass("poptin-custom-select-input") ||
                        (jQ224(t.target).hasClass("poptin-custom-option")
                          ? (i
                              .find("select")
                              .val(jQ224(t.target).attr("data-value")),
                            jQ224(".form-input-class").removeClass("opened"))
                          : jQ224(".form-input-class").removeClass("opened")),
                        jQ224(".phone-error").remove();
                    }),
                    jQ224(document).on(
                      "focus",
                      ".poptin-custom-select-input",
                      function () {
                        jQ224(this)
                          .parents(".form-input-class")
                          .addClass("opened");
                      }
                    ),
                    jQ224(i + ".inputs-container")
                      .find("input, textarea, select")
                      .each(function () {
                        jQ224(this).attr("required") &&
                          jQ224(this).attr("aria-required", "true");
                      });
                }
              },
              H = function (t, i, e) {
                jQ224(e)
                  .find("audio, video")
                  .each(function () {
                    jQ224(this).attr(t) &&
                      (jQ224(this).prop(t, !1),
                      jQ224(this).attr(i, !0),
                      "autoplay" == i
                        ? jQ224(this).get(0).play()
                        : jQ224(this).get(0).pause());
                  });
              },
              W = function (t, i) {
                e("setPoptin poptinid: " + t.poptin_id);
                var n = "embedded" == t.poptin_type;
                if (n && "undefined" != typeof poptin_landing_page) {
                  var o = jQ224(window).height();
                  jQ224("body").css({ height: o - 20 });
                }
                var p = ".poptin-popup[data-poptin-id='" + t.poptin_id + "'] ",
                  a = jQ224(p).find(
                    ".draggable-container:not(.poptin-tab-container) .redirect-url-blank"
                  ),
                  r = a.length ? a.get(0).outerHTML : "";
                jQ224(p + "#poptinMobileContainer").length &&
                  (sn && "mobile" != t.poptin_type
                    ? (jQ224(p + "#poptinMobileContainer").length &&
                        jQ224(p + "#poptinDraggableContainer").replaceWith(
                          jQ224(p + "#poptinMobileContainer")
                            .get(0)
                            .outerHTML.replace(
                              /poptinMobileContainer/gm,
                              "poptinDraggableContainer"
                            )
                        ),
                      jQ224(p + "#poptinMobileThankYouScreen").length &&
                        jQ224(p + "#poptinThankYouScreen").replaceWith(
                          jQ224(p + "#poptinMobileThankYouScreen")
                            .get(0)
                            .outerHTML.replace(
                              /poptinMobileThankYouScreen/gm,
                              "poptinThankYouScreen"
                            )
                        ),
                      jQ224(p + "#poptinMobilePlayScreen").length &&
                        jQ224(p + "#poptinPlayScreen").replaceWith(
                          jQ224(p + "#poptinMobilePlayScreen")
                            .get(0)
                            .outerHTML.replace(
                              /poptinMobilePlayScreen/gm,
                              "poptinPlayScreen"
                            )
                        ),
                      jQ224(p + "#poptinMobileWinningScreen").length &&
                        jQ224(p + "#poptinWinningScreen").replaceWith(
                          jQ224(p + "#poptinMobileWinningScreen")
                            .get(0)
                            .outerHTML.replace(
                              /poptinMobileWinningScreen/gm,
                              "poptinWinningScreen"
                            )
                        ),
                      jQ224(p + "#poptinMobileLosingScreen").length &&
                        jQ224(p + "#poptinLosingScreen").replaceWith(
                          jQ224(p + "#poptinMobileLosingScreen")
                            .get(0)
                            .outerHTML.replace(
                              /poptinMobileLosingScreen/gm,
                              "poptinLosingScreen"
                            )
                        ),
                      jQ224(p + "#poptinMobileContainer").remove(),
                      jQ224(p + "#poptinMobileThankYouScreen").remove(),
                      jQ224(p + "#poptinMobilePlayScreen").remove(),
                      jQ224(p + "#poptinMobileWinningScreen").remove(),
                      jQ224(p + "#poptinMobileLosingScreen").remove(),
                      (t.poptin = jQ224(p).get(0).outerHTML))
                    : jQ224(
                        p +
                          "#poptinMobileContainer, #poptinMobileThankYouScreen, #poptinMobilePlayScreen, #poptinMobileWinningScreen, #poptinMobileLosingScreen"
                      ).remove()),
                  jQ224(p).append(r),
                  H("autoplay", "data-autoplay", p + "#poptinThankYouScreen");
                var s = Xt(t.poptin),
                  d = s.width,
                  l = s.height;
                null == i
                  ? ((poptin_width = d || Ze[t.poptin_id].poptin_size.width),
                    (poptin_height = l || Ze[t.poptin_id].poptin_size.height),
                    (Ze[t.poptin_id].poptin_area_flag = !1),
                    Et(t),
                    e("click undefined:" + i))
                  : (e("click true:" + i),
                    (poptin_width = d || He.width),
                    (poptin_height = l || He.height),
                    (poptin_area_flag = !1),
                    Et(t, !0)),
                  e("setPoptin", poptin_width, poptin_height),
                  jQ224(p + "#poptinThankYouScreen")
                    .addClass("poptin_thank_you_screen")
                    .removeClass("draggable-container"),
                  jQ224(p + "#poptinPlayScreen")
                    .addClass("poptin_play_screen")
                    .removeClass("draggable-container"),
                  jQ224(p + "#poptinWinningScreen")
                    .addClass("poptin_winning_screen")
                    .removeClass("draggable-container"),
                  jQ224(p + "#poptinLosingScreen")
                    .addClass("poptin_losing_screen")
                    .removeClass("draggable-container"),
                  "gamified" != t.poptin_type ||
                  ("format_1" != t.poptin_format &&
                    "format_2" != t.poptin_format &&
                    ("format_3" != t.poptin_format ||
                      t.design_properties.disable_post_play_screen))
                    ? jQ224(
                        p + ".draggable-container:not(.poptin-tab-container)"
                      ).html(
                        '<form method="POST" action="#" id="poptinFormSubmit' +
                          t.poptin_id +
                          '">' +
                          jQ224(
                            "[data-poptin-id=" +
                              t.poptin_id +
                              "] .draggable-container:not(.poptin-tab-container)"
                          ).html() +
                          "</form>"
                      )
                    : jQ224(p + ".poptin_play_screen").html(
                        '<form method="POST" action="#" id="poptinFormSubmit' +
                          t.poptin_id +
                          '">' +
                          jQ224(
                            "[data-poptin-id=" +
                              t.poptin_id +
                              "] .poptin_play_screen"
                          ).html() +
                          "</form>"
                      ),
                  jQ224(p + ".poptin_thank_you_screen").hide(),
                  jQ224(p + ".poptin_play_screen").hide(),
                  jQ224(p + ".poptin_winning_screen").hide(),
                  jQ224(p + ".poptin_losing_screen").hide(),
                  jQ224(p)
                    .find(".froala-editor-link")
                    .each(function () {
                      jQ224(this).parent().hasClass("poptin-form-link-button") ||
                        jQ224(this).on("click", function () {
                          setTimeout(function () {
                            closePoptin(t.poptin_id);
                          }, 500);
                        });
                    }),
                  U(t),
                  "gamified" == t.poptin_type &&
                    "format_3" == t.poptin_format &&
                    ((t.wheel_has_coupon = !!jQ224(
                      p + ".poptin_winning_screen"
                    ).find(".froala-editor-coupon").length),
                    (t.design_properties.disable_post_play_screen &&
                      0 !=
                        jQ224(
                          ".poptin-popup[data-poptin-id=" +
                            t.poptin_id +
                            "] #poptinDraggableContainer #poptinFormSubmitText"
                        ).length) ||
                      Pi(t)),
                  jQ224(p).find(".submitDarkColor").length &&
                    (jQ224(".froala-editor-button").each(function () {
                      jQ224(this)
                        .parent()
                        .attr("data-bg", jQ224(this).css("background-color"));
                    }),
                    jQ224("div.poptin-form-submit-button")
                      .mouseenter(function () {
                        jQ224(this)
                          .find(".froala-editor-button")
                          .css("background-color", "");
                      })
                      .mouseleave(function () {
                        jQ224(this).find(".froala-editor-button").length &&
                          jQ224(this)
                            .find(".froala-editor-button")
                            .get(0)
                            .style.setProperty(
                              "background-color",
                              jQ224(this).attr("data-bg"),
                              "important"
                            );
                      })),
                  jQ224(p).find(".closeDarkColor").length &&
                    (jQ224(".froala-editor-button").each(function () {
                      jQ224(this)
                        .parent()
                        .attr("data-bg", jQ224(this).css("background-color"));
                    }),
                    jQ224("div.poptin-form-close-button")
                      .mouseenter(function () {
                        jQ224(this)
                          .find(".froala-editor-button")
                          .css("background-color", "");
                      })
                      .mouseleave(function () {
                        jQ224(this).find(".froala-editor-button").length &&
                          jQ224(this)
                            .find(".froala-editor-button")
                            .get(0)
                            .style.setProperty(
                              "background-color",
                              jQ224(this).attr("data-bg"),
                              "important"
                            );
                      }));
                var _ = window.location.href,
                  c = window.location.pathname + window.location.search;
                (c = "/" == c[0] ? c.substr(1) : c),
                  jQ224(".redirect-url-blank").length > 0 &&
                    jQ224(".redirect-url-blank").each(function () {
                      var t = jQ224(this).attr("href");
                      if (t && _) {
                        var i = t.replace(
                          "{conversion_url}",
                          "conversion_url=" + encodeURI(_)
                        );
                        (i = (i = (i = i.replace(
                          "%7Bconversion_url%7D",
                          "conversion_url=" + encodeURI(_)
                        )).replace(
                          "{path_url}",
                          "path_url=" + encodeURI(c)
                        )).replace("%7Bpath_url%7D", "path_url=" + encodeURI(c))),
                          jQ224(this).attr("href", i);
                      }
                    }),
                  jQ224(".poptin-form-link-button").length > 0 &&
                    jQ224(".poptin-form-link-button").each(function () {
                      var t = jQ224(this).attr("id"),
                        i = t.substring(11, 10),
                        e =
                          "poptinForm2ndlinkbtnText" == t
                            ? "btn2ndDarkColor"
                            : "poptinForm3ndlinkbtnText" == t
                            ? "btn3rdDarkColor"
                            : "poptinForm4thlinkbtnText" == t
                            ? "btn4thDarkColor"
                            : "poptinForm5thlinkbtnText" == t
                            ? "btn5thDarkColor"
                            : "btn6thDarkColor",
                        n = jQ224(this).attr("data-btnurl");
                      if (n && _) {
                        var o = n.replace(
                          "{conversion_url}",
                          "conversion_url=" + encodeURI(_)
                        );
                        (o = (o = (o = o.replace(
                          "%7Bconversion_url%7D",
                          "conversion_url=" + encodeURI(_)
                        )).replace(
                          "{path_url}",
                          "path_url=" + encodeURI(c)
                        )).replace("%7Bpath_url%7D", "path_url=" + encodeURI(c))),
                          jQ224(this).attr("data-btnurl", o);
                      }
                      jQ224(p).find("." + e).length &&
                        (jQ224("#" + t + " .froala-editor-link").each(
                          function () {
                            jQ224(this)
                              .parent()
                              .attr(
                                "data-bg-" + i + "color",
                                jQ224(this).css("background-color")
                              );
                          }
                        ),
                        jQ224("#" + t)
                          .mouseenter(function () {
                            jQ224(this)
                              .find(".froala-editor-link")
                              .css("background-color", "");
                          })
                          .mouseleave(function () {
                            jQ224(this).find(".froala-editor-link").length &&
                              jQ224(this)
                                .find(".froala-editor-link")
                                .get(0)
                                .style.setProperty(
                                  "background-color",
                                  jQ224(this).attr("data-bg-" + i + "color"),
                                  "important"
                                );
                          }));
                    }),
                  ("lightbox" != t.poptin_type && "gamified" != t.poptin_type) ||
                    (null == i &&
                      ((Ze[t.poptin_id].poptin_size.height = l),
                      (Ze[t.poptin_id].poptin_size.width = d)),
                    (poptin_width = d || 800),
                    (poptin_height = l || 500),
                    ("format_3" != t.poptin_format &&
                      "format_9" != t.poptin_format) ||
                      poptin_height ||
                      (poptin_width = poptin_height)),
                  jQ224(
                    ".froala-editor-text, .froala-editor-ticker, .froala-editor-link"
                  ).each(function () {
                    var t = jQ224(this)
                      .get(0)
                      .innerText.replace(/&nbsp;/gi, " ");
                    jQ224(this).parents(".draggable").attr("aria-label", t);
                  }),
                  jQ224(".froala-editor-button").each(function () {
                    var t = jQ224(this)
                        .get(0)
                        .innerText.replace(/&nbsp;/gi, " "),
                      i = jQ224(this).parent().find("input");
                    i.length
                      ? i.attr("aria-label", t)
                      : jQ224(this).parent().attr("aria-label", t);
                  }),
                  jQ224(p)
                    .attr("data-poptin-type", t.poptin_type)
                    .attr("data-poptin-format", t.poptin_format)
                    .attr(
                      "data-poptin-type-format",
                      t.poptin_type + "_" + t.poptin_format
                    ),
                  t.design_properties &&
                    jQ224(p).attr(
                      "data-poptin-location",
                      t.design_properties.poptin_location
                    ),
                  jQ224(p).addClass("poptin-live"),
                  jQ224(p).css({
                    display: "none",
                    margin: "0px auto",
                    transform: "translate(0,0)",
                    transition: "transform .3s ease-out",
                    "min-width": poptin_width + "px",
                    "max-width": poptin_width + "px",
                    width: poptin_width + "px",
                    "min-height": poptin_height + "px",
                    "max-height": poptin_height + "px",
                    height: poptin_height + "px",
                    "z-index": "999999999999999",
                    position: n ? "absolute" : "fixed",
                    overflow: "visible",
                    left: "0px",
                    top: "0px",
                    bottom: "0px",
                    right: "0px",
                    "line-height": "normal",
                    "transform-origin": "bottom",
                  }),
                  jQ224(
                    p + ".draggable-container:not(.poptin-tab-container)"
                  ).css({
                    width: poptin_width + "px",
                    "background-clip": "padding-box",
                  }),
                  jQ224(p + ".alternative-background").css(
                    "box-shadow",
                    "0 3px 12px rgba(0,0,0,.5)"
                  ),
                  jQ224(
                    ".poptin-popup.no-box-shadow .alternative-background"
                  ).css("box-shadow", ""),
                  jQ224(p + " #poptinDraggableContainer .alternative-background")
                    .length &&
                    !jQ224(p + " #poptinThankYouScreen .alternative-background")
                      .length &&
                    jQ224(p + " #poptinThankYouScreen").prepend(
                      jQ224(
                        p + " #poptinDraggableContainer .alternative-background"
                      ).clone()
                    ),
                  jQ224(p + " #poptinMobileContainer .alternative-background")
                    .length &&
                    !jQ224(
                      p + " #poptinMobileThankYouScreen .alternative-background"
                    ).length &&
                    jQ224(p + " #poptinMobileThankYouScreen").prepend(
                      jQ224(
                        p + " #poptinMobileContainer .alternative-background"
                      ).clone()
                    );
                var f =
                  p +
                  ".close-icon, .poptin-popup[data-poptin-id=" +
                  t.poptin_id +
                  "] #closeXButton, .poptin-popup[data-poptin-id=" +
                  t.poptin_id +
                  "] #poptinFormCloseText";
                jQ224(f)
                  .attr("title", G() ? "×¡×’×•×¨" : "Close")
                  .attr("data-title", G() ? "×¡×’×•×¨" : "Close"),
                  jQ224(f).mouseenter(function (t) {
                    jQ224(f).attr("title", "");
                  }),
                  jQ224(f).mouseleave(function (t) {
                    jQ224(f).attr("title", jQ224(f).attr("data-title"));
                  });
                var u = p + "#poptinFormSubmitText";
                if (
                  (jQ224(u)
                    .attr("title", G() ? "×©×œ×—" : "Submit")
                    .attr("data-title", G() ? "×©×œ×—" : "Submit"),
                  jQ224(u)
                    .find("#poptinFormSubmitButton")
                    .val(G() ? "×©×œ×—" : "Submit"),
                  jQ224(u).mouseenter(function (t) {
                    jQ224(u).attr("title", "");
                  }),
                  jQ224(u).mouseleave(function (t) {
                    jQ224(u).attr("title", jQ224(u).attr("data-title"));
                  }),
                  jQ224(".redirect-url-blank").each(function () {
                    jQ224(this).html(jQ224(this).attr("href"));
                  }),
                  "embedded" == t.poptin_type)
                ) {
                  var h = jQ224(p).parent();
                  (0 != jQ224(p).parent().height() &&
                    h.css("height") != h.css("line-height")) ||
                    (jQ224(p)
                      .parent()
                      .css({ height: poptin_height + "px" }),
                    jQ224(
                      p + "#closeXButton, " + p + "#closeSkipButton"
                    ).remove(),
                    jQ224(p).css("transform", "scale(1, 0)"));
                }
                if (
                  (jQ224(p + ".froala-image-wrapper").each(function () {
                    var t = jQ224(this).find("a");
                    if (t.length) {
                      var i = jQ224(this).find(".froala-img-overlay").clone();
                      jQ224(this).find(".froala-img-overlay").remove(),
                        t.prepend(i);
                    }
                  }),
                  (("social" == t.poptin_type &&
                    ("format_3" == t.poptin_format ||
                      "format_6" == t.poptin_format)) ||
                    ("sside" == t.poptin_type &&
                      "format_19" == t.poptin_format)) &&
                    jQ224(".poptin-credit").css(
                      (function (t, i, e) {
                        return (
                          i in t
                            ? Object.defineProperty(t, i, {
                                value: e,
                                enumerable: !0,
                                configurable: !0,
                                writable: !0,
                              })
                            : (t[i] = e),
                          t
                        );
                      })({ bottom: "auto" }, "bottom", "")
                    ),
                  "mobile" == t.poptin_type &&
                    "format_6" == t.poptin_format &&
                    jQ224(
                      "[data-poptin-id=" +
                        t.poptin_id +
                        "] .draggable-container:not(.poptin-tab-container) .draggable:not(#closeXButton)"
                    ).addClass("poptin-form-submit-button"),
                  null != t.design_properties &&
                    ("closing_options-x" ==
                    t.design_properties.poptin_design_close_options_type
                      ? jQ224(p).find('[id="closeSkipButton"]').remove()
                      : "closing_options-button" ==
                        t.design_properties.poptin_design_close_options_type
                      ? jQ224(p).find('[id="closeXButton"]').remove()
                      : jQ224(p)
                          .find('[id="closeXButton"], [id="closeSkipButton"]')
                          .remove()),
                  jQ224(p)
                    .find('[id="closeXButton"], [id="closeSkipButton"]')
                    .each(function () {
                      if (
                        ((this_close_icon = jQ224(this).find(".close-icon")),
                        (this_close_icon_width = parseInt(
                          this_close_icon.css("width")
                        )),
                        !this_close_icon.hasClass("updated") &&
                          32 == this_close_icon_width)
                      ) {
                        (this_close_icon_width = 44),
                          this_close_icon.addClass("updated");
                        var t = this_close_icon_width + "px",
                          i = {
                            width: t,
                            height: t,
                            "line-height": t,
                            "font-size": t,
                          };
                        this_close_icon.css(i),
                          jQ224(this).css(i),
                          parseInt(jQ224(this).css("left")) +
                            this_close_icon_width >
                            poptin_width &&
                            jQ224(this).css(
                              "left",
                              poptin_width - this_close_icon_width + "px"
                            );
                      }
                    }),
                  "bar" == t.poptin_type &&
                    jQ224(p).css({
                      width: "1920px",
                      "max-width": "1920px",
                      height: jQ224(p + "#poptinDraggableContainer").height(),
                      "max-height": jQ224(
                        p + "#poptinDraggableContainer"
                      ).height(),
                    }),
                  (rn || sn) && jQ224(p).addClass("clean-timer"),
                  sn &&
                    jQ224(p).length &&
                    jQ224(p).html(
                      jQ224(p)
                        .html()
                        .replace(/(web.whatsapp.com)/g, "api.whatsapp.com")
                    ),
                  t.poptin_type in bn &&
                    bn[t.poptin_type] >= parseInt(t.poptin_format.split("_")[1]))
                )
                  jQ224(p).addClass("old-popup").removeClass("new-popup");
                else {
                  jQ224(p).addClass("new-popup").removeClass("old-popup");
                  var g = jQ224(p)
                    .find("#poptinDraggableContainer")
                    .attr("data-lang");
                  (!g || "he" != g) && "en" == _n
                    ? (jQ224(p).css("font-family", "Poppins"),
                      0 == jQ224("#poptin_poppins_font_preload").length &&
                        jQ224("head").append(
                          '<link rel="preload" id="poptin_poppins_font_preload" as="style" href="https://fonts.popt.in?family=Poppins&display=swap">'
                        ),
                      0 == jQ224("#poptin_poppins_font_link").length &&
                        jQ224("head").append(
                          '<link rel="stylesheet" id="poptin_poppins_font_link" href="https://fonts.popt.in?family=Poppins&display=swap">'
                        ))
                    : (jQ224(p).css("font-family", "Open Sans Hebrew"),
                      0 == jQ224("#poptin_opensanshebrew_font_preload").length &&
                        jQ224("head").append(
                          '<link rel="preload" id="poptin_opensanshebrew_font_preload" as="style" href="https://fonts.popt.in/?family=Open%20Sans%20Hebrew&display=swap">'
                        ),
                      0 == jQ224("#poptin_opensanshebrew_font_link").length &&
                        jQ224("head").append(
                          '<link rel="stylesheet" id="poptin_opensanshebrew_font_link" href="https://fonts.popt.in/?family=Open%20Sans%20Hebrew&display=swap">'
                        ));
                }
                if (
                  (jQ224(".poptin-popup #closeXButton").css({ "z-index": "" }),
                  jQ224(".poptin-popup.old-popup #closeXButton").css({
                    left: "auto",
                    right: "auto",
                  }),
                  jQ224(".no-show-icon").css("position", "relative"),
                  jQ224(".flip .no-show-icon").css("position", "absolute"),
                  null != Ke[t.poptin_type + "_" + t.poptin_format] &&
                    "vertical" ==
                      Ke[t.poptin_type + "_" + t.poptin_format].type &&
                    jQ224(
                      p + ".inputs-container input:not([type='checkbox'])"
                    ).css("width", ""),
                  ("lightbox" != t.poptin_type && "gamified" != t.poptin_type) ||
                    ((this_pop_width = jQ224(
                      p + ".draggable-container:not(.poptin-tab-container)"
                    ).attr("data-width")),
                    (null != this_pop_width && "" != this_pop_width) ||
                      (jQ224(p).css({
                        right: "0",
                        left: "0",
                        top: (jQ224(window).height() - 500) / 2,
                      }),
                      jQ224(
                        ".poptin-popup[data-poptin-id=" +
                          t.poptin_id +
                          "], .poptin-popup[data-poptin-id=" +
                          t.poptin_id +
                          "] .draggable-container:not(.poptin-tab-container)"
                      ).css("width", 800),
                      jQ224(
                        ".poptin-popup[data-poptin-id=" +
                          t.poptin_id +
                          "], .poptin-popup[data-poptin-id=" +
                          t.poptin_id +
                          "] .draggable-container:not(.poptin-tab-container)"
                      ).css("height", 500))),
                  "on" == t.design_properties.field_checkbox_required &&
                    jQ224(
                      "[data-poptin-id=" +
                        t.poptin_id +
                        '] input[name="poptinDesignInputTextFieldCheckbox"]'
                    ).prop("required", !0),
                  "on" == t.design_properties.field_checkbox_default_marked &&
                    jQ224(
                      "[data-poptin-id=" +
                        t.poptin_id +
                        '] input[name="poptinDesignInputTextFieldCheckbox"]'
                    ).prop("checked", !0),
                  jQ224(".poptin-form-close-button").click(function () {
                    var i = jQ224(this).data(),
                      e = jQ224(this)
                        .parents(".poptin-popup")
                        .attr("data-poptin-id");
                    if ((ci(e), i.countConversion && !0 === i.countConversion)) {
                      var n = jQ224(this).attr("id");
                      "poptinFormCloseText" === n &&
                        Tt(t, null, (n = "close_btn"), this);
                    } else if (i.linkUrl && 1 == i.linkUrl)
                      closePoptin(e, !0),
                        i.btnurl &&
                          (-1 == i.btnurl.indexOf("http://") &&
                            -1 == i.btnurl.indexOf("https://") &&
                            (i.btnurl = "//" + i.btnurl),
                          i.btntarget
                            ? window.open(i.btnurl, "_blank")
                            : (window.location.href = i.btnurl));
                    else if (i.launchPoptin && 1 == i.launchPoptin) {
                      closePoptin(e, !0);
                      var o = { redirectFromBtns: !0 };
                      (o.poptin_from = e),
                        (o.poptin_to = i.launchPoptinId),
                        i.launchPoptinId && Nt(o);
                    } else closePoptin(e);
                  }),
                  jQ224(".poptin-form-close-button").on("keydown", function (t) {
                    (32 !== t.keyCode && 13 !== t.keyCode) ||
                      jQ224(t.target).click();
                  }),
                  (timer_container = jQ224(".timer-container")),
                  timer_container.css({ position: "" }),
                  timer_container &&
                    timer_container.attr("style") &&
                    -1 == timer_container.attr("style").indexOf("left") &&
                    ((points_count = 0),
                    jQ224(".timer-points").each(function () {
                      jQ224(this).is(":visible") && points_count++;
                    }),
                    (timer_left = "260px"),
                    points_count > 1 && (timer_left = "114px"),
                    timer_container.css({ left: timer_left })),
                  Y(t),
                  "lightbox" != t.poptin_type ||
                    ("format_3" != t.poptin_format &&
                      "format_9" != t.poptin_format))
                ) {
                  var m = jQ224(
                    "[data-poptin-id=" +
                      t.poptin_id +
                      "] .draggable-container:not(.poptin-tab-container)"
                  );
                  jQ224(
                    "[data-poptin-id=" +
                      t.poptin_id +
                      "] .poptin_thank_you_screen:not('.edited')"
                  ).css({
                    height: m.css("height"),
                    "background-image": m.css("background-image"),
                    "background-size": m.css("background-size"),
                    "background-color": m.css("background-color"),
                    background:
                      ("none" != m.css("background-image")
                        ? m.css("background-image")
                        : "") +
                      " " +
                      m.css("background-color"),
                  }),
                    jQ224(
                      "[data-poptin-id=" +
                        t.poptin_id +
                        "] .poptin_play_screen:not('.edited')"
                    ).css({
                      height: m.css("height"),
                      "background-image": m.css("background-image"),
                      "background-size": m.css("background-size"),
                      "background-color": m.css("background-color"),
                      background:
                        ("none" != m.css("background-image")
                          ? m.css("background-image")
                          : "") +
                        " " +
                        m.css("background-color"),
                    }),
                    jQ224(
                      "[data-poptin-id=" +
                        t.poptin_id +
                        "] .poptin_winning_screen:not('.edited')"
                    ).css({
                      height: m.css("height"),
                      "background-image": m.css("background-image"),
                      "background-size": m.css("background-size"),
                      "background-color": m.css("background-color"),
                      background:
                        ("none" != m.css("background-image")
                          ? m.css("background-image")
                          : "") +
                        " " +
                        m.css("background-color"),
                    }),
                    jQ224(
                      "[data-poptin-id=" +
                        t.poptin_id +
                        "] .poptin_losing_screen:not('.edited')"
                    ).css({
                      height: m.css("height"),
                      "background-image": m.css("background-image"),
                      "background-size": m.css("background-size"),
                      "background-color": m.css("background-color"),
                      background:
                        ("none" != m.css("background-image")
                          ? m.css("background-image")
                          : "") +
                        " " +
                        m.css("background-color"),
                    }),
                    m.css({
                      background:
                        ("none" != m.css("background-image")
                          ? m.css("background-image")
                          : "") +
                        " " +
                        m.css("background-color"),
                    });
                } else
                  jQ224(
                    "[data-poptin-id=" +
                      t.poptin_id +
                      "] .poptin_thank_you_screen"
                  ).prepend(
                    jQ224(
                      "[data-poptin-id=" + t.poptin_id + "] #liteboxFormat3Circle"
                    ).clone(!0)
                  );
                if (
                  (jQ224(
                    ".poptin-form-submit-button *, .poptin-form-close-button *, [data-poptin-id=" +
                      t.poptin_id +
                      "] .o-close, [data-poptin-id=" +
                      t.poptin_id +
                      "] .o-close *"
                  ).css("cursor", "pointer"),
                  "mobile" != t.poptin_type ||
                    ("format_1" != t.poptin_format &&
                      "format_6" != t.poptin_format) ||
                    ((poptin_style =
                      '<style type="text/css">.draggable-container:not(.poptin-tab-container) .fa-phone-square:before{color:' +
                      jQ224(
                        "[data-poptin-id=" + t.poptin_id + "] .fa-phone-square"
                      ).css("color") +
                      " !important}</style>"),
                    jQ224("body").append(poptin_style)),
                  ot(t, i),
                  (direction =
                    t.design_properties.poptin_design_entry_effect.split("-")[1]),
                  !parseInt(t.design_properties.poptin_design_content_lock))
                )
                  if (
                    (null != t.design_properties.poptin_design_auto_close &&
                      setTimeout(function () {
                        e(
                          "close poptin auto after " +
                            t.design_properties.poptin_design_auto_close_sec +
                            " seconds"
                        ),
                          (Ze[t.poptin_id].poptin_trigger.close_trigger =
                            "auto_close"),
                          closePoptin(t.poptin_id);
                      }, 1e3 *
                        parseInt(
                          t.design_properties.poptin_design_auto_close_sec
                        )),
                    parseInt(
                      t.design_properties.poptin_design_close_on_screen_click
                    ) &&
                      (jQ224(p)
                        .on("mouseenter", function (e) {
                          null == i
                            ? (Ze[t.poptin_id].poptin_trigger ||
                                (Ze[t.poptin_id].poptin_trigger = {}),
                              (Ze[t.poptin_id].poptin_trigger.poptin_area_flag =
                                !0))
                            : (poptin_area_flag = !0);
                        })
                        .on("mouseleave", function (e) {
                          null == i
                            ? (Ze[t.poptin_id].poptin_trigger ||
                                (Ze[t.poptin_id].poptin_trigger = {}),
                              (Ze[t.poptin_id].poptin_trigger.poptin_area_flag =
                                !1))
                            : (poptin_area_flag = !1);
                        }),
                      jQ224(document).click(function (n) {
                        if (
                          "lightbox" != t.poptin_type &&
                          "gamified" != t.poptin_type
                        )
                          jQ224(n.target).closest(
                            ".poptin-popup[data-poptin-id=" + t.poptin_id + "]"
                          ).length ||
                            (i
                              ? poptin_area_flag
                              : Ze[t.poptin_id].poptin_area_flag) ||
                            (jQ224(p).is(":visible") &&
                              (e(
                                "close poptin poptin_design_close_on_screen_click1"
                              ),
                              (Ze[t.poptin_id].poptin_trigger.close_trigger =
                                "bg_click"),
                              closePoptin(t.poptin_id)));
                        else {
                          var o = jQ224(n.target)
                            .closest(".poptin-popup")
                            .attr("data-poptin-id");
                          jQ224(n.target).closest(
                            ".poptin-popup[data-poptin-id=" + t.poptin_id + "]"
                          ).length ||
                            (o != t.poptin_id && void 0 !== o) ||
                            (null == i
                              ? Ze[t.poptin_id].poptin_trigger.poptin_area_flag
                              : poptin_area_flag) ||
                            (jQ224(
                              ".poptin-popup[data-poptin-id=" + t.poptin_id + "]"
                            ).is(":visible") &&
                              (e(
                                "close poptin" +
                                  t.poptin_id +
                                  " poptin_design_close_on_screen_click2"
                              ),
                              (Ze[t.poptin_id].poptin_trigger.close_trigger =
                                "bg_click"),
                              closePoptin(t.poptin_id)));
                        }
                      })),
                    "closing_options-" !=
                      t.design_properties.poptin_design_close_options_type)
                  )
                    if (
                      ("closing_options-x" ==
                      t.design_properties.poptin_design_close_options_type
                        ? (jQ224(
                            "[data-poptin-id=" +
                              t.poptin_id +
                              "] #closeSkipButton"
                          ).remove(),
                          t.poptin_type in bn &&
                          bn[t.poptin_type] >=
                            parseInt(t.poptin_format.split("_")[1])
                            ? jQ224(
                                "[data-poptin-id=" +
                                  t.poptin_id +
                                  "] .draggable-container:not(.poptin-tab-container), .poptin-popup[data-poptin-id=" +
                                  t.poptin_id +
                                  "] .poptin_thank_you_screen, .poptin-popup[data-poptin-id=" +
                                  t.poptin_id +
                                  "] .poptin_play_screen, .poptin-popup[data-poptin-id=" +
                                  t.poptin_id +
                                  "] .poptin_winning_screen, .poptin-popup[data-poptin-id=" +
                                  t.poptin_id +
                                  "] .poptin_losing_screen"
                              ).prepend(Hi)
                            : jQ224(document).on(
                                "click",
                                '[data-poptin-id="' +
                                  t.poptin_id +
                                  '"] #closeXButton',
                                function () {
                                  closePoptinOnXclick(jQ224(this).get(0));
                                }
                              ),
                          null ==
                            t.design_properties.poptin_design_show_x_comment ||
                            sn ||
                            (e(
                              "show poptin x comment: " +
                                t.design_properties.poptin_design_show_x_comment
                            ),
                            t.design_properties.poptin_design_show_x_comment
                              .length >= 1 &&
                              (jQ224(
                                "[data-poptin-id=" +
                                  t.poptin_id +
                                  "] .draggable-container:not(.poptin-tab-container)"
                              ).prepend(Gi),
                              ($note = jQ224(
                                "[data-poptin-id=" +
                                  t.poptin_id +
                                  "] .close-button-note"
                              )),
                              $note.text(
                                t.design_properties.poptin_design_show_x_comment
                              ),
                              (t.design_properties.poptin_location.indexOf(
                                "right"
                              ) > -1 ||
                                "bar" == t.poptin_type) &&
                                jQ224(
                                  "[data-poptin-id=" +
                                    t.poptin_id +
                                    "] .close-button-note"
                                ).css("right", "0px"),
                              t.design_properties.poptin_location.indexOf("top") >
                              -1
                                ? jQ224(
                                    "[data-poptin-id=" +
                                      t.poptin_id +
                                      "] .close-button-note"
                                  ).css("top", "0px")
                                : setTimeout(function () {
                                    ($margin =
                                      -1 * parseInt($note.css("top")) >=
                                      $note.height()
                                        ? $note.css("top")
                                        : "-" +
                                          ($note.height() +
                                            (-1 * parseInt($note.css("top"))) /
                                              1.5) +
                                          "px"),
                                      $note.css("top", "-65px");
                                  }, 100),
                              Z(t))))
                        : "closing_options-button" ==
                            t.design_properties
                              .poptin_design_close_options_type &&
                          (jQ224(
                            "[data-poptin-id=" + t.poptin_id + "] #closeXButton"
                          ).remove(),
                          t.poptin_type in bn &&
                          bn[t.poptin_type] >=
                            parseInt(t.poptin_format.split("_")[1])
                            ? null !=
                              t.design_properties.poptin_design_show_x_comment
                              ? jQ224(
                                  "[data-poptin-id=" +
                                    t.poptin_id +
                                    "] .draggable-container:not(.poptin-tab-container), .poptin-popup[data-poptin-id=" +
                                    t.poptin_id +
                                    "] .poptin_thank_you_screen, .poptin-popup[data-poptin-id=" +
                                    t.poptin_id +
                                    "] .poptin_play_screen, .poptin-popup[data-poptin-id=" +
                                    t.poptin_id +
                                    "] .poptin_winning_screen, .poptin-popup[data-poptin-id=" +
                                    t.poptin_id +
                                    "] .poptin_losing_screen"
                                ).prepend(
                                  '<button type="button" id="closeXButton" onclick="closePoptinOnXclick(this);" class="close-x-button"  style="width: initial;text-align: right;display:none; margin-top: -2px;-webkit-appearance: none;padding: 5px;cursor: pointer;background: 0 0;border: 0;float: right;font-size: 25px;line-height: 0.5;color: #000;text-shadow: 0 1px 0 #fff;filter: alpha(opacity=20);opacity: 0.7;text-transform: none;overflow: visible;font-family: inherit;margin: 0;font: inherit;align-items: flex-start;text-align: center;text-indent: 0px;letter-spacing: normal;word-spacing: normal;text-rendering: auto;webkit-writing-mode: horizontal-tb;font-weight:bold;z-index: 9999;position: relative;">' +
                                    (t.design_properties
                                      .poptin_design_show_x_comment ||
                                      ("en" == _n ? un : hn)) +
                                    "</button>"
                                )
                              : jQ224(
                                  "[data-poptin-id=" +
                                    t.poptin_id +
                                    "] .draggable-container:not(.poptin-tab-container)"
                                ).prepend(Wi)
                            : jQ224(document).on(
                                "click",
                                '[data-poptin-id="' +
                                  t.poptin_id +
                                  '"] #closeXButton',
                                function () {
                                  closePoptinOnXclick(jQ224(this).get(0));
                                }
                              )),
                      null !=
                        t.design_properties.poptin_design_show_x_after_sec &&
                        0 != t.design_properties.poptin_design_show_x_after_sec)
                    )
                      if (
                        "closing_options-button" ==
                        t.design_properties.poptin_design_close_options_type
                      ) {
                        jQ224(
                          "[data-poptin-id=" + t.poptin_id + "] .close-x-button"
                        ).remove(),
                          (Ze[
                            t.poptin_id
                          ].poptin_trigger.skip_button_sec_counter = parseInt(
                            t.design_properties.poptin_design_show_x_after_sec
                          ));
                        var y = "";
                        (y =
                          "en" == _n
                            ? (t.design_properties.poptin_design_show_x_comment ||
                                ("en" == _n ? un : hn)) +
                              " (" +
                              Ze[t.poptin_id].poptin_trigger
                                .skip_button_sec_counter +
                              ")"
                            : "(" +
                              Ze[t.poptin_id].poptin_trigger
                                .skip_button_sec_counter +
                              ") " +
                              (t.design_properties.poptin_design_show_x_comment ||
                                ("en" == _n ? un : hn))),
                          jQ224(
                            "[data-poptin-id=" +
                              t.poptin_id +
                              "] .draggable-container:not(.poptin-tab-container)"
                          ).prepend(
                            '<button type="button" id="closeXButton" onclick="closePoptinOnXclick(this);" class="close-x-button"  style="width: initial;text-align: right;display:none; margin-top: -2px;-webkit-appearance: none;padding: 5px;cursor: pointer;background: 0 0;border: 0;float: right;font-size: 25px;line-height: 0.5;color: #000;text-shadow: 0 1px 0 #fff;filter: alpha(opacity=20);opacity: 0.7;text-transform: none;overflow: visible;font-family: inherit;margin: 0;font: inherit;align-items: flex-start;text-align: center;text-indent: 0px;letter-spacing: normal;word-spacing: normal;text-rendering: auto;webkit-writing-mode: horizontal-tb;font-weight:bold;z-index: 9999;position: relative;">' +
                              y +
                              "</button>"
                          ),
                          jQ224(
                            "[data-poptin-id=" +
                              t.poptin_id +
                              "] .draggable-container:not(.poptin-tab-container) .close-x-button"
                          )
                            .css({
                              display: "block",
                              opacity: "0.5",
                              cursor: "not-allowed",
                            })
                            .prop("disabled", !0);
                        var b = setInterval(function () {
                          if (
                            0 ==
                            Ze[t.poptin_id].poptin_trigger.skip_button_sec_counter
                          ) {
                            clearInterval(b);
                            var i = "";
                            "closing_options-x" ==
                            t.design_properties.poptin_design_close_options_type
                              ? (i = "&times;")
                              : "closing_options-button" ==
                                  t.design_properties
                                    .poptin_design_close_options_type &&
                                (i = "en" == _n ? un : hn),
                              jQ224(
                                "[data-poptin-id=" +
                                  t.poptin_id +
                                  "] .draggable-container:not(.poptin-tab-container) .close-x-button"
                              )
                                .html(i)
                                .css({ opacity: "1", cursor: "pointer" })
                                .prop("disabled", !1);
                          } else {
                            Ze[t.poptin_id].poptin_trigger
                              .skip_button_sec_counter--;
                            var e = "";
                            (e =
                              "en" == _n
                                ? t.design_properties
                                    .poptin_design_show_x_comment +
                                  " (" +
                                  Ze[t.poptin_id].poptin_trigger
                                    .skip_button_sec_counter +
                                  ")"
                                : "(" +
                                  Ze[t.poptin_id].poptin_trigger
                                    .skip_button_sec_counter +
                                  ") " +
                                  t.design_properties
                                    .poptin_design_show_x_comment),
                              jQ224(
                                "[data-poptin-id=" +
                                  t.poptin_id +
                                  "] .draggable-container:not(.poptin-tab-container) .close-x-button"
                              ).html(e);
                          }
                          "browsing" ==
                            jQ224("[data-poptin-id=" + t.poptin_id + "]").attr(
                              "data-poptin-type"
                            ) &&
                            "right-top" ==
                              jQ224("[data-poptin-id=" + t.poptin_id + "]").attr(
                                "data-poptin-location"
                              ) &&
                            jQ224(
                              "[data-poptin-id=" +
                                t.poptin_id +
                                "] .draggable-container:not(.poptin-tab-container) .close-x-button"
                            ).css("padding", "5px 5px 5px 20px");
                        }, 1e3);
                      } else {
                        jQ224(
                          "[data-poptin-id=" + t.poptin_id + "] #closeSkipButton"
                        ).remove();
                        var v = jQ224(
                          p +
                            ".draggable-container:not(.poptin-tab-container) .close-x-button, .poptin-popup[data-poptin-id=" +
                            t.poptin_id +
                            "] > .close-x-button"
                        );
                        0 == T() && v.hide(),
                          setTimeout(function () {
                            e(
                              "show poptin x button after " +
                                t.design_properties
                                  .poptin_design_show_x_after_sec +
                                " seconds"
                            ),
                              v.show(100);
                          }, 1e3 *
                            parseInt(
                              t.design_properties.poptin_design_show_x_after_sec
                            ));
                      }
                    else
                      jQ224(
                        "[data-poptin-id=" +
                          t.poptin_id +
                          "] .draggable-container:not(.poptin-tab-container) .close-x-button"
                      ).show(100);
                  else
                    jQ224(
                      "[data-poptin-id=" + t.poptin_id + "] .close-x-button"
                    ).remove();
                Ge = 300;
                var w = jQ224(p);
                if (
                  w.find(".froala-editor-video").length ||
                  w.find(".draggable.image-change-video").length
                ) {
                  var j = "",
                    Q = w.data("autoplay");
                  an || ("true" != Q && 1 != Q) || (j = "&mute=1"),
                    w
                      .find("#poptin" + w.data("source"))
                      .attr("src", w.data("url") + j)
                      .parent()
                      .css("display", "block"),
                    w.find(".draggable.image-change-video").remove(),
                    w.find(".froala-video-wrapper").css("display", "none");
                }
                if (
                  (w.find(".fr-shopify-products").length > 0 &&
                    w.find("#shopifyProductsJSON").length > 0 &&
                    jQ224(p + " .fr-shopify-products .fr-shopify-item").css({
                      position: "relative",
                      "z-index": 2,
                    }),
                  "lightbox" == t.poptin_type)
                )
                  ("format_3" != t.poptin_format &&
                    "format_9" != t.poptin_format) ||
                    jQ224(
                      p + ".draggable-container:not(.poptin-tab-container)"
                    ).css({ "box-shadow": "none" });
                else if ("bar" == t.poptin_type)
                  if ("center-top" === t.design_properties.poptin_location)
                    w.css({ top: "0px", bottom: "" });
                  else w.css({ top: "", bottom: "0px" });
                else if ("sside" == t.poptin_type || "social" == t.poptin_type) {
                  switch (t.design_properties.poptin_location) {
                    case "left-top":
                      w.css({
                        left: "0px",
                        right: "",
                        margin: "0px",
                        top: "0px",
                        bottom: "",
                      });
                      break;
                    case "left-midlle":
                      w.css({
                        left: "0px",
                        right: "",
                        margin: "0px",
                        top: (window.innerHeight - poptin_height) / 2 + "px",
                        bottom: "",
                      });
                      break;
                    case "left-bottom":
                      w.css({
                        left: "0px",
                        right: "",
                        margin: "0px",
                        bottom: "0px",
                        top: "",
                      });
                      break;
                    case "center-top":
                      w.css({
                        left: (window.innerWidth - poptin_width) / 2,
                        right: "",
                        margin: "0px",
                        top: "0px",
                        bottom: "",
                      });
                      break;
                    case "center-midlle":
                      w.css({
                        left: (window.innerWidth - poptin_width) / 2,
                        right: "",
                        margin: "0px",
                        top: (window.innerHeight - poptin_height) / 2 + "px",
                        bottom: "",
                      });
                      break;
                    case "center-bottom":
                      w.css({
                        left: (window.innerWidth - poptin_width) / 2,
                        right: "",
                        margin: "0px",
                        bottom: "0px",
                        top: "",
                      });
                      break;
                    case "right-top":
                      w.css({
                        left: "",
                        right: "0px",
                        margin: "0px",
                        top: "0px",
                        bottom: "",
                      });
                      break;
                    case "right-midlle":
                      w.css({
                        left: "",
                        right: "0px",
                        margin: "0px",
                        top: (window.innerHeight - poptin_height) / 2 + "px",
                        bottom: "",
                      });
                      break;
                    case "right-bottom":
                      w.css({ left: "", right: "0px", bottom: "0px", top: "" });
                  }
                  "social" == t.poptin_type &&
                    ("format_1" == t.poptin_format ||
                    "format_5" == t.poptin_format
                      ? w
                          .find(".close-x-button")
                          .css({
                            position: "absolute",
                            top: "0px",
                            right: "0px",
                            "z-index": "1",
                            "line-height": "26px",
                          })
                      : ("format_3" != t.poptin_format &&
                          "format_7" != t.poptin_format) ||
                        (w.css({
                          "box-shadow": "none !important",
                          opacity: "0",
                          visability: "hidden",
                        }),
                        w.find("img").first().remove()));
                } else if ("bside" == t.poptin_type)
                  "left" !== t.design_properties.poptin_location
                    ? w.css({ left: "", top: "", right: "0px", bottom: "0px" })
                    : w.css({ right: "", top: "", left: "0px", bottom: "0px" });
                else if (
                  "browsing" == t.poptin_type ||
                  "fullpage" == t.poptin_type ||
                  "mobile" == t.poptin_type
                )
                  if (
                    (w.css({ bottom: "", right: "" }),
                    "mobile" == t.poptin_type &&
                      (("format_3" != t.poptin_format &&
                        "format_8" != t.poptin_format) ||
                        (jQ224(
                          p + ".draggable-container:not(.poptin-tab-container)"
                        ).css({ "box-shadow": "none" }),
                        w.css({ bottom: "0px", right: "0px" }))),
                    "fullpage" == t.poptin_type &&
                      (V() &&
                        jQ224(
                          p +
                            ".draggable-container:not(.poptin-tab-container) .close-x-button"
                        ).css({ "padding-right": "25px" }),
                      ("format_3" != t.poptin_format &&
                        "format_7" != t.poptin_format) ||
                        jQ224(p + ".poptin-popup > div").css({
                          "background-image": "",
                        })),
                    "browsing" == t.poptin_type &&
                      (jQ224(
                        p +
                          ".draggable-container:not(.poptin-tab-container) .close-x-button"
                      ).css({ "padding-right": "15px" }),
                      jQ224(p).hasClass("old-popup") &&
                        "right-top" == t.design_properties.poptin_location &&
                        (w.css({
                          left: "",
                          right: "0px",
                          "-moz-transform": "scaleX(-1)",
                          "-o-transform": "scaleX(-1)",
                          "-webkit-transform": "scaleX(-1)",
                          transform: "scaleX(-1)",
                          filter: "FlipH",
                          "-ms-filter": "FlipH",
                        }),
                        w
                          .find("p")
                          .css({
                            "-moz-transform": "scaleX(-1)",
                            "-o-transform": "scaleX(-1)",
                            "-webkit-transform": "scaleX(-1)",
                            transform: "scaleX(-1)",
                            filter: "FlipH",
                            "-ms-filter": "FlipH",
                          }),
                        setTimeout(function () {
                          w.find(".poptin-credit").css("transform", "scaleX(-1)");
                        }, 300))),
                    "mobile" == t.poptin_type)
                  )
                    switch (t.design_properties.poptin_location) {
                      case "center-top":
                        w.css({ top: "0px" });
                        break;
                      case "center-midlle":
                        w.css({
                          top: (window.innerHeight - poptin_height) / 2 + "px",
                        });
                        break;
                      case "center-bottom":
                        w.css({ top: window.innerHeight - poptin_height + "px" });
                    }
                  else w.css({ top: "0px" });
                else
                  "gamified" == t.poptin_type &&
                    "format_1" == t.poptin_format &&
                    (jQ224(p + " .fr-giftbox-images .fr-giftbox").css({
                      cursor: "pointer",
                      position: "relative",
                      "z-index": 2,
                    }),
                    jQ224(
                      p + " .fr-giftbox-images .fr-giftbox img.giftbox-img"
                    ).css({ cursor: "pointer" }));
                function x() {
                  "fullpage" == t.poptin_type &&
                    (jQ224(p).css("opacity", 0),
                    lt(t, i, 1),
                    setTimeout(function () {
                      J(t);
                    }, 300)),
                    (resize_delay = 100),
                    "fullpage" == t.poptin_type && (resize_delay = 350),
                    setTimeout(function () {
                      qt(t, i),
                        Ut(t, i),
                        "fullpage" != t.poptin_type &&
                          setTimeout(function () {
                            lt(t, i, 1),
                              setTimeout(function () {
                                J(t);
                              }, 300);
                          }, 300);
                    }, resize_delay),
                    mi(t);
                }
                jQ224(p + " .fr-shopify-products") &&
                jQ224(p + " .fr-shopify-products").length > 0
                  ? ((void 0 !== window.Shopify && window.Shopify.shop) ||
                      ("undefined" != typeof poptin_landing_page &&
                        1 == poptin_landing_page)) &&
                    (e("process shopify ajax"),
                    Qt(),
                    jt(t),
                    xt(t)
                      .then(function (t) {
                        1 == t.display &&
                          (e("show popup if products available"), x());
                      })
                      .catch(function (t) {
                        console.log("Error while processing shopify ajax: ", t);
                      }))
                  : x(),
                  sn &&
                    t.poptin_type + "_" + t.poptin_format ==
                      "gamified_format_2" &&
                    jQ224(
                      '[data-poptin-id="' +
                        t.poptin_id +
                        '"] #poptinDraggableContainer'
                    ).length &&
                    ((Mn = window.scrollY),
                    (Bn = !0),
                    jQ224("html, body").css({
                      overflow: "hidden",
                      height: "100vh",
                    }));
              },
              G = function () {
                return "he" == _n;
              },
              Y = function (t) {
                sn &&
                  (e("setTelForMobile"),
                  jQ224(
                    ".poptin-popup[data-poptin-id=" +
                      t.poptin_id +
                      "] #poptinDesignInputTextFieldPhone"
                  ).attr("type", "tel"));
              },
              J = function (t) {
                jQ224('.poptin-popup [role="application"]').removeAttr("role"),
                  jQ224(".poptin-popup").attr("role", "application"),
                  jQ224(".poptin-popup form").attr("role", "form");
                var i = 500 + 100 * ++Je,
                  e = jQ224(".poptin-popup[data-poptin-id=" + t.poptin_id + "]"),
                  n = 1 == e.attr("data-has-tabindex"),
                  o = n ? i + parseInt(e.attr("data-lowest-tabindex")) : i;
                jQ224(
                  ".poptin-popup[data-poptin-id=" + t.poptin_id + "] > *"
                ).each(function () {
                  jQ224(this)
                    .find(
                      ".inputs-container input, .inputs-container select, .inputs-container textarea"
                    )
                    .each(function (t) {
                      var e = jQ224(this).attr("data-placeholder");
                      if (
                        (e || (e = jQ224(this).attr("placeholder")),
                        jQ224(this).parent().hasClass("field-consent-checkbox") &&
                          (e = G()
                            ? "×¦'×§×‘×•×§×¡ ×œ×“×™×•×•×¨"
                            : "Consent Checkbox"),
                        null != e)
                      ) {
                        var o = !0,
                          p = jQ224(this).css("direction");
                        null != p && "ltr" == p && (o = !1),
                          -1 == e.indexOf("*") &&
                            jQ224(this).prop("required") &&
                            (G() && o ? (e = "*" + e) : (e += "*"),
                            jQ224(this).attr({ "aria-required": !0 }));
                        var a = jQ224(this).attr("data-tabindex"),
                          r = n ? (a ? i + parseInt(a) : i) : i++;
                        jQ224(this).attr({
                          tabindex: r,
                          "aria-label": e,
                          placeholder: e,
                        });
                      }
                    }),
                    jQ224(this)
                      .find(".poptin-checkbox-wrapper input")
                      .each(function (t) {
                        var e = jQ224(this).attr("data-tabindex"),
                          o = n ? (e ? i + parseInt(e) : i) : i++,
                          p = jQ224(this)
                            .parent()
                            .find(".froala-editor-text")
                            .text();
                        jQ224(this).attr({
                          tabindex: o,
                          "aria-label": p,
                          placeholder: p,
                        });
                      }),
                    jQ224(this)
                      .find(".flip-timer-container")
                      .each(function (t) {
                        var e = jQ224(this).attr("data-tabindex"),
                          o = n ? (e ? i + parseInt(e) : i) : i++;
                        jQ224(this).attr({ tabindex: o });
                      }),
                    jQ224(this)
                      .find(".froala-editor-coupon")
                      .each(function (t) {
                        var e = jQ224(this).text();
                        if (e) {
                          (e = e.split("").join(",")),
                            (e = G() ? e + " ×§×•×¤×•×Ÿ" : "Coupon " + e);
                          var o = jQ224(this)
                              .parents(".poptin-coupon-element")
                              .attr("data-tabindex"),
                            p = n ? (o ? i + parseInt(o) : i) : i++;
                          jQ224(this)
                            .parents(".poptin-coupon-element")
                            .attr({ tabindex: p, "aria-label": e });
                        }
                      }),
                    jQ224(this)
                      .find(".froala-image-wrapper img")
                      .each(function (t) {
                        var e = jQ224(this).attr("data-tabindex"),
                          o = n ? (e ? i + parseInt(e) : i) : i++;
                        jQ224(this).attr({ tabindex: o });
                      }),
                    jQ224(this)
                      .find(".froala-editor-text, .froala-editor-ticker")
                      .each(function (t) {
                        if (
                          0 ==
                          jQ224(this).parents(
                            ".flip-timer-container, .poptin-checkbox-wrapper"
                          ).length
                        ) {
                          var e = jQ224(this)
                              .parents(".draggable")
                              .attr("data-tabindex"),
                            o = n ? (e ? i + parseInt(e) : i) : i++;
                          jQ224(this).parents(".draggable").attr({ tabindex: o });
                        }
                      }),
                    jQ224(this)
                      .find("input.poptin-form-submit-button")
                      .each(function (t) {
                        jQ224(this).attr("role", "button");
                        var e = jQ224(this)
                            .parent()
                            .find(".froala-editor-button")
                            .attr("data-tabindex"),
                          o = n ? (e ? i + parseInt(e) : i) : i++;
                        jQ224(this).attr({ tabindex: o });
                      }),
                    jQ224(this)
                      .find(".poptin-form-close-button, .poptin-form-link-button")
                      .each(function (t) {
                        jQ224(this).attr(
                          "role",
                          jQ224(this).get(0).className.includes("link")
                            ? "link"
                            : "button"
                        );
                        var e = jQ224(this).attr("data-tabindex"),
                          o = n ? (e ? i + parseInt(e) : i) : i++;
                        jQ224(this).attr({ tabindex: o });
                      }),
                    jQ224(this)
                      .find(".close-x-button")
                      .each(function (t) {
                        jQ224(this).wrapInner('<span aria-hidden="true"></span>');
                        var e = "he" == _n ? "×¡×’×•×¨ ×¤×•×¤××¤" : "Close popup",
                          o = jQ224(this).attr("data-tabindex"),
                          p = n ? (o ? i + parseInt(o) : i) : i++;
                        jQ224(this).attr({ tabindex: p, "aria-label": e });
                      });
                });
                var p = n ? i + parseInt(e.attr("data-highest-tabindex")) : i;
                if (!n) {
                  var a =
                    1 == isPoptinLandingPage
                      ? ""
                      : ":not([data-poptin-type='embedded'])";
                  jQ224(
                    ".poptin-popup[data-poptin-id=" +
                      t.poptin_id +
                      "]" +
                      a +
                      " .inputs-container input"
                  )
                    .first()
                    .focus();
                }
                e.append(
                  '\n\t\t\t<span class="poptin-tabindex-start" tabindex="' +
                    (o - 1) +
                    '" aria-label="Dialog popup start"></span>\n\t\t\t<span class="poptin-tabindex-end" tabindex="' +
                    (p + 1) +
                    '" aria-label="Dialog popup end"></span>\n\t\t'
                ),
                  setTimeout(function () {
                    n
                      ? jQ224(
                          ".poptin-popup[data-poptin-id=" +
                            t.poptin_id +
                            "] .poptin-tabindex-start"
                        ).focus()
                      : jQ224(
                          ".poptin-popup[data-poptin-id=" +
                            t.poptin_id +
                            "]:not([data-poptin-type='embedded']) .inputs-container input"
                        )
                          .first()
                          .focus();
                  }, 2e3);
                var r =
                    "fullpage" ==
                    jQ224(
                      ".poptin-popup[data-poptin-id=" + t.poptin_id + "]"
                    ).attr("data-poptin-type"),
                  s = !1;
                jQ224(document).on("keyup keydown", function (t) {
                  "keydown" == t.type && 16 == t.keyCode && (s = !0),
                    "keyup" == t.type && 16 == t.keyCode && (s = !1);
                }),
                  jQ224(document).on(
                    "keydown",
                    ".poptin-popup[data-poptin-id=" +
                      t.poptin_id +
                      "] .inputs-container .froala-editor-input > .form-input-class:first-child input:first-child, .poptin-popup[data-poptin-id=" +
                      t.poptin_id +
                      "] .inputs-container .form-input-class:first-child select, .poptin-popup[data-poptin-id=" +
                      t.poptin_id +
                      "] .inputs-container .form-input-class:first-child textarea",
                    function (i) {
                      if (9 == i.keyCode && s)
                        return (
                          setTimeout(function () {
                            r
                              ? jQ224(
                                  ".poptin-popup[data-poptin-id=" +
                                    t.poptin_id +
                                    "] > #closeXButton"
                                ).focus()
                              : jQ224(
                                  ".poptin-popup[data-poptin-id=" +
                                    t.poptin_id +
                                    "] #poptinDraggableContainer #closeXButton"
                                ).focus();
                          }, 100),
                          !1
                        );
                    }
                  ),
                  jQ224(document).on(
                    "keydown",
                    ".poptin-popup[data-poptin-id=" +
                      t.poptin_id +
                      "] #closeXButton",
                    function (i) {
                      if (
                        ((13 != i.keyCode && 32 != i.keyCode) ||
                          jQ224(this).trigger("click"),
                        9 == i.keyCode && !s && !n)
                      )
                        return (
                          setTimeout(function () {
                            var i = jQ224(
                              ".poptin-popup[data-poptin-id=" +
                                t.poptin_id +
                                "] .inputs-container"
                            );
                            i.find(".form-input-class:first-child").length
                              ? i
                                  .find(".form-input-class:first-child")
                                  .find("input, select, textarea")
                                  .first()
                                  .focus()
                              : i.find("input, select, textarea").first().focus();
                          }, 100),
                          !1
                        );
                    }
                  ),
                  jQ224(document).keyup(function (i) {
                    if ("Escape" === i.key && "embedded" != t.poptin_type) {
                      var n = "#closeXButton";
                      jQ224(
                        ".poptin-popup[data-poptin-id=" +
                          t.poptin_id +
                          "] #closeSkipButton"
                      ).length > 0 && (n = "#closeSkipButton"),
                        t &&
                          t.poptin_id &&
                          n &&
                          setTimeout(function () {
                            closePoptinOnXclick(
                              ".poptin-popup[data-poptin-id=" +
                                t.poptin_id +
                                "] " +
                                n
                            );
                          }, 800);
                    }
                    if (9 == i.keyCode) {
                      var a = document.activeElement,
                        r = e.find("[tabindex=" + o + "]"),
                        d = e.find("[tabindex=" + p + "]"),
                        l = jQ224(a).hasClass("poptin-tabindex-end"),
                        _ = jQ224(a).hasClass("poptin-tabindex-start");
                      s ? _ && d.focus() : l && r.focus();
                    }
                  });
              },
              K = function () {
                var t = "×".search(/[\u0590-\u05FF]/);
                return (
                  (x = document.querySelector('meta[http-equiv="Content-Type"]')),
                  t >= 0 &&
                    ((x = document.querySelector(
                      'meta[http-equiv="Content-Type"]'
                    )),
                    null == x || x.content.toLowerCase().indexOf("utf-8") > 0)
                );
              },
              V = function () {
                return jQ224("body").get(0).scrollHeight > jQ224(window).height();
              },
              Z = function (t) {
                var i = jQ224(
                    "[data-poptin-id=" +
                      t.poptin_id +
                      "] .draggable-container:not(.poptin-tab-container) .close-x-button"
                  ),
                  e = jQ224(
                    "[data-poptin-id=" +
                      t.poptin_id +
                      "] .draggable-container:not(.poptin-tab-container) .close-button-note"
                  );
                e &&
                  i
                    .on("mouseover", function () {
                      if (
                        ((this_scale = Ze[t.poptin_id].poptin_scale),
                        "lightbox" == t.poptin_type &&
                          bn.lightbox <= parseInt(t.poptin_format.split("_")[1]))
                      );
                      else if (i)
                        jQ224(
                          "[data-poptin-id=" +
                            t.poptin_id +
                            "] .draggable-container:not(.poptin-tab-container) #closeButtonNote"
                        ).css({
                          left:
                            i.position().left / this_scale +
                            i.outerWidth() -
                            e.outerWidth() +
                            1,
                          top:
                            i.position().top / this_scale - e.outerHeight() - 3,
                          right: "",
                        });
                      else {
                        var n = jQ224(
                          "[data-poptin-id=" +
                            t.poptin_id +
                            "] .draggable-container:not(.poptin-tab-container)"
                        ).attr("data-width");
                        jQ224(
                          "[data-poptin-id=" +
                            t.poptin_id +
                            "] .draggable-container:not(.poptin-tab-container) #closeButtonNote"
                        ).css({
                          left: n / this_scale - e.outerWidth() + 1,
                          top: 3 - e.outerHeight(),
                          right: "",
                        });
                      }
                      e.css("display", "block");
                    })
                    .on("mouseout", function () {
                      e.css("display", "none");
                    });
              },
              tt = function (t, i) {
                try {
                  "undefined" != typeof Storage && t
                    ? (e("setAutoPilot2"),
                      void 0 === t.auto_pilot_trigger ||
                        (null !=
                          window.sessionStorage.getItem("apt_" + t.poptin_id) &&
                          null !=
                            window.sessionStorage.getItem(
                              "apt_" + t.poptin_id
                            )) ||
                        (e(t.auto_pilot_trigger),
                        window.sessionStorage.setItem(
                          "apt_" + t.poptin_id,
                          t.auto_pilot_trigger
                        )))
                    : e("Sorry! No Web Storage support add/or poptin..");
                } catch (t) {
                  e(t);
                }
              },
              it = function () {
                try {
                  "undefined" != typeof Storage
                    ? (null !=
                        window.sessionStorage.getItem(
                          "poptin_origin_landing_page"
                        ) &&
                        null !=
                          window.sessionStorage.getItem(
                            "poptin_origin_landing_page"
                          )) ||
                      window.sessionStorage.setItem(
                        "poptin_origin_landing_page",
                        window.location.href
                      )
                    : e("Sorry! No Web Storage support..");
                } catch (t) {
                  e(t);
                }
              },
              et = function (t, i) {
                var e = {},
                  n = Xt(t.poptin),
                  o = n.width,
                  p = n.height;
                void 0 !== t &&
                  ("lightbox" == t.poptin_type
                    ? (null == i &&
                        ((Ze[t.poptin_id].poptin_size.height = p),
                        (Ze[t.poptin_id].poptin_size.width = o)),
                      null != o && "" != o && "undefined" != o && (Vi = o),
                      null != p &&
                        "" != p &&
                        "undefined" != p &&
                        ((Zi = p),
                        ("format_3" != t.poptin_format &&
                          "format_9" != t.poptin_format) ||
                          (Vi = Zi)),
                      null == i &&
                        (Ze[t.poptin_id].poptin_size = { width: Vi, height: Zi }),
                      (e.width = Vi),
                      (e.height = Zi))
                    : "bar" == t.poptin_type
                    ? (null == i &&
                        (Ze[t.poptin_id].poptin_size = { width: te, height: ie }),
                      (e.width = te),
                      (e.height = ie),
                      "format_1" == t.poptin_format ||
                      "format_6" == t.poptin_format
                        ? (null == i &&
                            (Ze[t.poptin_id].poptin_size = {
                              width: te,
                              height: ie,
                            }),
                          (e.height = ie))
                        : "format_2" == t.poptin_format ||
                          "format_3" == t.poptin_format ||
                          "format_7" == t.poptin_format ||
                          "format_8" == t.poptin_format
                        ? (null == i &&
                            (Ze[t.poptin_id].poptin_size = {
                              width: te,
                              height: ee,
                            }),
                          (e.height = ee))
                        : "format_4" == t.poptin_format ||
                          "format_9" == t.poptin_format
                        ? (null == i &&
                            (Ze[t.poptin_id].poptin_size = {
                              width: te,
                              height: ne,
                            }),
                          (e.height = ne))
                        : ("format_5" != t.poptin_format &&
                            "format_10" != t.poptin_format) ||
                          (null == i &&
                            (Ze[t.poptin_id].poptin_size = {
                              width: te,
                              height: oe,
                            }),
                          (e.height = oe)))
                    : "sside" == t.poptin_type
                    ? "format_1" === t.poptin_format ||
                      "format_5" === t.poptin_format
                      ? (null == i &&
                          (Ze[t.poptin_id].poptin_size = {
                            width: se,
                            height: de,
                          }),
                        (e.width = re),
                        (e.height = de))
                      : "format_4" === t.poptin_format ||
                        "format_8" === t.poptin_format
                      ? (null == i &&
                          (Ze[t.poptin_id].poptin_size = {
                            width: le,
                            height: _e,
                          }),
                        (e.width = le),
                        (e.height = _e))
                      : "format_19" === t.poptin_format
                      ? (null == i &&
                          (Ze[t.poptin_id].poptin_size = {
                            width: ce,
                            height: fe,
                          }),
                        (e.width = ce),
                        (e.height = fe))
                      : (null == i &&
                          (Ze[t.poptin_id].poptin_size = {
                            width: re,
                            height: de,
                          }),
                        (e.width = se),
                        (e.height = de))
                    : "bside" == t.poptin_type
                    ? (null == i &&
                        (Ze[t.poptin_id].poptin_size = { width: ue, height: he }),
                      (e.width = ue),
                      (e.height = he))
                    : "browsing" == t.poptin_type
                    ? (null == i &&
                        (Ze[t.poptin_id].poptin_size = { width: pe, height: ae }),
                      (e.width = pe),
                      (e.height = ae))
                    : "fullpage" == t.poptin_type
                    ? (null == i &&
                        (Ze[t.poptin_id].poptin_size = { width: ge, height: me }),
                      (e.width = "100%"),
                      (e.height = "100%"),
                      ("format_4" !== t.poptin_format &&
                        "format_8" !== t.poptin_format) ||
                        (null == i &&
                          (Ze[t.poptin_id].poptin_size = {
                            width: ye,
                            height: be,
                          }),
                        (e.width = ye),
                        (e.height = be)))
                    : "content" == t.poptin_type
                    ? null == i &&
                      (Ze[t.poptin_id].poptin_size = { width: ge, height: me })
                    : "social" == t.poptin_type
                    ? "format_1" === t.poptin_format ||
                      "format_5" === t.poptin_format
                      ? (null == i &&
                          (Ze[t.poptin_id].poptin_size = {
                            width: Se,
                            height: Ce,
                          }),
                        (e.width = Se),
                        (e.height = Ce))
                      : "format_2" === t.poptin_format ||
                        "format_6" === t.poptin_format
                      ? (null == i &&
                          (Ze[t.poptin_id].poptin_size = {
                            width: Te,
                            height: Pe,
                          }),
                        (e.width = Te),
                        (e.height = Pe))
                      : ("format_4" !== t.poptin_format &&
                          "format_8" !== t.poptin_format) ||
                        (null == i &&
                          (Ze[t.poptin_id].poptin_size = {
                            width: ze,
                            height: Ie,
                          }),
                        (e.width = ze),
                        (e.height = Ie))
                    : "mobile" == t.poptin_type
                    ? (null == i &&
                        (Ze[t.poptin_id].poptin_size = { width: ve, height: we }),
                      (e.width = ve),
                      (e.height = we),
                      "format_3" === t.poptin_format ||
                      "format_8" === t.poptin_format
                        ? (null == i &&
                            (Ze[t.poptin_id].poptin_size = {
                              width: je,
                              height: Qe,
                            }),
                          (e.width = je),
                          (e.height = Qe))
                        : "format_4" === t.poptin_format ||
                          "format_9" === t.poptin_format
                        ? (null == i &&
                            (Ze[t.poptin_id].poptin_size = {
                              width: ve,
                              height: xe,
                            }),
                          (e.height = xe))
                        : ("format_5" !== t.poptin_format &&
                            "format_10" !== t.poptin_format) ||
                          (null == i &&
                            (Ze[t.poptin_id].poptin_size = {
                              width: ve,
                              height: ke,
                            }),
                          (e.height = ke)))
                    : "embedded" == t.poptin_type
                    ? ("format_1" === t.poptin_format
                        ? ((e.width = De), (e.height = Oe))
                        : "format_2" === t.poptin_format
                        ? ((e.width = Me), (e.height = $e))
                        : "format_3" === t.poptin_format
                        ? ((e.width = Ae), (e.height = Fe))
                        : "format_4" === t.poptin_format
                        ? ((e.width = Le), (e.height = Ne))
                        : "format_5" === t.poptin_format
                        ? ((e.width = Be), (e.height = Re))
                        : "format_6" === t.poptin_format
                        ? ((e.width = Xe), (e.height = Ee))
                        : "format_7" === t.poptin_format &&
                          ((e.width = qe), (e.height = Ue)),
                      null == i &&
                        (Ze[t.poptin_id].poptin_size = {
                          width: e.width,
                          height: e.height,
                        }))
                    : "gamified" == t.poptin_type &&
                      (null == i &&
                        ((Ze[t.poptin_id].poptin_size.height = p),
                        (Ze[t.poptin_id].poptin_size.width = o)),
                      null != o && "" != o && "undefined" != o && (Vi = o),
                      null != p && "" != p && "undefined" != p && (Zi = p),
                      null == i &&
                        (Ze[t.poptin_id].poptin_size = { width: Vi, height: Zi }),
                      (e.width = Vi),
                      (e.height = Zi)),
                  (Ze[t.poptin_id].poptin_size = e));
              },
              nt = function (t) {
                Ze[t] = {
                  poptin_size: {},
                  poptin_trigger: {},
                  poptin_center: {},
                };
              },
              ot = function (t, i) {
                var n = !1,
                  o =
                    (jQ224(
                      ".poptin-popup[data-poptin-id=" + t.poptin_id + "]"
                    ).css("top"),
                    jQ224(
                      ".poptin-popup[data-poptin-id=" + t.poptin_id + "]"
                    ).css("bottom")),
                  p = {
                    lightbox: "10px",
                    mobile: "10px",
                    sside: "0px",
                    gamified: "10px",
                  };
                if (
                  on &&
                  jQ224.inArray(t.poptin_type, [
                    "lightbox",
                    "mobile",
                    "sside",
                    "gamified",
                  ]) > -1
                ) {
                  try {
                    jQ224(
                      "[data-poptin-id=" +
                        t.poptin_id +
                        "] .inputs-container input"
                    ).off("click"),
                      jQ224(window).off("click");
                  } catch (t) {
                    e(t);
                  }
                  jQ224(
                    "[data-poptin-id=" + t.poptin_id + "] .inputs-container input"
                  ).on("click", function (i) {
                    n ||
                      ("sside" != t.poptin_type ||
                      ("format_4" !== t.poptin_format &&
                        "format_8" !== t.poptin_format)
                        ? -1 ==
                            t.design_properties.poptin_location.indexOf("top") &&
                          (t.design_properties.poptin_location.indexOf("bottom") >
                          -1
                            ? jQ224(
                                ".poptin-popup[data-poptin-id=" +
                                  t.poptin_id +
                                  "]"
                              ).animate({ top: p[t.poptin_type] }, 300)
                            : jQ224(
                                ".poptin-popup[data-poptin-id=" +
                                  t.poptin_id +
                                  "]"
                              ).animate(
                                {
                                  top:
                                    parseInt(
                                      jQ224(
                                        ".poptin-popup[data-poptin-id=" +
                                          t.poptin_id +
                                          "]"
                                      ).css("top")
                                    ) -
                                    100 +
                                    "px",
                                },
                                300
                              ))
                        : jQ224(
                            ".poptin-popup[data-poptin-id=" + t.poptin_id + "]"
                          ).animate({ top: "-100px" }, 300),
                      (n = !0));
                  }),
                    jQ224(window).on("click", function (i) {
                      0 == jQ224(i.target).parents(".inputs-container").length &&
                        n &&
                        ((-1 !=
                          t.design_properties.poptin_location.indexOf("top") &&
                          ("sside" != t.poptin_type ||
                            ("format_4" !== t.poptin_format &&
                              "format_8" !== t.poptin_format))) ||
                          (t.design_properties.poptin_location.indexOf("bottom") >
                          -1
                            ? (jQ224(
                                ".poptin-popup[data-poptin-id=" +
                                  t.poptin_id +
                                  "]"
                              ).css("top", ""),
                              jQ224(
                                ".poptin-popup[data-poptin-id=" +
                                  t.poptin_id +
                                  "]"
                              ).animate({ bottom: o }, 300))
                            : jQ224(
                                ".poptin-popup[data-poptin-id=" +
                                  t.poptin_id +
                                  "]"
                              ).animate(
                                {
                                  top:
                                    parseInt(
                                      jQ224(
                                        ".poptin-popup[data-poptin-id=" +
                                          t.poptin_id +
                                          "]"
                                      ).css("top")
                                    ) +
                                    100 +
                                    "px",
                                },
                                300
                              )),
                        (n = !1));
                    });
                }
              },
              pt = function (t) {
                e("insertPoptinCredit"),
                  jQ224("[data-poptin-id=" + t.poptin_id + "]")
                    .children("div, form")
                    .append(Yi),
                  jQ224(
                    "[data-poptin-id=" + t.poptin_id + "] .poptin-credit a"
                  ).attr(
                    "href",
                    ("en" == _n ? Ui : qi) + "?src=" + window.location.host
                  );
              },
              at = function (t) {
                split = t.split("font-family")[1].split(";")[0];
                var i = split
                    .replace("!important", "")
                    .replace(/\:/g, "")
                    .replace(/\"/g, "")
                    .replace(/\'/g, "")
                    .trim(),
                  e = jQ224(".poptin-popup").attr("data-custom-fonts");
                if (null != e && e.split(",").includes(i)) return !1;
                var n = i.replace(/\s/g, "+");
                jQ224("link").each(function () {
                  if (
                    ((this_href = jQ224(this).attr("href").toLowerCase()),
                    -1 ==
                      this_href.indexOf(
                        "zp46sc6gwsi2qkvolzdb2kg52u0yffwh.lambda-url.us-west-2.on.aws"
                      ) &&
                      -1 == this_href.indexOf(n.toLowerCase()) &&
                      -1 == qn.indexOf(n))
                  )
                    if ((qn.push(n), "Open+Sans+Hebrew" == n))
                      0 == jQ224("#poptin_opensanshebrew_font_preload").length &&
                        jQ224("head").append(
                          '<link rel="preload" id="poptin_opensanshebrew_font_preload" as="style" href="https://fonts.popt.in/?family=Open%20Sans%20Hebrew&display=swap">'
                        ),
                        0 == jQ224("#poptin_opensanshebrew_font_link").length &&
                          jQ224("head").append(
                            '<link rel="stylesheet" id="poptin_opensanshebrew_font_link" href="https://fonts.popt.in/?family=Open%20Sans%20Hebrew&display=swap">'
                          );
                    else {
                      var t = n
                        .toLowerCase()
                        .replace(/[^\w ]+/g, "")
                        .replace(/ +/g, "-");
                      if (
                        ((font_preload_id = "poptin-preload-" + t),
                        (font_link_id = "poptin-link-" + t),
                        !Un.includes(i))
                      )
                        return !1;
                      0 == jQ224("#" + font_preload_id).length &&
                        jQ224("head").append(
                          '<link rel="preload" id="' +
                            font_preload_id +
                            '" as="style" href="https://fonts.popt.in?family=' +
                            n +
                            '&display=swap">'
                        ),
                        0 == jQ224("#" + font_link_id).length &&
                          jQ224("head").append(
                            '<link rel="stylesheet" id="' +
                              font_link_id +
                              '"  href="https://fonts.popt.in?family=' +
                              n +
                              '&display=swap" type="text/css">'
                          );
                    }
                });
              },
              rt = function (t) {
                return !!t.is_teasers_on;
              },
              st = function (t) {
                jQ224(
                  "[data-poptin-id=" + t.poptin_id + "] .froala-editor-ticker"
                ).length > 0 &&
                  setTimeout(function () {
                    jQ224(
                      "[data-poptin-id=" + t.poptin_id + "] .froala-editor-ticker"
                    ).each(function (t) {
                      var i = jQ224(this)
                          .parent(".poptin-newsticker-element")
                          .width(),
                        e = jQ224(this).data(),
                        n = (e.duration ? e.duration : 7e3) / 400,
                        o = e.direction ? e.direction : "left";
                      jQ224(this).css({
                        overflow: "hidden",
                        width: i + "px",
                        position: "relative",
                      }),
                        jQ224(this).wrapInner(
                          '<div class="js-poptinNewsTicker-wrapper dir-' +
                            o +
                            '"><div class="js-poptinNewsTicker" style="margin-right: 0px;margin-left: 0px;;white-space: nowrap;"></div></div>'
                        ),
                        jQ224(this)
                          .find(".js-poptinNewsTicker-wrapper")
                          .css({
                            "animation-duration": n + "s",
                            "-moz-animation-duration": n + "s",
                            "-webkit-animation-duration": n + "s",
                          });
                    });
                  }, 100);
              },
              dt = function (t, i) {
                return (
                  (i = i || {}),
                  Object.assign(
                    {
                      poptin_id: t.poptin_id,
                      poptin_name: t.poptin_name,
                      poptin_target: t.poptin_target,
                      poptin_type: t.poptin_type,
                      account_id: t.account_id,
                    },
                    i
                  )
                );
              },
              lt = function (t, i, n) {
                ht(t) &&
                  (e("showPoptin: " + t.poptin_id),
                  ut(t),
                  (function (t) {
                    jQ224(
                      "[data-poptin-id=" + t.poptin_id + "] .poptin-credit"
                    ).remove(),
                      e("clearPoptinCredit1"),
                      t.if_poptin_credit && pt(t);
                  })(t),
                  "social_proof" == t.poptin_target
                    ? setSocialProofBehaverInterval(t, i)
                    : (!(function (t) {
                        jQ224(
                          ".poptin-popup[data-poptin-id=" +
                            t.poptin_id +
                            "] #poptinMobileContainer-tab"
                        ).remove(),
                          jQ224(
                            ".poptin-popup[data-poptin-id=" +
                              t.poptin_id +
                              "] #poptinDesktopContainer-tab"
                          ).remove(),
                          jQ224(
                            ".poptin-popup[data-poptin-id=" +
                              t.poptin_id +
                              "] #poptinDraggableContainer-tab"
                          ).remove();
                      })(t),
                      wi(t, "entry"),
                      (Ze[t.poptin_id].poptin_trigger.shown = !0)),
                  _t(t),
                  Qi(t),
                  "gamified" == t.poptin_type &&
                    "format_1" == t.poptin_format &&
                    (xi(t), ki(t)),
                  "embedded" != t.poptin_type &&
                    "fullpage" != t.poptin_type &&
                    Di(t),
                  st(t),
                  (function (t) {
                    t.poptin_type + "_" + t.poptin_format ==
                      "gamified_format_2" &&
                      ((window.countScratchProgress = function (i) {
                        Number(i) <= 50 &&
                          (jQ224(
                            "[data-poptin-id=" +
                              t.poptin_id +
                              "] #poptinScratchArea"
                          ).hide(),
                          setTimeout(function () {
                            jQ224(
                              '[data-poptin-id="' +
                                t.poptin_id +
                                '"] #poptinDraggableContainer'
                            ).removeClass(
                              "poptin-visible poptin__animated animate__fadeIn animate__faster"
                            ),
                              t.design_properties &&
                              t.design_properties.disable_post_play_screen &&
                              1 == t.design_properties.disable_post_play_screen
                                ? (Lt(t), St(t))
                                : (jQ224(
                                    "[data-poptin-id=" +
                                      t.poptin_id +
                                      "] .poptin_play_screen"
                                  ).addClass(
                                    "poptin-visible poptin__animated animate__fadeIn animate__faster"
                                  ),
                                  setTimeout(function () {
                                    jQ224(
                                      "[data-poptin-id=" +
                                        t.poptin_id +
                                        "] .poptin_play_screen"
                                    ).removeClass(
                                      "poptin__animated animate__fadeIn animate__faster"
                                    );
                                  }, 800));
                          }, 3e3));
                      }),
                      poptinScratchCardInit("", t.poptin_id));
                  })(t),
                  Ti(t),
                  Ii(t),
                  ct(t),
                  ft(t),
                  wt(t, i),
                  Rt(t));
              },
              _t = function (t) {
                t.poptin_type + "_" + t.poptin_format == "social_format_3" ||
                t.poptin_type + "_" + t.poptin_format == "social_format_7"
                  ? (e("ingectFacebookChat"),
                    (inject_chat_sdk = jQ224(
                      ".poptin-popup[data-poptin-id=" +
                        t.poptin_id +
                        "] .facebook-plugin"
                    ).attr("data-facebook-chat-plugin")),
                    inject_chat_sdk.indexOf("sdk.js") > 0 &&
                      (inject_chat_sdk = inject_chat_sdk.replace(
                        "sdk.js",
                        "sdk/xfbml.customerchat.js"
                      )),
                    jQ224("body").append(inject_chat_sdk))
                  : (t.poptin_type + "_" + t.poptin_format != "social_format_4" &&
                      t.poptin_type + "_" + t.poptin_format !=
                        "social_format_8") ||
                    (e("ingectFacebookSendToMessangerPlugin"),
                    (yn =
                      t.poptin_id + "-" + o() + "-" + Math.random().toString(36)),
                    jQ224(
                      ".poptin-popup[data-poptin-id=" +
                        t.poptin_id +
                        "] .facebook-plugin .fb-send-to-messenger"
                    ).attr("data-ref", yn),
                    jQ224(
                      ".poptin-popup[data-poptin-id=" +
                        t.poptin_id +
                        "] .ui-wrapper"
                    ).remove(),
                    jQ224(
                      ".poptin-popup[data-poptin-id=" +
                        t.poptin_id +
                        "] .facebook-plugin"
                    ).is(":empty") ||
                      jQ224(
                        ".poptin-popup[data-poptin-id=" +
                          t.poptin_id +
                          "] .facebook-messanger-conversion-img"
                      ).remove(),
                    setTimeout(function () {
                      jQ224("body").append(
                        jQ224(
                          ".poptin-popup[data-poptin-id=" +
                            t.poptin_id +
                            "] .facebook-plugin"
                        ).attr("data-facebook-send-to-messanger-plugin")
                      );
                    }, 750));
              },
              ct = function (t) {
                e("pushHtmlDown"),
                  (("bar" == t.poptin_type &&
                    "center-top" == t.design_properties.poptin_location) ||
                    "1" ==
                      jQ224(
                        ".poptin-popup[data-poptin-id=" + t.poptin_id + "]"
                      ).attr("data-wellcome-screen")) &&
                    (jQ224("html").animate(
                      {
                        "padding-top":
                          jQ224(
                            ".poptin-popup[data-poptin-id=" + t.poptin_id + "]"
                          )[0].getBoundingClientRect().height + "px",
                      },
                      300
                    ),
                    (ln = !0));
              },
              ft = function (t) {
                V() &&
                  "fullpage" == t.poptin_type &&
                  setTimeout(function () {
                    jQ224(
                      ".poptin-popup[data-poptin-id=" +
                        t.poptin_id +
                        "] .draggable-container:not(.poptin-tab-container) .close-x-button"
                    ).css(
                      "padding-right",
                      1920 == screen.width ? "46px" : "20px"
                    );
                  }, 300);
              },
              ut = function (t) {
                jQ224(
                  "[data-poptin-id=" + t.poptin_id + "] .froala-image-wrapper"
                ).each(function () {
                  var i = jQ224(this).find("img");
                  i.css("width", jQ224(this).css("width")),
                    i.css("height", jQ224(this).css("height")),
                    i.attr("alt", i.attr("alt") || t.poptin_name),
                    i.css("max-width", jQ224(this).css("width"));
                }),
                  jQ224(".froala-editor-button").css("width", "100%"),
                  jQ224(
                    "[data-poptin-id=" +
                      t.poptin_id +
                      "] .draggable-container:not(.poptin-tab-container)"
                  )
                    .find(
                      "p, input, a, span, div, button, label, ul, ol, li, img, strong, i"
                    )
                    .each(function (i) {
                      if (
                        (jQ224(this).is("a") &&
                          jQ224(this).css("cursor", "pointer"),
                        jQ224(this).parents("a").length &&
                          jQ224(this).css("cursor", ""),
                        !poptin_loadcontrol_fix)
                      ) {
                        var n = jQ224(this).get(0).style.width,
                          o = "closeXButton" == jQ224(this).attr("id");
                        if ("" != n && !o) {
                          if (n.indexOf("px") > -1) {
                            n = parseInt(n);
                            var p = Xt(t.poptin).width;
                            p && (n = Math.min(p, n)), (n += "px");
                          }
                          t.poptin_type + "_" + t.poptin_format !=
                            "social_format_6" &&
                            t.poptin_type + "_" + t.poptin_format !=
                              "sside_format_19" &&
                            jQ224(this).is("img");
                        }
                      }
                      var a = "";
                      jQ224.each(this.attributes, function (t) {
                        if (
                          this.specified &&
                          "style" == this.name &&
                          ((a = (a = (a = (a = (a = this.value).replace(
                            / ?!important/g,
                            ""
                          )).replace(/\;base64/g, ":base64")).replace(
                            /\;/g,
                            " !important;"
                          )).replace(/\:base64/g, ";base64")),
                          -1 !== this.value.indexOf("font-family"))
                        )
                          try {
                            at(this.value);
                          } catch (t) {
                            e(t);
                          }
                      }),
                        jQ224(this).attr("style", a);
                    }),
                  jQ224(
                    '#poptinDesignInputTextFieldCheckbox .form-input-class, .poptin-popup input[type="radio"], .poptin-popup input[type="checkbox"]'
                  ).css({ width: "", "max-width": "" }),
                  jQ224(".field-consent-checkbox input").each(function () {
                    jQ224(this).css("width", jQ224(this).css("height"));
                  });
              },
              ht = function (t) {
                var i = jQ224(
                  ".poptin-popup[data-poptin-id=" +
                    t.poptin_id +
                    "] .timer-container"
                );
                if (i.length && i.hasClass(".timer-started")) return !1;
                if (
                  (i.addClass(".timer-started"),
                  1 == t.design_properties.timer_ver ||
                    2 == t.design_properties.timer_ver ||
                    (0 == t.design_properties.timer_ver &&
                      (t.poptin_type + "_" + t.poptin_format ==
                        "embedded_format_5" ||
                        t.poptin_type + "_" + t.poptin_format ==
                          "lightbox_format_5" ||
                        t.poptin_type + "_" + t.poptin_format ==
                          "lightbox_format_11" ||
                        t.poptin_type + "_" + t.poptin_format == "bar_format_5" ||
                        t.poptin_type + "_" + t.poptin_format ==
                          "bar_format_10")))
                ) {
                  var n = 1;
                  2 == t.design_properties.timer_ver && (n = 2);
                  var o = t.design_properties.timer.split("@"),
                    p = o[1].split("|");
                  if ("timerTime" == o[0]) {
                    var a = 60 * parseInt(p[0]) + parseInt(p[1]),
                      r = new Date(new Date().getTime() + 1e3 * a);
                    yt(t.poptin_id, r, t, n);
                  } else {
                    r = new Date(
                      p[0] + " " + p[1] + " GMT" + ("0" == p[2] ? "+0" : p[2])
                    );
                    if (
                      (e(p[0] + " " + p[1] + " GMT" + p[2]),
                      e("0" == p[2] ? "yes" : "no"),
                      e(r),
                      !vt(t, r))
                    )
                      return !i.length;
                    yt(t.poptin_id, r, t, n);
                  }
                }
                return !0;
              },
              gt = function (t, i, n) {
                if (void 0 !== t) {
                  var o = jQ224(".poptin-popup[data-poptin-id=" + i + "]");
                  o.find(".flip-timer-container").addClass("play");
                  var p = bt(t),
                    a = parseInt(
                      o.find(".secondPlay .flip-item.active .up .inn").text()
                    ),
                    r = Math.abs((isNaN(a) ? 0 : a) - p.seconds);
                  e("secTimeDiff"),
                    (r || "program" == n) &&
                      (o.find(".secondPlay .flip-item").removeClass("before"),
                      o.find(".secondPlay .flip-item").removeClass("active"),
                      o.find(".secondPlay .flip-item .up .inn").each(function () {
                        parseInt(jQ224(this).text()) == p.seconds &&
                          jQ224(this)
                            .closest(".flip-item")
                            .prev()
                            .addClass("before")
                            .next(".flip-item")
                            .addClass("active");
                      }));
                  var s = parseInt(
                      o.find(".minutePlay .flip-item.active .up .inn").text()
                    ),
                    d = Math.abs((isNaN(s) ? 0 : s) - p.minutes);
                  e("minTimeDiff"),
                    (d || "program" == n) &&
                      (o.find(".minutePlay .flip-item").removeClass("before"),
                      o.find(".minutePlay .flip-item").removeClass("active"),
                      o.find(".minutePlay .flip-item .up .inn").each(function () {
                        parseInt(jQ224(this).text()) == p.minutes &&
                          jQ224(this)
                            .closest(".flip-item")
                            .prev()
                            .addClass("before")
                            .next(".flip-item")
                            .addClass("active");
                      }));
                  var l = parseInt(
                      o.find(".hoursPlay .flip-item.active .up .inn").text()
                    ),
                    _ = Math.abs((isNaN(l) ? 0 : l) - p.hours);
                  e("hrTimeDiff"),
                    (_ || "program" == n) &&
                      (o.find(".hoursPlay .flip-item").removeClass("before"),
                      o.find(".hoursPlay .flip-item").removeClass("active"),
                      o.find(".hoursPlay .flip-item .up .inn").each(function () {
                        parseInt(jQ224(this).text()) == p.hours &&
                          jQ224(this)
                            .closest(".flip-item")
                            .prev()
                            .addClass("before")
                            .next(".flip-item")
                            .addClass("active");
                      }));
                  var c = parseInt(
                      o.find(".daysPlay .flip-item.active .up .inn").text()
                    ),
                    f = Math.abs((isNaN(c) ? 0 : c) - p.days);
                  e("dayTimeDiff"),
                    (f || "program" == n) &&
                      (jQ224(
                        "#poptinDraggableContainer .daysPlay .flip-item"
                      ).removeClass("before"),
                      jQ224(
                        "#poptinDraggableContainer .daysPlay .flip-item"
                      ).removeClass("active"),
                      jQ224(
                        "#poptinDraggableContainer .daysPlay .flip-item .up .inn"
                      ).each(function () {
                        parseInt(jQ224(this).text()) == p.days &&
                          (e(parseInt(jQ224(this).text()), p.days),
                          jQ224(this)
                            .closest(".flip-item")
                            .prev()
                            .addClass("before")
                            .next(".flip-item")
                            .addClass("active"));
                      }));
                }
              },
              mt = function (t) {
                return ("0" + t).slice(-2);
              },
              yt = function (t, i, n, o) {
                var p = jQ224(".poptin-popup[data-poptin-id=" + t + "]");
                if (
                  (e("initializeClock() | endtime: " + i + ", poptin_id: " + t),
                  jQ224(".poptin-popup[data-poptin-id=" + t + "]").show(),
                  2 == o)
                ) {
                  var a = function () {
                    if (
                      jQ224(
                        ".poptin-popup[data-poptin-id=" +
                          t +
                          "] .flip-timer-container"
                      ).length > 0
                    ) {
                      var n = bt(i);
                      if (0 == n || n.total < 1e3) {
                        (Ze[t].poptin_trigger.close_trigger = "timer"),
                          closePoptin(t);
                        try {
                          clearInterval(h);
                        } catch (t) {}
                      } else
                        !(function (t, i) {
                          var e = jQ224(
                            ".poptin-popup[data-poptin-id=" + i + "]"
                          );
                          e.find(".flip-timer-container").removeClass("play");
                          var n = e.find(".secondPlay .flip-item.active");
                          null == n.html()
                            ? (n = e.find(".secondPlay .flip-item").eq(0))
                                .addClass("before")
                                .removeClass("active")
                                .next(".flip-item")
                                .addClass("active")
                                .closest(".flip-timer-container")
                                .addClass("play")
                            : n.is(":last-child")
                            ? (e
                                .find(".secondPlay .flip-item")
                                .removeClass("before"),
                              n.addClass("before").removeClass("active"),
                              (n = e.find(".secondPlay .flip-item").eq(0))
                                .addClass("active")
                                .closest(".flip-timer-container")
                                .addClass("play"))
                            : (e
                                .find(".secondPlay .flip-item")
                                .removeClass("before"),
                              n
                                .addClass("before")
                                .removeClass("active")
                                .next(".flip-item")
                                .addClass("active")
                                .closest(".flip-timer-container")
                                .addClass("play"));
                        })(0, t),
                          0 == n.seconds &&
                            n.minutes >= 0 &&
                            (e("Play minutes"),
                            (function (t, i) {
                              var e = jQ224(
                                ".poptin-popup[data-poptin-id=" + i + "]"
                              );
                              e.find(".flip-timer-container").removeClass("play");
                              var n = e.find(".minutePlay .flip-item.active");
                              null == n.html()
                                ? (n = e.find(".minutePlay .flip-item").eq(0))
                                    .addClass("before")
                                    .addClass("perspective")
                                    .removeClass("active")
                                    .next(".flip-item")
                                    .addClass("active")
                                    .addClass("perspective")
                                    .closest(".flip-timer-container")
                                    .addClass("play")
                                : n.is(":last-child")
                                ? (e
                                    .find(".minutePlay .flip-item")
                                    .removeClass("before"),
                                  n.addClass("before").removeClass("active"),
                                  (n = e.find(".minutePlay .flip-item").eq(0))
                                    .addClass("active")
                                    .addClass("perspective")
                                    .closest(".flip-timer-container")
                                    .addClass("play"))
                                : (e
                                    .find(".minutePlay .flip-item")
                                    .removeClass("before"),
                                  n
                                    .addClass("before")
                                    .addClass("perspective")
                                    .removeClass("active")
                                    .next(".flip-item")
                                    .addClass("active")
                                    .addClass("perspective")
                                    .closest(".flip-timer-container")
                                    .addClass("play")),
                                setTimeout(function () {
                                  e.find(
                                    ".minutePlay .flip-item.perspective"
                                  ).removeClass("perspective");
                                }, 1e3);
                            })(0, t)),
                          0 == n.seconds &&
                            0 == n.minutes &&
                            n.hours >= 0 &&
                            (e("Play hours"),
                            (function (t, i) {
                              var e = jQ224(
                                ".poptin-popup[data-poptin-id=" + i + "]"
                              );
                              e.find(".flip-timer-container").removeClass("play");
                              var n = e.find(".hoursPlay .flip-item.active");
                              null == n.html()
                                ? (n = e.find(".hoursPlay .flip-item").eq(0))
                                    .addClass("before")
                                    .addClass("perspective")
                                    .removeClass("active")
                                    .next(".flip-item")
                                    .addClass("active")
                                    .addClass("perspective")
                                    .closest(".flip-timer-container")
                                    .addClass("play")
                                : n.is(":last-child")
                                ? (e
                                    .find(".hoursPlay .flip-item")
                                    .removeClass("before"),
                                  n.addClass("before").removeClass("active"),
                                  (n = e.find(".hoursPlay .flip-item").eq(0))
                                    .addClass("active")
                                    .addClass("perspective")
                                    .closest(".flip-timer-container")
                                    .addClass("play"))
                                : (e
                                    .find(".hoursPlay .flip-item")
                                    .removeClass("before"),
                                  n
                                    .addClass("before")
                                    .addClass("perspective")
                                    .removeClass("active")
                                    .next(".flip-item")
                                    .addClass("active")
                                    .addClass("perspective")
                                    .closest(".flip-timer-container")
                                    .addClass("play")),
                                setTimeout(function () {
                                  e.find(
                                    ".hoursPlay .flip-item.perspective"
                                  ).removeClass("perspective");
                                }, 1e3);
                            })(0, t)),
                          0 == n.seconds &&
                            0 == n.minutes &&
                            n.hours >= 0 &&
                            n.days >= 0 &&
                            (e("Play days"),
                            (function (t, i) {
                              var e = jQ224(
                                ".poptin-popup[data-poptin-id=" + i + "]"
                              );
                              e.find(".flip-timer-container").removeClass("play");
                              var n = e.find(".daysPlay .flip-item.active");
                              null == n.html()
                                ? (n = e.find(".daysPlay .flip-item").eq(0))
                                    .addClass("before")
                                    .addClass("perspective")
                                    .removeClass("active")
                                    .next(".flip-item")
                                    .addClass("active")
                                    .addClass("perspective")
                                    .closest(".flip-timer-container")
                                    .addClass("play")
                                : n.is(":last-child")
                                ? (e
                                    .find(".daysPlay .flip-item")
                                    .removeClass("before"),
                                  n.addClass("before").removeClass("active"),
                                  (n = e.find(".daysPlay .flip-item").eq(0))
                                    .addClass("active")
                                    .addClass("perspective")
                                    .closest(".flip-timer-container")
                                    .addClass("play"))
                                : (e
                                    .find(".daysPlay .flip-item")
                                    .removeClass("before"),
                                  n
                                    .addClass("before")
                                    .addClass("perspective")
                                    .removeClass("active")
                                    .next(".flip-item")
                                    .addClass("active")
                                    .addClass("perspective")
                                    .closest(".flip-timer-container")
                                    .addClass("play")),
                                setTimeout(function () {
                                  e.find(
                                    ".daysPlay .flip-item.perspective"
                                  ).removeClass("perspective");
                                }, 1e3);
                            })(0, t));
                      var o = "";
                      if (p.find("#timerHours").is(":visible")) {
                        var a = p.find(".daysPlay");
                        o +=
                          (a.find(".flip-item.active .up").text() ||
                            a.find(".flip-item:first-child .up").text()) +
                          " " +
                          a.find(".froala-editor-text").text() +
                          ", ";
                        var r = p.find(".hoursPlay");
                        o +=
                          (r.find(".flip-item.active .up").text() || 24) +
                          " " +
                          r.find(".froala-editor-text").text() +
                          ", ";
                      }
                      var d = p.find(".minutePlay");
                      o +=
                        (d.find(".flip-item.active .up").text() || 59) +
                        " " +
                        d.find(".froala-editor-text").text() +
                        ", ";
                      var l = p.find(".secondPlay");
                      (o +=
                        l.find(".flip-item.active .up").text() +
                        " " +
                        l.find(".froala-editor-text").text()),
                        (o = G() ? o + " ×˜×™×™×ž×¨" : "Timer " + o),
                        s.attr("aria-label", o);
                    } else clearInterval(h);
                  };
                  jQ224(window).on("blur focus hover", function (e) {
                    if (
                      p.find(".flip-timer-container").attr("data-prev-type") !=
                        e.type &&
                      "focus" === e.type
                    )
                      gt(i, t, "window");
                    p.find(".flip-timer-container").attr(
                      "data-prev-type",
                      e.type
                    );
                  }),
                    jQ224(
                      ".poptin-popup[data-poptin-id=" + t + "] .timer-container"
                    ).addClass("timer-started");
                  var r = bt(i);
                  e("getTimeRemaining");
                  var s = jQ224(
                      ".poptin-popup[data-poptin-id=" +
                        t +
                        "] .flip-timer-container"
                    ),
                    d = s.find(".daysPlay, .hoursPlay, .minutePlay, .secondPlay");
                  d
                    .find(".flip-item")
                    .after('<div class="flip-item-holder"></div>'),
                    d.find(".flip-item").remove();
                  for (var l = r.days; l >= 0; l--) {
                    var _ = mt(l);
                    s.find(".daysPlay .flip-item-holder").append(
                      '<div class="flip-item"><div class="anim-wrap"><div class="up"><div class="shadow"></div><div class="inn">' +
                        _ +
                        '</div></div><div class="down"><div class="shadow"></div><div class="inn">' +
                        _ +
                        "</div></div></div></div>"
                    );
                  }
                  for (l = 23; l >= 0; l--) {
                    _ = mt(l);
                    s.find(".hoursPlay .flip-item-holder").append(
                      '<div class="flip-item"><div class="anim-wrap"><div class="up"><div class="shadow"></div><div class="inn">' +
                        _ +
                        '</div></div><div class="down"><div class="shadow"></div><div class="inn">' +
                        _ +
                        "</div></div></div></div>"
                    );
                  }
                  for (l = 59; l >= 0; l--) {
                    _ = mt(l);
                    s.find(".minutePlay .flip-item-holder").append(
                      '<div class="flip-item"><div class="anim-wrap"><div class="up"><div class="shadow"></div><div class="inn">' +
                        _ +
                        '</div></div><div class="down"><div class="shadow"></div><div class="inn">' +
                        _ +
                        "</div></div></div></div>"
                    );
                  }
                  for (l = 59; l >= 0; l--) {
                    _ = mt(l);
                    s.find(".secondPlay .flip-item-holder").append(
                      '<div class="flip-item"><div class="anim-wrap"><div class="up"><div class="shadow"></div><div class="inn">' +
                        _ +
                        '</div></div><div class="down"><div class="shadow"></div><div class="inn">' +
                        _ +
                        "</div></div></div><div>"
                    );
                  }
                  var c =
                    "rgba(0, 0, 0, 0)" == d.css("background-color")
                      ? "rgb(255, 255, 255)"
                      : d.css("background-color");
                  e("flip_wrap"),
                    s
                      .find(".flip-item")
                      .css("border-radius", d.css("border-radius")),
                    s
                      .find(".flip-item .anim-wrap > div")
                      .css("background-color", c),
                    jQ224(
                      ".poptin-popup[data-poptin-id=" +
                        t +
                        "] .flip-timer-container"
                    ).addClass("reset"),
                    gt(i, t, "program"),
                    a();
                  try {
                    clearInterval(h);
                  } catch (t) {}
                  jQ224(
                    ".poptin-popup[data-poptin-id=" +
                      t +
                      "] .flip-timer-container"
                  ).length > 0 && (h = setInterval(a, 1e3)),
                    setTimeout(function () {
                      jQ224(
                        ".poptin-popup[data-poptin-id=" +
                          t +
                          "] .flip-timer-container"
                      ).removeClass("reset");
                    }, 1e3);
                } else {
                  var f = function () {
                      var e = bt(i);
                      if (
                        jQ224(
                          ".poptin-popup[data-poptin-id=" +
                            t +
                            "] .flip-timer-container"
                        ).length > 0
                      ) {
                        var n = ("0" + e.days).slice(-2),
                          o = ("0" + e.hours).slice(-2),
                          p = ("0" + e.minutes).slice(-2),
                          a = ("0" + e.seconds).slice(-2);
                        if (
                          (u.find("#timerDays .first").text(n[0]),
                          u.find("#timerDays .second").text(n[1]),
                          u.find("#timerHours .first").text(o[0]),
                          u.find("#timerHours .second").text(o[1]),
                          u.find("#timerMinutes .first").text(p[0]),
                          u.find("#timerMinutes .second").text(p[1]),
                          u.find("#timerSeconds .first").text(a[0]),
                          u.find("#timerSeconds .second").text(a[1]),
                          0 == e || e.total < 1e3)
                        ) {
                          (Ze[t].poptin_trigger.close_trigger = "timer"),
                            closePoptin(t);
                          try {
                            clearInterval(h);
                          } catch (t) {}
                        }
                      } else clearInterval(h);
                    },
                    u = jQ224(
                      ".poptin-popup[data-poptin-id=" + t + "] .timer-container"
                    );
                  if (
                    (f(),
                    jQ224(
                      ".poptin-popup[data-poptin-id=" +
                        t +
                        "] .flip-timer-container"
                    ).length > 0)
                  )
                    var h = setInterval(f, 1e3);
                }
              },
              bt = function (t) {
                var i = t.getTime() - new Date().getTime();
                return {
                  total: i,
                  days: Math.floor(i / 864e5),
                  hours: Math.floor((i / 36e5) % 24),
                  minutes: Math.floor((i / 1e3 / 60) % 60),
                  seconds: Math.floor((i / 1e3) % 60),
                };
              },
              vt = function (t, i) {
                return !(
                  i.getTime() - new Date().getTime() <= 0 || "Invalid Date" == i
                );
              },
              wt = function (t, i) {
                e("poptinFormClickSubmit: " + t.poptin_id);
                try {
                  jQ224(
                    '[data-poptin-id="' +
                      t.poptin_id +
                      '"] [id="poptinFormSubmit' +
                      t.poptin_id +
                      '"]'
                  ).off("click");
                } catch (t) {
                  e(t);
                }
                jQ224(
                  '[data-poptin-id="' +
                    t.poptin_id +
                    '"] [id="poptinFormSubmit' +
                    t.poptin_id +
                    '"]'
                ).on("click", function (n) {
                  try {
                    jQ224(
                      '[data-poptin-id="' +
                        t.poptin_id +
                        '"] [id="poptinFormSubmit' +
                        t.poptin_id +
                        '"]'
                    ).off("submit");
                  } catch (t) {
                    e(t);
                  }
                  if (
                    jQ224(n.target).hasClass("poptin-form-submit-button") ||
                    jQ224(n.target).parents(".poptin-form-submit-button").length >
                      0
                  )
                    if (
                      "P" == jQ224(n.target).prop("tagName") ||
                      "P" ==
                        jQ224(n.target)
                          .parents(".poptin-form-submit-button")
                          .prop("tagName") ||
                      ("DIV" == jQ224(n.target).prop("tagName") &&
                        jQ224(n.target).hasClass("draggable")) ||
                      ("DIV" ==
                        jQ224(n.target)
                          .parents(".poptin-form-submit-button")
                          .prop("tagName") &&
                        jQ224(n.target)
                          .parents(".poptin-form-submit-button")
                          .hasClass("draggable")) ||
                      "IMG" == jQ224(n.target).prop("tagName") ||
                      ("mobile" == t.poptin_type &&
                        "format_1" == t.poptin_format) ||
                      ("mobile" == t.poptin_type &&
                        "format_2" == t.poptin_format) ||
                      ("mobile" == t.poptin_type &&
                        "format_6" == t.poptin_format) ||
                      ("mobile" == t.poptin_type &&
                        "format_7" == t.poptin_format) ||
                      ("mobile" == t.poptin_type &&
                        "format_11" == t.poptin_format)
                    )
                      try {
                        if (
                          (jQ224(".poptin-popup").remove("active"),
                          jQ224(n.target)
                            .parents(
                              '[data-poptin-id="' +
                                t.poptin_id +
                                '"].poptin-popup'
                            )
                            .addClass("active"),
                          n.preventDefault(),
                          (("mobile" == t.poptin_type &&
                            "format_1" == t.poptin_format) ||
                            ("mobile" == t.poptin_type &&
                              "format_6" == t.poptin_format) ||
                            ("mobile" == t.poptin_type &&
                              "format_11" == t.poptin_format)) &&
                            (jQ224(
                              '[data-poptin-id="' + t.poptin_id + '"] a'
                            ).hasClass("fa-phone-square")
                              ? (Ze[t.poptin_id].redirect_url = jQ224(
                                  '[data-poptin-id="' +
                                    t.poptin_id +
                                    '"] .fa-phone-square'
                                ).attr("href"))
                              : jQ224(
                                  '[data-poptin-id="' +
                                    t.poptin_id +
                                    '"] a.call-link'
                                ).length
                              ? (Ze[t.poptin_id].redirect_url = jQ224(
                                  '[data-poptin-id="' +
                                    t.poptin_id +
                                    '"] .call-link'
                                ).attr("href"))
                              : jQ224(
                                  '[data-poptin-id="' +
                                    t.poptin_id +
                                    '"] .fa-phone'
                                ).length
                              ? (Ze[t.poptin_id].redirect_url = jQ224(
                                  '[data-poptin-id="' +
                                    t.poptin_id +
                                    '"] .fa-phone'
                                )
                                  .parent()
                                  .attr("href"))
                              : (Ze[t.poptin_id].redirect_url = jQ224(
                                  '[data-poptin-id="' +
                                    t.poptin_id +
                                    '"] .fa-phone-square'
                                )
                                  .parent()
                                  .attr("href"))),
                          e("poptinFormTriggerSubmit" + t.poptin_id + " submit"),
                          jQ224(
                            '[data-poptin-id="' +
                              t.poptin_id +
                              '"] .inputs-container [data-name="poptinDesignHiddenField"]'
                          ).each(function () {
                            jQ224(this).val(jQ224(this).val() || " ");
                          }),
                          "gamified" != t.poptin_type ||
                            t.design_properties.disable_post_play_screen)
                        )
                          o = jQ224(
                            '[data-poptin-id="' +
                              t.poptin_id +
                              '"] #poptinDraggableContainer form'
                          );
                        else
                          var o = jQ224(
                            '[data-poptin-id="' +
                              t.poptin_id +
                              '"] #poptinPlayScreen form'
                          );
                        var p = o.find(
                            ".form-input-class.field-checkbox[data-action-required='true'] .checkbox-child-field input:checked"
                          ),
                          a = o.find(
                            ".form-input-class.field-radio[data-action-required='true'] .radio-child-field input:checked"
                          ),
                          r = o
                            .find(
                              ".form-input-class.field-checkbox[data-action-required='true'] .checkbox-child-field input"
                            )
                            .first();
                        0 == p.length &&
                          r.prop("required", !0).attr("required", !0);
                        var s = o
                          .find(
                            ".form-input-class.field-radio[data-action-required='true'] .radio-child-field input"
                          )
                          .first();
                        0 == a.length &&
                          s.prop("required", !0).attr("required", !0);
                        var d = jQ224(n.target).parents(
                            '[data-poptin-id="' + t.poptin_id + '"].poptin-popup'
                          ),
                          l = d.find("input#poptinDesignInputTextFieldPhone");
                        if ("advanced" == l.attr("data-action-validate")) {
                          var _ = !0;
                          d.find(".phone-error").remove();
                          var c = l.val();
                          if (
                            c &&
                            c.length &&
                            null == c.match(/--+/g) &&
                            0 == c.replace(/(\d+|-)/g, "").length
                          ) {
                            var f = (c = c
                                .replace(/-/g, "")
                                .toString()).substring(0, 2),
                              u = c.substring(0, 3);
                            ((["02", "03", "04", "08", "09"].includes(f) &&
                              null != c.match(/^\w{3}\w{3}\w{3}$/g)) ||
                              ([
                                "050",
                                "051",
                                "052",
                                "053",
                                "054",
                                "055",
                                "058",
                                "072",
                                "073",
                                "074",
                                "076",
                                "077",
                                "079",
                              ].includes(u) &&
                                null != c.match(/^\w{3}\w{3}\w{4}$/g))) &&
                              (_ = !1);
                          }
                          if (_)
                            return (
                              l
                                .parent()
                                .append(
                                  '<span class="phone-error">×ž×¡×¤×¨ ×”×˜×œ×¤×•×Ÿ ×©×’×•×™</span>'
                                ),
                              !1
                            );
                        }
                        if (o[0].checkValidity())
                          en &&
                            ((en = !1),
                            Pt(t, i),
                            setTimeout(function () {
                              en = !0;
                            }, nn));
                        else
                          try {
                            o[0].reportValidity();
                          } catch (n) {
                            o.find("input, textarea").each(function () {
                              jQ224(this)[0].checkValidity();
                            });
                          }
                        return !1;
                      } catch (i) {
                        vi("poptinConversion()->call to mobile", i, "OK", !1, t);
                      }
                    else
                      jQ224(
                        '[data-poptin-id="' +
                          t.poptin_id +
                          '"] [id="poptinFormSubmit' +
                          t.poptin_id +
                          '"]'
                      ).on("submit", function (n) {
                        return (
                          n.preventDefault(),
                          e("poptinFormClickSubmit" + t.poptin_id + " submit"),
                          en &&
                            ((en = !1),
                            Pt(t, i),
                            setTimeout(function () {
                              en = !0;
                            }, nn)),
                          !1
                        );
                      });
                });
              },
              jt = function (t) {
                jQ224(
                  ".poptin-popup[data-poptin-id=" +
                    t.poptin_id +
                    "] .fr-shopify-item-btn a"
                ).on("click", function (i) {
                  var e = {};
                  (e.button_text = jQ224(this).text()),
                    (e.product_url = jQ224(this).attr("data-url")),
                    (e.product_name = jQ224(this).attr("data-product-name")),
                    (e.product_id = jQ224(this).attr("data-product-id")),
                    (e.variant_id = jQ224(this).attr("data-variant-id")),
                    (e.buttons_action = jQ224(this).attr("data-buttons-action")),
                    (t.shopify_product_settings = e),
                    Tt(t, null, "shopify_products", this);
                });
              },
              Qt = function () {
                if (window.ShopifyAnalytics) {
                  var t = window.ShopifyAnalytics.meta.page.pageType;
                  if (void 0 !== t && "product" == t) {
                    var i = yi("poptin_shopify_recent_product_id")
                      ? gi("poptin_shopify_recent_product_id").split(",")
                      : [];
                    if (
                      ShopifyAnalytics.meta.product &&
                      void 0 !== ShopifyAnalytics.meta.selectedVariantId
                    ) {
                      var e = ShopifyAnalytics.meta.selectedVariantId.toString();
                      (!i.includes(e) || (i.length > 2 && i[2] == e)) &&
                        i.unshift(e),
                        i.length > 3 && i.pop();
                    }
                    hi("poptin_shopify_recent_product_id", i.join(","));
                  }
                }
              },
              xt = function (t, i) {
                return new Promise(function (e, n) {
                  var o,
                    p,
                    a,
                    r,
                    s,
                    d = {};
                  jQ224("input#shopifyProductsJSON").length > 0 &&
                    (d = JSON.parse(jQ224("#shopifyProductsJSON").val())),
                    i && i.category && (d = i);
                  var l = {
                    category:
                      null === (o = d) || void 0 === o ? void 0 : o.category,
                    products:
                      null === (p = d) || void 0 === p
                        ? void 0
                        : p.manual_products,
                    limit:
                      "manual" ==
                      (null === (a = d) || void 0 === a ? void 0 : a.category)
                        ? null === (r = d) || void 0 === r
                          ? void 0
                          : r.manual_products.length
                        : null === (s = d) || void 0 === s
                        ? void 0
                        : s.count,
                  };
                  if ("last_visited" == l.category) {
                    var _,
                      c,
                      f = yi("poptin_shopify_recent_product_id")
                        ? gi("poptin_shopify_recent_product_id").split(",")
                        : [];
                    if (
                      ((l.products = f),
                      (l.limit =
                        f.length <=
                        (null === (_ = d) || void 0 === _ ? void 0 : _.count)
                          ? f.length
                          : null === (c = d) || void 0 === c
                          ? void 0
                          : c.count),
                      (d.category = "manual"),
                      (d.category_original = "last_visited"),
                      (d.manual_products = l.products),
                      "undefined" != typeof poptin_landing_page &&
                        1 == poptin_landing_page &&
                        e({ display: !0 }),
                      f.length <= 0)
                    )
                      return e({ display: !1 }), !1;
                    f.length > 0 && i && e({ display: !0 }),
                      i ||
                        kt(t, d, function (i) {
                          var n,
                            o =
                              null != i &&
                              null !== (n = i.data) &&
                              void 0 !== n &&
                              n.products
                                ? i.data.products
                                : [];
                          (window.shopifyProductCurrency = i.currency
                            ? i.currency
                            : "USD"),
                            Ct(t.poptin_id, o, t),
                            e({ display: !0 });
                        });
                  } else
                    "product_in_cart" == l.category
                      ? void 0 !== window.Shopify && window.Shopify.shop
                        ? jQ224
                            .ajax(
                              {
                                url: "/cart.js",
                                type: "get",
                                dataType: "json",
                                async: !1,
                              },
                              "json"
                            )
                            .done(function (n) {
                              n.items.length > 0 &&
                                ((productVariantIds = []),
                                n.items.forEach(function (t) {
                                  return productVariantIds.push(
                                    t.variant_id.toString()
                                  );
                                }),
                                (l.products = productVariantIds.reverse()),
                                (d.category = "manual"),
                                (d.manual_products = l.products.slice(0, 3)),
                                i
                                  ? e({ display: !0 })
                                  : kt(t, d, function (i) {
                                      (window.shopifyProductCurrency = i.currency
                                        ? i.currency
                                        : "USD"),
                                        Ct(
                                          t.poptin_id,
                                          i.data.products,
                                          t,
                                          productVariantIds
                                        ),
                                        e({ display: !0 });
                                    })),
                                0 == n.item_count &&
                                  null != t &&
                                  t.is_teasers_on &&
                                  !i &&
                                  ((d.category = "product_collection"),
                                  kt(t, d, function (i) {
                                    (window.shopifyProductCurrency = i.currency
                                      ? i.currency
                                      : "USD"),
                                      Ct(t.poptin_id, i.data.products, t),
                                      e({ display: !0 });
                                  }));
                            })
                            .fail(function (t) {
                              console.log("Failed to fetch shopify data"), n(t);
                            })
                        : "undefined" != typeof poptin_landing_page &&
                          1 == poptin_landing_page &&
                          e({ display: !0 })
                      : ("manual" != l.category &&
                          "product_collection" != l.category) ||
                        (e({ display: !0 }),
                        i ||
                          kt(t, d, function (i) {
                            var n,
                              o =
                                null != i &&
                                null !== (n = i.data) &&
                                void 0 !== n &&
                                n.products
                                  ? i.data.products
                                  : [];
                            (window.shopifyProductCurrency = i.currency
                              ? i.currency
                              : "USD"),
                              Ct(t.poptin_id, o, t),
                              e({ display: !0 });
                          }));
                });
              },
              kt = function (t, i, e) {
                jQ224
                  .ajax(
                    {
                      url:
                        Ai +
                        "/APIRequest/shopify/product-recommendation/" +
                        t.poptin_id,
                      type: "post",
                      data: i,
                      async: !0,
                    },
                    "json"
                  )
                  .done(function (t) {
                    1 == t.success && e(t);
                  })
                  .fail(function (t) {
                    console.log("Failed to fetch shopify data"), reject(t);
                  });
              },
              Ct = function (t, i, e, n) {
                var o = {
                  vertical: { 1: [100, 150, 200, 250, 300] },
                  horizontal: {
                    1: [150, 180, 200, 280, 350],
                    2: [200, 300, 400, 550, 750],
                    3: [400, 450, 620, 680, 800],
                  },
                };
                if (
                  (e &&
                    "fullpage" == e.poptin_type &&
                    ((o.horizontal[1] = [150, 180, 200, 400, 600]),
                    (o.horizontal[2] = [250, 300, 400, 800, 100]),
                    (o.horizontal[3] = [400, 500, 620, 900, 1200])),
                  jQ224("#shopifyProductsJSON").length > 0)
                )
                  var p = JSON.parse(jQ224("#shopifyProductsJSON").val());
                var a = 0,
                  r = [],
                  s = [];
                (s =
                  "last_visited" == p.category
                    ? yi("poptin_shopify_recent_product_id")
                      ? gi("poptin_shopify_recent_product_id").split(",")
                      : []
                    : "manual" == p.category
                    ? p.manual_products.length
                      ? p.manual_products
                      : []
                    : "product_in_cart" == p.category && null != n && n.length
                    ? n
                    : []),
                  i.length > 0 &&
                    (i.forEach(function (t) {
                      t.variants &&
                        t.variants.length > 0 &&
                        t.variants.forEach(function (i) {
                          var e = {};
                          (-1 == s.indexOf(i.id.toString()) && 0 != s) ||
                            ((e.product_id = t.id),
                            (e.variant_id = i.id),
                            (e.image = t.image),
                            (e.desc = t.body_html),
                            (e.title =
                              t.title +
                              (i.title && "Default Title" != i.title
                                ? " - " + i.title
                                : "")),
                            (e.handle = t.handle),
                            (e.inventory_quantity = i.inventory_quantity),
                            (e.price =
                              i.presentment_prices &&
                              i.presentment_prices.length > 0 &&
                              i.presentment_prices[0].price &&
                              i.presentment_prices[0].price.amount
                                ? i.presentment_prices[0].price.amount
                                : i.price),
                            (e.currency_symbol = window.shopifyProductCurrency
                              ? window.shopifyProductCurrency
                              : "USD"),
                            (e.compare_at_price = i.compare_at_price),
                            r.length <= 3 && r.push(e));
                        });
                    }),
                    setTimeout(function () {
                      var i = {
                          AED: "Ø¯.Ø¥",
                          AFN: "Ø‹",
                          ALL: "L",
                          AMD: "Ö",
                          ANG: "Æ’",
                          AOA: "Kz",
                          ARS: "$",
                          AUD: "$",
                          AWG: "Æ’",
                          AZN: "â‚¼",
                          BAM: "KM",
                          BBD: "$",
                          BDT: "à§³",
                          BGN: "Ð»Ð²",
                          BHD: ".Ø¯.Ø¨",
                          BIF: "FBu",
                          BMD: "$",
                          BND: "$",
                          BOB: "$b",
                          BOV: "BOV",
                          BRL: "R$",
                          BSD: "$",
                          BTC: "â‚¿",
                          BTN: "Nu.",
                          BWP: "P",
                          BYN: "Br",
                          BYR: "Br",
                          BZD: "BZ$",
                          CAD: "$",
                          CDF: "FC",
                          CHE: "CHE",
                          CHF: "CHF",
                          CHW: "CHW",
                          CLF: "CLF",
                          CLP: "$",
                          CNY: "Â¥",
                          COP: "$",
                          COU: "COU",
                          CRC: "â‚¡",
                          CUC: "$",
                          CUP: "â‚±",
                          CVE: "$",
                          CZK: "KÄ",
                          DJF: "Fdj",
                          DKK: "kr",
                          DOP: "RD$",
                          DZD: "Ø¯Ø¬",
                          EEK: "kr",
                          EGP: "Â£",
                          ERN: "Nfk",
                          ETB: "Br",
                          ETH: "Îž",
                          EUR: "â‚¬",
                          FJD: "$",
                          FKP: "Â£",
                          GBP: "Â£",
                          GEL: "â‚¾",
                          GGP: "Â£",
                          GHC: "â‚µ",
                          GHS: "GHâ‚µ",
                          GIP: "Â£",
                          GMD: "D",
                          GNF: "FG",
                          GTQ: "Q",
                          GYD: "$",
                          HKD: "$",
                          HNL: "L",
                          HRK: "kn",
                          HTG: "G",
                          HUF: "Ft",
                          IDR: "Rp",
                          ILS: "â‚ª",
                          IMP: "Â£",
                          INR: "â‚¹",
                          IQD: "Ø¹.Ø¯",
                          IRR: "ï·¼",
                          ISK: "kr",
                          JEP: "Â£",
                          JMD: "J$",
                          JOD: "JD",
                          JPY: "Â¥",
                          KES: "KSh",
                          KGS: "Ð»Ð²",
                          KHR: "áŸ›",
                          KMF: "CF",
                          KPW: "â‚©",
                          KRW: "â‚©",
                          KWD: "KD",
                          KYD: "$",
                          KZT: "â‚¸",
                          LAK: "â‚­",
                          LBP: "Â£",
                          LKR: "â‚¨",
                          LRD: "$",
                          LSL: "M",
                          LTC: "Å",
                          LTL: "Lt",
                          LVL: "Ls",
                          LYD: "LD",
                          MAD: "MAD",
                          MDL: "lei",
                          MGA: "Ar",
                          MKD: "Ð´ÐµÐ½",
                          MMK: "K",
                          MNT: "â‚®",
                          MOP: "MOP$",
                          MRO: "UM",
                          MRU: "UM",
                          MUR: "â‚¨",
                          MVR: "Rf",
                          MWK: "MK",
                          MXN: "$",
                          MXV: "MXV",
                          MYR: "RM",
                          MZN: "MT",
                          NAD: "$",
                          NGN: "â‚¦",
                          NIO: "C$",
                          NOK: "kr",
                          NPR: "â‚¨",
                          NZD: "$",
                          OMR: "ï·¼",
                          PAB: "B/.",
                          PEN: "S/.",
                          PGK: "K",
                          PHP: "â‚±",
                          PKR: "â‚¨",
                          PLN: "zÅ‚",
                          PYG: "Gs",
                          QAR: "ï·¼",
                          RMB: "ï¿¥",
                          RON: "lei",
                          RSD: "Ð”Ð¸Ð½.",
                          RUB: "â‚½",
                          RWF: "Râ‚£",
                          SAR: "ï·¼",
                          SBD: "$",
                          SCR: "â‚¨",
                          SDG: "Ø¬.Ø³.",
                          SEK: "kr",
                          SGD: "S$",
                          SHP: "Â£",
                          SLL: "Le",
                          SOS: "S",
                          SRD: "$",
                          SSP: "Â£",
                          STD: "Db",
                          STN: "Db",
                          SVC: "$",
                          SYP: "Â£",
                          SZL: "E",
                          THB: "à¸¿",
                          TJS: "SM",
                          TMT: "T",
                          TND: "Ø¯.Øª",
                          TOP: "T$",
                          TRL: "â‚¤",
                          TRY: "â‚º",
                          TTD: "TT$",
                          TVD: "$",
                          TWD: "NT$",
                          TZS: "TSh",
                          UAH: "â‚´",
                          UGX: "USh",
                          USD: "$",
                          UYI: "UYI",
                          UYU: "$U",
                          UYW: "UYW",
                          UZS: "Ð»Ð²",
                          VEF: "Bs",
                          VES: "Bs.S",
                          VND: "â‚«",
                          VUV: "VT",
                          WST: "WS$",
                          XAF: "FCFA",
                          XBT: "Éƒ",
                          XCD: "$",
                          XOF: "CFA",
                          XPF: "â‚£",
                          XSU: "Sucre",
                          XUA: "XUA",
                          YER: "ï·¼",
                          ZAR: "R",
                          ZMW: "ZK",
                          ZWD: "Z$",
                          ZWL: "$",
                        },
                        n = G() ? "×™×—×™×“×•×ª ×‘×ž×œ××™" : "remaining items";
                      r.forEach(function (e) {
                        var o = jQ224(
                            ".poptin-popup[data-poptin-id=" +
                              t +
                              "] .fr-shopify-products .fr-shopify-item:nth-child(" +
                              (a + 1) +
                              ")"
                          ),
                          r = e.currency_symbol ? e.currency_symbol : "USD",
                          s = i[r];
                        if (
                          (e.image && e.image.src
                            ? o
                                .find(".fr-shopify-item-img img")
                                .attr("src", e.image.src)
                            : o
                                .find(".fr-shopify-item-img img")
                                .attr(
                                  "src",
                                  Li + "/css/images/v_2/product-no-img.png"
                                ),
                          e.title
                            ? (e.title.length > 50 &&
                                (e.title = e.title.substring(0, 50) + "..."),
                              o.find(".fr-shopify-item-title").text(e.title))
                            : o
                                .find(".fr-shopify-item-title")
                                .css("display", "none"),
                          e.desc
                            ? o.find(".fr-shopify-item-desc").text(e.desc)
                            : o
                                .find(".fr-shopify-item-desc")
                                .text("")
                                .css("display", "none"),
                          e.handle)
                        ) {
                          var d =
                            window.location.origin + "/products/" + e.handle;
                          e.variant_id && (d = d + "?variant=" + e.variant_id),
                            o.find(".fr-shopify-item-btn a").attr("data-url", d);
                        }
                        e.price
                          ? o
                              .find(".fr-shopify-item-price .before-disc")
                              .text(s + e.price)
                          : o
                              .find(".fr-shopify-item-price .before-disc")
                              .css("display", "none"),
                          e.price
                            ? o
                                .find(".fr-shopify-item-price .after-disc")
                                .text(s + e.compare_at_price)
                            : o
                                .find(".fr-shopify-item-price .after-disc")
                                .css("display", "none"),
                          e.inventory_quantity
                            ? o
                                .find(".fr-shopify-item-inventory-quantity")
                                .text(e.inventory_quantity + " " + n)
                            : o
                                .find(".fr-shopify-item-inventory-quantity")
                                .css("display", "none"),
                          o
                            .find(".fr-shopify-item-btn a")
                            .attr("data-product-name", e.title),
                          o
                            .find(".fr-shopify-item-btn a")
                            .attr("data-product-id", e.product_id),
                          o
                            .find(".fr-shopify-item-btn a")
                            .attr("data-variant-id", e.variant_id),
                          o
                            .find(".fr-shopify-item-btn a")
                            .attr("data-buttons-action", p.buttons_action),
                          (a += 1);
                      });
                      var s = 3;
                      p.count < 3 && (s = p.count),
                        (("manual" == p.category && r.length <= 3) ||
                          r.length < p.count) &&
                          (s = r.length),
                        (function (i, n) {
                          var a = jQ224(
                            ".poptin-popup[data-poptin-id=" +
                              t +
                              "]  .froala-shopify-wrapper"
                          ).attr("data-size");
                          (a = a ? a.split("-")[1] : "3"),
                            1 == n
                              ? jQ224(
                                  ".poptin-popup[data-poptin-id=" +
                                    t +
                                    "] .fr-shopify-products .fr-shopify-item:not(:first-child)"
                                ).remove()
                              : 2 == n &&
                                jQ224(
                                  ".poptin-popup[data-poptin-id=" +
                                    t +
                                    "] .fr-shopify-products .fr-shopify-item:not(:first-child):not(:nth-child(2))"
                                ).remove();
                          if (
                            (jQ224(
                              ".poptin-popup[data-poptin-id=" +
                                t +
                                "]  .froala-shopify-wrapper"
                            ).css("width", o[i][n][a - 1] + "px"),
                            r.length < p.count && "manual" != p.category)
                          ) {
                            var s =
                              jQ224(
                                "[data-poptin-id=" + e.poptin_id + "]"
                              ).width() -
                              jQ224(
                                "[data-poptin-id=" +
                                  e.poptin_id +
                                  "] .froala-shopify-wrapper"
                              ).width();
                            jQ224(
                              "[data-poptin-id=" +
                                e.poptin_id +
                                "] .froala-shopify-wrapper"
                            ).css({ left: s / 2 + "px" });
                          }
                        })("horizontal", s);
                    }, 500));
              },
              St = function (t) {
                e("ifLinkConversion"),
                  jQ224("[data-poptin-id=" + t.poptin_id + "]").find(
                    "#redirectBlank"
                  ).length > 0
                    ? (e("ifLinkConversion1"), Mt(t, "click", "#redirectBlank"))
                    : jQ224("[data-poptin-id=" + t.poptin_id + "]").find(
                        ".redirect-url-blank"
                      ).length > 0
                    ? (e("ifLinkConversion2"),
                      Mt(t, "click", ".redirect-url-blank"))
                    : t.gamified_prize &&
                      1 == t.gamified_prize.redirect_to &&
                      null !=
                        t.gamified_prize.redirect_to_options.redirect_to_url &&
                      (e("ifLinkConversion3"), Mt(t, "direct", "gamified"));
              },
              Pt = function (t, i) {
                var n = jQ224(
                  '[data-poptin-id="' +
                    t.poptin_id +
                    '"] [id="poptinFormSubmit' +
                    t.poptin_id +
                    '"] .inputs-container'
                );
                if (
                  !(function (t, i) {
                    var e = !1,
                      n = 0,
                      o = jQ224(
                        "[data-poptin-id=" +
                          t.poptin_id +
                          "] #poptinFormSubmit" +
                          t.poptin_id +
                          " .poptin-design-fields-form:not(#poptinDesignInputTextFieldCheckbox)"
                      );
                    return (
                      o.length > 0
                        ? o.each(function (t) {
                            var i = this.value;
                            0 == n &&
                              (jQ224("#" + this.id).is(":checked") ||
                              ("checkbox" != jQ224("#" + this.id).attr("type") &&
                                "radio" != jQ224("#" + this.id).attr("type"))
                                ? ("checkbox" ==
                                    jQ224("#" + this.id).attr("type") &&
                                    "radio" ==
                                      jQ224("#" + this.id).attr("type")) ||
                                  "" === i ||
                                  ((e = !0), (n = 1))
                                : (e = !1));
                          })
                        : (e = !0),
                      e
                    );
                  })(t)
                )
                  return (
                    sn ||
                      (n.addClass("poptin__animated animate__shakeX"),
                      setTimeout(function () {
                        n.removeClass("poptin__animated"),
                          n.removeClass(function (t, i) {
                            return (i.match(/\banimate_\S+/g) || []).join(" ");
                          });
                      }, 1e3)),
                    1 ==
                    jQ224(
                      '[data-poptin-id="' +
                        t.poptin_id +
                        '"] [id="poptinFormSubmit' +
                        t.poptin_id +
                        '"] #poptinDesignInputTextFieldEmail'
                    ).length
                      ? jQ224(
                          '[data-poptin-id="' +
                            t.poptin_id +
                            '"] [id="poptinFormSubmit' +
                            t.poptin_id +
                            '"] #poptinDesignInputTextFieldEmail'
                        )
                          .css("border", "none")
                          .addClass("empty-field")
                      : jQ224(
                          '[data-poptin-id="' +
                            t.poptin_id +
                            '"] [id="poptinFormSubmit' +
                            t.poptin_id +
                            '"] .inputs-container input'
                        )
                          .first()
                          .css("border", "none")
                          .addClass("empty-field"),
                    (function (t) {
                      try {
                        jQ224(
                          "[data-poptin-id=" +
                            t.poptin_id +
                            "] .inputs-container input"
                        ).off("keyup keydown");
                      } catch (t) {
                        e(t);
                      }
                      jQ224(
                        "[data-poptin-id=" +
                          t.poptin_id +
                          "] .inputs-container input"
                      ).on("keyup", function (t) {
                        jQ224(this).hasClass("empty-field") &&
                          jQ224(this).removeClass("empty-field");
                      });
                    })(t),
                    !1
                  );
                e("submitPoptin: " + t.poptin_id),
                  (Ze[t.poptin_id].poptin_trigger.convert = !0);
                try {
                  Tt(t, i);
                } catch (i) {
                  vi("submitPoptin()->poptinConversion()", i, "", "", t), Ot(t);
                }
                if (
                  (t.poptin_type + "_" + t.poptin_format != "social_format_2" &&
                    t.poptin_type + "_" + t.poptin_format != "social_format_6" &&
                    t.poptin_type + "_" + t.poptin_format != "sside_format_19" &&
                    Ft(t, i),
                  "gamified" == t.poptin_type &&
                    t.gamified_prize &&
                    1 == t.gamified_prize.redirect_to &&
                    null != t.gamified_prize.redirect_to_options.redirect_to_url)
                )
                  if (
                    (e("ifLinkConversion3"),
                    "format_3" == t.poptin_format &&
                      t.design_properties.disable_post_play_screen)
                  ) {
                    var o =
                      t.gamified_prize.redirect_to_options.redirect_close_delay;
                    setTimeout(
                      function () {
                        Mt(t, "direct", "gamified");
                      },
                      o
                        ? 1e3 *
                            (parseInt(o) +
                              (t.design_properties.disable_post_play_screen
                                ? 8
                                : 0))
                        : 1e3 * (t.wheel_has_coupon ? 3 * We : We)
                    );
                  } else Mt(t, "direct", "gamified");
              },
              Tt = function (t, i) {
                var n =
                    arguments.length > 2 && void 0 !== arguments[2]
                      ? arguments[2]
                      : "",
                  p =
                    arguments.length > 3 && void 0 !== arguments[3]
                      ? arguments[3]
                      : null;
                e("poptinConversion: " + t.poptin_id),
                  jQ224(
                    '[data-poptin-id="' + t.poptin_id + '"].poptin-popup'
                  ).addClass("poptin-submitted");
                var a = jQ224(
                    '[data-poptin-id="' +
                      t.poptin_id +
                      '"].poptin-popup div#' +
                      ("" != n ? n : "poptinFormSubmitText")
                  ),
                  r = "";
                a.length
                  ? (r = (a = a.first()).text().trim())
                  : "shopify_products" == n &&
                    (r = t.shopify_product_settings.button_text);
                var s = { event_name: "poptinSubmit", button_text: r };
                "shopify_products" == n &&
                  (s.shopify = t.shopify_product_settings);
                var l = new CustomEvent("poptinSubmit", {
                  bubbles: !0,
                  detail: dt(t, s),
                });
                document.dispatchEvent(l),
                  onpoptinSubmit(t.poptin_id),
                  jQ224(
                    "[data-poptin-id=" +
                      t.poptin_id +
                      "] #poptinFormSubmit" +
                      t.poptin_id +
                      " .poptin-design-fields-form"
                  ).each(function (t) {
                    -1 !== this.id.indexOf("FreeField") &&
                      (jQ224(this).css("display", "none"),
                      (val = jQ224(this).val()),
                      (placeolder = jQ224(this).attr("placeholder")),
                      jQ224(this).val("a:" + placeolder + "=&=b:" + val));
                  }),
                  (trigger =
                    null == t.auto_pilot_trigger
                      ? "false"
                      : t.auto_pilot_trigger),
                  (checkbox_checked = jQ224(
                    '[data-poptin-id="' +
                      t.poptin_id +
                      '"] form > #poptinDesignInputTextFieldCheckbox input'
                  ).prop("checked")),
                  (poptin_params = {
                    url: window.location.href,
                    p_target: t.poptin_target,
                    checkbox_checked,
                    referrer: Wt(),
                    previous_url: Gt(),
                    trigger,
                    poptin_id: t.poptin_id,
                    title: document.title,
                    client_id: o(),
                    visitor: sn ? "mobile" : "desktop",
                    facebook_messanger_data_ref: yn,
                    origin_landing_page: Zt(),
                    previous_visited_pages: d(),
                    shopify_customer_id: Nn,
                  });
                var _ = new Array(),
                  c = [
                    "poptinDesignInputTextFieldName",
                    "poptinDesignInputTextFieldEmail",
                    "poptinDesignInputTextFieldPhone",
                    "poptinDesignInputTextFieldMessage",
                    "poptinDesignInputTextFieldCheckbox",
                  ];
                new_extra_fields = {};
                var f = jQ224("[data-poptin-id=" + t.poptin_id + "].active")
                  .length
                  ? ".active"
                  : "";
                jQ224(
                  "[data-poptin-id=" +
                    t.poptin_id +
                    "]" +
                    f +
                    " #poptinFormSubmit" +
                    t.poptin_id +
                    " .poptin-design-fields-form"
                ).each(function () {
                  if (
                    (e(this.name, this.type, this.value),
                    jQ224.inArray(this.name, c) > -1 ||
                      (this.name.indexOf("FreeField") > -1 &&
                        -1 == this.id.indexOf("poptinDesignInputTextFieldText")))
                  )
                    (poptin_params[this.name] =
                      null == this.value ? "" : this.value),
                      _.push({
                        type: this.type,
                        name: this.name
                          .split("poptinDesignInput")[1]
                          .toLowerCase(),
                        placeholder: this.placeholder,
                        value: this.value,
                      });
                  else {
                    var t = !1,
                      i = "hidden" == this.type ? this.name : this.placeholder,
                      n = this.value;
                    ("radio" != this.type && "checkbox" != this.type) ||
                      (this.checked || (t = !0),
                      (i = jQ224(this)
                        .parentsUntil(".child-field-wrapper")
                        .parent()
                        .siblings("label.child-field-question")
                        .text()),
                      (n = jQ224(this).next().text())),
                      jQ224(this).is("select") &&
                        ((i = jQ224(this).attr("data-placeholder")),
                        (n = jQ224(this).find(":selected").text())),
                      t ||
                        (null == new_extra_fields[this.name]
                          ? (new_extra_fields[this.name] = {
                              id: this.id,
                              type: this.type,
                              name: this.name,
                              placeholder: i,
                              value:
                                "poptinDesignInputTextFieldCheckbox" == this.name
                                  ? checkbox_checked
                                  : n,
                            })
                          : "checkbox" == this.type
                          ? (new_extra_fields[this.name].value =
                              new_extra_fields[this.name].value + ", " + n)
                          : (new_extra_fields[this.name].placeholder =
                              new_extra_fields[this.name].placeholder + ", " + i),
                        _.push(new_extra_fields[this.name]));
                  }
                }),
                  jQ224(_).each(function () {
                    var i = this.value,
                      e = this.name.replace(/textfield/g, "");
                    (e = "{{_" + e + "}}"),
                      jQ224("[data-poptin-id=" + t.poptin_id + "]")
                        .find(".froala-editor-text, .froala-editor-ticker")
                        .each(function () {
                          var t = new RegExp(e, "gm");
                          jQ224(this).find(".fr-marker").remove(),
                            jQ224(this).html(jQ224(this).html().replace(t, i));
                        });
                  }),
                  (new_extra_fields = new_extra_fields || {});
                try {
                  new_extra_fields = Object.values(new_extra_fields);
                } catch (t) {
                  var u = Object.keys(new_extra_fields).map(function (t) {
                    return new_extra_fields[t];
                  });
                  new_extra_fields = u;
                }
                var h = {
                  text: 0,
                  number: 0,
                  textarea: 0,
                  date: 0,
                  url: 0,
                  radio: 0,
                  checkbox: 0,
                  hidden: 0,
                  tel: 0,
                  select: 0,
                };
                if (
                  (e("Logger Logger", new_extra_fields),
                  jQ224(new_extra_fields).each(function (i) {
                    var e = new_extra_fields[i].type,
                      n = new_extra_fields[i].name;
                    e.indexOf("select") > -1 && (e = "select"),
                      n.indexOf("poptinDesignWebsiteField") > -1 && (e = "url"),
                      n.indexOf("poptinDesignDateField") > -1 && (e = "date"),
                      (h[e] = h[e] + 1),
                      (n = e + "_" + h[e]),
                      (new_extra_fields[i].name = n),
                      (new_extra_fields[i].type = e),
                      "hidden" == e &&
                        new_extra_fields[i].value &&
                        new_extra_fields[i].value.indexOf("{{prize_code}}") >
                          -1 &&
                        ((new_extra_fields[i].name = "prize_code"),
                        (new_extra_fields[i].value = t.gamified_prize
                          ? t.gamified_prize.code
                          : "")),
                      "hidden" == e &&
                        new_extra_fields[i].value &&
                        new_extra_fields[i].value.indexOf("{{prize_label}}") >
                          -1 &&
                        ((new_extra_fields[i].name = "prize_label"),
                        (new_extra_fields[i].value = t.gamified_prize
                          ? t.gamified_prize.label
                          : ""));
                  }),
                  t.shopify_product_settings &&
                    t.shopify_product_settings.product_name)
                ) {
                  var g = {
                    id: "poptinShopifyRecomProductName",
                    name: "product_name",
                    placeholder: "Product name",
                    type: "hidden",
                    value: t.shopify_product_settings.product_name,
                  };
                  new_extra_fields.push(g);
                }
                (poptin_params.newExtraFields = JSON.stringify(new_extra_fields)),
                  (poptin_params.leader_request_cookie = Jt()),
                  (poptin_params.extra_button = n),
                  (poptinSubmitted[t.poptin_id] = {
                    poptin_id: poptin_params.poptin_id,
                    client_id:
                      void 0 !== poptin_params.client_id
                        ? poptin_params.client_id
                        : "",
                    referrer: poptin_params.referrer,
                    previous_url: poptin_params.previous_url,
                    page_title: poptin_params.title,
                    page_url: poptin_params.url,
                    consent: poptin_params.checkbox_checked,
                    previous_visited_pages: poptin_params.previous_visited_pages,
                    fields: _,
                  }),
                  (vn = At(t)),
                  e(poptin_params),
                  jQ224.ajax(
                    {
                      type: "GET",
                      async: !0,
                      cache: !0,
                      data: poptin_params,
                      url: Ai + "/APIRequest/conversion/" + t.viewer_id,
                      success: function (i) {
                        console.log(poptinSubmitted);
                        if ((e("poptinConversion()->success()"), i.success))
                          try {
                            Bt(t, i, n);
                          } catch (e) {
                            vi(
                              "poptinConversion()->handleConversionSuccess",
                              e,
                              "OK",
                              i,
                              t,
                              poptin_params
                            );
                          }
                      },
                      error: function (i, e, n) {
                        vi(
                          "poptinConversion()->error()",
                          n,
                          e,
                          i.responseText,
                          t
                        );
                      },
                      complete: function (i) {
                        console.log(poptinSubmitted);
                        if (
                          (e("poptinConversion()>complete()"),
                          "undefined" == typeof Shopify ||
                            (t.shopify_product_settings &&
                              t.shopify_product_settings.product_url) ||
                            (e("handeShopifyAddToCart()"), Dt(t, !0, "", n, p)),
                          "undefined" != typeof Shopify &&
                            t.shopify_product_settings &&
                            t.shopify_product_settings.product_url &&
                            "no_buttons" !=
                              t.shopify_product_settings.buttons_action)
                        )
                          return e("redirectShopifyProducts"), zt(t), !1;
                        "" !== n ? zi(p) : Ot(t);
                      },
                    },
                    "JSON"
                  );
              },
              It = function (t) {
                jQ224(
                  ".poptin-popup[data-poptin-id=" +
                    t +
                    "], .poptin-popup-background[data-poptin-id=" +
                    t +
                    "]"
                ).remove();
              },
              zt = function (t) {
                if (
                  "add_to_cart" == t.shopify_product_settings.buttons_action ||
                  "add_to_cart_redirect" ==
                    t.shopify_product_settings.buttons_action
                )
                  jQ224.ajax({
                    url: "/cart/add.js",
                    type: "POST",
                    async: !1,
                    data: {
                      items: [
                        {
                          quantity: 1,
                          id: t.shopify_product_settings.variant_id,
                        },
                      ],
                    },
                    complete: function (i) {
                      "add_to_cart_redirect" ==
                      t.shopify_product_settings.buttons_action
                        ? (window.location.href =
                            window.location.origin + "/cart")
                        : "add_to_cart" ==
                            t.shopify_product_settings.buttons_action &&
                          window.location.reload();
                    },
                  });
                else if (
                  "redirect" == t.shopify_product_settings.buttons_action ||
                  "redirect_blank" == t.shopify_product_settings.buttons_action
                )
                  if (
                    "redirect_blank" == t.shopify_product_settings.buttons_action
                  ) {
                    var i =
                        "poptin_spr_" +
                        t.shopify_product_settings.product_id +
                        "_" +
                        t.shopify_product_settings.variant_id,
                      e =
                        '<a id="' +
                        i +
                        '" href="' +
                        t.shopify_product_settings.product_url +
                        '" target="_blank"></a>';
                    jQ224("body").append(e),
                      jQ224("#" + i)[0].click(),
                      jQ224("#" + i)[0].remove();
                  } else
                    window.location.href = t.shopify_product_settings.product_url;
                closePoptin(t.poptin_id);
              },
              Dt = function (t, i) {
                var n =
                    arguments.length > 2 && void 0 !== arguments[2]
                      ? arguments[2]
                      : "",
                  o =
                    arguments.length > 3 && void 0 !== arguments[3]
                      ? arguments[3]
                      : "",
                  p =
                    arguments.length > 4 && void 0 !== arguments[4]
                      ? arguments[4]
                      : null;
                if ((e("handeShopifyAddToCart: " + t.poptin_id), i))
                  var a =
                    null != t.design_properties.add_to_cart
                      ? t.design_properties.add_to_cart.split("@")
                      : "";
                else if ("poptinForm2ndlinkbtnText" === n)
                  a =
                    null != t.design_properties.shopify_add_to_cart_2
                      ? t.design_properties.shopify_add_to_cart_2.split("@")
                      : "";
                else if ("poptinForm3ndlinkbtnText" === n)
                  a =
                    null != t.design_properties.shopify_add_to_cart_3
                      ? t.design_properties.shopify_add_to_cart_3.split("@")
                      : "";
                else if ("poptinForm4thlinkbtnText" === n)
                  a =
                    null != t.design_properties.shopify_add_to_cart_4
                      ? t.design_properties.shopify_add_to_cart_4.split("@")
                      : "";
                else if ("poptinForm5thlinkbtnText" === n)
                  a =
                    null != t.design_properties.shopify_add_to_cart_5
                      ? t.design_properties.shopify_add_to_cart_5.split("@")
                      : "";
                else if ("poptinForm6thlinkbtnText" === n)
                  a =
                    null != t.design_properties.shopify_add_to_cart_6
                      ? t.design_properties.shopify_add_to_cart_6.split("@")
                      : "";
                if (a && Array.isArray(a)) {
                  var r = a[0] || 0,
                    s = a[1] || 0,
                    d = parseInt(a[2]) || 0,
                    l = a[3];
                  jQ224.ajax({
                    url: "/cart/add.js",
                    type: "POST",
                    async: !1,
                    data: { items: [{ quantity: s, id: r }] },
                    complete: function (t) {
                      1 === d
                        ? (window.location.href = l)
                        : window.location.reload();
                    },
                  });
                } else "" !== o ? zi(p) : Ot(t);
              },
              Ot = function (t) {
                e("redirectAfterConversion: " + t.poptin_id);
                var i = jQ224(
                  ".poptin-popup[data-poptin-id=" + t.poptin_id + "]"
                );
                null == Ze[t.poptin_id].redirect_flag ||
                  Ze[t.poptin_id].redirect_flag ||
                  ("true" ==
                    (i = jQ224(
                      ".poptin-popup[data-poptin-id=" + t.poptin_id + "]"
                    )).attr("data-redirect-poptin") &&
                    13 == i.attr("data-redirect-poptin-id").length) ||
                  setTimeout(function () {
                    void 0 === Ze[t.poptin_id].redirect_url ||
                      null == Ze[t.poptin_id].redirect_flag ||
                      Ze[t.poptin_id].redirect_flag ||
                      Mt(t, "direct", !1);
                  }, 50);
                "mobile" == t.poptin_type &&
                  ("format_1" == t.poptin_format ||
                    "format_6" == t.poptin_format ||
                    "format_11" == t.poptin_format ||
                    ("true" != i.attr("data-redirect-poptin") &&
                      void 0 !== t.design_properties.poptin_design_redirect)) &&
                  setTimeout(function () {
                    Mt(t, "direct", !1);
                  }, 50);
              },
              Mt = function (t, i, n) {
                if (
                  (e("poptinRedirectToUrl"),
                  t.design_properties.poptin_design_redirect_send_form_data)
                )
                  if ((e("poptinRedirectToUrl1"), "click" == i)) {
                    e("poptinRedirectToUrl1.1");
                    var o = jQ224("[data-poptin-id=" + t.poptin_id + "]")
                      .find(n)
                      .attr("href");
                    vn = "" == vn ? At(t) : vn;
                    var p = (o = $t(o, vn)).split("?"),
                      a = p[0];
                    p.shift();
                    var r = (o = a + "?" + p.join("&")),
                      s = 0;
                    sn &&
                      (e("poptinRedirectToUrl1.1 ifMobilePoptin"),
                      jQ224("[data-poptin-id=" + t.poptin_id + "]").append(
                        '<a id="poptin-mob-redirection-' +
                          t.poptin_id +
                          '" href="' +
                          r +
                          '" style="display:none"></a>'
                      ),
                      document
                        .getElementById("poptin-mob-redirection-" + t.poptin_id)
                        .click()),
                      null != t.design_properties.poptin_design_thank_screen &&
                        null !=
                          t.design_properties
                            .poptin_design_thank_screen_auto_close &&
                        null !=
                          t.design_properties
                            .poptin_design_thank_screen_auto_close_sec &&
                        (s = parseInt(
                          t.design_properties
                            .poptin_design_thank_screen_auto_close_sec
                        )),
                      setTimeout(function () {
                        jQ224("[data-poptin-id=" + t.poptin_id + "]")
                          .find(n)
                          .attr("href", o),
                          jQ224("[data-poptin-id=" + t.poptin_id + "]")
                            .find(n)[0]
                            .click(),
                          (Ze[t.poptin_id].redirect_flag = !0);
                      }, 1e3 * s);
                  } else {
                    e("poptinRedirectToUrl1.2");
                    r = Ze[t.poptin_id].redirect_url + vn;
                    sn &&
                      (jQ224("[data-poptin-id=" + t.poptin_id + "]").append(
                        '<a id="poptin-mob-redirection-' +
                          t.poptin_id +
                          '" href="' +
                          r +
                          '" style="display:none"></a>'
                      ),
                      document
                        .getElementById("poptin-mob-redirection-" + t.poptin_id)
                        .click()),
                      setTimeout(function () {
                        window.location.href = r;
                      }, 200);
                  }
                else if ((e("poptinRedirectToUrl2"), "click" == i)) {
                  e("poptinRedirectToUrl2.1"),
                    (Ze[t.poptin_id].redirect_flag = !0);
                  s = 0;
                  null != t.design_properties.poptin_design_thank_screen &&
                    null !=
                      t.design_properties.poptin_design_thank_screen_auto_close &&
                    null !=
                      t.design_properties
                        .poptin_design_thank_screen_auto_close_sec &&
                    (s = parseInt(
                      t.design_properties
                        .poptin_design_thank_screen_auto_close_sec
                    )),
                    setTimeout(function () {
                      e("poptinRedirectToUrl2.1 timeout");
                      var i = window.location.href,
                        o = window.location.pathname + window.location.search,
                        p = Ze[t.poptin_id].redirect_url,
                        a = jQ224("[data-poptin-id=" + t.poptin_id + "]").find(n),
                        r = a.prop("target"),
                        s = a.attr("href");
                      "_BLANK" == r && p
                        ? ((p = (p = (p = (p = p.replace(
                            "{conversion_url}",
                            "conversion_url=" + encodeURI(i)
                          )).replace(
                            "%7Bconversion_url%7D",
                            "conversion_url=" + encodeURI(i)
                          )).replace(
                            "{path_url}",
                            "path_url=" + encodeURI(o)
                          )).replace(
                            "%7Bpath_url%7D",
                            "path_url=" + encodeURI(o)
                          )),
                          window.open(p, "_blank"))
                        : "_BLANK" == r
                        ? window.open(s, "_blank")
                        : (window.location.href = s),
                        sn &&
                          p &&
                          (e("poptinRedirectToUrl2.1 timeout ifMobilePoptin"),
                          jQ224("[data-poptin-id=" + t.poptin_id + "]").append(
                            '<a id="poptin-mob-redirection-' +
                              t.poptin_id +
                              '" href="' +
                              p +
                              '" style="display:none"></a>'
                          ));
                    }, 1e3 * s);
                } else if ("gamified" == n) {
                  e("poptinRedirectToUrl2.2");
                  var d = t.wheel_has_coupon ? 3 * We : We;
                  t.gamified_prize &&
                    1 == t.gamified_prize.redirect_to &&
                    1 == t.gamified_prize.redirect_to_options.redirect_close &&
                    null !=
                      t.gamified_prize.redirect_to_options.redirect_close_delay &&
                    (d = parseInt(
                      t.gamified_prize.redirect_to_options.redirect_close_delay
                    )),
                    setTimeout(function () {
                      window.location.href =
                        t.gamified_prize.redirect_to_options.redirect_to_url;
                    }, 1e3 * d);
                } else {
                  e("poptinRedirectToUrl2.3");
                  r = Ze[t.poptin_id].redirect_url;
                  sn &&
                    (e("poptinRedirectToUrl2.2 ifMobilePoptin"),
                    jQ224("[data-poptin-id=" + t.poptin_id + "]").append(
                      '<a id="poptin-mob-redirection-' +
                        t.poptin_id +
                        '" href="' +
                        r +
                        '" style="display:none"></a>'
                    ),
                    document
                      .getElementById("poptin-mob-redirection-" + t.poptin_id)
                      .click()),
                    setTimeout(function () {
                      window.location.href = r;
                    }, 200);
                }
              },
              $t = function (t, i) {
                return (
                  (new_conversion_query = i),
                  e("url.indexOf('?')", t.indexOf("?")),
                  -1 !== t.indexOf("?") &&
                    (new_conversion_query = "?" == i[0] ? "&" + i.slice(1) : i),
                  t + new_conversion_query
                );
              },
              At = function (t) {
                var i = new Array(),
                  n = new Array(),
                  o = {};
                for (var p in (jQ224(
                  "[data-poptin-id=" +
                    t.poptin_id +
                    "] #poptinFormSubmit" +
                    t.poptin_id +
                    " .poptin-design-fields-form"
                ).each(function () {
                  e(this.name, this.type, this.value);
                  var t = "",
                    i = "",
                    p = 0,
                    a = this.type;
                  this.name.indexOf("poptinDesignInputTextField") >= 0
                    ? ((t = this.name.split("poptinDesignInputTextField")[1]),
                      "checkbox" == a
                        ? ((t = "consent"), (i = this.checked ? "yes" : "no"))
                        : ((t = t), (i = this.value)),
                      (p = 1))
                    : this.name.indexOf("poptinDesignInputFreeField") >= 0
                    ? ((t = this.name.split("poptinDesignInput")[1]),
                      (i =
                        this.value.indexOf("=&=b:") > -1
                          ? this.value.split("=&=b:")[1]
                          : this.value),
                      (p = o[t] = (o[t] || 0) + 1))
                    : this.name.indexOf("poptinDesignRadioField") >= 0 ||
                      this.name.indexOf("poptinDesignCheckboxField") >= 0
                    ? this.checked &&
                      ((t = this.name),
                      (i =
                        this.value.indexOf("=&=b:") > -1
                          ? this.value.split("=&=b:")[1]
                          : this.value),
                      (p = o[t] = (o[t] || 0) + 1))
                    : ((t = null == this.name ? this.tagName : this.name),
                      (i = this.value),
                      (p = o[this.type] = (o[this.type] || 0) + 1)),
                    "" != (t = t.toLowerCase()) &&
                      "" != i &&
                      ((i = i),
                      (n[t] = n[t] ? n[t] : new Array()),
                      this.name.indexOf("poptinDesignSelectField") > -1 &&
                        (a = "select"),
                      this.name.indexOf("poptinDesignWebsiteField") > -1 &&
                        (a = "url"),
                      (n[t] = { count: p, type: a, value: i }));
                }),
                n))
                  if (n.hasOwnProperty(p)) {
                    var a = n[p];
                    p.indexOf("poptindesign") > -1 &&
                      (p = a.type + "_" + a.count),
                      i.push(encodeURI(p) + "=" + encodeURI(a.value));
                  }
                return (
                  (query_fields = i.length > 0 ? "?" + i.join("&") : ""),
                  query_fields
                );
              },
              Ft = function (t, i) {
                var n = 0;
                if (
                  (e("afterPoptinSubmit: " + t.poptin_id),
                  jQ224(
                    "[data-poptin-id=" +
                      t.poptin_id +
                      "] .draggable-container:not(.poptin-tab-container)"
                  )
                    .find("audio, video")
                    .remove(),
                  void 0 !== t.design_properties.poptin_design_redirect &&
                    ("mobile" == t.poptin_type &&
                    null !=
                      t.design_properties.poptin_design_redirect_url.match(
                        /^[0-9*+-]+$/
                      )
                      ? ((redirect_phone =
                          t.design_properties.poptin_design_redirect_url),
                        (Ze[t.poptin_id].redirect_url = redirect_phone.match(
                          "^tel:"
                        )
                          ? redirect_phone
                          : "tel:" + redirect_phone))
                      : t.poptin_type + "_" + t.poptin_format !=
                          "social_format_2" &&
                        t.poptin_type + "_" + t.poptin_format !=
                          "social_format_6" &&
                        t.poptin_type + "_" + t.poptin_format !=
                          "sside_format_19" &&
                        ((redirect_url =
                          t.design_properties.poptin_design_redirect_url),
                        redirect_url.match("^tel:") || redirect_url.match("^sms:")
                          ? (Ze[t.poptin_id].redirect_url = redirect_url)
                          : (Ze[t.poptin_id].redirect_url = /^https?:\/\//i.test(
                              redirect_url
                            )
                              ? redirect_url
                              : "http://" + redirect_url),
                        (Ze[t.poptin_id].redirect_flag = !1))),
                  null != t.design_properties.poptin_design_thank_screen)
                ) {
                  if (
                    (null !=
                    t.design_properties.poptin_design_thank_screen_auto_close
                      ? null == i
                        ? (Ze[t.poptin_id].poptin_trigger.close_thank_screen_sec =
                            null !=
                            t.design_properties
                              .poptin_design_thank_screen_auto_close_sec
                              ? parseInt(
                                  t.design_properties
                                    .poptin_design_thank_screen_auto_close_sec
                                )
                              : 5)
                        : (n =
                            null !=
                            t.design_properties
                              .poptin_design_thank_screen_auto_close_sec
                              ? parseInt(
                                  t.design_properties
                                    .poptin_design_thank_screen_auto_close_sec
                                )
                              : 5)
                      : null == i
                      ? (Ze[
                          t.poptin_id
                        ].poptin_trigger.close_thank_screen_sec = 60)
                      : (n = 600),
                    "fullpage" == t.poptin_type)
                  ) {
                    var o = jQ224(
                      "[data-poptin-id=" + t.poptin_id + "] > #closeXButton"
                    ).css("left");
                    jQ224(
                      "[data-poptin-id=" + t.poptin_id + "] > #closeXButton"
                    ).remove();
                    var p = jQ224(
                      "[data-poptin-id=" +
                        t.poptin_id +
                        "] .poptin_thank_you_screen #closeXButton"
                    ).get(0).outerHTML;
                    jQ224(
                      "[data-poptin-id=" +
                        t.poptin_id +
                        "] .poptin_thank_you_screen #closeXButton"
                    ).remove(),
                      jQ224("[data-poptin-id=" + t.poptin_id + "]").prepend(p),
                      jQ224("#closeXButton, #closeSkipButton").each(function () {
                        jQ224(this).css({
                          position: "fixed",
                          right: "auto",
                          left: o,
                          margin: "auto",
                        });
                      });
                  }
                  jQ224(
                    "[data-poptin-id=" +
                      t.poptin_id +
                      "] .draggable-container:not(.poptin-tab-container)"
                  )
                    .css("display", "none")
                    .find(".draggable.image-change-video")
                    .remove(),
                    jQ224(
                      "[data-poptin-id=" +
                        t.poptin_id +
                        "] .draggable-container:not(.poptin-tab-container)"
                    ).removeClass("poptin-visible poptin__animated"),
                    jQ224("[data-poptin-id=" + t.poptin_id + "]").css(
                      "box-shadow",
                      ""
                    ),
                    jQ224(
                      "[data-poptin-id=" +
                        t.poptin_id +
                        "] .poptin_thank_you_screen"
                    ).addClass(
                      "poptin-visible poptin__animated animate__fadeIn animate__faster"
                    ),
                    jQ224(
                      "[data-poptin-id=" + t.poptin_id + "] .close-x-button"
                    ).show(100),
                    setTimeout(function () {
                      jQ224(
                        "[data-poptin-id=" +
                          t.poptin_id +
                          "] .poptin_thank_you_screen"
                      ).removeClass(
                        "poptin__animated animate__fadeIn animate__faster"
                      );
                    }, 800),
                    (t.poptin_type in bn &&
                      bn[t.poptin_type] >=
                        parseInt(t.poptin_format.split("_")[1])) ||
                      jQ224(document).on(
                        "click",
                        '[data-poptin-id="' + t.poptin_id + '"] #closeXButton',
                        function () {
                          closePoptinOnXclick(jQ224(this).get(0));
                        }
                      ),
                    H(
                      "data-autoplay",
                      "autoplay",
                      "[data-poptin-id=" + t.poptin_id + "] #poptinThankYouScreen"
                    ),
                    "fullpage" == t.poptin_type &&
                      V() &&
                      jQ224(
                        ".poptin-popup[data-poptin-id=" +
                          t.poptin_id +
                          "] .draggable-container:not(.poptin-tab-container) .close-x-button"
                      ).css({ "padding-right": "25px" }),
                    parseInt(
                      t.design_properties.poptin_design_close_on_screen_click
                    ) &&
                      (jQ224(".poptin-popup[data-poptin-id=" + t.poptin_id + "]")
                        .on("mouseenter", function (e) {
                          null == i
                            ? (Ze[t.poptin_id].poptin_trigger ||
                                (Ze[t.poptin_id].poptin_trigger = {}),
                              (Ze[
                                t.poptin_id
                              ].poptin_trigger.poptin_area_flag_submit = !0))
                            : (poptin_area_flag_submit = !0);
                        })
                        .on("mouseleave", function (e) {
                          null == i
                            ? (Ze[t.poptin_id].poptin_trigger ||
                                (Ze[t.poptin_id].poptin_trigger = {}),
                              (Ze[
                                t.poptin_id
                              ].poptin_trigger.poptin_area_flag_submit = !1))
                            : (poptin_area_flag_submit = !1);
                        }),
                      "lightbox" == t.poptin_type &&
                        jQ224(document).click(function (n) {
                          jQ224(n.target).closest(
                            ".poptin-popup[data-poptin-id=" + t.poptin_id + "]"
                          ).length ||
                            (null == i
                              ? Ze[t.poptin_id].poptin_trigger
                                  .poptin_area_flag_submit
                              : poptin_area_flag_submit) ||
                            (jQ224(
                              ".poptin-popup[data-poptin-id=" + t.poptin_id + "]"
                            ).is(":visible") &&
                              (e(
                                "close poptin" +
                                  t.poptin_id +
                                  " poptin_design_close_on_screen_click3"
                              ),
                              (Ze[t.poptin_id].poptin_trigger.close_trigger =
                                "bg_click"),
                              closePoptin(t.poptin_id)));
                        }));
                } else if (
                  null == t.design_properties.poptin_design_thank_screen &&
                  "gamified" == t.poptin_type
                ) {
                  if (
                    (("format_1" == t.poptin_format ||
                      "format_3" == t.poptin_format) &&
                      t.gamified_prize) ||
                    ("format_3" == t.poptin_format &&
                      t.design_properties.disable_post_play_screen)
                  ) {
                    t.gamified_prize &&
                    t.gamified_prize.redirect_to &&
                    1 == t.gamified_prize.redirect_to
                      ? null == i
                        ? (Ze[t.poptin_id].poptin_trigger.close_screen_sec =
                            null !=
                            t.gamified_prize.redirect_to_options
                              .redirect_close_delay
                              ? parseInt(
                                  t.gamified_prize.redirect_to_options
                                    .redirect_close_delay
                                )
                              : 1)
                        : (closeScreenSec =
                            null !=
                            t.gamified_prize.redirect_to_options
                              .redirect_close_delay
                              ? parseInt(
                                  t.gamified_prize.redirect_to_options
                                    .redirect_close_delay
                                )
                              : 1)
                      : null == i
                      ? (Ze[t.poptin_id].poptin_trigger.close_screen_sec = 60)
                      : (closeScreenSec = 600);
                    var a = 0;
                    t.design_properties.disable_post_play_screen &&
                      ((a = 8e3), Pi(t, !0)),
                      setTimeout(function () {
                        jQ224(
                          "[data-poptin-id=" +
                            t.poptin_id +
                            "] .poptin_play_screen"
                        ).css("display", "none"),
                          jQ224(
                            "[data-poptin-id=" +
                              t.poptin_id +
                              "] .poptin_play_screen"
                          ).removeClass("poptin-visible poptin__animated"),
                          jQ224("[data-poptin-id=" + t.poptin_id + "]").css(
                            "box-shadow",
                            ""
                          ),
                          1 == t.gamified_prize.is_winner
                            ? Lt(t)
                            : (jQ224(
                                "[data-poptin-id=" +
                                  t.poptin_id +
                                  "] .poptin_losing_screen"
                              ).addClass(
                                "poptin-visible poptin__animated animate__fadeIn animate__faster"
                              ),
                              setTimeout(function () {
                                jQ224(
                                  "[data-poptin-id=" +
                                    t.poptin_id +
                                    "] .poptin_losing_screen"
                                ).removeClass(
                                  "poptin__animated animate__fadeIn animate__faster"
                                );
                              }, 800));
                      }, a);
                  }
                  "format_2" == t.poptin_format &&
                    (jQ224(
                      "[data-poptin-id=" + t.poptin_id + "] .poptin_play_screen"
                    ).css("display", "none"),
                    jQ224(
                      "[data-poptin-id=" + t.poptin_id + "] .poptin_play_screen"
                    ).removeClass("poptin-visible poptin__animated"),
                    jQ224(
                      "[data-poptin-id=" +
                        t.poptin_id +
                        "] .poptin_winning_screen"
                    ).addClass(
                      "poptin-visible poptin__animated animate__fadeIn animate__faster"
                    ));
                } else
                  !(function (t) {
                    if ("lead" == t.poptin_target) {
                      var i =
                          G() && K()
                            ? "× ×©×œ×— ×‘×”×¦×œ×—×”!"
                            : "Sent successfully!",
                        e = jQ224(
                          ".poptin-popup[data-poptin-id=" + t.poptin_id + "]"
                        ),
                        n = e.find("#poptinFormSubmitText .froala-editor-button"),
                        o = n.find("p span"),
                        p = "inherit",
                        a = "direction:" + (G() && K() ? "rtl" : "ltr");
                      o.length > 0 && (p = o.css("color")),
                        0 == n.length && (n = e.find("#poptinFormSubmitText"));
                      var r =
                        '<span role="alert" style="color:' +
                        p +
                        ";font-size:18px;" +
                        a +
                        '">' +
                        i +
                        "</span>";
                      n.text("").append(r),
                        e.find("input.poptin-form-submit-button").hide();
                    }
                  })(t),
                    null == i
                      ? (Ze[t.poptin_id].poptin_trigger.close_thank_screen_sec =
                          G() && "click" != t.poptin_target ? 2 : 0.1)
                      : (n = G() && "click" != t.poptin_target ? 2 : 1);
                if (
                  "gamified" == t.poptin_type &&
                  "format_2" != t.poptin_format &&
                  t.gamified_prize
                ) {
                  var r = Ze[t.poptin_id].poptin_trigger.close_screen_sec;
                  (r =
                    (r = null == i && null != r ? r : closeScreenSec) ||
                    (t.wheel_has_coupon ? 3 * We : We)),
                    (1 == t.gamified_prize.redirect_to &&
                      null !=
                        t.gamified_prize.redirect_to_options.redirect_to_url) ||
                      setTimeout(function () {
                        (Ze[t.poptin_id].poptin_trigger.close_trigger = "submit"),
                          closePoptin(t.poptin_id);
                      }, 1e3 * r);
                } else if (
                  "gamified" !== t.poptin_type ||
                  ("gamified" == t.poptin_type && "format_2" !== t.poptin_format)
                ) {
                  var s, d;
                  (null == t ||
                    null === (s = t.design_properties) ||
                    void 0 === s ||
                    !s.poptin_design_thank_screen ||
                    (null != t &&
                      null !== (d = t.design_properties) &&
                      void 0 !== d &&
                      d.poptin_design_thank_screen_auto_close)) &&
                    setTimeout(function () {
                      (Ze[t.poptin_id].poptin_trigger.close_trigger = "submit"),
                        closePoptin(t.poptin_id);
                    }, 1e3 *
                      (null == i
                        ? Ze[t.poptin_id].poptin_trigger.close_thank_screen_sec
                        : n));
                }
              },
              Lt = function (t) {
                jQ224(
                  "[data-poptin-id=" + t.poptin_id + "] .poptin_winning_screen p"
                ).each(function () {
                  var i;
                  -1 != (i = jQ224(this).html()).indexOf("{{prize_label}}") &&
                    t.gamified_prize.label &&
                    jQ224(this).html(
                      i.replace("{{prize_label}}", t.gamified_prize.label)
                    ),
                    -1 != (i = jQ224(this).html()).indexOf("{{prize_code}}") &&
                      t.gamified_prize.code &&
                      jQ224(this).html(
                        i.replace("{{prize_code}}", t.gamified_prize.code)
                      );
                }),
                  jQ224(
                    "[data-poptin-id=" + t.poptin_id + "] .poptin_winning_screen"
                  ).addClass(
                    "poptin-visible poptin__animated animate__fadeIn animate__faster"
                  ),
                  setTimeout(function () {
                    jQ224(
                      "[data-poptin-id=" +
                        t.poptin_id +
                        "] .poptin_winning_screen"
                    ).removeClass(
                      "poptin__animated animate__fadeIn animate__faster"
                    );
                  }, 800);
              },
              Nt = function (t) {
                if ((e("redirectToPoptin"), t.redirectFromBtns))
                  (Ze[t.poptin_from].redirect_flag = !0),
                    ($href = Ai + "/APIRequest/click/" + t.poptin_to),
                    u($href, !1, !0);
                else {
                  var i = jQ224(
                    ".poptin-popup[data-poptin-id=" + t.poptin_id + "]"
                  );
                  "true" == i.attr("data-redirect-poptin") &&
                    13 == i.attr("data-redirect-poptin-id").length &&
                    ((Ze[t.poptin_id].redirect_flag = !0),
                    ($href =
                      Ai +
                      "/APIRequest/click/" +
                      i.attr("data-redirect-poptin-id")),
                    u($href, !1, !0));
                }
              },
              Bt = function (t, i) {
                var e =
                  arguments.length > 2 && void 0 !== arguments[2] && arguments[2];
                t.poptin_type + "_" + t.poptin_format != "social_format_2" &&
                  t.poptin_type + "_" + t.poptin_format != "social_format_6" &&
                  t.poptin_type + "_" + t.poptin_format != "sside_format_19" &&
                  ((conversion_id = i.conversion_id),
                  hi("poptin_conversion_" + t.poptin_id, conversion_id, 365)),
                  void 0 !== i.integration.conversion_code &&
                    jQ224(i.integration.conversion_code).each(function (t, i) {
                      jQ224("head").append(i);
                    }),
                  window.location.href.indexOf("biu.ac.il") > -1 &&
                    "lead" == t.poptin_target &&
                    (window.location.href =
                      Fi + "/integrations/barilan/" + i.conversion_id + "/"),
                  e ||
                    (t.poptin_type + "_" + t.poptin_format !=
                      "gamified_format_3" &&
                      St(t));
              },
              Rt = function (t) {
                di(t),
                  li(t),
                  (function (t) {
                    try {
                      "undefined" != typeof Storage
                        ? (null !=
                            window.sessionStorage.getItem(
                              "poptin_viewed_url_" + t.poptin_id
                            ) &&
                            null !=
                              window.sessionStorage.getItem(
                                "poptin_viewed_url_" + t.poptin_id
                              )) ||
                          window.sessionStorage.setItem(
                            "poptin_viewed_url_" + t.poptin_id,
                            window.location.href
                          )
                        : e("Sorry! No Web Storage support..");
                    } catch (t) {
                      e(t);
                    }
                  })(t),
                  fi(t),
                  _i(t),
                  (trigger =
                    null == t.auto_pilot_trigger
                      ? "false"
                      : t.auto_pilot_trigger),
                  (type = sn ? "mobile" : "desktop"),
                  (landing_page = window.location.href),
                  jQ224
                    .ajax(
                      {
                        url:
                          Ai +
                          "/APIRequest/viewed/" +
                          t.poptin_id +
                          "?viewer_id=" +
                          t.viewer_id +
                          "&trigger=" +
                          trigger +
                          "&client_id=" +
                          o() +
                          "&type=" +
                          type +
                          "&url=" +
                          landing_page,
                        async: !0,
                        cache: !0,
                        dataType: "json",
                        type: "get",
                      },
                      "json"
                    )
                    .done(function (i) {
                      e(i);
                      var n = new CustomEvent("poptinView", {
                        bubbles: !0,
                        detail: dt(t, { event_name: "poptinView" }),
                      });
                      document.dispatchEvent(n);
                    })
                    .fail(function (t, i, e) {});
              },
              Xt = function (t) {
                var i, e;
                t = (t = "string" == typeof t ? t : t.poptin).trim();
                var n = parseInt(
                    jQ224(t)
                      .find(".draggable-container:not(.poptin-tab-container)")
                      .attr("data-width")
                  ),
                  o = parseInt(
                    jQ224(t)
                      .find(".draggable-container:not(.poptin-tab-container)")
                      .attr("data-height")
                  );
                return (
                  isNaN(n) || null == n || "" == n || "undefined" == n || (i = n),
                  isNaN(o) || null == o || "" == o || "undefined" == o || (e = o),
                  { width: i, height: e }
                );
              },
              Et = function (t, i) {
                var e = Xt(t.poptin),
                  n = e.width,
                  o = e.height;
                (n && o && !isNaN(n) && !isNaN(o)) ||
                  ("lightbox" == t.poptin_type
                    ? ((n = n || Vi), (o = o || Zi))
                    : "bar" == t.poptin_type
                    ? ((n = n || te),
                      "format_1" == t.poptin_format ||
                      "format_6" == t.poptin_format
                        ? (o = o || ie)
                        : "format_2" == t.poptin_format ||
                          "format_3" == t.poptin_format ||
                          "format_7" == t.poptin_format ||
                          "format_8" == t.poptin_format
                        ? (o = o || ee)
                        : "format_4" == t.poptin_format ||
                          "format_9" == t.poptin_format
                        ? (o = o || ne)
                        : ("format_5" != t.poptin_format &&
                            "format_10" != t.poptin_format) ||
                          (o = o || oe))
                    : "sside" == t.poptin_type
                    ? "format_1" === t.poptin_format ||
                      "format_5" === t.poptin_format
                      ? ((n = n || re), (o = o || de))
                      : "format_4" === t.poptin_format ||
                        "format_8" === t.poptin_format
                      ? ((n = n || le), (o = o || _e))
                      : "format_19" === t.poptin_format
                      ? ((n = n || ce), (o = o || fe))
                      : ((n = n || se), (o = o || de))
                    : "bside" == t.poptin_type
                    ? ((n = n || ue), (o = o || he))
                    : "browsing" == t.poptin_type
                    ? ((n = n || pe), (o = o || ae))
                    : "fullpage" == t.poptin_type
                    ? ((n = n || "100%"),
                      (o = o || "100%"),
                      ("format_4" !== t.poptin_format &&
                        "format_8" !== t.poptin_format) ||
                        ((n = n || ye), (o = o || be)))
                    : "social" == t.poptin_type
                    ? "format_1" === t.poptin_format ||
                      "format_5" === t.poptin_format
                      ? ((n = n || Se), (o = o || Ce))
                      : "format_2" === t.poptin_format ||
                        "format_6" === t.poptin_format
                      ? ((n = n || Te), (o = o || Pe))
                      : ("format_4" !== t.poptin_format &&
                          "format_8" !== t.poptin_format) ||
                        ((n = n || ze), (o = o || Ie))
                    : "mobile" == t.poptin_type
                    ? ((n = n || ve),
                      (o = o || we),
                      "format_3" === t.poptin_format ||
                      "format_8" === t.poptin_format
                        ? ((n = n || je), (o = o || Qe))
                        : "format_4" === t.poptin_format ||
                          "format_9" === t.poptin_format
                        ? (o = o || xe)
                        : ("format_5" !== t.poptin_format &&
                            "format_10" !== t.poptin_format) ||
                          (o = o || ke))
                    : "embedded" == t.poptin_type
                    ? "format_1" === t.poptin_format
                      ? ((n = n || De), (o = o || Oe))
                      : "format_2" === t.poptin_format
                      ? ((n = n || Me), (o = o || $e))
                      : "format_3" === t.poptin_format
                      ? ((n = n || Ae), (o = o || Fe))
                      : "format_4" === t.poptin_format
                      ? ((n = n || Le), (o = o || Ne))
                      : "format_5" === t.poptin_format
                      ? ((n = n || Be), (o = o || Re))
                      : "format_6" === t.poptin_format
                      ? ((n = n || Xe), (o = o || Ee))
                      : "format_7" === t.poptin_format &&
                        ((n = n || qe), (o = o || Ue))
                    : "gamified" == t.poptin_type &&
                      ((n = n || Vi), (o = o || Zi))),
                  "lightbox" == t.poptin_type
                    ? (null == i &&
                        ((Ze[t.poptin_id].poptin_size.height = o),
                        (Ze[t.poptin_id].poptin_size.width = n)),
                      ("format_3" != t.poptin_format &&
                        "format_9" != t.poptin_format) ||
                        (Vi = Zi),
                      null == i &&
                        (Ze[t.poptin_id].position_center = {
                          left: (Ji - Vi) / 2,
                          up: (Ki - Zi) / 2,
                        }),
                      { left: (Ji - Vi) / 2, up: (Ki - Zi) / 2 })
                    : "bar" == t.poptin_type
                    ? (null == i &&
                        (Ze[t.poptin_id].position_center = {
                          left: (Ji - 1920) / 2,
                          up: (Ki - 100) / 2,
                        }),
                      { left: (Ji - 1920) / 2, up: (Ki - 100) / 2 })
                    : "mobile" != t.poptin_type ||
                      ("format_3" != t.poptin_format &&
                        "format_8" != t.poptin_format)
                    ? "gamified" == t.poptin_type &&
                      (null == i &&
                        ((Ze[t.poptin_id].poptin_size.height = o),
                        (Ze[t.poptin_id].poptin_size.width = n)),
                      null == i &&
                        (Ze[t.poptin_id].position_center = {
                          left: (Ji - Vi) / 2,
                          up: (Ki - Zi) / 2,
                        }),
                      { left: (Ji - Vi) / 2, up: (Ki - Zi) / 2 })
                    : ((Ji = Math.min(Ji, jQ224("body").outerWidth())),
                      null == i &&
                        (Ze[t.poptin_id].position_center = {
                          left: (Ji - 390) / 2,
                          up: (Ki - 242) / 2,
                        }),
                      { left: (Ji - 390) / 2, up: (Ki - 242) / 2 });
              },
              qt = function (t, i) {
                jQ224(window).resize(function () {
                  (("fullpage" != t.poptin_type && "browsing" != t.poptin_type) ||
                    "fullpage" != t.poptin_type ||
                    -1 === jQ224.inArray(t.poptin_format, bn.fullpage)) &&
                    setTimeout(function () {
                      Ut(t, i);
                    }, 100);
                });
              },
              Ut = function (t, i) {
                var n = "embedded" == t.poptin_type,
                  o = n
                    ? jQ224(".poptin-embedded[data-id='" + t.poptin_id + "']")
                    : jQ224(window);
                (if_responsice_flag = !1), e("doResizePoptin");
                var p = jQ224(
                  ".poptin-popup[data-poptin-id=" + t.poptin_id + "]"
                );
                (t.is_new = !!p.hasClass("new-popup")),
                  ("lightbox" != t.poptin_type && "gamified" != t.poptin_type) ||
                    (isNaN(
                      parseInt(
                        p
                          .find(".draggable-container:not(.poptin-tab-container)")
                          .attr("data-width")
                      )
                    ) &&
                      (p
                        .find(".draggable-container:not(.poptin-tab-container)")
                        .attr("data-width", 800),
                      p
                        .find(".draggable-container:not(.poptin-tab-container)")
                        .attr("data-height", 500)));
                var a = Ze[t.poptin_id].poptin_size.width,
                  r = Ze[t.poptin_id].poptin_size.height;
                e("poptin_size");
                var s = Xt(t.poptin);
                (a = s.width || a),
                  (r = s.height || r),
                  e("poptin_size"),
                  (isNaN(a) || isNaN(r)) &&
                    ("lightbox" == t.poptin_type
                      ? ((a = Vi), (r = Zi))
                      : "bar" == t.poptin_type
                      ? ((a = te),
                        "format_1" == t.poptin_format ||
                        "format_6" == t.poptin_format
                          ? (r = ie)
                          : "format_2" == t.poptin_format ||
                            "format_3" == t.poptin_format ||
                            "format_7" == t.poptin_format ||
                            "format_8" == t.poptin_format
                          ? (r = ee)
                          : "format_4" == t.poptin_format ||
                            "format_9" == t.poptin_format
                          ? (r = ne)
                          : ("format_5" != t.poptin_format &&
                              "format_10" != t.poptin_format) ||
                            (r = oe))
                      : "sside" == t.poptin_type
                      ? "format_1" === t.poptin_format ||
                        "format_5" === t.poptin_format
                        ? ((a = re), (r = de))
                        : "format_4" === t.poptin_format ||
                          "format_8" === t.poptin_format
                        ? ((a = le), (r = _e))
                        : "format_19" === t.poptin_format
                        ? ((a = ce), (r = fe))
                        : ((a = se), (r = de))
                      : "bside" == t.poptin_type
                      ? ((a = ue), (r = he))
                      : "browsing" == t.poptin_type
                      ? ((a = pe), (r = ae))
                      : "fullpage" == t.poptin_type
                      ? ((a = "100%"),
                        (r = "100%"),
                        ("format_4" !== t.poptin_format &&
                          "format_8" !== t.poptin_format) ||
                          ((a = ye), (r = be)))
                      : "social" == t.poptin_type
                      ? "format_1" === t.poptin_format ||
                        "format_5" === t.poptin_format
                        ? ((a = Se), (r = Ce))
                        : "format_2" === t.poptin_format ||
                          "format_6" === t.poptin_format
                        ? ((a = Te), (r = Pe))
                        : ("format_4" !== t.poptin_format &&
                            "format_8" !== t.poptin_format) ||
                          ((a = ze), (r = Ie))
                      : "mobile" == t.poptin_type
                      ? ((a = ve),
                        (r = we),
                        "format_3" === t.poptin_format ||
                        "format_8" === t.poptin_format
                          ? ((a = je), (r = Qe))
                          : "format_4" === t.poptin_format ||
                            "format_9" === t.poptin_format
                          ? (r = xe)
                          : ("format_5" !== t.poptin_format &&
                              "format_10" !== t.poptin_format) ||
                            (r = ke))
                      : "embedded" == t.poptin_type
                      ? "format_1" === t.poptin_format
                        ? ((a = De), (r = Oe))
                        : "format_2" === t.poptin_format
                        ? ((a = Me), (r = $e))
                        : "format_3" === t.poptin_format
                        ? ((a = Ae), (r = Fe))
                        : "format_4" === t.poptin_format
                        ? ((a = Le), (r = Ne))
                        : "format_5" === t.poptin_format
                        ? ((a = Be), (r = Re))
                        : "format_6" === t.poptin_format
                        ? ((a = Xe), (r = Ee))
                        : "format_7" === t.poptin_format && ((a = qe), (r = Ue))
                      : "gamified" == t.poptin_type && ((a = Vi), (r = Zi))),
                  e("poptin_size"),
                  p
                    .find(".draggable-container:not(.poptin-tab-container)")
                    .attr("data-width", a),
                  p
                    .find(".draggable-container:not(.poptin-tab-container)")
                    .attr("data-height", r),
                  e("comparison", o.width(), o.height());
                var d =
                  jQ224("body").outerWidth() + 20 < jQ224(window).outerWidth()
                    ? Math.min(
                        jQ224(window).outerWidth(),
                        jQ224("body").outerWidth()
                      )
                    : jQ224(window).outerWidth();
                if (
                  ((this_comparable_width = n ? o.width() : d),
                  (this_comparable_height = n
                    ? 0 != o.height()
                      ? o.height()
                      : r
                    : window.innerHeight),
                  e(
                    "this_comparable",
                    this_comparable_width,
                    this_comparable_height
                  ),
                  e("poptin_size"),
                  (window_width = o.width()),
                  (window_height = n ? o.height() : window.innerHeight),
                  "fullpage" != t.poptin_type)
                ) {
                  var l = 1;
                  if (
                    (jQ224(".enable-snapping").addClass("element-notinside"),
                    jQ224(".elem-outofboundry").addClass("element-notinside"),
                    jQ224(
                      ".poptin-popup[data-poptin-id=" +
                        t.poptin_id +
                        "] .element-notinside:not(.hiddenSnappingElem):visible"
                    ).length > 0)
                  )
                    var _ = (function (t) {
                        var i = jQ224(
                            ".poptin-popup[data-poptin-id=" + t.poptin_id + "]"
                          ),
                          e = 0,
                          n = 0,
                          o = new Array(),
                          p = 0,
                          a = i.css("width");
                        return (
                          i.css("width"),
                          jQ224(
                            ".poptin-popup[data-poptin-id=" +
                              t.poptin_id +
                              "] .element-notinside:not(.hiddenSnappingElem):visible"
                          ).each(function () {
                            var t = (function (t, i) {
                              if (void 0 !== i[0] && void 0 !== t[0]) {
                                var e = i[0].getBoundingClientRect(),
                                  n = t[0].getBoundingClientRect(),
                                  o = "",
                                  p = 0;
                                return (
                                  n.left < e.left
                                    ? ((o = "left"), (p = e.left - n.left))
                                    : n.right > e.right &&
                                      ((o = "right"), (p = n.right - e.right)),
                                  { direction: o, elem_diff: p }
                                );
                              }
                              return {};
                            })(jQ224(this), i.find(".poptin-visible"));
                            parseInt(jQ224(this).css("width")),
                              jQ224.isEmptyObject(t) ||
                                ("left" == t.direction && (e = e = t.elem_diff),
                                "right" == t.direction && (e = t.elem_diff),
                                (n = e),
                                o.push(n));
                          }),
                          o.length > 0 && (p = Math.max.apply(Math, o)),
                          { new_width: parseInt(a) + 2 * p, max_el_left_add: p }
                        );
                      })(t),
                      c = (function (t) {
                        var i = jQ224(
                            ".poptin-popup[data-poptin-id=" + t.poptin_id + "]"
                          ),
                          e = 0,
                          n = 0,
                          o = new Array(),
                          p = 0,
                          a = i.css("height");
                        return (
                          i.css("height"),
                          jQ224(
                            ".poptin-popup[data-poptin-id=" +
                              t.poptin_id +
                              "] .element-notinside:not(.hiddenSnappingElem):visible"
                          ).each(function () {
                            var t = (function (t, i) {
                              if (void 0 !== i[0] && void 0 !== t[0]) {
                                var e = i[0].getBoundingClientRect(),
                                  n = t[0].getBoundingClientRect(),
                                  o = "",
                                  p = 0;
                                return (
                                  n.top < e.top
                                    ? ((o = "top"), (p = e.top - n.top))
                                    : n.bottom > e.bottom &&
                                      ((o = "bottom"), (p = e.bottom - n.bottom)),
                                  { direction: o, elem_diff: p }
                                );
                              }
                              return {};
                            })(jQ224(this), i.find(".poptin-visible"));
                            parseInt(jQ224(this).css("height")),
                              jQ224.isEmptyObject(t) ||
                                ("top" == t.direction && (e = e = t.elem_diff),
                                "bottom" == t.direction && (e = t.elem_diff),
                                (n = e),
                                o.push(n));
                          }),
                          o.length > 0 && (p = Math.max.apply(Math, o)),
                          parseInt(a) + 2 * p
                        );
                      })(t),
                      f = Math.min(
                        (this_comparable_width - _.max_el_left_add) / _.new_width,
                        l
                      ),
                      u = Math.min(this_comparable_height / c, l);
                  else
                    (f = Math.min(this_comparable_width / a, l)),
                      (u = Math.min(this_comparable_height / r, l));
                  ("lightbox" == t.poptin_type ||
                    "bside" == t.poptin_type ||
                    "sside" == t.poptin_type ||
                    t.is_new ||
                    "gamified" == t.poptin_type) &&
                    (f = Math.min(f, u)),
                    e("scale_dim");
                  var h = {
                    width: a + "px",
                    height: r + "px",
                    "max-width": a + "px",
                    "max-height": r + "px",
                  };
                  if (
                    ("browsing" != t.poptin_type &&
                      (h.transform = "scale(" + f + ")"),
                    "embedded" == t.poptin_type &&
                      ((h["transform-origin"] = "center center 0px"),
                      0 == f && ((f = 1), (h.transform = "scale(" + f + ")"))),
                    p.css(h),
                    p.attr("data-scale", f),
                    1 == f && p.css("transform", "none"),
                    ("bside" != t.poptin_type && "sside" != t.poptin_type) ||
                      (t.design_properties.poptin_location.indexOf("left") < 0
                        ? p.css({
                            left: "auto",
                            right: (this_comparable_width - u * a) / 2 + "px",
                          })
                        : p.css({
                            right: "auto",
                            left: (this_comparable_width - u * a) / 2 + "px",
                          }),
                      p.css({
                        top: (this_comparable_height - u * r) / 2 + "px",
                      })),
                    "sside" == t.poptin_type &&
                      null != p.get(0) &&
                      (p.get(0).style.setProperty("transform-origin", ""),
                      this_comparable_height < r))
                  ) {
                    var g = t.design_properties.poptin_location;
                    g.indexOf("midlle") >= 0 &&
                      (p.get(0).style.setProperty("top", "0px", "important"),
                      p.get(0).style.setProperty("bottom", "auto", "important"),
                      p
                        .get(0)
                        .style.setProperty(
                          "transform-origin",
                          g.split("-")[0] + " top 0",
                          "important"
                        )),
                      g.indexOf("center") >= 0 &&
                        p.css({
                          left: "auto",
                          right: (this_comparable_width - a) / 2 + "px",
                        });
                  }
                  "lightbox" == t.poptin_type || "gamified" == t.poptin_type
                    ? ((this_css = {}),
                      a > this_comparable_width
                        ? (this_css = {
                            left: (a - this_comparable_width) / -2 + "px",
                            right: "",
                          })
                        : (this_css = { left: "0px", right: "0px" }),
                      p.css(this_css),
                      p.animate(
                        { top: (r - this_comparable_height) / -2 + "px" },
                        Ge
                      ),
                      p.css(this_css))
                    : "bar" == t.poptin_type
                    ? (p.css({ left: (a - jQ224(window).width()) / -2 + "px" }),
                      "center-top" == t.design_properties.poptin_location
                        ? (p.css({ top: (r - f * r) / -2 + "px" }), Ht(t))
                        : "center-bottom" == t.design_properties.poptin_location
                        ? p.css({ top: "auto" })
                        : p.css({
                            top:
                              window.innerHeight -
                              (f * r + ((1 - f) * r) / 2) +
                              "px",
                          }),
                      p.css("right", ""))
                    : "bside" == t.poptin_type ||
                      ("mobile" == t.poptin_type
                        ? ("100%" !== jQ224("html").css("min-width") &&
                            p.css({ left: (a - f * a) / -2 + "px" }),
                          p.css("right", ""))
                        : t.poptin_type);
                }
                if ("lightbox" == t.poptin_type || "gamified" == t.poptin_type) {
                  (this_poptin_width = parseInt(
                    p
                      .find(".draggable-container:not(.poptin-tab-container)")
                      .attr("data-width")
                  )),
                    (this_poptin_height = parseInt(
                      p
                        .find(".draggable-container:not(.poptin-tab-container)")
                        .attr("data-height")
                    )),
                    (a = this_poptin_width || a),
                    (r = this_poptin_height || r);
                  l = 1;
                  this_comparable_width < a && (this_comparable_width *= 0.9);
                  (f = Math.min(this_comparable_width / a, l)),
                    (u = Math.min(this_comparable_height / r, l));
                  e("scale_width:" + f),
                    e("scale_height:" + u),
                    (new_scale = Math.min(f, u)),
                    (Ze[t.poptin_id].poptin_scale = new_scale),
                    p.attr("data-scale", f),
                    void 0 !== p.get(0) &&
                      (p.get(0).style.setProperty("width", a + "px", "important"),
                      p
                        .get(0)
                        .style.setProperty("max-width", a + "px", "important"),
                      p
                        .get(0)
                        .style.setProperty("height", r + "px", "important"));
                }
                if ("embedded" == t.poptin_type) {
                  var m = (p.parent().width() - a) / 2,
                    y = (p.parent().height() - r) / 2;
                  (m = m >= 0 ? 0 : m) < 0
                    ? p.css({ top: y + "px", left: m + "px", right: "auto" })
                    : (p.css({ top: y + "px", left: "0px", right: "0px" }),
                      "right" == p.attr("data-form-align")
                        ? p.css({ left: "auto", right: "0px" })
                        : "left" == p.attr("data-form-align") &&
                          p.css({ left: "0px", right: "auto" }));
                }
                if ("mobile" == t.poptin_type) {
                  (this_poptin_width = parseInt(
                    p
                      .find(".draggable-container:not(.poptin-tab-container)")
                      .attr("data-width")
                  )),
                    (this_poptin_height = parseInt(
                      p
                        .find(".draggable-container:not(.poptin-tab-container)")
                        .attr("data-height")
                    )),
                    (a = this_poptin_width || a),
                    (r = this_poptin_height || r);
                  (l = 1), (f = 1);
                  (f =
                    this_comparable_width > a
                      ? this_comparable_width / a
                      : Math.min(this_comparable_width / a, l)),
                    (new_scale = f),
                    (Ze[t.poptin_id].poptin_scale = new_scale),
                    new_scale >= 1 && (new_scale = 1),
                    p.css({
                      transform: "scale(" + new_scale + ")",
                      left: (this_comparable_width - a) / 2,
                    }),
                    1 == new_scale && p.css("transform", "none"),
                    p.attr("data-scale", f),
                    void 0 !== p.get(0) &&
                      (p.get(0).style.setProperty("width", a + "px", "important"),
                      p
                        .get(0)
                        .style.setProperty("max-width", a + "px", "important"),
                      p
                        .get(0)
                        .style.setProperty("height", r + "px", "important"));
                }
                if ("fullpage" == t.poptin_type) {
                  (ieVersion = T()),
                    p.addClass("ie" + ieVersion),
                    (pop_wrappers_container = p.find(
                      ".draggable-container:not(.poptin-tab-container) > form, .poptin_thank_you_screen"
                    )),
                    pop_wrappers_container.css("opacity", "0");
                  try {
                    clearTimeout(fn[t.poptin_id]);
                  } catch (t) {}
                  var b = parseInt(p.attr("data-poptin-format").split("_")[1]);
                  fn[t.poptin_id] =
                    b && b < 9
                      ? setTimeout(function () {
                          (a = 1920), (r = 1080);
                          this_comparable_width < a &&
                            (this_comparable_width = this_comparable_width);
                          var i = Math.min(this_comparable_width / a, 1),
                            e = Math.min(this_comparable_height / r, 1);
                          (new_scale = Math.min(i, e)),
                            (Ze[t.poptin_id].poptin_scale = new_scale),
                            p.attr("data-scale", new_scale),
                            p.css({
                              width: "",
                              height: "",
                              "max-width": "",
                              "max-height": "",
                            });
                          var n = p
                            .find(
                              ".draggable-container:not(.poptin-tab-container)"
                            )
                            .css("background-color");
                          "rgba(0, 0, 0, 0)" != n &&
                            p.css({ "background-color": n }),
                            p
                              .find(
                                ".draggable-container:not(.poptin-tab-container), .poptin_thank_you_screen"
                              )
                              .css({
                                width: a + "px",
                                "max-width": a + "px",
                                height: r + "px",
                                "max-height": r + "px",
                                left:
                                  Math.floor((this_comparable_width - a) / 2) +
                                  "px",
                                top:
                                  Math.floor((this_comparable_height - r) / 2) +
                                  "px",
                                "background-color": "",
                              }),
                            p.animate({ opacity: 1 }, 250, function () {
                              p
                                .find(
                                  ".draggable-container:not(.poptin-tab-container), .poptin_thank_you_screen"
                                )
                                .css({ transform: "scale(" + new_scale + ")" }),
                                1 == new_scale && p.css("transform", "none");
                              var t = p.find(
                                ".draggable-container:not(.poptin-tab-container) #closeXButton"
                              );
                              p.find(".poptin_thank_you_screen #closeXButton")
                                .length ||
                                p
                                  .find(".poptin_thank_you_screen")
                                  .prepend(t.clone()),
                                jQ224("#closeXButton, #closeSkipButton").each(
                                  function () {
                                    var t = parseInt(
                                      jQ224(this).attr("data-original-pos")
                                    );
                                    if (
                                      (t ||
                                        ((t = jQ224(this).position().left),
                                        jQ224(this).attr("data-original-pos", t)),
                                      t + jQ224(this).width() + 50 > a)
                                    ) {
                                      var i =
                                        (this_comparable_width - a * new_scale) /
                                        2 /
                                        new_scale;
                                      jQ224(this).css({
                                        position: "fixed",
                                        right: "auto",
                                        left: t + i + "px",
                                      });
                                    }
                                  }
                                ),
                                pop_wrappers_container.animate(
                                  { opacity: 1 },
                                  100
                                );
                            });
                        }, 250)
                      : setTimeout(function () {
                          jQ224(window).width() < a
                            ? p.css({ width: "100%" })
                            : window.innerWidth > a &&
                              p.css({ width: "100%", "max-width": "100%" }),
                            window.innerHeight > r &&
                              (p.css({ height: "100%" }),
                              p
                                .find(
                                  ".draggable-container:not(.poptin-tab-container)"
                                )
                                .first()
                                .css({ height: "100%", "max-height": "100%" })),
                            window.innerHeight < r &&
                              p.css({ height: window.innerHeight + "px" });
                          var i,
                            e,
                            n = null,
                            o = null,
                            s = null,
                            d = null;
                          jQ224(
                            "[data-poptin-id=" +
                              t.poptin_id +
                              "] #poptinFormSubmit" +
                              t.poptin_id +
                              ", [data-poptin-id=" +
                              t.poptin_id +
                              "] .poptin_thank_you_screen, [data-poptin-id=" +
                              t.poptin_id +
                              "] .poptin_play_screen, [data-poptin-id=" +
                              t.poptin_id +
                              "] .poptin_winning_screen, [data-poptin-id=" +
                              t.poptin_id +
                              "] .poptin_losing_screen"
                          ).each(function () {
                            jQ224(this)
                              .children()
                              .each(function (t) {
                                return jQ224(this).is(
                                  ".draggable, .inputs-container, .redirect-url-blank"
                                )
                                  ? !!jQ224(this).is(":visible") &&
                                      ((this_left = jQ224(this).position().left),
                                      (this_top = jQ224(this).position().top),
                                      (this_right =
                                        this_left + jQ224(this).width()),
                                      (this_bottom =
                                        this_top + jQ224(this).height()),
                                      (n =
                                        null != n
                                          ? Math.min(n, this_left)
                                          : this_left),
                                      (s =
                                        null != s
                                          ? Math.min(s, this_top)
                                          : this_top),
                                      (o =
                                        null != o
                                          ? Math.max(o, this_right)
                                          : this_right),
                                      void (d =
                                        null != d
                                          ? Math.max(d, this_bottom)
                                          : this_bottom))
                                  : (jQ224(this).remove(), !1);
                              }),
                              sn &&
                                ((n -= jQ224(window).width() / 10),
                                (o += jQ224(window).width() / 10));
                          }),
                            ("format_3" != t.poptin_format &&
                              "format_4" != t.poptin_format) ||
                              !0,
                            !0,
                            "format_1" == t.poptin_format
                              ? ((i = 600), (e = 950))
                              : "format_2" == t.poptin_format
                              ? ((i = 900), (e = 950))
                              : "format_3" == t.poptin_format ||
                                "format_4" == t.poptin_format
                              ? ((i = 1130), (e = 1e3))
                              : ((i = 1920), (e = 1080));
                          var l = 1,
                            _ = 1;
                          jQ224(window).width() < i &&
                            (l = Math.min(jQ224(window).width() / i, 1)),
                            window.innerHeight < e &&
                              (_ = Math.min(window.innerHeight / e, 1)),
                            (new_scale = Math.min(l, _));
                          var c = p.find("#poptinDraggableContainer"),
                            f = p.find("#poptinThankYouScreen"),
                            u = p.find("#poptinPlayScreen"),
                            h = p.find("#poptinWinningScreen"),
                            g = p.find("#poptinLosingScreen");
                          setTimeout(function () {
                            (container_width = "100%"),
                              (container_margin = "auto"),
                              ge < Ji / window.devicePixelRatio
                                ? (11 == ieVersion && (container_width = ge),
                                  p.addClass("with-margin"))
                                : p.addClass("full-width"),
                              p.hasClass("bg-moved") ||
                                (p.css({
                                  background: c.css("background"),
                                  "background-color": c.css("background-color"),
                                  "background-image": c.css("background-image"),
                                  "max-width": "initial",
                                  height: "100%",
                                }),
                                p.addClass("bg-moved")),
                              (container_css = {
                                width: container_width,
                                background: "none",
                                "background-color": "none",
                                "background-image": "none",
                                transform: "scale(" + new_scale + ")",
                                margin: container_margin,
                              }),
                              c.css(container_css),
                              c.attr("data-scale", new_scale),
                              1 == new_scale && c.css("transform", "none"),
                              f.css(container_css),
                              f.attr("data-scale", new_scale),
                              u.css(container_css),
                              u.attr("data-scale", new_scale),
                              h.css(container_css),
                              h.attr("data-scale", new_scale),
                              g.css(container_css),
                              g.attr("data-scale", new_scale),
                              (el_width = o - n),
                              (drag_cont_width = p
                                .find("#poptinDraggableContainer")
                                .width()),
                              (el_left = (drag_cont_width - el_width) / 2),
                              jQ224(
                                "[data-poptin-id=" +
                                  t.poptin_id +
                                  "] #poptinFormSubmit" +
                                  t.poptin_id
                              ).css({
                                width: el_width + "px",
                                position: "absolute",
                                left: el_left + "px",
                              }),
                              setTimeout(function () {
                                var n = p
                                  .find("#poptinDraggableContainer #closeXButton")
                                  .css({
                                    position: "absolute !important",
                                    top: "40px !important",
                                    right: "40px !important",
                                  });
                                p
                                  .find("#poptinDraggableContainer #closeXButton")
                                  .remove(),
                                  p.prepend(n);
                                var o = p.find(".poptin-credit");
                                p.find(".poptin-credit").remove(),
                                  p.prepend(o),
                                  (this_container_css = {
                                    "box-shadow": "",
                                    top: (window.innerHeight - e) / 2 + "px",
                                    left: (window.innerWidth - i) / 2 + "px",
                                    width: "",
                                  }),
                                  c.css(this_container_css),
                                  c.find("form").css({ width: "", left: "" }),
                                  f.css(this_container_css),
                                  u.css(this_container_css),
                                  h.css(this_container_css),
                                  g.css(this_container_css),
                                  "1" ==
                                    jQ224(
                                      ".poptin-popup[data-poptin-id=" +
                                        t.poptin_id +
                                        "]"
                                    ).attr("data-wellcome-screen") &&
                                    jQ224(
                                      ".poptin-popup[data-poptin-id=" +
                                        t.poptin_id +
                                        "]"
                                    ).css("position", "absolute"),
                                  p.animate({ opacity: 1 }, 250, function () {
                                    p.find(
                                      ".draggable-container:not(.poptin-tab-container) #closeXButton"
                                    ),
                                      p.find(
                                        ".poptin_thank_you_screen #closeXButton"
                                      );
                                    p
                                      .find(".poptin_play_screen #closeXButton")
                                      .remove(),
                                      p
                                        .find(
                                          ".poptin_winning_screen #closeXButton"
                                        )
                                        .remove(),
                                      p
                                        .find(
                                          ".poptin_losing_screen #closeXButton"
                                        )
                                        .remove(),
                                      jQ224(
                                        "#closeXButton, #closeSkipButton"
                                      ).each(function () {
                                        if (
                                          jQ224(this).offset().left +
                                            jQ224(this).width() +
                                            50 >
                                          window.innerWidth
                                        ) {
                                          var t =
                                            window.innerWidth -
                                            jQ224(this).width() -
                                            10;
                                          jQ224(this).css({
                                            position: "fixed",
                                            right: "auto",
                                            left: t + "px",
                                          });
                                        }
                                      }),
                                      pop_wrappers_container.animate(
                                        { opacity: 1 },
                                        100
                                      );
                                  });
                              }, 500);
                          }, 500);
                        }, 100);
                }
              },
              Ht = function (t) {
                setTimeout(function () {
                  e("barHtmlPadding()"),
                    (padding_top =
                      jQ224(
                        ".poptin-popup[data-poptin-id=" + t.poptin_id + "]"
                      ).height() *
                      parseFloat(
                        jQ224(
                          ".poptin-popup[data-poptin-id=" + t.poptin_id + "]"
                        ).attr("data-scale")
                      )),
                    jQ224("html").animate(
                      { "padding-top": Math.floor(padding_top) + "px" },
                      300
                    );
                }, 300);
              },
              Wt = function () {
                return gi("poptin_referrer")
                  ? -1 !== gi("poptin_referrer").indexOf(window.location.host)
                    ? ""
                    : gi("poptin_referrer")
                  : "";
              },
              Gt = function () {
                return gi("poptin_previous_url") &&
                  -1 !== gi("poptin_previous_url").indexOf(window.location.host)
                  ? gi("poptin_previous_url")
                  : "";
              },
              Yt = function () {
                (cookies = document.cookie.split(";")), (relevent_cookie = "");
                for (var t = 0; t < cookies.length; t++)
                  -1 !== cookies[t].split("=")[0].indexOf("poptin") &&
                    (relevent_cookie += cookies[t]);
                return relevent_cookie;
              },
              Jt = function () {
                (cookies = document.cookie.split(";")), (relevent_cookie = "");
                for (var t = 0; t < cookies.length; t++)
                  cookies[t].split("=")[0].startsWith(" cc_") &&
                    (relevent_cookie += cookies[t]);
                return relevent_cookie;
              },
              Kt = function () {
                (cookies = document.cookie.split(";")), (array = []);
                for (var t = 0; t < cookies.length; t++)
                  (pair = cookies[t].split("=")),
                    ($key = null == pair[0] ? "" : pair[0].trim()),
                    ($value = null == pair[1] ? "" : pair[1].trim()),
                    "" != $key && array.push({ key: $key, value: $value });
                return array;
              },
              Vt = function () {
                ap_triggers = "";
                try {
                  "undefined" != typeof Storage
                    ? jQ224.each(window.sessionStorage, function (t, i) {
                        -1 !== t.indexOf("apt_") &&
                          (ap_triggers += t + ":" + i + "|");
                      })
                    : e("Sorry! No Web Storage support..");
                } catch (t) {
                  e(t);
                }
                return ap_triggers;
              },
              Zt = function () {
                var t = "";
                try {
                  "undefined" != typeof Storage
                    ? null !=
                        window.sessionStorage.getItem(
                          "poptin_origin_landing_page"
                        ) &&
                      null !=
                        window.sessionStorage.getItem(
                          "poptin_origin_landing_page"
                        ) &&
                      (t = window.sessionStorage.getItem(
                        "poptin_origin_landing_page"
                      ))
                    : e("Sorry! No Web Storage support..");
                } catch (t) {
                  e(t);
                }
                return t;
              },
              ti = function (t) {
                var i = window.location.href;
                try {
                  "undefined" != typeof Storage && t
                    ? null !=
                        window.sessionStorage.getItem(
                          "poptin_viewed_url_" + t.poptin_id
                        ) &&
                      null !=
                        window.sessionStorage.getItem(
                          "poptin_viewed_url_" + t.poptin_id
                        ) &&
                      (i = window.sessionStorage.getItem(
                        "poptin_viewed_url_" + t.poptin_id
                      ))
                    : e("Sorry! No Web Storage support or poptin..");
                } catch (t) {
                  e(t);
                }
                return i;
              },
              ii = function () {
                (Ve instanceof Object || Ve instanceof Array) &&
                  jQ224.each(Ve, function (t, i) {
                    null != this.d_f_a &&
                      this.d_f_a &&
                      this.d_f_r.indexOf("display_once_every_few_visiting_4") >
                        -1 &&
                      (yi("poptin_d_r_v_" + this.poptin_id)
                        ? window.sessionStorage.getItem(
                            "first_visit_" + this.poptin_id
                          ) ||
                          ((value =
                            parseInt(gi("poptin_d_r_v_" + this.poptin_id)) + 1),
                          hi("poptin_d_r_v_" + this.poptin_id, value, 365),
                          window.sessionStorage.setItem(
                            "first_visit_" + this.poptin_id,
                            1
                          ))
                        : (hi("poptin_d_r_v_" + this.poptin_id, 0, 365),
                          window.sessionStorage.setItem(
                            "first_visit_" + this.poptin_id,
                            1
                          ))),
                      null != this.d_f_a &&
                        this.d_f_a &&
                        this.d_f_r.indexOf("display_once_every_few_days_3") >
                          -1 &&
                        (yi("poptin_d_a_x_v_" + this.poptin_id) ||
                          ((value = bi()),
                          hi("poptin_d_a_x_v_" + this.poptin_id, value, 365))),
                      window.sessionStorage.getItem(
                        "poptin_pageviews_" + this.poptin_id
                      )
                        ? window.sessionStorage.setItem(
                            "poptin_pageviews_" + this.poptin_id,
                            parseInt(
                              window.sessionStorage.getItem(
                                "poptin_pageviews_" + this.poptin_id
                              )
                            ) + 1
                          )
                        : window.sessionStorage.setItem(
                            "poptin_pageviews_" + this.poptin_id,
                            0
                          ),
                      yi("poptin_o_v_" + this.poptin_id) || ei(this),
                      setInterval(function () {
                        ei(this);
                      }, 6e4),
                      yi("poptin_session_account_" + this.account_id) ||
                        hi("poptin_session_account_" + this.account_id, !0, 30);
                  }),
                  yi("poptin_session") ||
                    hi("poptin_session", !0, 0.02083333333333333),
                  yi("poptin_c_visitor") || hi("poptin_c_visitor", !0, 30),
                  "undefined" != typeof Storage &&
                    null ==
                      window.sessionStorage.getItem(
                        "poptin_every_visit_session"
                      ) &&
                    window.sessionStorage.setItem(
                      "poptin_every_visit_session",
                      Date()
                    );
              },
              ei = function (t) {
                if (
                  !yi("poptin_o_v_" + t.poptin_id) &&
                  void 0 !== t &&
                  t.display
                ) {
                  var i = t.viewer_id;
                  hi("poptin_o_v_" + t.poptin_id, i, 0.02083333333333333);
                }
              },
              ni = function () {
                return (
                  (poptin_viewed_session = ""),
                  (poptin_once = 1),
                  "undefined" != typeof Storage
                    ? (jQ224.each(sessionStorage, function (t, i) {
                        t.indexOf("poptin_viewed_session") >= 0 &&
                          (1 == poptin_once
                            ? ((poptin_viewed_session += t + "=" + i),
                              (poptin_once = 0))
                            : (poptin_viewed_session += " " + t + "=" + i));
                      }),
                      "" == poptin_viewed_session
                        ? "poptin_viewed_session=false"
                        : poptin_viewed_session)
                    : "poptin_viewed_session=false"
                );
              },
              oi = function () {
                return "undefined" != typeof Storage
                  ? null == window.sessionStorage.getItem("poptin_new_user")
                    ? ""
                    : "poptin_new_user=true"
                  : "";
              },
              pi = function () {
                return (
                  !!yi("poptin_user_country_code") &&
                  gi("poptin_user_country_code")
                );
              },
              ai = function () {
                yi("poptin_user_id")
                  ? (yi("poptin_old_user") || (si(), ri()), ui())
                  : yi("poptin_old_user") ||
                    (si(),
                    ri(),
                    yi("poptin_user_id") ||
                      hi(
                        "poptin_user_id",
                        Math.random().toString(36).slice(-16),
                        365
                      ));
              },
              ri = function () {
                yi("poptin_old_user") ||
                  (hi("poptin_old_user", !0, 2),
                  setInterval(function () {
                    hi("poptin_old_user", !0, 2);
                  }, 6e4));
              },
              si = function () {
                "undefined" != typeof Storage &&
                  null == window.sessionStorage.getItem("poptin_new_user") &&
                  window.sessionStorage.setItem("poptin_new_user", Date());
              },
              di = function (t) {
                if (
                  !yi("poptin_o_a_d_" + t.poptin_id) &&
                  void 0 !== t &&
                  t.display &&
                  t.cookie != "poptin_o_a_d_" + t.poptin_id
                ) {
                  var i = t.viewer_id;
                  hi("poptin_o_a_d_" + t.poptin_id, i, 1);
                }
              },
              li = function (t) {
                "undefined" != typeof Storage &&
                  null ==
                    window.sessionStorage.getItem(
                      "poptin_viewed_session_" + t.poptin_id
                    ) &&
                  window.sessionStorage.setItem(
                    "poptin_viewed_session_" + t.poptin_id,
                    !0
                  );
              },
              _i = function (t) {
                (ab_test_parent_id = !1),
                  "undefined" != typeof Storage &&
                    (0 == t.ab_test && null != t.ab_test_parent_id
                      ? (ab_test_parent_id = t.ab_test_parent_id)
                      : 1 == t.ab_test && (ab_test_parent_id = t.poptin_id),
                    ab_test_parent_id &&
                      null ==
                        window.sessionStorage.getItem(
                          "poptin_abtest_session_" + ab_test_parent_id
                        ) &&
                      window.sessionStorage.setItem(
                        "poptin_abtest_session_" + ab_test_parent_id,
                        t.poptin_id
                      ));
              },
              ci = function (t) {
                yi("poptin_c_p_o_x_c_" + t) ||
                  void 0 === t ||
                  hi("poptin_c_p_o_x_c_" + t, t, 1);
              },
              fi = function (t) {
                if (
                  void 0 !== t &&
                  null != t.d_f_a &&
                  t.d_f_a &&
                  t.d_f_r.indexOf("display_once_a_visitor_2") > -1
                ) {
                  var i = t.viewer_id;
                  hi("poptin_o_a_v_" + t.poptin_id, i, 0.020833333),
                    setInterval(function () {
                      hi("poptin_o_a_v_" + t.poptin_id, i, 0.020833333);
                    }, 6e4);
                }
              },
              ui = function () {
                cookies = document.cookie.split(";");
                for (var t = {}, i = 0; i < cookies.length; i++)
                  -1 !== cookies[i].split("=")[0].indexOf("poptin_o_a_v_") &&
                    ((t.poptin_id = cookies[i]
                      .split("poptin_o_a_v_")[1]
                      .split("=")[0]),
                    (t.viewer_id = cookies[i].split("=")[1]),
                    fi(t));
              },
              hi = function (t, i, e) {
                var n = new Date();
                n.setTime(n.getTime() + 24 * e * 60 * 60 * 1e3);
                var o = "expires=" + n.toUTCString();
                document.cookie =
                  t + "=" + i + "; " + o + "; path=/; SameSite=Lax";
              },
              gi = function (t) {
                for (
                  var i = t + "=", e = document.cookie.split(";"), n = 0;
                  n < e.length;
                  n++
                ) {
                  for (var o = e[n]; " " == o.charAt(0); ) o = o.substring(1);
                  if (0 == o.indexOf(i)) return o.substring(i.length, o.length);
                }
                return "";
              },
              mi = function (t) {
                t.cookie == "poptin_d_r_v_" + t.poptin_id &&
                  hi("poptin_d_r_v_" + t.poptin_id, 0, 365),
                  t.cookie == "poptin_d_a_x_v_" + t.poptin_id &&
                    ((value = bi()),
                    hi("poptin_d_a_x_v_" + t.poptin_id, value, 365));
              },
              yi = function (t) {
                var i = gi(t);
                return "" != i && null !== i;
              },
              bi = function () {
                return (
                  (today = new Date()),
                  (dd = today.getDate()),
                  (mm = today.getMonth() + 1),
                  (yyyy = today.getFullYear()),
                  dd < 10 && (dd = "0" + dd),
                  mm < 10 && (mm = "0" + mm),
                  yyyy + "-" + mm + "-" + dd
                );
              },
              vi = function (t, i, n, p, a) {
                var r =
                  arguments.length > 5 && void 0 !== arguments[5]
                    ? arguments[5]
                    : null;
                e("monitorError:");
                try {
                  jQ224.get(Ai + "/APIRequest/error/" + o(), {
                    poptin_user_id: gi("poptin_user_id"),
                    error_step: t,
                    error_message: i,
                    call_status: n,
                    result: p,
                    poptin: !1 !== a ? a.poptin_id : a,
                    extra_data: r,
                  });
                } catch (t) {
                  e(t);
                }
              },
              wi = function (t, i) {
                var n = jQ224(
                    ".poptin-popup[data-poptin-id=" + t.poptin_id + "]"
                  ),
                  o = n.attr("data-scale");
                if (n.length) {
                  var p = n.find(
                    ".draggable-container:not(.poptin-tab-container)"
                  );
                  if ("embedded" == t.poptin_type) {
                    var a = "scale(" + o + ", 0)",
                      r = t.design_properties.poptin_design_entry_effect,
                      s = r ? r.split("-")[1] : "";
                    ("undefined" == typeof poptin_landing_page && "none" != s) ||
                      (a = "scale(" + o + ")"),
                      n.css({ display: "block", transform: a }),
                      1 == a && n.css("transform", "none"),
                      n
                        .find("#poptinDraggableContainer")
                        .css({ display: "block" }),
                      jQ224(window).scroll(function () {
                        n.length &&
                          n.parent().length &&
                          (void 0 !== window.pageYOffset
                            ? window.pageYOffset
                            : (
                                document.documentElement ||
                                document.body.parentNode ||
                                document.body
                              ).scrollTop) >=
                            n.parent().offset().top - window.innerHeight / 1.5 &&
                          !n.hasClass("scrolled") &&
                          (n.addClass("scrolled"),
                          s && "none" != s
                            ? (n.addClass("poptin-visible poptin__animated"),
                              n.addClass("animate__zoomIn"))
                            : n.addClass("poptin-visible poptin__animated"),
                          n.css(
                            "transform",
                            null != o ? "scale(" + o + ")" : "none"
                          ));
                      }),
                      1 == a && n.css("transform", "none");
                  } else {
                    if (
                      t.poptin_type + "_" + t.poptin_format ==
                        "social_format_3" ||
                      t.poptin_type + "_" + t.poptin_format == "social_format_7"
                    )
                      return !1;
                    var d = {
                      effect: null,
                      speed: "_default",
                      delay: "-default",
                    };
                    if (
                      "exit" == i &&
                      t.design_properties.poptin_design_exit_effect
                    )
                      s =
                        t.design_properties.poptin_design_exit_effect.split(
                          "-"
                        )[1];
                    else if (t.design_properties.poptin_design_entry_effect)
                      jQ224(
                        ".poptin-popup-background[data-poptin-id=" +
                          t.poptin_id +
                          "]"
                      ).outerWidth,
                        jQ224(
                          ".poptin-popup-background[data-poptin-id=" +
                            t.poptin_id +
                            "]"
                        ).outerHeight,
                        (s =
                          t.design_properties.poptin_design_entry_effect.split(
                            "-"
                          )[1]);
                    switch (s) {
                      case "none":
                        d.effect = "_none";
                        break;
                      case "up":
                        d.effect = "_slideInDown";
                        break;
                      case "down":
                        d.effect = "_slideInUp";
                        break;
                      case "left":
                        d.effect = "_slideInLeft";
                        break;
                      case "right":
                        d.effect = "_slideInRight";
                        break;
                      case "blind":
                      case "fold":
                        d.effect = "_flipInX";
                        break;
                      case "bounce":
                        d.effect = "_bounceIn";
                        break;
                      case "clip":
                      case "size":
                      case "scale-out":
                        d.effect = "_zoomIn";
                        break;
                      case "explode":
                      case "fade":
                        d.effect = "_fadeIn";
                        break;
                      case "highlight":
                        d.effect = "_tada";
                        break;
                      case "puff":
                        d.effect = "_pulse";
                        break;
                      case "pulsate":
                        d.effect = "_flash";
                        break;
                      case "scale":
                        d.effect = "_heartBeat";
                        break;
                      case "shake":
                        d.effect = "_shakeX";
                    }
                    var l =
                      ".poptin-popup[data-poptin-id='" +
                      t.poptin_id +
                      "'] .draggable-container:not(.poptin-tab-container)";
                    if ("exit" == i) {
                      var _ = d.effect;
                      (d.effect = _.replace("In", "Out")),
                        (l =
                          l +
                          ", .poptin-popup[data-poptin-id='" +
                          t.poptin_id +
                          "'] .poptin_thank_you_screen, .poptin-popup[data-poptin-id='" +
                          t.poptin_id +
                          "'] .poptin_play_screen, .poptin-popup[data-poptin-id='" +
                          t.poptin_id +
                          "'] .poptin_winning_screen, .poptin-popup[data-poptin-id='" +
                          t.poptin_id +
                          "'] .poptin_losing_screen"),
                        jQ224(l).addClass("poptin__animated"),
                        -1 !== d.effect.indexOf("slide") &&
                          jQ224(l).addClass("animate__faster"),
                        jQ224(l).addClass("animate_" + d.effect);
                    } else {
                      jQ224(
                        ".poptin-popup-background[data-poptin-id=" +
                          t.poptin_id +
                          "]"
                      ).css("display", "block"),
                        p.css({ display: "none" }),
                        n.css({ display: "block" });
                      try {
                        e("Entry Animate"),
                          jQ224(l).addClass("poptin-visible poptin__animated"),
                          -1 !== d.effect.indexOf("slide") &&
                            jQ224(l).addClass("animate__faster"),
                          jQ224(l).addClass("animate_" + d.effect),
                          Ut(t),
                          poptinVisible(t.poptin_id);
                      } catch (i) {
                        e("Entry Animate err3"),
                          jQ224(l).addClass("poptin-visible poptin__animated"),
                          -1 !== d.effect.indexOf("slide") &&
                            jQ224(l).addClass("animate__faster"),
                          Ut(t),
                          jQ224(l).show(500, function () {
                            poptinVisible(t.poptin_id);
                          });
                      }
                      setTimeout(function () {
                        ("lightbox" != t.poptin_type &&
                          "gamified" != t.poptin_type) ||
                          jQ224(
                            ".poptin-popup[data-poptin-id=" +
                              t.poptin_id +
                              "] .draggable-container:not(.poptin-tab-container)"
                          ).animate({ top: "0px", left: "0px" }, 300),
                          jQ224(
                            ".poptin-popup[data-poptin-id=" + t.poptin_id + "]"
                          ).css({
                            "box-shadow":
                              t.poptin_type + "_" + t.poptin_format ==
                                "social_format_2" ||
                              "browsing" == t.poptin_type ||
                              ("lightbox" == t.poptin_type &&
                                "format_3" == t.poptin_format) ||
                              ("lightbox" == t.poptin_type &&
                                "format_9" == t.poptin_format) ||
                              ("bar" == t.poptin_type &&
                                "center-top" ==
                                  t.design_properties.poptin_location) ||
                              t.poptin_type + "_" + t.poptin_format ==
                                "mobile_format_3" ||
                              t.poptin_type + "_" + t.poptin_format ==
                                "mobile_format_7" ||
                              t.poptin_type + "_" + t.poptin_format ==
                                "lightbox_format_4" ||
                              t.poptin_type + "_" + t.poptin_format ==
                                "lightbox_format_10"
                                ? ""
                                : "0 3px 9px rgba(0,0,0,.5)",
                          }),
                          U(t);
                      }, 600);
                    }
                  }
                  "exit" != i &&
                    (function (t) {
                      void 0 !==
                        jQ224(
                          ".poptin-popup[data-poptin-id=" + t.poptin_id + "]"
                        ).attr("data-hastab") &&
                        1 ==
                          jQ224(
                            ".poptin-popup[data-poptin-id=" + t.poptin_id + "]"
                          ).attr("data-hastab") &&
                        (jQ224(
                          '#poptinDraggableContainer-tab[data-load-poptin="' +
                            t.poptin_id +
                            '"]'
                        ).addClass("popup-loaded"),
                        N(t, "exit"));
                    })(t),
                    setTimeout(function () {
                      jQ224(l).removeClass("poptin__animated"),
                        jQ224(l).removeClass(function (t, i) {
                          return (i.match(/\banimate_\S+/g) || []).join(" ");
                        });
                    }, 1e3);
                }
              },
              ji = function () {
                return !(!window.performance || 1 != performance.navigation.type);
              },
              Qi = function (t) {
                jQ224("style.animatebtnCss").remove();
                var i = jQ224(
                  ".poptin-popup[data-poptin-id=" +
                    t.poptin_id +
                    "] #poptinFormSubmitText .froala-editor-button"
                );
                if (
                  i.length &&
                  void 0 !== i.attr("data-poptin-animate") &&
                  null != i.attr("data-poptin-animate")
                ) {
                  var e = i.attr("data-poptin-animate");
                  Hn = setInterval(function () {
                    i.toggleClass("poptin__animated animate__" + e);
                  }, 3e3);
                }
              },
              xi = function (t) {
                var i = jQ224(
                    ".poptin-popup[data-poptin-id=" +
                      t.poptin_id +
                      "] .froala-giftbox-wrapper .fr-giftbox-images .giftbox-img"
                  ),
                  e = jQ224(
                    ".poptin-popup[data-poptin-id=" +
                      t.poptin_id +
                      "] .froala-giftbox-wrapper .fr-giftbox-images"
                  ).attr("data-poptin-animate"),
                  n = i.length ? i.length : 1;
                i.length > 0 &&
                  e &&
                  (Wn = setInterval(function () {
                    i.toggleClass("poptin__animated animate__" + e);
                  }, 1e3 * n));
              },
              ki = function (t) {
                var i = jQ224(
                    ".poptin-popup[data-poptin-id=" +
                      t.poptin_id +
                      "] .froala-giftbox-wrapper .fr-giftbox-images"
                  ).attr("data-poptin-animate"),
                  n =
                    (jQ224(
                      ".poptin-popup[data-poptin-id=" +
                        t.poptin_id +
                        "] .froala-giftbox-wrapper .fr-giftbox-images .giftbox-img"
                    ),
                    {});
                if (jQ224("#gamifiedPrizeJSON").length > 0) {
                  var o = JSON.parse(jQ224("#gamifiedPrizeJSON").val());
                  jQ224.each(o.prizes, function (t, i) {
                    n[t] = i.chances ? Number(i.chances) / 100 : 0;
                  });
                }
                jQ224(
                  ".poptin-popup[data-poptin-id=" +
                    t.poptin_id +
                    "] .fr-giftbox-images .fr-giftbox"
                ).on("click", function (p) {
                  try {
                    clearInterval(Wn);
                  } catch (t) {}
                  jQ224(this).attr("data-prize");
                  jQ224(
                    ".poptin-popup[data-poptin-id=" +
                      t.poptin_id +
                      "] .fr-giftbox-images .giftbox-img"
                  )
                    .removeClass("poptin__animated animate__" + i)
                    .css({
                      "animation-delay": "0s",
                      "-webkit-animation-delay": "0s",
                      "-moz-animation-delay": "0s",
                      "-ms-animation-delay": "0s",
                    }),
                    jQ224(
                      ".poptin-popup[data-poptin-id=" +
                        t.poptin_id +
                        "] .fr-giftbox-images .giftbox-img"
                    ),
                    jQ224(p.target).addClass("poptin__animated animate__tada"),
                    setTimeout(function () {
                      jQ224(p.target).removeClass(
                        "poptin__animated animate__tada"
                      );
                    }, 1e3);
                  var a = Ci(n);
                  (e("prizeWinner"),
                  e("prizeJSONGotSelected", o.prizes[a]),
                  (t.gamified_prize = o.prizes[a]),
                  (t.gamified_prize.prize_id = a),
                  a && 0 == o.prizes[a].loosing_option)
                    ? (e("Win"),
                      (t.gamified_prize.is_winner = !0),
                      jQ224(
                        "[data-poptin-id=" +
                          t.poptin_id +
                          "] .poptin_play_screen p"
                      ).each(function () {
                        var t = jQ224(this).html();
                        -1 != t.indexOf("{{prize_label}}") &&
                          o.prizes[a].label &&
                          jQ224(this).html(
                            t.replace("{{prize_label}}", o.prizes[a].label)
                          ),
                          -1 != t.indexOf("{{prize_code}}") &&
                            o.prizes[a].code &&
                            jQ224(this).html(
                              t.replace("{{prize_code}}", o.prizes[a].code)
                            );
                      }),
                      setTimeout(function () {
                        jQ224(
                          "[data-poptin-id=" +
                            t.poptin_id +
                            "] .draggable-container"
                        )
                          .css("display", "none")
                          .find(".draggable.image-change-video")
                          .remove(),
                          jQ224(
                            "[data-poptin-id=" +
                              t.poptin_id +
                              "] .draggable-container"
                          ).removeClass("poptin-visible poptin__animated"),
                          jQ224("[data-poptin-id=" + t.poptin_id + "]").css(
                            "box-shadow",
                            ""
                          ),
                          t.design_properties &&
                          t.design_properties.disable_post_play_screen &&
                          1 == t.design_properties.disable_post_play_screen
                            ? (Lt(t), St(t))
                            : (jQ224(
                                "[data-poptin-id=" +
                                  t.poptin_id +
                                  "] .poptin_play_screen"
                              ).addClass(
                                "poptin-visible poptin__animated animate__fadeIn animate__faster"
                              ),
                              setTimeout(function () {
                                jQ224(
                                  "[data-poptin-id=" +
                                    t.poptin_id +
                                    "] .poptin_play_screen"
                                ).removeClass(
                                  "poptin__animated animate__fadeIn animate__faster"
                                );
                              }, 800)),
                          jQ224(document).on(
                            "click",
                            '[data-poptin-id="' +
                              t.poptin_id +
                              '"] #closeXButton',
                            function () {
                              closePoptinOnXclick(jQ224(this).get(0));
                            }
                          ),
                          jQ224(
                            "[data-poptin-id=" + t.poptin_id + "] .close-x-button"
                          ).show(100);
                      }, 1e3))
                    : (e("lose"),
                      (t.gamified_prize.is_winner = !1),
                      setTimeout(function () {
                        if (
                          (jQ224(
                            "[data-poptin-id=" +
                              t.poptin_id +
                              "] .draggable-container"
                          )
                            .css("display", "none")
                            .find(".draggable.image-change-video")
                            .remove(),
                          jQ224(
                            "[data-poptin-id=" +
                              t.poptin_id +
                              "] .draggable-container"
                          ).removeClass("poptin-visible poptin__animated"),
                          jQ224("[data-poptin-id=" + t.poptin_id + "]").css(
                            "box-shadow",
                            ""
                          ),
                          jQ224(
                            "[data-poptin-id=" +
                              t.poptin_id +
                              "] .poptin_losing_screen"
                          ).addClass(
                            "poptin-visible poptin__animated animate__fadeIn animate__faster"
                          ),
                          setTimeout(function () {
                            jQ224(
                              "[data-poptin-id=" +
                                t.poptin_id +
                                "] .poptin_losing_screen"
                            ).removeClass(
                              "poptin__animated animate__fadeIn animate__faster"
                            );
                          }, 800),
                          jQ224(document).on(
                            "click",
                            '[data-poptin-id="' +
                              t.poptin_id +
                              '"] #closeXButton',
                            function () {
                              closePoptinOnXclick(jQ224(this).get(0));
                            }
                          ),
                          jQ224(
                            "[data-poptin-id=" + t.poptin_id + "] .close-x-button"
                          ).show(100),
                          t.gamified_prize &&
                            1 == t.gamified_prize.redirect_to &&
                            null !=
                              t.gamified_prize.redirect_to_options
                                .redirect_to_url)
                        ) {
                          e("ifLinkConversion3");
                          var i =
                            t.gamified_prize.redirect_to_options
                              .redirect_close_delay;
                          setTimeout(
                            function () {
                              Mt(t, "direct", "gamified");
                            },
                            i
                              ? 1e3 *
                                  (parseInt(i) +
                                    (t.design_properties.disable_post_play_screen
                                      ? 8
                                      : 0))
                              : 1e3 * (t.wheel_has_coupon ? 3 * We : We)
                          );
                        }
                      }, 1e3));
                });
              },
              Ci = function (t) {
                var i,
                  e = 0,
                  n = Math.random();
                for (i in t) if (n <= (e += t[i])) return i;
              },
              Si = function (t, i, n, o, p, a) {
                var r = Ci(p),
                  s = 0,
                  d = function (o) {
                    Object.hasOwnProperty.call(p, o) &&
                      (o == r &&
                        (e(o, a.prizes[o]),
                        (n = 24 + s),
                        jQ224(".spin-wheel-animation-" + t.poptin_id).remove(),
                        jQ224(i).append(
                          '<style class="spin-wheel-animation" id="spin-wheel-animation-' +
                            t.poptin_id +
                            '">\n\t\t\t\t\t\t@keyframes spinning {\n\t\t\t\t\t\t\tfrom { transform: rotate(0); }\n\t\t\t\t\t\t\tto { transform: rotate(-' +
                            30 * n +
                            "deg); }\n\t\t\t\t\t\t}\n\t\t\t\t\t</style>"
                        ),
                        jQ224(i)
                          .find(".pop-wheel-wrap")
                          .toggleClass("pop-spinning"),
                        jQ224(document).off("click", i + " .pop-wheel-overlay"),
                        setTimeout(function () {
                          r && 0 == a.prizes[r].loosing_option
                            ? (e("Win"),
                              (t.gamified_prize.is_winner = !0),
                              jQ224(
                                "[data-poptin-id=" +
                                  t.poptin_id +
                                  "] .poptin_play_screen p"
                              ).each(function () {
                                var t = jQ224(this).html();
                                -1 != t.indexOf("{{prize_label}}") &&
                                  a.prizes[o].label &&
                                  jQ224(this).html(
                                    t.replace(
                                      "{{prize_label}}",
                                      a.prizes[o].label
                                    )
                                  ),
                                  -1 != t.indexOf("{{prize_code}}") &&
                                    a.prizes[o].code &&
                                    jQ224(this).html(
                                      t.replace(
                                        "{{prize_code}}",
                                        a.prizes[o].code
                                      )
                                    );
                              }),
                              setTimeout(function () {
                                jQ224(
                                  "[data-poptin-id=" +
                                    t.poptin_id +
                                    "] .draggable-container"
                                )
                                  .css("display", "none")
                                  .find(".draggable.image-change-video")
                                  .remove(),
                                  jQ224(
                                    "[data-poptin-id=" +
                                      t.poptin_id +
                                      "] .draggable-container"
                                  ).removeClass(
                                    "poptin-visible poptin__animated"
                                  ),
                                  jQ224(
                                    "[data-poptin-id=" + t.poptin_id + "]"
                                  ).css("box-shadow", ""),
                                  t.design_properties &&
                                  t.design_properties.disable_post_play_screen &&
                                  1 ==
                                    t.design_properties.disable_post_play_screen
                                    ? (Lt(t), St(t))
                                    : (jQ224(
                                        "[data-poptin-id=" +
                                          t.poptin_id +
                                          "] .poptin_play_screen"
                                      ).addClass(
                                        "poptin-visible poptin__animated animate__fadeIn animate__faster"
                                      ),
                                      setTimeout(function () {
                                        jQ224(
                                          "[data-poptin-id=" +
                                            t.poptin_id +
                                            "] .poptin_play_screen"
                                        ).removeClass(
                                          "poptin__animated animate__fadeIn animate__faster"
                                        );
                                      }, 800)),
                                  jQ224(document).on(
                                    "click",
                                    '[data-poptin-id="' +
                                      t.poptin_id +
                                      '"] #closeXButton',
                                    function () {
                                      closePoptinOnXclick(jQ224(this).get(0));
                                    }
                                  ),
                                  jQ224(
                                    "[data-poptin-id=" +
                                      t.poptin_id +
                                      "] .close-x-button"
                                  ).show(100);
                              }, 1e3))
                            : (e("lose"),
                              (t.gamified_prize.is_winner = !1),
                              setTimeout(function () {
                                if (
                                  (jQ224(
                                    "[data-poptin-id=" +
                                      t.poptin_id +
                                      "] .draggable-container"
                                  )
                                    .css("display", "none")
                                    .find(".draggable.image-change-video")
                                    .remove(),
                                  jQ224(
                                    "[data-poptin-id=" +
                                      t.poptin_id +
                                      "] .draggable-container"
                                  ).removeClass(
                                    "poptin-visible poptin__animated"
                                  ),
                                  jQ224(
                                    "[data-poptin-id=" + t.poptin_id + "]"
                                  ).css("box-shadow", ""),
                                  jQ224(
                                    "[data-poptin-id=" +
                                      t.poptin_id +
                                      "] .poptin_losing_screen"
                                  ).addClass(
                                    "poptin-visible poptin__animated animate__fadeIn animate__faster"
                                  ),
                                  setTimeout(function () {
                                    jQ224(
                                      "[data-poptin-id=" +
                                        t.poptin_id +
                                        "] .poptin_losing_screen"
                                    ).removeClass(
                                      "poptin__animated animate__fadeIn animate__faster"
                                    );
                                  }, 800),
                                  jQ224(document).on(
                                    "click",
                                    '[data-poptin-id="' +
                                      t.poptin_id +
                                      '"] #closeXButton',
                                    function () {
                                      closePoptinOnXclick(jQ224(this).get(0));
                                    }
                                  ),
                                  jQ224(
                                    "[data-poptin-id=" +
                                      t.poptin_id +
                                      "] .close-x-button"
                                  ).show(100),
                                  t.gamified_prize &&
                                    1 == t.gamified_prize.redirect_to &&
                                    null !=
                                      t.gamified_prize.redirect_to_options
                                        .redirect_to_url)
                                ) {
                                  e("ifLinkConversion3");
                                  var i =
                                    t.gamified_prize.redirect_to_options
                                      .redirect_close_delay;
                                  setTimeout(
                                    function () {
                                      Mt(t, "direct", "gamified");
                                    },
                                    i
                                      ? 1e3 *
                                          (parseInt(i) +
                                            (t.design_properties
                                              .disable_post_play_screen
                                              ? 8
                                              : 0))
                                      : 1e3 * (t.wheel_has_coupon ? 3 * We : We)
                                  );
                                }
                              }, 1e3));
                        }, 7e3),
                        (t.gamified_prize = a.prizes[o]),
                        (t.gamified_prize.prize_id = o),
                        o == r || 0 == a.prizes[o].loosing_option
                          ? (e("Win"), (t.gamified_prize.is_winner = !0))
                          : (e("lose"), (t.gamified_prize.is_winner = !1))),
                      (s += 1));
                  };
                for (var l in p) d(l);
              },
              Pi = function (t) {
                var i =
                    arguments.length > 1 &&
                    void 0 !== arguments[1] &&
                    arguments[1],
                  e = "[data-poptin-id=" + t.poptin_id + "]",
                  n = (jQ224(e).find(".pop-wheel-wrap"), 0),
                  o = {};
                if (jQ224("#gamifiedPrizeJSON").length > 0) {
                  var p = JSON.parse(jQ224("#gamifiedPrizeJSON").val());
                  jQ224.each(p.prizes, function (t, i) {
                    o[t] = i.chances ? Number(i.chances) / 100 : 0;
                  });
                }
                t.design_properties.disable_post_play_screen &&
                0 !=
                  jQ224(
                    ".poptin-popup[data-poptin-id=" +
                      t.poptin_id +
                      "] #poptinDraggableContainer #poptinFormSubmitText"
                  ).length
                  ? i && Si(t, e, n, 0, o, p)
                  : jQ224(document).on(
                      "click",
                      e + " .pop-wheel-overlay",
                      function () {
                        Si(t, e, n, 0, o, p),
                          jQ224(document).off("click", e + " .pop-wheel-overlay");
                      }
                    );
              },
              Ti = function (t) {
                var i = "";
                jQ224(
                  ".poptin-popup[data-poptin-id=" +
                    t.poptin_id +
                    "] .froala-editor-coupon"
                ).each(function () {
                  (i = jQ224(this).text()),
                    jQ224(this).attr("data-cc", i),
                    jQ224(this).css("cursor", "pointer"),
                    jQ224(this).find("p").css("cursor", "pointer"),
                    jQ224(this).find("span").css("cursor", "pointer");
                }),
                  jQ224(
                    ".poptin-popup[data-poptin-id=" +
                      t.poptin_id +
                      "] .froala-editor-coupon"
                  ).on("click", function (i) {
                    jQ224("#holdcoupontext").remove(),
                      jQ224(".poptin-coupon-tooltip").remove();
                    var e = jQ224(this).text(),
                      n = { event_name: "couponCopy", coupon_code: e };
                    t.gamified_prize && (n.prize_label = t.gamified_prize.label);
                    var o = new CustomEvent("couponCopy", {
                      bubbles: !0,
                      detail: dt(t, n),
                    });
                    document.dispatchEvent(o);
                    jQ224(
                      ".poptin-popup[data-poptin-id=" + t.poptin_id + "]"
                    ).append(
                      '<input type="text" id="holdcoupontext" aria-label="Coupon" />'
                    ),
                      jQ224(
                        ".poptin-popup[data-poptin-id=" +
                          t.poptin_id +
                          "] #holdcoupontext"
                      )
                        .val(e)
                        .select(),
                      document.execCommand("Copy");
                    var p =
                      '<span style="position: absolute;background: #000;width: 70px;height: 24px;line-height: 25px;color: #fff;font-size: 12px;border-radius: 6px;top: -30px;left: calc(50% - 35px);display:none;" class="poptin-coupon-tooltip">' +
                      ("en" == _n ? gn : mn) +
                      "</span>";
                    jQ224(this).parent().append(p),
                      jQ224(this)
                        .parent()
                        .find(".poptin-coupon-tooltip")
                        .fadeIn(),
                      setTimeout(function () {
                        jQ224(".poptin-coupon-tooltip").fadeOut(300);
                      }, 500),
                      jQ224("#holdcoupontext").remove();
                  });
              },
              Ii = function (t) {
                return (
                  jQ224(
                    ".poptin-popup[data-poptin-id=" +
                      t.poptin_id +
                      "] .poptin-form-link-button"
                  ).length > 0 &&
                    (jQ224(
                      ".poptin-popup[data-poptin-id=" +
                        t.poptin_id +
                        "] .poptin-form-link-button"
                    ).each(function () {
                      var t = jQ224(this).attr("id"),
                        i = jQ224(this).attr("data-btnurl");
                      jQ224(this).attr("data-btntarget");
                      if (jQ224(this).find("a").length > 0) {
                        (i = jQ224(this).find("a").attr("href")),
                          void 0 !== jQ224(this).find("a").attr("target") &&
                            ("_blank",
                            jQ224("#" + t).attr("data-btntarget", "_blank")),
                          jQ224("#" + t).attr("data-btnurl", i);
                        var e = jQ224(this).find("a").text();
                        jQ224(this).find("a").parent().html(e);
                      }
                      jQ224(this).css("cursor", "pointer"),
                        jQ224(this)
                          .find("p, input, a, span, div, br, img")
                          .css("cursor", "pointer");
                    }),
                    jQ224(
                      ".poptin-popup[data-poptin-id=" +
                        t.poptin_id +
                        "] .poptin-form-link-button"
                    ).on("click", function () {
                      var i = jQ224(this).data();
                      jQ224(this).parents(".poptin-popup").attr("data-poptin-id");
                      if (i.countConversion && !0 === i.countConversion) {
                        var e = jQ224(this).attr("id");
                        "poptinFormCloseText" === e && (e = "close_btn"),
                          Tt(t, null, e, this);
                      } else jQ224(".poptin-popup[data-poptin-id=" + t.poptin_id + "]").addClass("poptin-redirected"), zi(this);
                    }),
                    jQ224(
                      ".poptin-popup[data-poptin-id=" +
                        t.poptin_id +
                        "] .poptin-form-link-button"
                    ).on("keydown", function (t) {
                      (32 !== t.keyCode && 13 !== t.keyCode) ||
                        jQ224(t.target).click();
                    })),
                  !1
                );
              },
              zi = function (t) {
                var i = jQ224(t).data(),
                  n = jQ224(t).parents(".poptin-popup").attr("data-poptin-id");
                if (
                  (i.btnurl && !i.launchPoptin) ||
                  (i.linkUrl && 1 == i.linkUrl)
                ) {
                  if ((closePoptin(n, !0), i.btnurl)) {
                    if (
                      -1 == i.btnurl.indexOf("http://") &&
                      -1 == i.btnurl.indexOf("https://")
                    ) {
                      var o = i.btnurl;
                      "-1" != o.indexOf("tel:") || "-1" != o.indexOf("sms:")
                        ? (i.btnurl = i.btnurl)
                        : (i.btnurl = "//" + i.btnurl);
                    }
                    i.btntarget
                      ? window.open(i.btnurl, "_blank")
                      : (window.location.href = i.btnurl);
                  }
                } else if (i.launchPoptin && 1 == i.launchPoptin) {
                  closePoptin(n, !0);
                  var p = { redirectFromBtns: !0 };
                  (p.poptin_from = n),
                    (p.poptin_to = i.launchPoptinId),
                    i.launchPoptinId && Nt(p);
                } else
                  i.shopifyCart && 1 == i.shopifyCart
                    ? (e("Add to cart"),
                      e(Xi),
                      "undefined" != typeof Shopify &&
                        (e("handeShopifyAddToCart()"),
                        Dt(Xi, !1, jQ224(this).attr("id"))))
                    : closePoptin(n);
              },
              Di = function t(i) {
                var e = [],
                  n = jQ224(
                    ".poptin-popup[data-poptin-id=" + i.poptin_id + "]"
                  ).attr("data-bg-animation");
                ("embedded" != i.poptin_type && "fullpage" != i.poptin_type) ||
                  (n = "");
                var o = "modelBackdrip",
                  p = "bgeffect_canvas_" + i.poptin_id;
                if (void 0 !== n && "" != typeof n) {
                  switch (n) {
                    case "wheel":
                      e.push(
                        new Wheel(
                          25e-5 * window.innerWidth * window.innerHeight,
                          o,
                          p
                        )
                      );
                      break;
                    case "starry-sky":
                      e.push(new StarrySky(o, p));
                      break;
                    case "ball":
                      e.push(new Balls(o, p)), e[e.length - 1].play();
                      break;
                    case "snow":
                      e.push(
                        new Snows(
                          parseInt(5e-4 * window.innerWidth * window.innerHeight),
                          o,
                          p
                        )
                      ),
                        e[e.length - 1].start();
                      break;
                    case "rain":
                      e.push(new Rain("01", o, p));
                      break;
                    case "confetti":
                      startConfetti(o, p);
                  }
                  "starry-sky" == n
                    ? jQ224("#" + o + "[data-poptin-id=" + i.poptin_id + "]").css(
                        "opacity",
                        0.7
                      )
                    : jQ224("#" + o + "[data-poptin-id=" + i.poptin_id + "]").css(
                        "opacity",
                        0.5
                      ),
                    setInterval(function () {
                      jQ224("#bgeffect_canvas_" + i.poptin_id).length || t(i);
                    }, 10);
                }
              },
              Oi = function (t) {
                jQ224("body").append(t.client_restriction_setting.upgrade_popup);
              },
              Mi = function (t) {
                for (var i = " ", e = 0; e < window.sessionStorage.length; e++) {
                  var n = window.sessionStorage.key(e);
                  n.includes(t) &&
                    (i += n + "=" + window.sessionStorage.getItem(n) + " ");
                }
                return i.slice(0, -1);
              };
            window.pixelAdded = !0;
            var $i = new Object(),
              Ai = "",
              Fi = "https://app.popt.in",
              Li = "",
              Ni = "app";
            if ("192.168.10.10" == window.location.hostname)
              Li = Ai = "http://192.168.10.10";
            else if (
              "poptin.test" == window.location.hostname ||
              "display.test" == window.location.hostname ||
              "profile.test" == window.location.hostname
            )
              Li = Ai = "https://poptin.test";
            else if ("dev" == Ni) {
              var Bi = "https://" + window.location.hostname,
                Ri = new URLSearchParams(window.location.search);
              Ri.has("cdn")
                ? (Bi = "https://" + Ri.get("cdn"))
                : yi("poptin_cdn_server") &&
                  (Bi = "https://" + gi("poptin_cdn_server")),
                (Ai = Bi),
                (Li = Bi),
                "popages.com" == window.location.hostname &&
                  (Li = Ai = "https://dev2.dev.popt.in");
            } else
              "app" == Ni &&
                ((Ai = "https://display.popt.in"), (Li = "https://cdn.popt.in"));
            var Xi,
              Ei = Ai,
              qi = "https://www.poptin.co.il/",
              Ui = "https://www.poptin.com/",
              Hi =
                '<button type="button" id="closeXButton" onclick="closePoptinOnXclick(this);" class="close-x-button" style="text-align: right; margin-top: -2px;-webkit-appearance: none;cursor: pointer;background: 0 0;border: 0;float: right;padding:0px;font-size: 20px;line-height: 0.5;color: #000;text-shadow: #fff 0px 0px 10px;filter: alpha(opacity=20);text-transform: none;overflow: visible;margin: 0;font-size:53px;line-height: 31px;z-index: 9999;position: relative;">&times;</button>',
              Wi =
                '<button type="button" id="closeSkipButton" onclick="closePoptinOnXclick(this);" class="close-x-button" style="text-align: right; margin-top: -2px;-webkit-appearance: none;padding: 5px;cursor: pointer;background: 0 0;border: 0;float: right;font-size: 25px;line-height: 0.5;color: #000;text-shadow: 0 1px 0 #fff;filter: alpha(opacity=20);opacity: 0.7;text-transform: none;overflow: visible;margin: 0;font-weight:bold;z-index: 9999;position: relative;">Skip</button>',
              Gi =
                '<div id="closeButtonNote" class="close-button-note" style="display:none;text-align: center;padding: 9px 14px;position: absolute;top: -65px;right:0px;background: white;border-radius: 6px;word-wrap: break-word;max-width: 200px;border: 1px solid rgba(0,0,0,.2);opacity: 1;z-index:8999"></div>',
              Yi =
                '<div class="poptin-credit" style="z-index:100000;position: absolute;bottom: 0px;left: 0px;line-height: 0px;"><a href="https://www.poptin.co.il" target="_BLANK"><img src="' +
                Li +
                '/css/images/credit.png" alt="Powered by poptin" style="width: 118px;height: 20px;"></a></div>',
              Ji = window.screen.availWidth,
              Ki = window.innerHeight,
              Vi = 800,
              Zi = 500,
              te = 1920,
              ie = 100,
              ee = 197,
              ne = 50,
              oe = 105,
              pe = 285,
              ae = 186,
              re = 500,
              se = 300,
              de = 200,
              le = 300,
              _e = 450,
              ce = 70,
              fe = 70,
              ue = 402,
              he = 1080,
              ge = 1920,
              me = 1080,
              ye = screen.width,
              be = screen.height,
              ve = 483,
              we = 150,
              je = 390,
              Qe = 242,
              xe = 100,
              ke = 75,
              Ce = 214,
              Se = 340,
              Pe = 70,
              Te = 70,
              Ie = 300,
              ze = 300,
              De = 365,
              Oe = 370,
              Me = 770,
              $e = 160,
              Ae = 370,
              Fe = 635,
              Le = 370,
              Ne = 570,
              Be = 335,
              Re = 520,
              Xe = 770,
              Ee = 192,
              qe = 800,
              Ue = 500,
              He = new Object(),
              We = 4;
            (window.poptin_loadcontrol_fix =
              !!window.poptin_loadcontrol_fix && window.poptin_loadcontrol_fix),
              (window.poptin_disable_fa =
                !!window.poptin_disable_fa && window.poptin_disable_fa),
              (window.poptin_single_page_app =
                !!window.poptin_single_page_app && window.poptin_single_page_app),
              (window.landing_page_teaser_on =
                !!window.landing_page_teaser_on && window.landing_page_teaser_on),
              (window.upgrade_popup_setting = window.upgrade_popup_setting
                ? window.upgrade_popup_setting
                : null),
              (window.previous_url_spa = window.previous_url_spa
                ? window.previous_url_spa
                : null),
              (window.poptinTimeDelayTrigger = window.poptinTimeDelayTrigger
                ? window.poptinTimeDelayTrigger
                : null),
              (window.poptinExitPopupShown =
                !!window.poptinExitPopupShown && window.poptinExitPopupShown),
              (window.poptin_display_trigger =
                !!window.poptin_display_trigger && window.poptin_display_trigger),
              (window.updateClockInterval = 0);
            var Ge = 300,
              Ye = "",
              Je = 0,
              Ke = {
                browsing_format_1: { type: "vertical" },
                browsing_format_2: { type: "vertical" },
                browsing_format_3: { type: "vertical" },
                bside_format_1: { type: "vertical" },
                bside_format_2: { type: "vertical" },
                bside_format_3: { type: "vertical" },
                bside_format_4: { type: "vertical" },
                bside_format_5: { type: "vertical" },
                bside_format_6: { type: "vertical" },
                bside_format_7: { type: "vertical" },
                bside_format_8: { type: "vertical" },
                bside_format_9: { type: "vertical" },
                lightbox_format_1: { type: "vertical" },
                lightbox_format_2: { type: "horizontal" },
                lightbox_format_3: { type: "vertical" },
                lightbox_format_4: { type: "horizontal" },
                lightbox_format_5: { type: "horizontal" },
                lightbox_format_6: { type: "horizontal" },
                lightbox_format_7: { type: "vertical" },
                lightbox_format_8: { type: "horizontal" },
                lightbox_format_9: { type: "vertical" },
                lightbox_format_10: { type: "horizontal" },
                lightbox_format_11: { type: "horizontal" },
                lightbox_format_12: { type: "horizontal" },
                lightbox_format_13: { type: "vertical" },
                lightbox_format_14: { type: "horizontal" },
                lightbox_format_15: { type: "horizontal" },
                lightbox_format_16: { type: "horizontal" },
                lightbox_format_17: { type: "vertical" },
                lightbox_format_18: { type: "horizontal" },
                lightbox_format_19: { type: "vertical" },
                lightbox_format_20: { type: "vertical" },
                lightbox_format_21: { type: "vertical" },
                lightbox_format_22: { type: "vertical" },
                sside_format_1: { type: "vertical" },
                sside_format_2: { type: "vertical" },
                sside_format_3: { type: "vertical" },
                sside_format_4: { type: "vertical" },
                sside_format_5: { type: "vertical" },
                sside_format_6: { type: "vertical" },
                sside_format_7: { type: "vertical" },
                sside_format_8: { type: "vertical" },
                sside_format_9: { type: "vertical" },
                sside_format_10: { type: "vertical" },
                sside_format_11: { type: "vertical" },
                sside_format_12: { type: "vertical" },
                sside_format_13: { type: "vertical" },
                sside_format_14: { type: "vertical" },
                sside_format_15: { type: "vertical" },
                sside_format_16: { type: "vertical" },
                sside_format_17: { type: "vertical" },
                sside_format_18: { type: "vertical" },
                sside_format_19: { type: "vertical" },
                social_format_1: { type: "vertical" },
                social_format_2: { type: "vertical" },
                social_format_3: { type: "vertical" },
                social_format_4: { type: "vertical" },
                social_format_5: { type: "vertical" },
                social_format_6: { type: "vertical" },
                social_format_7: { type: "vertical" },
                social_format_8: { type: "vertical" },
                bar_format_1: { type: "horizontal" },
                bar_format_2: { type: "horizontal" },
                bar_format_3: { type: "horizontal" },
                bar_format_4: { type: "horizontal" },
                bar_format_5: { type: "horizontal" },
                bar_format_6: { type: "horizontal" },
                bar_format_7: { type: "horizontal" },
                bar_format_8: { type: "horizontal" },
                bar_format_9: { type: "horizontal" },
                bar_format_10: { type: "horizontal" },
                bar_format_11: { type: "horizontal" },
                bar_format_12: { type: "horizontal" },
                bar_format_13: { type: "horizontal" },
                bar_format_14: { type: "horizontal" },
                bar_format_15: { type: "horizontal" },
                bar_format_16: { type: "horizontal" },
                bar_format_17: { type: "horizontal" },
                fullpage_format_1: { type: "vertical" },
                fullpage_format_2: { type: "vertical" },
                fullpage_format_3: { type: "horizontal" },
                fullpage_format_4: { type: "horizontal" },
                fullpage_format_5: { type: "vertical" },
                fullpage_format_6: { type: "vertical" },
                fullpage_format_7: { type: "vertical" },
                fullpage_format_8: { type: "horizontal" },
                fullpage_format_9: { type: "vertical" },
                fullpage_format_10: { type: "vertical" },
                fullpage_format_11: { type: "vertical" },
                fullpage_format_12: { type: "vertical" },
                mobile_format_1: { type: "horizontal" },
                mobile_format_2: { type: "horizontal" },
                mobile_format_3: { type: "vertical" },
                mobile_format_4: { type: "horizontal" },
                mobile_format_5: { type: "horizontal" },
                mobile_format_6: { type: "horizontal" },
                mobile_format_7: { type: "horizontal" },
                mobile_format_8: { type: "vertical" },
                mobile_format_9: { type: "horizontal" },
                mobile_format_10: { type: "horizontal" },
                mobile_format_11: { type: "horizontal" },
                mobile_format_12: { type: "horizontal" },
                mobile_format_13: { type: "vertical" },
                mobile_format_14: { type: "horizontal" },
                mobile_format_15: { type: "horizontal" },
                mobile_format_16: { type: "horizontal" },
                mobile_format_17: { type: "horizontal" },
                embedded_format_1: { type: "vertical" },
                embedded_format_2: { type: "horizontal" },
                embedded_format_3: { type: "vertical" },
                embedded_format_4: { type: "vertical" },
                embedded_format_5: { type: "vertical" },
                embedded_format_6: { type: "horizontal" },
                embedded_format_7: { type: "vertical" },
                gamified_format_1: { type: "vertical" },
                gamified_format_2: { type: "vertical" },
                gamified_format_3: { type: "vertical" },
              };
            window.jQ224 = null;
            var Ve,
              Ze = new Array(),
              tn = new Object(),
              en = !0,
              nn = 2e3,
              on = !!/Android/i.test(navigator.userAgent),
              pn = /(iPad|iPhone|iPod)/g.test(navigator.userAgent),
              an = navigator.userAgent.toLowerCase().indexOf("firefox") > -1,
              rn =
                (/Chrome/.test(navigator.userAgent) &&
                  /Google Inc/.test(navigator.vendor),
                navigator.vendor &&
                  navigator.vendor.indexOf("Apple") > -1 &&
                  navigator.userAgent &&
                  -1 == navigator.userAgent.indexOf("CriOS") &&
                  -1 == navigator.userAgent.indexOf("FxiOS")),
              sn =
                /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(
                  navigator.userAgent.toLowerCase()
                ),
              dn = !1,
              ln = !1,
              _n = "en",
              cn = null;
            window.poptinSubmitted = new Array();
            var fn = new Array(),
              un = "Skip",
              hn = "×“×œ×’",
              gn = "Copied",
              mn = "×”×•×¢×ª×§",
              yn = "",
              bn = {
                mobile: 5,
                fullpage: 4,
                browsing: 1,
                sside: 4,
                bside: 3,
                social: 4,
                bar: 5,
                lightbox: 6,
              },
              vn = "",
              wn = new Date().getFullYear(),
              jn = {
                en: [
                  "Sunday",
                  "Monday",
                  "Tuesday",
                  "Wednesday",
                  "Thursday",
                  "Friday",
                  "Saturday",
                ],
                he: [
                  "×™×•× ×¨××©×•×Ÿ",
                  "×™×•× ×©× ×™",
                  "×™×•× ×©×œ×™×©×™",
                  "×™×•× ×¨×‘×™×¢×™",
                  "×™×•× ×—×ž×™×©×™",
                  "×™×•× ×©×™×©×™",
                  "×™×•× ×©×‘×ª",
                ],
              },
              Qn = {
                en: [
                  "January",
                  "February",
                  "March",
                  "April",
                  "May",
                  "June",
                  "July",
                  "August",
                  "September",
                  "October",
                  "November",
                  "December",
                ],
                he: [
                  "×™× ×•××¨",
                  "×¤×‘×¨×•××¨",
                  "×ž×¨×¥",
                  "××¤×¨×™×œ",
                  "×ž××™",
                  "×™×•× ×™",
                  "×™×•×œ×™",
                  "××•×’×•×¡×˜",
                  "×¡×¤×˜×ž×‘×¨",
                  "××•×§×˜×•×‘×¨",
                  "× ×•×‘×ž×‘×¨",
                  "×“×¦×ž×‘×¨",
                ],
              },
              xn = new Date();
            xn.setMonth(xn.getMonth() - 1),
              (xn = {
                en: Qn.en[xn.getMonth()],
                he: Qn.he[xn.getMonth()],
                xx: xn.toLocaleString("default", { month: "long" }),
              });
            var kn = new Date();
            kn = {
              en: Qn.en[kn.getMonth()],
              he: Qn.he[kn.getMonth()],
              xx: kn.toLocaleString("default", { month: "long" }),
            };
            var Cn = new Date();
            Cn.setMonth(Cn.getMonth() + 1),
              (Cn = {
                en: Qn.en[Cn.getMonth()],
                he: Qn.he[Cn.getMonth()],
                xx: Cn.toLocaleString("default", { month: "long" }),
              });
            var Sn = new Date();
            Sn.setDate(Sn.getDate() - 1);
            var Pn = Sn.getDate() + "/" + Sn.getMonth() + "/" + Sn.getFullYear(),
              Tn = Sn.getMonth() + "/" + Sn.getDate() + "/" + Sn.getFullYear();
            Sn = { en: jn.en[Sn.getDay()], he: jn.he[Sn.getDay()] };
            var In = new Date();
            In.setDate(In.getDate());
            var zn = In.getDate() + "/" + In.getMonth() + "/" + In.getFullYear(),
              Dn = In.getMonth() + "/" + In.getDate() + "/" + In.getFullYear();
            In = { en: jn.en[In.getDay()], he: jn.he[In.getDay()] };
            var On = new Date();
            On.setDate(On.getDate() + 1);
            var Mn,
              $n = On.getDate() + "/" + On.getMonth() + "/" + On.getFullYear(),
              An = On.getMonth() + "/" + On.getDate() + "/" + On.getFullYear(),
              Fn = [
                { tag_input: "curr_year", pre: 1, value: wn },
                { tag_input: "prev_mon", pre: 2, value: xn },
                { tag_input: "curr_mon", pre: 2, value: kn },
                { tag_input: "next_mon", pre: 2, value: Cn },
                { tag_input: "yest_day", pre: 2, value: Sn },
                { tag_input: "today_day", pre: 2, value: In },
                {
                  tag_input: "tomo_day",
                  pre: 2,
                  value: (On = {
                    en: jn.en[On.getDay()],
                    he: jn.he[On.getDay()],
                  }),
                },
                { tag_input: "yest_dmy", pre: 1, value: Pn },
                { tag_input: "yest_mdy", pre: 1, value: Tn },
                { tag_input: "today_dmy", pre: 1, value: zn },
                { tag_input: "today_mdy", pre: 1, value: Dn },
                { tag_input: "tomo_dmy", pre: 1, value: $n },
                { tag_input: "tomo_mdy", pre: 1, value: An },
              ],
              Ln = [],
              Nn = 0;
            window.ShopifyAnalytics &&
              void 0 === (Nn = window.ShopifyAnalytics.meta.page.customerId) &&
              (Nn = 0),
              "function" != typeof poptinVisible &&
                (window.poptinVisible = function (t) {
                  e("Showing " + t);
                });
            var Bn = !1;
            "function" != typeof onpoptinClose &&
              (window.onpoptinClose = function (t) {
                e("Closing " + t),
                  sn &&
                    Xi.poptin_type + "_" + Xi.poptin_format ==
                      "gamified_format_2" &&
                    (jQ224("html, body").css({
                      overflow: "auto",
                      height: "auto",
                    }),
                    Mn && (window.scrollTo(0, Mn), (Bn = !1)));
              }),
              "function" != typeof onpoptinSubmit &&
                (window.onpoptinSubmit = function (t) {
                  e("Submitting " + t);
                });
            var Rn = 0;
            window.poptinStarted = !!window.poptinStarted && window.poptinStarted;
            var Xn = [],
              En = sessionStorage.getItem("pop_urls") || "[]";
            sessionStorage.getItem("pop_landed_url");
            "function" != typeof runPoptinNow &&
              (window.runPoptinNow = function () {
                void 0 !== window.Shopify && window.Shopify.shop
                  ? (window.Shopify.customerPrivacy &&
                      "no" ==
                        window.Shopify.customerPrivacy.getTrackingConsent()) ||
                    (window.Shopify.customerPrivacy &&
                    "yes" == window.Shopify.customerPrivacy.getTrackingConsent()
                      ? runPoptinNowStart()
                      : (shopifyCookieInterval = setInterval(function () {
                          window.Shopify.customerPrivacy &&
                          window.Shopify.customerPrivacy.userCanBeTracked()
                            ? (clearInterval(shopifyCookieInterval),
                              runPoptinNowStart())
                            : ((window.Shopify.customerPrivacy &&
                                !window.Shopify.customerPrivacy.userCanBeTracked()) ||
                                runPoptinNowStart(),
                              clearInterval(shopifyCookieInterval));
                        }, 1e3)))
                  : runPoptinNowStart();
              }),
              "function" != typeof runPoptinNowStart &&
                (window.runPoptinNowStart = function () {
                  if (poptinStarted) return !1;
                  (poptinStarted = !0), console.log("runPoptinNow");
                  var t = Array(),
                    i = "";
                  if (
                    null == document.getElementById("pixel-script-poptin") ||
                    null == document.getElementById("pixel-script-poptin")
                  ) {
                    t = document.getElementsByTagName("script");
                    for (var o = 0; o < t.length; o++) {
                      var a = t[o].src;
                      if (a && -1 !== a.indexOf("popt.in/pixel.js")) {
                        !0, (i = a);
                        break;
                      }
                    }
                  } else i = document.getElementById("pixel-script-poptin").src;
                  if (i.length > 0) {
                    if ((i = i.split("?")[1]).indexOf("&") > -1) {
                      i = i.split("&");
                      for (o = 0; o < i.length; o++) {
                        void 0 !== (r = i[o].split("="))[0] &&
                          void 0 !== r[1] &&
                          ($i[r[0]] = decodeURIComponent(r[1]));
                      }
                    } else {
                      var r;
                      void 0 !== (r = i.split("="))[0] &&
                        void 0 !== r[1] &&
                        ($i[r[0]] = decodeURIComponent(r[1]));
                    }
                    !(function () {
                      function t() {
                        (jQ224 = jQuery.noConflict(!0)),
                          (jQ224.ui = window.jQuery.ui),
                          p();
                      }
                      function i() {
                        (jQ224 = jQuery.noConflict(!0)),
                          (jQ224.ui =
                            void 0 !== window.$ && void 0 !== window.$.ui
                              ? window.$.ui
                              : void 0),
                          p();
                      }
                      function e() {
                        (jQ224 = jQuery.noConflict(!0)), p();
                      }
                      function o(t) {
                        document.getElementById("poptin_jQuery") &&
                          document.getElementById("poptin_jQuery").remove();
                        var i = document.createElement("script");
                        if (
                          (i.setAttribute("type", "text/javascript"),
                          i.setAttribute("id", "poptin_jQuery"),
                          i.setAttribute(
                            "src",
                            "https://cdnjs.cloudflare.com/ajax/libs/jquery/3.5.0/jquery.min.js"
                          ),
                          i.setAttribute("async", "true"),
                          i.readyState
                            ? (i.onreadystatechange = function () {
                                ("complete" != this.readyState &&
                                  "loaded" != this.readyState) ||
                                  t();
                              })
                            : (i.onload = t),
                          (
                            document.getElementsByTagName("head")[0] ||
                            document.documentElement
                          ).appendChild(i),
                          document.getElementById("poptin_googleapis"),
                          !document.getElementById("poptin_cloudflare"))
                        ) {
                          var e = this.document.createElement("link");
                          e.setAttribute("rel", "preconnect"),
                            e.setAttribute("id", "poptin_cloudflare"),
                            e.setAttribute(
                              "href",
                              "https://cdnjs.cloudflare.com"
                            ),
                            (
                              document.getElementsByTagName("head")[0] ||
                              document.documentElement
                            ).appendChild(e);
                        }
                        if (!document.getElementById("poptin_css_link")) {
                          var n = this.document.createElement("link");
                          n.setAttribute("rel", "preconnect"),
                            n.setAttribute("id", "poptin_css_link"),
                            n.setAttribute("href", Ei),
                            (
                              document.getElementsByTagName("head")[0] ||
                              document.documentElement
                            ).appendChild(n);
                        }
                      }
                      console.log("poptinInit loading"),
                        ai(),
                        n(),
                        (function () {
                          try {
                            if (
                              !poptinAfterPageLoad ||
                              ("noConflict" != poptinAfterPageLoad &&
                                "noJqueryUi" != poptinAfterPageLoad)
                            )
                              void 0 !== window.$ && void 0 !== window.$.ui
                                ? o(i)
                                : void 0 !== window.jQuery &&
                                  void 0 !== window.jQuery.ui
                                ? o(t)
                                : o(e);
                            else {
                              var n = !0;
                              void 0 !== window.$
                                ? ((jQ_ver_arr = $.fn.jquery.split(".")),
                                  jQ_ver_arr[0] > 1 ||
                                  (1 == jQ_ver_arr[0] && jQ_ver_arr[1] > 7)
                                    ? (jQ224 =
                                        "noJqueryUi" == poptinAfterPageLoad
                                          ? $
                                          : $.noConflict())
                                    : (n = !1))
                                : void 0 !== window.jQuery &&
                                  ((jQ_ver_arr = jQuery.fn.jquery.split(".")),
                                  jQ_ver_arr[0] > 1 ||
                                  (1 == jQ_ver_arr[0] && jQ_ver_arr[1] > 7)
                                    ? (jQ224 =
                                        "noJqueryUi" == poptinAfterPageLoad
                                          ? jQuery
                                          : jQuery.noConflict())
                                    : (n = !1)),
                                n || "noJqueryUi" == poptinAfterPageLoad
                                  ? p()
                                  : console.log(
                                      "Upgrade your jQuery to atleast 1.7 to show poptins"
                                    );
                            }
                          } catch (t) {
                            o(e);
                          }
                        })();
                    })();
                  } else e("Poptin pixel Code not exist");
                }),
              "function" != typeof pageLoadCheck &&
                (window.pageLoadCheck = function (t) {
                  if (2 == ++Rn) runPoptinNow();
                  else {
                    try {
                      clearTimeout(Xn[t]);
                    } catch (t) {}
                    Xn[t] = setTimeout(function () {
                      runPoptinNow();
                    }, 1e3);
                  }
                }),
              (window.isPoptinLandingPage =
                !!window.isPoptinLandingPage && window.isPoptinLandingPage),
              (window.poptinAfterPageLoad =
                !!window.poptinAfterPageLoad && window.poptinAfterPageLoad),
              poptinAfterPageLoad
                ? ((poptinAfterPageLoad = yi("poptinAfterPageLoad_debug")
                    ? yi("poptinAfterPageLoad_debug")
                    : poptinAfterPageLoad),
                  console.log("poptinAfterPageLoad"),
                  setTimeout(function () {
                    "complete" == document.readyState
                      ? runPoptinNow()
                      : window.addEventListener || window.hasOwnProperty("onload")
                      ? (window.addEventListener(
                          "load",
                          function () {
                            pageLoadCheck("check1");
                          },
                          !0
                        ),
                        (window.onload = function () {
                          pageLoadCheck("check2");
                        }))
                      : runPoptinNow();
                  }, 1500 *
                    ("noJqueryUi" == poptinAfterPageLoad ||
                    "noConflict" == poptinAfterPageLoad
                      ? 0
                      : 1)))
                : runPoptinNow(),
              "function" != typeof closePoptinOnXclick &&
                (window.closePoptinOnXclick = function (t) {
                  null != t &&
                    ((poptin_id = jQ224(t)
                      .parents(".poptin-popup")
                      .attr("data-poptin-id")),
                    Ze[poptin_id] && Ze[poptin_id].poptin_trigger
                      ? (Ze[poptin_id].poptin_trigger.close_trigger = "x_click")
                      : poptin_id &&
                        Ze[poptin_id] &&
                        ((Ze[poptin_id].poptin_trigger = {}),
                        (Ze[poptin_id].poptin_trigger.close_trigger = "x_click")),
                    poptin_id &&
                      (closePoptin(poptin_id, !0),
                      setTimeout(function () {
                        ci(poptin_id);
                      }, 1e3)));
                }),
              "function" != typeof closeTabPoptinOnXclick &&
                (window.closeTabPoptinOnXclick = function (t, i) {
                  if (1 == landing_page_teaser_on) var e = tn[i];
                  else e = Ve[i];
                  return N(e, "exit"), !1;
                }),
              "function" != typeof poptin_display &&
                (window.poptin_display = function (t) {
                  (poptin_display_trigger = !0),
                    ($href = Ai + "/APIRequest/click/" + t),
                    u($href, !0, !0, !1);
                }),
              "function" != typeof poptin_display_form &&
                (window.poptin_display_form = function (t) {
                  (poptin_display_trigger = !0),
                    ($href = Ai + "/APIRequest/click/" + t),
                    u($href, !0, !0, !1, !0);
                });
            var qn = [
                "Verdana,+Geneva,+sans-serif",
                "Arial,+Helvetica,+sans-serif",
                "Arial+Black,+Gadget,+sans-serif",
                "Comic+Sans+MS,+cursive,+sans-serif",
                "Georgia,+serif",
                "Impact,+Charcoal,+sans-serif",
                "Lucida+Sans+Unicode,+Lucida+Grande,+sans-serif",
                "Palatino+Linotype,+Book+Antiqua,+Palatino,+serif",
                "Tahoma,+Geneva,+sans-serif",
                "Times+New+Roman,+Times,+serif",
                "Trebuchet+MS,+Helvetica,+sans-serif",
              ],
              Un = [
                "Aclonica",
                "Alef",
                "Allan",
                "Allerta Stencil",
                "Allerta",
                "Amaranth",
                "Amatica SC",
                "Annie Use Your Telescope",
                "Anonymous Pro",
                "Anton",
                "Architects Daughter",
                "Arimo",
                "Artifika",
                "Arvo",
                "Asap",
                "Asset",
                "Assistant",
                "Astloch",
                "Bangers",
                "Bentham",
                "Bevan",
                "Bigshot One",
                "Bowlby One SC",
                "Bowlby One",
                "Brawler",
                "Cabin",
                "Calligraffitti",
                "Candal",
                "Cantarell",
                "Cardo",
                "Carter One",
                "Caudex",
                "Cedarville Cursive",
                "Cherry Cream Soda",
                "Chewy",
                "Coda",
                "Coming Soon",
                "Copse",
                "Corben",
                "Cousine",
                "Covered By Your Grace",
                "Crafty Girls",
                "Crimson Text",
                "Crushed",
                "Cuprum",
                "Damion",
                "Dancing Script",
                "David Libre",
                "Dawning of a New Day",
                "Didact Gothic",
                "DM Sans",
                "Dosis",
                "Droid Sans",
                "Droid Sans Mono",
                "Droid Serif",
                "DM Serif Display",
                "EB Garamond",
                "Exo",
                "Expletus Sans",
                "Fontdiner Swanky",
                "Forum",
                "Francois One",
                "Frank Ruhl Libre",
                "Geo",
                "Give You Glory",
                "Goblin One",
                "Goudy Bookletter 1911",
                "Gravitas One",
                "Gruppo",
                "Hammersmith One",
                "Heebo",
                "Holtwood One SC",
                "Homemade Apple",
                "Inconsolata",
                "Indie Flower",
                "IM Fell DW Pica",
                "IM Fell DW Pica SC",
                "IM Fell Double Pica",
                "IM Fell Double Pica SC",
                "IM Fell English",
                "IM Fell English SC",
                "IM Fell French Canon",
                "IM Fell French Canon SC",
                "IM Fell Great Primer",
                "IM Fell Great Primer SC",
                "Irish Grover",
                "Irish Growler",
                "Istok Web",
                "Josefin Sans",
                "Josefin Slab",
                "Judson",
                "Jura",
                "Just Another Hand",
                "Just Me Again Down Here",
                "Kameron",
                "Kenia",
                "Kranky",
                "Kreon",
                "Kristi",
                "La Belle Aurore",
                "Lato",
                "League Script",
                "Lekton",
                "Libre Baskerville",
                "Limelight",
                "Lobster",
                "Lobster Two",
                "Lora",
                "Love Ya Like A Sister",
                "Loved by the King",
                "Luckiest Guy",
                "Maiden Orange",
                "Mako",
                "Maven Pro",
                "Meddon",
                "MedievalSharp",
                "Megrim",
                "Merriweather",
                "Metrophobic",
                "Michroma",
                "Miltonian Tattoo",
                "Miltonian",
                "Miriam Libre",
                "Modern Antiqua",
                "Molengo",
                "Monofett",
                "Montserrat",
                "Mountains of Christmas",
                "Muli",
                "Neucha",
                "Neuton",
                "News Cycle",
                "Nixie One",
                "Nobile",
                "Nova Cut",
                "Nova Flat",
                "Nova Mono",
                "Nova Oval",
                "Nova Round",
                "Nova Script",
                "Nova Slim",
                "Nova Square",
                "Nunito:light",
                "Nunito",
                "Nunito Sans",
                "OFL Sorts Mill Goudy TT",
                "Old Standard TT",
                "Open Sans",
                "Open Sans Condensed",
                "Open Sans Hebrew",
                "Orbitron",
                "Oswald",
                "Over the Rainbow",
                "Pacifico",
                "Patrick Hand",
                "Paytone One",
                "Permanent Marker",
                "Philosopher",
                "Play",
                "Playfair Display",
                "Podkova",
                "Poppins",
                "PT Sans",
                "PT Sans Narrow",
                "PT Sans Narrow:regular,bold",
                "PT Serif",
                "PT Serif Caption",
                "Puritan",
                "Quattrocento",
                "Quattrocento Sans",
                "Quicksand",
                "Radley",
                "Raleway",
                "Redressed",
                "Reenie Beanie",
                "Rock Salt",
                "Rokkitt",
                "Roboto",
                "Rubik",
                "Ruslan Display",
                "Schoolbell",
                "Secular One",
                "Shadows Into Light",
                "Shanti",
                "Sigmar One",
                "Six Caps",
                "Slackey",
                "Smythe",
                "Source Sans Pro",
                "Special Elite",
                "Stardos Stencil",
                "Sue Ellen Francisco",
                "Suez One",
                "Sunshiney",
                "Swanky and Moo Moo",
                "Syncopate",
                "Tangerine",
                "Tenor Sans",
                "Terminal Dosis Light",
                "The Girl Next Door",
                "Tinos",
                "Ubuntu",
                "Ultra",
                "Unkempt",
                "UnifrakturCook:bold",
                "UnifrakturMaguntia",
                "Varela",
                "Varela Round",
                "Vibur",
                "Vollkorn",
                "VT323",
                "Waiting for the Sunrise",
                "Wallpoet",
                "Walter Turncoat",
                "Wire One",
                "Yanone Kaffeesatz",
                "Yeseva One",
                "Zeyad",
                "Zilla Slab",
              ];
            "function" != typeof closePoptin &&
              (window.closePoptin = function (t, i) {
                if (
                  (jQ224("[data-poptin-id=" + t + "]")
                    .find("audio, video")
                    .remove(),
                  0 == jQ224("[data-poptin-id=" + t + "]").length)
                )
                  return !1;
                i = i || !1;
                e("closePoptin: " + t),
                  (jQ224(
                    ".poptin-popup[data-poptin-id=" +
                      t +
                      "][data-poptin-location='center-top'][data-poptin-type='bar']"
                  ).length > 0 ||
                    "1" ==
                      jQ224(".poptin-popup[data-poptin-id=" + t + "]").attr(
                        "data-wellcome-screen"
                      )) &&
                    ln &&
                    jQ224("html").animate({ "padding-top": "0px" }, 500),
                  jQ224(".poptin-embedded[data-id='" + t + "']").slideUp();
                try {
                  clearInterval(Hn);
                } catch (t) {}
                try {
                  clearInterval(Wn);
                } catch (t) {}
                1 == landing_page_teaser_on
                  ? jQ224(
                      '#poptinDraggableContainer-tab[data-load-poptin="' +
                        Xi.poptin_id +
                        '"]'
                    ).length > 0
                    ? "before_show" !=
                        jQ224(".poptin-popup[data-poptin-id=" + t + "]").attr(
                          "data-tabshow"
                        ) && N(Xi, "entry")
                    : A(Xi, 1)
                  : void 0 !==
                      jQ224(".poptin-popup[data-poptin-id=" + t + "]").attr(
                        "data-hastab"
                      ) &&
                    1 ==
                      jQ224(".poptin-popup[data-poptin-id=" + t + "]").attr(
                        "data-hastab"
                      ) &&
                    ((Xi = Ve[t]),
                    ("after_close" ==
                      jQ224(".poptin-popup[data-poptin-id=" + t + "]").attr(
                        "data-tabshow"
                      ) ||
                      "always" ==
                        jQ224(".poptin-popup[data-poptin-id=" + t + "]").attr(
                          "data-tabshow"
                        )) &&
                      (jQ224(
                        '#poptinDraggableContainer-tab[data-load-poptin="' +
                          Xi.poptin_id +
                          '"]'
                      ).length > 0 &&
                      jQ224(
                        '#poptinDraggableContainer-tab[data-load-poptin="' +
                          Xi.poptin_id +
                          '"]'
                      ).hasClass("popup-loaded")
                        ? (jQ224(
                            '#poptinDraggableContainer-tab[data-load-poptin="' +
                              Xi.poptin_id +
                              '"]'
                          ).removeClass("popup-loaded"),
                          "all@display_everytime_everypage_5" == Xi.d_f_r
                            ? 0 != Xi.x_close_button && N(Xi, "entry")
                            : N(Xi, "entry"))
                        : A(Xi, 1)));
                var n = 0;
                (Xi = Ve[t]).poptin_type &&
                  "embedded" != Xi.poptin_type &&
                  "fullpage" != Xi.poptin_type &&
                  ((Xi.design_properties &&
                    Xi.design_properties.poptin_design_exit_effect &&
                    "exit_effect-none" ==
                      Xi.design_properties.poptin_design_exit_effect) ||
                  !Xi.design_properties.poptin_design_exit_effect
                    ? (n = 0)
                    : (wi(Xi, "exit"), (n = 800))),
                  setTimeout(function () {
                    i || Xi.is_teasers_on
                      ? It(t)
                      : (jQ224(
                          ".poptin-popup[data-poptin-id=" +
                            t +
                            "], .poptin-popup-background[data-poptin-id=" +
                            t +
                            "]"
                        ).fadeOut("fast"),
                        setTimeout(function () {
                          It(t);
                        }, 5e3)),
                      jQ224("#bgeffect_canvas_" + t).remove();
                  }, n),
                  Gn.firePoptin(t);
                var o = jQ224(".poptin-popup[data-poptin-id=" + t + "]");
                if (
                  o.hasClass("poptin-submitted") ||
                  o.hasClass("poptin-redirected")
                )
                  "gamified" == Xi.poptin_type &&
                    jQ224(".poptin-popup[data-poptin-id=" + t + "]").removeClass(
                      "poptin-submitted poptin-redirected"
                    );
                else {
                  var p = new CustomEvent("poptinClose", {
                    bubbles: !0,
                    detail: dt(Xi, { event_name: "poptinClose" }),
                  });
                  document.dispatchEvent(p), onpoptinClose(t);
                }
                void 0 !== Xi.design_properties.poptin_design_redirect &&
                  1 == Ze[t].poptin_trigger.convert &&
                  Nt(Xi);
              }),
              (PoptinQueue = function () {
                (this.active = !1),
                  (this.poptins = []),
                  (this.ifActive = function () {
                    return this.active;
                  }),
                  (this.getActive = function () {
                    return this.active;
                  }),
                  (this.setActive = function (t) {
                    this.active = t;
                  }),
                  (this.ifRelevent = function (t) {
                    return (
                      "lightbox" == t.poptin_type ||
                      "gamified" == t.poptin_type ||
                      "fullpage" == t.poptin_type
                    );
                  }),
                  (this.checkQueue = function (t, i) {
                    var e =
                      "embedded" != t.poptin_type
                        ? jQ224("body")
                        : jQ224(
                            ".poptin-embedded[data-id='" + t.poptin_id + "']"
                          );
                    if (this.getActive())
                      if (this.ifRelevent(t));
                      else {
                        if (
                          jQ224('[data-poptin-id="' + t.poptin_id + '"]').length >
                          0
                        )
                          return !1;
                        e.append(t.poptin),
                          (Ze[t.poptin_id].poptin = t.poptin),
                          W(t, i);
                      }
                    else {
                      if (
                        (this.ifRelevent(t) && this.setActive(!0),
                        jQ224('[data-poptin-id="' + t.poptin_id + '"]').length >
                          0)
                      )
                        return !1;
                      e.append(t.poptin),
                        (Ze[t.poptin_id].poptin = t.poptin),
                        W(t, i);
                    }
                  }),
                  (this.firePoptin = function (t) {
                    (Xi = Ve[t]),
                      this.ifActive() &&
                        this.ifRelevent(Xi) &&
                        this.setActive(!1);
                  });
              });
            var Hn,
              Wn,
              Gn = new PoptinQueue(),
              Yn = location.href;
            if (
              ("undefined" != typeof poptin_single_page_app &&
                poptin_single_page_app &&
                (poptin_single_page_app = yi("poptin_single_page_app_debug")
                  ? yi("poptin_single_page_app_debug")
                  : poptin_single_page_app),
              "undefined" != typeof poptin_single_page_app &&
                poptin_single_page_app)
            ) {
              var Jn = function (t, i) {
                  yi("poptin_single_page_app_debug") && e("detect_url_change"),
                    jQ224("#poptinDraggableContainer-tab").remove(),
                    jQ224(".poptin-popup").remove(),
                    jQ224("#modelBackdrip").remove(),
                    (poptinStarted = !1),
                    jQ224(document).unbind(),
                    clearTimeout(poptinTimeDelayTrigger),
                    (poptinTimeDelayTrigger = null),
                    runPoptinNow(),
                    (Gn = new PoptinQueue());
                },
                Kn = history.pushState;
              (history.pushState = function () {
                var t = document.location.pathname;
                if ("/" != t) {
                  var i = localStorage.getItem("poptin_previous_visited_pages");
                  if (i && i.length > 0) {
                    var e = i.split("|");
                    e.includes(t) || e.push(t),
                      localStorage.setItem(
                        "poptin_previous_visited_pages",
                        e.join("|")
                      );
                  } else localStorage.setItem("poptin_previous_visited_pages", t);
                }
                (previous_url_spa =
                  document.location.protocol +
                  "//" +
                  document.location.hostname +
                  document.location.pathname +
                  document.location.hash),
                  l(),
                  Kn.apply(history, arguments),
                  Jn();
              }),
                window.addEventListener("popstate", function (t) {
                  e("old location: " + Yn),
                    jQ224("#poptinDraggableContainer-tab").remove(),
                    jQ224(".poptin-popup").remove(),
                    jQ224("#modelBackdrip").remove(),
                    (poptinStarted = !1),
                    jQ224(document).unbind(),
                    runPoptinNow(),
                    (Yn = document.location),
                    e("new location: " + Yn),
                    (Gn = new PoptinQueue());
                });
            }
            "function" != typeof poptinClientLimitLogStatus &&
              (window.poptinClientLimitLogStatus = function (t) {
                e("poptinClientLimitLogStatus: " + t),
                  jQ224("#poptinUpgradePoptin").hide(),
                  jQ224("#popupRemindMe").hide(),
                  (status = t),
                  (log_id = upgrade_popup_setting.id),
                  jQ224
                    .ajax(
                      {
                        url:
                          Ai +
                          "/APIRequest/limitLogs/" +
                          o() +
                          "?status=" +
                          status +
                          "&id=" +
                          log_id,
                        async: !0,
                        cache: !0,
                        dataType: "json",
                        type: "get",
                      },
                      "json"
                    )
                    .done(function (t) {
                      e(t);
                    })
                    .fail(function (t, i, e) {});
              }),
              "function" != typeof closeUpgradePopup &&
                (window.closeUpgradePopup = function () {
                  jQ224("#poptinUpgradePoptin").hide(),
                    upgrade_popup_setting.mote_than_two_days &&
                      jQ224("body").append(upgrade_popup_setting.remindme_popup);
                }),
              "function" != typeof poptinUpgradeDontRemindMe &&
                (window.poptinUpgradeDontRemindMe = function (t) {
                  poptinClientLimitLogStatus(t);
                }),
              "function" != typeof poptinUpgradeRemindMe &&
                (window.poptinUpgradeRemindMe = function (t) {
                  poptinClientLimitLogStatus(t);
                }),
              "function" != typeof poptinUpgradePopupClick &&
                (window.poptinUpgradePopupClick = function (t) {
                  poptinClientLimitLogStatus(t);
                });
          }
        },
        77: () => {},
        461: () => {},
        702: () => {},
        410: () => {},
      },
      n = {};
    function o(t) {
      var i = n[t];
      if (void 0 !== i) return i.exports;
      var p = (n[t] = { exports: {} });
      return e[t](p, p.exports, o), p.exports;
    }
    (o.m = e),
      (t = []),
      (o.O = (i, e, n, p) => {
        if (!e) {
          var a = 1 / 0;
          for (l = 0; l < t.length; l++) {
            for (var [e, n, p] = t[l], r = !0, s = 0; s < e.length; s++)
              (!1 & p || a >= p) && Object.keys(o.O).every((t) => o.O[t](e[s]))
                ? e.splice(s--, 1)
                : ((r = !1), p < a && (a = p));
            if (r) {
              t.splice(l--, 1);
              var d = n();
              void 0 !== d && (i = d);
            }
          }
          return i;
        }
        p = p || 0;
        for (var l = t.length; l > 0 && t[l - 1][2] > p; l--) t[l] = t[l - 1];
        t[l] = [e, n, p];
      }),
      (o.o = (t, i) => Object.prototype.hasOwnProperty.call(t, i)),
      (() => {
        var t = { 348: 0, 468: 0, 162: 0, 566: 0, 788: 0 };
        o.O.j = (i) => 0 === t[i];
        var i = (i, e) => {
            var n,
              p,
              [a, r, s] = e,
              d = 0;
            if (a.some((i) => 0 !== t[i])) {
              for (n in r) o.o(r, n) && (o.m[n] = r[n]);
              if (s) var l = s(o);
            }
            for (i && i(e); d < a.length; d++)
              (p = a[d]), o.o(t, p) && t[p] && t[p][0](), (t[a[d]] = 0);
            return o.O(l);
          },
          e = (self.appConfigChunkLoadingGlobal =
            self.appConfigChunkLoadingGlobal || []);
        e.forEach(i.bind(null, 0)), (e.push = i.bind(null, e.push.bind(e)));
      })(),
      o.O(void 0, [468, 162, 566, 788], () => o(25)),
      o.O(void 0, [468, 162, 566, 788], () => o(77)),
      o.O(void 0, [468, 162, 566, 788], () => o(461)),
      o.O(void 0, [468, 162, 566, 788], () => o(702));
    var p = o.O(void 0, [468, 162, 566, 788], () => o(410));
    p = o.O(p);
  })();
  
  