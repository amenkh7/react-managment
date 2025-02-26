import useFetchAll from "../services/useFetchAll"
import Spinner from "../Spinner"

export default function Cart({cart}){
    const urls = cart.map((i) =>`products/${i.id}`)
    const {data: products,loading,error}=useFetchAll(urls)
    function renderItem(itemsInCart){
        const {id,sku,quantity}=itemsInCart
        const {price,name,image,skus}=products.find(
            (p)=>p.id === parseInt(id)
        )
        const {size}= skus.find( (s)=> s.sku =sku ) 
        return(
            <li key={sku} className="cart-item">
                <img src={`/images/${image}`} alt={name}/>
                <div>
                    <h3>{name}</h3>
                    <p>${price}</p>
                    <p>size: {size}</p>
                    <p>quantity:{quantity}</p>
                </div>
            </li>
        )}
    if (loading) return <Spinner/>
    if (error) throw error
    return (
        <section id="cart">
            <ul>{cart.map(renderItem)}</ul>
        </section>
    )
}