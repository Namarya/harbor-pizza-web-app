import React, { useState } from 'react';
import { axiosIsntance } from '../config';

export default function PayButton({cartItems}) {
    const [buttonText, setButtonText] = useState('Checkout');

    const handleCheckout = ()=>[
        setButtonText(<><i className="fa-solid fa-spinner fa-spin fa-xl"></i></>),

        axiosIsntance.post("/api/stripe/create-checkout-session", {
            cartItems,
        }).then((res) => {
            if(res.data.url){
                window.location.href = res.data.url
            }
        }).catch((e) => console.log(e.message))
    ]
  return (
    <div className="">
        <button className="btn rounded" style={{width:"15rem"}} onClick={() => {handleCheckout()}}>{buttonText}</button>
    </div>
  )
}
