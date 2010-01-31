 /*
 * AutoSuggest
 * Copyright 2009-2010 Drew Wilson
 * www.drewwilson.com
 * code.drewwilson.com/entry/autosuggest-jquery-plugin
 *
 * Version 1.2   -   Updated: Jan. 05, 2010
 *
 * This Plug-In will auto-complete or auto-suggest completed search queries
 * for you as you type. You can add multiple selections and remove them on
 * the fly. It supports keybord navigation (UP + DOWN + RETURN), as well
 * as multiple AutoSuggest fields on the same page.
 *
 * Inspied by the Autocomplete plugin by: Jšrn Zaefferer
 * and the Facelist plugin by: Ian Tearle (iantearle.com)
 *
 * This AutoSuggest jQuery plug-in is dual licensed under the MIT and GPL licenses:
 *   http://www.opensource.org/licenses/mit-license.php
 *   http://www.gnu.org/licenses/gpl.html
 */
(function(a){a.fn.autoSuggest=function(n,F){var b=a.extend({startText:"Enter Name Here",selectedItem:"value",searchObj:"value",queryParam:"q",retrieveLimit:false,extraParams:"",matchCase:false,minChars:1,keyDelay:400,start:function(){},selectionClick:function(){},formatList:false,retrieveComplete:function(f){return f},resultsComplete:function(){},selectedItems:false,onAdd:function(){},onRemove:function(){}},F),w="object",u=0;if(typeof n=="string"){w="string";var G=n}else{var H=n;for(k in n)n.hasOwnProperty(k)&&
u++}if(w=="object"&&u>0||w=="string")return this.each(function(f){function A(){if(lastKeyPressCode==46||lastKeyPressCode>8&&lastKeyPressCode<32)return g.hide();var c=j.val().replace(/[\\]+|[\/]+/g,"");if(c!=x){x=c;if(c.length>=b.minChars){l.addClass("loading");if(w=="string"){var d="";if(b.retrieveLimit)d="&limit="+encodeURIComponent(b.retrieveLimit);a.getJSON(G+"?"+b.queryParam+"="+encodeURIComponent(c)+d+b.extraParams,function(e){u=0;e=b.retrieveComplete.call(this,e);for(k in e)e.hasOwnProperty(k)&&
u++;B(e,c)})}else B(H,c)}else{l.removeClass("loading");g.hide()}}}function B(c,d){b.matchCase||(d=d.toLowerCase());var e=0;g.html(r.html("")).hide();for(var m=0;m<u;m++){var h=m,o=false;if(b.searchObj=="value")var p=c[h].value;else{p="";for(var C=b.searchObj.split(","),z=0;z<C.length;z++){var I=a.trim(C[z]);p=p+c[h][I]+" "}}if(p){b.matchCase||(p=p.toLowerCase());if(p.search(d)!=-1&&i.val().search(c[h].value+",")==-1)o=true}if(o){o=a('<li class="as-result-item" id="as-result-item-'+h+'"></li>').click(function(){var y=
a(this).data("data");if(D(y.attributes[b.selectedItem],y.attributes.value,y.num)){x="";b.onAdd(y.attributes.value,b)}}).mousedown(function(){q=false}).data("data",{attributes:c[h],num:h});h=a.extend({},c[h]);h[b.selectedItem]=h[b.selectedItem].replace(b.matchCase?new RegExp("(?![^&;]+;)(?!<[^<>]*)("+d+")(?![^<>]*>)(?![^&;]+;)","g"):new RegExp("(?![^&;]+;)(?!<[^<>]*)("+d+")(?![^<>]*>)(?![^&;]+;)","gi"),"<em>$1</em>");o=b.formatList?b.formatList.call(this,h,o):o.html(h[b.selectedItem]);r.append(o);
delete h;e++}}l.removeClass("loading");e<=0&&r.html('<li class="as-message">No Results Found</li>');r.css("width",l.outerWidth());g.show();b.resultsComplete.call(this)}function E(c){if(a(":visible",g).length>0){var d=a("li",g),e=c=="down"?d.eq(0):d.filter(":last"),m=a("li.active:first",g);if(m.length>0)e=c=="down"?m.next():m.prev();d.removeClass("active");e.addClass("active")}}function D(c,d,e){if(a("#as-selection-"+e,l).length<=0){j.val("").focus();i.val(i.val()+d+",");var m=a('<li class="as-selection-item" id="as-selection-'+
e+'"></li>').click(function(){b.selectionClick.call(this,a(this));l.children().removeClass("selected");a(this).addClass("selected")}).mousedown(function(){q=false});e=a('<a class="as-close">&times;</a>').click(function(){i.val(i.val().replace(d+",",""));m.remove();j.focus();b.onRemove(d,b);return false});v.before(m.html(c).prepend(e));g.hide();return true}}f=f+""+Math.floor(Math.random()*100);b.start.call(this);var j=a(this);j.attr("autocomplete","off").addClass("as-input").attr("id","as-input-"+
f).val(b.startText);var q=false;j.wrap('<ul class="as-selections" id="as-selections-'+f+'"></ul>').wrap('<li class="as-original" id="as-original-'+f+'"></li>');var l=a("#as-selections-"+f),v=a("#as-original-"+f),g=a('<div class="as-results" id="as-results-'+f+'"></div>').hide(),r=a('<ul class="as-list"></ul>'),i=a('<input type="hidden" class="as-values" name="as_values_'+f+'" />');j.after(i);l.click(function(){q=true;j.focus()}).mousedown(function(){q=false}).after(g);a("li",r).live("mouseover",function(){a("li",
r).removeClass("active");a(this).addClass("active")});var s=null,x="";j.focus(function(){if(a(this).val()==b.startText&&i.val()=="")a(this).val("");else if(q){a("li.as-selection-item",l).removeClass("blur");a(this).val()!=""&&g.show()}return q=true}).blur(function(){if(a(this).val()==""&&i.val()=="")a(this).val(b.startText);else if(q){a("li.as-selection-item",l).addClass("blur").removeClass("selected");g.hide()}}).keydown(function(c){lastKeyPressCode=c.keyCode;first_focus=false;switch(c.keyCode){case 38:c.preventDefault();
E("up");break;case 40:c.preventDefault();E("down");break;case 8:if(j.val()==""){c=i.val().split(",");c=c[c.length-2];l.children().not(v.prev()).removeClass("selected");if(v.prev().hasClass("selected")){i.val(i.val().replace(c+",",""));v.prev().remove();b.onRemove(value,b)}else v.prev().addClass("selected")}if(j.val().length==1){g.hide();x=""}if(a(":visible",g).length>0){s&&clearTimeout(s);s=setTimeout(function(){A()},b.keyDelay)}break;case 9:case 13:var d=a("li.active:first",g);if(d.length>0){d.click();
g.hide();c.preventDefault()}break;default:s&&clearTimeout(s);s=setTimeout(function(){A()},b.keyDelay);break}});for(f=0;f<b.selectedItems.length;f++){value=b.selectedItems[f];for(var t=0;t<n.length;t++)n[t].value==value&&D(n[t].name,n[t].value,t)}})}})(jQuery);