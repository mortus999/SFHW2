import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addExercise, deleteExercise } from '../slices/exerciseSlice';

const Exercise = () => {
    const exercises = useSelector(state => state.exercises.exercises);
    const dispatch = useDispatch();

    const [type, setType] = useState('');
    const [duration, setDuration] = useState('');
    const [calories, setCalories] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const newExercise = {
            id: Date.now(),
            type,
            duration: parseInt(duration),
            calories: parseInt(calories),
        };
        dispatch(addExercise(newExercise));
        setType('');
        setDuration('');
        setCalories('');
    };

    return (
        <div>
            <h2>Add Exercise</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Type</label>
                    <input type="text" className="form-control" value={type} onChange={(e) => setType(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label>Duration (minutes)</label>
                    <input type="number" className="form-control" value={duration} onChange={(e) => setDuration(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label>Calories Burned</label>
                    <input type="number" className="form-control" value={calories} onChange={(e) => setCalories(e.target.value)} required />
                </div>
                <button type="submit" className="btn btn-primary mt-2">Add Exercise</button>
            </form>

            <h2 className="mt-4">Exercises Log</h2>
            <ul className="list-group">
                {exercises.map(exercise => (
                    <li key={exercise.id} className="list-group">
                        {`${exercise.type} - ${exercise.duration} minutes - ${exercise.calories} calories`}
                        <button className="btn btn-danger" onClick={() => dispatch(deleteExercise(exercise.id))}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Exercise;
