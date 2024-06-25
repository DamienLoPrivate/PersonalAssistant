import React, { forwardRef, useEffect, useRef } from 'react';

/** ClickHoldButton
 * A button that can run separate functions based on click and hold
 * 
 * @param clickFunc The function that is run when the button is clicked (held below holdDuration)
 * @param holdFunc The function that is run when the button is held (held at or above holdDuration)
 * @param holdDuration The duration the button needs to be held to classify as a hold
 * @param className The classname of the button for CSS
 * @returns 
 */
const ClickHoldButton = ({ clickFunc, holdFunc, holdDuration, className }) => {
    let holdTimeout = useRef(null);
    let isHeld = useRef(false);
    let buttonRef = useRef(null);


    useEffect(() => {
        const actionButton = buttonRef.current;

        const handleMouseDown = () => {
            holdTimeout.current = setTimeout(() => {
                isHeld.current = true;
                holdFunc()
            }, holdDuration);

        };

        //On Mouse Up
        const handleMouseUp = () => {
            if (!isHeld.current) {
                clickFunc()
            }
            //Reset Timeout and held status
            clearTimeout(holdTimeout.current)
            isHeld.current = false;
        };

        const handleMouseLeave = () => {
            clearTimeout(holdTimeout);
            isHeld.current = false;
        };

        actionButton.addEventListener('mousedown', handleMouseDown);
        actionButton.addEventListener('mouseup', handleMouseUp);
        actionButton.addEventListener('mouseleave', handleMouseLeave);

        // Cleanup event listeners on component unmount
        return () => {
            actionButton.removeEventListener('mousedown', handleMouseDown);
            actionButton.removeEventListener('mouseup', handleMouseUp);
            actionButton.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, [clickFunc, holdFunc, holdDuration]);

    return (
        <button ref={buttonRef} className={className}></button>
    );
};

export default ClickHoldButton;
