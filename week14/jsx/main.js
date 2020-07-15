import "./foo"
function createElement(Cls, attributes, ...children){
    let o = new Cls;
    console.log(Cls, attributes, ...children)
    for(let name in attributes){
        o[name] = attributes[name]
    }
    console.log(children)
    return o

}

class Div {

}
class Parent{
    set class(v){
        console.log("parent:class", v)
    }
}
class Child{

}
let componet = <Parent id="a" class="b">
    <Child />
    <Child />
    <Child />
    </Parent>
console.log(componet)

// componet.setAttribute("id", "a")