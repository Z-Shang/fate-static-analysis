/// <reference path="../src/text-object.ts" />
/// <reference path="../src/utils.ts" />

module Render {
    export class StyleSheet {
        slot_map : Utils.Map<string> | void;

        constructor() {
            this.slot_map = null;
        }

        add_slot(name : string, s : string) : void{
            if(this.slot_map == null){
                this.slot_map = new Utils.Map(new Utils.Record(name, s), null);
            }else{
                this.slot_map = (<Utils.Map<string>>this.slot_map).add_raw(name, s);
            }
        }

        gen_style() : string{
            var tmp = "";

            return tmp;
        }

    }

    export class Renderer {
        style_map : Utils.Map<StyleSheet> | void;

        constructor(){
            this.style_map = null;
        }

        add_style(name : string, s: StyleSheet) : void{
            if(this.style_map == null){
                this.style_map = new Utils.Map(new Utils.Record(name, s), null);
            }else{
                this.style_map = (<Utils.Map<StyleSheet>>this.style_map).add_raw(name, s);
            }
        }

        get_style(name : string) : StyleSheet | void {
            if(this.style_map == null){
                return null;
            }else{
                return (<Utils.Map<StyleSheet>>this.style_map).get_id(name);
            }
        }

        render() : string {
            var tmp = "";

            return tmp;
        }

    }
}
