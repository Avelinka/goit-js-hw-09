!function(){function e(e){return e&&e.__esModule?e.default:e}var t="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},n={},o={},i=t.parcelRequired7c6;null==i&&((i=function(e){if(e in n)return n[e].exports;if(e in o){var t=o[e];delete o[e];var i={id:e,exports:{}};return n[e]=i,t.call(i.exports,i,i.exports),i.exports}var r=new Error("Cannot find module '"+e+"'");throw r.code="MODULE_NOT_FOUND",r}).register=function(e,t){o[e]=t},t.parcelRequired7c6=i);var r=i("6JpON"),a=document.querySelector(".form"),u={position:"center-bottom",distance:"20px",borderRadius:"20px",timeout:5e3,clickToClose:!0,cssAnimationStyle:"from-right"};function l(e,t){return new Promise((function(n,o){var i=Math.random()>.3;setTimeout((function(){i?n({position:e,delay:t}):o({position:e,delay:t})}),t)}))}a.addEventListener("submit",(function(t){t.preventDefault();var n=t.currentTarget.elements,o=n.delay,i=n.step,a=n.amount,c=Number(o.value),d=Number(i.value),s=Number(a.value);if(d<0||c<0||s<=0)return void e(r).Notify.failure("❌ Please enter valid values for step, delay, and amount.",u);for(var f=1;f<=s;f++)l(f,c).then((function(t){var n=t.position,o=t.delay;e(r).Notify.success("✅ Fulfilled promise ".concat(n," in ").concat(o,"ms"),u)})).catch((function(t){var n=t.position,o=t.delay;e(r).Notify.failure("❌ Rejected promise ".concat(n," in ").concat(o,"ms"),u)})),c+=d}))}();
//# sourceMappingURL=03-promises.75c00dcf.js.map