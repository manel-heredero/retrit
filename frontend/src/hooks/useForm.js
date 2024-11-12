import { useState } from 'react';
import { validateStep } from '../utils/validation';
import { INITIAL_VENUE_DATA, FORM_STEPS } from '../constants/venueFormConstants';
import { submitVenueData } from '../services/venueService';

export const useForm = (initialData = INITIAL_VENUE_DATA) => {
    const [data, setData] = useState(initialData);
    const [errors, setErrors] = useState({});
    const [step, setStep] = useState(1);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleInputChange = (e) => {
        const { id, value, type, checked } = e.target;
        setData(prev => ({
            ...prev,
            [id]: type === 'checkbox' ? checked : value
        }));
    };

    const handleNext = () => {
        console.log('handleNext called, current step:', step);
        setStep(prevStep => {
            const newStep = prevStep + 1;
            console.log('Moving to step:', newStep);
            return newStep;
        });
    };

    const handleBack = (targetStep) => {
        setStep(targetStep);
        setErrors({});
    };

    const handleSubmit = async () => {
        try {
            setIsSubmitting(true);
            const stepErrors = validateStep(step, data);
            
            if (Object.keys(stepErrors).length > 0) {
                setErrors(stepErrors);
                return;
            }

            const result = await submitVenueData(data);
            setIsSubmitted(true);
            return result;
        } catch (error) {
            setErrors({ submit: error.message });
            throw error;
        } finally {
            setIsSubmitting(false);
        }
    };

    return {
        data,
        errors,
        step,
        isSubmitting,
        isSubmitted,
        handleInputChange,
        handleNext,
        handleBack,
        handleSubmit,
        setData,
    };
};
