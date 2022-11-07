const resizeCallbackFunction = (entries) => {
    const calcBorderRadius = (size1, size2) =>
      `${Math.min(100, size1 / 10 + size2 / 10)}px`;

    for (const entry of entries) {
      if (entry.borderBoxSize) {
        entry.target.style.borderRadius = calcBorderRadius(
          entry.borderBoxSize[0].inlineSize,
          entry.borderBoxSize[0].blockSize
        );
      } else {
        entry.target.style.borderRadius = calcBorderRadius(
          entry.contentRect.width,
          entry.contentRect.height
        );
      }
    }
  }


const resizeObserver = new ResizeObserver(dickHoleLevert);
  
  resizeObserver.observe(document.querySelector("div"));
  