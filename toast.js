const Toast = {
  lang: { OK: "OK", YES: "Yes", NO: "No" }
}

document.head.insertAdjacentHTML("beforeend", `
<style>
[class^="toast-"] {
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  -moz-user-select: none;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  user-select: none;
  line-height: normal;
}
.toast-mask {
  position: fixed;
  z-index: 1000;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
}
.toast-loading {
  position: fixed;
  z-index: 1001;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  width: 40px;
  height: 40px;
  margin: auto;
  border-radius: 50%;
  border-top: 3px solid rgba(255, 255, 255, 0.2);
  border-right: 3px solid rgba(255, 255, 255, 0.2);
  border-bottom: 3px solid rgba(255, 255, 255, 0.2);
  border-left: 2px solid rgba(255, 255, 255, 0.8);
  animation: spin .7s linear infinite;
}
.toast-progress {
  position: fixed;
  z-index: 1001;
  top: 0;
  left: 0;
  width: 0;
  height: 1px;
  background: #0c7;
  transition: width .3s linear;
}
.toast-dialog {
  display: flex;
  justify-content: center;
  align-items: center;
}
.toast-dialog-panel {
  background: #fff;
  max-width: 80%;
  max-height: 80%;
  min-width: 280px;
  border-radius: 5px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}
.toast-dialog-header {
  font-weight: 700;
  padding: 20px 20px 0;
  text-align: center;
}
.toast-dialog-body {
  flex: 1;
  overflow: auto;
  padding: 25px;
}
.toast-dialog-footer {
  display: flex;
  text-align: center;
  border-top: #f3f3f3 1px solid;
}
.toast-dialog-button {
  flex: 1;
  cursor: pointer;
  line-height: 48px;
  font-weight: 700;
  color: #999;
  border-left: #f3f3f3 1px solid;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
}
.toast-dialog-button:first-child {
  border: 0;
}
.toast-dialog-button:active {
  background: #eee;
}
.toast-dialog-button.primary {
  color: #333;
}
.toast-info {
  background: transparent;
  height: 0;
  display: flex;
  justify-content: center;
}
.toast-info>div {
  margin-top: 80px;
  margin-bottom: auto;
  max-width: 80%;
  padding: 10px 15px;
  border-radius: 3px;
  font-weight: 700;
  color: #fff;
}
.toast-actionsheet {
  position: fixed;
  z-index: 1001;
  left: 0;
  right: 0;
  bottom: 0;
  background: #eee;
}
.toast-actionsheet-menu {
  text-align: center;
  border-top: #f6f6f6 1px solid;
  background: #fff;
  cursor: pointer;
  line-height: 50px;
  font-weight: 700;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
}
.toast-actionsheet-menu:active {
  background: #eee;
}
.toast-actionsheet-menu:first-child {
  border: 0;
}
.toast-actionsheet-menu:last-child {
  border: 0;
  margin-top: 10px;
  color: #ce2f33;
}
[toast-tooltip] {
  position: relative;
}
[toast-tooltip]:before, [toast-tooltip]:after {
  position: absolute;
  visibility: hidden;
  pointer-events: none;
  opacity: 0;
  bottom: 100%;
  left: 50%;
  transform: translate3d(-50%, -10px, 0);
  transition: opacity .5s;
}
[toast-tooltip]:hover:before, [toast-tooltip]:hover:after {
  visibility: visible;
  opacity: 1;
}
[toast-tooltip]:before {
  content: "";
  z-index: 1001;
  background: transparent;
  border: 6px solid transparent;
  border-top-color: rgba(0, 0, 0, 0.7);
  margin-bottom: -12px;
}
[toast-tooltip]:after {
  content: attr(toast-tooltip);
  z-index: 1000;
  margin-right: -300px;
  padding: 8px 10px;
  border-radius: 3px;
  font-size: 14px;
  line-height: 1.6;
  background-color: rgba(0, 0, 0, 0.7);
  color: #fff;
}
.toast-scale-in {
  animation: scaleIn ease .3s forwards;
}
.toast-fade-in {
  animation: fadeIn ease .3s forwards;
}
.toast-scale-out {
  animation: scaleOut ease .3s forwards;
}
.toast-fade-out {
  animation: fadeOut ease .3s forwards;
}
.toast-slide-up {
  animation: slideUp ease .3s forwards;
}
.toast-slide-down {
  animation: slideDown ease .3s forwards;
}
.toast-slide-left {
  animation: slideLeft ease .3s forwards;
}
.toast-slide-right {
  animation: slideRight ease .3s forwards;
}
@keyframes scaleIn {
  from { transform: scale3d(0.8, 0.8, 1); }
  to { transform: scale3d(1, 1, 1); }
}
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
@keyframes scaleOut {
  from { transform: scale3d(1, 1, 1); }
  to { transform: scale3d(0.8, 0.8, 1); }
}
@keyframes fadeOut {
  from { opacity: 1; }
  to { opacity: 0; }
}
@keyframes slideUp {
  from { transform: translate3d(0, 100%, 0); }
  to { transform: translate3d(0, 0, 0); }
}
@keyframes slideDown {
  from { transform: translate3d(0, 0, 0); }
  to { transform: translate3d(0, 100%, 0); }
}
@keyframes slideLeft {
  from { transform: translate3d(100%, 0, 0); }
  to { transform: translate3d(0, 0, 0); }
}
@keyframes slideRight {
  from { transform: translate3d(0, 0, 0); }
  to { transform: translate3d(100%, 0, 0); }
}
@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
</style>`);

Object.assign(Element.prototype, {
  addClass(name) {
    this.classList.add(name)
    return this
  },
  removeClass(name) {
    this.classList.remove(name)
    return this
  },
  on(event, fn) {
    this.addEventListener(event, fn)
    return this
  },
  off(event, fn) {
    this.removeEventListener(event, fn)
    return this
  },
  insert(html) {
    const el = createElement(html);
    this.insertBefore(el, this.firstChild);
    return el;
  },
  append(html) {
    const el = createElement(html);
    this.appendChild(el);
    return el;
  },
  remove() {
    return this.parentNode && this.parentNode.removeChild(this)
  },
})

function createElement(html) {
  html = html.replace(/[\t\r\n]/mg, "").trim();
  const fragment = document.createRange().createContextualFragment(html);
  return fragment.firstChild;
}

/**
 * Toast loading component
 * @example
 * Toast.loading.start()
 * Toast.loading.done()
 */
Toast.loading = {
  start() {
    if (this.instance) return;
    this.instance = createElement("<div class='toast-loading'></div>");
    document.body.appendChild(this.instance);
  },

  done() {
    if (!this.instance) return;
    this.instance.remove();
    this.instance = null;
  }
}

/**
 * Toast progess component
 * @example
 * Toast.progress.start()
 * Toast.progress.done()
 */
Toast.progress = {
  start(indeterminate = true) {
    if (this.status) return;

    this.instance = createElement("<div class='toast-progress'></div>");
    document.body.appendChild(this.instance);
    this._observe();

    if (indeterminate) {
      this.status = 1;
      this._trickle = setInterval(() => {
        if (this.status < 99) {
          this.status += Math.round(((100 - this.status) / 3) * Math.random());
        }
      }, 300);
    }
  },

  tick(status) {
    this.status = parseInt(status);
  },

  done() {
    if (!this.status) return;
    this.status = 100;
    clearInterval(this._trickle);

    setTimeout(() => {
      this.status = 0;
      this.instance.remove();
    }, 300);
  },

  _observe() {
    if (this._observed) return;
    this._observed = true;

    let value = this.status;
    Object.defineProperty(this, "status", {
      get: () => value,
      set: v => {
        value = v;
        this.instance.style.width = v + "%";
      }
    });
  }
}

/**
 * Toast info component
 * @example
 * Toast.info("hello world", options)
 * options = 3000
 * options = {
 *   duration: 3000,
 *   background: "#ccc"
 * }
 * @param {String} message
 * @param {Object} options
 */
Toast.info = function (message, options) {
  // Check and remove current instance
  if (Toast._singleton) {
    Toast._singleton.remove();
    Toast._singleton = null;
  }

  // Merge custom options
  if (typeof options === "number") {
    options = { duration: options };
  }
  options = Object.assign({
    duration: 3000,
    background: "rgba(0, 0, 0, 0.6)"
  }, options);

  // Create element container
  const instance = createElement(`
    <div class="toast-mask toast-info">
      <div style="background:${options.background}">${message}</div>
    </div>
  `);

  // Show instance
  document.body.appendChild(instance);
  instance.addClass("toast-fade-in");
  Toast._singleton = instance;

  // Auto hide delay
  setTimeout(() => {
    instance.addClass("toast-fade-out");
    instance.on("animationend", instance.remove);
  }, options.duration);
}

/**
 * Toast success component (extends Toast.info)
 * @example
 * Toast.success("hello world", options)
 * options = 3000
 * options = {
 *   duration: 3000,
 *   background: "#ccc"
 * }
 * @param {String} message
 * @param {Object} options
 */
Toast.success = function (message, options = {}) {
  if (typeof options === "number") {
    options = { duration: options };
  }
  options.background = "rgba(43, 155, 23, 0.6)";
  this.info(message, options);
}

/**
 * Toast error component (extends Toast.info)
 * @example
 * Toast.error("hello world", options)
 * options = 3000
 * options = {
 *   duration: 3000,
 *   background: "#ccc"
 * }
 * @param {String} message
 * @param {Object} options
 */
Toast.error = function (message, options = {}) {
  if (typeof options === "number") {
    options = { duration: options };
  }
  options.background = "rgba(217, 37, 7, 0.6)";
  this.info(message, options);
}

/**
 * Toast dialog component
 * @example
 * Toast.dialog({
 *   title: "title",
 *   html: "hello world",
 *   buttons: [{
 *     label: "OK",
 *     type: "primary",
 *     onclick: () => alert("OK")
 *   }, {
 *     label: "Cancel",
 *     onclick: () => alert("Cancel")
 *   }]
 * })
 * @param {Object} opts
 * @returns
 */
Toast.dialog = function (opts) {
  // Create element container
  const instance = createElement(`
    <div class="toast-mask toast-dialog">
      <div class="toast-dialog-panel">
        <div class="toast-dialog-body">${opts.html}</div>
      </div>
    </div>
  `);

  // Add title to instance
  const panel = instance.querySelector(".toast-dialog-panel");
  if (opts.title) {
    panel.insert(`<div class="toast-dialog-header">${opts.title}</div>`);
  }

  // Add custom buttons to instance
  if (opts.buttons && opts.buttons.length > 0) {
    const footer = panel.append(`<div class="toast-dialog-footer"></div>`);
    opts.buttons.forEach(item => {
      const button = footer.append(`<div class="toast-dialog-button ${item.type || ""}">${item.label}</div>`);
      button.on("click", () => {
        if (item.onclick) item.onclick(instance);
        else instance.hide();
      })
    })
  }

  // Add hide method to instance
  instance.hide = () => {
    panel.addClass("toast-scale-out");
    instance.addClass("toast-fade-out");
    instance.on("animationend", instance.remove);
  }

  // Show dialog
  document.body.appendChild(instance);
  if (opts.animation !== false) {
    panel.addClass("toast-scale-in");
    instance.addClass("toast-fade-in");
  }
  return instance;
}

/**
 * Toast alert component (extends dialog)
 * @example Toast.alert("hello world")
 * @param {String} message
 * @returns
 */
Toast.alert = function (message) {
  return this.dialog({
    html: message,
    buttons: [{ label: this.lang.OK, type: "primary" }]
  });
}

/**
 * Toast confirm component (extends dialog)
 * @example
 * Toast.confirm("hello world", () => {
 *   alert("callback success")
 * })
 * @param {String} message
 * @param {Function} callback
 * @returns
 */
Toast.confirm = function (message, callback) {
  return this.dialog({
    html: message,
    buttons: [{
      label: this.lang.NO
    }, {
      label: this.lang.YES,
      type: "primary",
      onclick: (dialog) => {
        dialog.hide();
        callback && callback();
      }
    }]
  })
}

/**
 * Toast action sheet component
 * @example
 * const sheet = Toast.actionSheet([
 *   { label: "Menu One", onclick: () => alert(1) },
 *   { label: "Menu Two", onclick: () => alert(2) },
 *   { label: "Menu Three", onclick: () => alert(3) },
 * ])
 * sheet.hide()
 * @param {Array} menus
 * @returns
 */
Toast.actionSheet = function (menus = []) {
  // Create element container
  const instance = createElement(`
    <div>
      <div class="toast-mask"></div>
      <div class="toast-actionsheet"></div>
    </div>
  `);

  // Add click event to mask
  const mask = instance.querySelector(".toast-mask");
  mask.onclick = () => instance.hide();

  // Add custom menus to sheet
  const sheet = instance.querySelector(".toast-actionsheet");
  menus.push({ label: "取消" });
  menus.forEach(item => {
    let menu = createElement(`<div class="toast-actionsheet-menu">${item.label}</div>`);
    menu.on("click", e => {
      instance.hide();
      item.onclick && item.onclick(e);
    });
    sheet.appendChild(menu);
  });

  // Add hide method to instance
  instance.hide = () => {
    mask.addClass("toast-fade-out");
    sheet.addClass("toast-slide-down");
    sheet.on("animationend", () => instance.remove());
  }

  // Show actionsheet
  document.body.appendChild(instance);
  mask.addClass("toast-fade-in");
  sheet.addClass("toast-slide-up");
  return instance;
}

/**
 * Toast sliding page component
 * @example
 * const page = Toast.slidingPage(document.querySelector("#id"))
 * page.show()
 * page.hide()
 * @param {Element|String} target
 * @returns
 */
Toast.slidingPage = function (target) {
  const instance = typeof target === "string" ? createElement(target) : target;

  if (!instance._paged) {
    instance._paged = true;
    instance.addClass('toast-mask');
    instance.display = getComputedStyle(instance, null)['display'];
    instance.style.display = 'none';

    instance.show = function () {
      instance.style.display = this.display;
      this.removeClass('toast-slide-right');
      this.addClass('toast-slide-left');
      return this;
    }
    instance.hide = function () {
      this.removeClass('toast-slide-left');
      this.addClass('toast-slide-right');
      return this;
    }
  }
  return instance;
}