import React from 'react';

const FAQ = () => {
    return (
        <div className="w-full max-w-2xl mx-auto py-10">
            <h2 className="text-3xl font-bold text-center mb-6">FAQ</h2>

            <div className="collapse collapse-arrow bg-base-200 mb-3">
                <input type="checkbox" className="peer" />
                <div className="collapse-title text-lg font-medium peer-checked:bg-green-100">What is your delivery time?</div>
                <div className="collapse-content peer-checked:bg-green-50">
                    <p className='bg-gray-300 p-2 rounded-sm'>
                        We deliver within 24–72 hours depending on location.
                    </p>
                </div>
            </div>

            <div className="collapse collapse-arrow bg-base-200 mb-3">
                <input type="checkbox" className="peer" />
                <div className="collapse-title text-lg font-medium peer-checked:bg-green-100">Do you offer cash on delivery?</div>
                <div className="collapse-content peer-checked:bg-green-50">
                    <p className="bg-gray-300 p-2 rounded-sm">Yes! We offer COD in all districts.</p>
                </div>
            </div>
        </div>
    );
};

export default FAQ;