import { useRef, useState } from 'react';
import classes from './Checkout.module.css';


const Checkout = (props) => {
   const [formInputValidity , setFormInputValidity] = useState( {
    name:true,
    street :true,
    postalcode : true,
    city :true
   })
   const enterName = useRef();
   const enterStreetName = useRef();
   const enterPostalCode = useRef();

   const enterCity = useRef();
  const confirmHandler = (event) => {
    debugger
    event.preventDefault();
    const enterNames = enterName.current.value;
    const enterStreetNames = enterStreetName.current.value;
    const enterPostalCodes = enterPostalCode.current.value;
    const enterCitys = enterCity.current.value;

   enterNames ==='' ? setFormInputValidity({...formInputValidity ,name :false}) :setFormInputValidity({...formInputValidity ,name :true});
   enterStreetNames ==='' ? setFormInputValidity({...formInputValidity ,street :false}) :setFormInputValidity({...formInputValidity ,street :true}) ;
   enterPostalCodes.trim().length !==5 ? setFormInputValidity({...formInputValidity ,postalcode :false}) :setFormInputValidity({...formInputValidity ,postalcode :true}) 
   enterCitys ==='' ? setFormInputValidity({...formInputValidity ,city :false}) :setFormInputValidity({...formInputValidity ,city :true}) 
 
   if(enterName==='' || enterStreetNames ==='' || enterPostalCodes==='' || enterCitys===''){
    return;
   }
   else {
    props.onConfirm(
        {
            name :enterName.current.value , 
            city :enterCity.current.value ,
            street:enterCity.current.value,
            postalcode :enterPostalCode.current.value
    })
   }
  

  };
  const { name ,street ,city ,postalcode} = formInputValidity

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={classes.control}>
        <label htmlFor='name'>Your Name</label>
        <input type='text' id='name' ref ={enterName}/>
        {!name && <p>Please Input valid name</p> }
      </div>
      <div className={classes.control}>
        <label htmlFor='street'>Street</label>
        <input type='text' id='street' ref={enterStreetName}/>
        {!street && <p>Please Input valid street name</p> }
      </div>
      <div className={classes.control}>
        <label htmlFor='postal'>Postal Code</label>
        <input type='text' id='postal' ref ={enterPostalCode} />
        {!postalcode && <p>Please Input valid postalcode number</p> }
      </div>
      <div className={classes.control}>
        <label htmlFor='city'>City</label>
        <input type='text' id='city' ref={enterCity}/>
        {!city && <p>Please Input valid city name</p> }
      </div>
      <div className={classes.actions}>
        <button type='button' onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;