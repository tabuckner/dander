(window.webpackJsonp=window.webpackJsonp||[]).push([[89],{XGfm:function(t,o,e){"use strict";e.r(o),e.d(o,"ion_toast",(function(){return b}));var i=e("imtE"),a=(e("AfW+"),e("aiEM"),e("1ym9")),r=(e("EV1M"),e("7TZ+")),n=e("Dl6n"),s=e("YtD4");const c=(t,o)=>{const e=Object(a.a)(),i=Object(a.a)(),r=t.host||t,n=t.querySelector(".toast-wrapper");switch(i.addElement(n),o){case"top":i.fromTo("transform","translateY(-100%)","translateY(calc(10px + var(--ion-safe-area-top, 0px)))");break;case"middle":const t=Math.floor(r.clientHeight/2-n.clientHeight/2);n.style.top="".concat(t,"px"),i.fromTo("opacity",.01,1);break;default:i.fromTo("transform","translateY(100%)","translateY(calc(-10px - var(--ion-safe-area-bottom, 0px)))")}return e.addElement(r).easing("cubic-bezier(.155,1.105,.295,1.12)").duration(400).addAnimation(i)},d=(t,o)=>{const e=Object(a.a)(),i=Object(a.a)(),r=t.host||t,n=t.querySelector(".toast-wrapper");switch(i.addElement(n),o){case"top":i.fromTo("transform","translateY(calc(10px + var(--ion-safe-area-top, 0px)))","translateY(-100%)");break;case"middle":i.fromTo("opacity",.99,0);break;default:i.fromTo("transform","translateY(calc(-10px - var(--ion-safe-area-bottom, 0px)))","translateY(100%)")}return e.addElement(r).easing("cubic-bezier(.36,.66,.04,1)").duration(300).addAnimation(i)},l=(t,o)=>{const e=Object(a.a)(),i=Object(a.a)(),r=t.host||t,n=t.querySelector(".toast-wrapper");switch(i.addElement(n),o){case"top":n.style.top="calc(8px + var(--ion-safe-area-top, 0px))",i.fromTo("opacity",.01,1);break;case"middle":const t=Math.floor(r.clientHeight/2-n.clientHeight/2);n.style.top="".concat(t,"px"),i.fromTo("opacity",.01,1);break;default:n.style.bottom="calc(8px + var(--ion-safe-area-bottom, 0px))",i.fromTo("opacity",.01,1)}return e.addElement(r).easing("cubic-bezier(.36,.66,.04,1)").duration(400).addAnimation(i)},p=t=>{const o=Object(a.a)(),e=Object(a.a)(),i=t.host||t,r=t.querySelector(".toast-wrapper");return e.addElement(r).fromTo("opacity",.99,0),o.addElement(i).easing("cubic-bezier(.36,.66,.04,1)").duration(300).addAnimation(e)},b=class{constructor(t){Object(i.k)(this,t),this.presented=!1,this.mode=Object(i.d)(this),this.duration=0,this.keyboardClose=!1,this.position="bottom",this.translucent=!1,this.animated=!0,this.dispatchCancelHandler=t=>{const o=t.detail.role;if(Object(r.j)(o)){const t=this.getButtons().find(t=>"cancel"===t.role);this.callButtonHandler(t)}},Object(r.e)(this.el),this.didPresent=Object(i.e)(this,"ionToastDidPresent",7),this.willPresent=Object(i.e)(this,"ionToastWillPresent",7),this.willDismiss=Object(i.e)(this,"ionToastWillDismiss",7),this.didDismiss=Object(i.e)(this,"ionToastDidDismiss",7)}async present(){await Object(r.f)(this,"toastEnter",c,l,this.position),this.duration>0&&(this.durationTimeout=setTimeout(()=>this.dismiss(void 0,"timeout"),this.duration))}dismiss(t,o){return this.durationTimeout&&clearTimeout(this.durationTimeout),Object(r.g)(this,t,o,"toastLeave",d,p,this.position)}onDidDismiss(){return Object(r.h)(this.el,"ionToastDidDismiss")}onWillDismiss(){return Object(r.h)(this.el,"ionToastWillDismiss")}getButtons(){return this.buttons?this.buttons.map(t=>"string"==typeof t?{text:t}:t):[]}async buttonClick(t){const o=t.role;return Object(r.j)(o)||await this.callButtonHandler(t)?this.dismiss(void 0,o):Promise.resolve()}async callButtonHandler(t){if(t&&t.handler)try{if(!1===await Object(r.n)(t.handler))return!1}catch(o){console.error(o)}return!0}renderButtons(t,o){if(0===t.length)return;const e=Object(i.d)(this),a={"toast-button-group":!0,["toast-button-group-".concat(o)]:!0};return Object(i.i)("div",{class:a},t.map(t=>Object(i.i)("button",{type:"button",class:h(t),tabIndex:0,onClick:()=>this.buttonClick(t),part:"button"},Object(i.i)("div",{class:"toast-button-inner"},t.icon&&Object(i.i)("ion-icon",{icon:t.icon,slot:void 0===t.text?"icon-only":void 0,class:"toast-icon"}),t.text),"md"===e&&Object(i.i)("ion-ripple-effect",{type:void 0!==t.icon&&void 0===t.text?"unbounded":"bounded"}))))}render(){const t=this.getButtons(),o=t.filter(t=>"start"===t.side),e=t.filter(t=>"start"!==t.side),a=Object(i.d)(this),r={"toast-wrapper":!0,["toast-".concat(this.position)]:!0};return Object(i.i)(i.a,{style:{zIndex:"".concat(6e4+this.overlayIndex)},class:Object.assign(Object.assign(Object.assign({[a]:!0},Object(n.a)(this.color)),Object(n.b)(this.cssClass)),{"toast-translucent":this.translucent}),onIonToastWillDismiss:this.dispatchCancelHandler},Object(i.i)("div",{class:r},Object(i.i)("div",{class:"toast-container",part:"container"},this.renderButtons(o,"start"),Object(i.i)("div",{class:"toast-content"},void 0!==this.header&&Object(i.i)("div",{class:"toast-header",part:"header"},this.header),void 0!==this.message&&Object(i.i)("div",{class:"toast-message",part:"message",innerHTML:Object(s.a)(this.message)})),this.renderButtons(e,"end"))))}get el(){return Object(i.f)(this)}static get style(){return":host{--border-width:0;--border-style:none;--border-color:initial;--box-shadow:none;--min-width:auto;--width:auto;--min-height:auto;--height:auto;--max-height:auto;left:0;top:0;display:block;position:absolute;width:100%;height:100%;color:var(--color);font-family:var(--ion-font-family,inherit);contain:strict;z-index:1001;pointer-events:none}:host-context([dir=rtl]){left:unset;right:unset;right:0}:host(.overlay-hidden){display:none}:host(.ion-color){--button-color:inherit;color:var(--ion-color-contrast)}:host(.ion-color) .toast-button-cancel{color:inherit}:host(.ion-color) .toast-wrapper{background:var(--ion-color-base)}.toast-wrapper{border-radius:var(--border-radius);left:var(--start);right:var(--end);width:var(--width);min-width:var(--min-width);max-width:var(--max-width);height:var(--height);min-height:var(--min-height);max-height:var(--max-height);border-width:var(--border-width);border-style:var(--border-style);border-color:var(--border-color);background:var(--background);-webkit-box-shadow:var(--box-shadow);box-shadow:var(--box-shadow)}:host-context([dir=rtl]) .toast-wrapper,[dir=rtl] .toast-wrapper{left:unset;right:unset;left:var(--end);right:var(--start)}.toast-container{-ms-flex-align:center;align-items:center;pointer-events:auto;height:inherit;min-height:inherit;max-height:inherit;contain:content}.toast-container,.toast-content{display:-ms-flexbox;display:flex}.toast-content{-ms-flex:1;flex:1;-ms-flex-direction:column;flex-direction:column;-ms-flex-pack:center;justify-content:center}.toast-message{-ms-flex:1;flex:1;white-space:pre-wrap}.toast-button-group{display:-ms-flexbox;display:flex}.toast-button{outline:none;color:var(--button-color);z-index:0}.toast-icon{font-size:1.4em}.toast-button-inner{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center}@media (any-hover:hover){.toast-button:hover{cursor:pointer}}:host{--background:var(--ion-color-step-50,#f2f2f2);--border-radius:14px;--button-color:var(--ion-color-primary,#3880ff);--color:var(--ion-color-step-850,#262626);--max-width:700px;--start:10px;--end:10px;font-size:14px}.toast-wrapper{margin-left:auto;margin-right:auto;margin-top:auto;margin-bottom:auto;display:block;position:absolute;z-index:10}@supports ((-webkit-margin-start:0) or (margin-inline-start:0)) or (-webkit-margin-start:0){.toast-wrapper{margin-left:unset;margin-right:unset;-webkit-margin-start:auto;margin-inline-start:auto;-webkit-margin-end:auto;margin-inline-end:auto}}@supports ((-webkit-backdrop-filter:blur(0)) or (backdrop-filter:blur(0))){:host(.toast-translucent) .toast-wrapper{background:rgba(var(--ion-background-color-rgb,255,255,255),.8);-webkit-backdrop-filter:saturate(180%) blur(20px);backdrop-filter:saturate(180%) blur(20px)}}.toast-wrapper.toast-top{-webkit-transform:translate3d(0,-100%,0);transform:translate3d(0,-100%,0);top:0}.toast-wrapper.toast-middle{opacity:.01}.toast-wrapper.toast-bottom{-webkit-transform:translate3d(0,100%,0);transform:translate3d(0,100%,0);bottom:0}.toast-content{padding-left:15px;padding-right:15px;padding-top:15px;padding-bottom:15px}@supports ((-webkit-margin-start:0) or (margin-inline-start:0)) or (-webkit-margin-start:0){.toast-content{padding-left:unset;padding-right:unset;-webkit-padding-start:15px;padding-inline-start:15px;-webkit-padding-end:15px;padding-inline-end:15px}}.toast-header{margin-bottom:2px;font-weight:500}.toast-button{padding-left:15px;padding-right:15px;padding-top:10px;padding-bottom:10px;height:44px;-webkit-transition:background-color,opacity .1s linear;transition:background-color,opacity .1s linear;border:0;background-color:transparent;font-family:var(--ion-font-family);font-size:17px;font-weight:500;overflow:hidden}@supports ((-webkit-margin-start:0) or (margin-inline-start:0)) or (-webkit-margin-start:0){.toast-button{padding-left:unset;padding-right:unset;-webkit-padding-start:15px;padding-inline-start:15px;-webkit-padding-end:15px;padding-inline-end:15px}}.toast-button.ion-activated{opacity:.4}@media (any-hover:hover){.toast-button:hover{opacity:.6}}"}},h=t=>Object.assign({"toast-button":!0,"toast-button-icon-only":void 0!==t.icon&&void 0===t.text,["toast-button-".concat(t.role)]:void 0!==t.role,"ion-focusable":!0,"ion-activatable":!0},Object(n.b)(t.cssClass))}}]);