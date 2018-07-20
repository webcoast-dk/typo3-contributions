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
define(["require","exports","jquery","../AjaxDataHandler","jquery-ui/droppable"],function(e,t,n,o){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=function(){function e(){}return e.initialize=function(){n(e.contentIdentifier).draggable({handle:e.dragHeaderIdentifier,scope:"tt_content",cursor:"move",distance:20,revert:"invalid",zIndex:100,start:function(t,o){e.onDragStart(n(t.target))},stop:function(t,o){e.onDragStop(n(t.target))}}),n(e.dropZoneIdentifier).droppable({accept:this.contentIdentifier,scope:"tt_content",tolerance:"pointer",over:function(t,o){e.onDropHoverOver(n(o.draggable),n(t.target))},out:function(t,o){e.onDropHoverOut(n(o.draggable),n(t.target))},drop:function(t,o){e.onDrop(n(o.draggable),n(t.target),t)}})},e.onDragStart=function(t){e.originalStyles=t.get(0).style.cssText,t.children(e.dragIdentifier).addClass("dragitem-shadow"),t.append('<div class="ui-draggable-copy-message">'+TYPO3.lang["dragdrop.copy.message"]+"</div>"),t.children(e.dropZoneIdentifier).addClass("drag-start"),t.closest(e.columnIdentifier).removeClass("active"),t.find(e.dropZoneIdentifier).hide(),n(e.dropZoneIdentifier).each(function(t,o){var a=n(o);a.parent().find(".t3js-toggle-new-content-element-wizard").length?a.addClass(e.validDropZoneClass):a.closest(e.contentIdentifier).find("> "+e.addContentIdentifier+", > > "+e.addContentIdentifier).show()})},e.onDragStop=function(t){t.children(e.dragIdentifier).removeClass("dragitem-shadow"),t.children(e.dropZoneIdentifier).removeClass("drag-start"),t.closest(e.columnIdentifier).addClass("active"),t.find(e.dropZoneIdentifier).show(),t.find(".ui-draggable-copy-message").remove(),t.get(0).style.cssText=e.originalStyles,n(e.dropZoneIdentifier+"."+e.validDropZoneClass).removeClass(e.validDropZoneClass)},e.onDropHoverOver=function(t,n){n.hasClass(e.validDropZoneClass)&&n.addClass(e.dropPossibleHoverClass)},e.onDropHoverOut=function(t,n){n.removeClass(e.dropPossibleHoverClass)},e.onDrop=function(t,n,o){var a=e.getColumnPositionForElement(n);n.removeClass(e.dropPossibleHoverClass);var r="number"==typeof t,i=!0===r?t:parseInt(t.data("uid"),10);if("number"==typeof i&&i>0){var s={},d=n.closest(e.contentIdentifier).data("uid"),l=0;l=void 0===d?parseInt(o.target.offsetParent.getAttribute("data-page"),10):0-parseInt(d,10);var c=parseInt(n.closest("[data-language-uid]").data("language-uid"),10),p=0;0!==l&&(p=a),s.cmd={tt_content:{}},s.data={tt_content:{}};var g=o&&o.originalEvent.ctrlKey||n.hasClass("t3js-paste-copy");g?(s.cmd.tt_content[i]={copy:{action:"paste",target:l,update:{colPos:p,sys_language_uid:c}}},e.ajaxAction(n,t,s,g,r)):(s.data.tt_content[i]={colPos:p,sys_language_uid:c},r?s={CB:{paste:"tt_content|"+l,update:{colPos:p,sys_language_uid:c}}}:s.cmd.tt_content[i]={move:l},e.ajaxAction(n,t,s,g,r))}},e.ajaxAction=function(t,n,a,r,i){o.process(a).done(function(o){o.hasErrors||(i||(t.parent().hasClass(e.contentIdentifier.substring(1))?n.detach().css({top:0,left:0}).insertAfter(t.closest(e.contentIdentifier)):n.detach().css({top:0,left:0}).insertAfter(t.closest(e.dropZoneIdentifier))),self.location.reload(!0))})},e.getColumnPositionForElement=function(e){var t=e.closest("[data-colpos]");return!(!t.length||"undefined"===t.data("colpos"))&&t.data("colpos")},e.contentIdentifier=".t3js-page-ce",e.dragIdentifier=".t3-page-ce-dragitem",e.dragHeaderIdentifier=".t3js-page-ce-draghandle",e.dropZoneIdentifier=".t3js-page-ce-dropzone-available",e.columnIdentifier=".t3js-page-column",e.validDropZoneClass="active",e.dropPossibleHoverClass="t3-page-ce-dropzone-possible",e.addContentIdentifier=".t3js-page-new-ce",e.originalStyles="",e}();t.default=a,n(a.initialize)});