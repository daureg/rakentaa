//this application only has one module: resource
var resource = {};

//the Resource class has some properties
resource.Resource = function(data) {
    // this type of property is not supposed to change at all
    this.icon = data.icon;
    this.type = data.type;
    // m.prop gives basic getter and setter
    this.growth = m.prop(data.growth);
    // for more involved case, it is also possible to define them explicitly
    var amount;
    //public getter-setter
    this.amount = function(value) {
        if (arguments.length > 0) {
            amount = Math.max(0, value);
        }
        return parseInt(amount);
    };
    //make it serializable
    this.amount.toJSON = function() {return amount;};
    //set the value
    this.amount(data.amount);
};

// from constants module
var resourcesMap = {
    "gold": {
        index: 0,
        icon: "../img/coins.png"
    },
    "gems": {
        index: 1,
        icon: "../img/diamonds.png"
    },
};
GROWTH = 1;

// The list of all resources
resource.Resources = Array;

resource.controller = function(target) {
    var self = this;
    this.list = new resource.Resources();
    var amount = 0;
    this.amount = function(value) {
        if (arguments.length > 0) {
            amount = parseInt(value);
        }
        return amount;
    };
    this.amount.toJSON = function() {return amount;};
    this.type = m.prop("");
    this.draw = function() {m.render(target, resource.view(this), true);};
    // create initial resources
    _.map(resourcesMap, function initResource(res, name) {
        self.list.push(new resource.Resource({
            icon: res.icon,
            type: name,
            amount: 15000,
            growth: GROWTH
        }));
    });
    this.reset = function() {
        for (var i = this.list.length - 1; i >= 0; i--) {
            this.list[i].amount(0);
        }
        this.amount(0);
        this.type("");
        this.draw();
    };
    this.add = function addRessource() {
        for (var i = this.list.length - 1; i >= 0; i--) {
            var res = this.list[i];
            if (res.type === this.type()) {
                res.amount(res.amount() + this.amount());
                this.amount(0);
                // this.type("");
                break;
            }
        }
        this.draw();
    };
    this.draw();
};

//here's the view
resource.view = function(ctrl) {
    var resNames = _.keys(resourcesMap);
    if (ctrl.type() === "") {
        ctrl.type(resNames[0]);
    }
    return m("", [
             m("ul", [
                ctrl.list.map(function(res, index) {
                return m("li", [
                            m("img", {src: res.icon, title: res.type}),
                            m("span.amount", res.amount()),
                            m("span.growth", " (+"+res.growth()+")"),
                        ]);
                })
            ]),
            m("select", {onchange: m.withAttr("value", ctrl.type),}, [
                resNames.map(function(name, index) {
                return m("option", {value: name, selected: name === ctrl.type()}, name);
            })
            ]),
            m("input[type=number]", {
                onchange: m.withAttr("value", ctrl.amount),
                value: ctrl.amount(),
            }),
            m("button", {
                onclick: ctrl.add.bind(ctrl, ctrl.type, ctrl.amount)
            }, "Change"),
        ]);
};

// initialize the application and update view automatically (but then the
// controller is not accessible outside of the view)
// m.module(document.getElementById('resources'), resource);

// Or do it by hand like a real man
var target = document.getElementById('resources');
// var RESOURCE = new resource.controller(target);