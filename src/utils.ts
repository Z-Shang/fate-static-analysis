module Utils {
    interface Mapfn {
        (fn : any) : any;
    }

    export interface Mapable {
        map_head : Mapfn;
        map_tail : Mapfn;
    }

    export class Cons {
        head : any;
        tail : any;

        constructor(h : any, t : any){
            this.head = h;
            this.tail = t;
        }
    }

    export class List<T> implements Mapable{
        head : T;
        tail : List<T> | void;

        constructor(value : T, rest : List<T> | void){
            this.head = value;
            this.tail = rest;
        }

        set_head(value : T) : List<T>{
            return new List<T>(value, this.tail);
        }

        set_tail(value : List<T> | void) : List<T>{
            return new List<T>(this.head, value);
        }

        add_front(value : T) : List<T>{
            return new List<T>(value, this);
        }

        add_back(value : T) : List<T>{
            let tmp = this.reverse();
            return tmp.add_front(value).reverse();
        }

        contains(value : T) : boolean{
            if(this.head == value){
                return true;
            }
            if(this.tail ==  null){
                return this.head == value;
            }else{
                return (<List<T>>this.tail).contains(value);
            }
        }

        reverse() : List<T>{
            let tmp = new List<T>(this.head, null);
            let iter = this.tail;
            while(iter != null){
                tmp = tmp.add_front((<List<T>>iter).head);
                iter = (<List<T>>iter).tail;
            }
            return tmp;
        }

        map_head(fn : Mapfn) : List<any> {
            if(this.tail == null){
                return new List<any>(fn.call(this, this.head), null);
            }else{
                return new List<any>(fn.call(this, this.head), (<List<T>>this.tail).map_head(fn));
            }
        }

        map_tail(fn : Mapfn) : List<any> | void {
            if(this.tail == null){
                return new List<any>(fn.call(this, this), null);
            }else{
                return new List<any>(fn.call(this, this), (<List<T>>this.tail).map_tail(fn));
            }
        }

        to_string() : string {
            if(this.tail == null){
                return "[" + this.head + "]";
            }else{
                return "[" + this.head + ", " + (<List<T>>this.tail).to_string() + "]";
            }
        }
    }

    export class Record<T> {
        name : string;
        value : T;

        constructor(n : string, v : T){
            this.name = n;
            this.value = v;
        }

        to_string() : string {
            return "(" + this.name + " : " + this.value + ")";
        }
    }

    export class Map<T> {
        records : List<Record<T>> | void;

        constructor(first : Record<T>, rest : List<Record<T>> | void){
            this.records = new List<Record<T>>(first, rest);
        }

        contains(name : string) : boolean {
            if(this.records == null){
                return false;
            }else{
                return (<List<Record<T>>>this.records).map_head(function(r) {
                    r.name == name;
                }).contains(true);
            }
        }

        id(name : string) : T | void{
            return null;
        }

        add_raw(name : string, value : T) : Map<T>{
            return this.add(new Record<T>(name, value));
        }

        add(r : Record<T>) : Map<T>{
            let tmp = this;
            if(this.contains(r.name)){
                return this;
            }else{

            }



            return tmp;
        }
    }
}
