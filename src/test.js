var Utils;
(function (Utils) {
    var Cons = (function () {
        function Cons(h, t) {
            this.head = h;
            this.tail = t;
        }
        return Cons;
    })();
    Utils.Cons = Cons;
    var List = (function () {
        function List(value, rest) {
            this.head = value;
            this.tail = rest;
        }
        List.prototype.set_head = function (value) {
            return new List(value, this.tail);
        };
        List.prototype.set_tail = function (value) {
            return new List(this.head, value);
        };
        List.prototype.add_front = function (value) {
            return new List(value, this);
        };
        List.prototype.add_back = function (value) {
            var tmp = this.reverse();
            return tmp.add_front(value).reverse();
        };
        List.prototype.contains = function (value) {
            if (this.head == value) {
                return true;
            }
            if (this.tail == null) {
                return this.head == value;
            }
            else {
                return this.tail.contains(value);
            }
        };
        List.prototype.reverse = function () {
            var tmp = new List(this.head, null);
            var iter = this.tail;
            while (iter != null) {
                tmp = tmp.add_front(iter.head);
                iter = iter.tail;
            }
            return tmp;
        };
        List.prototype.map_head = function (fn) {
            if (this.tail == null) {
                return new List(fn.call(this, this.head), null);
            }
            else {
                return new List(fn.call(this, this.head), this.tail.map_head(fn));
            }
        };
        List.prototype.map_tail = function (fn) {
            if (this.tail == null) {
                return new List(fn.call(this, this), null);
            }
            else {
                return new List(fn.call(this, this), this.tail.map_tail(fn));
            }
        };
        List.prototype.fold_head = function (fn, base) {
            if (this.tail == null) {
                return fn.call(fn, this.head, base);
            }
            else {
                return fn.call(fn, this.head, this.tail.fold_head(fn, base));
            }
        };
        List.prototype.fold_tail = function (fn, base) {
            if (this.tail == null) {
                return fn.call(fn, this, base);
            }
            else {
                return fn.call(fn, this, this.tail.fold_tail(fn, base));
            }
        };
        List.prototype.filter = function (fn) {
            if (this.tail == null) {
                if (fn.call(this, this.head)) {
                    return new List(this.head, null);
                }
            }
            else {
                if (fn.call(this, this.head)) {
                    return new List(this.head, this.tail.filter(fn));
                }
            }
            return null;
        };
        List.prototype.to_string = function () {
            if (this.tail == null) {
                return "[" + this.head + "]";
            }
            else {
                return "[" + this.head + ", " + this.tail.to_string() + "]";
            }
        };
        List.prototype.length = function () {
            if (this.tail == null) {
                return 1;
            }
            else {
                return 1 + this.tail.length();
            }
        };
        return List;
    })();
    Utils.List = List;
    function list() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i - 0] = arguments[_i];
        }
        if (args == null) {
            return null;
        }
        else {
            var tmp = new List(args[0], null);
            args = args.slice(1);
            while (args[0] != null) {
                tmp = tmp.add_back(args[0]);
                args = args.slice(1);
            }
            return tmp;
        }
    }
    Utils.list = list;
    var Record = (function () {
        function Record(n, v) {
            this.name = n;
            this.value = v;
        }
        Record.prototype.to_string = function () {
            return "(" + this.name + " : " + this.value + ")";
        };
        return Record;
    })();
    Utils.Record = Record;
    var Map = (function () {
        function Map(first, rest) {
            this.records = new List(first, rest);
        }
        Map.prototype.contains = function (name) {
            if (this.records == null) {
                return false;
            }
            else {
                return this.records.map_head(function (r) {
                    return r.name == name;
                }).contains(true);
            }
        };
        Map.prototype.first = function () {
            return this.records.head;
        };
        Map.prototype.rest = function () {
            if (this.records.tail == null) {
                return null;
            }
            else {
                return new Map(this.records.tail.head, this.records.tail.tail);
            }
        };
        Map.prototype.get_id = function (name) {
            if (this.records == null) {
                return null;
            }
            else {
                return this.records.map_head(function (r) {
                    if (r.name == name) {
                        return r.value;
                    }
                }).head;
            }
        };
        Map.prototype.add_raw = function (name, value) {
            return this.add(new Record(name, value));
        };
        Map.prototype.add = function (r) {
            var tmp = this;
            if (this.contains(r.name)) {
                return this;
            }
            else {
                return new Map(r, this.records);
            }
        };
        Map.prototype.to_string = function () {
            if (this.rest() == null) {
                return "" + this.records.head.to_string();
            }
            else {
                return "" + this.records.head.to_string() + "\n" + this.rest().to_string();
            }
        };
        return Map;
    })();
    Utils.Map = Map;
})(Utils || (Utils = {}));
/// <reference path="utils.ts" />
var testList = new Utils.List(1, null);
console.log(testList.to_string());
testList = testList.add_front(2);
console.log(testList.to_string());
testList = testList.reverse();
testList = testList.add_back(3);
console.log(testList.to_string());
console.log(testList.map_head(function (n) { return n + 1; }).to_string());
console.log(testList.map_tail(function (n) { return n.length(); }).to_string());
console.log(testList.fold_head(function (a, b) { return a + b; }, 1));
console.log(testList.fold_tail(function (a, b) { console.log(a.to_string()); return a.length() + b; }, 0));
var testMap = new Utils.Map(new Utils.Record("test", 1), null);
console.log(testMap.contains("test"));
console.log(testMap.get_id("test"));
testMap = testMap.add_raw("ttt", 2);
testMap = testMap.add(new Utils.Record("asd", 3));
console.log(testMap.to_string());
var testLst = Utils.list(1, 2, 3, 4, 5, 6, 7);
console.log(testLst.to_string());
