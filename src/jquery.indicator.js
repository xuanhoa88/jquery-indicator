(function(factory) {
    if (typeof define === 'function' && define.amd) {
        define(['jquery'], factory);
    } else if (typeof module === 'object' && module.exports) {
        module.exports = factory(require('jquery'));
    } else {
        factory(jQuery);
    }
}(function($, undefined) {
    var counter = {};

    // The actual plugin constructor
    $.indicator = function(element, options) {
        this.$el = $(element);
        this.$opts = options;
        this.init();
    }

    $.extend($.indicator, {
        defaults: {
            appendTo: 'body',
            html: null
        },

        setDefaults: function(options) {
            $.extend($.indicator.defaults, options);
        },

        prototype: {

            init: function() {
                // Determine whether indicator already exists yet.
                if (this.$el.length === 0) {
                    this.$el = $(this.$opts.html);

                    if (this.$el.length === 0) {
                        throw new Error('Unknown element indicator');
                    }

                    this.$el.appendTo(this.$opts.appendTo);
                }

                // Sets counter
                counter[this.$el[0]] = 0;

                // Always hide indicator for first time
                this.hide();
            },

            show: function() {
                counter[this.$el[0]]++;
                this.$el.show();
            },

            hide: function() {
                if (counter[this.$el[0]] > 0) {
                    counter[this.$el[0]]--;
                }

                // The indicator just hidden when count decrement to 0
                if (counter[this.$el[0]] === 0) {
                    this.$el.hide();
                }
            }
        }
    });

    // PLUGIN DEFINITION
    // =======================
    var allowedMethods = [
        'show', 'hide',
        'destroy'
    ];

    // Constructor
    $.fn.indicator = function(option) {
        var $this;
        if (this[0] === undefined) {
            $this = $(document);
        } else {
            $this = $(this);
        }

        var args = Array.prototype.slice.call(arguments, 1);
        var pluginName = 'jquery.indicator';
        var data = $this.data(pluginName);
        var options = $.extend({}, $.indicator.defaults, $this.data(), typeof option === 'object' && option);

        if (!data) {
            $this.data(pluginName, (data = new $.indicator(this, options)));
        }

        if (typeof option === 'string') {
            if ($.inArray(option, allowedMethods) < 0) {
                throw new Error('Unknown method: ' + option);
            }

            if (option === 'destroy') {
                $this.removeData(pluginName);
            } else {
                data[option].apply(data, args);
            }
        }

        return data;
    }

    $.fn.indicator.Constructor = $.indicator;
}));
