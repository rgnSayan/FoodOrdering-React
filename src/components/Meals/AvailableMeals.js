import React, { useEffect, useState } from 'react';
import Card from '../UI/Card';
import MealItem from './MealItem/MealItem';
import classes from './AvailableMeals.module.css';


const AvailableMeals = () => {

    const [meals, setMeals] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState()

    useEffect(() => {
        const fetchMeals = async () => {

            const response = await fetch('https://react-meals-a59cf-default-rtdb.firebaseio.com/meals.json')

            if (!response.ok) {
                throw new Error('Something Went Wrong !')
            }

            const responseData = await response.json()
            const loadedMeals = []

            for (const key in responseData) {
                loadedMeals.push({
                    id: key,
                    name: responseData[key].name,
                    desc: responseData[key].desc,
                    price: responseData[key].price
                })
            }
            setMeals(loadedMeals)
            setIsLoading(false)
        }

        fetchMeals().catch(e => {
            setIsLoading(false)
            setError(e.message)
        })
    }, [])

    if (isLoading) {
        return (
            <section className={classes.MealsLoading}>
                <p>Loading...</p>
            </section>
        )
    }

    if (error) {
        return (
            <section className={classes.Error}>
                <p>{error}</p>
            </section>
        )
    }


    const mealsList = meals.map((meal) => (
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
                <ul>{mealsList}</ul>
            </Card>
        </section>
    );
};

export default AvailableMeals;