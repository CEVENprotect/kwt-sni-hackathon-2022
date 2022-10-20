import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { isEmpty } from '../helpers/isEmpty';
import { noop } from '../helpers/noop';

const Wrapper = styled.div`
  position: relative;
`;

const Button = styled.button`
  background-color: #ffffff;
  background-image: url(${(props) =>
    props.active ? resolvePath(`images/${props.icon.slice(0, -4)}_active.${props.icon.slice(-3,)}`) : resolvePath(`images/${props.icon}`)});
`;

const ButtonToggle = ({ active, icon, onChange, tooltip, errorMessage = null, ariaLabel }) => {
  const isMobile = useSelector((state) => state.application.isMobile);
  console.log(`images/${icon.slice(0, )}_active.${icon.slice(-3,)}`)
  console.log(`images/${icon}`)

  const [tooltipVisible, setTooltipVisible] = useState(false);
  const showTooltip = () => {
    setTooltipVisible(true);
  };
  const hideTooltip = () => {
    setTooltipVisible(false);
  };

  return (
    <Wrapper>
      <Button
        type="button"
        className="layer-button"
        onFocus={isMobile ? noop : showTooltip}
        onMouseOver={isMobile ? noop : showTooltip}
        onMouseOut={isMobile ? noop : hideTooltip}
        onBlur={isMobile ? noop : hideTooltip}
        onClick={onChange}
        active={active}
        icon={icon}
        errorMessage={errorMessage}
        aria-label={ariaLabel}
      />
      {tooltipVisible && !isEmpty(tooltip) && (
        <div className="layer-button-tooltip">
          <div className="tooltip-container">
            <div className="tooltip-text">
              {!errorMessage && <div>{tooltip}</div>}
              {errorMessage && <div className="tooltip-error">{errorMessage}</div>}
            </div>
            <div className="arrow" />
          </div>
        </div>
      )}
    </Wrapper>
  );
};

export default ButtonToggle;
