/**
 * wrap an integer who cannot be set to negative value
 */
function positiveInteger(initialValue) {
    var value = parseInt(initialValue);
    var prop = function() {
        if (arguments.length > 0) {
            value = Math.max(0, parseInt(arguments[0]));
        }
        return value;
    };
    prop.toJSON = function() {return value;};
    return prop;
}

var COMMON_FIELDS = ['type', 'name', 'icon', 'amount', 'growth', 'showGrowth'];
var Item = {
    controller: function(data) {
        this.amount = positiveInteger(data.amount || 0);
        this.growth = positiveInteger(data.growth || 0);
        this.showGrowth = data.showGrowth || false;
        this.type = data.type;
        this.name = data.name || "MISSING";
        this.icon = data.icon || "../img/missing.png";
        _.forOwn(data, function(value, key) {
            if (!_.contains(COMMON_FIELDS, key)) {
                this[key] = m.prop(value);
            }
        });
        return this;
    },
    view: function(ctrl) {
        var growth = m("span.growth", " (+"+ctrl.growth()+")");
        return m("li", [
            m("img", {src: ctrl.icon, title: ctrl.name}),
            m("span.amount", ctrl.amount()),
            (ctrl.showGrowth ? growth : null),
        ]);
    },
};

var ItemsList = {
	controller: function(config) {
        this.list = [];
        this.addGrowth = function(type, delta) {
            for (var i = this.list.length - 1; i >= 0; i--) {
                var res = this.list[i];
                if (res.type === type) {
                    res.growth(res.growth() + delta);
                    break;
                }
            }
        };
        this.add = function(item) {
            var found = false;
            for (var i = this.list.length - 1; i >= 0; i--) {
                var res = this.list[i];
                if (res.type === item.type) {
                    found = true;
                    res.amount(res.amount() + item.amount());
                    if (config.noZero && res.amount() === 0) {
                        delete this.list[i];
                    }
                    break;
                }
            }
            if (!found) {
                this.list.push(item);
            }
        };
        return this;
    },
    view: function(ctrl) {
        return m("ul", [
            ctrl.list.map(function(item, index) {
                return Item.view(item);
            })
        ]);
    },
};

var ResourcesList = {
    controller: function(config) {
        this.list = new ItemsList.controller({noZero: true, showGrowth: true});
        this.add = function(item) {
            this.list.add(item);
            this.amount(0);
            this.draw();
        };
        this.addGrowth = function(type, delta) {
            this.list.addGrowth(type, delta);
            this.draw();
        };
        this.amount = new positiveInteger(0);
        this.type = m.prop("");
        this.draw = function() {
            m.render(config.target, ResourcesList.view(this), true);
        };
        return this;
    },
    view: function(ctrl) {
        var resNames = _.keys(resourcesMap);
        if (ctrl.type() === "") {
            ctrl.type(resNames[0]);
        }
        return m("", [
                ItemsList.view(ctrl.list),
                m("select", {onchange: m.withAttr("value", ctrl.type)}, [
                    resNames.map(function(name, index) {
                    return m("option", {value: name, selected: name === ctrl.type()}, name);
                })
                ]),
                m("input[type=number]", {
                    onchange: m.withAttr("value", ctrl.amount),
                    value: ctrl.amount(),
                }),
                m("button", {
                    onclick: function() {
                        ctrl.add(new Item.controller({type: ctrl.type(), amount: ctrl.amount()}));
                    }
                }, "Change"),
            ]);
    },
};
var RS = new ResourcesList.controller({target: document.getElementById('resources')});
// var COMMON_FIELDS = ['type', 'name', 'icon', 'amount', 'growth', 'showGrowth'];
_.map(resourcesMap, function initResource(res, name) {
    RS.add(new Item.controller({
        icon: res.icon,
        name: name,
        type: name,
        amount: (Math.random() < 0.9) ? 15000 : 0,
        growth: GROWTH,
        showGrowth: true,
    }));
});
RS.add(new Item.controller({type: "gold", amount: 50}));

var UnitsList = {
    controller: function(config) {
        this.list = new ItemsList.controller({noZero: false});
        this.add = function(item) {
            this.list.add(item);
            this.draw();
        };
        this.draw = function() {
            m.render(config.target, UnitsList.view(this), true);
        };
        return this;
    },
    view: function(ctrl) {
        return ItemsList.view(ctrl.list);
    },
};
// var COMMON_FIELDS = ['type', 'name', 'icon', 'amount', 'growth', 'showGrowth'];
var army = new UnitsList.controller({target: document.getElementById('creatures')});
var unit = UNITS.gg_base;
army.add(new Item.controller({
    type: 'gg_base',
    amount: 10,
    growth: 0,
    name: unit.name,
    icon: unit.icon,
}));
army.add(new Item.controller({
    type: 'gg_base',
    amount: 5}));

var emptyModule = {
    controller: function() {},
    view: function() {},
};