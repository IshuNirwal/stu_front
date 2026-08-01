import React, { useState, useEffect, useRef } from 'react';
import counter_1 from '../images/counter_icon_1.svg';
import counter_2 from '../images/counter_icon_2.svg';
import counter_3 from '../images/counter_icon_3.svg';
import counter_4 from '../images/counter_icon_4.svg';
import '../css/Common.css';

const Number_Statistics = () => {
    // State for storing the animated numbers
    const [loanDisbursed, setLoanDisbursed] = useState(0);
    const [happyUsers, setHappyUsers] = useState(0);
    const [skilledExperts, setSkilledExperts] = useState(0);
    const [honorableAwards, setHonorableAwards] = useState(0);

    // Refs to attach IntersectionObserver
    const loanDisbursedRef = useRef(null);
    const happyUsersRef = useRef(null);
    const skilledExpertsRef = useRef(null);
    const honorableAwardsRef = useRef(null);

    // Animation function for increasing the numbers
    const animateNumber = (targetValue, setter, duration = 2000) => {
        const startValue = 0;
        const startTime = Date.now();

        const updateNumber = () => {
            const elapsedTime = Date.now() - startTime;
            const progress = Math.min(elapsedTime / duration, 1); // Calculate progress

            setter(Math.floor(startValue + (targetValue - startValue) * progress));

            if (progress < 1) {
                requestAnimationFrame(updateNumber);
            }
        };

        requestAnimationFrame(updateNumber);
    };

    // Function to start the animation when element is visible
    const handleIntersection = (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Start animation when element is in the viewport
                if (entry.target === loanDisbursedRef.current) {
                    animateNumber(500, setLoanDisbursed);
                } else if (entry.target === happyUsersRef.current) {
                    animateNumber(200, setHappyUsers);
                } else if (entry.target === skilledExpertsRef.current) {
                    animateNumber(50, setSkilledExperts);
                } else if (entry.target === honorableAwardsRef.current) {
                    animateNumber(2, setHonorableAwards);
                }
            }
        });
    };

    useEffect(() => {
        const observer = new IntersectionObserver(handleIntersection, {
            threshold: 0.5, // Trigger when 50% of the element is visible
        });

        // Observe the elements when they are rendered
        if (loanDisbursedRef.current) observer.observe(loanDisbursedRef.current);
        if (happyUsersRef.current) observer.observe(happyUsersRef.current);
        if (skilledExpertsRef.current) observer.observe(skilledExpertsRef.current);
        if (honorableAwardsRef.current) observer.observe(honorableAwardsRef.current);

        // Clean up observer on unmount
        return () => {
            if (loanDisbursedRef.current) observer.unobserve(loanDisbursedRef.current);
            if (happyUsersRef.current) observer.unobserve(happyUsersRef.current);
            if (skilledExpertsRef.current) observer.unobserve(skilledExpertsRef.current);
            if (honorableAwardsRef.current) observer.unobserve(honorableAwardsRef.current);
        };
    }, []);

    return (
        <div className="number_statistics">
            <div className="number_row">
                <div className="number_statistics_item flex flex-center" ref={loanDisbursedRef}>
                    {/* <div className="number_statistics_icon flex flex-center justify-center">
                        <img src={counter_1} alt="" />
                    </div> */}
                    <div className="number_statistics_content ml10">
                        <h3>{loanDisbursed}+</h3>
                        <p>Loan Disbursed</p>
                    </div>
                </div>
                <div className="number_statistics_item flex flex-center" ref={happyUsersRef}>
                    {/* <div className="number_statistics_icon flex flex-center justify-center">
                        <img src={counter_2} alt="" />
                    </div> */}
                    <div className="number_statistics_content ml10">
                        <h3>{happyUsers}+</h3>
                        <p>Happy Users</p>
                    </div>
                </div>
                <div className="number_statistics_item flex flex-center" ref={skilledExpertsRef}>
                    {/* <div className="number_statistics_icon flex flex-center justify-center">
                        <img src={counter_3} alt="" />
                    </div> */}
                    <div className="number_statistics_content ml10">
                        <h3>{skilledExperts}</h3>
                        <p>Skilled Experts</p>
                    </div>
                </div>
                <div className="number_statistics_item flex flex-center" ref={honorableAwardsRef}>
                    {/* <div className="number_statistics_icon flex flex-center justify-center">
                        <img src={counter_4} alt="" />
                    </div> */}
                    <div className="number_statistics_content ml10">
                        <h3>{honorableAwards}</h3>
                        <p>Honorable Awards</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Number_Statistics;
