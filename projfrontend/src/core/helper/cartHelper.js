//item --having all information as a product is passed
//once this item is added to localstorage ,then redirect to cart page so it is a callback.--so next
export const addItemToCart=(item,next)=>{
    let cart=[]
    if(typeof window!==undefined){
        if(localStorage.getItem("cart")){
            cart=JSON.parse(localStorage.getItem("cart"))
        }
        cart.push({
            ...item,
            count:1
        })
        localStorage.setItem("cart",JSON.stringify(cart));
        next();
    }
}

export const loadCart =()=>{
    let cart=[]
    if(typeof window!==undefined){
        if(localStorage.getItem("cart")){
            return JSON.parse(localStorage.getItem("cart"))
        }
    }
}

