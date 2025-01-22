import React from 'react';
import UserStore from '../store/UserStore';

const SubmitButton = (props) => {
    const { isFormSubmit } = UserStore();

    if (!isFormSubmit) {
        return (
            <button
                onClick={props.onClick}
                type="submit"
                className={`${props.className} w-full px-4 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1`}
            >
                {props.text}
            </button>
        );
    } else {
        return (
            <button
                disabled={true}
                className="w-full px-4 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-lg flex items-center justify-center cursor-not-allowed"
            >
                <div
                    className="w-4 h-4 border-2 border-t-transparent border-white rounded-full animate-spin mr-2"
                    role="status"
                ></div>
                Loading...
            </button>
        );
    }
};

export default SubmitButton;
