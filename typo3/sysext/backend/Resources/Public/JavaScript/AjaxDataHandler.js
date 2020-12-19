/*
 * This file is part of the TYPO3 CMS project.
 *
 * It is free software; you can redistribute it and/or modify it under
 * the terms of the GNU General Public License, either version 2
 * of the License, or any later version.
 *
 * For the full copyright and license information, please read the
 * LICENSE.txt file that was distributed with this source code.
 *
 * The TYPO3 project - inspiring people to share!
 */
var __importDefault=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};define(["require","exports","TYPO3/CMS/Backend/BroadcastMessage","TYPO3/CMS/Core/Ajax/AjaxRequest","./Enum/Severity","jquery","TYPO3/CMS/Backend/BroadcastService","./Icons","./Modal","./Notification","./Viewport"],(function(e,t,a,n,s,i,r,o,l,d,c){"use strict";var h;i=__importDefault(i),function(e){e.hide=".t3js-record-hide",e.delete=".t3js-record-delete",e.icon=".t3js-icon"}(h||(h={}));class u{static refreshPageTree(){c.NavigationContainer&&c.NavigationContainer.PageTree&&c.NavigationContainer.PageTree.refreshTree()}static call(e){return new n(TYPO3.settings.ajaxUrls.record_process).withQueryArguments(e).get().then(async e=>await e.resolve())}constructor(){i.default(()=>{this.initialize()})}process(e,t){return u.call(e).then(e=>{if(e.hasErrors&&this.handleErrors(e),t){const n=Object.assign(Object.assign({},t),{hasErrors:e.hasErrors}),s=new a.BroadcastMessage("datahandler","process",n);r.post(s);const i=new CustomEvent("typo3:datahandler:process",{detail:{payload:n}});document.dispatchEvent(i)}return e})}initialize(){i.default(document).on("click",h.hide,e=>{e.preventDefault();const t=i.default(e.currentTarget),a=t.find(h.icon),n=t.closest("tr[data-uid]"),s=t.data("params");this._showSpinnerIcon(a),this.process(s).then(e=>{e.hasErrors?this.handleErrors(e):this.toggleRow(n)})}),i.default(document).on("click",h.delete,e=>{e.preventDefault();const t=i.default(e.currentTarget);t.tooltip("hide");l.confirm(t.data("title"),t.data("message"),s.SeverityEnum.warning,[{text:t.data("button-close-text")||TYPO3.lang["button.cancel"]||"Cancel",active:!0,btnClass:"btn-default",name:"cancel"},{text:t.data("button-ok-text")||TYPO3.lang["button.delete"]||"Delete",btnClass:"btn-warning",name:"delete"}]).on("button.clicked",e=>{"cancel"===e.target.getAttribute("name")?l.dismiss():"delete"===e.target.getAttribute("name")&&(l.dismiss(),this.deleteRecord(t))})})}toggleRow(e){const t=e.find(h.hide),a=t.closest("table[data-table]").data("table"),n=t.data("params");let s,r,l;"hidden"===t.data("state")?(r="visible",s=n.replace("=0","=1"),l="actions-edit-hide"):(r="hidden",s=n.replace("=1","=0"),l="actions-edit-unhide"),t.data("state",r).data("params",s),t.tooltip("hide").one("hidden.bs.tooltip",()=>{const e=t.data("toggleTitle");t.data("toggleTitle",t.attr("data-bs-original-title")).attr("data-bs-original-title",e)});const d=t.find(h.icon);o.getIcon(l,o.sizes.small).then(e=>{d.replaceWith(e)});const c=e.find(".col-icon "+h.icon);"hidden"===r?o.getIcon("miscellaneous-placeholder",o.sizes.small,"overlay-hidden").then(e=>{c.append(i.default(e).find(".icon-overlay"))}):c.find(".icon-overlay").remove(),e.fadeTo("fast",.4,()=>{e.fadeTo("fast",1)}),"pages"===a&&u.refreshPageTree()}deleteRecord(e){const t=e.data("params");let a=e.find(h.icon);this._showSpinnerIcon(a);const n=e.closest("table[data-table]"),s=n.data("table");let i=e.closest("tr[data-uid]");const r=i.data("uid"),l={component:"datahandler",action:"delete",table:s,uid:r};this.process(t,l).then(t=>{if(o.getIcon("actions-edit-delete",o.sizes.small).then(t=>{a=e.find(h.icon),a.replaceWith(t)}),t.hasErrors)this.handleErrors(t);else{const t=e.closest(".panel"),a=t.find(".panel-heading"),o=n.find("[data-l10nparent="+r+"]").closest("tr[data-uid]");if(i=i.add(o),i.fadeTo("slow",.4,()=>{i.slideUp("slow",()=>{i.remove(),0===n.find("tbody tr").length&&t.slideUp("slow")})}),"0"===e.data("l10parent")||""===e.data("l10parent")){const e=Number(a.find(".t3js-table-total-items").html());a.find(".t3js-table-total-items").text(e-1)}"pages"===s&&u.refreshPageTree()}})}handleErrors(e){i.default.each(e.messages,(e,t)=>{d.error(t.title,t.message)})}_showSpinnerIcon(e){o.getIcon("spinner-circle-dark",o.sizes.small).then(t=>{e.replaceWith(t)})}}return new u}));