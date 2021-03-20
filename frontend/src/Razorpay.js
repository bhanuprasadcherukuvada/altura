import React,{useState} from 'react';


function loadScript(src) {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  });
}

const __DEV__ = document.domain === "localhost";

export default function Razorpay(props) {
  console.log(props);

      const [name, setName] = useState("nmitevents");

  async function displayRazorpay() {
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }

    const data = await fetch("http://localhost:1337/razorpay", {
      method: "POST",
    }).then((t) => t.json());

    console.log(data);

    const options = {
      key: __DEV__ ? "rzp_test_99gXTJj4zIVpz4" : "PRODUCTION_KEY",
      currency: data.currency,
      amount: data.amount.toString(),
      order_id: data.id,
      name: "Event Payment",
      description: "",
      image: "http://localhost:1337/logo.svg",
      handler: function (response) {
        alert(response.razorpay_payment_id);
        alert(response.razorpay_order_id);
        alert(response.razorpay_signature);
      },
      prefill: {
        name:props.location.state.name,
        email: props.location.state.email,
        phone_number: props.phone,
      },
    };
    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  }
    return (
        <div>
          <p>{props.location.state.name}</p>
          <p>{props.location.state.email}</p>
          <p>{props.location.state.phone}</p>
             <a
          className="App-link"
          onClick={displayRazorpay}
          target="_blank"
          rel="noopener noreferrer"
        >
          Click here to proceed for the payment
        </a>
        </div>
    )
}
