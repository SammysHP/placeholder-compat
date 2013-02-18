/*
 * placeholder-compat - JavaScript compatibility script for html placeholder attribute
 * Copyright (C) 2013 Sven Karsten Greiner <sven@sammyshp.de>
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
 */

// browser feature detection
jQuery.support.placeholder = false;
if ('placeholder' in document.createElement('input')) {
    jQuery.support.placeholder = true;
}
// Opera Mini results in false positive
if (navigator.userAgent.indexOf('Opera Mini') > -1) {
    jQuery.support.placeholder = false;
}

$(document).ready(function() {
    // use native support if possible
    if (!jQuery.support.placeholder) {
        $('[placeholder]').focus(function() {
            // clear input on focus
            var input = $(this);
            if (input.val() == input.attr('placeholder') && input.hasClass('placeholder')) {
                input.val('');
                input.removeClass('placeholder');
            }
        }).blur(function() {
            // insert content of placeholder attribute on blur
            var input = $(this);
            if (input.val() == '') {
                input.addClass('placeholder');
                input.val(input.attr('placeholder'));
            }
        }).blur();
        
        // clear inputs on submit if they contain placeholder text
        $('[placeholder]').parents('form').submit(function() {
            $(this).find('[placeholder]').each(function() {
                var input = $(this);
                if (input.val() == input.attr('placeholder') && input.hasClass('placeholder')) {
                    input.val('');
                }
            })
        });
    }
});
