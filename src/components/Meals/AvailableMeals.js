import React, { useState, useEffect } from 'react';
import Card from '../UI/Card';
import MealItem from './MealItem/MealItem';
import classes from './AvailableMeals.module.css';
import axios from 'axios';


const AvailableMeals = () => {
  const [mealItem, getMealItems] = useState([]);
  const [isDataLoad, setIsDataLoad] = useState(false);
 const [errorMessage , setErrorMessage] = useState(null);

  useEffect(() => {
    axios.get('https://react-http-request-bfe69-default-rtdb.firebaseio.com/meals.json')
      .then((res) => {
        setIsDataLoad(true);
        const mealsData = [{ ...res.data.m1, id: 'm1' }, { ...res.data.m2, id: 'm2' }, { ...res.data.m3, id: 'm3' }, { ...res.data.m4, id: 'm4' }];
        getMealItems(mealsData);

      }).catch((error) => {
        setIsDataLoad(true);
        console.log(error)
    setErrorMessage(error.message);
      })
  }, []);

  const showMessage = <p>please wait... </p>

  const mealsList = mealItem.map((meal) => (
    <MealItem
      key={meal.id}
      id={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));

  return (

    <section className={classes.meals}>
      <Card>
        {!isDataLoad && showMessage}
        {isDataLoad && mealsList.length>1 ? <ul>{mealsList}</ul> : <p>{errorMessage}</p>} 
      </Card>
    </section>
  );
};

export default AvailableMeals;
