"use client"
import { Button } from './ui/button'
import { useAppDispatch, useAppSelector } from '@/lib/redux/hook'
import { decrement, increment, reset } from '@/lib/features/counter/counterSlice';

export default function CounterComponent() {
    const counter = useAppSelector((state) => state.counter.value); 
    const dispatch = useAppDispatch();
    return (
        <div className='grid place-content-center'>
            <h2 className='text-center text-4xl font-bold'>
                This is Counter
            </h2>

            <h3 className='text-center text-4xl font-bold'>
                Vale: {counter}
            </h3>

            <Button className="bg-amber-200 text-2xl text-white m-5 p-6"
                variant="outline" onClick={() => dispatch(increment())}>
                    Increase
            </Button>

            <Button className="bg-amber-200 text-2xl text-white m-5 p-6"
                variant="outline" onClick={() => dispatch(decrement())}>
                    Decrease
            </Button>
            
            <Button className="bg-amber-200 text-2xl text-white m-5 p-6"
                variant="outline" onClick={() => dispatch(reset())}>
                    Reset
            </Button>
        </div>
    )
}
