import { useRef, useEffect } from 'react';

const useButtonGradient = () => {
  const containerRef = useRef();

  const gradientRef = useRef();

  const gradientRefBoundaries = useRef({
    width: 0,
    height: 0,
  });

  const handlers = useRef({
    /**
     * Mouse enter handler.
     */
    mouseEnterHandler: () => {
      if (!containerRef.current) {
        return false;
      }

      if (gradientRef.current) {
        return false;
      }

      gradientRef.current = document.createElement('div');
      gradientRef.current.style.position = 'absolute';
      gradientRef.current.style.top = '0px';
      gradientRef.current.style.left = '0px';
      gradientRef.current.style.right = '0px';
      gradientRef.current.style.bottom = '0px';
      gradientRef.current.style.background = 'radial-gradient(circle at center center, #63dfda, #00b2cb)';
      gradientRef.current.style.backgroundSize = '200% 200%';

      containerRef.current.appendChild(gradientRef.current);

      const { width, height } = containerRef.current.getBoundingClientRect();
      gradientRefBoundaries.current = {
        width: width * 2,
        height: height * 2,
      };

      return true;
    },

    /**
     * Mouse leave handler.
     */
    mouseLeaveHandler: () => {
      if (!containerRef.current || !gradientRef.current) {
        return false;
      }

      containerRef.current.removeChild(gradientRef.current);
      gradientRef.current = null;

      return true;
    },

    /**
     * Mouse move handler.
     */
    mouseMoveHandler: (e) => {
      if (!gradientRef.current) {
        return false;
      }

      let { offsetX } = e;
      let { offsetY } = e;

      if (e.srcElement !== gradientRef.current) {
        offsetX += e.srcElement.offsetLeft;
        offsetY += e.srcElement.offsetTop;
      }

      gradientRef.current.style.backgroundPositionX = `${offsetX - gradientRefBoundaries.current.width / 2}px`;
      gradientRef.current.style.backgroundPositionY = `${offsetY - gradientRefBoundaries.current.height / 2}px`;

      return true;
    },
  });

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.addEventListener('mouseenter', handlers.current.mouseEnterHandler);
      containerRef.current.addEventListener('mouseleave', handlers.current.mouseLeaveHandler);
      containerRef.current.addEventListener('mousemove', handlers.current.mouseMoveHandler);
    }

    return () => {
      if (containerRef.current) {
        containerRef.current.removeEventListener('mouseenter', handlers.current.mouseEnterHandler);
        containerRef.current.removeEventListener('mouseleave', handlers.current.mouseLeaveHandler);
        // eslint-disable-next-line react-hooks/exhaustive-deps
        containerRef.current.removeEventListener('mousemove', handlers.current.mouseMoveHandler);
      }
    };
  }, []);

  return {
    containerRef,
    gradientRef,
    handlers,
  };
};

export default useButtonGradient;
